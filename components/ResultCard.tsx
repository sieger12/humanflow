"use client";

import { useState } from "react";

type Props = {
  result: string;
  title?: string;
  copyLabel?: string;
  copiedLabel?: string;
};

export default function ResultCard({
  result,
  title = "Humanized Result",
  copyLabel = "Copy",
  copiedLabel = "Copied!",
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy failed.");
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        <button
          onClick={handleCopy}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <div className="flex-1 min-h-[220px] whitespace-pre-wrap rounded-xl bg-zinc-50 p-4 text-sm leading-7 text-zinc-700">
        {result}
      </div>
    </div>
  );
}
