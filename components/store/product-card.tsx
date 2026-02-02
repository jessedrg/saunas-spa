"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Locale, getT } from "@/lib/seo-lite";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name?: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviews: number;
    badge: 'bestseller' | 'new' | 'sale' | null;
    inStock: boolean;
    freeShipping: boolean;
    images: string[];
  };
  locale: Locale;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const t = getT(locale);
  const productName = product.name || product.slug;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const badgeStyles = {
    bestseller: 'bg-foreground text-background',
    new: 'bg-accent text-accent-foreground',
    sale: 'bg-destructive text-destructive-foreground',
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] bg-muted rounded-xl overflow-hidden mb-4">
        <Image src={product.images[0] || '/placeholder.svg'} alt={productName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

        {product.badge && (
          <span className={cn("absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full", badgeStyles[product.badge])}>
            {product.badge}
          </span>
        )}

        <button onClick={() => setIsWishlisted(!isWishlisted)} className={cn("absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100", isWishlisted && "opacity-100")} aria-label="Add to wishlist">
          <Heart className={cn("h-4 w-4 transition-colors", isWishlisted ? "fill-destructive text-destructive" : "text-foreground")} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Button className="w-full h-10 text-xs font-medium" onClick={handleAddToCart} disabled={isAdded}>
            {isAdded ? <><Check className="mr-2 h-4 w-4" />Added</> : <><ShoppingBag className="mr-2 h-4 w-4" />{t.shop}</>}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Link href={`/${locale === 'en' ? '' : locale + '/'}product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium leading-tight hover:text-accent transition-colors line-clamp-2">{productName}</h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className={cn("h-3 w-3", i <= Math.round(product.rating) ? "text-foreground fill-current" : "text-border fill-current")} viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-xs font-medium text-accent">-{discount}%</span>
            </>
          )}
        </div>

        {product.freeShipping && <p className="text-[10px] text-accent font-medium uppercase tracking-wider">{t.shipping}</p>}
      </div>
    </article>
  );
}
