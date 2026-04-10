export type VariantId = "natural" | "clean" | "readable";

export interface HumanizeVariant {
  id: VariantId;
  text: string;
}

export interface HumanizeResponse {
  variants: HumanizeVariant[];
  bestVariantId: VariantId;
}
