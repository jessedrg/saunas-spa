import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Features } from "@/components/store/features";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { ArrowRight, Check, Star } from "lucide-react";
import { SEOHead, FAQSection, type SEOData } from "@/components/seo/programmatic-seo";
import { IntercomButton } from "@/components/pages/intercom-button";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

// Category data for saunas and spas
const CATEGORIES = [
  { 
    slug: 'saunas-finlandesas',
    image: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?q=80&w=987&auto=format&fit=crop',
    price: '2.500€',
    names: { es: 'Saunas Finlandesas', en: 'Finnish Saunas', de: 'Finnische Saunas', fr: 'Saunas Finlandais' },
    desc: { es: 'Saunas tradicionales de madera de alta calidad. Instalación profesional incluida.', en: 'Traditional high-quality wooden saunas. Professional installation included.', de: 'Traditionelle hochwertige Holzsaunas. Professionelle Installation inklusive.', fr: 'Saunas traditionnels en bois de haute qualité. Installation professionnelle incluse.' }
  },
  { 
    slug: 'jacuzzis',
    image: 'https://images.unsplash.com/photo-1762255146530-8eca66af23b2?q=80&w=987&auto=format&fit=crop',
    price: '3.000€',
    names: { es: 'Jacuzzis Exterior', en: 'Outdoor Hot Tubs', de: 'Außen-Whirlpools', fr: 'Jacuzzis Extérieur' },
    desc: { es: 'Jacuzzis para jardín y terraza. Relajación total en tu hogar.', en: 'Hot tubs for garden and terrace. Total relaxation at home.', de: 'Whirlpools für Garten und Terrasse. Totale Entspannung zu Hause.', fr: 'Jacuzzis pour jardin et terrasse. Relaxation totale chez vous.' }
  },
  { 
    slug: 'spas',
    image: 'https://img.edilportale.com/product-thumbs/b_Jacuzzi_J-475_XugmIfCBJW.jpeg',
    price: '1.500€',
    names: { es: 'Spas & Hidromasaje', en: 'Spas & Whirlpools', de: 'Spas & Whirlpools', fr: 'Spas & Balnéo' },
    desc: { es: 'Bañeras de hidromasaje para interior. Bienestar y relajación.', en: 'Indoor whirlpool baths. Wellness and relaxation.', de: 'Whirlpool-Badewannen für den Innenbereich. Wellness und Entspannung.', fr: 'Baignoires balnéo pour intérieur. Bien-être et relaxation.' }
  },
  { 
    slug: 'infrarrojos',
    image: 'https://aurorahomeluxury.co.uk/cdn/shop/files/insignia-outdoor-hybrid-infrared-sauna-1700-x-1500mm-gardensetting_1200x1200_crop_center.jpg?v=1726583291',
    price: '1.200€',
    names: { es: 'Cabinas Infrarrojos', en: 'Infrared Cabins', de: 'Infrarotkabinen', fr: 'Cabines Infrarouges' },
    desc: { es: 'Cabinas de terapia infrarroja. Beneficios para la salud.', en: 'Infrared therapy cabins. Health benefits.', de: 'Infrarot-Therapiekabinen. Gesundheitsvorteile.', fr: 'Cabines de thérapie infrarouge. Bienfaits pour la santé.' }
  },
];

function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug || slug.includes(c.slug));
}

const SITE_URL = "https://saunaspa.io";

// Dynamic metadata for Google SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = (SUPPORTED_LOCALES.includes(locale as Locale) ? locale : 'es') as Locale;
  const category = getCategoryBySlug(slug?.[0] || '');
  
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || 'Saunas y Spas';
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || 'Saunas finlandesas, jacuzzis y spas para tu hogar.';
  const ogImage = category?.image ? `${category.image.split('?')[0]}?w=1200&h=630&fit=crop&q=80` : 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?w=1200&h=630&fit=crop&q=80';
  
  const title = `${catName} | Sauna Spa`;
  const description = `${catDesc} Garantía 5 años, instalación profesional incluida.`;
  const canonicalUrl = `${SITE_URL}/${locale}/${slug?.join('/') || ''}`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: catName }],
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

export default async function DynamicPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const validLocale = SUPPORTED_LOCALES.includes(locale as Locale) ? locale as Locale : 'es';
  const category = getCategoryBySlug(slug?.[0] || '');
  
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || 'Saunas y Spas';
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || '';
  const catImage = category?.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=800&fit=crop';
  const catPrice = category?.price || '2.500€';
  
  // Related categories
  const relatedCategories = CATEGORIES.filter(c => c.slug !== category?.slug).slice(0, 3);

  // SEO Data for Schema and FAQs
  const seoData: SEOData = {
    locale: validLocale as SEOData['locale'],
    pageType: 'category',
    product: catName,
    productSlug: category?.slug || 'saunas',
    priceMin: parseInt(catPrice.replace(/[^0-9]/g, '')) || 1200,
    priceMax: parseInt(catPrice.replace(/[^0-9]/g, '')) * 5 || 15000,
    brand: 'Sauna Spa',
    domain: 'saunaspa.io',
    warranty: '5 años',
    relatedProducts: relatedCategories.map(c => ({
      name: c.names[validLocale as keyof typeof c.names] || c.names.es,
      slug: c.slug,
      price: c.price
    }))
  };
  
  // Translations
  const texts: Record<string, { from: string; quote: string; features: string; related: string; warranty: string; delivery: string }> = {
    es: { from: 'Desde', quote: 'Solicitar Presupuesto', features: 'Características', related: 'Otros productos', warranty: 'Garantía 5 años', delivery: 'Entrega rápida' },
    en: { from: 'From', quote: 'Request Quote', features: 'Features', related: 'Other products', warranty: '5 year warranty', delivery: 'Fast delivery' },
    de: { from: 'Ab', quote: 'Angebot Anfordern', features: 'Eigenschaften', related: 'Andere Produkte', warranty: '5 Jahre Garantie', delivery: 'Schnelle Lieferung' },
    fr: { from: 'À partir de', quote: 'Demander un Devis', features: 'Caractéristiques', related: 'Autres produits', warranty: 'Garantie 5 ans', delivery: 'Livraison rapide' },
  };
  const t = texts[validLocale] || texts.es;

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Header locale={validLocale} />
      
      <main className="pt-14">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="inline-block text-xs tracking-widest text-neutral-400 uppercase mb-6">
                  Sauna Spa
                </span>
                <h1 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight mb-6">
                  {catName}
                </h1>
                <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                  {catDesc}
                </p>
                
                {/* Price */}
                <div className="mb-8">
                  <span className="text-sm text-neutral-400">{t.from}</span>
                  <p className="text-3xl font-light text-neutral-900">{catPrice}</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <IntercomButton 
                    text={t.quote}
                    className="px-8 py-4 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
                  />
                  <Link 
                    href={`/${locale}`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    Ver Catálogo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
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
                { title: t.warranty, desc: 'Cobertura completa en todos los productos' },
                { title: 'Calidad Premium', desc: 'Materiales de primera calidad' },
                { title: t.delivery, desc: 'Entrega en toda España' },
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
                    "Excelente calidad y servicio. La instalación fue rápida y profesional."
                  </p>
                  <p className="text-xs text-neutral-400">Cliente verificado</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 border-t border-neutral-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-light text-neutral-900 mb-8">{t.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale}/${cat.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src={cat.image}
                      alt={cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {cat.names[validLocale as keyof typeof cat.names] || cat.names.es}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {t.from} <span className="font-medium text-neutral-900">{cat.price}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection data={seoData} />

        <Features locale={validLocale} />
        <CTA locale={validLocale} />
      </main>

      {/* SEO Schema Markup */}
      <SEOHead data={seoData} />

      <Footer locale={validLocale} />
    </div>
  );
}
