"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DetectorResult from "./DetectorResult";
import type { DetectionResponse } from "@/types/detector";
import { CHAR_LIMIT } from "@/lib/constants/limits";

const exampleText = `이 연구는 다양한 분야에서 인공지능의 활용 가능성을 탐구하며, 특히 교육 분야에서의 적용 사례를 중심으로 살펴보고자 한다. 또한 이러한 기술이 미래 사회에 미치는 영향을 전반적으로 분석하고, 이를 통해 보다 나은 정책 방향을 제시할 수 있을 것으로 기대된다.`;

export default function DetectorForm({ locale }: { locale: string }) {
  const t = useTranslations("detector");

  const [text,    setText]    = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [result,  setResult]  = useState<DetectionResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setResult(null);
    if (!text.trim()) { setError(t("errorEmpty")); return; }

    try {
      setLoading(true);
      const res  = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || t("errorFailed")); return; }
      setResult(data as DetectionResponse);
    } catch {
      setError(t("errorFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-6 max-w-4xl px-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">{t("inputTitle")}</h2>
            <button
              type="button"
              onClick={() => setText(exampleText)}
              className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition"
            >
              {t("loadExample")}
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            maxLength={CHAR_LIMIT}
            className="flex-1 min-h-[280px] w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 resize-none"
          />

          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs ${text.length > CHAR_LIMIT * 0.9 ? "text-red-500" : "text-zinc-400"}`}>
              {text.length.toLocaleString()} / {CHAR_LIMIT.toLocaleString()}
            </span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {t("submitting")}
              </span>
            ) : t("submit")}
          </button>
        </form>

        {/* Result */}
        {result ? (
          <DetectorResult
            result={result}
            originalText={text}
            locale={locale}
            labels={{
              scoreTitle:       t("scoreTitle"),
              patternsTitle:    t("patternsTitle"),
              suggestionsTitle: t("suggestionsTitle"),
              ctaLabel:         t("ctaLabel"),
              chipLow:          t("chipLow"),
              chipMedium:       t("chipMedium"),
              chipHigh:         t("chipHigh"),
            }}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 flex flex-col items-center justify-center min-h-[320px] text-center">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-sm font-medium text-zinc-500">{t("emptyTitle")}</div>
            <div className="text-xs text-zinc-400 mt-1">{t("emptyDesc")}</div>
          </div>
        )}
      </div>
    </section>
  );
}
