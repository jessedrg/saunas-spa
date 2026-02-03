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
import { ShopifyProducts } from "@/components/store/shopify-products";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

// Category data for saunas and spas with localized slugs
const CATEGORIES = [
  { 
    slug: 'saunas-finlandesas',
    slugs: { es: 'saunas-finlandesas', en: 'finnish-saunas', de: 'finnische-saunas', fr: 'saunas-finlandais', it: 'saune-finlandesi', pt: 'saunas-finlandesas', nl: 'finse-saunas', pl: 'sauny-finskie' },
    image: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?q=80&w=987&auto=format&fit=crop',
    price: '2.500€',
    names: { es: 'Saunas Finlandesas', en: 'Finnish Saunas', de: 'Finnische Saunas', fr: 'Saunas Finlandais', it: 'Saune Finlandesi', pt: 'Saunas Finlandesas', nl: 'Finse Saunas', pl: 'Sauny Fińskie' },
    desc: { 
      es: 'Saunas tradicionales de madera de alta calidad. Instalación profesional incluida.', 
      en: 'Traditional high-quality wooden saunas. Professional installation included.', 
      de: 'Traditionelle hochwertige Holzsaunas. Professionelle Installation inklusive.', 
      fr: 'Saunas traditionnels en bois de haute qualité. Installation professionnelle incluse.',
      it: 'Saune tradizionali in legno di alta qualità. Installazione professionale inclusa.',
      pt: 'Saunas tradicionais de madeira de alta qualidade. Instalação profissional incluída.',
      nl: 'Traditionele houten sauna\'s van hoge kwaliteit. Professionele installatie inbegrepen.',
      pl: 'Tradycyjne drewniane sauny wysokiej jakości. Profesjonalna instalacja w cenie.'
    }
  },
  { 
    slug: 'jacuzzis',
    slugs: { es: 'jacuzzis', en: 'hot-tubs', de: 'whirlpools', fr: 'jacuzzis', it: 'vasche-idromassaggio', pt: 'jacuzzis', nl: 'jacuzzis', pl: 'jacuzzi' },
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=987&auto=format&fit=crop',
    price: '3.000€',
    names: { es: 'Jacuzzis Exterior', en: 'Outdoor Hot Tubs', de: 'Außen-Whirlpools', fr: 'Jacuzzis Extérieur', it: 'Vasche Idromassaggio', pt: 'Jacuzzis Exterior', nl: 'Buiten Jacuzzis', pl: 'Jacuzzi Zewnętrzne' },
    desc: { 
      es: 'Jacuzzis para jardín y terraza. Relajación total en tu hogar.', 
      en: 'Hot tubs for garden and terrace. Total relaxation at home.', 
      de: 'Whirlpools für Garten und Terrasse. Totale Entspannung zu Hause.', 
      fr: 'Jacuzzis pour jardin et terrasse. Relaxation totale chez vous.',
      it: 'Vasche idromassaggio per giardino e terrazza. Relax totale a casa tua.',
      pt: 'Jacuzzis para jardim e terraço. Relaxamento total em sua casa.',
      nl: 'Jacuzzi\'s voor tuin en terras. Totale ontspanning thuis.',
      pl: 'Jacuzzi do ogrodu i tarasu. Całkowity relaks w domu.'
    }
  },
  { 
    slug: 'spas',
    slugs: { es: 'spas', en: 'spas', de: 'spas', fr: 'spas', it: 'spa', pt: 'spas', nl: 'spas', pl: 'spa' },
    image: 'https://img.edilportale.com/product-thumbs/b_Jacuzzi_J-475_XugmIfCBJW.jpeg',
    price: '1.500€',
    names: { es: 'Spas & Hidromasaje', en: 'Spas & Whirlpools', de: 'Spas & Whirlpools', fr: 'Spas & Balnéo', it: 'Spa & Idromassaggio', pt: 'Spas & Hidromassagem', nl: 'Spas & Whirlpools', pl: 'Spa & Hydromasaż' },
    desc: { 
      es: 'Bañeras de hidromasaje para interior. Bienestar y relajación.', 
      en: 'Indoor whirlpool baths. Wellness and relaxation.', 
      de: 'Whirlpool-Badewannen für den Innenbereich. Wellness und Entspannung.', 
      fr: 'Baignoires balnéo pour intérieur. Bien-être et relaxation.',
      it: 'Vasche idromassaggio per interni. Benessere e relax.',
      pt: 'Banheiras de hidromassagem para interior. Bem-estar e relaxamento.',
      nl: 'Whirlpoolbaden voor binnen. Wellness en ontspanning.',
      pl: 'Wanny z hydromasażem do wnętrz. Wellness i relaks.'
    }
  },
  { 
    slug: 'infrarrojos',
    slugs: { es: 'infrarrojos', en: 'infrared-cabins', de: 'infrarotkabinen', fr: 'cabines-infrarouges', it: 'cabine-infrarossi', pt: 'cabines-infravermelhos', nl: 'infrarood-cabines', pl: 'kabiny-na-podczerwien' },
    image: 'https://aurorahomeluxury.co.uk/cdn/shop/files/insignia-outdoor-hybrid-infrared-sauna-1700-x-1500mm-gardensetting_1200x1200_crop_center.jpg?v=1726583291',
    price: '1.200€',
    names: { es: 'Cabinas Infrarrojos', en: 'Infrared Cabins', de: 'Infrarotkabinen', fr: 'Cabines Infrarouges', it: 'Cabine Infrarossi', pt: 'Cabines Infravermelhos', nl: 'Infrarood Cabines', pl: 'Kabiny na Podczerwień' },
    desc: { 
      es: 'Cabinas de terapia infrarroja. Beneficios para la salud.', 
      en: 'Infrared therapy cabins. Health benefits.', 
      de: 'Infrarot-Therapiekabinen. Gesundheitsvorteile.', 
      fr: 'Cabines de thérapie infrarouge. Bienfaits pour la santé.',
      it: 'Cabine per terapia a infrarossi. Benefici per la salute.',
      pt: 'Cabines de terapia infravermelha. Benefícios para a saúde.',
      nl: 'Infrarood therapiecabines. Gezondheidsvoordelen.',
      pl: 'Kabiny do terapii na podczerwień. Korzyści zdrowotne.'
    }
  },
];

// Find category by any localized slug
function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => {
    if (c.slug === slug) return true;
    const allSlugs = Object.values(c.slugs);
    return allSlugs.includes(slug) || allSlugs.some(s => slug.includes(s));
  });
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
  
  const defaultNames: Record<string, string> = { es: 'Saunas y Spas', en: 'Saunas & Spas', de: 'Saunas & Spas', fr: 'Saunas & Spas', it: 'Saune & Spa', pt: 'Saunas & Spas', nl: 'Sauna\'s & Spa\'s', pl: 'Sauny & Spa' };
  const defaultDescs: Record<string, string> = { es: 'Saunas finlandesas, jacuzzis y spas de alta calidad. Instalación profesional incluida.', en: 'Finnish saunas, hot tubs and spas of the highest quality. Professional installation included.', de: 'Finnische Saunas, Whirlpools und Spas höchster Qualität. Professionelle Installation inklusive.', fr: 'Saunas finlandais, jacuzzis et spas de haute qualité. Installation professionnelle incluse.', it: 'Saune finlandesi, vasche idromassaggio e spa di alta qualità. Installazione professionale inclusa.', pt: 'Saunas finlandesas, jacuzzis e spas de alta qualidade. Instalação profissional incluída.', nl: 'Finse sauna\'s, jacuzzi\'s en spa\'s van hoge kwaliteit. Professionele installatie inbegrepen.', pl: 'Fińskie sauny, jacuzzi i spa najwyższej jakości. Profesjonalna instalacja w cenie.' };
  const catName = category?.names[validLocale as keyof typeof category.names] || category?.names.es || defaultNames[validLocale] || defaultNames.es;
  const catDesc = category?.desc[validLocale as keyof typeof category.desc] || category?.desc.es || defaultDescs[validLocale] || defaultDescs.es;
  const catImage = category?.image || 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?q=80&w=987&auto=format&fit=crop';
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
  const texts: Record<string, { from: string; quote: string; features: string; related: string; warranty: string; delivery: string; catalog: string; quality: string }> = {
    es: { from: 'Desde', quote: 'Solicitar Presupuesto', features: 'Características', related: 'Otros productos', warranty: 'Garantía 5 años', delivery: 'Instalación incluida', catalog: 'Ver Catálogo', quality: 'Calidad Premium' },
    en: { from: 'From', quote: 'Request Quote', features: 'Features', related: 'Other products', warranty: '5 year warranty', delivery: 'Installation included', catalog: 'View Catalog', quality: 'Premium Quality' },
    de: { from: 'Ab', quote: 'Angebot Anfordern', features: 'Eigenschaften', related: 'Andere Produkte', warranty: '5 Jahre Garantie', delivery: 'Installation inklusive', catalog: 'Katalog Ansehen', quality: 'Premium Qualität' },
    fr: { from: 'À partir de', quote: 'Demander un Devis', features: 'Caractéristiques', related: 'Autres produits', warranty: 'Garantie 5 ans', delivery: 'Installation incluse', catalog: 'Voir Catalogue', quality: 'Qualité Premium' },
    it: { from: 'Da', quote: 'Richiedi Preventivo', features: 'Caratteristiche', related: 'Altri prodotti', warranty: 'Garanzia 5 anni', delivery: 'Installazione inclusa', catalog: 'Vedi Catalogo', quality: 'Qualità Premium' },
    pt: { from: 'Desde', quote: 'Solicitar Orçamento', features: 'Características', related: 'Outros produtos', warranty: 'Garantia 5 anos', delivery: 'Instalação incluída', catalog: 'Ver Catálogo', quality: 'Qualidade Premium' },
    nl: { from: 'Vanaf', quote: 'Offerte Aanvragen', features: 'Kenmerken', related: 'Andere producten', warranty: '5 jaar garantie', delivery: 'Installatie inbegrepen', catalog: 'Bekijk Catalogus', quality: 'Premium Kwaliteit' },
    pl: { from: 'Od', quote: 'Poproś o Wycenę', features: 'Cechy', related: 'Inne produkty', warranty: 'Gwarancja 5 lat', delivery: 'Instalacja w cenie', catalog: 'Zobacz Katalog', quality: 'Jakość Premium' },
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
                    {t.catalog}
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
              {(() => {
                const reviews: Record<string, { text: string; author: string }[]> = {
                  es: [
                    { text: 'Excelente calidad y servicio. La instalación fue rápida y profesional.', author: 'Cliente verificado' },
                    { text: 'Muy contentos con nuestra sauna. Superó todas nuestras expectativas.', author: 'Cliente verificado' },
                    { text: 'El equipo fue muy profesional. Recomendado 100%.', author: 'Cliente verificado' },
                  ],
                  en: [
                    { text: 'Excellent quality and service. Installation was quick and professional.', author: 'Verified customer' },
                    { text: 'Very happy with our sauna. Exceeded all our expectations.', author: 'Verified customer' },
                    { text: 'The team was very professional. 100% recommended.', author: 'Verified customer' },
                  ],
                  de: [
                    { text: 'Ausgezeichnete Qualität und Service. Die Installation war schnell und professionell.', author: 'Verifizierter Kunde' },
                    { text: 'Sehr zufrieden mit unserer Sauna. Hat alle Erwartungen übertroffen.', author: 'Verifizierter Kunde' },
                    { text: 'Das Team war sehr professionell. 100% empfohlen.', author: 'Verifizierter Kunde' },
                  ],
                  fr: [
                    { text: 'Excellente qualité et service. L\'installation a été rapide et professionnelle.', author: 'Client vérifié' },
                    { text: 'Très satisfaits de notre sauna. A dépassé toutes nos attentes.', author: 'Client vérifié' },
                    { text: 'L\'équipe était très professionnelle. Recommandé à 100%.', author: 'Client vérifié' },
                  ],
                  it: [
                    { text: 'Qualità e servizio eccellenti. L\'installazione è stata rapida e professionale.', author: 'Cliente verificato' },
                    { text: 'Molto soddisfatti della nostra sauna. Ha superato tutte le aspettative.', author: 'Cliente verificato' },
                    { text: 'Il team è stato molto professionale. Consigliato al 100%.', author: 'Cliente verificato' },
                  ],
                  pt: [
                    { text: 'Excelente qualidade e serviço. A instalação foi rápida e profissional.', author: 'Cliente verificado' },
                    { text: 'Muito satisfeitos com nossa sauna. Superou todas as expectativas.', author: 'Cliente verificado' },
                    { text: 'A equipe foi muito profissional. Recomendado 100%.', author: 'Cliente verificado' },
                  ],
                  nl: [
                    { text: 'Uitstekende kwaliteit en service. Installatie was snel en professioneel.', author: 'Geverifieerde klant' },
                    { text: 'Zeer tevreden met onze sauna. Overtrof al onze verwachtingen.', author: 'Geverifieerde klant' },
                    { text: 'Het team was zeer professioneel. 100% aanbevolen.', author: 'Geverifieerde klant' },
                  ],
                  pl: [
                    { text: 'Doskonała jakość i obsługa. Instalacja była szybka i profesjonalna.', author: 'Zweryfikowany klient' },
                    { text: 'Bardzo zadowoleni z naszej sauny. Przekroczyła wszystkie oczekiwania.', author: 'Zweryfikowany klient' },
                    { text: 'Zespół był bardzo profesjonalny. Polecam w 100%.', author: 'Zweryfikowany klient' },
                  ],
                };
                const r = reviews[validLocale] || reviews.es;
                return r.map((review, i) => (
                  <div key={i} className="p-6 bg-neutral-50 rounded-2xl">
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">"{review.text}"</p>
                    <p className="text-xs text-neutral-400">{review.author}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </section>

        {/* Shopify Products */}
        <ShopifyProducts 
          locale={validLocale} 
          collection={category?.slug} 
          title={`${catName} - Productos Destacados`}
          limit={8}
        />

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
