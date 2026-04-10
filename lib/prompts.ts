// This file is kept for backward compatibility.
// Core logic has moved to lib/prompts/humanize.ts and lib/prompts/detect.ts
export { buildStep1Prompt, buildStep2Prompt } from "@/lib/prompts/humanize";

export type HumanizeMode =
  | "natural" | "short" | "professional" | "friendly" | "blog" | "email";
export type HumanLevel = "basic" | "natural" | "very_human";

// Legacy single-step prompt (kept for reference — not used in production pipeline)
export function buildHumanizerPrompt(text: string, mode: HumanizeMode, level: HumanLevel = "natural") {
  const { buildStep1Prompt } = require("@/lib/prompts/humanize");
  return buildStep1Prompt(text, mode);
}
