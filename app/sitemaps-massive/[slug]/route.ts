import { SUPPORTED_LOCALES, CATEGORIES, CATEGORY_TRANSLATIONS, LOCALES, INTENT_TRANSLATIONS, type Locale } from "@/lib/seo-data";
import citiesData from "@/lib/cities-processed.json";

const BASE_URL = "https://saunaboutique.io";

// Type for cities data
type CityData = { name: string; slug: string; population: number };
const CITIES_DB = citiesData as Record<string, CityData[]>;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  
  // Parse slug: format is "massive-{locale}-{part}.xml"
  const match = slug.match(/^massive-([a-z]{2})-(\d+)\.xml$/);
  if (!match) {
    return new Response("Not found", { status: 404 });
  }
  
  const locale = match[1] as Locale;
  const part = parseInt(match[2]);
  
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return new Response("Locale not supported", { status: 404 });
  }
  
  const prefix = `${BASE_URL}/${locale}`;
  const catTranslations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[locale] || INTENT_TRANSLATIONS.en;
  
  // Get cities for this locale's countries
  const localeData = LOCALES[locale];
  const allCities: string[] = [];
  for (const country of localeData.countries) {
    const countryCities = CITIES_DB[country];
    if (countryCities) {
      allCities.push(...countryCities.map((c: CityData) => c.slug));
    }
  }
  
  // Pagination: 5000 URLs per sitemap part
  const URLS_PER_PART = 5000;
  const startIdx = (part - 1) * URLS_PER_PART;
  
  // Generate all possible URLs
  const allUrls: string[] = [];
  
  // Pattern 1: category + city
  for (const cat of CATEGORIES) {
    const catSlug = catTranslations[cat].replace(/ /g, '-');
    for (const city of allCities) {
      allUrls.push(`${prefix}/${catSlug}-${city}`);
    }
  }
  
  // Pattern 2: intent + category + city (top intents, top categories)
  const topIntents = ['buy', 'best', 'cheap', 'online', 'delivery'] as const;
  const topCategories = CATEGORIES.slice(0, 5);
  for (const intentKey of topIntents) {
    const intentSlug = intentTranslations[intentKey]?.replace(/ /g, '-');
    if (!intentSlug) continue;
    for (const cat of topCategories) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      for (const city of allCities.slice(0, 200)) { // Top 200 cities
        allUrls.push(`${prefix}/${intentSlug}-${catSlug}-${city}`);
      }
    }
  }
  
  // Get the slice for this part
  const partUrls = allUrls.slice(startIdx, startIdx + URLS_PER_PART);
  
  if (partUrls.length === 0) {
    return new Response("No URLs for this part", { status: 404 });
  }
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${partUrls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
