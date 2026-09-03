import type { Metadata } from "next";

import { CategoryFilter } from "@/components/site/category-filter";
import { ProductCard } from "@/components/site/product-card";
import { getCategories, getProducts } from "@/lib/queries/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "ม่านม้วน มู่ลี่ไม้ มู่ลี่อลูมิเนียม ม่านปรับแสง และมุ้งม้วนกันแมลง (ตัวอย่าง)",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: cat }),
  ]);

  const activeCategory = categories.find((c) => c.slug === cat);

  return (
    <div className="wrap py-12">
      <header className="border-t border-[var(--color-ink)] pt-5">
        <p className="eyebrow mb-2">สินค้าทั้งหมด</p>
        <h1 className="text-3xl md:text-4xl">
          {activeCategory ? activeCategory.name : "ม่านม้วนและมู่ลี่"}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          {activeCategory
            ? activeCategory.description
            : "เลือกดูตามหมวดหมู่ ทุกรายการเป็นสินค้าตัวอย่างสำหรับสาธิตหน้าเว็บ"}
        </p>
      </header>

      <div className="mt-6">
        <CategoryFilter categories={categories} active={cat} />
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-[var(--color-ink-soft)]">
          ยังไม่มีสินค้าในหมวดนี้
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
