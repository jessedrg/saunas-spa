"use server"

import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"

// Language names for AI context
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", de: "German", fr: "French", it: "Italian",
  pt: "Portuguese", nl: "Dutch", pl: "Polish", cs: "Czech", hu: "Hungarian",
  ro: "Romanian", bg: "Bulgarian", hr: "Croatian", sk: "Slovak", sl: "Slovenian",
  et: "Estonian", lv: "Latvian", lt: "Lithuanian", fi: "Finnish", sv: "Swedish",
  da: "Danish", el: "Greek", tr: "Turkish", ru: "Russian", uk: "Ukrainian",
  ar: "Arabic", zh: "Chinese", ja: "Japanese", ko: "Korean", no: "Norwegian",
  ga: "Irish", mt: "Maltese",
}

interface TranslationResult {
  text: string
  fromCache: boolean
}

interface TranslationOptions {
  sourceLocale?: string
  contentType?: string
  sourceId?: string
}

/**
 * Get translation from cache or generate with AI
 */
export async function translate(
  text: string,
  targetLocale: string,
  options: TranslationOptions = {}
): Promise<TranslationResult> {
  const { sourceLocale = "en", contentType = "general", sourceId } = options

  console.log('[v0] translate() called:', { text: text?.substring(0, 30), targetLocale, sourceLocale, contentType })

  // Skip if same language
  if (sourceLocale === targetLocale) {
    console.log('[v0] Same language, skipping translation')
    return { text, fromCache: true }
  }

  // Skip if text is empty
  if (!text || text.trim() === "") {
    console.log('[v0] Empty text, skipping translation')
    return { text: "", fromCache: true }
  }

  const supabase = await createClient()

  // Check cache first
  const { data: cached } = await supabase
    .from("translations")
    .select("translated_text")
    .eq("source_text", text)
    .eq("source_locale", sourceLocale)
    .eq("target_locale", targetLocale)
    .eq("content_type", contentType)
    .single()

  if (cached?.translated_text) {
    console.log('[v0] Found cached translation:', cached.translated_text?.substring(0, 30))
    return { text: cached.translated_text, fromCache: true }
  }
  
  console.log('[v0] No cache found, generating AI translation...')

  // Generate translation with AI
  const targetLanguage = LANGUAGE_NAMES[targetLocale] || targetLocale
  const sourceLanguage = LANGUAGE_NAMES[sourceLocale] || sourceLocale

  try {
    const { text: translatedText } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `Translate the following ${sourceLanguage} text to ${targetLanguage}. 
Only respond with the translation, nothing else. Keep the same tone and formatting.
If it's a product name or title, keep it natural and commercially appealing.

Text to translate:
${text}`,
      maxOutputTokens: 500,
    })

    const cleanTranslation = translatedText.trim()
    console.log('[v0] AI translation result:', cleanTranslation?.substring(0, 50))

    // Save to cache (don't await to not block response)
    supabase
      .from("translations")
      .upsert({
        source_text: text,
        source_locale: sourceLocale,
        target_locale: targetLocale,
        translated_text: cleanTranslation,
        content_type: contentType,
        source_id: sourceId,
      }, {
        onConflict: "source_text,source_locale,target_locale,content_type"
      })
      .then(() => {})
      .catch((err) => console.error("Failed to cache translation:", err))

    return { text: cleanTranslation, fromCache: false }
  } catch (error) {
    console.error("Translation error:", error)
    // Return original text on error
    return { text, fromCache: false }
  }
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
  texts: string[],
  targetLocale: string,
  options: TranslationOptions = {}
): Promise<TranslationResult[]> {
  const results = await Promise.all(
    texts.map((text) => translate(text, targetLocale, options))
  )
  return results
}

/**
 * Translate product data (title, description, etc.)
 */
export async function translateProduct(
  product: {
    id: string
    title: string
    description?: string
    productType?: string | null
  },
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<{
  title: string
  description: string
  productType: string
}> {
  if (sourceLocale === targetLocale) {
    return {
      title: product.title,
      description: product.description || "",
      productType: product.productType || "",
    }
  }

  const [titleResult, descResult, typeResult] = await Promise.all([
    translate(product.title, targetLocale, {
      sourceLocale,
      contentType: "product_title",
      sourceId: product.id,
    }),
    product.description
      ? translate(product.description, targetLocale, {
          sourceLocale,
          contentType: "product_description",
          sourceId: product.id,
        })
      : Promise.resolve({ text: "", fromCache: true }),
    product.productType
      ? translate(product.productType, targetLocale, {
          sourceLocale,
          contentType: "product_type",
          sourceId: product.id,
        })
      : Promise.resolve({ text: "", fromCache: true }),
  ])

  return {
    title: titleResult.text,
    description: descResult.text,
    productType: typeResult.text,
  }
}

/**
 * Get UI translations for a locale
 */
export async function getUITranslations(
  locale: string,
  keys: string[]
): Promise<Record<string, string>> {
  const results: Record<string, string> = {}

  // Default EN translations
  const defaults: Record<string, string> = {
    "add_to_cart": "Add to Cart",
    "buy_now": "Buy Now",
    "out_of_stock": "Out of Stock",
    "in_stock": "In Stock",
    "free_shipping": "Free Shipping",
    "warranty": "2 Year Warranty",
    "returns": "30 Day Returns",
    "quantity": "Quantity",
    "description": "Description",
    "related_products": "Related Products",
    "checkout": "Checkout",
    "cart": "Cart",
    "your_cart": "Your Cart",
    "empty_cart": "Your cart is empty",
    "subtotal": "Subtotal",
    "continue_shopping": "Continue Shopping",
    "remove": "Remove",
    "color": "Color",
    "size": "Size",
    "select_option": "Select an option",
  }

  if (locale === "en") {
    for (const key of keys) {
      results[key] = defaults[key] || key
    }
    return results
  }

  // Translate all keys
  const translations = await Promise.all(
    keys.map(async (key) => {
      const defaultText = defaults[key] || key
      const result = await translate(defaultText, locale, {
        sourceLocale: "en",
        contentType: "ui",
        sourceId: key,
      })
      return { key, text: result.text }
    })
  )

  for (const { key, text } of translations) {
    results[key] = text
  }

  return results
}
