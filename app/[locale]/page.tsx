import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import { Features } from "@/components/store/features";
import { Categories } from "@/components/store/categories";
import { ShopifyProducts } from "@/components/store/shopify-products"; // Updated import
import { CTA } from "@/components/store/cta";
import { LocalSEO } from "@/components/store/local-seo";
import { Footer } from "@/components/store/footer";
import { SUPPORTED_LOCALES, TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter(l => l !== 'en').map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    return {};
  }

  const t = TRANSLATIONS[locale as Locale];
  const title = t.hero.title.replace('\n', ' ');
  const description = t.hero.subtitle;
  const canonicalUrl = `/${locale}`;
  
  return {
    title: `Saunas y Spas | ${title}`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map(l => [l, l === 'en' ? '/' : `/${l}`])
      ),
    },
    openGraph: {
      title: `Saunas y Spas | ${title}`,
      description,
      url: canonicalUrl,
      siteName: 'Saunas y Spas',
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Saunas y Spas - ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Saunas y Spas | ${title}`,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    notFound();
  }

const validLocale = locale as Locale;
  const t = TRANSLATIONS[validLocale];

  return (
    <main className="min-h-screen bg-background">
      <Header locale={validLocale} />
      <Hero locale={validLocale} />
      <Features locale={validLocale} />
      <Categories locale={validLocale} />
      <ShopifyProducts locale={validLocale} title={t.products.title} />
      <CTA locale={validLocale} />
      <LocalSEO locale={validLocale} />
      <Footer locale={validLocale} />
    </main>
  );
}
