"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AdminNavProps {
  unhandled: number;
}

export function AdminNav({ unhandled }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-[var(--color-line)] md:flex-col md:overflow-visible md:border-b-0 md:border-r md:pr-4">
      {ADMIN_NAV_LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-2 font-[family-name:var(--font-display)] text-sm transition-colors md:rounded-none",
              active
                ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]",
            )}
          >
            {link.label}
            {link.href === "/admin/messages" && unhandled > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center bg-[var(--color-accent)] px-1 text-xs text-[var(--color-on-accent)]">
                {unhandled}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
