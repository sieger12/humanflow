import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "About HumanFlow",
  description: "HumanFlow is a free writing improvement tool that helps reduce repetitive patterns and improve text readability.",
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-2xl px-4 pt-14 pb-20 prose prose-zinc">
          <h1 className="text-3xl font-bold text-zinc-900">About HumanFlow</h1>
          <p className="mt-4 text-zinc-600 leading-7">
            HumanFlow is a free writing tool that helps you identify and reduce repetitive
            patterns in text. It restructures sentences, varies length, and removes overused
            transitions to make your writing easier to read.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">What it does</h2>
          <ul className="mt-3 space-y-2 text-zinc-600 text-sm leading-7">
            <li>Rewrites text in 3 style variants: Natural, Clean Rewrite, and Readable</li>
            <li>Analyzes writing patterns and identifies repetitive structure</li>
            <li>Works for Korean, English, Japanese, Spanish, German, and French</li>
            <li>No account required — results in seconds</li>
          </ul>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">How it works</h2>
          <p className="mt-3 text-zinc-600 text-sm leading-7">
            HumanFlow uses a two-step pipeline: first it restructures the text to break
            predictable sentence patterns, then it generates three distinct style variants.
            You choose the version that fits your purpose.
          </p>
          <h2 className="mt-8 text-xl font-bold text-zinc-900">Contact</h2>
          <p className="mt-3 text-zinc-600 text-sm leading-7">
            For questions or feedback, contact us at{" "}
            <a href="mailto:jk561800kk@gmail.com" className="text-zinc-900 underline">
              jk561800kk@gmail.com
            </a>
            .
          </p>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
