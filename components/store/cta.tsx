"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface CTAProps {
  locale: Locale;
}

export function CTA({ locale }: CTAProps) {
  const texts: Record<string, { title: string; subtitle: string; cta: string }> = {
    es: { title: '¿Listo para tu sauna o spa?', subtitle: 'Presupuesto sin compromiso. Instalación profesional incluida.', cta: 'Solicitar Presupuesto' },
    en: { title: 'Ready for your sauna or spa?', subtitle: 'Free quote. Professional installation included.', cta: 'Request Quote' },
    de: { title: 'Bereit für Ihre Sauna oder Spa?', subtitle: 'Kostenloses Angebot. Professionelle Installation inklusive.', cta: 'Angebot Anfordern' },
    fr: { title: 'Prêt pour votre sauna ou spa?', subtitle: 'Devis gratuit. Installation professionnelle incluse.', cta: 'Demander un Devis' },
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
            Ver Catálogo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
