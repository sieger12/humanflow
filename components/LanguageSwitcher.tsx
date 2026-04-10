"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "en", label: "English",  flag: "🇺🇸" },
  { code: "ko", label: "한국어",    flag: "🇰🇷" },
  { code: "ja", label: "日本語",    flag: "🇯🇵" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "de", label: "Deutsch",  flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  const switchLocale = (code: string) => {
    // Replace current locale segment in path
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg className={`h-4 w-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-zinc-50 ${
                  lang.code === locale ? "font-semibold text-zinc-900 bg-zinc-50" : "text-zinc-600"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
