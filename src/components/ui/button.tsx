import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const BASE =
  "inline-flex items-center justify-center gap-2 px-5 h-11 text-sm font-medium " +
  "font-[family-name:var(--font-display)] tracking-tight transition-colors " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--color-ink)] disabled:opacity-50 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-accent-dark)]",
  outline:
    "border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:border-[var(--color-ink)]",
  ghost: "text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "solid",
  className,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...props} />
  );
}

export function ButtonLink({
  variant = "solid",
  className,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return <Link className={cn(BASE, VARIANTS[variant], className)} {...props} />;
}
