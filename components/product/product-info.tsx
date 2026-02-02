"use client";

import { useState, useEffect } from "react";
import { Check, Truck, Shield, RotateCcw, Minus, Plus, Clock, Flame, Users } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import type { Locale } from "@/lib/seo-lite";
import { PRODUCT_TYPES } from "@/lib/seo-data";
import { AddToCart } from "@/components/cart/add-to-cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Urgency translations
const URGENCY_TRANSLATIONS: Record<string, {
  offerEnds: string
  peopleViewing: string
  soldRecently: string
  lowStock: string
  buyNow: string
}> = {
  en: { offerEnds: 'Offer ends in', peopleViewing: 'people viewing this now', soldRecently: 'sold in last 24 hours', lowStock: 'Only {n} left in stock!', buyNow: 'Buy now, pay later available' },
  es: { offerEnds: 'Oferta termina en', peopleViewing: 'personas viendo esto ahora', soldRecently: 'vendidos en las ultimas 24h', lowStock: 'Solo quedan {n} en stock!', buyNow: 'Compra ahora, paga despues' },
  fr: { offerEnds: 'Offre se termine dans', peopleViewing: 'personnes regardent ceci', soldRecently: 'vendus ces 24 dernieres heures', lowStock: 'Plus que {n} en stock!', buyNow: 'Achetez maintenant, payez plus tard' },
  de: { offerEnds: 'Angebot endet in', peopleViewing: 'Personen sehen sich das an', soldRecently: 'in den letzten 24h verkauft', lowStock: 'Nur noch {n} auf Lager!', buyNow: 'Jetzt kaufen, spater zahlen' },
  it: { offerEnds: 'Offerta termina tra', peopleViewing: 'persone stanno guardando', soldRecently: 'venduti nelle ultime 24h', lowStock: 'Solo {n} rimasti!', buyNow: 'Compra ora, paga dopo' },
  pt: { offerEnds: 'Oferta termina em', peopleViewing: 'pessoas vendo agora', soldRecently: 'vendidos nas ultimas 24h', lowStock: 'Apenas {n} em estoque!', buyNow: 'Compre agora, pague depois' },
};

interface ProductInfoProps {
  product: Product;
  locale: Locale;
}

// Translations for product info
const TRANSLATIONS: Record<string, {
  inStock: string;
  outOfStock: string;
  freeShipping: string;
  warranty: string;
  returns: string;
  quantity: string;
  size: string;
  color: string;
}> = {
  en: { inStock: "In Stock", outOfStock: "Out of Stock", freeShipping: "Free shipping on orders over 50", warranty: "2 year warranty", returns: "30-day returns", quantity: "Quantity", size: "Size", color: "Color" },
  es: { inStock: "En Stock", outOfStock: "Agotado", freeShipping: "Envio gratis en pedidos +50", warranty: "2 anos de garantia", returns: "30 dias de devolucion", quantity: "Cantidad", size: "Talla", color: "Color" },
  de: { inStock: "Auf Lager", outOfStock: "Ausverkauft", freeShipping: "Kostenloser Versand ab 50", warranty: "2 Jahre Garantie", returns: "30 Tage Ruckgabe", quantity: "Menge", size: "Grosse", color: "Farbe" },
  fr: { inStock: "En Stock", outOfStock: "Rupture", freeShipping: "Livraison gratuite des 50", warranty: "Garantie 2 ans", returns: "Retours 30 jours", quantity: "Quantite", size: "Taille", color: "Couleur" },
  it: { inStock: "Disponibile", outOfStock: "Esaurito", freeShipping: "Spedizione gratuita oltre 50", warranty: "Garanzia 2 anni", returns: "Resi 30 giorni", quantity: "Quantita", size: "Taglia", color: "Colore" },
  pt: { inStock: "Em Stock", outOfStock: "Esgotado", freeShipping: "Frete gratis acima de 50", warranty: "Garantia 2 anos", returns: "Devolucoes 30 dias", quantity: "Quantidade", size: "Tamanho", color: "Cor" },
  nl: { inStock: "Op Voorraad", outOfStock: "Uitverkocht", freeShipping: "Gratis verzending vanaf 50", warranty: "2 jaar garantie", returns: "30 dagen retour", quantity: "Aantal", size: "Maat", color: "Kleur" },
  pl: { inStock: "Dostepny", outOfStock: "Niedostepny", freeShipping: "Darmowa wysylka od 50", warranty: "2 lata gwarancji", returns: "30 dni zwrotu", quantity: "Ilosc", size: "Rozmiar", color: "Kolor" },
  cs: { inStock: "Skladem", outOfStock: "Vyprodano", freeShipping: "Doprava zdarma od 50", warranty: "2 roky zaruka", returns: "30 dni na vraceni", quantity: "Mnozstvi", size: "Velikost", color: "Barva" },
  hu: { inStock: "Keszleten", outOfStock: "Elfogyott", freeShipping: "Ingyenes szallitas 50 folott", warranty: "2 ev garancia", returns: "30 napos visszaterites", quantity: "Mennyiseg", size: "Meret", color: "Szin" },
  ro: { inStock: "In Stoc", outOfStock: "Epuizat", freeShipping: "Livrare gratuita peste 50", warranty: "Garantie 2 ani", returns: "Retururi 30 zile", quantity: "Cantitate", size: "Marime", color: "Culoare" },
  bg: { inStock: "Nalichno", outOfStock: "Izcherpano", freeShipping: "Bezplatna dostavka nad 50", warranty: "2 godini garantsiya", returns: "30 dni vrashtane", quantity: "Kolichestvo", size: "Razmer", color: "Tsyat" },
  hr: { inStock: "Na Zalihi", outOfStock: "Rasprodano", freeShipping: "Besplatna dostava iznad 50", warranty: "2 godine jamstva", returns: "30 dana povrat", quantity: "Kolicina", size: "Velicina", color: "Boja" },
  sk: { inStock: "Skladom", outOfStock: "Vypredane", freeShipping: "Doprava zadarmo od 50", warranty: "2 roky zaruka", returns: "30 dni na vratenie", quantity: "Mnozstvo", size: "Velkost", color: "Farba" },
  sl: { inStock: "Na Zalogi", outOfStock: "Razprodano", freeShipping: "Brezplacna dostava nad 50", warranty: "2 leti garancije", returns: "30 dni vracilo", quantity: "Kolicina", size: "Velikost", color: "Barva" },
  et: { inStock: "Laos", outOfStock: "Otsas", freeShipping: "Tasuta kohaletoimetamine ule 50", warranty: "2 aastat garantiid", returns: "30 paeva tagastus", quantity: "Kogus", size: "Suurus", color: "Varv" },
  lv: { inStock: "Ir Pieejams", outOfStock: "Nav Pieejams", freeShipping: "Bezmaksas piegade virs 50", warranty: "2 gadu garantija", returns: "30 dienu atgriesana", quantity: "Daudzums", size: "Izmers", color: "Krasa" },
  lt: { inStock: "Sandelyje", outOfStock: "Isparduota", freeShipping: "Nemokamas pristatymas nuo 50", warranty: "2 metu garantija", returns: "30 dienu grazinimas", quantity: "Kiekis", size: "Dydis", color: "Spalva" },
  fi: { inStock: "Varastossa", outOfStock: "Loppunut", freeShipping: "Ilmainen toimitus yli 50", warranty: "2 vuoden takuu", returns: "30 paivan palautus", quantity: "Maara", size: "Koko", color: "Vari" },
  sv: { inStock: "I Lager", outOfStock: "Slutsald", freeShipping: "Fri frakt over 50", warranty: "2 ars garanti", returns: "30 dagars retur", quantity: "Antal", size: "Storlek", color: "Farg" },
  da: { inStock: "Pa Lager", outOfStock: "Udsolgt", freeShipping: "Gratis fragt over 50", warranty: "2 ars garanti", returns: "30 dages retur", quantity: "Antal", size: "Storrelse", color: "Farve" },
  el: { inStock: "Diathesimo", outOfStock: "Eksantlimeno", freeShipping: "Dorean apostoli ano ton 50", warranty: "2 eti eggisi", returns: "30 imeres epistrofi", quantity: "Posotita", size: "Megethos", color: "Chroma" },
  tr: { inStock: "Stokta", outOfStock: "Tukendi", freeShipping: "50 ustu ucretsiz kargo", warranty: "2 yil garanti", returns: "30 gun iade", quantity: "Miktar", size: "Beden", color: "Renk" },
  ru: { inStock: "V Nalichii", outOfStock: "Net v Nalichii", freeShipping: "Besplatnaya dostavka ot 50", warranty: "Garantiya 2 goda", returns: "Vozvrat 30 dney", quantity: "Kolichestvo", size: "Razmer", color: "Tsvet" },
  uk: { inStock: "V Nayavnosti", outOfStock: "Nemaye", freeShipping: "Bezkooshtovna dostavka vid 50", warranty: "Harantiya 2 roky", returns: "Povernennya 30 dniv", quantity: "Kilkist", size: "Rozmir", color: "Kolir" },
  ar: { inStock: "متوفر", outOfStock: "نفذ", freeShipping: "شحن مجاني فوق 50", warranty: "ضمان سنتين", returns: "إرجاع 30 يوم", quantity: "الكمية", size: "المقاس", color: "اللون" },
  zh: { inStock: "有货", outOfStock: "缺货", freeShipping: "满50免运费", warranty: "2年保修", returns: "30天退货", quantity: "数量", size: "尺寸", color: "颜色" },
  ja: { inStock: "在庫あり", outOfStock: "在庫切れ", freeShipping: "50以上で送料無料", warranty: "2年保証", returns: "30日返品", quantity: "数量", size: "サイズ", color: "色" },
  ko: { inStock: "재고있음", outOfStock: "품절", freeShipping: "50이상 무료배송", warranty: "2년 보증", returns: "30일 반품", quantity: "수량", size: "사이즈", color: "색상" },
  no: { inStock: "Pa Lager", outOfStock: "Utsolgt", freeShipping: "Gratis frakt over 50", warranty: "2 ars garanti", returns: "30 dagers retur", quantity: "Antall", size: "Storrelse", color: "Farge" },
  ga: { inStock: "Ar Fail", outOfStock: "Diolta Amach", freeShipping: "Seachadadh saor in aisce os cionn 50", warranty: "2 bhliain baranta", returns: "30 la aischuir", quantity: "Cainniocht", size: "Meid", color: "Dath" },
  mt: { inStock: "Disponibbli", outOfStock: "Mhux Disponibbli", freeShipping: "Kunsinna b'xejn fuq 50", warranty: "2 snin garanzija", returns: "30 jum ritorn", quantity: "Kwantita", size: "Daqs", color: "Kulur" },
};

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// Translate product name using handle
function translateProductName(title: string, handle: string | undefined, locale: Locale): string {
  // Simply return the title - translations handled elsewhere
  return title;
}

// Simulated values based on product hash
function getSimulatedData(productId: string) {
  const hash = productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return {
    stockLevel: (hash % 8) + 2, // 2-9 items
    viewingNow: (hash % 12) + 3, // 3-14 people
    soldRecently: (hash % 20) + 5, // 5-24 sold
  }
}

export function ProductInfo({ product, locale }: ProductInfoProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const ut = URGENCY_TRANSLATIONS[locale] || URGENCY_TRANSLATIONS.en;
  
  // Normalize variants - handle both array and edges format
  const variants: ProductVariant[] = Array.isArray(product.variants) 
    ? product.variants 
    : (product.variants as any)?.edges?.map((e: any) => e.node) || [];
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  
  // Simulated urgency data
  const simulatedData = getSimulatedData(product.id);
  
  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const price = selectedVariant?.price || product.priceRange?.minVariantPrice;
  const comparePrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price?.amount || "0");
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(price?.amount || "0") / parseFloat(comparePrice.amount)) * 100)
    : 0;

  // Group options by name
  const optionsByName: Record<string, string[]> = {};
  product.options?.forEach((option) => {
    if (option.values.length > 1 || (option.values.length === 1 && option.values[0] !== "Default Title")) {
      optionsByName[option.name] = option.values;
    }
  });

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  return (
    <div className="flex flex-col">
      {/* Category */}
      {product.productType && (
        <p className="text-sm text-muted-foreground mb-2">{product.productType}</p>
      )}

      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-serif font-medium mb-4">
        {translateProductName(product.title, product.handle, locale)}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        {price && (
          <span className="text-2xl lg:text-3xl font-semibold">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
        )}
        {hasDiscount && comparePrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
            </span>
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Availability & Urgency */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          {product.availableForSale ? (
            <>
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-600 font-medium">{t.inStock}</span>
              <span className="text-sm text-orange-600 font-medium ml-2">
                - {ut.lowStock.replace('{n}', simulatedData.stockLevel.toString())}
              </span>
            </>
          ) : (
            <>
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm text-red-600 font-medium">{t.outOfStock}</span>
            </>
          )}
        </div>
        
        {/* Social proof */}
        {product.availableForSale && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground">{simulatedData.viewingNow}</span> {ut.peopleViewing}
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-medium text-foreground">{simulatedData.soldRecently}</span> {ut.soldRecently}
            </span>
          </div>
        )}
      </div>
      
      {/* Countdown timer for discount */}
      {hasDiscount && product.availableForSale && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{ut.offerEnds}</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-red-600 text-white px-3 py-2 rounded-md text-center min-w-[60px]">
              <span className="text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <p className="text-[10px] uppercase">hrs</p>
            </div>
            <div className="bg-red-600 text-white px-3 py-2 rounded-md text-center min-w-[60px]">
              <span className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <p className="text-[10px] uppercase">min</p>
            </div>
            <div className="bg-red-600 text-white px-3 py-2 rounded-md text-center min-w-[60px]">
              <span className="text-xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <p className="text-[10px] uppercase">sec</p>
            </div>
          </div>
        </div>
      )}

      {/* Short description */}
      {product.description && (
        <p className="text-muted-foreground mb-6 line-clamp-3">{product.description}</p>
      )}

      {/* Options */}
      {Object.entries(optionsByName).map(([optionName, values]) => (
        <div key={optionName} className="mb-6">
          <label className="block text-sm font-medium mb-3">
            {optionName === "Size" ? t.size : optionName === "Color" ? t.color : optionName}
          </label>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const isSelected = selectedVariant?.selectedOptions?.some(
                (opt) => opt.name === optionName && opt.value === value
              );
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    const variant = variants.find((v) =>
                      v.selectedOptions?.some((opt) => opt.name === optionName && opt.value === value)
                    );
                    if (variant) setSelectedVariant(variant);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg border transition-all",
                    isSelected
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">{t.quantity}</label>
        <div className="flex items-center gap-1 w-fit border border-border rounded-lg">
          <button
            type="button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="p-3 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 99}
            className="p-3 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-lg"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="mb-8">
        <AddToCart
          product={product}
          selectedVariant={selectedVariant}
          className="w-full py-4 text-base"
        />
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Truck className="h-5 w-5 text-accent" />
          </div>
          <span className="text-sm">{t.freeShipping}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-accent" />
          </div>
          <span className="text-sm">{t.warranty}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <RotateCcw className="h-5 w-5 text-accent" />
          </div>
          <span className="text-sm">{t.returns}</span>
        </div>
      </div>
    </div>
  );
}
