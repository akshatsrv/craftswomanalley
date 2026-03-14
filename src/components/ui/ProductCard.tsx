"use client";

import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category?: string;
  aspectRatio?: string;
  priority?: boolean;
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
      <div
        className={`${aspectRatio} premium-card premium-shadow bg-surface mb-6 relative overflow-hidden`}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Category badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest font-sans font-bold text-secondary rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Overlay action area */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          {qty === 0 ? (
            /* Quick Add — slides up on hover */
            <button
              onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
              className="w-full bg-white/90 backdrop-blur-md text-foreground py-3 rounded-xl text-xs font-bold uppercase tracking-widest 
                         opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
                         transition-all duration-300 hover:bg-secondary hover:text-white"
            >
              Quick Add
            </button>
          ) : (
            /* Quantity stepper — always visible once added */
            <div
              className="flex items-center justify-between bg-white/95 backdrop-blur-md rounded-xl shadow-lg 
                         transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Decrease / Remove */}
              <button
                onClick={() => decreaseQuantity(id)}
                className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-xl rounded-l-xl"
                aria-label="Remove one"
              >
                −
              </button>

              {/* Quantity display */}
              <span className="flex-1 text-center font-sans font-bold text-sm text-foreground">
                {qty} in cart
              </span>

              {/* Increase */}
              <button
                onClick={() => addToCart({ id, name, price, image, quantity: 1 })}
                className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary hover:text-white transition-colors font-bold text-xl rounded-r-xl"
                aria-label="Add one more"
              >
                +
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
