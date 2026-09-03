import type { AdminSettingField } from "@/types/domain";

export const SITE_NAME_FALLBACK = "ม่านสตูดิโอ";

export const NAV_LINKS = [
  { href: "/products", label: "สินค้า" },
  { href: "/portfolio", label: "ผลงานติดตั้ง" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
] as const;

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "ภาพรวม", exact: true },
  { href: "/admin/products", label: "สินค้า", exact: false },
  { href: "/admin/portfolio", label: "ผลงานติดตั้ง", exact: false },
  { href: "/admin/messages", label: "ข้อความติดต่อ", exact: false },
  { href: "/admin/settings", label: "ข้อความบนเว็บ", exact: false },
] as const;

/** Fields the site owner can edit from /admin/settings. */
export const SETTING_FIELDS: AdminSettingField[] = [
  { key: "brand_name", label: "ชื่อแบรนด์ (เต็ม)" },
  { key: "brand_short", label: "ชื่อย่อ / โลโก้ข้อความ" },
  { key: "brand_tagline", label: "สโลแกนสั้น" },
  { key: "hero_title", label: "หัวข้อใหญ่หน้าแรก", multiline: true },
  { key: "hero_subtitle", label: "คำโปรยหน้าแรก", multiline: true },
  { key: "about_body", label: "เนื้อหาหน้าเกี่ยวกับเรา", multiline: true },
  { key: "phone", label: "เบอร์โทร" },
  { key: "email", label: "อีเมล" },
  { key: "address", label: "ที่อยู่", multiline: true },
  { key: "line_id", label: "LINE ID" },
  { key: "facebook_url", label: "ลิงก์ Facebook" },
  { key: "instagram_url", label: "ลิงก์ Instagram" },
  { key: "business_hours", label: "เวลาทำการ" },
  { key: "service_area", label: "พื้นที่ให้บริการ", multiline: true },
  {
    key: "map_query",
    label: "คำค้นหาแผนที่ (Google Maps)",
    helper: "เช่น ชื่อสถานที่ หรือพิกัด ใช้แสดงแผนที่หน้าติดต่อเรา",
  },
  { key: "demo_notice", label: "ข้อความแจ้งว่าเป็นเว็บตัวอย่าง", multiline: true },
];

export const REVALIDATE_SECONDS = 300;
