import { z } from "zod";

const slugField = z
  .string()
  .trim()
  .min(1, "กรุณากรอก slug")
  .max(120)
  .regex(/^[\p{L}\p{N}-]+$/u, "slug ใช้ได้เฉพาะตัวอักษร ตัวเลข และ -");

export const productSchema = z.object({
  name: z.string().trim().min(2, "กรุณากรอกชื่อสินค้า").max(200),
  slug: slugField,
  category_id: z.string().uuid("กรุณาเลือกหมวดหมู่"),
  summary: z.string().trim().max(300).default(""),
  description: z.string().trim().max(4000).default(""),
  price_range: z.string().trim().max(120).default(""),
  cover_image: z.string().trim().max(400).default(""),
  features: z.array(z.string().trim().min(1)).max(20).default([]),
  gallery: z.array(z.string().trim().min(1)).max(20).default([]),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
