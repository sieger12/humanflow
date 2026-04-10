export type DetectionLabel = "low" | "medium" | "high";

export interface DetectionResponse {
  score: number;
  label: DetectionLabel;
  summary: string;
  suspiciousSentences: string[];
  suggestions: string[];
}
