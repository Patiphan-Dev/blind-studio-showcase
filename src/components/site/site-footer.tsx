import Link from "next/link";

import { BrandMark } from "@/components/site/brand-mark";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/icons";
import { NAV_LINKS } from "@/lib/constants";
import type { SiteSettings } from "@/types/domain";

interface SiteFooterProps {
  settings: SiteSettings;
}

export function SiteFooter({ settings: s }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-[var(--color-ink)] bg-[var(--color-paper-2)]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-6 w-6 text-[var(--color-ink)]" />
            <span className="font-[family-name:var(--font-display)] text-base font-semibold">
              {s.brand_short}
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-[var(--color-ink-soft)]">
            {s.brand_tagline}
          </p>
          <p className="mt-4 max-w-sm text-xs text-[var(--color-ink-faint)]">
            {s.demo_notice}
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-1">เมนู</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm text-[var(--color-ink-soft)]">
          <p className="eyebrow mb-1">ติดต่อ</p>
          <span className="flex items-center gap-2">
            <PhoneIcon className="shrink-0 text-[var(--color-accent)]" width={16} height={16} />
            {s.phone}
          </span>
          <span className="flex items-center gap-2">
            <MailIcon className="shrink-0 text-[var(--color-accent)]" width={16} height={16} />
            {s.email}
          </span>
          <span className="flex items-center gap-2 text-xs text-[var(--color-ink-faint)]">
            <ClockIcon className="shrink-0" width={16} height={16} />
            {s.business_hours}
          </span>
          <span className="mt-1 flex items-center gap-3">
            <a
              href={s.facebook_url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
            >
              <FacebookIcon />
            </a>
            <a
              href={s.instagram_url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
            >
              <InstagramIcon />
            </a>
          </span>
        </div>
      </div>

      <div className="wrap flex flex-col gap-1 border-t border-[var(--color-line-strong)] py-5 text-xs text-[var(--color-ink-faint)] sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {s.brand_name} — ข้อมูลทั้งหมดเป็นตัวอย่าง
        </span>
        <Link href="/admin" className="hover:text-[var(--color-ink)]">
          เข้าสู่ระบบหลังบ้าน
        </Link>
      </div>
    </footer>
  );
}
