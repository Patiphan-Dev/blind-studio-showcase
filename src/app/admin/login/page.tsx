import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/admin/login-form";
import { BrandMark } from "@/components/site/brand-mark";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบหลังบ้าน",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full items-center justify-center bg-[var(--color-paper-2)] px-5 py-16">
      <div className="w-full max-w-sm border border-[var(--color-ink)] bg-[var(--color-paper)] p-8">
        <div className="flex items-center gap-2.5">
          <BrandMark className="h-7 w-7 text-[var(--color-ink)]" />
          <span className="font-[family-name:var(--font-display)] font-semibold">
            ระบบหลังบ้าน
          </span>
        </div>
        <h1 className="mt-6 text-xl">เข้าสู่ระบบ</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          สำหรับผู้ดูแลเว็บไซต์เท่านั้น
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <Link
          href="/"
          className="link-underline mt-6 inline-block text-sm text-[var(--color-ink-soft)]"
        >
          ← กลับไปหน้าเว็บ
        </Link>
      </div>
    </div>
  );
}
