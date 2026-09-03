import { RulerIcon, SwatchIcon, WrenchIcon } from "@/components/icons";
import { CategoryGrid } from "@/components/site/category-grid";
import { HomeHero } from "@/components/site/home-hero";
import { ProductCard } from "@/components/site/product-card";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { getCategories, getProducts } from "@/lib/queries/catalog";
import { getProjects } from "@/lib/queries/projects";
import { getSettings } from "@/lib/queries/settings";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    n: "01",
    title: "นัดวัดพื้นที่",
    body: "ทีมงานเข้าวัดขนาดช่องแสงหน้างานจริง พร้อมดูทิศทางแสงและการใช้งานของแต่ละห้อง",
    Icon: RulerIcon,
  },
  {
    n: "02",
    title: "เลือกวัสดุและรุ่น",
    body: "เทียบเนื้อผ้า ระดับการกันแสง สีและระบบกลไก ให้เหมาะกับงบและการใช้งาน",
    Icon: SwatchIcon,
  },
  {
    n: "03",
    title: "ติดตั้งและเก็บงาน",
    body: "ติดตั้งตามคิวที่นัด เก็บรายละเอียดให้เรียบร้อย พร้อมแนะนำวิธีดูแลรักษา",
    Icon: WrenchIcon,
  },
];

export default async function HomePage() {
  const [settings, categories, featured, projects] = await Promise.all([
    getSettings(),
    getCategories(),
    getProducts({ featuredOnly: true, limit: 6 }),
    getProjects({ featuredOnly: true, limit: 2 }),
  ]);

  return (
    <>
      <HomeHero title={settings.hero_title} subtitle={settings.hero_subtitle} />

      <section className="wrap py-12">
        <SectionHeading
          eyebrow="หมวดหมู่สินค้า"
          title="เลือกดูตามประเภทช่องแสง"
          description="ม่านม้วน มู่ลี่ไม้ มู่ลี่อลูมิเนียม ม่านปรับแสง และมุ้งม้วนกันแมลง"
          action={{ href: "/products", label: "สินค้าทั้งหมด" }}
        />
        <CategoryGrid categories={categories} />
      </section>

      {featured.length > 0 && (
        <section className="wrap py-12">
          <SectionHeading
            eyebrow="สินค้าแนะนำ"
            title="รุ่นที่ลูกค้าเลือกบ่อย"
            action={{ href: "/products", label: "ดูทั้งหมด" }}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={(i % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap py-12">
        <SectionHeading eyebrow="ขั้นตอนการทำงาน" title="ตั้งแต่วัดพื้นที่จนติดตั้งเสร็จ" />
        <div className="mt-8 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="bg-[var(--color-paper)]"
            >
              <div className="group h-full p-6">
                <div className="flex items-center justify-between">
                  <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-accent)]">
                    {step.n}
                  </p>
                  <span className="text-[var(--color-ink-faint)] transition-colors group-hover:text-[var(--color-accent)]">
                    <step.Icon width={24} height={24} />
                  </span>
                </div>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="wrap py-12">
          <SectionHeading
            eyebrow="ผลงานติดตั้ง"
            title="ตัวอย่างงานที่ผ่านมา"
            action={{ href: "/portfolio", label: "ดูผลงานทั้งหมด" }}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap py-12">
        <div className="flex flex-col items-start gap-5 border border-[var(--color-ink)] bg-[var(--color-ink)] p-8 text-[var(--color-paper)] md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="text-2xl md:text-3xl">อยากได้ม่านแบบไหน ปรึกษาเราได้</h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--color-paper)]/80">
              ส่งขนาดหน้าต่างคร่าวๆ และห้องที่จะติดตั้งเข้ามา เดี๋ยวเราช่วยแนะนำรุ่นที่เหมาะ
            </p>
          </div>
          <ButtonLink
            href="/contact"
            variant="outline"
            className="border-[var(--color-paper)] text-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
          >
            ติดต่อเรา
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
