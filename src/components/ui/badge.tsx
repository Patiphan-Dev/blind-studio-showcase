import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "accent" | "muted";
  className?: string;
}

const TONES = {
  neutral: "border-[var(--color-line-strong)] text-[var(--color-ink)]",
  accent: "border-[var(--color-accent)] text-[var(--color-accent-dark)]",
  muted: "border-[var(--color-line)] text-[var(--color-ink-faint)]",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-xs font-medium",
        "font-[family-name:var(--font-display)] tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
