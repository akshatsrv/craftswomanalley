"use client";

import Link from "next/link";
import { useRef } from "react";

const categories = [
  { name: "Flowers", img: "/images/velvet_tulip.png", href: "/shop/flowers" },
  { name: "Scrolls", img: "/images/hero_scroll.png", href: "/shop/scrolls" },
  { name: "Journals", img: "/images/personalised-journal/journal_cover.jpg", href: "/shop/books" },
  { name: "Hampers", img: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg", href: "/shop/hampers" },
  { name: "Cards", img: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg", href: "/shop/cards" },
  { name: "Candles", img: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg", href: "/shop/candles" },
  { name: "Corporate", img: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg", href: "/shop/corporate" },
  { name: "Resin Art", img: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg", href: "/shop/resin" },
  { name: "Torans", img: "/images/toran.png", href: "/shop/toran" },
  { name: "Jewellery", img: "/images/jewellery.png", href: "/shop/jewellery" },
  { name: "Sketches", img: "/images/sketches.png", href: "/shop/sketches" },
];

export function CategoryStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      <div className="relative">

        {/* Left fade + arrow */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 flex items-center justify-start pl-1 pointer-events-none">
          <button
            onClick={scroll.bind(null, "left")}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white shadow-md border border-foreground/8 flex items-center justify-center hover:border-secondary hover:text-secondary transition-all"
            aria-label="Scroll left"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Right fade + arrow */}
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 flex items-center justify-end pr-1 pointer-events-none">
          <button
            onClick={scroll.bind(null, "right")}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white shadow-md border border-foreground/8 flex items-center justify-center hover:border-secondary hover:text-secondary transition-all"
            aria-label="Scroll right"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-4 thin-scrollbar snap-x touch-pan-x px-10"
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex-shrink-0 group snap-center flex flex-col items-center gap-2"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-surface border-2 border-transparent group-hover:border-secondary transition-all duration-300 group-hover:-translate-y-1 p-0.5">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground/55 group-hover:text-secondary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
