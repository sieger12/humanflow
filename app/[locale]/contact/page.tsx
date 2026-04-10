import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Contact — HumanFlow",
  description: "Contact HumanFlow for questions, feedback, or support.",
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-2xl px-4 pt-14 pb-20">
          <h1 className="text-3xl font-bold text-zinc-900">Contact</h1>

          <div className="mt-8 space-y-6 text-sm leading-7 text-zinc-600">
            <p>
              For questions, feedback, or bug reports, send an email to:
            </p>
            <a
              href="mailto:jk561800kk@gmail.com"
              className="inline-block rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 transition"
            >
              jk561800kk@gmail.com
            </a>
            <p className="text-zinc-500">
              We typically respond within 1–3 business days.
            </p>
            <p className="text-zinc-500">
              For AdSense or business inquiries, use the same email with the subject line
              "Business Inquiry".
            </p>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
