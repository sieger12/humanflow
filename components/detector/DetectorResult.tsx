"use client";

import { useRouter } from "next/navigation";
import ScoreGauge from "./ScoreGauge";
import HighlightedText from "./HighlightedText";
import type { DetectionResponse } from "@/types/detector";

type Props = {
  result: DetectionResponse;
  originalText: string;
  locale: string;
  labels: {
    scoreTitle: string;
    patternsTitle: string;
    suggestionsTitle: string;
    ctaLabel: string;
    chipLow: string;
    chipMedium: string;
    chipHigh: string;
  };
};

export default function DetectorResult({ result, originalText, locale, labels }: Props) {
  const router = useRouter();

  const chipLabel =
    result.label === "low"    ? labels.chipLow    :
    result.label === "medium" ? labels.chipMedium :
                                labels.chipHigh;

  const handleFix = () => {
    sessionStorage.setItem("humanizer_prefill", originalText);
    router.push(`/${locale}/ai-humanizer`);
  };

  return (
    <div className="space-y-4">
      {/* Score + summary */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <ScoreGauge
            score={result.score}
            label={result.label}
            chipLabel={chipLabel}
            scoreTitle={labels.scoreTitle}
          />
          <div className="flex-1 space-y-3">
            <p className="text-sm text-zinc-700 leading-6">{result.summary}</p>

            {result.suggestions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
                  {labels.suggestionsTitle}
                </p>
                <ul className="space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-xs text-zinc-600 flex gap-2">
                      <span className="text-zinc-400 flex-shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Highlighted patterns */}
      {result.suspiciousSentences.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
            {labels.patternsTitle}
          </p>
          <HighlightedText
            text={originalText}
            suspiciousSentences={result.suspiciousSentences}
          />
        </div>
      )}

      {/* Improve CTA — only show if score ≥ 40 */}
      {result.score >= 40 && (
        <button
          onClick={handleFix}
          className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-bold text-white hover:opacity-90 transition"
        >
          {labels.ctaLabel} →
        </button>
      )}
    </div>
  );
}
