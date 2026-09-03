import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectForm } from "@/components/admin/project-form";

import { createProject } from "../actions";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader
        title="เพิ่มผลงานติดตั้ง"
        description="กรอกรายละเอียดงานที่จะแสดงในหน้าผลงาน"
      />
      <ProjectForm action={createProject} submitLabel="บันทึกผลงาน" />
    </div>
  );
}
