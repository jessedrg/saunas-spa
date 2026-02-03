import type { Metadata } from "next";
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight, Check, Star } from "lucide-react"
import {
  getPostalCode,
  getCategoryBySlug,
  parsePostalSlug,
  getTopPostalCodes,
  PRODUCT_CATEGORIES,
  COUNTRY_NAMES,
  formatPrice,
  type CountryCode,
} from "@/lib/postal-data"
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data"
import { PostalSEOSchemas, PostalFAQSection, PostalBreadcrumbs, PostalPriceTable, type PostalSEOProps } from "@/components/seo/postal-seo"
import { IntercomButton } from "@/components/pages/intercom-button"

const LOCALE_COUNTRY: Record<string, CountryCode> = {
  es: 'ES', de: 'DE', fr: 'FR', it: 'IT', pt: 'PT', nl: 'NL', pl: 'PL'
};

interface PageProps {
  params: Promise<{ locale: string; categoria: string; postalSlug: string }>
}

const SITE_URL = "https://saunaspa.io";

// Dynamic metadata for postal code pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, categoria, postalSlug } = await params;
  const parsed = parsePostalSlug(postalSlug);
  if (!parsed) return { title: 'Not Found' };
  
  const country = LOCALE_COUNTRY[locale] || 'ES';
  const postalData = getPostalCode(country, parsed.postalCode);
  const category = getCategoryBySlug(categoria);
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  
  if (!postalData || !category) return { title: 'Not Found' };
  
  const catName = category.translations[validLocale as keyof typeof category.translations] || category.translations.en;
  const ogImage = category.image ? `${category.image.split('?')[0]}?w=1200&h=630&fit=crop&q=80` : 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=1200&h=630&fit=crop&q=80';
  
  const title = `${catName} en ${postalData.name} | Sauna Spa`;
  const description = `${catName} en ${postalData.name} (${parsed.postalCode}). Garantía 5 años, instalación profesional incluida en ${postalData.region}.`;
  const canonicalUrl = `${SITE_URL}/${locale}/${categoria}/cp/${postalSlug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Sauna Spa',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${catName} en ${postalData.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function PostalCodePage({ params }: PageProps) {
  const { locale, categoria, postalSlug } = await params;
  
  const parsed = parsePostalSlug(postalSlug);
  if (!parsed) notFound();
  
  const country = LOCALE_COUNTRY[locale] || 'ES';
  const postalData = getPostalCode(country, parsed.postalCode);
  const category = getCategoryBySlug(categoria);
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  
  if (!postalData || !category) notFound();
  
  const catName = category.translations[validLocale as keyof typeof category.translations] || category.translations.en;
  const catImage = category.image;

  // SEO Data for Sauna Spa
  const seoData: PostalSEOProps = {
    locale: validLocale,
    product: catName,
    productSlug: categoria,
    city: postalData.name,
    postalCode: parsed.postalCode,
    region: postalData.region,
    priceMin: category.priceRange.min,
    priceMax: category.priceRange.max,
    brand: 'Sauna Spa',
    domain: 'saunaspa.io',
    warranty: '5 años',
  };

  // Price table products
  const priceProducts = PRODUCT_CATEGORIES.map(cat => ({
    name: cat.translations[validLocale as keyof typeof cat.translations] || cat.translations.en,
    min: cat.priceRange.min,
    max: cat.priceRange.max,
  }));
  
  const allCodes = getTopPostalCodes(country, 100);
  const currentIndex = allCodes.indexOf(parsed.postalCode);
  const nearbyCodes = allCodes
    .filter((_, i) => Math.abs(i - currentIndex) < 10 && i !== currentIndex)
    .slice(0, 6);

  const t: Record<string, Record<string, string>> = {
    es: { from: 'Desde', quote: 'Presupuesto Gratis', warranty: '5 años garantía', quality: 'Calidad premium', delivery: 'Entrega rápida', nearby: 'Zonas cercanas', otherProducts: 'Otros productos', viewAll: 'Ver catálogo' },
    en: { from: 'From', quote: 'Free Quote', warranty: '5 year warranty', quality: 'Premium quality', delivery: 'Fast delivery', nearby: 'Nearby areas', otherProducts: 'Other products', viewAll: 'View catalog' },
    de: { from: 'Ab', quote: 'Kostenloses Angebot', warranty: '5 Jahre Garantie', quality: 'Premium Qualität', delivery: 'Schnelle Lieferung', nearby: 'Nahe Gebiete', otherProducts: 'Andere Produkte', viewAll: 'Katalog ansehen' },
    fr: { from: 'À partir de', quote: 'Devis Gratuit', warranty: 'Garantie 5 ans', quality: 'Qualité premium', delivery: 'Livraison rapide', nearby: 'Zones proches', otherProducts: 'Autres produits', viewAll: 'Voir catalogue' },
  };
  const texts = t[validLocale] || t.es;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-lg font-light tracking-wide text-neutral-900">
            Sauna Spa
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            {PRODUCT_CATEGORIES.slice(0, 4).map(cat => (
              <Link 
                key={cat.slug} 
                href={`/${locale}/${cat.slug}`}
                className={`hover:text-neutral-900 transition-colors ${cat.slug === categoria ? 'text-neutral-900' : ''}`}
              >
                {cat.translations[validLocale as keyof typeof cat.translations] || cat.translations.en}
              </Link>
            ))}
          </nav>
          <IntercomButton 
            text={texts.quote}
            className="text-xs rounded-full px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
          />
        </div>
      </header>

      <main className="pt-14">
        {/* Breadcrumbs */}
        <PostalBreadcrumbs data={seoData} />

        {/* Hero */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm text-neutral-500 mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>{postalData.name}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="font-mono text-xs bg-neutral-100 px-2 py-0.5 rounded">{parsed.postalCode}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight mb-6">
                  {catName}
                  <span className="block text-neutral-400 mt-1">en {postalData.name}</span>
                </h1>

                <div className="mb-8">
                  <span className="text-sm text-neutral-500">{texts.from}</span>
                  <p className="text-3xl font-light text-neutral-900">
                    {formatPrice(category.priceRange.min, validLocale)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <IntercomButton 
                    text={texts.quote}
                    className="px-8 py-4 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
                  />
                  <Link 
                    href={`/${locale}/${categoria}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    {texts.viewAll}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={catImage}
                  alt={catName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: texts.warranty, desc: 'Cobertura completa en todos los productos' },
                { title: texts.quality, desc: 'Materiales de primera calidad' },
                { title: texts.delivery, desc: `Entrega en ${postalData.region}` },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{feature.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-white border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-neutral-50 rounded-2xl">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">
                    "Excelente servicio en {postalData.name}. Instalación profesional y rápida."
                  </p>
                  <p className="text-xs text-neutral-400">Cliente verificado · {postalData.region}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Products */}
        <section className="py-16 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-xl font-light text-neutral-900 mb-8">{texts.otherProducts}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCT_CATEGORIES.filter(c => c.slug !== categoria).map((cat) => {
                const catSlug = postalData.name
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '');
                return (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/${cat.slug}/cp/${parsed.postalCode}-${catSlug}`}
                    className="group"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
                      <Image
                        src={cat.image}
                        alt={cat.translations[validLocale as keyof typeof cat.translations] || cat.translations.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                      {cat.translations[validLocale as keyof typeof cat.translations] || cat.translations.en}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {texts.from} {formatPrice(cat.priceRange.min, validLocale)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Price Table */}
        <PostalPriceTable data={seoData} products={priceProducts} />

        {/* Nearby Areas */}
        <section className="py-16 bg-white border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-xl font-light text-neutral-900 mb-8">{texts.nearby}</h2>
            <div className="flex flex-wrap gap-2">
              {nearbyCodes.map((code) => {
                const nearbyData = getPostalCode(country, code);
                if (!nearbyData) return null;
                const slug = nearbyData.name
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '');
                return (
                  <Link
                    key={code}
                    href={`/${locale}/${categoria}/cp/${code}-${slug}`}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm text-neutral-600 transition-colors"
                  >
                    {nearbyData.name} ({code})
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <PostalFAQSection data={seoData} />

        {/* CTA Footer */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              {catName} en {postalData.name}
            </h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">
              Presupuesto sin compromiso. Calidad premium garantizada.
            </p>
            <IntercomButton 
              text={texts.quote}
              className="px-10 py-4 bg-white text-neutral-900 text-sm rounded-full hover:bg-neutral-100 transition-colors"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>© 2024 Sauna Spa</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/legal`} className="hover:text-neutral-600">Legal</Link>
            <Link href={`/${locale}/privacidad`} className="hover:text-neutral-600">Privacidad</Link>
            <Link href={`/${locale}/contacto`} className="hover:text-neutral-600">Contacto</Link>
          </div>
        </div>
      </footer>

      {/* SEO Schema Markup */}
      <PostalSEOSchemas data={seoData} />
    </div>
  );
}
