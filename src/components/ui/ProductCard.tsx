"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

type ProductCardProps = {
  id: string | number;
  name: string;
  price: string | number;
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
  const displayPrice = typeof price === 'number' ? `₹${price.toLocaleString()}` : price;
  const { cart, addToCart, decreaseQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem?.quantity ?? 0;

  const CardContent = (
    <>
      <div className={`${aspectRatio} relative overflow-hidden group/img mb-6 rounded-[2rem] bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover/img:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Posterized Style Badge */}
        <div className="absolute top-5 left-5 z-10">
            <span className="bg-white/95 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-[0.3em] font-black text-secondary rounded-full shadow-sm">
                {category || "Original"}
            </span>
        </div>

        {/* Floating Action Circle (Quinns Style) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-500 scale-90 group-hover/img:scale-100">
           {qty === 0 ? (
             <button
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 addToCart({ id, name, price: displayPrice, image, quantity: 1 });
               }}
               className="w-14 h-14 bg-white text-foreground rounded-full shadow-2xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all transform active:scale-90"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
             </button>
           ) : (
             <div className="flex items-center bg-white rounded-full shadow-2xl p-1 h-12">
               <button
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   decreaseQuantity(id);
                 }}
                 className="w-10 h-10 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors rounded-full"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"/></svg>
               </button>
               <div className="w-8 text-center font-black text-xs">{qty}</div>
               <button
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   addToCart({ id, name, price: displayPrice, image, quantity: 1 });
                 }}
                 className="w-10 h-10 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors rounded-full"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
               </button>
             </div>
           )}
        </div>
      </div>

      <div className="space-y-1.5 px-1">
        <h3 className="font-serif text-lg text-foreground font-semibold tracking-tight leading-snug group-hover:text-secondary transition-colors duration-300">
          {name}
        </h3>
        <p className="font-sans text-sm font-bold text-foreground tracking-wide">{displayPrice}</p>
      </div>
    </>
  );

  return (
    <div className="group flex flex-col relative h-full">
      <Link href={href || `/shop/product/${id}`} className="flex flex-col h-full">
        {CardContent}
      </Link>
    </div>
  );
}
