import type { Metadata } from "next";
import { Header } from "@/components/store/header";
import { Hero } from "@/components/store/hero";
import { Features } from "@/components/store/features";
import { Categories } from "@/components/store/categories";
import { ShopifyProducts } from "@/components/store/shopify-products";
import { CTA } from "@/components/store/cta";
import { Footer } from "@/components/store/footer";
import { TRANSLATIONS, SUPPORTED_LOCALES } from "@/lib/seo-data";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      SUPPORTED_LOCALES.map(l => [l, l === 'en' ? '/' : `/${l}`])
    ),
  },
};

export default function HomePage() {
  const t = TRANSLATIONS.en;
  
  return (
    <main className="min-h-screen bg-background">
      <Header locale="en" />
      <Hero locale="en" />
      <Features locale="en" />
      <Categories locale="en" />
      <ShopifyProducts locale="en" title={t.products.title} />
      <CTA locale="en" />
      <Footer locale="en" />
    </main>
  );
}
