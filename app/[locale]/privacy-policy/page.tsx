import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Privacy Policy — HumanFlow",
  description: "Privacy policy for HumanFlow writing tool.",
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen">
        <article className="mx-auto max-w-2xl px-4 pt-14 pb-20">
          <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>
          <p className="mt-2 text-xs text-zinc-400">Last updated: April 2026</p>

          <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600">
            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">1. Information we collect</h2>
              <p>
                HumanFlow does not require account creation. We do not collect personal
                information such as name, email, or phone number during normal use.
              </p>
              <p className="mt-2">
                When you submit text for rewriting or analysis, that text is sent to our
                server and processed using the OpenAI API. We do not store submitted text
                after processing is complete.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">2. Usage data</h2>
              <p>
                We may collect anonymous usage data such as page views, request counts,
                and general traffic patterns. This data does not identify individual users.
                We use this information to understand how the service is used and to
                improve performance.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">3. Cookies</h2>
              <p>
                HumanFlow may use cookies for analytics purposes (e.g., Google Analytics).
                These cookies do not identify you personally. You can disable cookies in
                your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">4. Advertising</h2>
              <p>
                We use Google AdSense to display advertisements. Google may use cookies
                to show ads based on your prior visits to this or other websites. You can
                opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-zinc-800"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">5. Third-party services</h2>
              <p>
                Text submitted for processing is sent to OpenAI's API for rewriting.
                OpenAI's{" "}
                <a
                  href="https://openai.com/policies/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-zinc-800"
                >
                  Privacy Policy
                </a>{" "}
                applies to data processed through their API.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">6. Data retention</h2>
              <p>
                Submitted text is not stored on our servers after processing. We retain
                no record of the content you submit.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2">7. Contact</h2>
              <p>
                For privacy-related questions, contact us at{" "}
                <a href="mailto:jk561800kk@gmail.com" className="underline text-zinc-800">
                  jk561800kk@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
        <Footer locale={locale} />
      </main>
    </>
  );
}
