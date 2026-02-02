import { SUPPORTED_LOCALES } from "@/lib/seo-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saunaspa.io";

// Locales that have massive city sitemaps
const MASSIVE_LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'cs', 'el'];
const PARTS_PER_LOCALE = 10;

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemaps/pages.xml`,
    ...SUPPORTED_LOCALES.map(locale => `${BASE_URL}/sitemaps/${locale}.xml`),
    // Add massive city sitemaps
    ...MASSIVE_LOCALES.flatMap(locale => 
      Array.from({ length: PARTS_PER_LOCALE }, (_, i) => 
        `${BASE_URL}/sitemaps-massive/massive-${locale}-${i + 1}.xml`
      )
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
