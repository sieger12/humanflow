import { getTranslations, setRequestLocale } from "next-intl/server";
import DetectorForm from "@/components/detector/DetectorForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DetectorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "detector" });

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <section className="mx-auto max-w-4xl px-4 pt-12 pb-8">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {t("badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl leading-tight">
              {t("h1")}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-500">{t("desc")}</p>
          </div>
        </section>
        <DetectorForm locale={locale} />
        <Footer locale={locale} />
      </main>
    </>
  );
}
