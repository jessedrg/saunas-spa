"use server"

import { translate } from "@/lib/translations"

export interface CartItemTranslation {
  productId: string
  title: string
  variantTitle?: string
}

export interface TranslatedCartItem {
  productId: string
  translatedTitle: string
  translatedVariantTitle?: string
}

/**
 * Server Action to translate cart items using AI with DB caching
 */
export async function translateCartItems(
  items: CartItemTranslation[],
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<TranslatedCartItem[]> {
  // Skip if same language
  if (sourceLocale === targetLocale) {
    return items.map((item) => ({
      productId: item.productId,
      translatedTitle: item.title,
      translatedVariantTitle: item.variantTitle,
    }))
  }

  // Translate all items in parallel
  const results = await Promise.all(
    items.map(async (item) => {
      const [titleResult, variantResult] = await Promise.all([
        translate(item.title, targetLocale, {
          sourceLocale,
          contentType: "product_title",
          sourceId: item.productId,
        }),
        item.variantTitle && item.variantTitle !== "Default Title"
          ? translate(item.variantTitle, targetLocale, {
              sourceLocale,
              contentType: "variant_title",
              sourceId: `${item.productId}-variant`,
            })
          : Promise.resolve({ text: item.variantTitle || "", fromCache: true }),
      ])

      return {
        productId: item.productId,
        translatedTitle: titleResult.text,
        translatedVariantTitle: variantResult.text || undefined,
      }
    })
  )

  return results
}
