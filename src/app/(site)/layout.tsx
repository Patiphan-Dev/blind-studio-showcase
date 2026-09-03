import { DemoBadge } from "@/components/site/demo-badge";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSettings } from "@/lib/queries/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <DemoBadge notice={settings.demo_notice} />
      <SiteHeader
        brandShort={settings.brand_short}
        tagline={settings.brand_tagline}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
    </>
  );
}
