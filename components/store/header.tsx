"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/seo-data";
import { openIntercomChat } from "@/components/intercom";

const CATEGORIES = [
  { slug: 'saunas-finlandesas', name: { es: 'Saunas', en: 'Saunas', de: 'Saunas', fr: 'Saunas' } },
  { slug: 'jacuzzis', name: { es: 'Jacuzzis', en: 'Hot Tubs', de: 'Whirlpools', fr: 'Jacuzzis' } },
  { slug: 'spas', name: { es: 'Spas', en: 'Spas', de: 'Spas', fr: 'Spas' } },
  { slug: 'infrarrojos', name: { es: 'Infrarrojos', en: 'Infrared', de: 'Infrarot', fr: 'Infrarouge' } },
];

interface HeaderProps {
  locale: Locale;
  transparent?: boolean;
}

export function Header({ locale, transparent = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCatName = (cat: typeof CATEGORIES[0]) => {
    return cat.name[locale as keyof typeof cat.name] || cat.name.en;
  };

  const texts = {
    es: { contact: 'Contacto', quote: 'Presupuesto' },
    en: { contact: 'Contact', quote: 'Quote' },
    de: { contact: 'Kontakt', quote: 'Angebot' },
    fr: { contact: 'Contact', quote: 'Devis' },
  };
  const t = texts[locale as keyof typeof texts] || texts.en;

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        transparent 
          ? "bg-transparent" 
          : "bg-white/80 backdrop-blur-md border-b border-neutral-100"
      )}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link 
              href={`/${locale === 'en' ? '' : locale}`} 
              className={cn(
                "text-lg font-light tracking-wide transition-colors",
                transparent ? "text-white" : "text-neutral-900"
              )}
            >
              SaunaSpa.io
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat.slug}
                  href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`} 
                  className={cn(
                    "text-sm transition-colors",
                    transparent 
                      ? "text-white/70 hover:text-white" 
                      : "text-neutral-500 hover:text-neutral-900"
                  )}
                >
                  {getCatName(cat)}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => openIntercomChat()}
                className={cn(
                  "hidden sm:flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all",
                  transparent 
                    ? "bg-white/10 text-white hover:bg-white/20" 
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                )}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t.quote}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={cn(
                  "md:hidden p-2 -mr-2",
                  transparent ? "text-white" : "text-neutral-900"
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[100] transition-all duration-300",
        isMenuOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Panel */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <span className="text-lg font-light">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6 space-y-1">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug}
                href={`/${locale === 'en' ? '' : locale + '/'}${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-lg text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {getCatName(cat)}
              </Link>
            ))}
            <div className="pt-6 mt-6 border-t border-neutral-100">
              <button 
                onClick={() => { openIntercomChat(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 text-white rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                {t.quote}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
