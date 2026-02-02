"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";

const CONTACT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string };
  form: { 
    title: string;
    name: string; 
    email: string; 
    subject: string; 
    message: string; 
    submit: string;
    sending: string;
    success: string;
    successMsg: string;
  };
  info: { 
    title: string;
    email: { label: string; value: string };
    phone: { label: string; value: string };
    address: { label: string; value: string };
  };
  faq: { 
    title: string; 
    items: { q: string; a: string }[] 
  };
}> = {
  en: {
    hero: {
      eyebrow: "Get in Touch",
      title: "We're here to help",
      subtitle: "Have questions about our products or need guidance? Our team of Sauna experts is ready to assist you."
    },
    form: {
      title: "Send us a message",
      name: "Your name",
      email: "Email address",
      subject: "Subject",
      message: "Your message",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message Sent",
      successMsg: "Thank you for reaching out. We'll respond within 24 hours."
    },
    info: {
      title: "Contact Information",
      email: { label: "Email", value: "hello@saunaspa.io" },
      phone: { label: "Phone", value: "+41 800 123 456" },
      address: { label: "Address", value: "Bahnhofstrasse 42, 8001 Zürich, Switzerland" }
    },
    faq: {
      title: "Common Questions",
      items: [
        { q: "What is your shipping policy?", a: "We offer free discreet shipping on orders over €50. Standard delivery takes 2-4 business days across Europe." },
        { q: "Are your products legal?", a: "All our products contain less than 0.2% THC and are fully compliant with EU regulations." },
        { q: "Do you offer returns?", a: "Yes, we offer a 30-day satisfaction guarantee on all unopened products." }
      ]
    }
  },
  es: {
    hero: {
      eyebrow: "Contáctanos",
      title: "Estamos aquí para ayudarte",
      subtitle: "¿Tienes preguntas sobre nuestros productos o necesitas orientación? Nuestro equipo de expertos en Sauna está listo para asistirte."
    },
    form: {
      title: "Envíanos un mensaje",
      name: "Tu nombre",
      email: "Correo electrónico",
      subject: "Asunto",
      message: "Tu mensaje",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
      success: "Mensaje Enviado",
      successMsg: "Gracias por contactarnos. Responderemos en 24 horas."
    },
    info: {
      title: "Información de Contacto",
      email: { label: "Email", value: "hola@saunaspa.io" },
      phone: { label: "Teléfono", value: "+41 800 123 456" },
      address: { label: "Dirección", value: "Bahnhofstrasse 42, 8001 Zürich, Suiza" }
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        { q: "¿Cuál es su política de envío?", a: "Ofrecemos envío discreto gratuito en pedidos superiores a 50€. La entrega estándar tarda 2-4 días laborables en Europa." },
        { q: "¿Son legales sus productos?", a: "Todos nuestros productos contienen menos del 0.2% de THC y cumplen con las regulaciones de la UE." },
        { q: "¿Ofrecen devoluciones?", a: "Sí, ofrecemos garantía de satisfacción de 30 días en todos los productos sin abrir." }
      ]
    }
  },
  de: {
    hero: {
      eyebrow: "Kontakt",
      title: "Wir sind für Sie da",
      subtitle: "Haben Sie Fragen zu unseren Produkten? Unser Sauna-Expertenteam hilft Ihnen gerne."
    },
    form: {
      title: "Nachricht senden",
      name: "Ihr Name",
      email: "E-Mail-Adresse",
      subject: "Betreff",
      message: "Ihre Nachricht",
      submit: "Nachricht Senden",
      sending: "Wird gesendet...",
      success: "Nachricht Gesendet",
      successMsg: "Vielen Dank. Wir antworten innerhalb von 24 Stunden."
    },
    info: {
      title: "Kontaktinformationen",
      email: { label: "E-Mail", value: "hallo@saunaspa.io" },
      phone: { label: "Telefon", value: "+41 800 123 456" },
      address: { label: "Adresse", value: "Bahnhofstrasse 42, 8001 Zürich, Schweiz" }
    },
    faq: {
      title: "Häufige Fragen",
      items: [
        { q: "Wie ist Ihre Versandpolitik?", a: "Kostenloser diskreter Versand ab 50€. Standardlieferung dauert 2-4 Werktage in Europa." },
        { q: "Sind Ihre Produkte legal?", a: "Alle unsere Produkte enthalten weniger als 0,2% THC und entsprechen den EU-Vorschriften." },
        { q: "Bieten Sie Rückgaben an?", a: "Ja, 30 Tage Zufriedenheitsgarantie auf alle ungeöffneten Produkte." }
      ]
    }
  },
  fr: {
    hero: {
      eyebrow: "Contactez-nous",
      title: "Nous sommes là pour vous aider",
      subtitle: "Des questions sur nos produits? Notre équipe d'experts Sauna est prête à vous assister."
    },
    form: {
      title: "Envoyez-nous un message",
      name: "Votre nom",
      email: "Adresse e-mail",
      subject: "Sujet",
      message: "Votre message",
      submit: "Envoyer",
      sending: "Envoi...",
      success: "Message Envoyé",
      successMsg: "Merci de nous avoir contactés. Nous répondrons sous 24 heures."
    },
    info: {
      title: "Informations de Contact",
      email: { label: "Email", value: "bonjour@saunaspa.io" },
      phone: { label: "Téléphone", value: "+41 800 123 456" },
      address: { label: "Adresse", value: "Bahnhofstrasse 42, 8001 Zürich, Suisse" }
    },
    faq: {
      title: "Questions Fréquentes",
      items: [
        { q: "Quelle est votre politique de livraison?", a: "Livraison discrète gratuite dès 50€. Délai standard de 2-4 jours ouvrés en Europe." },
        { q: "Vos produits sont-ils légaux?", a: "Tous nos produits contiennent moins de 0,2% de THC et sont conformes aux réglementations UE." },
        { q: "Proposez-vous des retours?", a: "Oui, garantie satisfaction 30 jours sur tous les produits non ouverts." }
      ]
    }
  }
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const content = CONTACT_CONTENT[locale] || CONTACT_CONTENT.en;
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!SUPPORTED_LOCALES.includes(locale)) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6 block">
            {content.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-6">
            {content.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Form */}
            <div>
              <h2 className="text-2xl font-serif font-light mb-8">{content.form.title}</h2>
              
              {isSuccess ? (
                <div className="bg-muted/30 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-foreground/20 mb-6">
                    <CheckCircle className="h-8 w-8 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-light mb-3">{content.form.success}</h3>
                  <p className="text-muted-foreground font-light">{content.form.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {content.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 px-4 bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {content.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 px-4 bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {content.form.subject}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-14 px-4 bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {content.form.message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-transparent border border-border focus:border-foreground focus:outline-none transition-colors text-sm resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    {isSubmitting ? (
                      content.form.sending
                    ) : (
                      <>
                        {content.form.submit}
                        <Send className="ml-3 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info & FAQ */}
            <div>
              {/* Contact Info */}
              <h2 className="text-2xl font-serif font-light mb-8">{content.info.title}</h2>
              <div className="space-y-8 mb-16">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {content.info.email.label}
                    </p>
                    <a href={`mailto:${content.info.email.value}`} className="text-sm hover:underline">
                      {content.info.email.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {content.info.phone.label}
                    </p>
                    <a href={`tel:${content.info.phone.value}`} className="text-sm hover:underline">
                      {content.info.phone.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border/50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {content.info.address.label}
                    </p>
                    <p className="text-sm">{content.info.address.value}</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <h3 className="text-xl font-serif font-light mb-6">{content.faq.title}</h3>
              <div className="space-y-4">
                {content.faq.items.map((item, index) => (
                  <div key={index} className="border-b border-border/50 pb-4">
                    <h4 className="text-sm font-medium mb-2">{item.q}</h4>
                    <p className="text-sm text-muted-foreground font-light">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Image Section */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop"
          alt="Office"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      <Footer locale={locale} />
    </main>
  );
}
