import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { BlindGraphic } from "@/components/site/blind-graphic";
import { categoryColor } from "@/components/site/category-visuals";
import { Badge } from "@/components/ui/badge";
import type { ProductWithCategory } from "@/types/domain";

interface ProductCardProps {
  product: ProductWithCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="hover-arrow group flex flex-col border border-[var(--color-line)] transition-colors hover:border-[var(--color-ink)]"
      style={{ borderTop: `3px solid ${categoryColor(product.category?.slug)}` }}
    >
      <div className="aspect-4/3 overflow-hidden border-b border-[var(--color-line)]">
        <BlindGraphic
          seed={product.slug}
          categorySlug={product.category?.slug}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          {product.category && (
            <Badge tone="muted">{product.category.name}</Badge>
          )}
          {product.is_featured && <Badge tone="accent">แนะนำ</Badge>}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--color-ink-soft)]">
          {product.summary}
        </p>
        <p className="mt-auto flex items-center justify-between pt-2 text-sm text-[var(--color-ink)]">
          <span>{product.price_range || " "}</span>
          <ArrowRightIcon
            width={16}
            height={16}
            className="text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100"
          />
        </p>
      </div>
    </Link>
  );
}
