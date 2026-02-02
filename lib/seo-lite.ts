// SAUNAS Y SPAS - LIGHTWEIGHT SEO SYSTEM
// No heavy data loading, no memory issues, always works

export const LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'cs', 'el'] as const;
export type Locale = typeof LOCALES[number];

type Trans = {
  products: string;
  in: string;
  shipping: string;
  warranty: string;
  support: string;
  home: string;
  contact: string;
  viewAll: string;
  shop: string;
  description: string;
  qualityDesc: string;
  deliveryDesc: string;
  supportDesc: string;
};

// Complete translations for Saunas & Spas
export const T: Record<Locale, Trans> = {
  es: { products: 'SaunaSpa.io Premium', in: 'en', shipping: 'Envío e Instalación', warranty: 'Garantía 5 Años', support: 'Asesoría Experta', home: 'Inicio', contact: 'Contacto', viewAll: 'Ver Todo', shop: 'Catálogo', description: 'Saunas finlandesas, jacuzzis y spas de la más alta calidad. Instalación profesional incluida.', qualityDesc: 'Materiales de primera calidad', deliveryDesc: 'Entrega e instalación profesional', supportDesc: 'Equipo de expertos disponible' },
  en: { products: 'Premium Saunas & Spas', in: 'in', shipping: 'Delivery & Installation', warranty: '5 Year Warranty', support: 'Expert Guidance', home: 'Home', contact: 'Contact', viewAll: 'View All', shop: 'Catalog', description: 'Finnish saunas, hot tubs and spas of the highest quality. Professional installation included.', qualityDesc: 'First-class materials', deliveryDesc: 'Professional delivery and installation', supportDesc: 'Expert team available' },
  de: { products: 'Premium Saunas & Spas', in: 'in', shipping: 'Lieferung & Montage', warranty: '5 Jahre Garantie', support: 'Expertenberatung', home: 'Startseite', contact: 'Kontakt', viewAll: 'Alle Anzeigen', shop: 'Katalog', description: 'Finnische Saunas, Whirlpools und Spas höchster Qualität. Professionelle Installation inklusive.', qualityDesc: 'Erstklassige Materialien', deliveryDesc: 'Professionelle Lieferung und Montage', supportDesc: 'Expertenteam verfügbar' },
  fr: { products: 'Saunas & Spas Premium', in: 'à', shipping: 'Livraison & Installation', warranty: 'Garantie 5 Ans', support: 'Conseil Expert', home: 'Accueil', contact: 'Contact', viewAll: 'Voir Tout', shop: 'Catalogue', description: 'Saunas finlandais, jacuzzis et spas de la plus haute qualité. Installation professionnelle incluse.', qualityDesc: 'Matériaux de première qualité', deliveryDesc: 'Livraison et installation professionnelles', supportDesc: 'Équipe d\'experts disponible' },
  it: { products: 'Saune & Spa Premium', in: 'a', shipping: 'Consegna & Installazione', warranty: 'Garanzia 5 Anni', support: 'Consulenza Esperta', home: 'Home', contact: 'Contatto', viewAll: 'Vedi Tutto', shop: 'Catalogo', description: 'Saune finlandesi, vasche idromassaggio e spa della massima qualità. Installazione professionale inclusa.', qualityDesc: 'Materiali di prima qualità', deliveryDesc: 'Consegna e installazione professionale', supportDesc: 'Team di esperti disponibile' },
  pt: { products: 'Saunas & Spas Premium', in: 'em', shipping: 'Entrega & Instalação', warranty: 'Garantia 5 Anos', support: 'Orientação Especializada', home: 'Início', contact: 'Contato', viewAll: 'Ver Tudo', shop: 'Catálogo', description: 'Saunas finlandesas, jacuzzis e spas da mais alta qualidade. Instalação profissional incluída.', qualityDesc: 'Materiais de primeira qualidade', deliveryDesc: 'Entrega e instalação profissional', supportDesc: 'Equipe de especialistas disponível' },
  nl: { products: 'Premium Sauna\'s & Spa\'s', in: 'in', shipping: 'Levering & Installatie', warranty: '5 Jaar Garantie', support: 'Expert Advies', home: 'Home', contact: 'Contact', viewAll: 'Bekijk Alles', shop: 'Catalogus', description: 'Finse sauna\'s, jacuzzi\'s en spa\'s van de hoogste kwaliteit. Professionele installatie inbegrepen.', qualityDesc: 'Eersteklas materialen', deliveryDesc: 'Professionele levering en installatie', supportDesc: 'Expertteam beschikbaar' },
  pl: { products: 'Sauny & Spa Premium', in: 'w', shipping: 'Dostawa & Montaż', warranty: 'Gwarancja 5 Lat', support: 'Porada Eksperta', home: 'Strona główna', contact: 'Kontakt', viewAll: 'Zobacz Wszystko', shop: 'Katalog', description: 'Sauny fińskie, jacuzzi i spa najwyższej jakości. Profesjonalna instalacja w cenie.', qualityDesc: 'Materiały najwyższej jakości', deliveryDesc: 'Profesjonalna dostawa i montaż', supportDesc: 'Zespół ekspertów dostępny' },
  cs: { products: 'Premium Sauny & Spa', in: 'v', shipping: 'Dodání & Instalace', warranty: 'Záruka 5 Let', support: 'Odborné Poradenství', home: 'Domů', contact: 'Kontakt', viewAll: 'Zobrazit Vše', shop: 'Katalog', description: 'Finské sauny, vířivky a spa nejvyšší kvality. Profesionální instalace v ceně.', qualityDesc: 'Prvotřídní materiály', deliveryDesc: 'Profesionální dodání a instalace', supportDesc: 'Tým odborníků k dispozici' },
  el: { products: 'Premium Σάουνες & Σπα', in: 'σε', shipping: 'Παράδοση & Εγκατάσταση', warranty: 'Εγγύηση 5 Ετών', support: 'Ειδική Καθοδήγηση', home: 'Αρχική', contact: 'Επικοινωνία', viewAll: 'Δείτε Όλα', shop: 'Κατάλογος', description: 'Φινλανδικές σάουνες, τζακούζι και σπα υψηλότερης ποιότητας. Επαγγελματική εγκατάσταση περιλαμβάνεται.', qualityDesc: 'Υλικά πρώτης ποιότητας', deliveryDesc: 'Επαγγελματική παράδοση και εγκατάσταση', supportDesc: 'Ομάδα ειδικών διαθέσιμη' },
};

// Format ANY slug to readable title - NEVER fails, ZERO memory
export function formatSlugToTitle(slug: string): string {
  if (!slug) return '';
  // Decode URL-encoded characters (e.g., %C3%A4 -> ä)
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // If decode fails, use original
  }
  return decoded
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get locale safely - defaults to 'en'
export function getLocale(locale: string): Locale {
  return LOCALES.includes(locale as Locale) ? locale as Locale : 'en';
}

// Get translations safely
export function getT(locale: string) {
  return T[getLocale(locale)] || T.en;
}
