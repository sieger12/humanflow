"use client";

// Replace the inner div with your Google AdSense <ins> tag when live.
// Keep the outer wrapper — it controls layout and prevents CLS.

type Props = {
  slot?: string;       // AdSense data-ad-slot value
  format?: "horizontal" | "rectangle" | "auto";
  className?: string;
};

export default function AdSlot({ slot, format = "auto", className = "" }: Props) {
  const height =
    format === "horizontal" ? "h-[90px]" :
    format === "rectangle"  ? "h-[250px]" :
                              "h-[100px]";

  // In production, swap this div for:
  // <ins className="adsbygoogle" style={{display:"block"}}
  //      data-ad-client="ca-pub-XXXXXXXX"
  //      data-ad-slot={slot}
  //      data-ad-format={format} />
  return (
    <div className={`w-full ${height} ${className}`} aria-label="Advertisement">
      {/* AdSense placeholder — remove background in production */}
      <div className="w-full h-full rounded-xl bg-zinc-100 border border-dashed border-zinc-200 flex items-center justify-center">
        <span className="text-xs text-zinc-400 select-none">ad</span>
      </div>
    </div>
  );
}
