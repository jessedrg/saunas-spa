import { SUPPORTED_LOCALES } from "@/lib/seo-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saunaspa.io";

export async function GET() {
  const urls: string[] = [];
  
  // Homepage
  urls.push(BASE_URL);
  
  // Locale homepages
  for (const locale of SUPPORTED_LOCALES) {
    urls.push(`${BASE_URL}/${locale}`);
    urls.push(`${BASE_URL}/${locale}/about`);
    urls.push(`${BASE_URL}/${locale}/contact`);
  }
  
  // Static pages without locale
  urls.push(`${BASE_URL}/about`);
  urls.push(`${BASE_URL}/contact`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
