import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SeoPageTemplate } from "@/lib/seo/page-template";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Fix Repetitive Writing — HumanFlow",
  description: "Identify and fix repetitive sentence patterns, overused transitions, and uniform structure. Free writing improvement tool.",
};

const CONTENT: Record<string, Parameters<typeof SeoPageTemplate>[0]["content"]> = {
  en: {
    h1: "Fix Repetitive Writing — Break Sentence Patterns",
    intro: "Repetitive writing isn't always obvious. The same sentence structure, the same transition words, the same paragraph length — these patterns accumulate and make text feel generated rather than written. HumanFlow identifies them and rewrites to break the cycle.",
    howTitle: "How to fix repetitive writing",
    steps: [
      "Paste your text — reports, emails, essays, anything.",
      "Use the Pattern Check tool to identify where repetition is highest.",
      "Switch to the Rewriter and click \"Rewrite & Improve\".",
      "Pick the version with the most variation from your original.",
    ],
    whyTitle: "Types of repetition that hurt writing",
    reasons: [
      { title: "Same sentence starters", desc: "Starting sentences with the same word or phrase ('This', 'It is', 'The') creates a mechanical rhythm that readers notice." },
      { title: "Identical sentence length", desc: "When every sentence is 15-20 words, reading becomes predictable. Mixing 5-word and 25-word sentences creates natural flow." },
      { title: "Repeated transition phrases", desc: "'In addition', 'Furthermore', 'Moreover' — using the same connector throughout signals formulaic writing." },
    ],
    faqTitle: "Questions",
    faq: [
      { q: "How do I know if my writing is repetitive?", a: "Use the Pattern Check tool. It scores your text and highlights the sentences with the most repetitive structure." },
      { q: "Will the rewriter change my meaning?", a: "No. The rewriter restructures sentences without altering the original meaning." },
      { q: "Does it work for Korean writing?", a: "Yes. Korean-specific patterns like repetitive endings (이다, 할 수 있다) are also detected and varied." },
    ],
    ctaLabel: "Fix my writing",
    relatedTitle: "Related",
    related: [
      { label: "Rewrite AI Text", href: "/en/rewrite-ai-text", desc: "Full structural rewrite in 3 styles" },
      { label: "Improve Writing Quality", href: "/en/improve-writing", desc: "General writing quality improvement" },
      { label: "Pattern Check", href: "/en/ai-detector", desc: "Score and highlight repetitive patterns" },
    ],
  },
  ko: {
    h1: "반복 패턴 수정 — 문장 구조의 반복을 깨라",
    intro: "반복적인 글쓰기는 항상 명확하게 보이지 않습니다. 동일한 문장 구조, 같은 연결어, 균일한 문단 길이 — 이런 패턴이 쌓이면 직접 쓴 글이 아닌 것처럼 느껴집니다. HumanFlow가 이를 찾아 재작성합니다.",
    howTitle: "반복 글쓰기 수정 방법",
    steps: [
      "텍스트를 붙여넣으세요 — 보고서, 이메일, 에세이 모두 가능합니다.",
      "패턴 분석 도구로 반복이 가장 많은 부분을 확인합니다.",
      "재작성 도구로 전환해 \"다시 쓰기 & 개선\"을 클릭합니다.",
      "원본과 가장 다양하게 달라진 버전을 선택하세요.",
    ],
    whyTitle: "글쓰기를 해치는 반복 유형",
    reasons: [
      { title: "동일한 문장 시작", desc: "같은 단어나 표현으로 문장을 시작하면 기계적인 리듬이 생깁니다. HumanFlow가 문장 시작을 다양화합니다." },
      { title: "균일한 문장 길이", desc: "모든 문장이 비슷한 길이면 읽기가 예측 가능해집니다. 짧은 문장과 긴 문장을 섞으면 자연스러운 흐름이 생깁니다." },
      { title: "반복되는 연결 표현", desc: "\"또한\", \"따라서\", \"전반적으로\"를 반복 사용하면 형식적인 글처럼 보입니다." },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "내 글이 반복적인지 어떻게 알 수 있나요?", a: "패턴 분석 도구를 사용하세요. 텍스트에 점수를 매기고 가장 반복적인 구조의 문장을 하이라이트합니다." },
      { q: "재작성하면 의미가 바뀌나요?", a: "아니요. 원본 의미를 유지하면서 문장 구조만 재조정합니다." },
      { q: "한국어에도 작동하나요?", a: "네. \"이다\", \"할 수 있다\" 같은 한국어 특유의 반복 어미도 감지하고 다양화합니다." },
    ],
    ctaLabel: "내 글 수정하기",
    relatedTitle: "관련 도구",
    related: [
      { label: "AI 텍스트 다시 쓰기", href: "/ko/rewrite-ai-text", desc: "3가지 스타일로 전체 구조 재작성" },
      { label: "글쓰기 품질 개선", href: "/ko/improve-writing", desc: "전반적인 글쓰기 품질 향상" },
      { label: "패턴 분석", href: "/ko/ai-detector", desc: "반복 패턴 점수 및 하이라이트" },
    ],
  },
};

export default async function FixRepetitivePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = CONTENT[locale] ?? CONTENT.en;
  return <SeoPageTemplate locale={locale} content={content} />;
}
