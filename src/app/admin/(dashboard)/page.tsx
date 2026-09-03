import Link from "next/link";

import { getAdminStats } from "@/lib/queries/stats";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    {
      label: "สินค้า",
      value: stats.products,
      sub: `เผยแพร่ ${stats.publishedProducts}`,
      href: "/admin/products",
    },
    {
      label: "ผลงานติดตั้ง",
      value: stats.projects,
      sub: `เผยแพร่ ${stats.publishedProjects}`,
      href: "/admin/portfolio",
    },
    {
      label: "ข้อความติดต่อ",
      value: stats.messages,
      sub: `ยังไม่จัดการ ${stats.unhandledMessages}`,
      href: "/admin/messages",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl">ภาพรวม</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        จัดการเนื้อหาที่แสดงบนหน้าเว็บได้จากเมนูด้านซ้าย
      </p>

      <div className="mt-6 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-[var(--color-paper)] p-5 transition-colors hover:bg-[var(--color-paper-2)]"
          >
            <p className="eyebrow">{card.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
              {card.sub}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 border-t border-[var(--color-line)] pt-6">
        <p className="eyebrow mb-3">ทางลัด</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/admin/products/new" className="link-underline">
            + เพิ่มสินค้าใหม่
          </Link>
          <Link href="/admin/portfolio/new" className="link-underline">
            + เพิ่มผลงานติดตั้ง
          </Link>
          <Link href="/admin/settings" className="link-underline">
            แก้ข้อความ / ข้อมูลติดต่อบนเว็บ
          </Link>
          <Link href="/" className="link-underline" target="_blank">
            เปิดดูหน้าเว็บจริง ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
