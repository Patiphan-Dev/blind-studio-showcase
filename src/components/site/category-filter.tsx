import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/domain";

interface CategoryFilterProps {
  categories: Category[];
  active?: string;
  basePath?: string;
}

export function CategoryFilter({
  categories,
  active,
  basePath = "/products",
}: CategoryFilterProps) {
  const items = [{ slug: "", name: "ทั้งหมด" }, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = (active ?? "") === item.slug;
        const href = item.slug ? `${basePath}?cat=${item.slug}` : basePath;
        return (
          <Link
            key={item.slug || "all"}
            href={href}
            className={cn(
              "border px-3 py-1.5 font-[family-name:var(--font-display)] text-sm transition-colors",
              isActive
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                : "border-[var(--color-line-strong)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]",
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
