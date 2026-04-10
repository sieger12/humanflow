// ------------------------------------------------------------------
// Framing: NOT "make it sound human" / NOT "bypass AI detection"
//          → "Improve writing: reduce patterns, improve readability"
// ------------------------------------------------------------------

const BASE_PROMPT = `
너는 한국어와 영어 글을 다듬는 편집자다.

목표:
아래 글의 의미는 유지하되, 반복되는 표현 패턴을 줄이고 더 읽기 좋게 다시 작성하라.

공통 규칙:
- 단어만 교체하지 말고 문장 구조를 재작성하라
- 같은 문장 패턴이 반복되지 않게 하라
- 문장 길이를 다양하게 섞어라
- "또한", "따라서", "결과적으로", "~라고 할 수 있다", "In addition", "Moreover", "Furthermore", "Overall" 같은 전형적인 연결 표현은 줄여라
- 지나치게 교과서적인 문체를 피하라
- 억지 구어체를 사용하지 마라
- 자연스러운 문어체로 작성하라
- 새로운 사실이나 내용은 추가하지 마라
`;

const MODE_EXTRA: Record<string, string> = {
  natural: `
추가 지시:
- 전체 흐름을 자연스럽게 유지하되 과도한 반복 표현을 줄여라
- 문장 구조를 일부 재배열하여 읽기 편하게 만들어라
- 너무 딱딱하지 않게, 하지만 지나치게 가볍지도 않게 조정하라
`,
  clean: `
추가 지시:
- 불필요한 표현과 중복 설명을 적극적으로 제거하라
- 문장을 더 간결하게 정리하라
- 논리 흐름이 명확하게 드러나도록 구조를 정리하라
- 문단 내 정보 밀도를 높여라
`,
  readable: `
추가 지시:
- 문장 길이를 적극적으로 다양화하라
- 읽는 흐름이 자연스럽도록 문장을 나누거나 합쳐라
- 지나치게 정돈된 흐름을 완화하라
- 전체 글이 더 편하게 읽히도록 리듬을 조정하라
`,
};

export function buildSingleModePrompt(text: string, mode: string): string {
  const extra = MODE_EXTRA[mode] ?? MODE_EXTRA.natural;
  return `${BASE_PROMPT}
${extra}

텍스트:
"""
${text}
"""

결과만 출력하라.`;
}

export function buildAllVariantsPrompt(text: string): string {
  return `${BASE_PROMPT}

아래 글을 3가지 방식으로 재작성하라. 각각 스타일이 명확하게 달라야 한다.

Natural Version:
- 전체 흐름을 자연스럽게 유지하되 과도한 반복 표현을 줄여라
- 문장 구조를 일부 재배열하여 읽기 편하게 만들어라

Clean Rewrite Version:
- 불필요한 표현과 중복 설명을 적극적으로 제거하라
- 문장을 더 간결하게 정리하고 논리 흐름을 명확하게 하라

Readable Version:
- 문장 길이를 적극적으로 다양화하라
- 읽는 흐름이 자연스럽도록 문장을 나누거나 합쳐라

Return ONLY valid JSON (no markdown fences):
{
  "variants": [
    { "id": "natural",  "text": "..." },
    { "id": "clean",    "text": "..." },
    { "id": "readable", "text": "..." }
  ],
  "bestVariantId": "natural"
}

Pick bestVariantId as whichever version reads best for general use.

텍스트:
"""
${text}
"""`;
}

// kept for backward compat
export function buildStep1Prompt(text: string, mode: string): string {
  return buildSingleModePrompt(text, mode);
}
export function buildStep2Prompt(rewritten: string, _level: string): string {
  return buildAllVariantsPrompt(rewritten);
}
