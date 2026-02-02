"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

interface HeroProps {
  locale: Locale;
  cityName?: string;
}

export function Hero({ locale }: HeroProps) {
  const texts: Record<string, { tag: string; title: string; subtitle: string; cta: string; stats: { value: string; label: string }[] }> = {
    es: {
      tag: 'Bienestar Premium',
      title: 'SaunaSpa.io\npara tu hogar',
      subtitle: 'Instalación profesional. Garantía 5 años. Presupuesto sin compromiso.',
      cta: 'Ver Catálogo',
      stats: [
        { value: '2.000+', label: 'Instalaciones' },
        { value: '4.9', label: 'Valoración' },
        { value: '5 años', label: 'Garantía' },
      ]
    },
    en: {
      tag: 'Premium Wellness',
      title: 'SaunaSpa.io\nfor your home',
      subtitle: 'Professional installation. 5 year warranty. Free quote.',
      cta: 'View Catalog',
      stats: [
        { value: '2,000+', label: 'Installations' },
        { value: '4.9', label: 'Rating' },
        { value: '5 years', label: 'Warranty' },
      ]
    },
    de: {
      tag: 'Premium Wellness',
      title: 'SaunaSpa.io\nfür Ihr Zuhause',
      subtitle: 'Professionelle Installation. 5 Jahre Garantie. Kostenloses Angebot.',
      cta: 'Katalog Ansehen',
      stats: [
        { value: '2.000+', label: 'Installationen' },
        { value: '4.9', label: 'Bewertung' },
        { value: '5 Jahre', label: 'Garantie' },
      ]
    },
    fr: {
      tag: 'Bien-être Premium',
      title: 'SaunaSpa.io\npour votre maison',
      subtitle: 'Installation professionnelle. Garantie 5 ans. Devis gratuit.',
      cta: 'Voir Catalogue',
      stats: [
        { value: '2 000+', label: 'Installations' },
        { value: '4.9', label: 'Note' },
        { value: '5 ans', label: 'Garantie' },
      ]
    },
  };

  const t = texts[locale] || texts.es;
  const titleParts = t.title.split('\n');

  return (
    <section className="relative min-h-screen bg-[#fafaf9]">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-32 pt-28">
          <div className="max-w-lg">
            {/* Tag */}
            <span className="inline-block text-xs tracking-widest text-neutral-400 uppercase mb-8">
              {t.tag}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1] mb-6">
              {titleParts.map((part, i) => (
                <span key={i} className={i === 1 ? "block text-neutral-400" : "block"}>
                  {part}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-neutral-500 leading-relaxed mb-10 max-w-md">
              {t.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link 
                href={`/${locale === 'en' ? '' : locale + '/'}saunas-finlandesas`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white text-sm rounded-full hover:bg-neutral-800 transition-colors"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                onClick={() => openIntercomChat()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 text-sm rounded-full hover:bg-neutral-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-neutral-200">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-light text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative hidden lg:block">
          <Image 
            src="https://images.unsplash.com/photo-1759302354886-f2c37dd3dd8c?q=80&w=1349&auto=format&fit=crop" 
            alt="Sauna finlandesa" 
            fill 
            className="object-cover" 
            priority 
            sizes="50vw"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fafaf9]/20" />
        </div>
      </div>

      {/* Mobile Image */}
      <div className="relative h-80 lg:hidden">
        <Image 
          src="https://images.unsplash.com/photo-1759302354886-f2c37dd3dd8c?q=80&w=1349&auto=format&fit=crop" 
          alt="Sauna finlandesa" 
          fill 
          className="object-cover" 
          priority 
          sizes="100vw"
        />
      </div>
    </section>
  );
}
