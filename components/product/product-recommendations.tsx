import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify/types";
import type { Locale } from "@/lib/seo-lite";

interface ProductRecommendationsProps {
  products: ShopifyProduct[];
  locale: Locale;
}

const TRANSLATIONS: Record<Locale, { title: string; viewProduct: string }> = {
  en: { title: "You May Also Like", viewProduct: "View" },
  es: { title: "Tambien Te Puede Gustar", viewProduct: "Ver" },
  de: { title: "Das Konnte Ihnen Auch Gefallen", viewProduct: "Ansehen" },
  fr: { title: "Vous Aimerez Aussi", viewProduct: "Voir" },
  it: { title: "Potrebbe Piacerti Anche", viewProduct: "Vedi" },
  pt: { title: "Voce Tambem Pode Gostar", viewProduct: "Ver" },
  nl: { title: "Misschien Vind Je Dit Ook Leuk", viewProduct: "Bekijken" },
  pl: { title: "Moze Ci Sie Spodobac", viewProduct: "Zobacz" },
  cs: { title: "Mohlo By Se Vam Libit", viewProduct: "Zobrazit" },
  hu: { title: "Ez Is Tetszhet", viewProduct: "Megtekintes" },
  ro: { title: "S-ar Putea Sa-ti Placa", viewProduct: "Vezi" },
  bg: { title: "Mozhe Da Vi Haresa", viewProduct: "Razgledaj" },
  hr: { title: "Moglo Bi Vam Se Svidjeti", viewProduct: "Pogledaj" },
  sk: { title: "Mohlo By Sa Vam Pacit", viewProduct: "Zobrazit" },
  sl: { title: "Morda Vam Bo Vsec", viewProduct: "Poglej" },
  et: { title: "Teile Voib Meeldida", viewProduct: "Vaata" },
  lv: { title: "Jums Varetu Patikt", viewProduct: "Skatit" },
  lt: { title: "Jums Gali Patikti", viewProduct: "Ziureti" },
  fi: { title: "Saatat Pitaa Myos", viewProduct: "Katso" },
  sv: { title: "Du Kanske Ocksa Gillar", viewProduct: "Visa" },
  da: { title: "Du Vil Maaske Ogsaa Kunne Lide", viewProduct: "Se" },
  el: { title: "Mporei Episis Na Sas Aresei", viewProduct: "Deite" },
  tr: { title: "Bunlar Da Hoşunuza Gidebilir", viewProduct: "Gor" },
  ru: { title: "Vam Takzhe Mozhet Ponravitsya", viewProduct: "Smotret" },
  uk: { title: "Vam Takozh Mozhe Spobatysia", viewProduct: "Dyvytsia" },
  ar: { title: "قد يعجبك ايضا", viewProduct: "عرض" },
  zh: { title: "你可能也喜欢", viewProduct: "查看" },
  ja: { title: "こちらもおすすめ", viewProduct: "見る" },
  ko: { title: "이런 상품도 좋아하실 수 있어요", viewProduct: "보기" },
  no: { title: "Du Vil Kanskje Ogsa Like", viewProduct: "Se" },
  ga: { title: "B'fheidir Go Maith Leat Freisin", viewProduct: "Fheiceail" },
  mt: { title: "Jista Joghgbok Ukoll", viewProduct: "Ara" },
};

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function ProductRecommendations({ products, locale }: ProductRecommendationsProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  return (
    <section className="py-12 lg:py-16 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl lg:text-2xl font-serif font-medium mb-8">{t.title}</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => {
            const imageUrl = product.images?.edges?.[0]?.node?.url;
            const price = product.priceRange?.minVariantPrice;

            return (
              <Link
                key={product.id}
                href={`/${locale}/product/${product.handle}`}
                className="group"
              >
                <div className="relative aspect-square bg-background rounded-xl overflow-hidden mb-3">
                  {imageUrl ? (
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-muted-foreground/50"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="text-sm font-medium truncate group-hover:text-accent transition-colors">
                  {product.title}
                </h3>

                {price && (
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
