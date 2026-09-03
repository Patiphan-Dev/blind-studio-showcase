"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/site/brand-mark";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  brandShort: string;
  tagline: string;
}

export function SiteHeader({ brandShort, tagline }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--color-paper)]/95 backdrop-blur transition-[box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-[var(--color-line-strong)] shadow-[0_1px_0_var(--color-line)]"
          : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "wrap flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <BrandMark className="h-7 w-7 text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]" />
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
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "grow-line font-[family-name:var(--font-display)] text-sm transition-colors",
                  active
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="เมนู"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-[var(--color-line-strong)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
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
