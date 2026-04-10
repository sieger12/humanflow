"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ResultCard from "@/components/ResultCard";

type Mode = "natural" | "short" | "professional" | "friendly" | "blog" | "email";
type Level = "basic" | "natural" | "very_human";

const MODE_KEYS: Mode[] = ["natural", "short", "professional", "friendly", "blog", "email"];

const LEVELS: { value: Level; emoji: string; labelKey: string; descKey: string }[] = [
  { value: "basic",      emoji: "✦",  labelKey: "basic",      descKey: "basicDesc" },
  { value: "natural",    emoji: "✦✦", labelKey: "natural",    descKey: "naturalDesc" },
  { value: "very_human", emoji: "🔥", labelKey: "veryHuman",  descKey: "veryHumanDesc" },
];

const exampleText = `이 제품은 매우 효율적이며 사용자에게 많은 도움을 제공할 수 있습니다. 또한 다양한 상황에서 활용이 가능하므로 전반적으로 유용성이 높다고 볼 수 있습니다. 특히 업무 환경에서 생산성을 향상시키는 데 기여할 수 있을 것으로 기대됩니다.`;

const charLimit = 6000;

export default function HumanizerForm() {
  const t  = useTranslations("form");
  const tm = useTranslations("modes");
  const tl = useTranslations("levels");

  const [text,    setText]    = useState("");
  const [mode,    setMode]    = useState<Mode>("natural");
  const [level,   setLevel]   = useState<Level>("natural");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [result,  setResult]  = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setResult("");
    if (!text.trim()) { setError("Please enter some text."); return; }

    try {
      setLoading(true);
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode, level }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setResult(data.result || "");
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">

      {/* Human Level */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-zinc-500">{tl("label")}</div>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map(({ value, emoji, labelKey, descKey }) => (
            <button
              key={value}
              type="button"
              onClick={() => setLevel(value)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition flex items-center gap-2 ${
                level === value
                  ? value === "very_human"
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span>{emoji}</span>
              <span>{tl(labelKey)}</span>
              <span className="text-xs opacity-60">{tl(descKey)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode selector */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-zinc-500">{t("modeLabel")}</div>
        <div className="flex flex-wrap gap-2">
          {MODE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                mode === key
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {tm(`${key}.label`)}
              <span className="ml-1.5 text-xs opacity-50">{tm(`${key}.sub`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input + Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">{t("inputTitle")}</h2>
            <button
              type="button"
              onClick={() => setText(exampleText)}
              className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50"
            >
              {t("loadExample")}
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("placeholder")}
            maxLength={charLimit}
            className="flex-1 min-h-[280px] w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 resize-none"
          />

          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs ${text.length > charLimit * 0.9 ? "text-red-500" : "text-zinc-400"}`}>
              {text.length.toLocaleString()} / {charLimit.toLocaleString()}
            </span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className={`mt-4 w-full rounded-xl py-3 text-sm font-bold text-white transition disabled:opacity-40 disabled:cursor-not-allowed ${
              level === "very_human"
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                : "bg-zinc-900 hover:opacity-90"
            }`}
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

        {result ? (
          <ResultCard result={result} copyLabel={t("copy")} copiedLabel={t("copied")} title={t("resultTitle")} />
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 flex flex-col items-center justify-center min-h-[320px] text-center">
            <div className="text-4xl mb-3">✨</div>
            <div className="text-sm font-medium text-zinc-500">{t("emptyTitle")}</div>
            <div className="text-xs text-zinc-400 mt-1">{t("emptyDesc")}</div>
          </div>
        )}
      </div>
    </section>
  );
}
