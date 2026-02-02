import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { type Locale, getLocale } from "@/lib/seo-lite";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductRecommendations } from "@/components/product/product-recommendations";
import { translateProduct, translate } from "@/lib/translations";

interface PageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const validLocale = getLocale(locale) as Locale;
  const product = await getProduct(handle, validLocale);

  if (!product) {
    return {
      title: "Product Not Found | SaunaSpa.io",
    };
  }

  // Translate for metadata
  const translated = validLocale !== 'en' 
    ? await translateProduct(
        { id: product.id, title: product.title, description: product.description, productType: product.productType }, 
        validLocale, 
        'en'
      )
    : { title: product.title, description: product.description || '' };

  const price = product.priceRange?.minVariantPrice;
  const imageUrl = product.images?.edges?.[0]?.node?.url;

  return {
    title: `${translated.title} | SaunaSpa.io`,
    description: translated.description?.slice(0, 160) || `Buy ${translated.title} at SaunaSpa.io`,
    alternates: {
      canonical: `/${locale}/product/${handle}`,
    },
    openGraph: {
      title: `${translated.title} | SaunaSpa.io`,
      description: translated.description?.slice(0, 160),
      url: `/${locale}/product/${handle}`,
      siteName: "SaunaSpa.io",
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: translated.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${translated.title} | SaunaSpa.io`,
      description: translated.description?.slice(0, 160),
      images: imageUrl ? [imageUrl] : [],
    },
    other: {
      "product:price:amount": price?.amount || "",
      "product:price:currency": price?.currencyCode || "EUR",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, handle } = await params;
  const validLocale = getLocale(locale) as Locale;
  const product = await getProduct(handle, validLocale);

  if (!product) {
    notFound();
  }

  // Translate product content if not English
  console.log('[v0] Product page locale:', validLocale, 'English?:', validLocale === 'en');
  console.log('[v0] Original product title:', product.title);
  
  const translated = validLocale !== 'en' 
    ? await translateProduct(
        { 
          id: product.id, 
          title: product.title, 
          description: product.description,
          productType: product.productType 
        }, 
        validLocale, 
        'en'
      )
    : { title: product.title, description: product.description || '', productType: product.productType || '' };

  console.log('[v0] Translated title:', translated.title);
  console.log('[v0] Translated description:', translated.description?.substring(0, 50));

  // Create translated product object
  const translatedProduct = {
    ...product,
    title: translated.title,
    description: translated.description,
    productType: translated.productType,
  };

  // Translate description HTML if exists
  const translatedDescriptionHtml = product.descriptionHtml && validLocale !== 'en'
    ? (await translate(product.descriptionHtml, validLocale, { sourceLocale: 'en', contentType: 'product_description_html', sourceId: product.id })).text
    : product.descriptionHtml;

  // Translate "Description" heading
  const descriptionHeading = validLocale !== 'en'
    ? (await translate('Description', validLocale, { sourceLocale: 'en', contentType: 'ui', sourceId: 'description_heading' })).text
    : 'Description';

  // Get related products for recommendations
  const allProducts = await getProducts({ first: 8, locale: validLocale });
  const relatedProducts = allProducts.filter((p) => p.handle !== handle).slice(0, 4);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: translatedProduct.title,
    description: translatedProduct.description,
    image: product.images?.edges?.map((e) => e.node.url) || [],
    offers: {
      "@type": "Offer",
      price: product.priceRange?.minVariantPrice?.amount,
      priceCurrency: product.priceRange?.minVariantPrice?.currencyCode,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-screen flex-col bg-background">
        <Header locale={validLocale} />

        <main className="flex-1 pt-16 lg:pt-20">
          {/* Product Section */}
          <section className="py-8 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Gallery */}
                <ProductGallery product={translatedProduct} />

                {/* Product Info */}
                <ProductInfo product={translatedProduct} locale={validLocale} />
              </div>
            </div>
          </section>

          {/* Product Description */}
          {translatedDescriptionHtml && (
            <section className="py-12 border-t border-border">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-serif font-medium mb-6">{descriptionHeading}</h2>
                  <div
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: translatedDescriptionHtml }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Recommendations */}
          {relatedProducts.length > 0 && (
            <ProductRecommendations products={relatedProducts} locale={validLocale} />
          )}
        </main>

        <Footer locale={validLocale} />
      </div>
    </>
  );
}
