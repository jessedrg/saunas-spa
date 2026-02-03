import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Locale } from "@/lib/seo-data";

interface CategoriesProps {
  locale: Locale;
}

const CATEGORIES = [
  { 
    slug: 'saunas-finlandesas',
    image: 'https://images.unsplash.com/photo-1655194911126-6032bdcccc9d?q=80&w=987&auto=format&fit=crop',
    price: '2.500€',
    names: { es: 'Saunas Finlandesas', en: 'Finnish Saunas', de: 'Finnische Saunas', fr: 'Saunas Finlandais', it: 'Saune Finlandesi', pt: 'Saunas Finlandesas', nl: 'Finse Saunas', pl: 'Sauny Fińskie', cs: 'Finské Sauny', el: 'Φινλανδικές Σάουνες' },
    desc: { es: 'Madera de alta calidad', en: 'Premium wood quality', de: 'Hochwertige Holzqualität', fr: 'Bois de haute qualité', it: 'Legno di alta qualità', pt: 'Madeira de alta qualidade', nl: 'Hoogwaardig hout', pl: 'Drewno wysokiej jakości', cs: 'Vysoce kvalitní dřevo', el: 'Υψηλής ποιότητας ξύλο' }
  },
  { 
    slug: 'jacuzzis',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=987&auto=format&fit=crop',
    price: '3.000€',
    names: { es: 'Jacuzzis Exterior', en: 'Outdoor Hot Tubs', de: 'Außen-Whirlpools', fr: 'Jacuzzis Extérieur', it: 'Vasche Idromassaggio', pt: 'Jacuzzis Exterior', nl: 'Buiten Jacuzzis', pl: 'Jacuzzi Zewnętrzne', cs: 'Venkovní Vířivky', el: 'Εξωτερικά Τζακούζι' },
    desc: { es: 'Para jardín y terraza', en: 'For garden and terrace', de: 'Für Garten und Terrasse', fr: 'Pour jardin et terrasse', it: 'Per giardino e terrazza', pt: 'Para jardim e terraço', nl: 'Voor tuin en terras', pl: 'Do ogrodu i tarasu', cs: 'Pro zahradu a terasu', el: 'Για κήπο και βεράντα' }
  },
  { 
    slug: 'spas',
    image: 'https://img.edilportale.com/product-thumbs/b_Jacuzzi_J-475_XugmIfCBJW.jpeg',
    price: '1.500€',
    names: { es: 'Spas & Hidromasaje', en: 'Spas & Whirlpools', de: 'Spas & Whirlpools', fr: 'Spas & Balnéo', it: 'Spa & Idromassaggio', pt: 'Spas & Hidromassagem', nl: 'Spas & Whirlpools', pl: 'Spa & Hydromasaż', cs: 'Spa & Vířivky', el: 'Σπα & Υδρομασάζ' },
    desc: { es: 'Relajación total', en: 'Total relaxation', de: 'Totale Entspannung', fr: 'Relaxation totale', it: 'Relax totale', pt: 'Relaxamento total', nl: 'Totale ontspanning', pl: 'Całkowity relaks', cs: 'Totální relaxace', el: 'Απόλυτη χαλάρωση' }
  },
  { 
    slug: 'infrarrojos',
    image: 'https://aurorahomeluxury.co.uk/cdn/shop/files/insignia-outdoor-hybrid-infrared-sauna-1700-x-1500mm-gardensetting_1200x1200_crop_center.jpg?v=1726583291',
    price: '1.200€',
    names: { es: 'Cabinas Infrarrojos', en: 'Infrared Cabins', de: 'Infrarotkabinen', fr: 'Cabines Infrarouges', it: 'Cabine Infrarossi', pt: 'Cabines Infravermelhos', nl: 'Infrarood Cabines', pl: 'Kabiny na Podczerwień', cs: 'Infračervené Kabiny', el: 'Υπέρυθρες Καμπίνες' },
    desc: { es: 'Terapia y bienestar', en: 'Therapy and wellness', de: 'Therapie und Wellness', fr: 'Thérapie et bien-être', it: 'Terapia e benessere', pt: 'Terapia e bem-estar', nl: 'Therapie en wellness', pl: 'Terapia i wellness', cs: 'Terapie a wellness', el: 'Θεραπεία και ευεξία' }
  },
];

export function Categories({ locale }: CategoriesProps) {
  const texts: Record<string, { title: string; subtitle: string; from: string }> = {
    es: { title: 'Nuestros Productos', subtitle: 'Calidad premium para tu hogar', from: 'Desde' },
    en: { title: 'Our Products', subtitle: 'Premium quality for your home', from: 'From' },
    de: { title: 'Unsere Produkte', subtitle: 'Premium-Qualität für Ihr Zuhause', from: 'Ab' },
    fr: { title: 'Nos Produits', subtitle: 'Qualité premium pour votre maison', from: 'À partir de' },
    it: { title: 'I Nostri Prodotti', subtitle: 'Qualità premium per la tua casa', from: 'Da' },
    pt: { title: 'Nossos Produtos', subtitle: 'Qualidade premium para sua casa', from: 'Desde' },
    nl: { title: 'Onze Producten', subtitle: 'Premium kwaliteit voor uw huis', from: 'Vanaf' },
    pl: { title: 'Nasze Produkty', subtitle: 'Jakość premium dla Twojego domu', from: 'Od' },
    cs: { title: 'Naše Produkty', subtitle: 'Premium kvalita pro váš domov', from: 'Od' },
    el: { title: 'Τα Προϊόντα Μας', subtitle: 'Premium ποιότητα για το σπίτι σας', from: 'Από' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-500">
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
                <Image
                  src={cat.image}
                  alt={cat.names[locale as keyof typeof cat.names] || cat.names.es}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {cat.names[locale as keyof typeof cat.names] || cat.names.es}
                </h3>
                <p className="text-sm text-neutral-400">
                  {cat.desc[locale as keyof typeof cat.desc] || cat.desc.es}
                </p>
                <p className="text-sm text-neutral-500 pt-2">
                  <span className="text-neutral-400">{t.from}</span>{' '}
                  <span className="font-medium text-neutral-900">{cat.price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
