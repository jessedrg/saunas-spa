import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, TRANSLATIONS, type Locale } from "@/lib/seo-data";
import { Leaf, FlaskConical, Heart, Shield, Award, Users } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const ABOUT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string };
  philosophy: { eyebrow: string; title: string; text1: string; text2: string };
  values: { title: string; items: { icon: string; title: string; desc: string }[] };
  process: { eyebrow: string; title: string; steps: { num: string; title: string; desc: string }[] };
  commitment: { eyebrow: string; title: string; text: string };
  cta: { title: string; subtitle: string; button: string };
}> = {
  en: {
    hero: {
      eyebrow: "Our Story",
      title: "Crafted with intention, delivered with care",
      subtitle: "Saunas y Spas was born from a simple belief: everyone deserves access to premium, lab-tested Sauna products that enhance wellbeing naturally."
    },
    philosophy: {
      eyebrow: "Philosophy",
      title: "Nature meets science",
      text1: "We believe in the power of hemp-derived Sauna to support balance and wellness. Our journey began in the Swiss Alps, where we discovered the remarkable potential of organically grown hemp.",
      text2: "Today, we partner with sustainable farms across Europe, ensuring every product meets our exacting standards for purity, potency, and quality."
    },
    values: {
      title: "Our Values",
      items: [
        { icon: "leaf", title: "Organic Origins", desc: "100% organically grown hemp from certified European farms" },
        { icon: "flask", title: "Lab Tested", desc: "Third-party testing for every batch ensures purity and potency" },
        { icon: "heart", title: "Wellness First", desc: "Formulated to support your natural balance and wellbeing" },
        { icon: "shield", title: "Transparency", desc: "Full traceability from seed to shelf with COA access" },
        { icon: "award", title: "Premium Quality", desc: "CO2 extraction preserves the full spectrum of cannabinoids" },
        { icon: "users", title: "Expert Guidance", desc: "Dedicated support team to help you find the right products" }
      ]
    },
    process: {
      eyebrow: "Our Process",
      title: "From seed to serenity",
      steps: [
        { num: "01", title: "Cultivation", desc: "Organic hemp grown in nutrient-rich European soil" },
        { num: "02", title: "Extraction", desc: "Supercritical CO2 extraction preserves beneficial compounds" },
        { num: "03", title: "Testing", desc: "Rigorous third-party lab testing for purity and potency" },
        { num: "04", title: "Formulation", desc: "Expert blending for optimal bioavailability" }
      ]
    },
    commitment: {
      eyebrow: "Our Commitment",
      title: "Quality without compromise",
      text: "Every Saunas y Spas product undergoes rigorous testing to ensure it meets our standards. We publish all lab results so you can shop with complete confidence."
    },
    cta: {
      title: "Experience the difference",
      subtitle: "Discover our curated collection of premium Sauna products",
      button: "Shop Collection"
    }
  },
  es: {
    hero: {
      eyebrow: "Nuestra Historia",
      title: "Creado con intención, entregado con cuidado",
      subtitle: "Saunas y Spas nació de una creencia simple: todos merecen acceso a productos Sauna premium, probados en laboratorio, que mejoran el bienestar de forma natural."
    },
    philosophy: {
      eyebrow: "Filosofía",
      title: "La naturaleza se encuentra con la ciencia",
      text1: "Creemos en el poder del Sauna derivado del cáñamo para apoyar el equilibrio y el bienestar. Nuestro viaje comenzó en los Alpes suizos, donde descubrimos el notable potencial del cáñamo cultivado orgánicamente.",
      text2: "Hoy, colaboramos con granjas sostenibles en toda Europa, asegurando que cada producto cumpla con nuestros exigentes estándares de pureza, potencia y calidad."
    },
    values: {
      title: "Nuestros Valores",
      items: [
        { icon: "leaf", title: "Orígenes Orgánicos", desc: "Cáñamo 100% orgánico de granjas europeas certificadas" },
        { icon: "flask", title: "Probado en Laboratorio", desc: "Pruebas de terceros para cada lote garantizan pureza" },
        { icon: "heart", title: "Bienestar Primero", desc: "Formulado para apoyar tu equilibrio natural" },
        { icon: "shield", title: "Transparencia", desc: "Trazabilidad completa de la semilla al estante" },
        { icon: "award", title: "Calidad Premium", desc: "Extracción CO2 preserva el espectro completo" },
        { icon: "users", title: "Guía Experta", desc: "Equipo dedicado para ayudarte a encontrar los productos correctos" }
      ]
    },
    process: {
      eyebrow: "Nuestro Proceso",
      title: "De la semilla a la serenidad",
      steps: [
        { num: "01", title: "Cultivo", desc: "Cáñamo orgánico cultivado en suelo europeo rico en nutrientes" },
        { num: "02", title: "Extracción", desc: "Extracción CO2 supercrítica preserva compuestos beneficiosos" },
        { num: "03", title: "Pruebas", desc: "Rigurosas pruebas de laboratorio de terceros" },
        { num: "04", title: "Formulación", desc: "Mezcla experta para biodisponibilidad óptima" }
      ]
    },
    commitment: {
      eyebrow: "Nuestro Compromiso",
      title: "Calidad sin compromisos",
      text: "Cada producto Saunas y Spas pasa por pruebas rigurosas. Publicamos todos los resultados de laboratorio para que compres con total confianza."
    },
    cta: {
      title: "Experimenta la diferencia",
      subtitle: "Descubre nuestra colección curada de productos Sauna premium",
      button: "Ver Colección"
    }
  },
  de: {
    hero: {
      eyebrow: "Unsere Geschichte",
      title: "Mit Absicht gefertigt, mit Sorgfalt geliefert",
      subtitle: "Saunas y Spas wurde aus einer einfachen Überzeugung geboren: Jeder verdient Zugang zu Premium-Sauna-Produkten, die das Wohlbefinden natürlich verbessern."
    },
    philosophy: {
      eyebrow: "Philosophie",
      title: "Natur trifft Wissenschaft",
      text1: "Wir glauben an die Kraft von aus Hanf gewonnenem Sauna zur Unterstützung von Balance und Wohlbefinden.",
      text2: "Heute arbeiten wir mit nachhaltigen Farmen in ganz Europa zusammen."
    },
    values: {
      title: "Unsere Werte",
      items: [
        { icon: "leaf", title: "Bio-Ursprünge", desc: "100% biologisch angebauter Hanf" },
        { icon: "flask", title: "Laborgetestet", desc: "Drittanbieter-Tests für jede Charge" },
        { icon: "heart", title: "Wellness Zuerst", desc: "Formuliert für natürliches Gleichgewicht" },
        { icon: "shield", title: "Transparenz", desc: "Volle Rückverfolgbarkeit" },
        { icon: "award", title: "Premium-Qualität", desc: "CO2-Extraktion bewahrt das volle Spektrum" },
        { icon: "users", title: "Expertenberatung", desc: "Engagiertes Support-Team" }
      ]
    },
    process: {
      eyebrow: "Unser Prozess",
      title: "Vom Samen zur Gelassenheit",
      steps: [
        { num: "01", title: "Anbau", desc: "Bio-Hanf in nährstoffreichem europäischem Boden" },
        { num: "02", title: "Extraktion", desc: "Überkritische CO2-Extraktion" },
        { num: "03", title: "Prüfung", desc: "Strenge Labortests von Drittanbietern" },
        { num: "04", title: "Formulierung", desc: "Expertenmischung für optimale Bioverfügbarkeit" }
      ]
    },
    commitment: {
      eyebrow: "Unser Engagement",
      title: "Qualität ohne Kompromisse",
      text: "Jedes Saunas y Spas-Produkt wird rigoros getestet. Wir veröffentlichen alle Laborergebnisse."
    },
    cta: {
      title: "Erleben Sie den Unterschied",
      subtitle: "Entdecken Sie unsere kuratierte Kollektion",
      button: "Kollektion Ansehen"
    }
  },
  fr: {
    hero: {
      eyebrow: "Notre Histoire",
      title: "Créé avec intention, livré avec soin",
      subtitle: "Saunas y Spas est né d'une conviction simple : tout le monde mérite d'accéder à des produits Sauna premium qui améliorent le bien-être naturellement."
    },
    philosophy: {
      eyebrow: "Philosophie",
      title: "La nature rencontre la science",
      text1: "Nous croyons au pouvoir du Sauna dérivé du chanvre pour soutenir l'équilibre et le bien-être.",
      text2: "Aujourd'hui, nous collaborons avec des fermes durables à travers l'Europe."
    },
    values: {
      title: "Nos Valeurs",
      items: [
        { icon: "leaf", title: "Origines Bio", desc: "Chanvre 100% biologique" },
        { icon: "flask", title: "Testé en Labo", desc: "Tests tiers pour chaque lot" },
        { icon: "heart", title: "Bien-être d'Abord", desc: "Formulé pour l'équilibre naturel" },
        { icon: "shield", title: "Transparence", desc: "Traçabilité complète" },
        { icon: "award", title: "Qualité Premium", desc: "Extraction CO2 préserve le spectre complet" },
        { icon: "users", title: "Conseils Experts", desc: "Équipe dédiée pour vous guider" }
      ]
    },
    process: {
      eyebrow: "Notre Processus",
      title: "De la graine à la sérénité",
      steps: [
        { num: "01", title: "Culture", desc: "Chanvre bio dans un sol européen riche" },
        { num: "02", title: "Extraction", desc: "Extraction CO2 supercritique" },
        { num: "03", title: "Tests", desc: "Tests rigoureux en laboratoire" },
        { num: "04", title: "Formulation", desc: "Mélange expert pour biodisponibilité optimale" }
      ]
    },
    commitment: {
      eyebrow: "Notre Engagement",
      title: "Qualité sans compromis",
      text: "Chaque produit Saunas y Spas est rigoureusement testé. Nous publions tous les résultats."
    },
    cta: {
      title: "Découvrez la différence",
      subtitle: "Explorez notre collection de produits Sauna premium",
      button: "Voir la Collection"
    }
  }
};

function getIcon(name: string) {
  switch (name) {
    case 'leaf': return Leaf;
    case 'flask': return FlaskConical;
    case 'heart': return Heart;
    case 'shield': return Shield;
    case 'award': return Award;
    case 'users': return Users;
    default: return Leaf;
  }
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;
  
  return {
    title: `About | Saunas y Spas`,
    description: content.hero.subtitle,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  
  const validLocale = locale as Locale;
  const content = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} transparent />
      
      {/* Hero Section - Full screen with image */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617101815102-e5728e6685fc?w=1920&h=1080&fit=crop"
            alt="Hemp field"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pt-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 mb-6 block">
            {content.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-8 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 block">
                {content.philosophy.eyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-8">
                {content.philosophy.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                {content.philosophy.text1}
              </p>
              <p className="text-muted-foreground leading-relaxed font-light">
                {content.philosophy.text2}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=1000&fit=crop"
                alt="Sauna oil dropper"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight">
              {content.values.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {content.values.items.map((value, index) => {
              const IconComponent = getIcon(value.icon);
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-border/50">
                    <IconComponent className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              {content.process.eyebrow}
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight">
              {content.process.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-serif font-light text-muted-foreground/30 mb-4">
                  {step.num}
                </div>
                <h3 className="text-sm uppercase tracking-[0.15em] font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-background/60 mb-6 block">
            {content.commitment.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight mb-8">
            {content.commitment.title}
          </h2>
          <p className="text-lg text-background/70 font-light leading-relaxed max-w-2xl mx-auto">
            {content.commitment.text}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">
            {content.cta.title}
          </h2>
          <p className="text-muted-foreground mb-10 font-light">
            {content.cta.subtitle}
          </p>
          <Link 
            href={`/${locale}/sauna-oil`}
            className="inline-flex items-center justify-center h-14 px-12 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors"
          >
            {content.cta.button}
          </Link>
        </div>
      </section>

      <Footer locale={validLocale} />
    </main>
  );
}
