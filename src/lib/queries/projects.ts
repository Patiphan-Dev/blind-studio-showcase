import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/types/database";

interface ProjectQuery {
  featuredOnly?: boolean;
  limit?: number;
}

export async function getProjects(
  opts: ProjectQuery = {},
): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");

    if (opts.featuredOnly) query = query.eq("is_featured", true);
    if (opts.limit) query = query.limit(opts.limit);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as ProjectRow[];
  } catch (err) {
    console.warn("[projects] getProjects:", (err as Error).message);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as ProjectRow) ?? null;
}

export async function getAllProjectsForAdmin(): Promise<ProjectRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as ProjectRow[];
}

export async function getProjectById(id: string): Promise<ProjectRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as ProjectRow) ?? null;
}
