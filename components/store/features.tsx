import { Shield, Truck, Wrench, HeadphonesIcon } from "lucide-react";
import { type Locale } from "@/lib/seo-data";

interface FeaturesProps {
  locale: Locale;
}

export function Features({ locale }: FeaturesProps) {
  const texts: Record<string, { title: string; features: { title: string; desc: string }[] }> = {
    es: {
      title: 'Por qué elegirnos',
      features: [
        { title: 'Garantía 5 años', desc: 'Cobertura completa en todos los productos' },
        { title: 'Envío incluido', desc: 'Entrega gratuita en toda España' },
        { title: 'Instalación profesional', desc: 'Equipo técnico especializado' },
        { title: 'Soporte 24/7', desc: 'Atención al cliente siempre disponible' },
      ]
    },
    en: {
      title: 'Why choose us',
      features: [
        { title: '5 year warranty', desc: 'Full coverage on all products' },
        { title: 'Free shipping', desc: 'Free delivery nationwide' },
        { title: 'Professional installation', desc: 'Specialized technical team' },
        { title: '24/7 Support', desc: 'Customer service always available' },
      ]
    },
    de: {
      title: 'Warum uns wählen',
      features: [
        { title: '5 Jahre Garantie', desc: 'Volle Abdeckung auf alle Produkte' },
        { title: 'Kostenloser Versand', desc: 'Kostenlose Lieferung deutschlandweit' },
        { title: 'Professionelle Installation', desc: 'Spezialisiertes technisches Team' },
        { title: '24/7 Support', desc: 'Kundenservice immer verfügbar' },
      ]
    },
    fr: {
      title: 'Pourquoi nous choisir',
      features: [
        { title: 'Garantie 5 ans', desc: 'Couverture complète sur tous les produits' },
        { title: 'Livraison gratuite', desc: 'Livraison gratuite dans toute la France' },
        { title: 'Installation professionnelle', desc: 'Équipe technique spécialisée' },
        { title: 'Support 24/7', desc: 'Service client toujours disponible' },
      ]
    },
    it: {
      title: 'Perché sceglierci',
      features: [
        { title: 'Garanzia 5 anni', desc: 'Copertura completa su tutti i prodotti' },
        { title: 'Spedizione gratuita', desc: 'Consegna gratuita in tutta Italia' },
        { title: 'Installazione professionale', desc: 'Team tecnico specializzato' },
        { title: 'Supporto 24/7', desc: 'Servizio clienti sempre disponibile' },
      ]
    },
    pt: {
      title: 'Por que nos escolher',
      features: [
        { title: 'Garantia 5 anos', desc: 'Cobertura completa em todos os produtos' },
        { title: 'Envio grátis', desc: 'Entrega gratuita em todo Portugal' },
        { title: 'Instalação profissional', desc: 'Equipe técnica especializada' },
        { title: 'Suporte 24/7', desc: 'Atendimento ao cliente sempre disponível' },
      ]
    },
    nl: {
      title: 'Waarom ons kiezen',
      features: [
        { title: '5 jaar garantie', desc: 'Volledige dekking op alle producten' },
        { title: 'Gratis verzending', desc: 'Gratis levering in heel Nederland' },
        { title: 'Professionele installatie', desc: 'Gespecialiseerd technisch team' },
        { title: '24/7 Ondersteuning', desc: 'Klantenservice altijd beschikbaar' },
      ]
    },
    pl: {
      title: 'Dlaczego my',
      features: [
        { title: 'Gwarancja 5 lat', desc: 'Pełne pokrycie wszystkich produktów' },
        { title: 'Darmowa wysyłka', desc: 'Bezpłatna dostawa w całej Polsce' },
        { title: 'Profesjonalna instalacja', desc: 'Wyspecjalizowany zespół techniczny' },
        { title: 'Wsparcie 24/7', desc: 'Obsługa klienta zawsze dostępna' },
      ]
    },
    cs: {
      title: 'Proč si vybrat nás',
      features: [
        { title: 'Záruka 5 let', desc: 'Plné krytí všech produktů' },
        { title: 'Doprava zdarma', desc: 'Bezplatné doručení po celé ČR' },
        { title: 'Profesionální instalace', desc: 'Specializovaný technický tým' },
        { title: 'Podpora 24/7', desc: 'Zákaznický servis vždy k dispozici' },
      ]
    },
    el: {
      title: 'Γιατί να μας επιλέξετε',
      features: [
        { title: 'Εγγύηση 5 ετών', desc: 'Πλήρης κάλυψη σε όλα τα προϊόντα' },
        { title: 'Δωρεάν αποστολή', desc: 'Δωρεάν παράδοση σε όλη την Ελλάδα' },
        { title: 'Επαγγελματική εγκατάσταση', desc: 'Εξειδικευμένη τεχνική ομάδα' },
        { title: 'Υποστήριξη 24/7', desc: 'Εξυπηρέτηση πελατών πάντα διαθέσιμη' },
      ]
    },
  };

  const t = texts[locale] || texts.es;
  const icons = [Shield, Truck, Wrench, HeadphonesIcon];

  return (
    <section className="py-24 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 text-center mb-16">
          {t.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-white rounded-full border border-neutral-100">
                  <Icon className="w-5 h-5 text-neutral-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
