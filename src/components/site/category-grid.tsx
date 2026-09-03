import Link from "next/link";

import { BlindGraphic } from "@/components/site/blind-graphic";
import type { Category } from "@/types/domain";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-8 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?cat=${category.slug}`}
          className="group flex flex-col gap-3 bg-[var(--color-paper)] p-5 transition-colors hover:bg-[var(--color-paper-2)]"
        >
          <div className="aspect-16/9 overflow-hidden border border-[var(--color-line)]">
            <BlindGraphic seed={category.slug} categorySlug={category.slug} />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-lg">
            {category.name}
          </h3>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {category.description}
          </p>
          <span className="mt-auto pt-1 text-sm text-[var(--color-ink)] group-hover:underline">
            ดูสินค้าในหมวดนี้ →
          </span>
        </Link>
      ))}
    </div>
  );
}
