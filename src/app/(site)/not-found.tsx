import { ButtonLink } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <div className="wrap flex flex-col items-start gap-5 py-24">
      <p className="font-[family-name:var(--font-display)] text-5xl text-[var(--color-accent)]">
        404
      </p>
      <h1 className="text-2xl">ไม่พบหน้าที่ต้องการ</h1>
      <p className="text-[var(--color-ink-soft)]">
        หน้านี้อาจถูกย้ายหรือลบไปแล้ว
      </p>
      <ButtonLink href="/">กลับหน้าแรก</ButtonLink>
    </div>
  );
}
