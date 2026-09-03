import { createClient } from "@/lib/supabase/server";
import type { CategoryRow, ProductRow } from "@/types/database";
import type { ProductWithCategory } from "@/types/domain";

const PRODUCT_SELECT =
  "*, category:categories(slug, name)";

/** Ordered category list. Degrades to `[]` if the backend is unreachable. */
export async function getCategories(): Promise<CategoryRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return (data ?? []) as CategoryRow[];
  } catch (err) {
    console.warn("[catalog] getCategories:", (err as Error).message);
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as CategoryRow) ?? null;
}

interface ProductQuery {
  categorySlug?: string;
  featuredOnly?: boolean;
  limit?: number;
}

export async function getProducts(
  opts: ProductQuery = {},
): Promise<ProductWithCategory[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_published", true)
      .order("sort_order");

    if (opts.featuredOnly) query = query.eq("is_featured", true);
    if (opts.limit) query = query.limit(opts.limit);

    const { data, error } = await query;
    if (error) throw error;

    let rows = (data ?? []) as unknown as ProductWithCategory[];
    if (opts.categorySlug) {
      rows = rows.filter((p) => p.category?.slug === opts.categorySlug);
    }
    return rows;
  } catch (err) {
    console.warn("[catalog] getProducts:", (err as Error).message);
    return [];
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithCategory | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as ProductWithCategory) ?? null;
}

/** Admin: every product regardless of publish state. */
export async function getAllProductsForAdmin(): Promise<ProductWithCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as unknown as ProductWithCategory[];
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as ProductRow) ?? null;
}
