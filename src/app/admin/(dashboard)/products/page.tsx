import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { getAllProductsForAdmin } from "@/lib/queries/catalog";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <AdminPageHeader
        title="สินค้า"
        description={`ทั้งหมด ${products.length} รายการ`}
        action={{ href: "/admin/products/new", label: "+ เพิ่มสินค้า" }}
      />

      {products.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">ยังไม่มีสินค้า</p>
      ) : (
        <div className="overflow-x-auto border border-[var(--color-line)]">
          <table className="w-full min-w-[40rem] text-sm">
            <thead className="border-b border-[var(--color-line)] bg-[var(--color-paper-2)] text-left">
              <tr>
                <th className="p-3 font-medium">ชื่อสินค้า</th>
                <th className="p-3 font-medium">หมวดหมู่</th>
                <th className="p-3 font-medium">สถานะ</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[var(--color-line)] last:border-0"
                >
                  <td className="p-3">
                    <span className="font-medium">{product.name}</span>
                    <span className="block text-xs text-[var(--color-ink-faint)]">
                      /{product.slug}
                    </span>
                  </td>
                  <td className="p-3 text-[var(--color-ink-soft)]">
                    {product.category?.name ?? "—"}
                  </td>
                  <td className="p-3">
                    <span className="flex flex-wrap gap-1.5">
                      <Badge tone={product.is_published ? "neutral" : "muted"}>
                        {product.is_published ? "เผยแพร่" : "ซ่อน"}
                      </Badge>
                      {product.is_featured && <Badge tone="accent">แนะนำ</Badge>}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
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
