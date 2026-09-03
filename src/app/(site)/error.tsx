"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrap flex flex-col items-start gap-5 py-24">
      <h1 className="text-2xl">ขออภัย โหลดหน้านี้ไม่สำเร็จ</h1>
      <p className="max-w-lg text-[var(--color-ink-soft)]">
        อาจเป็นปัญหาการเชื่อมต่อฐานข้อมูลชั่วคราว กรุณาลองใหม่อีกครั้ง
      </p>
      <Button onClick={reset}>ลองใหม่</Button>
    </div>
  );
}
