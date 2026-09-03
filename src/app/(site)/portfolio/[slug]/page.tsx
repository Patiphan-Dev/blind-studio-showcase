import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlindGraphic } from "@/components/site/blind-graphic";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/queries/projects";
import { formatThaiMonthYear } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "ไม่พบผลงาน" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="wrap py-12">
      <nav className="text-sm text-[var(--color-ink-faint)]">
        <Link href="/portfolio" className="link-underline">
          ผลงานติดตั้ง
        </Link>
      </nav>

      <header className="mt-6 border-t border-[var(--color-ink)] pt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-ink-faint)]">
          <span>{project.location}</span>
          {project.completed_on && (
            <span>· {formatThaiMonthYear(project.completed_on)}</span>
          )}
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
          {project.description}
        </p>
        {project.product_types.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.product_types.map((type) => (
              <Badge key={type} tone="muted">
                {type}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((frame) => (
          <div
            key={frame}
            className="aspect-4/3 border border-[var(--color-line)]"
          >
            <BlindGraphic seed={project.slug} frame={frame} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/contact">ปรึกษางานลักษณะนี้</ButtonLink>
        <ButtonLink href="/products" variant="outline">
          ดูสินค้าทั้งหมด
        </ButtonLink>
      </div>
      <p className="mt-4 text-xs text-[var(--color-ink-faint)]">
        โครงการ สถานที่ และรูปภาพทั้งหมดเป็นข้อมูลตัวอย่างสำหรับสาธิต
      </p>
    </div>
  );
}
