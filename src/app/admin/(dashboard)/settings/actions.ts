"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { SETTING_FIELDS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export interface SettingsActionState {
  ok?: boolean;
  error?: string;
}

export async function saveSettings(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    await requireAdmin();

    const rows = SETTING_FIELDS.map((field) => ({
      key: field.key,
      value: String(formData.get(field.key) ?? "").trim(),
    }));

    const supabase = await createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });
    if (error) return { error: error.message };
  } catch (err) {
    return { error: (err as Error).message };
  }

  for (const path of ["/", "/about", "/contact", "/products", "/portfolio"]) {
    revalidatePath(path);
  }
  return { ok: true };
}
