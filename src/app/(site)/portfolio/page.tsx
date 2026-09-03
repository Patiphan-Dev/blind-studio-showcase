import type { Metadata } from "next";

import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { getProjects } from "@/lib/queries/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ผลงานติดตั้ง",
  description: "ตัวอย่างงานติดตั้งม่านม้วนและมู่ลี่ในบ้าน คอนโด และสำนักงาน",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="wrap py-12">
      <header className="border-t border-[var(--color-ink)] pt-5">
        <p className="eyebrow mb-2">ผลงานติดตั้ง</p>
        <h1 className="text-3xl md:text-4xl">งานติดตั้งจริงที่ผ่านมา</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          รวมตัวอย่างงานติดตั้งในห้องและการใช้งานที่ต่างกัน ทุกโครงการและรูปภาพเป็นข้อมูลตัวอย่าง
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-12 text-[var(--color-ink-soft)]">ยังไม่มีผลงานที่เผยแพร่</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
