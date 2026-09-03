import { notFound } from "next/navigation";

import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectById } from "@/lib/queries/projects";

import { deleteProject, updateProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader title="แก้ไขผลงาน" description={project.title} />
      <ProjectForm
        action={updateProject}
        defaultValues={project}
        submitLabel="บันทึกการแก้ไข"
      />

      <form
        action={deleteProject}
        className="mt-10 border-t border-[var(--color-line)] pt-6"
      >
        <input type="hidden" name="id" value={project.id} />
        <ConfirmSubmit
          label="ลบผลงานนี้"
          confirmText={`ลบ "${project.title}" ออกจากเว็บ? การลบไม่สามารถย้อนกลับได้`}
        />
      </form>
    </div>
  );
}
