# Supabase migrations

ไฟล์ SQL เหล่านี้คือสิ่งที่รันไว้กับโปรเจกต์ Supabase แล้ว (ผ่าน Supabase MCP)
เก็บไว้เพื่ออ้างอิงและใช้สร้างฐานข้อมูลใหม่ได้หากต้องย้ายโปรเจกต์

ลำดับการรัน:
1. `01_schema.sql`  — ตาราง + ทริกเกอร์ + Row Level Security + ตาราง admins
2. `02_seed_content.sql` — ข้อมูลตัวอย่าง (หมวดหมู่ / สินค้า / ผลงาน / ข้อความบนเว็บ)

## การสร้างบัญชีผู้ดูแล (ไม่เก็บรหัสผ่านไว้ในรีโป)

สร้างผู้ใช้จาก Supabase Dashboard → Authentication → Users → Add user
จากนั้นเพิ่ม user_id ลงตาราง `admins`:

```sql
insert into public.admins (user_id, email)
values ('<UUID-ของผู้ใช้>', '<อีเมล>');
```
