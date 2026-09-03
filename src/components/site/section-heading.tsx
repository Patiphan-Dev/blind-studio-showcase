import Link from "next/link";
import type { ReactNode } from "react";

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
          className="link-underline shrink-0 font-[family-name:var(--font-display)] text-sm font-medium"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
