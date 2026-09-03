import { createClient } from "@/lib/supabase/server";

export interface AdminStats {
  products: number;
  publishedProducts: number;
  projects: number;
  publishedProjects: number;
  messages: number;
  unhandledMessages: number;
}

type Filter = Record<string, string | number | boolean>;

async function countRows(table: string, match?: Filter): Promise<number> {
  const supabase = await createClient();
  const query = supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  const { count, error } = await (match ? query.match(match) : query);
  if (error) throw error;
  return count ?? 0;
}

export async function getAdminStats(): Promise<AdminStats> {
  const [
    products,
    publishedProducts,
    projects,
    publishedProjects,
    messages,
    unhandledMessages,
  ] = await Promise.all([
    countRows("products"),
    countRows("products", { is_published: true }),
    countRows("projects"),
    countRows("projects", { is_published: true }),
    countRows("contact_messages"),
    countRows("contact_messages", { is_handled: false }),
  ]);

  return {
    products,
    publishedProducts,
    projects,
    publishedProjects,
    messages,
    unhandledMessages,
  };
}
