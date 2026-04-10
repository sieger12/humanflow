import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { buildDetectPrompt } from "@/lib/prompts/detect";
import {
  splitSentences,
  sentenceLengthStdDev,
  transitionWordDensity,
  repetitiveStarterRatio,
} from "@/lib/utils/text";
import type { DetectionResponse, DetectionLabel } from "@/types/detector";

function ruleBasedScore(text: string): number {
  const sentences = splitSentences(text);
  let score = 0;

  // Uniform sentence length → AI-like (low std dev is suspicious)
  const stdDev = sentenceLengthStdDev(sentences);
  if (stdDev < 3) score += 30;
  else if (stdDev < 6) score += 15;

  // Heavy use of AI transition words
  const density = transitionWordDensity(text);
  if (density > 0.02) score += 25;
  else if (density > 0.01) score += 12;

  // Repetitive sentence starters
  const starterRatio = repetitiveStarterRatio(sentences);
  if (starterRatio > 0.5) score += 20;
  else if (starterRatio > 0.3) score += 10;

  // Very long, unbroken paragraphs
  const paragraphs = text.split(/\n{2,}/);
  const longParagraphs = paragraphs.filter((p) => p.split(/\s+/).length > 80).length;
  if (longParagraphs > 0) score += 10;

  return Math.min(score, 60); // rule-based caps at 60; LLM fills the rest
}

function toLabel(score: number): DetectionLabel {
  if (score <= 40) return "low";
  if (score <= 70) return "medium";
  return "high";
}

export async function detectAiPatterns(text: string): Promise<DetectionResponse> {
  const ruleScore = ruleBasedScore(text);

  try {
    const { text: raw } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: buildDetectPrompt(text),
      temperature: 0.3, // low temp for consistent scoring
    });

    const parsed = JSON.parse(raw) as {
      score: number;
      summary: string;
      suspiciousSentences: string[];
      suggestions: string[];
    };

    // Weighted blend: 30% rule-based + 70% LLM
    const blended = Math.round(0.3 * ruleScore + 0.7 * (parsed.score ?? 50));
    const clamped = Math.max(0, Math.min(100, blended));

    return {
      score: clamped,
      label: toLabel(clamped),
      summary: parsed.summary ?? "",
      suspiciousSentences: parsed.suspiciousSentences?.slice(0, 4) ?? [],
      suggestions: parsed.suggestions?.slice(0, 3) ?? [],
    };
  } catch {
    // LLM failed — fall back to rule-only result
    return {
      score: ruleScore,
      label: toLabel(ruleScore),
      summary: "Analysis based on pattern detection only.",
      suspiciousSentences: [],
      suggestions: [
        "Vary sentence length more.",
        "Remove repeated transition words.",
        "Add a personal perspective.",
      ],
    };
  }
}
