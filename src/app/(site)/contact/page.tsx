import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";

import {
  ChatIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { ContactForm } from "@/components/site/contact-form";
import { getSettings } from "@/lib/queries/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
};

export default async function ContactPage() {
  const s = await getSettings();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    s.map_query || "Bangkok",
  )}&output=embed`;

  type Row = {
    label: string;
    value: string;
    href?: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
  };
  const rows: Row[] = [
    { label: "โทรศัพท์", value: s.phone, href: `tel:${s.phone.replace(/[^0-9+]/g, "")}`, Icon: PhoneIcon },
    { label: "อีเมล", value: s.email, href: `mailto:${s.email}`, Icon: MailIcon },
    { label: "LINE", value: s.line_id, Icon: ChatIcon },
    { label: "ที่อยู่", value: s.address, Icon: MapPinIcon },
    { label: "เวลาทำการ", value: s.business_hours, Icon: ClockIcon },
    { label: "พื้นที่ให้บริการ", value: s.service_area, Icon: MapPinIcon },
  ];

  return (
    <div className="wrap py-12">
      <header className="border-t border-[var(--color-ink)] pt-5">
        <p className="eyebrow mb-2">ติดต่อเรา</p>
        <h1 className="text-3xl md:text-4xl">สอบถาม / นัดวัดพื้นที่</h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          กรอกแบบฟอร์มหรือติดต่อตามช่องทางด้านล่าง — ข้อมูลติดต่อทั้งหมดเป็นตัวอย่างสำหรับสาธิต
        </p>
      </header>

      <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <dl className="flex flex-col divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-3 py-3.5">
              <dt className="eyebrow flex items-center gap-1.5 pt-0.5">
                <row.Icon width={15} height={15} className="text-[var(--color-accent)]" />
                {row.label}
              </dt>
              <dd className="text-sm">
                {row.href ? (
                  <a href={row.href} className="link-underline">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
          <div className="grid grid-cols-[7rem_1fr] gap-3 py-3.5">
            <dt className="eyebrow pt-0.5">โซเชียล</dt>
            <dd className="flex gap-4 text-sm">
              <a
                href={s.facebook_url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                Facebook
              </a>
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                Instagram
              </a>
            </dd>
          </div>
        </dl>

        <div>
          <ContactForm />
        </div>
      </div>

      <div className="mt-12 aspect-16/9 border border-[var(--color-ink)]">
        <iframe
          title="แผนที่ (ตัวอย่าง)"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
