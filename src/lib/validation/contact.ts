import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "กรุณากรอกชื่อ")
    .max(120, "ชื่อยาวเกินไป"),
  phone: z
    .string()
    .trim()
    .min(6, "กรุณากรอกเบอร์ติดต่อ")
    .max(40, "เบอร์ยาวเกินไป")
    .regex(/^[0-9+\-() ]+$/, "เบอร์ควรมีเฉพาะตัวเลขและ + - ( )"),
  email: z
    .string()
    .trim()
    .max(160, "อีเมลยาวเกินไป")
    .email("อีเมลไม่ถูกต้อง")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร")
    .max(2000, "ข้อความยาวเกินไป"),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
