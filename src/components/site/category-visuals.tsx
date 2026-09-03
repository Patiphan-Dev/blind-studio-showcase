import type { SVGProps } from "react";

/** Muted, earthy accent per category — a little colour without breaking the Swiss palette. */
export const CATEGORY_COLORS: Record<string, string> = {
  "roller-blind": "#b0532c",
  "dimout-blind": "#3f4a6b",
  "zebra-blind": "#2f6b63",
  "wood-blind": "#9a6b2f",
  "aluminium-blind": "#5b6b74",
  "roller-screen": "#5c6b3a",
};

export function categoryColor(slug?: string | null): string {
  return (slug && CATEGORY_COLORS[slug]) || "#b0532c";
}

interface GlyphProps extends SVGProps<SVGSVGElement> {
  slug?: string | null;
}

/** Compact line glyph that hints at the mechanism of each blind type. */
export function CategoryGlyph({ slug, ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 4h18" />
      {slug === "zebra-blind" ? (
        <>
          <path d="M5 8h14M5 12h14M5 16h14" />
          <path d="M5 8h14v2H5zM5 14h14v2H5z" fill="currentColor" opacity="0.18" stroke="none" />
        </>
      ) : slug === "wood-blind" || slug === "aluminium-blind" ? (
        <path d="M5 8h14M5 11h14M5 14h14M5 17h14" />
      ) : slug === "roller-screen" ? (
        <>
          <rect x="5" y="7" width="14" height="12" rx="1" />
          <path d="M5 11h14M5 15h14M9 7v12M14 7v12" opacity="0.5" />
        </>
      ) : slug === "dimout-blind" ? (
        <rect x="5" y="7" width="14" height="10" rx="1" fill="currentColor" opacity="0.16" />
      ) : (
        <>
          <path d="M5 7h14v7H5z" fill="currentColor" opacity="0.14" stroke="none" />
          <path d="M5 14h14" />
          <path d="M12 14v4" />
        </>
      )}
    </svg>
  );
}
