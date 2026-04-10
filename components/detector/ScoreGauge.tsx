"use client";

import type { DetectionLabel } from "@/types/detector";

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const COLOR: Record<DetectionLabel, string> = {
  low:    "#22c55e",
  medium: "#f59e0b",
  high:   "#ef4444",
};

const CHIP: Record<DetectionLabel, string> = {
  low:    "bg-green-50 text-green-700 border-green-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high:   "bg-red-50 text-red-700 border-red-200",
};

type Props = {
  score: number;
  label: DetectionLabel;
  chipLabel: string;
  scoreTitle: string;
};

export default function ScoreGauge({ score, label, chipLabel, scoreTitle }: Props) {
  const offset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px]">
      <p className="text-xs font-medium text-zinc-400">{scoreTitle}</p>
      <div className="relative">
        <svg width="88" height="88" viewBox="0 0 100 100" className="-rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e4e4e7" strokeWidth="10" />
          <circle
            cx="50" cy="50" r={RADIUS}
            fill="none"
            stroke={COLOR[label]}
            strokeWidth="10"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-zinc-900">{score}</span>
          <span className="text-[10px] text-zinc-400">/100</span>
        </div>
      </div>
      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${CHIP[label]}`}>
        {chipLabel}
      </span>
    </div>
  );
}
