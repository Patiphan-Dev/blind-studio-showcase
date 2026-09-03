"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { linesToArray, slugify } from "@/lib/utils";
import { productSchema } from "@/lib/validation/product";

export interface ActionState {
  error?: string;
}

function readForm(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slugRaw = String(formData.get("slug") ?? "").trim();
  return productSchema.safeParse({
    name,
    slug: slugRaw || slugify(name),
    category_id: String(formData.get("category_id") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    price_range: String(formData.get("price_range") ?? ""),
    cover_image: String(formData.get("cover_image") ?? ""),
    features: linesToArray(String(formData.get("features") ?? "")),
    gallery: linesToArray(String(formData.get("gallery") ?? "")),
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  });
}

function friendlyError(message: string): string {
  if (message.includes("duplicate key")) return "slug นี้ถูกใช้แล้ว กรุณาเปลี่ยนใหม่";
  return message;
}

export async function createProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
    const parsed = readForm(formData);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" };
    }
    const supabase = await createClient();
    const { error } = await supabase.from("products").insert(parsed.data);
    if (error) return { error: friendlyError(error.message) };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  try {
    await requireAdmin();
    if (!id) return { error: "ไม่พบรายการที่ต้องการแก้ไข" };
    const parsed = readForm(formData);
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" };
    }
    const supabase = await createClient();
    const { error } = await supabase
      .from("products")
      .update(parsed.data)
      .eq("id", id);
    if (error) return { error: friendlyError(error.message) };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  await requireAdmin();
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}
