import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { buildSingleModePrompt, buildAllVariantsPrompt } from "@/lib/prompts/humanize";
import type { HumanizeMode } from "@/lib/constants/modes";
import type { HumanizeResponse, VariantId } from "@/types/humanizer";

export async function humanizeText(params: {
  text: string;
  mode: HumanizeMode;
}): Promise<HumanizeResponse> {
  const { text, mode } = params;

  // Step 1: structural rewrite using selected mode
  const { text: rewritten } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: buildSingleModePrompt(text, mode),
    temperature: 0.85,
  });

  // Step 2: generate all 3 style variants from the rewritten base
  const { text: raw } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: buildAllVariantsPrompt(rewritten),
    temperature: 0.9,
  });

  try {
    const parsed = JSON.parse(raw) as HumanizeResponse;
    if (Array.isArray(parsed.variants) && parsed.variants.length > 0) {
      // Ensure bestVariantId matches selected mode when possible
      const ids = parsed.variants.map((v) => v.id);
      const best: VariantId = ids.includes(mode as VariantId) ? (mode as VariantId) : parsed.bestVariantId;
      return { variants: parsed.variants, bestVariantId: best };
    }
  } catch {
    // fall through
  }

  // Fallback: single result
  return {
    variants: [{ id: mode as VariantId, text: rewritten }],
    bestVariantId: mode as VariantId,
  };
}
