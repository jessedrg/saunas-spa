'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Check, Loader2, Flame, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/cart/cart-context'
import type { Product } from '@/lib/shopify/types'
import { type Locale, getT } from '@/lib/seo-lite'
import { CATEGORY_TRANSLATIONS, type Category } from '@/lib/seo-data'

// Urgency and UI translations
const URGENCY_TEXT: Record<string, { 
  lowStock: string
  bestseller: string
  lastUnits: string
  limitedOffer: string
  added: string
  outOfStock: string
}> = {
  en: { lowStock: 'Only {n} left!', bestseller: 'Bestseller', lastUnits: 'Last units', limitedOffer: 'Limited offer', added: 'Added', outOfStock: 'Out of Stock' },
  es: { lowStock: 'Solo quedan {n}!', bestseller: 'Mas vendido', lastUnits: 'Ultimas unidades', limitedOffer: 'Oferta limitada', added: 'Anadido', outOfStock: 'Agotado' },
  fr: { lowStock: 'Plus que {n}!', bestseller: 'Meilleure vente', lastUnits: 'Dernieres unites', limitedOffer: 'Offre limitee', added: 'Ajoute', outOfStock: 'Rupture' },
  de: { lowStock: 'Nur noch {n}!', bestseller: 'Bestseller', lastUnits: 'Letzte Einheiten', limitedOffer: 'Limitiertes Angebot', added: 'Hinzugefugt', outOfStock: 'Ausverkauft' },
  it: { lowStock: 'Solo {n} rimasti!', bestseller: 'Piu venduto', lastUnits: 'Ultime unita', limitedOffer: 'Offerta limitata', added: 'Aggiunto', outOfStock: 'Esaurito' },
  pt: { lowStock: 'Apenas {n} restantes!', bestseller: 'Mais vendido', lastUnits: 'Ultimas unidades', limitedOffer: 'Oferta limitada', added: 'Adicionado', outOfStock: 'Esgotado' },
}

// Simulate stock levels based on product id hash
function getSimulatedStock(productId: string): number {
  const hash = productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return (hash % 8) + 1 // Returns 1-8
}

// Determine if product should show as bestseller (based on handle hash)
function isBestseller(handle: string): boolean {
  const hash = handle.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return hash % 4 === 0 // ~25% of products
}

// Map Shopify productType to our category slugs for translation
function translateProductType(productType: string, locale: Locale): string {
  // Convert productType to slug format (e.g., "Wheelchairs" -> "wheelchairs")
  const slug = productType.toLowerCase().replace(/\s+/g, '-') as Category
  const translations = CATEGORY_TRANSLATIONS[locale] || CATEGORY_TRANSLATIONS.en
  return translations[slug] || productType
}

interface ShopifyProductCardProps {
  product: Product
  locale: Locale
}

export function ShopifyProductCard({ product, locale }: ShopifyProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()
  const t = getT(locale)

  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null
  const discount = compareAtPrice ? Math.round((1 - price / compareAtPrice) * 100) : 0
  const variant = product.variants[0]
  
  // Urgency elements
  const urgencyText = URGENCY_TEXT[locale] || URGENCY_TEXT.en
  const stockLevel = getSimulatedStock(product.id)
  const showLowStock = stockLevel <= 5 && product.availableForSale
  const showBestseller = isBestseller(product.handle)

  const handleAddToCart = async () => {
    if (!variant) return
    setIsAdding(true)
    try {
      await addItem(variant, product)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] bg-muted rounded-xl overflow-hidden mb-4">
        {image ? (
          <Image src={image.url || "/placeholder.svg"} alt={image.altText || product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}

        {/* Badges column */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!product.availableForSale && (
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-muted text-muted-foreground">
              {urgencyText.outOfStock}
            </span>
          )}
          {discount > 0 && product.availableForSale && (
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-destructive text-destructive-foreground">
              -{discount}%
            </span>
          )}
          {showBestseller && product.availableForSale && (
            <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-amber-500 text-white flex items-center gap-1">
              <Flame className="h-3 w-3" />
              {urgencyText.bestseller}
            </span>
          )}
        </div>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={cn('absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100', isWishlisted && 'opacity-100')}
          aria-label="Add to wishlist"
        >
          <Heart className={cn('h-4 w-4 transition-colors', isWishlisted ? 'fill-destructive text-destructive' : 'text-foreground')} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Button className="w-full h-10 text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart} disabled={isAdding || isAdded || !product.availableForSale}>
            {isAdding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isAdded ? <><Check className="mr-2 h-4 w-4" />{urgencyText.added}</> : <><ShoppingBag className="mr-2 h-4 w-4" />{t.shop}</>}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Link href={`/${locale === 'en' ? '' : locale + '/'}product/${product.handle}`} className="block">
          <h3 className="text-sm font-medium leading-tight hover:text-accent transition-colors line-clamp-2">{product.title}</h3>
        </Link>

        {product.productType && <p className="text-xs text-muted-foreground">{translateProductType(product.productType, locale)}</p>}

        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold">
            {new Intl.NumberFormat(locale, { style: 'currency', currency: product.priceRange.minVariantPrice.currencyCode }).format(price)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              {new Intl.NumberFormat(locale, { style: 'currency', currency: product.priceRange.minVariantPrice.currencyCode }).format(compareAtPrice)}
            </span>
          )}
        </div>
        
        {/* Low stock urgency */}
        {showLowStock && (
          <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {urgencyText.lowStock.replace('{n}', stockLevel.toString())}
          </p>
        )}
      </div>
    </article>
  )
}
