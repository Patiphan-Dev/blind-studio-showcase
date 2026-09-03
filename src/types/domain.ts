import type { CategoryRow, ProductRow, ProjectRow } from "@/types/database";

/** A product joined with its category name/slug for display. */
export interface ProductWithCategory extends ProductRow {
  category: Pick<CategoryRow, "slug" | "name"> | null;
}

export type Category = CategoryRow;
export type Project = ProjectRow;

/** Known keys in `site_settings`. Any string is still allowed at runtime. */
export type SettingKey =
  | "brand_name"
  | "brand_short"
  | "brand_tagline"
  | "hero_title"
  | "hero_subtitle"
  | "about_body"
  | "phone"
  | "email"
  | "address"
  | "line_id"
  | "facebook_url"
  | "instagram_url"
  | "business_hours"
  | "service_area"
  | "map_query"
  | "demo_notice";

export type SiteSettings = Record<SettingKey, string> & Record<string, string>;

export interface AdminSettingField {
  key: SettingKey;
  label: string;
  helper?: string;
  multiline?: boolean;
}
