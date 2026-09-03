import { notFound } from "next/navigation";

import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories, getProductById } from "@/lib/queries/catalog";

import { deleteProduct, updateProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <AdminPageHeader title="แก้ไขสินค้า" description={product.name} />
      <ProductForm
        action={updateProduct}
        categories={categories}
        defaultValues={product}
        submitLabel="บันทึกการแก้ไข"
      />

      <form
        action={deleteProduct}
        className="mt-10 border-t border-[var(--color-line)] pt-6"
      >
        <input type="hidden" name="id" value={product.id} />
        <ConfirmSubmit
          label="ลบสินค้านี้"
          confirmText={`ลบ "${product.name}" ออกจากเว็บ? การลบไม่สามารถย้อนกลับได้`}
        />
      </form>
    </div>
  );
}
