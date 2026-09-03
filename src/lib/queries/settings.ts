import { createClient } from "@/lib/supabase/server";
import type { SiteSettingRow } from "@/types/database";
import type { SiteSettings } from "@/types/domain";

/**
 * Baseline copy. The DB overrides any key present in `site_settings`, but the
 * site always has readable text even when the row is missing or the backend
 * is unreachable.
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  brand_name: "[ชื่อแบรนด์ • ตัวอย่าง]",
  brand_short: "ม่านสตูดิโอ",
  brand_tagline: "ม่านม้วน มู่ลี่ และงานตกแต่งช่องแสง",
  hero_title: "ม่านม้วนและมู่ลี่ ที่เลือกให้พอดีกับบ้านคุณ",
  hero_subtitle:
    "รวมสินค้าตกแต่งช่องแสงสำหรับบ้าน คอนโด และสำนักงาน พร้อมทีมวัดพื้นที่และติดตั้งจริง — เว็บนี้เป็นตัวอย่างสำหรับสาธิต ข้อมูลและรูปภาพทั้งหมดยังไม่ใช่ของจริง",
  about_body:
    "ข้อความ About นี้เป็นตัวอย่างสำหรับสาธิตหน้าเว็บ สามารถแก้ไขได้จากระบบหลังบ้าน",
  phone: "0X-XXX-XXXX",
  email: "example@your-domain.co.th",
  address: "เลขที่ 000 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพฯ 10000",
  line_id: "@example (ตัวอย่าง)",
  facebook_url: "https://facebook.com/",
  instagram_url: "https://instagram.com/",
  business_hours: "จันทร์–เสาร์ 09:00–18:00 น. (ตัวอย่าง)",
  service_area: "กรุงเทพฯ ปริมณฑล และต่างจังหวัด (นัดหมายล่วงหน้า) — ข้อมูลตัวอย่าง",
  map_query: "Bangkok",
  demo_notice:
    "เว็บไซต์นี้เป็นเวอร์ชันตัวอย่างสำหรับสาธิต ข้อมูลบริษัท สินค้า ราคา รูปภาพ และผลงานทั้งหมดเป็นข้อมูลสมมติ",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) throw error;

    const merged: SiteSettings = { ...DEFAULT_SETTINGS };
    for (const row of (data ?? []) as Pick<SiteSettingRow, "key" | "value">[]) {
      if (row.value?.trim()) merged[row.key] = row.value;
    }
    return merged;
  } catch (err) {
    console.warn("[settings] falling back to defaults:", (err as Error).message);
    return { ...DEFAULT_SETTINGS };
  }
}

/** Full rows including timestamps — used by the admin editor. */
export async function getSettingRows(): Promise<SiteSettingRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key");

  if (error) throw error;
  return (data ?? []) as SiteSettingRow[];
}
