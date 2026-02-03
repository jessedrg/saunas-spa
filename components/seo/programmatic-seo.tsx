import Script from 'next/script';

// =============================================================================
// PROGRAMMATIC SEO COMPONENT
// Multi-language support with Schema markup, FAQs, and local content
// =============================================================================

export type Locale = 'es' | 'en' | 'de' | 'fr' | 'it' | 'pt' | 'nl' | 'pl';

interface SEOData {
  locale: Locale;
  pageType: 'category' | 'product_city' | 'subcategory' | 'informational' | 'local';
  product: string;
  productSlug: string;
  city?: string;
  citySlug?: string;
  region?: string;
  country?: string;
  priceMin: number;
  priceMax: number;
  brand: string;
  domain: string;
  warranty: string;
  nearbyCities?: { name: string; slug: string; distance?: number }[];
  relatedProducts?: { name: string; slug: string; price: string }[];
}

// =============================================================================
// TRANSLATIONS
// =============================================================================

const TRANSLATIONS: Record<Locale, {
  from: string;
  to: string;
  in: string;
  and: string;
  or: string;
  price: string;
  prices: string;
  buy: string;
  shop: string;
  free: string;
  shipping: string;
  warranty: string;
  quality: string;
  premium: string;
  professional: string;
  home: string;
  guide: string;
  best: string;
  types: string;
  howToChoose: string;
  faq: string;
  nearbyAreas: string;
  alsoInterested: string;
  relatedProducts: string;
  viewAll: string;
  requestQuote: string;
  freeQuote: string;
  updated: string;
  vatIncluded: string;
  serviceArea: string;
  deliveryTime: string;
  businessDays: string;
  inStock: string;
  available: string;
}> = {
  es: {
    from: 'desde', to: 'hasta', in: 'en', and: 'y', or: 'o',
    price: 'Precio', prices: 'Precios', buy: 'Comprar', shop: 'Tienda',
    free: 'Gratis', shipping: 'Envío', warranty: 'Garantía', quality: 'Calidad',
    premium: 'Premium', professional: 'Profesional', home: 'para casa',
    guide: 'Guía de Compra', best: 'Mejores', types: 'Tipos de',
    howToChoose: 'Cómo elegir', faq: 'Preguntas frecuentes',
    nearbyAreas: 'Zonas cercanas', alsoInterested: 'También te puede interesar',
    relatedProducts: 'Productos relacionados', viewAll: 'Ver todo',
    requestQuote: 'Solicitar presupuesto', freeQuote: 'Presupuesto gratis',
    updated: 'Actualizado', vatIncluded: 'IVA incluido',
    serviceArea: 'Zona de servicio', deliveryTime: 'Tiempo de entrega',
    businessDays: 'días laborables', inStock: 'En stock', available: 'Disponible'
  },
  en: {
    from: 'from', to: 'to', in: 'in', and: 'and', or: 'or',
    price: 'Price', prices: 'Prices', buy: 'Buy', shop: 'Shop',
    free: 'Free', shipping: 'Shipping', warranty: 'Warranty', quality: 'Quality',
    premium: 'Premium', professional: 'Professional', home: 'for home',
    guide: 'Buying Guide', best: 'Best', types: 'Types of',
    howToChoose: 'How to choose', faq: 'FAQ',
    nearbyAreas: 'Nearby areas', alsoInterested: 'You may also like',
    relatedProducts: 'Related products', viewAll: 'View all',
    requestQuote: 'Request quote', freeQuote: 'Free quote',
    updated: 'Updated', vatIncluded: 'VAT included',
    serviceArea: 'Service area', deliveryTime: 'Delivery time',
    businessDays: 'business days', inStock: 'In stock', available: 'Available'
  },
  de: {
    from: 'ab', to: 'bis', in: 'in', and: 'und', or: 'oder',
    price: 'Preis', prices: 'Preise', buy: 'Kaufen', shop: 'Shop',
    free: 'Kostenlos', shipping: 'Versand', warranty: 'Garantie', quality: 'Qualität',
    premium: 'Premium', professional: 'Professionell', home: 'für Zuhause',
    guide: 'Kaufratgeber', best: 'Beste', types: 'Arten von',
    howToChoose: 'Wie wählt man', faq: 'Häufige Fragen',
    nearbyAreas: 'Nahe Gebiete', alsoInterested: 'Das könnte Sie interessieren',
    relatedProducts: 'Ähnliche Produkte', viewAll: 'Alle ansehen',
    requestQuote: 'Angebot anfordern', freeQuote: 'Kostenloses Angebot',
    updated: 'Aktualisiert', vatIncluded: 'MwSt. inklusive',
    serviceArea: 'Servicegebiet', deliveryTime: 'Lieferzeit',
    businessDays: 'Werktage', inStock: 'Auf Lager', available: 'Verfügbar'
  },
  fr: {
    from: 'à partir de', to: 'jusqu\'à', in: 'à', and: 'et', or: 'ou',
    price: 'Prix', prices: 'Prix', buy: 'Acheter', shop: 'Boutique',
    free: 'Gratuit', shipping: 'Livraison', warranty: 'Garantie', quality: 'Qualité',
    premium: 'Premium', professional: 'Professionnel', home: 'pour maison',
    guide: 'Guide d\'achat', best: 'Meilleurs', types: 'Types de',
    howToChoose: 'Comment choisir', faq: 'Questions fréquentes',
    nearbyAreas: 'Zones proches', alsoInterested: 'Cela pourrait vous intéresser',
    relatedProducts: 'Produits similaires', viewAll: 'Voir tout',
    requestQuote: 'Demander un devis', freeQuote: 'Devis gratuit',
    updated: 'Mis à jour', vatIncluded: 'TVA incluse',
    serviceArea: 'Zone de service', deliveryTime: 'Délai de livraison',
    businessDays: 'jours ouvrables', inStock: 'En stock', available: 'Disponible'
  },
  it: {
    from: 'da', to: 'a', in: 'a', and: 'e', or: 'o',
    price: 'Prezzo', prices: 'Prezzi', buy: 'Acquista', shop: 'Negozio',
    free: 'Gratuito', shipping: 'Spedizione', warranty: 'Garanzia', quality: 'Qualità',
    premium: 'Premium', professional: 'Professionale', home: 'per casa',
    guide: 'Guida all\'acquisto', best: 'Migliori', types: 'Tipi di',
    howToChoose: 'Come scegliere', faq: 'Domande frequenti',
    nearbyAreas: 'Zone vicine', alsoInterested: 'Potrebbe interessarti',
    relatedProducts: 'Prodotti correlati', viewAll: 'Vedi tutto',
    requestQuote: 'Richiedi preventivo', freeQuote: 'Preventivo gratuito',
    updated: 'Aggiornato', vatIncluded: 'IVA inclusa',
    serviceArea: 'Area di servizio', deliveryTime: 'Tempi di consegna',
    businessDays: 'giorni lavorativi', inStock: 'Disponibile', available: 'Disponibile'
  },
  pt: {
    from: 'desde', to: 'até', in: 'em', and: 'e', or: 'ou',
    price: 'Preço', prices: 'Preços', buy: 'Comprar', shop: 'Loja',
    free: 'Grátis', shipping: 'Envio', warranty: 'Garantia', quality: 'Qualidade',
    premium: 'Premium', professional: 'Profissional', home: 'para casa',
    guide: 'Guia de Compra', best: 'Melhores', types: 'Tipos de',
    howToChoose: 'Como escolher', faq: 'Perguntas frequentes',
    nearbyAreas: 'Áreas próximas', alsoInterested: 'Também pode gostar',
    relatedProducts: 'Produtos relacionados', viewAll: 'Ver tudo',
    requestQuote: 'Solicitar orçamento', freeQuote: 'Orçamento grátis',
    updated: 'Atualizado', vatIncluded: 'IVA incluído',
    serviceArea: 'Área de serviço', deliveryTime: 'Prazo de entrega',
    businessDays: 'dias úteis', inStock: 'Em estoque', available: 'Disponível'
  },
  nl: {
    from: 'vanaf', to: 'tot', in: 'in', and: 'en', or: 'of',
    price: 'Prijs', prices: 'Prijzen', buy: 'Kopen', shop: 'Winkel',
    free: 'Gratis', shipping: 'Verzending', warranty: 'Garantie', quality: 'Kwaliteit',
    premium: 'Premium', professional: 'Professioneel', home: 'voor thuis',
    guide: 'Koopgids', best: 'Beste', types: 'Soorten',
    howToChoose: 'Hoe te kiezen', faq: 'Veelgestelde vragen',
    nearbyAreas: 'Nabije gebieden', alsoInterested: 'Misschien ook interessant',
    relatedProducts: 'Gerelateerde producten', viewAll: 'Alles bekijken',
    requestQuote: 'Offerte aanvragen', freeQuote: 'Gratis offerte',
    updated: 'Bijgewerkt', vatIncluded: 'BTW inbegrepen',
    serviceArea: 'Servicegebied', deliveryTime: 'Levertijd',
    businessDays: 'werkdagen', inStock: 'Op voorraad', available: 'Beschikbaar'
  },
  pl: {
    from: 'od', to: 'do', in: 'w', and: 'i', or: 'lub',
    price: 'Cena', prices: 'Ceny', buy: 'Kup', shop: 'Sklep',
    free: 'Bezpłatnie', shipping: 'Wysyłka', warranty: 'Gwarancja', quality: 'Jakość',
    premium: 'Premium', professional: 'Profesjonalny', home: 'do domu',
    guide: 'Poradnik zakupowy', best: 'Najlepsze', types: 'Rodzaje',
    howToChoose: 'Jak wybrać', faq: 'Często zadawane pytania',
    nearbyAreas: 'Pobliskie obszary', alsoInterested: 'Może Cię zainteresować',
    relatedProducts: 'Powiązane produkty', viewAll: 'Zobacz wszystko',
    requestQuote: 'Poproś o wycenę', freeQuote: 'Bezpłatna wycena',
    updated: 'Zaktualizowano', vatIncluded: 'VAT wliczony',
    serviceArea: 'Obszar usług', deliveryTime: 'Czas dostawy',
    businessDays: 'dni roboczych', inStock: 'W magazynie', available: 'Dostępny'
  }
};

// =============================================================================
// SCHEMA GENERATORS
// =============================================================================

export function generateProductSchema(data: SEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.product,
    "description": generateMetaDescription(data),
    "brand": {
      "@type": "Brand",
      "name": data.brand
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": data.priceMin,
      "highPrice": data.priceMax,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": data.brand
      }
    }
  };
}

export function generateLocalBusinessSchema(data: SEOData) {
  if (!data.city) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${data.brand} - ${data.city}`,
    "url": `https://${data.domain}/${data.locale}/${data.productSlug}${data.citySlug ? `-${data.citySlug}` : ''}/`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city,
      "addressRegion": data.region || '',
      "addressCountry": data.country || 'ES'
    },
    "areaServed": data.nearbyCities?.map(c => ({
      "@type": "City",
      "name": c.name
    })) || [],
    "priceRange": "€€"
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// =============================================================================
// CONTENT GENERATORS
// =============================================================================

export function generateTitle(data: SEOData): string {
  const t = TRANSLATIONS[data.locale];
  const year = new Date().getFullYear();
  
  const templates: Record<string, string> = {
    category: `${data.product} - ${t.guide} ${year} | ${data.brand}`,
    product_city: `${data.product} ${t.in} ${data.city} | ${t.from} ${data.priceMin}€`,
    subcategory: `${data.product} | ${t.shipping} ${t.free} - ${data.brand}`,
    informational: `${data.product}: ${t.prices} ${year} | ${data.brand}`,
    local: `${t.shop} ${data.product} ${data.city} | ${data.brand}`
  };
  
  const title = templates[data.pageType] || templates.category;
  return title.slice(0, 60);
}

export function generateMetaDescription(data: SEOData): string {
  const t = TRANSLATIONS[data.locale];
  const year = new Date().getFullYear();
  
  const templates: Record<string, string> = {
    category: `${data.product} ${t.premium}. ✓ ${t.shipping} ${t.free} ✓ ${t.warranty} ${data.warranty}. ${t.from} ${data.priceMin}€. ${t.guide} ${year}.`,
    product_city: `${t.buy} ${data.product} ${t.in} ${data.city}. ✓ ${t.shipping} ${t.free} ✓ ${t.warranty} ${data.warranty}. ${t.from} ${data.priceMin}€`,
    subcategory: `${data.product} ${t.professional} ${t.and} ${t.home}. ✓ ${t.quality} ${t.premium} ✓ ${t.warranty} ${data.warranty}. ${t.from} ${data.priceMin}€`,
    informational: `${data.product}: ${t.types}, ${t.prices} ${t.and} ${t.guide}. ✓ ${t.updated} ${year}. ${t.from} ${data.priceMin}€ ${t.to} ${data.priceMax}€`,
    local: `${data.product} ${t.in} ${data.city}. ✓ ${t.freeQuote} ✓ ${t.warranty} ${data.warranty}. ${t.from} ${data.priceMin}€`
  };
  
  const desc = templates[data.pageType] || templates.category;
  return desc.slice(0, 155);
}

export function generateH1(data: SEOData): string {
  const t = TRANSLATIONS[data.locale];
  const year = new Date().getFullYear();
  
  const templates: Record<string, string> = {
    category: `${data.product}: ${t.guide} ${year}`,
    product_city: `${data.product} ${t.in} ${data.city}`,
    subcategory: `${data.product} ${t.professional}`,
    informational: `${data.product}: ${t.prices} ${year}`,
    local: `${data.product} ${t.in} ${data.city}`
  };
  
  return templates[data.pageType] || templates.category;
}

export function generateIntro(data: SEOData): string {
  const t = TRANSLATIONS[data.locale];
  const year = new Date().getFullYear();
  
  const intros: Record<Locale, Record<string, string>> = {
    es: {
      category: `Descubre nuestra selección de ${data.product.toLowerCase()} de alta calidad. Precios desde ${data.priceMin}€ hasta ${data.priceMax}€. Envío gratis y garantía ${data.warranty} en todos los modelos.`,
      product_city: `¿Buscas ${data.product.toLowerCase()} en ${data.city}? Ofrecemos los mejores modelos con envío gratis a ${data.city} y alrededores. Precios desde ${data.priceMin}€. Garantía ${data.warranty}.`,
      local: `Especialistas en ${data.product.toLowerCase()} en ${data.city} y toda la provincia. Servicio profesional, presupuesto sin compromiso. Precios desde ${data.priceMin}€.`
    },
    en: {
      category: `Discover our selection of high-quality ${data.product.toLowerCase()}. Prices from €${data.priceMin} to €${data.priceMax}. Free shipping and ${data.warranty} warranty on all models.`,
      product_city: `Looking for ${data.product.toLowerCase()} in ${data.city}? We offer the best models with free shipping to ${data.city} and surroundings. Prices from €${data.priceMin}. ${data.warranty} warranty.`,
      local: `${data.product} specialists in ${data.city} and the entire region. Professional service, free quote. Prices from €${data.priceMin}.`
    },
    de: {
      category: `Entdecken Sie unsere Auswahl an hochwertigen ${data.product}. Preise von ${data.priceMin}€ bis ${data.priceMax}€. Kostenloser Versand und ${data.warranty} Garantie.`,
      product_city: `Suchen Sie ${data.product} in ${data.city}? Wir bieten die besten Modelle mit kostenlosem Versand nach ${data.city}. Preise ab ${data.priceMin}€. ${data.warranty} Garantie.`,
      local: `${data.product}-Spezialisten in ${data.city} und Umgebung. Professioneller Service, kostenloses Angebot. Preise ab ${data.priceMin}€.`
    },
    fr: {
      category: `Découvrez notre sélection de ${data.product.toLowerCase()} de haute qualité. Prix de ${data.priceMin}€ à ${data.priceMax}€. Livraison gratuite et garantie ${data.warranty}.`,
      product_city: `Vous cherchez ${data.product.toLowerCase()} à ${data.city}? Nous offrons les meilleurs modèles avec livraison gratuite à ${data.city}. Prix dès ${data.priceMin}€. Garantie ${data.warranty}.`,
      local: `Spécialistes ${data.product.toLowerCase()} à ${data.city} et dans toute la région. Service professionnel, devis gratuit. Prix dès ${data.priceMin}€.`
    },
    it: {
      category: `Scopri la nostra selezione di ${data.product.toLowerCase()} di alta qualità. Prezzi da ${data.priceMin}€ a ${data.priceMax}€. Spedizione gratuita e garanzia ${data.warranty}.`,
      product_city: `Cerchi ${data.product.toLowerCase()} a ${data.city}? Offriamo i migliori modelli con spedizione gratuita a ${data.city}. Prezzi da ${data.priceMin}€. Garanzia ${data.warranty}.`,
      local: `Specialisti ${data.product.toLowerCase()} a ${data.city} e in tutta la regione. Servizio professionale, preventivo gratuito. Prezzi da ${data.priceMin}€.`
    },
    pt: {
      category: `Descubra nossa seleção de ${data.product.toLowerCase()} de alta qualidade. Preços de ${data.priceMin}€ a ${data.priceMax}€. Envio grátis e garantia ${data.warranty}.`,
      product_city: `Procura ${data.product.toLowerCase()} em ${data.city}? Oferecemos os melhores modelos com envio grátis para ${data.city}. Preços desde ${data.priceMin}€. Garantia ${data.warranty}.`,
      local: `Especialistas em ${data.product.toLowerCase()} em ${data.city} e região. Serviço profissional, orçamento grátis. Preços desde ${data.priceMin}€.`
    },
    nl: {
      category: `Ontdek onze selectie van hoogwaardige ${data.product.toLowerCase()}. Prijzen van €${data.priceMin} tot €${data.priceMax}. Gratis verzending en ${data.warranty} garantie.`,
      product_city: `Op zoek naar ${data.product.toLowerCase()} in ${data.city}? Wij bieden de beste modellen met gratis verzending naar ${data.city}. Prijzen vanaf €${data.priceMin}. ${data.warranty} garantie.`,
      local: `${data.product} specialisten in ${data.city} en omgeving. Professionele service, gratis offerte. Prijzen vanaf €${data.priceMin}.`
    },
    pl: {
      category: `Odkryj nasz wybór wysokiej jakości ${data.product.toLowerCase()}. Ceny od ${data.priceMin}€ do ${data.priceMax}€. Darmowa wysyłka i gwarancja ${data.warranty}.`,
      product_city: `Szukasz ${data.product.toLowerCase()} w ${data.city}? Oferujemy najlepsze modele z darmową wysyłką do ${data.city}. Ceny od ${data.priceMin}€. Gwarancja ${data.warranty}.`,
      local: `Specjaliści ${data.product.toLowerCase()} w ${data.city} i okolicach. Profesjonalna obsługa, bezpłatna wycena. Ceny od ${data.priceMin}€.`
    }
  };
  
  return intros[data.locale]?.[data.pageType] || intros[data.locale]?.category || intros.es.category;
}

export function generateFAQs(data: SEOData): { question: string; answer: string }[] {
  const t = TRANSLATIONS[data.locale];
  
  const faqTemplates: Record<Locale, { question: string; answer: string }[]> = {
    es: [
      { question: `¿Cuánto cuesta ${data.product.toLowerCase()}${data.city ? ` en ${data.city}` : ''}?`, answer: `El precio de ${data.product.toLowerCase()} varía entre ${data.priceMin}€ y ${data.priceMax}€ dependiendo del modelo y características. Todos incluyen garantía ${data.warranty}.` },
      { question: `¿El envío es gratis${data.city ? ` a ${data.city}` : ''}?`, answer: `Sí, ofrecemos envío gratuito${data.city ? ` a ${data.city} y alrededores` : ' a toda España'}. Tiempo de entrega: 3-5 días laborables.` },
      { question: `¿Qué garantía tienen los ${data.product.toLowerCase()}?`, answer: `Todos nuestros ${data.product.toLowerCase()} incluyen garantía de ${data.warranty}. Servicio técnico disponible.` },
      { question: `¿Cómo puedo pedir presupuesto?`, answer: `Puedes solicitar presupuesto gratis a través de nuestra web o contactando con nosotros. Respondemos en menos de 24 horas.` },
      { question: `¿Hacen entregas${data.city ? ` en ${data.city}` : ''}?`, answer: `Sí, realizamos entregas${data.city ? ` en ${data.city} y toda la provincia` : ' en toda España'}. Envío rápido y seguro.` }
    ],
    en: [
      { question: `How much does ${data.product.toLowerCase()} cost${data.city ? ` in ${data.city}` : ''}?`, answer: `${data.product} prices range from €${data.priceMin} to €${data.priceMax} depending on model and features. All include ${data.warranty} warranty.` },
      { question: `Is shipping free${data.city ? ` to ${data.city}` : ''}?`, answer: `Yes, we offer free shipping${data.city ? ` to ${data.city} and surrounding areas` : ''}. Delivery time: 3-5 business days.` },
      { question: `What warranty do ${data.product.toLowerCase()} have?`, answer: `All our ${data.product.toLowerCase()} include ${data.warranty} warranty. Technical service available.` },
      { question: `How can I request a quote?`, answer: `You can request a free quote through our website or by contacting us. We respond within 24 hours.` },
      { question: `Do you deliver${data.city ? ` to ${data.city}` : ''}?`, answer: `Yes, we deliver${data.city ? ` to ${data.city} and the entire region` : ' nationwide'}. Fast and secure shipping.` }
    ],
    de: [
      { question: `Was kostet ${data.product}${data.city ? ` in ${data.city}` : ''}?`, answer: `Die Preise für ${data.product} liegen zwischen ${data.priceMin}€ und ${data.priceMax}€. Alle mit ${data.warranty} Garantie.` },
      { question: `Ist der Versand${data.city ? ` nach ${data.city}` : ''} kostenlos?`, answer: `Ja, wir bieten kostenlosen Versand${data.city ? ` nach ${data.city} und Umgebung` : ''}. Lieferzeit: 3-5 Werktage.` },
      { question: `Welche Garantie haben die ${data.product}?`, answer: `Alle unsere ${data.product} haben ${data.warranty} Garantie. Technischer Service verfügbar.` },
      { question: `Wie kann ich ein Angebot anfordern?`, answer: `Sie können ein kostenloses Angebot über unsere Website anfordern. Wir antworten innerhalb von 24 Stunden.` },
      { question: `Liefern Sie${data.city ? ` nach ${data.city}` : ''}?`, answer: `Ja, wir liefern${data.city ? ` nach ${data.city} und die gesamte Region` : ' deutschlandweit'}. Schneller und sicherer Versand.` }
    ],
    fr: [
      { question: `Combien coûte ${data.product.toLowerCase()}${data.city ? ` à ${data.city}` : ''} ?`, answer: `Les prix de ${data.product.toLowerCase()} varient de ${data.priceMin}€ à ${data.priceMax}€. Tous avec garantie ${data.warranty}.` },
      { question: `La livraison est-elle gratuite${data.city ? ` à ${data.city}` : ''} ?`, answer: `Oui, nous offrons la livraison gratuite${data.city ? ` à ${data.city} et environs` : ''}. Délai: 3-5 jours ouvrables.` },
      { question: `Quelle garantie ont les ${data.product.toLowerCase()} ?`, answer: `Tous nos ${data.product.toLowerCase()} incluent une garantie de ${data.warranty}. Service technique disponible.` },
      { question: `Comment demander un devis ?`, answer: `Vous pouvez demander un devis gratuit via notre site. Nous répondons sous 24 heures.` },
      { question: `Livrez-vous${data.city ? ` à ${data.city}` : ''} ?`, answer: `Oui, nous livrons${data.city ? ` à ${data.city} et toute la région` : ' dans toute la France'}. Livraison rapide et sécurisée.` }
    ],
    it: [
      { question: `Quanto costa ${data.product.toLowerCase()}${data.city ? ` a ${data.city}` : ''}?`, answer: `I prezzi di ${data.product.toLowerCase()} variano da ${data.priceMin}€ a ${data.priceMax}€. Tutti con garanzia ${data.warranty}.` },
      { question: `La spedizione è gratuita${data.city ? ` a ${data.city}` : ''}?`, answer: `Sì, offriamo spedizione gratuita${data.city ? ` a ${data.city} e dintorni` : ''}. Tempi: 3-5 giorni lavorativi.` },
      { question: `Che garanzia hanno i ${data.product.toLowerCase()}?`, answer: `Tutti i nostri ${data.product.toLowerCase()} includono garanzia ${data.warranty}. Servizio tecnico disponibile.` },
      { question: `Come posso richiedere un preventivo?`, answer: `Puoi richiedere un preventivo gratuito tramite il nostro sito. Rispondiamo entro 24 ore.` },
      { question: `Consegnate${data.city ? ` a ${data.city}` : ''}?`, answer: `Sì, consegniamo${data.city ? ` a ${data.city} e in tutta la regione` : ' in tutta Italia'}. Spedizione rapida e sicura.` }
    ],
    pt: [
      { question: `Quanto custa ${data.product.toLowerCase()}${data.city ? ` em ${data.city}` : ''}?`, answer: `Os preços de ${data.product.toLowerCase()} variam de ${data.priceMin}€ a ${data.priceMax}€. Todos com garantia ${data.warranty}.` },
      { question: `O envio é grátis${data.city ? ` para ${data.city}` : ''}?`, answer: `Sim, oferecemos envio grátis${data.city ? ` para ${data.city} e arredores` : ''}. Prazo: 3-5 dias úteis.` },
      { question: `Que garantia têm os ${data.product.toLowerCase()}?`, answer: `Todos os nossos ${data.product.toLowerCase()} incluem garantia de ${data.warranty}. Serviço técnico disponível.` },
      { question: `Como posso pedir orçamento?`, answer: `Pode solicitar orçamento grátis através do nosso site. Respondemos em 24 horas.` },
      { question: `Entregam${data.city ? ` em ${data.city}` : ''}?`, answer: `Sim, entregamos${data.city ? ` em ${data.city} e toda a região` : ' em todo Portugal'}. Envio rápido e seguro.` }
    ],
    nl: [
      { question: `Hoeveel kost ${data.product.toLowerCase()}${data.city ? ` in ${data.city}` : ''}?`, answer: `De prijzen van ${data.product.toLowerCase()} variëren van €${data.priceMin} tot €${data.priceMax}. Allemaal met ${data.warranty} garantie.` },
      { question: `Is de verzending gratis${data.city ? ` naar ${data.city}` : ''}?`, answer: `Ja, wij bieden gratis verzending${data.city ? ` naar ${data.city} en omgeving` : ''}. Levertijd: 3-5 werkdagen.` },
      { question: `Welke garantie hebben de ${data.product.toLowerCase()}?`, answer: `Al onze ${data.product.toLowerCase()} hebben ${data.warranty} garantie. Technische service beschikbaar.` },
      { question: `Hoe kan ik een offerte aanvragen?`, answer: `U kunt een gratis offerte aanvragen via onze website. Wij reageren binnen 24 uur.` },
      { question: `Leveren jullie${data.city ? ` in ${data.city}` : ''}?`, answer: `Ja, wij leveren${data.city ? ` in ${data.city} en de hele regio` : ' in heel Nederland'}. Snelle en veilige verzending.` }
    ],
    pl: [
      { question: `Ile kosztuje ${data.product.toLowerCase()}${data.city ? ` w ${data.city}` : ''}?`, answer: `Ceny ${data.product.toLowerCase()} wahają się od ${data.priceMin}€ do ${data.priceMax}€. Wszystkie z gwarancją ${data.warranty}.` },
      { question: `Czy wysyłka jest bezpłatna${data.city ? ` do ${data.city}` : ''}?`, answer: `Tak, oferujemy bezpłatną wysyłkę${data.city ? ` do ${data.city} i okolic` : ''}. Czas dostawy: 3-5 dni roboczych.` },
      { question: `Jaką gwarancję mają ${data.product.toLowerCase()}?`, answer: `Wszystkie nasze ${data.product.toLowerCase()} mają gwarancję ${data.warranty}. Serwis techniczny dostępny.` },
      { question: `Jak mogę poprosić o wycenę?`, answer: `Możesz poprosić o bezpłatną wycenę przez naszą stronę. Odpowiadamy w ciągu 24 godzin.` },
      { question: `Czy dostarczacie${data.city ? ` do ${data.city}` : ''}?`, answer: `Tak, dostarczamy${data.city ? ` do ${data.city} i całego regionu` : ' w całej Polsce'}. Szybka i bezpieczna wysyłka.` }
    ]
  };
  
  return faqTemplates[data.locale] || faqTemplates.es;
}

// =============================================================================
// SEO HEAD COMPONENT
// =============================================================================

interface SEOHeadProps {
  data: SEOData;
}

export function SEOHead({ data }: SEOHeadProps) {
  const title = generateTitle(data);
  const description = generateMetaDescription(data);
  const faqs = generateFAQs(data);
  const canonicalUrl = `https://${data.domain}/${data.locale}/${data.productSlug}${data.citySlug ? `-${data.citySlug}` : ''}/`;
  
  const productSchema = generateProductSchema(data);
  const localSchema = generateLocalBusinessSchema(data);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `https://${data.domain}/` },
    { name: data.product, url: `https://${data.domain}/${data.locale}/${data.productSlug}/` },
    ...(data.city ? [{ name: data.city, url: canonicalUrl }] : [])
  ]);

  return (
    <>
      <Script
        id="schema-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {localSchema && (
        <Script
          id="schema-local"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
        />
      )}
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// =============================================================================
// FAQ SECTION COMPONENT
// =============================================================================

interface FAQSectionProps {
  data: SEOData;
}

export function FAQSection({ data }: FAQSectionProps) {
  const t = TRANSLATIONS[data.locale];
  const faqs = generateFAQs(data);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-8 text-center">
          {t.faq}: {data.product}{data.city ? ` ${t.in} ${data.city}` : ''}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="group bg-white rounded-xl border border-neutral-200 overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
                itemProp="name"
              >
                <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
                <span className="text-neutral-400 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div 
                className="px-6 pb-6 text-neutral-600"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// NEARBY CITIES COMPONENT
// =============================================================================

interface NearbyCitiesProps {
  data: SEOData;
}

export function NearbyCities({ data }: NearbyCitiesProps) {
  const t = TRANSLATIONS[data.locale];
  
  if (!data.nearbyCities || data.nearbyCities.length === 0) return null;

  return (
    <section className="py-12 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-medium text-neutral-900 mb-6">
          {t.nearbyAreas}
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {data.nearbyCities.map((city) => (
            <a
              key={city.slug}
              href={`/${data.locale}/${data.productSlug}-${city.slug}/`}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-sm text-neutral-700 transition-colors"
            >
              {data.product} {t.in} {city.name}
              {city.distance && <span className="text-neutral-400 ml-1">({city.distance} km)</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// BREADCRUMBS COMPONENT
// =============================================================================

interface BreadcrumbsProps {
  items: { name: string; url?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            {item.url ? (
              <a href={item.url} className="hover:text-neutral-900 transition-colors">
                {item.name}
              </a>
            ) : (
              <span className="text-neutral-900">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// =============================================================================
// PRICE TABLE COMPONENT
// =============================================================================

interface PriceTableProps {
  data: SEOData;
  products: { name: string; priceMin: number; priceMax: number; features?: string }[];
}

export function PriceTable({ data, products }: PriceTableProps) {
  const t = TRANSLATIONS[data.locale];
  const year = new Date().getFullYear();

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-light text-neutral-900 mb-6">
          {t.prices} {data.product}{data.city ? ` ${t.in} ${data.city}` : ''} {year}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-4 px-4 font-medium text-neutral-900">Modelo</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-900">{t.price} {t.from}</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-900">{t.price} {t.to}</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-900">{t.shipping}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4 text-neutral-700">{product.name}</td>
                  <td className="py-4 px-4 text-neutral-900 font-medium">{product.priceMin}€</td>
                  <td className="py-4 px-4 text-neutral-900 font-medium">{product.priceMax}€</td>
                  <td className="py-4 px-4 text-green-600">{t.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-neutral-400 mt-4">
          {t.updated} {new Date().toLocaleDateString(data.locale)}. {t.vatIncluded}.
        </p>
      </div>
    </section>
  );
}

export { TRANSLATIONS };
export type { SEOData };
