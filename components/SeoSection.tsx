import { useTranslations } from "next-intl";

export default function SeoSection() {
  const t = useTranslations("seo");

  const features = t.raw("features") as { title: string; desc: string }[];
  const steps = t.raw("steps") as string[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 space-y-12">
      {/* Feature cards */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          {t("h2Features")}
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-500">{t("featuresDesc")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map(({ title, desc }) => (
            <div key={title} className="rounded-2xl bg-zinc-50 p-5">
              <h3 className="font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-4">{t("h2How")}</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-7">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-zinc-900 mb-6">{t("h2Faq")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {faq.map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-bold text-zinc-900 mb-2">{q}</div>
              <div className="text-sm leading-7 text-zinc-500">{a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
