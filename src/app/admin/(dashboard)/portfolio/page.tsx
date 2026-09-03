import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { getAllProjectsForAdmin } from "@/lib/queries/projects";
import { formatThaiMonthYear } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const projects = await getAllProjectsForAdmin();

  return (
    <div>
      <AdminPageHeader
        title="ผลงานติดตั้ง"
        description={`ทั้งหมด ${projects.length} รายการ`}
        action={{ href: "/admin/portfolio/new", label: "+ เพิ่มผลงาน" }}
      />

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">ยังไม่มีผลงาน</p>
      ) : (
        <div className="overflow-x-auto border border-[var(--color-line)]">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="border-b border-[var(--color-line)] bg-[var(--color-paper-2)] text-left">
              <tr>
                <th className="p-3 font-medium">ชื่อผลงาน</th>
                <th className="p-3 font-medium">สถานที่</th>
                <th className="p-3 font-medium">ติดตั้ง</th>
                <th className="p-3 font-medium">สถานะ</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[var(--color-line)] last:border-0"
                >
                  <td className="p-3 font-medium">{project.title}</td>
                  <td className="p-3 text-[var(--color-ink-soft)]">
                    {project.location || "—"}
                  </td>
                  <td className="p-3 text-[var(--color-ink-soft)]">
                    {formatThaiMonthYear(project.completed_on) || "—"}
                  </td>
                  <td className="p-3">
                    <span className="flex flex-wrap gap-1.5">
                      <Badge tone={project.is_published ? "neutral" : "muted"}>
                        {project.is_published ? "เผยแพร่" : "ซ่อน"}
                      </Badge>
                      {project.is_featured && <Badge tone="accent">เด่น</Badge>}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/portfolio/${project.id}`}
                      className="link-underline"
                    >
                      แก้ไข
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
