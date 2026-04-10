"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import HumanizerResult from "./HumanizerResult";
import AdSlot from "@/components/AdSlot";
import type { HumanizeResponse } from "@/types/humanizer";
import { CHAR_LIMIT } from "@/lib/constants/limits";

type Mode = "natural" | "clean" | "readable";

const MODES: Mode[] = ["natural", "clean", "readable"];

// Short, scannable — guides without distracting
const PLACEHOLDERS = [
  "Paste text here.",
  "Try a paragraph from a report or email.",
  "Korean, English, Japanese, Spanish — all supported.",
  "3,000 characters max. Results in seconds.",
  "No account needed. Just paste and go.",
];

const exampleText = `이 제품은 매우 효율적이며 사용자에게 많은 도움을 제공할 수 있습니다. 또한 다양한 상황에서 활용이 가능하므로 전반적으로 유용성이 높다고 볼 수 있습니다. 특히 업무 환경에서 생산성을 향상시키는 데 기여할 수 있을 것으로 기대됩니다.`;

async function fetchHumanize(text: string, mode: Mode): Promise<HumanizeResponse> {
  const res = await fetch("/api/humanize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, mode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed");
  return data as HumanizeResponse;
}

export default function HumanizerForm() {
  const t  = useTranslations("form");
  const tm = useTranslations("modes");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const [text,          setText]          = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [mode,          setMode]          = useState<Mode>("natural");
  const [loading,       setLoading]       = useState(false);
  const [regenerating,  setRegenerating]  = useState(false);
  const [error,         setError]         = useState("");
  const [result,        setResult]        = useState<HumanizeResponse | null>(null);

  // Pre-fill text from Detector CTA
  useEffect(() => {
    const prefill = sessionStorage.getItem("humanizer_prefill");
    if (prefill) {
      setText(prefill);
      sessionStorage.removeItem("humanizer_prefill");
      textareaRef.current?.focus();
    }
  }, []);

  // Rotate placeholder every 3.5s only when textarea is empty and unfocused
  useEffect(() => {
    if (text) return;
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(id);
  }, [text]);

  const run = useCallback(async (inputText: string, isRegen = false) => {
    setError("");
    if (!inputText.trim()) { setError(t("errorEmpty")); return; }
    isRegen ? setRegenerating(true) : setLoading(true);
    setSubmittedText(inputText);
    try {
      const data = await fetchHumanize(inputText, mode);
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t("errorFailed"));
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, [mode, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    run(text);
  };

  const handleRegenerate = () => run(submittedText, true);

  return (
    <section className="mx-auto mt-6 max-w-6xl px-4">
      {/* Mode selector */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium text-zinc-500">{t("modeLabel")}</div>
        <div className="flex flex-wrap gap-2">
          {MODES.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition flex items-center gap-2 ${
                mode === key
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span>{tm(`${key}.label`)}</span>
              <span className="text-xs opacity-60">{tm(`${key}.sub`)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">{t("inputTitle")}</h2>
            <button
              type="button"
              onClick={() => { setText(exampleText); textareaRef.current?.focus(); }}
              className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50"
            >
              {t("loadExample")}
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIdx]}
            maxLength={CHAR_LIMIT}
            autoFocus
            className="flex-1 min-h-[280px] w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 outline-none transition focus:border-zinc-400 resize-none placeholder:text-zinc-400 placeholder:text-sm"
          />

          <div className="mt-2 flex items-center justify-between">
            <span className={`text-xs ${text.length > CHAR_LIMIT * 0.9 ? "text-red-500" : "text-zinc-400"}`}>
              {text.length > 0
                ? `${text.length.toLocaleString()} / ${CHAR_LIMIT.toLocaleString()}`
                : `Max ${CHAR_LIMIT.toLocaleString()} characters`}
            </span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white hover:opacity-90 active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed"
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

        {/* Results */}
        {result ? (
          <div className="space-y-3 overflow-y-auto max-h-[700px] pr-1">
            <HumanizerResult
              variants={result.variants}
              bestVariantId={result.bestVariantId}
              originalText={submittedText}
              copyLabel={t("copy")}
              copiedLabel={t("copied")}
              bestLabel={t("bestLabel")}
              onRegenerate={handleRegenerate}
              isRegenerating={regenerating}
              regenerateLabel={t("regenerate")}
            />
            <AdSlot format="horizontal" className="mt-2" />
          </div>
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
