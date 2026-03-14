"use client";

import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category?: string;
  aspectRatio?: string;
};

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  aspectRatio = "aspect-square",
}: ProductCardProps) {
  const { cart, addToCart, decreaseQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className="group flex flex-col">
      {/* Image card */}
      <div className={`${aspectRatio} premium-card premium-shadow bg-surface mb-5 relative overflow-hidden`}>
        {/* Product image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[8px] uppercase tracking-widest font-sans font-bold text-secondary rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Cart badge — top right, shows when qty > 0 */}
        {qty > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-secondary text-white text-[10px] font-bold font-sans w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              {qty}
            </span>
          </div>
        )}

        {/* Bottom action overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
          {qty === 0 ? (
            /* Quick Add — slides up on hover */
            <button
              onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
              className="w-full bg-white/95 backdrop-blur-md text-foreground py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest 
                         opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 
                         transition-all duration-300 hover:bg-secondary hover:text-white shadow-lg"
            >
              Quick Add
            </button>
          ) : (
            /* Quantity stepper — compact + professional */
            <div className="flex items-center gap-0 bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-foreground/5 transition-all duration-300">
              {/* Minus */}
              <button
                onClick={() => decreaseQuantity(id)}
                className="flex-1 h-10 flex items-center justify-center text-foreground/60 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 font-bold text-base border-r border-foreground/10"
                aria-label="Decrease quantity"
              >
                <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor">
                  <rect width="12" height="2" rx="1"/>
                </svg>
              </button>

              {/* Count */}
              <div className="flex-shrink-0 w-12 flex flex-col items-center justify-center h-10">
                <span className="font-bold text-sm text-foreground leading-none">{qty}</span>
                <span className="text-[8px] uppercase tracking-wider text-foreground/40 font-sans leading-none mt-0.5">qty</span>
              </div>

              {/* Plus */}
              <button
                onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
                className="flex-1 h-10 flex items-center justify-center text-foreground/60 hover:bg-secondary hover:text-white transition-colors duration-200 font-bold text-base border-l border-foreground/10"
                aria-label="Increase quantity"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="5" width="2" height="12" rx="1"/>
                  <rect y="5" width="12" height="2" rx="1"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product info */}
      <h3 className="font-serif text-xl tracking-tight mb-1 group-hover:text-secondary transition-colors duration-300">
        {name}
      </h3>
      <p className="font-sans text-sm text-foreground/40 font-medium">{price}</p>
    </div>
  );
}
