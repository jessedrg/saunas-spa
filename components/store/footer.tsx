import Link from "next/link";
import { type Locale } from "@/lib/seo-data";

interface FooterProps {
  locale: Locale;
}

const CATEGORIES: Record<string, { slug: string; name: string }[]> = {
  es: [{ slug: 'saunas-finlandesas', name: 'Saunas' }, { slug: 'jacuzzis', name: 'Jacuzzis' }, { slug: 'spas', name: 'Spas' }, { slug: 'infrarrojos', name: 'Infrarrojos' }],
  en: [{ slug: 'finnish-saunas', name: 'Saunas' }, { slug: 'hot-tubs', name: 'Hot Tubs' }, { slug: 'spas', name: 'Spas' }, { slug: 'infrared-cabins', name: 'Infrared' }],
  de: [{ slug: 'finnische-saunas', name: 'Saunas' }, { slug: 'whirlpools', name: 'Whirlpools' }, { slug: 'spas', name: 'Spas' }, { slug: 'infrarotkabinen', name: 'Infrarot' }],
  fr: [{ slug: 'saunas-finlandais', name: 'Saunas' }, { slug: 'jacuzzis', name: 'Jacuzzis' }, { slug: 'spas', name: 'Spas' }, { slug: 'cabines-infrarouges', name: 'Infrarouge' }],
  it: [{ slug: 'saune-finlandesi', name: 'Saune' }, { slug: 'vasche-idromassaggio', name: 'Vasche' }, { slug: 'spa', name: 'Spa' }, { slug: 'cabine-infrarossi', name: 'Infrarossi' }],
  pt: [{ slug: 'saunas-finlandesas', name: 'Saunas' }, { slug: 'jacuzzis', name: 'Jacuzzis' }, { slug: 'spas', name: 'Spas' }, { slug: 'cabines-infravermelhos', name: 'Infravermelhos' }],
  nl: [{ slug: 'finse-saunas', name: 'Saunas' }, { slug: 'jacuzzis', name: 'Jacuzzis' }, { slug: 'spas', name: 'Spas' }, { slug: 'infrarood-cabines', name: 'Infrarood' }],
  pl: [{ slug: 'sauny-finskie', name: 'Sauny' }, { slug: 'jacuzzi', name: 'Jacuzzi' }, { slug: 'spa', name: 'Spa' }, { slug: 'kabiny-na-podczerwien', name: 'Podczerwień' }],
};

export function Footer({ locale }: FooterProps) {
  const texts: Record<string, { desc: string; products: string; company: string; legal: string; privacy: string; terms: string; about: string; contact: string; faq: string }> = {
    es: { desc: 'Saunas y spas de alta calidad. Instalación profesional incluida.', products: 'Productos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos', about: 'Nosotros', contact: 'Contacto', faq: 'FAQ' },
    en: { desc: 'High quality saunas and spas. Professional installation included.', products: 'Products', company: 'Company', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', about: 'About', contact: 'Contact', faq: 'FAQ' },
    de: { desc: 'Hochwertige Saunas und Spas. Professionelle Installation inklusive.', products: 'Produkte', company: 'Unternehmen', legal: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', about: 'Über uns', contact: 'Kontakt', faq: 'FAQ' },
    fr: { desc: 'Saunas et spas de haute qualité. Installation professionnelle incluse.', products: 'Produits', company: 'Entreprise', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV', about: 'À propos', contact: 'Contact', faq: 'FAQ' },
    it: { desc: 'Saune e spa di alta qualità. Installazione professionale inclusa.', products: 'Prodotti', company: 'Azienda', legal: 'Note legali', privacy: 'Privacy', terms: 'Termini', about: 'Chi siamo', contact: 'Contatto', faq: 'FAQ' },
    pt: { desc: 'Saunas e spas de alta qualidade. Instalação profissional incluída.', products: 'Produtos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidade', terms: 'Termos', about: 'Sobre', contact: 'Contato', faq: 'FAQ' },
    nl: { desc: 'Hoogwaardige sauna\'s en spa\'s. Professionele installatie inbegrepen.', products: 'Producten', company: 'Bedrijf', legal: 'Juridisch', privacy: 'Privacy', terms: 'Voorwaarden', about: 'Over ons', contact: 'Contact', faq: 'FAQ' },
    pl: { desc: 'Wysokiej jakości sauny i spa. Profesjonalna instalacja w cenie.', products: 'Produkty', company: 'Firma', legal: 'Nota prawna', privacy: 'Prywatność', terms: 'Regulamin', about: 'O nas', contact: 'Kontakt', faq: 'FAQ' },
  };
  const t = texts[locale] || texts.es;
  const cats = CATEGORIES[locale] || CATEGORIES.es;

  return (
    <footer className="bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${locale === 'en' ? '' : locale}`} className="text-lg font-light text-neutral-900">
              Sauna Spa
            </Link>
            <p className="text-sm text-neutral-500 mt-4 max-w-xs leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">{t.products}</h4>
            <ul className="space-y-3">
              {cats.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">{t.company}</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}about`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">{t.about}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}contacto`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">{t.contact}</Link></li>
              <li><Link href={`/${locale === 'en' ? '' : locale + '/'}faq`} className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">{t.faq}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Sauna Spa
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale === 'en' ? '' : locale + '/'}privacidad`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}terminos`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.terms}
            </Link>
            <Link href={`/${locale === 'en' ? '' : locale + '/'}legal`} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
