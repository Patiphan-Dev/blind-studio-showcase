import type { Metadata } from "next";

import { CheckIcon } from "@/components/icons";
import { BlindGraphic } from "@/components/site/blind-graphic";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink } from "@/components/ui/button";
import { getSettings } from "@/lib/queries/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
};

const POINTS = [
  {
    title: "วัดหน้างานจริงทุกครั้ง",
    body: "ไม่ประเมินจากภาพถ่ายอย่างเดียว เพื่อให้ม่านพอดีช่องแสงและใช้งานได้จริง",
  },
  {
    title: "เลือกวัสดุตามการใช้งานห้อง",
    body: "ห้องนอน ห้องนั่งเล่น ครัว หรือออฟฟิศ ต้องการระดับการกันแสงและวัสดุต่างกัน",
  },
  {
    title: "เก็บงานติดตั้งเรียบร้อย",
    body: "ราง กล่องเก็บผ้า และแนวติดตั้งตรง พร้อมแนะนำวิธีดูแลรักษาหลังติดตั้ง",
  },
];

export default async function AboutPage() {
  const s = await getSettings();

  return (
    <div className="wrap py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="eyebrow mb-2">เกี่ยวกับเรา</p>
          <h1 className="text-3xl md:text-4xl">{s.brand_name}</h1>
          <p className="mt-5 whitespace-pre-line text-[var(--color-ink-soft)]">
            {s.about_body}
          </p>
          <dl className="mt-8 grid gap-4 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">พื้นที่ให้บริการ</dt>
              <dd className="mt-1 text-sm">{s.service_area}</dd>
            </div>
            <div>
              <dt className="eyebrow">เวลาทำการ</dt>
              <dd className="mt-1 text-sm">{s.business_hours}</dd>
            </div>
          </dl>
        </div>
        <div className="aspect-4/3 border border-[var(--color-ink)] lg:aspect-auto">
          <BlindGraphic seed="about" categorySlug="wood-blind" />
        </div>
      </div>

      <div className="mt-16 grid gap-px border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-3">
        {POINTS.map((point, i) => (
          <Reveal key={point.title} delay={i * 90} className="bg-[var(--color-paper)]">
            <div className="h-full p-6">
              <h2 className="flex items-start gap-2 text-lg">
                <CheckIcon
                  width={18}
                  height={18}
                  className="mt-1 shrink-0 text-[var(--color-accent)]"
                />
                {point.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {point.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 border-t border-[var(--color-ink)] pt-8">
        <ButtonLink href="/contact">นัดวัดพื้นที่ / สอบถามเพิ่มเติม</ButtonLink>
      </div>
    </div>
  );
}
