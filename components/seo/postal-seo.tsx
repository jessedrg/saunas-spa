"use client";

import Script from 'next/script';

interface PostalSEOProps {
  locale: string;
  product: string;
  productSlug: string;
  city: string;
  postalCode: string;
  region: string;
  priceMin: number;
  priceMax: number;
  brand: string;
  domain: string;
  warranty: string;
}

// FAQ Templates by locale
const FAQ_TEMPLATES: Record<string, { q: string; a: string }[]> = {
  es: [
    { q: '¿Cuánto cuesta {product} en {city}?', a: 'El precio de {product} en {city} varía entre {priceMin}€ y {priceMax}€ dependiendo del modelo. Todos incluyen garantía de {warranty}.' },
    { q: '¿Hacen envío a {city} ({postalCode})?', a: 'Sí, realizamos envío gratuito a {city} y toda la zona {postalCode}. Entrega en 3-5 días laborables.' },
    { q: '¿Qué garantía tienen los {product}?', a: 'Todos nuestros {product} incluyen garantía de {warranty}. Servicio técnico disponible en {region}.' },
    { q: '¿Ofrecen instalación en {city}?', a: 'Sí, ofrecemos instalación profesional en {city} y alrededores. Incluida en el precio.' },
    { q: '¿Cómo puedo pedir presupuesto en {city}?', a: 'Solicita presupuesto gratis a través de nuestra web o chat. Respondemos en menos de 24 horas para {city}.' },
  ],
  en: [
    { q: 'How much does {product} cost in {city}?', a: '{product} prices in {city} range from €{priceMin} to €{priceMax} depending on the model. All include {warranty} warranty.' },
    { q: 'Do you deliver to {city} ({postalCode})?', a: 'Yes, we offer free delivery to {city} and the entire {postalCode} area. Delivery in 3-5 business days.' },
    { q: 'What warranty do {product} have?', a: 'All our {product} include {warranty} warranty. Technical service available in {region}.' },
    { q: 'Do you offer installation in {city}?', a: 'Yes, we offer professional installation in {city} and surrounding areas. Included in the price.' },
    { q: 'How can I request a quote in {city}?', a: 'Request a free quote through our website or chat. We respond within 24 hours for {city}.' },
  ],
  de: [
    { q: 'Was kostet {product} in {city}?', a: 'Die Preise für {product} in {city} liegen zwischen {priceMin}€ und {priceMax}€. Alle mit {warranty} Garantie.' },
    { q: 'Liefern Sie nach {city} ({postalCode})?', a: 'Ja, wir liefern kostenlos nach {city} und die gesamte Region {postalCode}. Lieferung in 3-5 Werktagen.' },
    { q: 'Welche Garantie haben die {product}?', a: 'Alle unsere {product} haben {warranty} Garantie. Technischer Service in {region} verfügbar.' },
    { q: 'Bieten Sie Installation in {city} an?', a: 'Ja, wir bieten professionelle Installation in {city} und Umgebung. Im Preis inbegriffen.' },
    { q: 'Wie kann ich ein Angebot in {city} anfordern?', a: 'Fordern Sie ein kostenloses Angebot über unsere Website oder Chat an. Wir antworten innerhalb von 24 Stunden für {city}.' },
  ],
  fr: [
    { q: 'Combien coûte {product} à {city}?', a: 'Les prix de {product} à {city} varient de {priceMin}€ à {priceMax}€. Tous avec garantie {warranty}.' },
    { q: 'Livrez-vous à {city} ({postalCode})?', a: 'Oui, nous livrons gratuitement à {city} et toute la zone {postalCode}. Livraison en 3-5 jours ouvrables.' },
    { q: 'Quelle garantie ont les {product}?', a: 'Tous nos {product} incluent une garantie de {warranty}. Service technique disponible dans {region}.' },
    { q: 'Offrez-vous l\'installation à {city}?', a: 'Oui, nous offrons une installation professionnelle à {city} et environs. Inclus dans le prix.' },
    { q: 'Comment demander un devis à {city}?', a: 'Demandez un devis gratuit via notre site ou chat. Nous répondons sous 24 heures pour {city}.' },
  ],
};

function generateFAQs(data: PostalSEOProps) {
  const templates = FAQ_TEMPLATES[data.locale] || FAQ_TEMPLATES.en;
  return templates.map(t => ({
    question: t.q
      .replace(/{product}/g, data.product)
      .replace(/{city}/g, data.city)
      .replace(/{postalCode}/g, data.postalCode),
    answer: t.a
      .replace(/{product}/g, data.product)
      .replace(/{city}/g, data.city)
      .replace(/{postalCode}/g, data.postalCode)
      .replace(/{region}/g, data.region)
      .replace(/{priceMin}/g, data.priceMin.toString())
      .replace(/{priceMax}/g, data.priceMax.toString())
      .replace(/{warranty}/g, data.warranty),
  }));
}

export function PostalSEOSchemas({ data }: { data: PostalSEOProps }) {
  const faqs = generateFAQs(data);
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${data.product} en ${data.city}`,
    "description": `${data.product} en ${data.city} (${data.postalCode}). Envío gratis, garantía ${data.warranty}.`,
    "brand": { "@type": "Brand", "name": data.brand },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": data.priceMin,
      "highPrice": data.priceMax,
      "availability": "https://schema.org/InStock"
    }
  };

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${data.brand} - ${data.city}`,
    "url": `https://${data.domain}/${data.locale}/${data.productSlug}/cp/${data.postalCode}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city,
      "addressRegion": data.region,
      "postalCode": data.postalCode
    },
    "priceRange": "€€"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://${data.domain}/` },
      { "@type": "ListItem", "position": 2, "name": data.product, "item": `https://${data.domain}/${data.locale}/${data.productSlug}/` },
      { "@type": "ListItem", "position": 3, "name": data.city }
    ]
  };

  return (
    <>
      <Script id="schema-product" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Script id="schema-local" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export function PostalFAQSection({ data }: { data: PostalSEOProps }) {
  const faqs = generateFAQs(data);
  
  const titles: Record<string, string> = {
    es: 'Preguntas Frecuentes',
    en: 'FAQ',
    de: 'Häufige Fragen',
    fr: 'Questions Fréquentes',
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-light text-neutral-900 mb-8 text-center">
          {titles[data.locale] || titles.en}: {data.product} en {data.city}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-neutral-50 transition-colors">
                <span className="font-medium text-neutral-900 pr-4 text-sm">{faq.question}</span>
                <span className="text-neutral-400 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-neutral-600 text-sm">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PostalBreadcrumbs({ data }: { data: PostalSEOProps }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6 max-w-6xl mx-auto">
      <ol className="flex items-center gap-2 text-sm text-neutral-500">
        <li><a href={`/${data.locale}`} className="hover:text-neutral-900">Home</a></li>
        <li><span className="mx-1">/</span></li>
        <li><a href={`/${data.locale}/${data.productSlug}`} className="hover:text-neutral-900">{data.product}</a></li>
        <li><span className="mx-1">/</span></li>
        <li className="text-neutral-900">{data.city}</li>
      </ol>
    </nav>
  );
}

export function PostalPriceTable({ data, products }: { data: PostalSEOProps; products: { name: string; min: number; max: number }[] }) {
  const year = new Date().getFullYear();
  
  const titles: Record<string, { prices: string; model: string; from: string; to: string; shipping: string; free: string }> = {
    es: { prices: 'Precios', model: 'Modelo', from: 'Desde', to: 'Hasta', shipping: 'Envío', free: 'Gratis' },
    en: { prices: 'Prices', model: 'Model', from: 'From', to: 'To', shipping: 'Shipping', free: 'Free' },
    de: { prices: 'Preise', model: 'Modell', from: 'Ab', to: 'Bis', shipping: 'Versand', free: 'Kostenlos' },
    fr: { prices: 'Prix', model: 'Modèle', from: 'Dès', to: 'Jusqu\'à', shipping: 'Livraison', free: 'Gratuite' },
  };
  const t = titles[data.locale] || titles.en;

  return (
    <section className="py-12 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl font-light text-neutral-900 mb-6">
          {t.prices} {data.product} en {data.city} {year}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-900">{t.model}</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">{t.from}</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">{t.to}</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-900">{t.shipping}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 text-neutral-700">{p.name}</td>
                  <td className="py-3 px-4 text-neutral-900 font-medium">{p.min}€</td>
                  <td className="py-3 px-4 text-neutral-900 font-medium">{p.max}€</td>
                  <td className="py-3 px-4 text-green-600">{t.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-400 mt-4">
          {data.locale === 'es' ? 'Precios actualizados. IVA incluido.' : 'Updated prices. VAT included.'}
        </p>
      </div>
    </section>
  );
}

export type { PostalSEOProps };
