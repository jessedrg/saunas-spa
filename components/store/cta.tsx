"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface CTAProps {
  locale: Locale;
}

export function CTA({ locale }: CTAProps) {
  const texts: Record<string, { title: string; subtitle: string; cta: string; catalog: string }> = {
    es: { title: '¿Listo para tu sauna o spa?', subtitle: 'Presupuesto sin compromiso. Instalación profesional incluida.', cta: 'Solicitar Presupuesto', catalog: 'Ver Catálogo' },
    en: { title: 'Ready for your sauna or spa?', subtitle: 'Free quote. Professional installation included.', cta: 'Request Quote', catalog: 'View Catalog' },
    de: { title: 'Bereit für Ihre Sauna oder Spa?', subtitle: 'Kostenloses Angebot. Professionelle Installation inklusive.', cta: 'Angebot Anfordern', catalog: 'Katalog Ansehen' },
    fr: { title: 'Prêt pour votre sauna ou spa?', subtitle: 'Devis gratuit. Installation professionnelle incluse.', cta: 'Demander un Devis', catalog: 'Voir Catalogue' },
    it: { title: 'Pronto per la tua sauna o spa?', subtitle: 'Preventivo gratuito. Installazione professionale inclusa.', cta: 'Richiedi Preventivo', catalog: 'Vedi Catalogo' },
    pt: { title: 'Pronto para sua sauna ou spa?', subtitle: 'Orçamento grátis. Instalação profissional incluída.', cta: 'Pedir Orçamento', catalog: 'Ver Catálogo' },
    nl: { title: 'Klaar voor uw sauna of spa?', subtitle: 'Gratis offerte. Professionele installatie inbegrepen.', cta: 'Offerte Aanvragen', catalog: 'Bekijk Catalogus' },
    pl: { title: 'Gotowy na saunę lub spa?', subtitle: 'Darmowa wycena. Profesjonalna instalacja w cenie.', cta: 'Poproś o Wycenę', catalog: 'Zobacz Katalog' },
    cs: { title: 'Připraveni na saunu nebo spa?', subtitle: 'Nabídka zdarma. Profesionální instalace v ceně.', cta: 'Požádat o Nabídku', catalog: 'Zobrazit Katalog' },
    el: { title: 'Έτοιμοι για σάουνα ή σπα;', subtitle: 'Δωρεάν προσφορά. Επαγγελματική εγκατάσταση περιλαμβάνεται.', cta: 'Ζητήστε Προσφορά', catalog: 'Δείτε Κατάλογο' },
  };
  const t = texts[locale] || texts.es;

  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          {t.title}
        </h2>
        <p className="text-neutral-400 mb-10 max-w-md mx-auto">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openIntercomChat()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 text-sm rounded-full hover:bg-neutral-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t.cta}
          </button>
          <Link 
            href={`/${locale === 'en' ? '' : locale + '/'}saunas-finlandesas`}
            className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-700 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
          >
            {t.catalog}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
