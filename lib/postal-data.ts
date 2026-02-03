// Postal code data system for dynamic SEO pages
import postalCodesData from './postal-codes.json';

export type CountryCode = 'ES' | 'DE' | 'FR' | 'IT' | 'PT' | 'NL' | 'PL' | 'AT' | 'BE' | 'CH';

export interface PostalCodeData {
  name: string;
  region: string;
  lat: number;
  lng: number;
}

const data = postalCodesData as Record<CountryCode, Record<string, PostalCodeData>>;

// Country to locale mapping
export const COUNTRY_LOCALE: Record<CountryCode, string> = {
  ES: 'es', DE: 'de', FR: 'fr', IT: 'it', PT: 'pt', 
  NL: 'nl', PL: 'pl', AT: 'de', BE: 'fr', CH: 'de'
};

// Country names
export const COUNTRY_NAMES: Record<CountryCode, Record<string, string>> = {
  ES: { es: 'España', en: 'Spain' },
  DE: { de: 'Deutschland', en: 'Germany' },
  FR: { fr: 'France', en: 'France' },
  IT: { it: 'Italia', en: 'Italy' },
  PT: { pt: 'Portugal', en: 'Portugal' },
  NL: { nl: 'Nederland', en: 'Netherlands' },
  PL: { pl: 'Polska', en: 'Poland' },
  AT: { de: 'Österreich', en: 'Austria' },
  BE: { fr: 'Belgique', en: 'Belgium' },
  CH: { de: 'Schweiz', en: 'Switzerland' },
};

// Get postal code data
export function getPostalCode(country: CountryCode, postalCode: string): PostalCodeData | undefined {
  return data[country]?.[postalCode];
}

// Get all postal codes for a country
export function getPostalCodesForCountry(country: CountryCode): string[] {
  return Object.keys(data[country] || {});
}

// Get top postal codes by population centers (major cities)
export function getTopPostalCodes(country: CountryCode, limit: number = 100): string[] {
  const codes = Object.keys(data[country] || {});
  // Return first N codes (they're typically ordered by importance)
  return codes.slice(0, limit);
}

// Validate postal code exists
export function isValidPostalCode(country: CountryCode, postalCode: string): boolean {
  return !!data[country]?.[postalCode];
}

// Create slug from postal code and name
export function createPostalSlug(postalCode: string, name: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${postalCode}-${slug}`;
}

// Parse postal slug back to postal code
export function parsePostalSlug(slug: string): { postalCode: string; name: string } | null {
  const match = slug.match(/^(\d+)-(.+)$/);
  if (!match) return null;
  return { postalCode: match[1], name: match[2] };
}

// Product categories with translations and localized slugs
export const PRODUCT_CATEGORIES = [
  { 
    slug: 'saunas-finlandesas',
    slugs: {
      es: 'saunas-finlandesas', en: 'finnish-saunas', de: 'finnische-saunas',
      fr: 'saunas-finlandais', it: 'saune-finlandesi', pt: 'saunas-finlandesas',
      nl: 'finse-saunas', pl: 'sauny-finskie'
    },
    icon: '🧖',
    image: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?q=80&w=987&auto=format&fit=crop',
    translations: {
      es: 'Saunas Finlandesas', en: 'Finnish Saunas', de: 'Finnische Saunas', 
      fr: 'Saunas Finlandais', it: 'Saune Finlandesi', pt: 'Saunas Finlandesas',
      nl: 'Finse Saunas', pl: 'Sauny Fińskie'
    },
    priceRange: { min: 2500, max: 15000 },
  },
  { 
    slug: 'jacuzzis',
    slugs: {
      es: 'jacuzzis', en: 'hot-tubs', de: 'whirlpools',
      fr: 'jacuzzis', it: 'vasche-idromassaggio', pt: 'jacuzzis',
      nl: 'jacuzzis', pl: 'jacuzzi'
    },
    icon: '🛁',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=987&auto=format&fit=crop',
    translations: {
      es: 'Jacuzzis Exterior', en: 'Outdoor Hot Tubs', de: 'Außen-Whirlpools',
      fr: 'Jacuzzis Extérieur', it: 'Vasche Idromassaggio', pt: 'Jacuzzis Exterior',
      nl: 'Buiten Jacuzzis', pl: 'Jacuzzi Zewnętrzne'
    },
    priceRange: { min: 3000, max: 20000 },
  },
  { 
    slug: 'spas',
    slugs: {
      es: 'spas', en: 'spas', de: 'spas',
      fr: 'spas', it: 'spa', pt: 'spas',
      nl: 'spas', pl: 'spa'
    },
    icon: '💆',
    image: 'https://img.edilportale.com/product-thumbs/b_Jacuzzi_J-475_XugmIfCBJW.jpeg',
    translations: {
      es: 'Spas & Hidromasaje', en: 'Spas & Whirlpools', de: 'Spas & Whirlpools',
      fr: 'Spas & Balnéo', it: 'Spa & Idromassaggio', pt: 'Spas & Hidromassagem',
      nl: 'Spas & Whirlpools', pl: 'Spa & Hydromasaż'
    },
    priceRange: { min: 1500, max: 12000 },
  },
  { 
    slug: 'infrarrojos',
    slugs: {
      es: 'infrarrojos', en: 'infrared-cabins', de: 'infrarotkabinen',
      fr: 'cabines-infrarouges', it: 'cabine-infrarossi', pt: 'cabines-infravermelhos',
      nl: 'infrarood-cabines', pl: 'kabiny-na-podczerwien'
    },
    icon: '🔥',
    image: 'https://aurorahomeluxury.co.uk/cdn/shop/files/insignia-outdoor-hybrid-infrared-sauna-1700-x-1500mm-gardensetting_1200x1200_crop_center.jpg?v=1726583291',
    translations: {
      es: 'Cabinas Infrarrojos', en: 'Infrared Cabins', de: 'Infrarotkabinen',
      fr: 'Cabines Infrarouges', it: 'Cabine Infrarossi', pt: 'Cabines Infravermelhos',
      nl: 'Infrarood Cabines', pl: 'Kabiny na Podczerwień'
    },
    priceRange: { min: 1200, max: 8000 },
  },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Get category by any slug (supports all localized slugs)
export function getCategoryByAnySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(cat => {
    if (cat.slug === slug) return true;
    const slugValues = Object.values(cat.slugs) as string[];
    return slugValues.includes(slug);
  });
}

// Get localized slug for a category
export function getLocalizedSlug(category: ProductCategory, locale: string): string {
  const slugs = category.slugs as Record<string, string>;
  return slugs[locale] || category.slug;
}

// Get category by slug (supports localized slugs)
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return getCategoryByAnySlug(slug);
}

export function formatPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
