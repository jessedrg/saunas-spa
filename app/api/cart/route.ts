import { NextRequest, NextResponse } from 'next/server'
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from '@/lib/shopify'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, cartId, lines, lineId, quantity } = body

    console.log('[v0] Cart API called with action:', action)

    switch (action) {
      case 'create': {
        const cart = await createCart()
        console.log('[v0] Cart created:', cart.id, 'checkoutUrl:', cart.checkoutUrl)
        return NextResponse.json({ cart })
      }

      case 'add': {
        if (!cartId || !lines) {
          return NextResponse.json({ error: 'Missing cartId or lines' }, { status: 400 })
        }
        const cart = await addCartLines(cartId, lines)
        console.log('[v0] Lines added to cart, checkoutUrl:', cart.checkoutUrl)
        return NextResponse.json({ cart })
      }

      case 'update': {
        if (!cartId || !lineId || quantity === undefined) {
          return NextResponse.json({ error: 'Missing cartId, lineId, or quantity' }, { status: 400 })
        }
        const cart = await updateCartLines(cartId, [{ id: lineId, quantity }])
        console.log('[v0] Cart line updated')
        return NextResponse.json({ cart })
      }

      case 'remove': {
        if (!cartId || !lineId) {
          return NextResponse.json({ error: 'Missing cartId or lineId' }, { status: 400 })
        }
        const cart = await removeCartLines(cartId, [lineId])
        console.log('[v0] Cart line removed')
        return NextResponse.json({ cart })
      }

      case 'get': {
        if (!cartId) {
          return NextResponse.json({ error: 'Missing cartId' }, { status: 400 })
        }
        const cart = await getCart(cartId)
        return NextResponse.json({ cart })
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('[v0] Cart API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
