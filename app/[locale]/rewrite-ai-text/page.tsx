import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Locale-specific SEO metadata
const PAGE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Rewrite AI Text — Improve Writing Quality | HumanFlow",
    description: "Paste AI-generated or repetitive text and get 3 improved versions instantly. Fix sentence structure, reduce patterns, improve readability.",
  },
  ko: {
    title: "AI 문장 다시 쓰기 — 글쓰기 품질 개선 | HumanFlow",
    description: "반복 패턴이 많은 텍스트를 붙여넣고 즉시 3가지 개선 버전을 받아보세요. 문장 구조 개선, 가독성 향상.",
  },
  ja: {
    title: "AIテキストを書き直す — 文章品質を改善 | HumanFlow",
    description: "繰り返しパターンのあるテキストを貼り付けて、即座に3つの改善バージョンを取得。文章構造と読みやすさを改善。",
  },
  es: {
    title: "Reescribir Texto de IA — Mejorar la Calidad | HumanFlow",
    description: "Pega texto repetitivo y obtén 3 versiones mejoradas al instante. Corrige la estructura, reduce patrones, mejora la legibilidad.",
  },
  de: {
    title: "KI-Text umschreiben — Schreibqualität verbessern | HumanFlow",
    description: "Füge repetitiven Text ein und erhalte sofort 3 verbesserte Versionen. Struktur korrigieren, Muster reduzieren, Lesbarkeit verbessern.",
  },
  fr: {
    title: "Réécrire le texte IA — Améliorer la qualité | HumanFlow",
    description: "Collez du texte répétitif et obtenez instantanément 3 versions améliorées. Corrigez la structure, réduisez les schémas, améliorez la lisibilité.",
  },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const meta = PAGE_META[locale] ?? PAGE_META.en;
  return { title: meta.title, description: meta.description };
}

const CONTENT: Record<string, {
  h1: string;
  intro: string;
  howTitle: string;
  steps: string[];
  whyTitle: string;
  reasons: { title: string; desc: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: string;
}> = {
  en: {
    h1: "Rewrite AI Text — Improve Writing Quality",
    intro: "Paste any text with repetitive patterns, predictable structure, or awkward flow. HumanFlow restructures it into 3 improved versions — Natural, Clean Rewrite, and Readable — so you can pick the one that fits.",
    howTitle: "How it works",
    steps: [
      "Paste your text into the input field.",
      "Choose a rewrite style: Natural, Clean Rewrite, or Readable.",
      "Click \"Rewrite & Improve\" — you'll get 3 style variants in seconds.",
      "Copy the version you prefer and use it directly.",
    ],
    whyTitle: "What gets improved",
    reasons: [
      { title: "Repetitive sentence starters", desc: "Sentences that begin the same way make text feel formulaic. The rewriter varies how sentences open." },
      { title: "Uniform sentence length", desc: "When all sentences are the same length, reading feels monotonous. Mixing lengths improves flow." },
      { title: "Overused transitions", desc: "Words like 'Furthermore', 'In addition', and 'Overall' create mechanical-sounding writing. These get removed or replaced." },
    ],
    faqTitle: "Questions",
    faq: [
      { q: "Does it work for non-AI text too?", a: "Yes. Any text with repetitive patterns or stiff structure can be improved — regardless of how it was written." },
      { q: "Does it change my meaning?", a: "No. The rewriter preserves the original meaning. Only sentence structure and phrasing are adjusted." },
      { q: "Is it free?", a: "Completely free. No account required." },
    ],
    cta: "Start rewriting",
  },
  ko: {
    h1: "AI 문장 다시 쓰기 — 반복 패턴 제거, 가독성 개선",
    intro: "반복되는 표현, 균일한 문장 구조, 어색한 흐름이 있는 텍스트를 붙여넣으세요. HumanFlow가 3가지 개선 버전으로 재작성합니다 — 자연스럽게, 간결하게, 읽기 좋게. 원하는 버전을 바로 복사해 사용하세요.",
    howTitle: "사용 방법",
    steps: [
      "입력창에 텍스트를 붙여넣습니다.",
      "재작성 스타일을 선택합니다: 자연스럽게, 간결하게, 읽기 좋게.",
      "\"다시 쓰기 & 개선\"을 클릭하면 몇 초 안에 3가지 버전을 받습니다.",
      "원하는 버전을 복사해 바로 사용하세요.",
    ],
    whyTitle: "무엇이 개선되나요",
    reasons: [
      { title: "반복되는 문장 시작", desc: "같은 방식으로 시작하는 문장은 글을 단조롭게 만듭니다. 재작성 도구가 다양하게 변형합니다." },
      { title: "균일한 문장 길이", desc: "모든 문장이 같은 길이면 읽기 피로감이 생깁니다. 길이를 다양하게 섞어 흐름을 개선합니다." },
      { title: "과도한 연결어", desc: "\"또한\", \"따라서\", \"전반적으로\" 같은 표현이 많으면 딱딱해집니다. 이를 줄이거나 교체합니다." },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "AI가 쓴 글이 아니어도 되나요?", a: "네. 반복 패턴이나 딱딱한 구조가 있는 텍스트라면 어떤 글이든 개선할 수 있습니다." },
      { q: "원본 의미가 바뀌나요?", a: "아니요. 의미는 그대로 유지됩니다. 문장 구조와 표현 방식만 조정됩니다." },
      { q: "무료인가요?", a: "완전 무료입니다. 가입 없이 바로 사용하세요." },
    ],
    cta: "지금 바로 시작",
  },
};

export default async function RewritePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = CONTENT[locale] ?? CONTENT.en;

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-3xl px-4 pt-14 pb-20">
          {/* H1 */}
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-5xl">
            {content.h1}
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-500">{content.intro}</p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href={`/${locale}/ai-humanizer`}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition"
            >
              {content.cta} →
            </Link>
          </div>

          {/* How it works */}
          <section className="mt-14">
            <h2 className="text-xl font-bold text-zinc-900 mb-5">{content.howTitle}</h2>
            <ol className="space-y-3">
              {content.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-7">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* What gets improved */}
          <section className="mt-14">
            <h2 className="text-xl font-bold text-zinc-900 mb-5">{content.whyTitle}</h2>
            <div className="space-y-4">
              {content.reasons.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <h3 className="font-semibold text-zinc-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-14">
            <h2 className="text-xl font-bold text-zinc-900 mb-5">{content.faqTitle}</h2>
            <div className="space-y-4">
              {content.faq.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-bold text-zinc-900">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Link
              href={`/${locale}/ai-humanizer`}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition"
            >
              {content.cta} →
            </Link>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
