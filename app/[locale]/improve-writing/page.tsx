import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SeoPageTemplate } from "@/lib/seo/page-template";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Improve Writing Quality — HumanFlow",
  description: "Improve writing quality by reducing repetitive patterns, varying sentence length, and clarifying structure. Free, instant, no account required.",
};

const CONTENT: Record<string, Parameters<typeof SeoPageTemplate>[0]["content"]> = {
  en: {
    h1: "Improve Writing Quality — Reduce Patterns, Improve Flow",
    intro: "Writing quality isn't just about grammar. It's about structure, rhythm, and avoiding repetition. HumanFlow identifies and rewrites the structural patterns that make text feel flat or formulaic.",
    howTitle: "How to improve your writing",
    steps: [
      "Paste your text into HumanFlow.",
      "Select Natural, Clean Rewrite, or Readable style.",
      "Click \"Rewrite & Improve\" to get 3 improved versions.",
      "Compare the versions and copy the one that fits best.",
    ],
    whyTitle: "Common writing quality problems",
    reasons: [
      { title: "Repetitive sentence structure", desc: "When sentences follow the same pattern repeatedly, text feels monotonous. Structural variation improves engagement." },
      { title: "Overlong paragraphs", desc: "Dense, unbroken paragraphs slow reading. Breaking them up — without losing logic — improves comprehension." },
      { title: "Filler transitions", desc: "Phrases like 'In addition', 'It is worth noting', and 'Furthermore' add length without meaning. Removing them sharpens writing." },
    ],
    faqTitle: "Questions",
    faq: [
      { q: "Is this a grammar checker?", a: "No. HumanFlow focuses on structure and flow, not grammar rules. It's a writing pattern tool, not a proofreader." },
      { q: "What kind of writing does it work best for?", a: "Reports, blog posts, essays, cover letters, and any writing where you want to reduce formulaic phrasing." },
      { q: "Is it free?", a: "Yes. No account needed." },
    ],
    ctaLabel: "Improve my writing",
    relatedTitle: "Related",
    related: [
      { label: "Rewrite AI Text", href: "/en/rewrite-ai-text", desc: "Restructure and rewrite text in 3 styles" },
      { label: "Fix Repetitive Writing", href: "/en/fix-repetitive-writing", desc: "Identify and fix repetitive sentence patterns" },
      { label: "Pattern Check", href: "/en/ai-detector", desc: "Analyze writing patterns before rewriting" },
    ],
  },
  ko: {
    h1: "글쓰기 품질 개선 — 패턴 줄이고 흐름 개선",
    intro: "글쓰기 품질은 문법만의 문제가 아닙니다. 구조, 리듬, 반복 제거가 핵심입니다. HumanFlow는 텍스트를 단조롭고 형식적으로 만드는 구조적 패턴을 찾아 재작성합니다.",
    howTitle: "글쓰기 개선 방법",
    steps: [
      "HumanFlow에 텍스트를 붙여넣습니다.",
      "자연스럽게, 간결하게, 읽기 좋게 중 스타일을 선택합니다.",
      "\"다시 쓰기 & 개선\"을 클릭해 3가지 개선 버전을 받습니다.",
      "버전을 비교하고 가장 적합한 것을 복사하세요.",
    ],
    whyTitle: "자주 있는 글쓰기 품질 문제",
    reasons: [
      { title: "반복되는 문장 구조", desc: "같은 패턴의 문장이 반복되면 글이 단조로워집니다. 구조 변화가 읽는 재미를 높입니다." },
      { title: "지나치게 긴 문단", desc: "빽빽한 문단은 읽기를 느리게 합니다. 논리를 유지하면서 나누면 이해도가 높아집니다." },
      { title: "불필요한 연결어", desc: "\"또한\", \"따라서\", \"전반적으로\" 같은 표현은 길이만 늘립니다. 제거하면 글이 날카로워집니다." },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "이건 문법 검사기인가요?", a: "아니요. HumanFlow는 문법 규칙이 아닌 구조와 흐름에 집중합니다. 교정 도구가 아닌 글쓰기 패턴 도구입니다." },
      { q: "어떤 글에 가장 잘 맞나요?", a: "보고서, 블로그 글, 에세이, 자기소개서 등 형식적인 표현을 줄이고 싶은 모든 글에 적합합니다." },
      { q: "무료인가요?", a: "네, 가입 없이 바로 사용하세요." },
    ],
    ctaLabel: "글쓰기 개선하기",
    relatedTitle: "관련 도구",
    related: [
      { label: "AI 텍스트 다시 쓰기", href: "/ko/rewrite-ai-text", desc: "3가지 스타일로 텍스트 재작성" },
      { label: "반복 패턴 수정", href: "/ko/fix-repetitive-writing", desc: "반복되는 문장 패턴 찾기 및 수정" },
      { label: "패턴 분석", href: "/ko/ai-detector", desc: "재작성 전 글쓰기 패턴 분석" },
    ],
  },
};

export default async function ImprovePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = CONTENT[locale] ?? CONTENT.en;
  return <SeoPageTemplate locale={locale} content={content} />;
}
