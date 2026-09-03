import { z } from "zod";

const slugField = z
  .string()
  .trim()
  .min(1, "กรุณากรอก slug")
  .max(120)
  .regex(/^[\p{L}\p{N}-]+$/u, "slug ใช้ได้เฉพาะตัวอักษร ตัวเลข และ -");

export const projectSchema = z.object({
  title: z.string().trim().min(2, "กรุณากรอกชื่อผลงาน").max(200),
  slug: slugField,
  location: z.string().trim().max(160).default(""),
  summary: z.string().trim().max(300).default(""),
  description: z.string().trim().max(4000).default(""),
  cover_image: z.string().trim().max(400).default(""),
  gallery: z.array(z.string().trim().min(1)).max(30).default([]),
  product_types: z.array(z.string().trim().min(1)).max(20).default([]),
  completed_on: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "รูปแบบวันที่ต้องเป็น YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
