import { BlindGraphic } from "@/components/site/blind-graphic";
import { ButtonLink } from "@/components/ui/button";

interface HomeHeroProps {
  title: string;
  subtitle: string;
}

export function HomeHero({ title, subtitle }: HomeHeroProps) {
  return (
    <section className="wrap grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
      <div className="flex flex-col justify-center rise">
        <p className="eyebrow">ม่านม้วน · มู่ลี่ · งานตกแต่งช่องแสง</p>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-[var(--color-ink-soft)]">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">ดูสินค้าทั้งหมด</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            ปรึกษาการติดตั้ง
          </ButtonLink>
        </div>
      </div>
      <div className="relative aspect-4/3 border border-[var(--color-ink)] md:aspect-auto">
        <BlindGraphic seed="home-hero" categorySlug="zebra-blind" />
        <span className="absolute bottom-3 left-3 bg-[var(--color-ink)] px-2 py-1 text-[11px] text-[var(--color-paper)]">
          ภาพประกอบ • ตัวอย่าง
        </span>
      </div>
    </section>
  );
}
