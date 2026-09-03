"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FieldShell, TextArea, TextInput } from "@/components/ui/field";
import { contactSchema } from "@/lib/validation/contact";

type Status = "idle" | "sending" | "done" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? "ส่งข้อความไม่สำเร็จ");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage((err as Error).message);
    }
  }

  if (status === "done") {
    return (
      <div className="border border-[var(--color-ink)] p-6">
        <p className="font-[family-name:var(--font-display)] text-lg">
          ได้รับข้อความแล้ว ขอบคุณครับ
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          นี่คือเว็บตัวอย่าง ข้อความถูกบันทึกไว้ในระบบหลังบ้านเพื่อสาธิตเท่านั้น
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-4 text-sm"
        >
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell label="ชื่อ-นามสกุล" htmlFor="name" required>
          <TextInput id="name" name="name" autoComplete="name" required />
        </FieldShell>
        <FieldShell label="เบอร์ติดต่อ" htmlFor="phone" required>
          <TextInput
            id="phone"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            required
          />
        </FieldShell>
      </div>
      <FieldShell label="อีเมล (ถ้ามี)" htmlFor="email">
        <TextInput id="email" name="email" type="email" autoComplete="email" />
      </FieldShell>
      <FieldShell
        label="รายละเอียดที่ต้องการสอบถาม"
        htmlFor="message"
        hint="เช่น ประเภทม่านที่สนใจ ขนาดหน้าต่างคร่าวๆ พื้นที่ติดตั้ง"
        required
      >
        <TextArea id="message" name="message" rows={5} required />
      </FieldShell>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" && (
        <p className="text-sm text-[var(--color-accent-dark)]">{message}</p>
      )}

      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "กำลังส่ง…" : "ส่งข้อความ"}
      </Button>
    </form>
  );
}
