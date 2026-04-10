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

export default async function HumanizerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {t("badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl leading-tight">
              {t("h1")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">{t("desc")}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-400">
              {(t.raw("trust") as string[]).map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>
        <HumanizerForm />
        <SeoSection />
        <Footer locale={locale} />
      </main>
    </>
  );
}
