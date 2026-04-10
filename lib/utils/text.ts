export function splitSentences(text: string): string[] {
  const raw = text.match(/[^.!?\n]+[.!?]+/g) ?? [text];
  return raw.map((s) => s.trim()).filter(Boolean);
}

export function sentenceLengthStdDev(sentences: string[]): number {
  if (sentences.length < 2) return 0;
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length;
  return Math.sqrt(variance);
}

const AI_TRANSITIONS = [
  "in addition", "moreover", "furthermore", "additionally", "overall",
  "in conclusion", "it is important", "it should be noted",
  "또한", "특히", "전반적으로", "뿐만 아니라", "더불어", "이러한",
  "なお", "また", "さらに", "総じて",
  "además", "asimismo", "por otro lado",
  "de plus", "en outre", "par ailleurs",
  "darüber hinaus", "außerdem", "zudem",
];

export function transitionWordDensity(text: string): number {
  const lower = text.toLowerCase();
  const hits = AI_TRANSITIONS.filter((t) => lower.includes(t)).length;
  const wordCount = text.split(/\s+/).length;
  return wordCount > 0 ? hits / wordCount : 0;
}

export function repetitiveStarterRatio(sentences: string[]): number {
  if (sentences.length < 3) return 0;
  const starters = sentences.map((s) => s.trim().split(/\s+/)[0]?.toLowerCase() ?? "");
  const counts: Record<string, number> = {};
  for (const s of starters) counts[s] = (counts[s] ?? 0) + 1;
  const repeated = Object.values(counts).filter((c) => c > 1).reduce((a, b) => a + b, 0);
  return repeated / starters.length;
}
