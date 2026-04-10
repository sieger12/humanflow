import { getTranslations, setRequestLocale } from "next-intl/server";
import HumanizerForm from "@/components/humanizer/HumanizerForm";
import SeoSection from "@/components/SeoSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        {/* Hero — short, above the tool */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl leading-tight">
              {t("h1")}
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
              {t("desc")}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-400">
              {(t.raw("trust") as string[]).map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <span className="text-zinc-300">✓</span> {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Tool — zero scroll needed */}
        <HumanizerForm />
        <SeoSection />
        <Footer locale={locale} />
      </main>
    </>
  );
}
