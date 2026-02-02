import { type Locale, getLocale, getT } from "@/lib/seo-lite";
import { getProducts } from "@/lib/shopify";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { ProductGrid } from "@/components/store/product-grid";
import { Search } from "lucide-react";
import Link from "next/link";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const { q: query } = await searchParams;
  const validLocale = getLocale(locale) as Locale;
  const t = getT(validLocale);

  // Get all products and filter by search query
  const allProducts = await getProducts({ first: 100, locale: validLocale });
  
  const searchResults = query
    ? allProducts.filter((product) => {
        const searchLower = query.toLowerCase();
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.productType?.toLowerCase().includes(searchLower) ||
          product.handle.toLowerCase().includes(searchLower)
        );
      })
    : [];

  const translations: Record<string, { title: string; noResults: string; searching: string; tryAnother: string; backHome: string }> = {
    en: {
      title: 'Search Results',
      noResults: 'No results found',
      searching: 'Searching for',
      tryAnother: 'Try searching for something else',
      backHome: 'Back to Home',
    },
    es: {
      title: 'Resultados de Busqueda',
      noResults: 'No se encontraron resultados',
      searching: 'Buscando',
      tryAnother: 'Intenta buscar otra cosa',
      backHome: 'Volver al Inicio',
    },
    fr: {
      title: 'Resultats de Recherche',
      noResults: 'Aucun resultat trouve',
      searching: 'Recherche de',
      tryAnother: 'Essayez de chercher autre chose',
      backHome: 'Retour a l\'accueil',
    },
    de: {
      title: 'Suchergebnisse',
      noResults: 'Keine Ergebnisse gefunden',
      searching: 'Suche nach',
      tryAnother: 'Versuchen Sie etwas anderes zu suchen',
      backHome: 'Zuruck zur Startseite',
    },
    it: {
      title: 'Risultati della Ricerca',
      noResults: 'Nessun risultato trovato',
      searching: 'Cercando',
      tryAnother: 'Prova a cercare qualcos\'altro',
      backHome: 'Torna alla Home',
    },
    pt: {
      title: 'Resultados da Pesquisa',
      noResults: 'Nenhum resultado encontrado',
      searching: 'Pesquisando por',
      tryAnother: 'Tente pesquisar outra coisa',
      backHome: 'Voltar ao Inicio',
    },
  };

  const pageT = translations[validLocale] || translations.en;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header locale={validLocale} />

      <main className="flex-1 pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif font-medium mb-2">
              {pageT.title}
            </h1>
            {query && (
              <p className="text-muted-foreground">
                {pageT.searching}: <span className="font-medium text-foreground">"{query}"</span>
                {" "}- {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
              </p>
            )}
          </div>

          {/* Results */}
          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} locale={validLocale} />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-medium mb-2">{pageT.noResults}</h2>
              <p className="text-muted-foreground mb-6">{pageT.tryAnother}</p>
              <Link 
                href={`/${validLocale === 'en' ? '' : validLocale}`}
                className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                {pageT.backHome}
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer locale={validLocale} />
    </div>
  );
}
