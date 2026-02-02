'use client'

import React from "react"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useOptimistic,
  startTransition,
  useMemo,
} from 'react'
import type { ShopifyCart, ProductVariant, Product } from '@/lib/shopify/types'

const CART_ID_KEY = 'shopify-cart-id'

type CartLine = ShopifyCart['lines']['edges'][number]['node']

type CartContextType = {
  cart: ShopifyCart | null
  isLoading: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variant: ProductVariant, product: Product) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalQuantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function getCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CART_ID_KEY)
}

function setCartIdStorage(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_ID_KEY, id)
}

// API helper functions that call our server-side route
async function cartApiCall(action: string, data: Record<string, unknown> = {}) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...data }),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Cart API error')
  }
  
  return response.json()
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cart,
    (state, newCart: ShopifyCart | null) => newCart
  )

  // Initialize cart
  useEffect(() => {
    async function initCart() {
      const cartId = getCartId()
      if (cartId) {
        try {
          const { cart: existingCart } = await cartApiCall('get', { cartId })
          if (existingCart) {
            setCart(existingCart)
            setIsLoading(false)
            return
          }
        } catch (error) {
          console.error('Error fetching cart:', error)
          // Clear invalid cart ID
          localStorage.removeItem(CART_ID_KEY)
        }
      }
      setIsLoading(false)
    }
    initCart()
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    async (variant: ProductVariant, product: Product) => {
      try {
        let currentCart = cart

        if (!currentCart) {
          // Create new cart via API
          const { cart: newCart } = await cartApiCall('create')
          currentCart = newCart
          setCartIdStorage(newCart.id)
          setCart(newCart)
        }

        // Ensure variant has a valid ID
        if (!variant?.id) {
          console.error('Variant has no ID')
          return
        }

        // Ensure images has correct format
        const productImages = product.images && product.images.edges 
          ? product.images 
          : { edges: [] };

        // Optimistic update
        const optimisticLine: CartLine = {
          id: `temp-${Date.now()}`,
          quantity: 1,
          merchandise: {
            ...variant,
            product: {
              title: product.title || 'Product',
              handle: product.handle || '',
              images: productImages,
            },
          },
        }

        const optimisticNewCart: ShopifyCart = {
          ...currentCart,
          checkoutUrl: currentCart.checkoutUrl,
          lines: {
            edges: [
              ...currentCart.lines.edges,
              { node: optimisticLine },
            ],
          },
        }

        startTransition(() => {
          setOptimisticCart(optimisticNewCart)
        })

        // Add to cart via API
        const { cart: updatedCart } = await cartApiCall('add', {
          cartId: currentCart.id,
          lines: [{ merchandiseId: variant.id, quantity: 1 }],
        })
        
        setCart(updatedCart)
        setIsOpen(true)
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    },
    [cart, setOptimisticCart]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return

      // Optimistic update
      const optimisticNewCart: ShopifyCart = {
        ...cart,
        checkoutUrl: cart.checkoutUrl,
        lines: {
          edges: cart.lines.edges.map((edge) =>
            edge.node.id === lineId
              ? { node: { ...edge.node, quantity } }
              : edge
          ),
        },
      }

      startTransition(() => {
        setOptimisticCart(optimisticNewCart)
      })

      try {
        const { cart: updatedCart } = await cartApiCall('update', {
          cartId: cart.id,
          lineId,
          quantity,
        })
        setCart(updatedCart)
      } catch (error) {
        console.error('Error updating cart:', error)
        setCart(cart)
      }
    },
    [cart, setOptimisticCart]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return

      // Optimistic update
      const optimisticNewCart: ShopifyCart = {
        ...cart,
        checkoutUrl: cart.checkoutUrl,
        lines: {
          edges: cart.lines.edges.filter((edge) => edge.node.id !== lineId),
        },
      }

      startTransition(() => {
        setOptimisticCart(optimisticNewCart)
      })

      try {
        const { cart: updatedCart } = await cartApiCall('remove', {
          cartId: cart.id,
          lineId,
        })
        setCart(updatedCart)
      } catch (error) {
        console.error('Error removing from cart:', error)
        setCart(cart)
      }
    },
    [cart, setOptimisticCart]
  )

  const totalQuantity = useMemo(() => {
    if (!optimisticCart) return 0
    return optimisticCart.lines.edges.reduce(
      (total, edge) => total + edge.node.quantity,
      0
    )
  }, [optimisticCart])

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        isLoading,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
