import { SUPPORTED_LOCALES, CATEGORIES, CATEGORY_TRANSLATIONS, LOCALES, INTENT_TRANSLATIONS, type Locale } from "@/lib/seo-data";
import citiesData from "@/lib/cities-processed.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saunaspa.io";

// Type for cities data
type CityData = { name: string; slug: string; population: number };
const CITIES_DB = citiesData as Record<string, CityData[]>;

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const cleanLocale = slug.replace('.xml', '') as Locale;
  
  if (!SUPPORTED_LOCALES.includes(cleanLocale)) {
    return new Response("Not found", { status: 404 });
  }

  const urls: string[] = [];
  const prefix = `${BASE_URL}/${cleanLocale}`;
  const catTranslations = CATEGORY_TRANSLATIONS[cleanLocale] || CATEGORY_TRANSLATIONS.en;
  const intentTranslations = INTENT_TRANSLATIONS[cleanLocale] || INTENT_TRANSLATIONS.en;

  // Get cities for this locale's countries from massive database
  const localeData = LOCALES[cleanLocale];
  const cities: string[] = [];
  for (const country of localeData.countries) {
    const countryCities = CITIES_DB[country];
    if (countryCities) {
      // Take top 500 cities per country by population for manageable sitemap size
      cities.push(...countryCities.slice(0, 500).map((c: CityData) => c.slug));
    }
  }

  // 1. PURE CATEGORY PAGES (10 URLs)
  for (const cat of CATEGORIES) {
    const catSlug = catTranslations[cat].replace(/ /g, '-');
    urls.push(`${prefix}/${catSlug}`);
  }

  // 2. INTENT + CATEGORY combinations (20 intents x 10 categories = 200 URLs)
  const topIntents = ['buy', 'best', 'cheap', 'premium', 'organic', 'online', 'delivery', 'near-me'] as const;
  for (const intentKey of topIntents) {
    const intentSlug = intentTranslations[intentKey]?.replace(/ /g, '-');
    if (!intentSlug) continue;
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${intentSlug}-${catSlug}`);
    }
  }

  // 3. CATEGORY + CITY (10 categories x cities = many URLs)
  for (const city of cities) {
    for (const cat of CATEGORIES) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${catSlug}-${city}`);
    }
  }

  // 4. HIGH-VALUE: INTENT + CATEGORY + CITY
  const highIntents = ['buy', 'best', 'online', 'delivery'] as const;
  const topCategories = CATEGORIES.slice(0, 5); // Top 5 categories
  
  for (const city of cities.slice(0, 20)) { // Top 20 cities
    for (const intentKey of highIntents) {
      const intentSlug = intentTranslations[intentKey]?.replace(/ /g, '-');
      if (!intentSlug) continue;
      for (const cat of topCategories) {
        const catSlug = catTranslations[cat].replace(/ /g, '-');
        urls.push(`${prefix}/${intentSlug}-${catSlug}-${city}`);
      }
    }
  }

  // 5. Sauna-specific modifiers
  const saunaModifiers: Record<string, string[]> = {
    es: ['organico', 'premium', 'laboratorio', 'natural', 'legal', 'certificado'],
    en: ['organic', 'premium', 'lab-tested', 'natural', 'legal', 'certified'],
    de: ['bio', 'premium', 'laborgetestet', 'natuerlich', 'legal', 'zertifiziert'],
    fr: ['bio', 'premium', 'teste-laboratoire', 'naturel', 'legal', 'certifie'],
    it: ['biologico', 'premium', 'testato-laboratorio', 'naturale', 'legale', 'certificato'],
    pt: ['organico', 'premium', 'testado-laboratorio', 'natural', 'legal', 'certificado'],
    nl: ['biologisch', 'premium', 'labgetest', 'natuurlijk', 'legaal', 'gecertificeerd'],
    pl: ['organiczny', 'premium', 'testowany', 'naturalny', 'legalny', 'certyfikowany'],
    cs: ['bio', 'premium', 'testovano', 'prirodni', 'legalni', 'certifikovany'],
    el: ['viologiko', 'premium', 'ergastiriako', 'fysiko', 'nomimo', 'pistopoiimeno'],
  };

  const modifiers = saunaModifiers[cleanLocale] || saunaModifiers.en;
  for (const modifier of modifiers) {
    for (const cat of CATEGORIES.slice(0, 5)) {
      const catSlug = catTranslations[cat].replace(/ /g, '-');
      urls.push(`${prefix}/${catSlug}-${modifier}`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
