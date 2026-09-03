interface DemoBadgeProps {
  notice: string;
}

/** Persistent strip making clear the whole site is sample content. */
export function DemoBadge({ notice }: DemoBadgeProps) {
  return (
    <div className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="wrap flex items-center gap-3 py-2 text-xs">
        <span className="inline-flex shrink-0 items-center border border-[var(--color-paper)]/40 px-1.5 py-0.5 font-[family-name:var(--font-display)] font-semibold tracking-wide uppercase">
          ตัวอย่าง
        </span>
        <p className="truncate">{notice}</p>
      </div>
    </div>
  );
}
