export function buildDetectPrompt(text: string): string {
  return `You are an AI text detection expert. Analyze the following text for signs of AI generation.

Return ONLY valid JSON with no markdown fences or extra text:
{
  "score": <integer 0-100>,
  "summary": "<1-2 sentence explanation>",
  "suspiciousSentences": ["<exact sentence from text>", ...],
  "suggestions": ["<short actionable tip>", "<tip>", "<tip>"]
}

Score guide: 0=definitely human, 100=definitely AI-generated.
Pick 2-4 suspicious sentences that show clear AI patterns.
Keep suggestions short and actionable (under 15 words each).

Text:
"""
${text}
"""`;
}
