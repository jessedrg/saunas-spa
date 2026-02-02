'use client'

import { useTransition } from "react"

import React, { useState } from "react"

import { Plus, Loader2 } from 'lucide-react'
import type { Product, ProductVariant } from '@/lib/shopify/types'
import { useMemo } from 'react'
import { useCart } from './cart-context'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface AddToCartProps {
  product: Product
  selectedVariant?: ProductVariant | null
  className?: string
}

const getBaseProductVariant = (product: Product): ProductVariant => {
  return {
    id: product.id,
    title: product.title,
    availableForSale: product.availableForSale,
    selectedOptions: [],
    price: product.priceRange.minVariantPrice,
  }
}

export function AddToCart({
  product,
  selectedVariant,
  className,
}: AddToCartProps) {
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const resolvedVariant = useMemo(() => {
    if (selectedVariant) return selectedVariant
    const variants = Array.isArray(product.variants) ? product.variants : []
    if (variants.length === 0) return getBaseProductVariant(product)
    if (variants.length === 1) return variants[0]
    return variants[0]
  }, [selectedVariant, product])

  const isDisabled = !product.availableForSale || !resolvedVariant || isLoading

  // Ensure product has proper images format for cart
  const normalizedProduct: Product = {
    ...product,
    images: product.images || { edges: [] },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resolvedVariant) {
      console.log('[v0] No resolvedVariant, cannot add to cart')
      return
    }
    
    console.log('[v0] AddToCart: Adding variant', resolvedVariant.id, 'to cart')
    
    setIsLoading(true)
    try {
      await addItem(resolvedVariant, normalizedProduct)
      console.log('[v0] AddToCart: Item added successfully')
    } catch (error) {
      console.error('[v0] AddToCart error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      <Button
        type="submit"
        disabled={isDisabled}
        className={cn(
          'w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90',
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {!product.availableForSale ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </form>
  )
}
