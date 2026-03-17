"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

type ProductCardProps = {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category?: string;
  aspectRatio?: string;
  href?: string;
};

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  aspectRatio = "aspect-square",
  href,
}: ProductCardProps) {
  const { cart, addToCart, decreaseQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem?.quantity ?? 0;

  const CardContent = (
    <>
      <div className={`${aspectRatio} premium-card premium-shadow bg-surface mb-5 relative overflow-hidden`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 text-[8px] uppercase tracking-widest font-sans font-bold text-secondary rounded-full">
              {category}
            </span>
          </div>
        )}
        {qty > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-secondary text-white text-[10px] font-bold font-sans w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              {qty}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-serif text-xl tracking-tight mb-1 group-hover:text-secondary transition-colors duration-300">
        {name}
      </h3>
      <p className="font-sans text-sm text-foreground/40 font-medium">{price}</p>
    </>
  );

  return (
    <div className="group flex flex-col relative h-full">
      {href ? (
        <Link href={href} className="flex flex-col h-full">
          {CardContent}
        </Link>
      ) : (
        <div className="flex flex-col h-full">{CardContent}</div>
      )}

      {/* Action overlay — positioned absolutely within the group */}
      <div className="absolute top-0 right-0 left-0 h-0 pointer-events-none group-hover:h-auto z-20">
         <div className="mt-[220px] px-3 pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
           {qty === 0 ? (
             <button
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 addToCart({ id, name, price, image, quantity: 1 });
               }}
               className="w-full bg-white/95 backdrop-blur-md text-foreground py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest 
                          translate-y-3 group-hover:translate-y-0 shadow-lg hover:bg-secondary hover:text-white transition-all"
             >
               Quick Add
             </button>
           ) : (
             <div className="flex items-center gap-0 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-foreground/5 overflow-hidden">
               <button
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   decreaseQuantity(id);
                 }}
                 className="flex-1 h-10 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors border-r border-foreground/10"
               >
                 -
               </button>
               <div className="w-10 text-center font-bold text-sm">{qty}</div>
               <button
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   addToCart({ id, name, price, image, quantity: 1 });
                 }}
                 className="flex-1 h-10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors border-l border-foreground/10"
               >
                 +
               </button>
             </div>
           )}
         </div>
      </div>
    </div>
  );
}
