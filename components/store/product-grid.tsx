import Image from 'next/image'
import Link from 'next/link'
import { type Locale } from '@/lib/seo-lite'
import type { ShopifyProduct } from '@/lib/shopify/types'
import { translateProduct } from '@/lib/translations'

interface ProductGridProps {
  products: ShopifyProduct[]
  locale: Locale
}

// Format price with currency
function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export async function ProductGrid({ products, locale }: ProductGridProps) {
  // Translate all products in parallel (with caching)
  const translatedProducts = await Promise.all(
    products.map(async (product) => {
      // Only translate if not English
      if (locale === 'en') {
        return {
          ...product,
          translatedTitle: product.title,
          translatedProductType: product.productType || '',
        }
      }

      const translated = await translateProduct(
        {
          id: product.id,
          title: product.title,
          productType: product.productType,
        },
        locale,
        'en'
      )

      return {
        ...product,
        translatedTitle: translated.title,
        translatedProductType: translated.productType,
      }
    })
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {translatedProducts.map((product) => {
        const imageUrl = product.images?.edges?.[0]?.node?.url
        const price = product.priceRange?.minVariantPrice
        const comparePrice = product.compareAtPriceRange?.minVariantPrice
        const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price?.amount || '0')

        return (
          <Link 
            key={product.id} 
            href={`/${locale}/product/${product.handle}`}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-muted rounded-lg sm:rounded-xl mb-2 sm:mb-3 overflow-hidden relative group-hover:bg-muted/80 transition-colors">
              {imageUrl ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={product.translatedTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-background/80 flex items-center justify-center">
                    <svg className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>
              )}
              {hasDiscount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                  Sale
                </span>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-medium truncate group-hover:text-accent transition-colors">
              {product.translatedTitle}
            </h3>
            {product.translatedProductType && (
              <p className="text-xs text-muted-foreground/70 truncate">
                {product.translatedProductType}
              </p>
            )}
            <div className="flex items-center gap-2">
              {price && (
                <p className="text-xs sm:text-sm text-foreground font-medium">
                  {formatPrice(price.amount, price.currencyCode)}
                </p>
              )}
              {hasDiscount && comparePrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
