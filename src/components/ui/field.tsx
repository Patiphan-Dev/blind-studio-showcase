import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const CONTROL =
  "w-full border border-[var(--color-line-strong)] bg-white px-3 py-2.5 text-sm " +
  "text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] " +
  "focus:border-[var(--color-ink)] focus:outline-none";

interface FieldShellProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldShell({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-[family-name:var(--font-display)] text-sm font-medium"
      >
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </label>
      {hint && <p className="text-xs text-[var(--color-ink-faint)]">{hint}</p>}
      {children}
      {error && <p className="text-xs text-[var(--color-accent-dark)]">{error}</p>}
    </div>
  );
}

export function TextInput({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea className={cn(CONTROL, "min-h-24 resize-y", className)} {...props} />;
}

export function Select({
  className,
  ...props
}: ComponentProps<"select">) {
  return <select className={cn(CONTROL, className)} {...props} />;
}
