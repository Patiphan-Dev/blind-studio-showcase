import Link from "next/link";

import { BlindGraphic } from "@/components/site/blind-graphic";
import { Badge } from "@/components/ui/badge";
import { formatThaiMonthYear } from "@/lib/utils";
import type { Project } from "@/types/domain";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col border border-[var(--color-line)] transition-colors hover:border-[var(--color-ink)]"
    >
      <div className="aspect-16/10 overflow-hidden border-b border-[var(--color-line)]">
        <BlindGraphic
          seed={project.slug}
          frame={1}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-faint)]">
          <span>{project.location}</span>
          {project.completed_on && (
            <span>· {formatThaiMonthYear(project.completed_on)}</span>
          )}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--color-ink-soft)]">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.product_types.slice(0, 3).map((type) => (
            <Badge key={type} tone="muted">
              {type}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
