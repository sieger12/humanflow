import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}`}
            className="text-lg font-extrabold tracking-tight text-zinc-900"
          >
            HumanFlow
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link
              href={`/${locale}/ai-humanizer`}
              className="text-zinc-500 hover:text-zinc-900 transition font-medium"
            >
              Rewriter
            </Link>
            <Link
              href={`/${locale}/ai-detector`}
              className="text-zinc-500 hover:text-zinc-900 transition font-medium"
            >
              Pattern Check
            </Link>
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
