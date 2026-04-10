"use client";

type Props = {
  text: string;
  suspiciousSentences: string[];
  title?: string;
};

export default function HighlightedText({ text, suspiciousSentences, title }: Props) {
  if (!suspiciousSentences.length) {
    return (
      <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 leading-7 whitespace-pre-wrap">
        {text}
      </div>
    );
  }

  // Split text around suspicious sentences and highlight them
  let remaining = text;
  const parts: { text: string; highlight: boolean }[] = [];

  for (const sentence of suspiciousSentences) {
    const idx = remaining.indexOf(sentence);
    if (idx === -1) continue;
    if (idx > 0) parts.push({ text: remaining.slice(0, idx), highlight: false });
    parts.push({ text: sentence, highlight: true });
    remaining = remaining.slice(idx + sentence.length);
  }
  if (remaining) parts.push({ text: remaining, highlight: false });

  return (
    <div>
      {title && <p className="mb-2 text-xs font-medium text-zinc-500">{title}</p>}
      <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 leading-7">
        {parts.map((part, i) =>
          part.highlight ? (
            <mark key={i} className="bg-amber-100 text-amber-800 rounded px-0.5">
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </div>
    </div>
  );
}
