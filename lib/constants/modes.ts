export const HUMANIZE_MODES = ["natural", "clean", "readable"] as const;
export type HumanizeMode = (typeof HUMANIZE_MODES)[number];
