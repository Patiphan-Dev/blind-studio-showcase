import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSettings } from "@/lib/queries/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <AdminPageHeader
        title="ข้อความบนเว็บ"
        description="แก้ชื่อแบรนด์ ข้อความหน้าแรก ข้อมูลติดต่อ และข้อความส่วนต่างๆ ที่แสดงบนหน้าเว็บ"
      />
      <SettingsForm values={settings} />
    </div>
  );
}
