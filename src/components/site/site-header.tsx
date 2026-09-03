"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/site/brand-mark";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  brandShort: string;
  tagline: string;
}

export function SiteHeader({ brandShort, tagline }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="h-7 w-7 text-[var(--color-ink)]" />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight">
              {brandShort}
            </span>
            <span className="mt-1 hidden text-[11px] text-[var(--color-ink-faint)] sm:block">
              {tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-[family-name:var(--font-display)] text-sm transition-colors",
                pathname.startsWith(link.href)
                  ? "text-[var(--color-ink)]"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="เมนู"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-[var(--color-line-strong)] md:hidden"
        >
          <span className="text-lg">{open ? "✕" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-line)] md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-b border-[var(--color-line)] px-5 py-3.5 font-[family-name:var(--font-display)] text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
