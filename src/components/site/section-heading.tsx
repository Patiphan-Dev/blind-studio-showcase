import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-[var(--color-ink)] pt-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-2xl md:text-3xl">{title}</h2>
        {description && (
          <p className="mt-3 text-[var(--color-ink-soft)]">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="hover-arrow group inline-flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-medium text-[var(--color-ink)]"
        >
          <span className="grow-line">{action.label}</span>
          <ArrowRightIcon width={16} height={16} className="text-[var(--color-accent)]" />
        </Link>
      )}
    </div>
  );
}
