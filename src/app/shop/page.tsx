import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";

const categories = [
  { name: "Bouquets & Flowers", count: "12 Items", href: "/shop/flowers", image: "/images/velvet_tulip.png" },
  { name: "Antique Scrolls", count: "8 Items", href: "/shop/scrolls", image: "/images/hero_scroll.png" },
  { name: "Hand-Bound Journals & Scrapbooks", count: "Bespoke", href: "/shop/books/personalised-journal", image: "/images/personalised-journal/journal_cover.jpg" },
  { name: "Gift Hampers", count: "10 Items", href: "/shop/hampers", image: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg" },
  { name: "Handmade Cards", count: "24 Items", href: "/shop/cards", image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg" },
  { name: "Artisan Candles", count: "6 Items", href: "/shop/candles", image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg" },
  { name: "Corporate Gifts", count: "Bespoke", href: "/shop/corporate", image: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg" },
  { name: "Resin Art", count: "7 Items", href: "/shop/resin", image: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg" },
  { name: "Traditional Torans", count: "8 Items", href: "/shop/toran", image: "/images/toran.png" },
  { name: "Artisanal Jewellery", count: "15 Items", href: "/shop/jewellery", image: "/images/jewellery.png" },
  { name: "Custom Sketches", count: "Personalised", href: "/shop/sketches", image: "/images/sketches.png" },
];

export default function ShopIndex() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      
      <main className="flex-grow py-24 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">The Collections</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground">Artisanal Archive</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto leading-relaxed">
            Every piece in our alley is a tribute to slow craft and the physical soul.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group relative aspect-[3/4] overflow-hidden premium-card premium-shadow bg-surface border border-foreground/5">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors"></div>
              
              <div className="absolute inset-x-8 bottom-12 space-y-2">
                 <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/60 font-bold">{cat.count}</p>
                 <h3 className="font-serif text-4xl text-white tracking-tight drop-shadow-md">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
