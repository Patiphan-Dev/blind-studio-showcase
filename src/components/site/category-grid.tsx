import Link from "next/link";

import { ArrowUpRightIcon } from "@/components/icons";
import { BlindGraphic } from "@/components/site/blind-graphic";
import {
  CategoryGlyph,
  categoryColor,
} from "@/components/site/category-visuals";
import { Reveal } from "@/components/site/reveal";
import type { Category } from "@/types/domain";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-8 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, i) => {
        const color = categoryColor(category.slug);
        return (
          <Reveal
            key={category.id}
            delay={(i % 3) * 70}
            className="bg-[var(--color-paper)]"
          >
            <Link
              href={`/products?cat=${category.slug}`}
              className="hover-arrow-diag group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-[var(--color-paper-2)]"
              style={{ borderTop: `3px solid ${color}` }}
            >
              <div className="relative aspect-16/9 overflow-hidden border border-[var(--color-line)]">
                <BlindGraphic seed={category.slug} categorySlug={category.slug} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg">
                  <span style={{ color }}>
                    <CategoryGlyph slug={category.slug} />
                  </span>
                  {category.name}
                </h3>
                <ArrowUpRightIcon
                  width={18}
                  height={18}
                  className="text-[var(--color-ink-faint)] transition-colors group-hover:text-[var(--color-ink)]"
                />
              </div>
              <p className="text-sm text-[var(--color-ink-soft)]">
                {category.description}
              </p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
