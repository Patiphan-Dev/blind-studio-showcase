import Link from "next/link";
import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: { href: string; label: string };
  children?: ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  action,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-[var(--color-line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex h-10 items-center bg-[var(--color-ink)] px-4 font-[family-name:var(--font-display)] text-sm text-[var(--color-paper)] hover:bg-[var(--color-accent-dark)]"
        >
          {action.label}
        </Link>
      )}
      {children}
    </div>
  );
}
