"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { ActionState } from "@/app/admin/(dashboard)/portfolio/actions";
import { Button } from "@/components/ui/button";
import { FieldShell, TextArea, TextInput } from "@/components/ui/field";
import type { ProjectRow } from "@/types/database";

interface ProjectFormProps {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  defaultValues?: ProjectRow;
  submitLabel: string;
}

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );
  const d = defaultValues;

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {d && <input type="hidden" name="id" value={d.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label="ชื่อผลงาน" htmlFor="title" required>
          <TextInput id="title" name="title" defaultValue={d?.title} required />
        </FieldShell>
        <FieldShell label="slug (ลิงก์)" htmlFor="slug" hint="เว้นว่างได้">
          <TextInput id="slug" name="slug" defaultValue={d?.slug} />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label="สถานที่ / พื้นที่" htmlFor="location">
          <TextInput
            id="location"
            name="location"
            defaultValue={d?.location}
            placeholder="เช่น คอนโดย่านทองหล่อ กรุงเทพฯ"
          />
        </FieldShell>
        <FieldShell
          label="เดือน/ปีที่ติดตั้ง"
          htmlFor="completed_on"
          hint="รูปแบบ YYYY-MM-DD"
        >
          <TextInput
            id="completed_on"
            name="completed_on"
            type="date"
            defaultValue={d?.completed_on ?? ""}
          />
        </FieldShell>
      </div>

      <FieldShell label="คำโปรยสั้น" htmlFor="summary">
        <TextArea id="summary" name="summary" rows={2} defaultValue={d?.summary} />
      </FieldShell>

      <FieldShell label="รายละเอียดงาน" htmlFor="description">
        <TextArea
          id="description"
          name="description"
          rows={5}
          defaultValue={d?.description}
        />
      </FieldShell>

      <FieldShell
        label="สินค้าที่ใช้ในงานนี้ (บรรทัดละ 1 รายการ)"
        htmlFor="product_types"
      >
        <TextArea
          id="product_types"
          name="product_types"
          rows={3}
          defaultValue={d?.product_types.join("\n")}
        />
      </FieldShell>

      <FieldShell
        label="ลิงก์รูปภาพ (บรรทัดละ 1 URL)"
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

      <FieldShell label="ลำดับการแสดง" htmlFor="sort_order" hint="ตัวเลขน้อยขึ้นก่อน">
        <TextInput
          id="sort_order"
          name="sort_order"
          type="number"
          min={0}
          defaultValue={d?.sort_order ?? 0}
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
          ตั้งเป็นผลงานเด่น
        </label>
      </div>

      {state.error && (
        <p className="text-sm text-[var(--color-accent-dark)]">{state.error}</p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก…" : submitLabel}
        </Button>
        <Link href="/admin/portfolio" className="link-underline text-sm">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
