import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto mt-16 max-w-6xl px-4 pb-10">
      <div className="border-t border-zinc-200 pt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">{t("copy", { year })}</p>
        <div className="flex gap-4 text-xs text-zinc-400">
          <Link href={`/${locale}/about`} className="hover:text-zinc-700 transition">{t("links.about")}</Link>
          <Link href={`/${locale}/privacy-policy`} className="hover:text-zinc-700 transition">{t("links.privacy")}</Link>
          <Link href={`/${locale}/terms`} className="hover:text-zinc-700 transition">{t("links.terms")}</Link>
          <Link href={`/${locale}/contact`} className="hover:text-zinc-700 transition">{t("links.contact")}</Link>
        </div>
      </div>
    </footer>
  );
}
