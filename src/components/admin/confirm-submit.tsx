"use client";

import { useFormStatus } from "react-dom";

interface ConfirmSubmitProps {
  label: string;
  pendingLabel?: string;
  confirmText: string;
  className?: string;
}

export function ConfirmSubmit({
  label,
  pendingLabel = "กำลังลบ…",
  confirmText,
  className,
}: ConfirmSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
      className={
        className ??
        "font-[family-name:var(--font-display)] text-sm text-[var(--color-accent-dark)] hover:underline disabled:opacity-50"
      }
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
