'use client'

import { useCart } from './cart-context'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, Clock, Shield } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { translateCartItems, type TranslatedCartItem } from '@/app/actions/translate-cart'

function formatPrice(amount: string, currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 50

// Cart translations
const cartTranslations: Record<string, {
  yourCart: string
  emptyCart: string
  emptyCartDesc: string
  continueShopping: string
  total: string
  checkout: string
  shippingNote: string
  freeShipping: string
  freeShippingUnlocked: string
  addMore: string
  secureCheckout: string
  limitedStock: string
}> = {
  en: {
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    emptyCartDesc: 'Add items to get started',
    continueShopping: 'Continue Shopping',
    total: 'Total',
    checkout: 'Checkout Now',
    shippingNote: 'Shipping and taxes calculated at checkout',
    freeShipping: 'Free shipping on orders over',
    freeShippingUnlocked: 'You unlocked FREE shipping!',
    addMore: 'Add {amount} more for free shipping',
    secureCheckout: 'Secure checkout',
    limitedStock: 'Items in your cart have limited stock',
  },
  es: {
    yourCart: 'Tu Carrito',
    emptyCart: 'Tu carrito esta vacio',
    emptyCartDesc: 'Anade productos para empezar',
    continueShopping: 'Seguir Comprando',
    total: 'Total',
    checkout: 'Comprar Ahora',
    shippingNote: 'Envio e impuestos calculados al finalizar',
    freeShipping: 'Envio gratis en pedidos superiores a',
    freeShippingUnlocked: 'Has desbloqueado envio GRATIS!',
    addMore: 'Anade {amount} mas para envio gratis',
    secureCheckout: 'Pago seguro',
    limitedStock: 'Los articulos tienen stock limitado',
  },
  fr: {
    yourCart: 'Votre Panier',
    emptyCart: 'Votre panier est vide',
    emptyCartDesc: 'Ajoutez des articles pour commencer',
    continueShopping: 'Continuer vos achats',
    total: 'Total',
    checkout: 'Commander Maintenant',
    shippingNote: 'Frais de port et taxes calcules a la caisse',
    freeShipping: 'Livraison gratuite des',
    freeShippingUnlocked: 'Livraison GRATUITE debloquee!',
    addMore: 'Ajoutez {amount} pour la livraison gratuite',
    secureCheckout: 'Pagamento securise',
    limitedStock: 'Stock limite pour ces articles',
  },
  de: {
    yourCart: 'Ihr Warenkorb',
    emptyCart: 'Ihr Warenkorb ist leer',
    emptyCartDesc: 'Artikel hinzufugen um zu beginnen',
    continueShopping: 'Weiter einkaufen',
    total: 'Gesamt',
    checkout: 'Jetzt Kaufen',
    shippingNote: 'Versand und Steuern werden an der Kasse berechnet',
    freeShipping: 'Kostenloser Versand ab',
    freeShippingUnlocked: 'GRATIS Versand freigeschaltet!',
    addMore: 'Noch {amount} fur kostenlosen Versand',
    secureCheckout: 'Sichere Bezahlung',
    limitedStock: 'Begrenzte Verfugbarkeit',
  },
  it: {
    yourCart: 'Il Tuo Carrello',
    emptyCart: 'Il tuo carrello e vuoto',
    emptyCartDesc: 'Aggiungi articoli per iniziare',
    continueShopping: 'Continua lo shopping',
    total: 'Totale',
    checkout: 'Acquista Ora',
    shippingNote: 'Spedizione e tasse calcolate al checkout',
    freeShipping: 'Spedizione gratuita oltre',
    freeShippingUnlocked: 'Spedizione GRATUITA sbloccata!',
    addMore: 'Aggiungi {amount} per la spedizione gratuita',
    secureCheckout: 'Pagamento sicuro',
    limitedStock: 'Disponibilita limitata',
  },
  pt: {
    yourCart: 'Seu Carrinho',
    emptyCart: 'Seu carrinho esta vazio',
    emptyCartDesc: 'Adicione itens para comecar',
    continueShopping: 'Continuar Comprando',
    total: 'Total',
    checkout: 'Comprar Agora',
    shippingNote: 'Frete e impostos calculados no checkout',
    freeShipping: 'Frete gratis em pedidos acima de',
    freeShippingUnlocked: 'Frete GRATIS desbloqueado!',
    addMore: 'Adicione {amount} para frete gratis',
    secureCheckout: 'Pagamento seguro',
    limitedStock: 'Estoque limitado',
  },
}

function getLocaleFromPath(): string {
  if (typeof window === 'undefined') return 'en'
  const path = window.location.pathname
  const match = path.match(/^\/(en|es|fr|de|it|pt)/)
  return match ? match[1] : 'en'
}

// Common variant option translations
const variantTranslations: Record<string, Record<string, string>> = {
  // Colors
  'multicolored': { es: 'multicolor', fr: 'multicolore', de: 'mehrfarbig', it: 'multicolore', pt: 'multicolorido' },
  'black': { es: 'negro', fr: 'noir', de: 'schwarz', it: 'nero', pt: 'preto' },
  'white': { es: 'blanco', fr: 'blanc', de: 'weiss', it: 'bianco', pt: 'branco' },
  'red': { es: 'rojo', fr: 'rouge', de: 'rot', it: 'rosso', pt: 'vermelho' },
  'blue': { es: 'azul', fr: 'bleu', de: 'blau', it: 'blu', pt: 'azul' },
  'green': { es: 'verde', fr: 'vert', de: 'grun', it: 'verde', pt: 'verde' },
  'gray': { es: 'gris', fr: 'gris', de: 'grau', it: 'grigio', pt: 'cinza' },
  'grey': { es: 'gris', fr: 'gris', de: 'grau', it: 'grigio', pt: 'cinza' },
  'silver': { es: 'plateado', fr: 'argent', de: 'silber', it: 'argento', pt: 'prata' },
  'gold': { es: 'dorado', fr: 'or', de: 'gold', it: 'oro', pt: 'dourado' },
  'brown': { es: 'marron', fr: 'marron', de: 'braun', it: 'marrone', pt: 'marrom' },
  'beige': { es: 'beige', fr: 'beige', de: 'beige', it: 'beige', pt: 'bege' },
  'pink': { es: 'rosa', fr: 'rose', de: 'rosa', it: 'rosa', pt: 'rosa' },
  'purple': { es: 'morado', fr: 'violet', de: 'lila', it: 'viola', pt: 'roxo' },
  'orange': { es: 'naranja', fr: 'orange', de: 'orange', it: 'arancione', pt: 'laranja' },
  'yellow': { es: 'amarillo', fr: 'jaune', de: 'gelb', it: 'giallo', pt: 'amarelo' },
  // Sizes
  'small': { es: 'pequeno', fr: 'petit', de: 'klein', it: 'piccolo', pt: 'pequeno' },
  'medium': { es: 'mediano', fr: 'moyen', de: 'mittel', it: 'medio', pt: 'medio' },
  'large': { es: 'grande', fr: 'grand', de: 'gross', it: 'grande', pt: 'grande' },
  'x-large': { es: 'extra grande', fr: 'tres grand', de: 'sehr gross', it: 'extra grande', pt: 'extra grande' },
}

function translateVariant(variant: string, locale: string): string {
  if (locale === 'en') return variant
  const lower = variant.toLowerCase()
  const translation = variantTranslations[lower]
  if (translation && translation[locale]) {
    return translation[locale]
  }
  return variant
}

// Cart item component - receives translated title
function CartItem({ 
  line, 
  locale, 
  translatedTitle,
  translatedVariantTitle,
  onUpdate, 
  onRemove 
}: { 
  line: any
  locale: string
  translatedTitle: string
  translatedVariantTitle?: string
  onUpdate: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}) {
  const images = line.merchandise?.product?.images
  const image = images?.edges?.[0]?.node || null
  const productTitle = line.merchandise?.product?.title || 'Product'
  
  // Use AI translated title or fall back to variant translation or original
  const displayTitle = translatedTitle || productTitle
  const displayVariant = translatedVariantTitle || (line.merchandise.title !== 'Default Title' ? translateVariant(line.merchandise.title, locale) : null)
  
  return (
    <div className="flex gap-3 p-3 bg-secondary/30 rounded-lg">
      {image && (
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image?.altText || productTitle}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-medium text-sm truncate">
              {displayTitle}
            </h4>
            {displayVariant && (
              <p className="text-xs text-muted-foreground">
                {displayVariant}
              </p>
            )}
          </div>
          <p className="font-medium text-sm flex-shrink-0">
            {line.merchandise?.price ? formatPrice(
              line.merchandise.price.amount,
              line.merchandise.price.currencyCode
            ) : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 bg-transparent"
              onClick={() => onUpdate(line.id, Math.max(0, line.quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">
              {line.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 bg-transparent"
              onClick={() => onUpdate(line.id, line.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(line.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem } = useCart()
  const [translations, setTranslations] = useState<Record<string, TranslatedCartItem>>({})
  const [isPending, startTransition] = useTransition()

  const lines = cart?.lines.edges || []
  const total = cart?.cost.totalAmount
  const locale = getLocaleFromPath()
  const t = cartTranslations[locale] || cartTranslations.en
  
  // Free shipping progress
  const cartTotal = total ? parseFloat(total.amount) : 0
  const freeShippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0)
  const hasFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD

  // Translate cart items when cart changes or locale changes
  useEffect(() => {
    if (lines.length === 0 || locale === 'en') return
    
    const itemsToTranslate = lines.map(({ node: line }) => ({
      productId: line.merchandise?.product?.id || '',
      title: line.merchandise?.product?.title || '',
      variantTitle: line.merchandise.title !== 'Default Title' ? line.merchandise.title : undefined,
    }))
    
    startTransition(async () => {
      try {
        const results = await translateCartItems(itemsToTranslate, locale, 'en')
        const translationsMap: Record<string, TranslatedCartItem> = {}
        for (const result of results) {
          translationsMap[result.productId] = result
        }
        setTranslations(translationsMap)
      } catch (error) {
        console.error('Failed to translate cart items:', error)
      }
    })
  }, [lines, locale])

  // Hide/show Intercom when cart opens/closes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Intercom) {
      if (isOpen) {
        window.Intercom('update', { hide_default_launcher: true })
      } else {
        window.Intercom('update', { hide_default_launcher: false })
      }
    }
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0">
        <SheetHeader className="p-4 sm:p-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            {t.yourCart} ({lines.length})
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center p-4 sm:p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <div>
              <p className="text-lg font-medium">{t.emptyCart}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {t.emptyCartDesc}
              </p>
            </div>
            <Button onClick={closeCart} variant="outline" className="bg-transparent">
              {t.continueShopping}
            </Button>
          </div>
        ) : (
          <>
            {/* Urgency banners - compact */}
            <div>
              {/* Free shipping progress bar */}
              <div className="px-4 py-2 bg-green-50 border-b border-green-100">
                {hasFreeShipping ? (
                  <div className="flex items-center gap-2 text-green-700">
                    <Truck className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs font-medium">{t.freeShippingUnlocked}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          {t.addMore.replace('{amount}', `€${amountToFreeShipping.toFixed(2)}`)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500 rounded-full"
                          style={{ width: `${freeShippingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Limited stock warning */}
              <div className="px-4 py-1.5 bg-orange-50 border-b border-orange-100">
                <p className="text-xs text-orange-700 flex items-center gap-1.5">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  {t.limitedStock}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="space-y-2">
                {lines.map(({ node: line }) => {
                  const productId = line.merchandise?.product?.id || ''
                  const translation = translations[productId]
                  return (
                    <CartItem
                      key={line.id}
                      line={line}
                      locale={locale}
                      translatedTitle={translation?.translatedTitle || line.merchandise?.product?.title || 'Product'}
                      translatedVariantTitle={translation?.translatedVariantTitle}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                    />
                  )
                })}
              </div>
            </div>

            <div className="border-t p-4 space-y-3 bg-background mt-auto">
              <div className="flex justify-between text-base font-semibold">
                <span>{t.total}</span>
                <span>
                  {total
                    ? formatPrice(total.amount, total.currencyCode)
                    : '$0.00'}
                </span>
              </div>
              {cart?.checkoutUrl ? (
                <Button
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 text-sm py-5"
                  size="lg"
                  onClick={() => {
                    window.open(cart.checkoutUrl, '_blank')
                  }}
                >
                  {t.checkout}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90 text-sm py-5"
                  size="lg"
                  disabled
                >
                  {t.checkout}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" />
                {t.secureCheckout} · {t.shippingNote}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
