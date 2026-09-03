"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { ActionState } from "@/app/admin/(dashboard)/products/actions";
import { Button } from "@/components/ui/button";
import { FieldShell, Select, TextArea, TextInput } from "@/components/ui/field";
import type { CategoryRow, ProductRow } from "@/types/database";

interface ProductFormProps {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  categories: CategoryRow[];
  defaultValues?: ProductRow;
  submitLabel: string;
}

export function ProductForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );
  const d = defaultValues;

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {d && <input type="hidden" name="id" value={d.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label="ชื่อสินค้า" htmlFor="name" required>
          <TextInput id="name" name="name" defaultValue={d?.name} required />
        </FieldShell>
        <FieldShell
          label="slug (ลิงก์)"
          htmlFor="slug"
          hint="เว้นว่างได้ ระบบจะสร้างจากชื่อให้"
        >
          <TextInput id="slug" name="slug" defaultValue={d?.slug} />
        </FieldShell>
      </div>

      <FieldShell label="หมวดหมู่" htmlFor="category_id" required>
        <Select
          id="category_id"
          name="category_id"
          defaultValue={d?.category_id ?? ""}
          required
        >
          <option value="" disabled>
            — เลือกหมวดหมู่ —
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </FieldShell>

      <FieldShell label="คำโปรยสั้น" htmlFor="summary">
        <TextArea id="summary" name="summary" rows={2} defaultValue={d?.summary} />
      </FieldShell>

      <FieldShell label="รายละเอียด" htmlFor="description">
        <TextArea
          id="description"
          name="description"
          rows={5}
          defaultValue={d?.description}
        />
      </FieldShell>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label="ช่วงราคา (ข้อความ)" htmlFor="price_range">
          <TextInput
            id="price_range"
            name="price_range"
            defaultValue={d?.price_range}
            placeholder="เช่น เริ่มต้น 1,200 บ./ตร.ม."
          />
        </FieldShell>
        <FieldShell label="ลำดับการแสดง" htmlFor="sort_order" hint="ตัวเลขน้อยขึ้นก่อน">
          <TextInput
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            defaultValue={d?.sort_order ?? 0}
          />
        </FieldShell>
      </div>

      <FieldShell
        label="จุดเด่น (บรรทัดละ 1 ข้อ)"
        htmlFor="features"
      >
        <TextArea
          id="features"
          name="features"
          rows={4}
          defaultValue={d?.features.join("\n")}
        />
      </FieldShell>

      <FieldShell
        label="ลิงก์รูปภาพเพิ่มเติม (บรรทัดละ 1 URL)"
        htmlFor="gallery"
        hint="เว้นว่างได้ ระบบจะใช้ภาพประกอบอัตโนมัติ"
      >
        <TextArea
          id="gallery"
          name="gallery"
          rows={3}
          defaultValue={d?.gallery.join("\n")}
        />
      </FieldShell>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={d ? d.is_published : true}
          />
          เผยแพร่บนเว็บ
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={d?.is_featured ?? false}
          />
          ตั้งเป็นสินค้าแนะนำ
        </label>
      </div>

      {state.error && (
        <p className="text-sm text-[var(--color-accent-dark)]">{state.error}</p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก…" : submitLabel}
        </Button>
        <Link href="/admin/products" className="link-underline text-sm">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
