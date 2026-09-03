import { AdminPageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/queries/catalog";

import { createProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <AdminPageHeader title="เพิ่มสินค้า" description="กรอกข้อมูลสินค้าที่จะแสดงบนเว็บ" />
      <ProductForm
        action={createProduct}
        categories={categories}
        submitLabel="บันทึกสินค้า"
      />
    </div>
  );
}
