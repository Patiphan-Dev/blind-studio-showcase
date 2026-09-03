/**
 * Hand-maintained mirror of the Supabase `public` schema.
 * Keep in sync with the SQL migrations in this project.
 */

export interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category_id: string | null;
  summary: string;
  description: string;
  features: string[];
  price_range: string;
  cover_image: string;
  gallery: string[];
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  location: string;
  summary: string;
  description: string;
  cover_image: string;
  gallery: string[];
  product_types: string[];
  completed_on: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  is_handled: boolean;
  created_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: string;
  updated_at: string;
}
