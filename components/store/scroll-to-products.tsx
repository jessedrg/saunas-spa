"use client";

import { ArrowRight } from "lucide-react";

interface ScrollToProductsButtonProps {
  text: string;
  className?: string;
}

export function ScrollToProductsButton({ text, className }: ScrollToProductsButtonProps) {
  const handleClick = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
