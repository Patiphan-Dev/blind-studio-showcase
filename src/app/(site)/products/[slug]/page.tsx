import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckIcon } from "@/components/icons";
import { BlindGraphic } from "@/components/site/blind-graphic";
import { ProductCard } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getProductBySlug, getProducts } from "@/lib/queries/catalog";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "ไม่พบสินค้า" };
  return { title: product.name, description: product.summary };
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (
    await getProducts({ categorySlug: product.category?.slug, limit: 4 })
  ).filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="wrap py-12">
      <nav className="text-sm text-[var(--color-ink-faint)]">
        <Link href="/products" className="link-underline">
          สินค้า
        </Link>
        {product.category && (
          <>
            {" / "}
            <Link
              href={`/products?cat=${product.category.slug}`}
              className="link-underline"
            >
              {product.category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-3">
          <div className="aspect-4/3 border border-[var(--color-ink)]">
            <BlindGraphic
              seed={product.slug}
              categorySlug={product.category?.slug}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((frame) => (
              <div
                key={frame}
                className="aspect-square border border-[var(--color-line)]"
              >
                <BlindGraphic
                  seed={product.slug}
                  categorySlug={product.category?.slug}
                  frame={frame}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {product.category && <Badge>{product.category.name}</Badge>}
            {product.is_featured && <Badge tone="accent">แนะนำ</Badge>}
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl">{product.name}</h1>
          {product.price_range && (
            <p className="mt-3 text-lg text-[var(--color-ink)]">
              {product.price_range}
            </p>
          )}
          <p className="mt-4 text-[var(--color-ink-soft)]">{product.description}</p>

          {product.features.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2.5 border-t border-[var(--color-line)] pt-6">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <CheckIcon
                    width={17}
                    height={17}
                    className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">ขอใบเสนอราคา</ButtonLink>
            <ButtonLink href="/portfolio" variant="outline">
              ดูผลงานติดตั้ง
            </ButtonLink>
          </div>
          <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
            ราคาและสเปกทั้งหมดเป็นข้อมูลตัวอย่างสำหรับสาธิต
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="สินค้าที่เกี่ยวข้อง" title="ในหมวดเดียวกัน" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
