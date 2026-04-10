import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";

export interface SeoPageContent {
  h1: string;
  intro: string;
  howTitle: string;
  steps: string[];
  whyTitle: string;
  reasons: { title: string; desc: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaLabel: string;
  // Internal links to related pages
  relatedTitle?: string;
  related?: { label: string; href: string; desc: string }[];
}

export function SeoPageTemplate({
  locale,
  content,
}: {
  locale: string;
  content: SeoPageContent;
}) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-3xl px-4 pt-14 pb-20">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-tight sm:text-5xl">
            {content.h1}
          </h1>
          <p className="mt-5 text-base leading-7 text-zinc-500">{content.intro}</p>

          <div className="mt-8">
            <Link
              href={`/${locale}/ai-humanizer`}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition"
            >
              {content.ctaLabel} →
            </Link>
          </div>

          {/* Ad — top placement after CTA */}
          <AdSlot format="horizontal" className="mt-8" />

          {/* How it works */}
          <section className="mt-12">
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
          <section className="mt-12">
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

          {/* Ad — mid-content */}
          <AdSlot format="rectangle" className="mt-10" />

          {/* FAQ */}
          <section className="mt-12">
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

          {/* Internal links */}
          {content.related && content.related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-base font-bold text-zinc-900 mb-4">
                {content.relatedTitle ?? "Related tools"}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.related.map(({ label, href, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-400 transition"
                  >
                    <span className="text-sm font-semibold text-zinc-900">{label}</span>
                    <p className="mt-1 text-xs text-zinc-500">{desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Link
              href={`/${locale}/ai-humanizer`}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition"
            >
              {content.ctaLabel} →
            </Link>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
