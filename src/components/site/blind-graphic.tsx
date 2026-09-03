import { categoryColor } from "@/components/site/category-visuals";
import { cn } from "@/lib/utils";

type Variant = "roller" | "venetian" | "zebra" | "screen";

const VARIANT_BY_CATEGORY: Record<string, Variant> = {
  "roller-blind": "roller",
  "dimout-blind": "roller",
  "zebra-blind": "zebra",
  "wood-blind": "venetian",
  "aluminium-blind": "venetian",
  "roller-screen": "screen",
};

interface BlindGraphicProps {
  seed: string;
  categorySlug?: string | null;
  frame?: number;
  className?: string;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pickVariant(seed: string, categorySlug?: string | null): Variant {
  if (categorySlug && VARIANT_BY_CATEGORY[categorySlug]) {
    return VARIANT_BY_CATEGORY[categorySlug];
  }
  const options: Variant[] = ["roller", "venetian", "zebra", "screen"];
  return options[hash(seed) % options.length];
}

/**
 * Deterministic, asset-free illustration of a window treatment.
 * Same seed always renders the same picture; `frame` nudges the composition
 * so a gallery shows visibly different views of one product.
 */
export function BlindGraphic({
  seed,
  categorySlug,
  frame = 0,
  className,
}: BlindGraphicProps) {
  const h = hash(`${seed}#${frame}`);
  const variant = pickVariant(seed, categorySlug);
  const drop = 30 + (h % 4) * 12; // how far the blind is lowered, in %
  const openY = 120 + (drop / 100) * 300;
  const tint = categoryColor(categorySlug);
  const useTint = h % 2 === 0;
  const blindFill = useTint ? tint : "var(--color-ink-soft)";

  return (
    <svg
      viewBox="0 0 800 600"
      role="img"
      aria-label="ภาพประกอบสินค้า (ตัวอย่าง)"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`sky-${seed}-${frame}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--color-paper-2)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="var(--color-paper-2)" />
      <rect x="120" y="90" width="560" height="430" fill={`url(#sky-${seed}-${frame})`} />
      {/* window opening */}
      <rect
        x="120"
        y="90"
        width="560"
        height="430"
        fill="#ffffff"
        stroke="var(--color-line-strong)"
        strokeWidth="2"
      />
      <line
        x1="400"
        y1="90"
        x2="400"
        y2="520"
        stroke="var(--color-line)"
        strokeWidth="2"
      />
      <line
        x1="120"
        y1="305"
        x2="680"
        y2="305"
        stroke="var(--color-line)"
        strokeWidth="2"
      />

      {/* headrail */}
      <rect x="104" y="70" width="592" height="20" fill="var(--color-ink)" />
      {/* pull cord */}
      <g className="float-y" style={{ transformOrigin: "660px 90px" }}>
        <line x1="660" y1="90" x2="660" y2={openY - 30} stroke="var(--color-ink-faint)" strokeWidth="2" />
        <circle cx="660" cy={openY - 24} r="7" fill={tint} />
      </g>

      <g className="blind-drop">
        {variant === "roller" && (
          <>
            <rect x="120" y="90" width="560" height={openY - 90} fill={blindFill} opacity={useTint ? 0.82 : 0.72} />
            <rect x="120" y={openY - 14} width="560" height="14" fill="var(--color-ink)" />
            <rect x="392" y={openY} width="16" height="34" fill="var(--color-ink)" />
          </>
        )}

        {variant === "zebra" &&
          Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="120"
              y={90 + i * ((openY - 90) / 12)}
              width="560"
              height={(openY - 90) / 12 / 2}
              fill={i % 2 === 0 ? blindFill : "var(--color-ink-soft)"}
              opacity="0.7"
            />
          ))}

        {variant === "venetian" &&
          Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x="120"
              y={98 + i * 26}
              width="560"
              height="16"
              rx="2"
              fill={useTint && i % 3 === 0 ? tint : "var(--color-ink-soft)"}
              opacity={0.5 + (i % 3) * 0.14}
            />
          ))}

        {variant === "screen" && (
          <>
            <rect x="120" y="90" width="560" height="430" fill="var(--color-ink-soft)" opacity="0.12" />
            <rect x="120" y="90" width="560" height={openY - 90} fill={blindFill} opacity="0.24" />
            <rect x="120" y={openY - 10} width="560" height="10" fill="var(--color-ink)" />
          </>
        )}
      </g>
    </svg>
  );
}
