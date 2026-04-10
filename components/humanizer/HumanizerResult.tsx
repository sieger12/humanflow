"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { HumanizeVariant, VariantId } from "@/types/humanizer";

const VARIANT_META: Record<VariantId, { title: string; tags: string[] }> = {
  natural:  { title: "Natural Version",       tags: ["Balanced", "Versatile"] },
  clean:    { title: "Clean Rewrite Version", tags: ["More concise", "Less filler"] },
  readable: { title: "Readable Version",      tags: ["Better flow", "Varied rhythm"] },
};

type Props = {
  variants: HumanizeVariant[];
  bestVariantId: string;
  originalText: string;
  copyLabel: string;
  copiedLabel: string;
  bestLabel: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  regenerateLabel?: string;
};

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function WordDelta({ result, original }: { result: string; original: string }) {
  const delta = wordCount(result) - wordCount(original);
  if (delta === 0 || !original) return (
    <span className="text-[10px] text-zinc-300">{wordCount(result)} words</span>
  );
  const sign  = delta > 0 ? "+" : "";
  const color = delta < 0 ? "text-green-500" : "text-zinc-400";
  return (
    <span className={`text-[10px] ${color}`}>
      {wordCount(result)} words ({sign}{delta})
    </span>
  );
}

function CopyButton({ text, copyLabel, copiedLabel }: { text: string; copyLabel: string; copiedLabel: string }) {
  const [state, setState] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      alert("Copy failed.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
        state === "copied"
          ? "border-green-300 bg-green-50 text-green-700"
          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
      }`}
    >
      {state === "copied" ? (
        <>
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {copyLabel}
        </>
      )}
    </button>
  );
}

export default function HumanizerResult({
  variants,
  bestVariantId,
  originalText,
  copyLabel,
  copiedLabel,
  bestLabel,
  onRegenerate,
  isRegenerating,
  regenerateLabel = "Regenerate",
}: Props) {
  const tm = useTranslations("modes");
  const [view, setView] = useState<"result" | "original">("result");

  return (
    <div className="space-y-3">
      {/* Toggle + Regenerate row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1">
          <button
            onClick={() => setView("result")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              view === "result" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Rewritten
          </button>
          <button
            onClick={() => setView("original")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              view === "original" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Original
          </button>
        </div>

        {onRegenerate && (
          <div className="flex flex-col items-end gap-0.5">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition disabled:opacity-40"
            >
              <svg
                className={`w-3 h-3 ${isRegenerating ? "animate-spin" : ""}`}
                viewBox="0 0 12 12" fill="none"
              >
                <path
                  d="M10 6A4 4 0 012 6M2 6l1.5-1.5M2 6l1.5 1.5"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                />
              </svg>
              {isRegenerating ? "Generating..." : regenerateLabel}
            </button>
            {!isRegenerating && (
              <span className="text-[10px] text-zinc-400">different phrasing</span>
            )}
          </div>
        )}
      </div>

      {/* Original view */}
      {view === "original" ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-400">Your original text</p>
            <CopyButton text={originalText} copyLabel={copyLabel} copiedLabel={copiedLabel} />
          </div>
          <p className="text-sm leading-7 text-zinc-600 whitespace-pre-wrap">{originalText}</p>
        </div>
      ) : (
        variants.map((v) => {
          const isBest = v.id === bestVariantId;
          const meta   = VARIANT_META[v.id as VariantId];

          return (
            <div
              key={v.id}
              className={`rounded-2xl border bg-white p-4 shadow-sm transition ${
                isBest ? "border-zinc-800 border-l-[3px]" : "border-zinc-200"
              }`}
            >
              <div className="mb-2.5 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-800">
                      {meta?.title ?? v.id}
                    </span>
                    {isBest && (
                      <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white">
                        {bestLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-400">{tm(`${v.id}.desc`)}</p>
                  {meta?.tags && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {meta.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <CopyButton text={v.text} copyLabel={copyLabel} copiedLabel={copiedLabel} />
              </div>

              <p className="text-sm leading-7 text-zinc-700 whitespace-pre-wrap">{v.text}</p>

              {/* Word count delta vs original */}
              <div className="mt-2 text-right">
                <WordDelta result={v.text} original={originalText} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
