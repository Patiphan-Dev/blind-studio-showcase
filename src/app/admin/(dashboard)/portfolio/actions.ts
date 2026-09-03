"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { linesToArray, slugify } from "@/lib/utils";
import { projectSchema, type ProjectInput } from "@/lib/validation/project";

export interface ActionState {
  error?: string;
}

function readForm(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const slugRaw = String(formData.get("slug") ?? "").trim();
  return projectSchema.safeParse({
    title,
    slug: slugRaw || slugify(title),
    location: String(formData.get("location") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    cover_image: String(formData.get("cover_image") ?? ""),
    gallery: linesToArray(String(formData.get("gallery") ?? "")),
    product_types: linesToArray(String(formData.get("product_types") ?? "")),
    completed_on: String(formData.get("completed_on") ?? ""),
    is_featured: formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  });
}

function toRow(data: ProjectInput) {
  return { ...data, completed_on: data.completed_on ? data.completed_on : null };
}

function friendlyError(message: string): string {
  if (message.includes("duplicate key")) return "slug นี้ถูกใช้แล้ว กรุณาเปลี่ยนใหม่";
  return message;
}

export async function createProject(
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
    const { error } = await supabase.from("projects").insert(toRow(parsed.data));
    if (error) return { error: friendlyError(error.message) };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updateProject(
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
      .from("projects")
      .update(toRow(parsed.data))
      .eq("id", id);
    if (error) return { error: friendlyError(error.message) };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  await requireAdmin();
  if (!id) return;
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}
