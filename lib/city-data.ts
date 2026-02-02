// City data for dynamic SEO pages - WORLDWIDE
import citiesData from './cities-processed.json';

export type Locale = 'es' | 'en' | 'de' | 'fr' | 'it' | 'pt' | 'nl' | 'pl' | 'cs' | 'el';

export interface CityData {
  name: string;
  slug: string;
  population: number;
  country?: string;
}

// All cities from all countries
const allCitiesData = citiesData as Record<string, CityData[]>;

// Get all cities worldwide with country info
export function getAllCities(): CityData[] {
  const cities: CityData[] = [];
  for (const [country, countryCities] of Object.entries(allCitiesData)) {
    for (const city of countryCities) {
      cities.push({ ...city, country });
    }
  }
  return cities;
}

// Get top cities by population for pre-rendering
export function getTopCities(limit: number = 100): CityData[] {
  return getAllCities()
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

// Get city by slug (searches all countries)
export function getCityBySlug(slug: string): CityData | undefined {
  for (const [country, cities] of Object.entries(allCitiesData)) {
    const city = cities.find(c => c.slug === slug);
    if (city) return { ...city, country };
  }
  return undefined;
}

// Get all city slugs for static params
export function getAllCitySlugs(): string[] {
  return getAllCities().map(city => city.slug);
}

// Product categories with translations
export const PRODUCT_CATEGORIES = [
  { 
    slug: 'saunas-finlandesas', 
    translations: {
      es: 'Saunas Finlandesas', en: 'Finnish Saunas', de: 'Finnische Saunas', 
      fr: 'Saunas Finlandais', it: 'Saune Finlandesi', pt: 'Saunas Finlandesas',
      nl: 'Finse Sauna\'s', pl: 'Sauny Fińskie', cs: 'Finské Sauny', el: 'Φινλανδικές Σάουνες'
    },
    keywords: ['sauna finlandesa', 'sauna casa', 'sauna madera', 'finnish sauna', 'home sauna'],
    priceRange: '€2,500 - €12,000',
  },
  { 
    slug: 'jacuzzis-exterior', 
    translations: {
      es: 'Jacuzzis Exterior', en: 'Outdoor Hot Tubs', de: 'Außen-Whirlpools',
      fr: 'Jacuzzis Extérieur', it: 'Vasche Esterne', pt: 'Jacuzzis Exterior',
      nl: 'Buiten Jacuzzi\'s', pl: 'Jacuzzi Zewnętrzne', cs: 'Venkovní Vířivky', el: 'Εξωτερικά Τζακούζι'
    },
    keywords: ['jacuzzi exterior', 'hot tub', 'outdoor spa', 'garden jacuzzi'],
    priceRange: '€3,000 - €15,000',
  },
  { 
    slug: 'baneras-hidromasaje', 
    translations: {
      es: 'Bañeras Hidromasaje', en: 'Whirlpool Baths', de: 'Whirlpool-Badewannen',
      fr: 'Baignoires Balnéo', it: 'Vasche Idromassaggio', pt: 'Banheiras Hidromassagem',
      nl: 'Whirlpool Baden', pl: 'Wanny Hydromasażowe', cs: 'Vířivé Vany', el: 'Μπανιέρες Υδρομασάζ'
    },
    keywords: ['whirlpool bath', 'jacuzzi bath', 'massage tub'],
    priceRange: '€1,500 - €8,000',
  },
  { 
    slug: 'cabinas-infrarrojos', 
    translations: {
      es: 'Cabinas Infrarrojos', en: 'Infrared Cabins', de: 'Infrarotkabinen',
      fr: 'Cabines Infrarouges', it: 'Cabine Infrarossi', pt: 'Cabines Infravermelhos',
      nl: 'Infrarood Cabines', pl: 'Kabiny Podczerwone', cs: 'Infrakabiny', el: 'Καμπίνες Υπερύθρων'
    },
    keywords: ['infrared cabin', 'infrared sauna', 'therapy cabin'],
    priceRange: '€1,200 - €5,000',
  },
  { 
    slug: 'spas-hinchables', 
    translations: {
      es: 'Spas Hinchables', en: 'Inflatable Spas', de: 'Aufblasbare Spas',
      fr: 'Spas Gonflables', it: 'Spa Gonfiabili', pt: 'Spas Insufláveis',
      nl: 'Opblaasbare Spa\'s', pl: 'Spa Dmuchane', cs: 'Nafukovací Spa', el: 'Φουσκωτά Σπα'
    },
    keywords: ['inflatable spa', 'portable hot tub', 'blow up jacuzzi'],
    priceRange: '€400 - €1,500',
  },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Get category by slug
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find(cat => cat.slug === slug);
}

// Generate SEO description for city + category by locale
export function generateCityDescription(city: CityData, category: ProductCategory, locale: Locale): string {
  const catName = category.translations[locale] || category.translations.en;
  
  const templates: Record<Locale, string[]> = {
    es: [
      `¿Buscas ${catName.toLowerCase()} en ${city.name}? Especialistas en instalación. Presupuesto sin compromiso.`,
      `${catName} en ${city.name} al mejor precio. Instalación profesional, garantía 5 años.`,
    ],
    en: [
      `Looking for ${catName.toLowerCase()} in ${city.name}? Installation specialists. Free quote.`,
      `${catName} in ${city.name} at the best price. Professional installation, 5 year warranty.`,
    ],
    de: [
      `${catName} in ${city.name} gesucht? Installationsspezialisten. Kostenloses Angebot.`,
      `${catName} in ${city.name} zum besten Preis. Professionelle Installation, 5 Jahre Garantie.`,
    ],
    fr: [
      `Vous cherchez ${catName.toLowerCase()} à ${city.name}? Spécialistes de l'installation. Devis gratuit.`,
      `${catName} à ${city.name} au meilleur prix. Installation professionnelle, garantie 5 ans.`,
    ],
    it: [
      `Cerchi ${catName.toLowerCase()} a ${city.name}? Specialisti dell'installazione. Preventivo gratuito.`,
      `${catName} a ${city.name} al miglior prezzo. Installazione professionale, garanzia 5 anni.`,
    ],
    pt: [
      `Procura ${catName.toLowerCase()} em ${city.name}? Especialistas em instalação. Orçamento grátis.`,
      `${catName} em ${city.name} ao melhor preço. Instalação profissional, garantia 5 anos.`,
    ],
    nl: [
      `Op zoek naar ${catName.toLowerCase()} in ${city.name}? Installatie specialisten. Gratis offerte.`,
      `${catName} in ${city.name} voor de beste prijs. Professionele installatie, 5 jaar garantie.`,
    ],
    pl: [
      `Szukasz ${catName.toLowerCase()} w ${city.name}? Specjaliści instalacji. Bezpłatna wycena.`,
      `${catName} w ${city.name} w najlepszej cenie. Profesjonalna instalacja, 5 lat gwarancji.`,
    ],
    cs: [
      `Hledáte ${catName.toLowerCase()} v ${city.name}? Specialisté na instalaci. Bezplatná nabídka.`,
      `${catName} v ${city.name} za nejlepší cenu. Profesionální instalace, 5 let záruka.`,
    ],
    el: [
      `Ψάχνετε ${catName.toLowerCase()} στην ${city.name}; Ειδικοί εγκατάστασης. Δωρεάν προσφορά.`,
      `${catName} στην ${city.name} στην καλύτερη τιμή. Επαγγελματική εγκατάσταση, 5 χρόνια εγγύηση.`,
    ],
  };
  
  const localeTemplates = templates[locale] || templates.en;
  return localeTemplates[city.name.length % localeTemplates.length];
}

// Generate dynamic stats for city
export function getCityStats(city: CityData): {
  instalaciones: number;
  tiempoEntrega: string;
  satisfaccion: number;
} {
  const seed = city.population % 100;
  return {
    instalaciones: 50 + (seed * 3),
    tiempoEntrega: `${3 + (seed % 5)} - ${7 + (seed % 5)}`,
    satisfaccion: 4.7 + ((seed % 3) * 0.1),
  };
}

// Generate reviews for city
export function generateCityReviews(city: CityData, category: ProductCategory, locale: Locale) {
  const catName = category.translations[locale] || category.translations.en;
  
  const namesByLocale: Record<Locale, string[]> = {
    es: ["María García", "Carlos Pérez", "Ana Martínez", "José López", "Laura Sánchez"],
    en: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "James Wilson"],
    de: ["Thomas Müller", "Anna Schmidt", "Michael Weber", "Julia Fischer", "Stefan Wagner"],
    fr: ["Jean Dupont", "Marie Martin", "Pierre Bernard", "Sophie Dubois", "Lucas Moreau"],
    it: ["Marco Rossi", "Giulia Bianchi", "Luca Ferrari", "Francesca Romano", "Alessandro Colombo"],
    pt: ["João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira", "Carlos Ferreira"],
    nl: ["Jan de Vries", "Anna Jansen", "Pieter Bakker", "Sophie Visser", "Thomas Smit"],
    pl: ["Jan Kowalski", "Anna Nowak", "Piotr Wiśniewski", "Maria Wójcik", "Tomasz Kamiński"],
    cs: ["Jan Novák", "Marie Svobodová", "Petr Dvořák", "Jana Černá", "Tomáš Procházka"],
    el: ["Γιώργος Παπαδόπουλος", "Μαρία Νικολάου", "Κώστας Αντωνίου", "Ελένη Γεωργίου", "Νίκος Δημητρίου"],
  };
  
  const names = namesByLocale[locale] || namesByLocale.en;
  const seed = city.population % 10;
  
  const reviewTemplates: Record<Locale, (name: string) => string> = {
    es: () => `Excelente servicio en ${city.name}. Muy contentos con nuestra ${catName.toLowerCase()}.`,
    en: () => `Excellent service in ${city.name}. Very happy with our ${catName.toLowerCase()}.`,
    de: () => `Ausgezeichneter Service in ${city.name}. Sehr zufrieden mit unserer ${catName}.`,
    fr: () => `Excellent service à ${city.name}. Très satisfaits de notre ${catName.toLowerCase()}.`,
    it: () => `Servizio eccellente a ${city.name}. Molto soddisfatti della nostra ${catName.toLowerCase()}.`,
    pt: () => `Excelente serviço em ${city.name}. Muito satisfeitos com a nossa ${catName.toLowerCase()}.`,
    nl: () => `Uitstekende service in ${city.name}. Zeer tevreden met onze ${catName.toLowerCase()}.`,
    pl: () => `Doskonała obsługa w ${city.name}. Bardzo zadowoleni z naszej ${catName.toLowerCase()}.`,
    cs: () => `Vynikající služby v ${city.name}. Velmi spokojeni s naší ${catName.toLowerCase()}.`,
    el: () => `Εξαιρετική εξυπηρέτηση στην ${city.name}. Πολύ ευχαριστημένοι με την ${catName.toLowerCase()}.`,
  };
  
  const template = reviewTemplates[locale] || reviewTemplates.en;
  
  return [
    { name: names[seed % names.length], location: city.name, rating: 5 as const, text: template(names[seed % names.length]), verified: true },
    { name: names[(seed + 1) % names.length], location: city.name, rating: 5 as const, text: template(names[(seed + 1) % names.length]), verified: true },
    { name: names[(seed + 2) % names.length], location: city.name, rating: 5 as const, text: template(names[(seed + 2) % names.length]), verified: true },
  ];
}
