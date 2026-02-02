import { type Locale } from '@/lib/seo-lite'
import { getProducts, getCollectionProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/lib/shopify/types'
import { ProductGrid } from '@/components/store/product-grid'

interface ShopifyProductsProps {
  locale: Locale
  collection?: string
  limit?: number
  title?: string
}

export async function ShopifyProducts({ locale, collection, limit = 8, title }: ShopifyProductsProps) {
  let products: ShopifyProduct[] = []
  let error: string | null = null

  try {
    if (collection) {
      products = await getCollectionProducts({ collection, limit, locale })
    } else {
      products = await getProducts({ first: limit, locale })
    }
  } catch (e) {
    console.log('[v0] Error fetching products:', e)
    error = e instanceof Error ? e.message : 'Failed to load products'
  }

  // If no products or error, show placeholder
  if (error || products.length === 0) {
    return (
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium">{title}</h2>
            </div>
          )}
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {error ? `Error: ${error}` : 'No products available yet. Add products to your Shopify store.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium">{title}</h2>
          </div>
        )}

        <ProductGrid products={products} locale={locale} />
      </div>
    </section>
  )
}
