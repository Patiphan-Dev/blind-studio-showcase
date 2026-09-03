import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { BrandMark } from "@/components/site/brand-mark";
import { getAdmin } from "@/lib/auth";
import { getUnhandledCount } from "@/lib/queries/messages";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login?error=forbidden");

  let unhandled = 0;
  try {
    unhandled = await getUnhandledCount();
  } catch {
    // non-fatal — badge just hides
  }

  return (
    <div className="flex min-h-full flex-col bg-[var(--color-paper)]">
      <header className="border-b border-[var(--color-ink)]">
        <div className="wrap flex h-14 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-6 w-6 text-[var(--color-ink)]" />
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold">
              ระบบหลังบ้าน
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-[var(--color-ink-faint)] sm:block">
              {admin.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="wrap flex flex-1 flex-col gap-6 py-8 md:flex-row md:gap-10">
        <aside className="md:w-52 md:shrink-0">
          <AdminNav unhandled={unhandled} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
