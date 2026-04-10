import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Terms of Service — HumanFlow",
  description: "Terms of service for HumanFlow writing tool.",
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-2xl px-4 pt-14 pb-20">
          <h1 className="text-3xl font-bold text-zinc-900">Terms of Service</h1>
          <p className="mt-2 text-xs text-zinc-400">Last updated: April 2026</p>

          <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">1. Acceptance</h2>
              <p>
                By using HumanFlow, you agree to these terms. If you do not agree,
                please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">2. Use of the service</h2>
              <p>
                HumanFlow is provided as a free writing tool. You may use it for personal,
                academic, or commercial writing improvement purposes. You agree not to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Submit text that violates applicable laws or third-party rights</li>
                <li>Use the service for automated bulk processing beyond normal individual use</li>
                <li>Attempt to reverse engineer, scrape, or abuse the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">3. Content</h2>
              <p>
                You retain ownership of the text you submit. By submitting text, you grant
                us a limited right to process it using our rewriting pipeline. We do not
                claim ownership of your content.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">4. Disclaimer</h2>
              <p>
                HumanFlow is provided "as is" without warranties of any kind. We do not
                guarantee the quality, accuracy, or fitness of rewritten output for any
                particular purpose. Always review rewritten content before use.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">5. Limitation of liability</h2>
              <p>
                We are not liable for any damages arising from your use of HumanFlow,
                including loss of data, business interruption, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">6. Changes</h2>
              <p>
                We may update these terms at any time. Continued use of the service
                constitutes acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">7. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href="mailto:jk561800kk@gmail.com" className="underline text-zinc-800">
                  jk561800kk@gmail.com
                </a>
              </p>
            </section>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
