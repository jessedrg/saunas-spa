import React from "react"
import type { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const CONTACT_TITLES: Record<string, { title: string; subtitle: string }> = {
  es: { title: 'Contacto', subtitle: 'Estamos aqui para ayudarte. Contactanos y te responderemos lo antes posible.' },
  en: { title: 'Contact Us', subtitle: 'We are here to help. Contact us and we will respond as soon as possible.' },
  de: { title: 'Kontakt', subtitle: 'Wir sind hier um zu helfen. Kontaktieren Sie uns.' },
  fr: { title: 'Contact', subtitle: 'Nous sommes la pour vous aider. Contactez-nous.' },
  it: { title: 'Contatti', subtitle: 'Siamo qui per aiutarti. Contattaci.' },
  pt: { title: 'Contato', subtitle: 'Estamos aqui para ajudar. Entre em contato.' },
  nl: { title: 'Contact', subtitle: 'Wij zijn er om te helpen. Neem contact op.' },
  pl: { title: 'Kontakt', subtitle: 'Jestesmy tutaj, aby pomoc.' },
  sv: { title: 'Kontakt', subtitle: 'Vi ar har for att hjalpa.' },
  da: { title: 'Kontakt', subtitle: 'Vi er her for at hjalpe.' },
  no: { title: 'Kontakt', subtitle: 'Vi er her for a hjelpe.' },
  fi: { title: 'Yhteystiedot', subtitle: 'Olemme taalla auttamassa.' },
  cs: { title: 'Kontakt', subtitle: 'Jsme tu, abychom vam pomohli.' },
  el: { title: 'Επικοινωνία', subtitle: 'Είμαστε εδώ για να βοηθήσουμε.' },
  ro: { title: 'Contact', subtitle: 'Suntem aici sa ajutam.' },
  hu: { title: 'Kapcsolat', subtitle: 'Segitunk.' },
  tr: { title: 'Iletisim', subtitle: 'Yardim etmek icin buradayiz.' },
  ja: { title: 'お問い合わせ', subtitle: 'お手伝いします。' },
  ko: { title: '문의하기', subtitle: '도움을 드립니다.' },
  zh: { title: '联系我们', subtitle: '我们随时为您服务。' },
  bg: { title: 'Контакт', subtitle: 'Ние сме тук да помогнем.' },
  sk: { title: 'Kontakt', subtitle: 'Sme tu, aby sme vam pomohli.' },
  hr: { title: 'Kontakt', subtitle: 'Tu smo da pomognemo.' },
  sl: { title: 'Kontakt', subtitle: 'Tu smo, da pomagamo.' },
  et: { title: 'Kontakt', subtitle: 'Oleme siin, et aidata.' },
  lv: { title: 'Kontakti', subtitle: 'Mes esam seit, lai palidzetu.' },
  lt: { title: 'Kontaktai', subtitle: 'Mes cia, kad padėtume.' },
  mt: { title: 'Kuntatt', subtitle: 'Ahna hawn biex nghinu.' },
  ga: { title: 'Teagmháil', subtitle: 'Táimid anseo chun cabhrú.' },
  ru: { title: 'Контакты', subtitle: 'Мы здесь, чтобы помочь.' },
  uk: { title: 'Контакти', subtitle: 'Ми тут, щоб допомогти.' },
  ar: { title: 'اتصل بنا', subtitle: 'نحن هنا للمساعدة.' },
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  
  const t = CONTACT_TITLES[locale] || CONTACT_TITLES.en;
  const canonicalUrl = `/${locale}/contact`;
  
  return {
    title: `${t.title} | Saunas y Spas`,
    description: t.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${t.title} | Saunas y Spas`,
      description: t.subtitle,
      url: canonicalUrl,
      siteName: 'Saunas y Spas',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | Saunas y Spas`,
      description: t.subtitle,
      images: ['/og-image.jpg'],
    },
  };
}

export default function ContactLayout({ children }: LayoutProps) {
  return children;
}
