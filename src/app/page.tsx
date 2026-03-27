import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryStrip } from "@/components/ui/CategoryStrip";
import { products } from "@/data/products";
import Link from "next/link";


const occasions = [
  { name: "Weddings", img: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg", tag: "Eternal Love", href: "/shop/hampers" },
  { name: "Birthdays", img: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg", tag: "Fresh Journeys", href: "/shop/flowers" },
  { name: "Anniversaries", img: "/images/personalised-journal/journal_cover.jpg", tag: "Shared Souls", href: "/shop/books" },
  { name: "Corporate", img: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg", tag: "Alley Bonds", href: "/shop/corporate" },
];

export default function Home() {
  const trendingProducts = [
    products["personalised-journal"],
    products["flower-1"],
    products["scroll-1"],
    products["candle-1"],
  ].filter(Boolean);

  const keepsakes = Object.values(products).filter((p) =>
    ["Hand-Bound Journals & Scrapbooks", "Antique Scrolls", "Resin Art", "Custom Sketches"].includes(p.category)
  );

  const blooms = Object.values(products).filter((p) =>
    ["Ever-lasting Blooms", "Artisan Candles", "Gift Hampers", "Handmade Cards", "Traditional Torans", "Artisanal Jewellery"].includes(p.category)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] overflow-x-hidden">
      <Navigation />

      <main className="flex-grow">

        {/* ── CIRCULAR CATEGORY NAV ── */}
        <CategoryStrip />

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-[62vh]">
            <div className="lg:col-span-8 relative rounded-[2rem] overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-105"
                style={{ backgroundImage: `url('/images/hero_scroll.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <h1 className="font-serif text-6xl md:text-8xl tracking-tighter mb-6 leading-[0.88]">
                  The Physical <br /> Soul.
                </h1>
                <Link
                  href="/shop"
                  className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-white/50 pb-1 w-fit hover:border-white transition-all"
                >
                  Browse the Archive
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex-grow relative rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/personalised-journal/journal_cover.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute inset-6 flex flex-col justify-end">
                  <p className="text-white font-serif italic text-xl mb-1">Bespoke Bound</p>
                  <Link href="/shop/books" className="text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors">Commission Yours →</Link>
                </div>
              </div>
              <div className="flex-grow relative rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/velvet_tulip.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                <div className="absolute inset-6 flex flex-col justify-end">
                  <p className="text-white font-serif italic text-xl mb-1">Ever-lasting</p>
                  <Link href="/shop/flowers" className="text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors">Shop Blooms →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALLEY FAVORITES ── */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] block mb-2">Curated Selection</span>
              <h2 className="font-serif text-5xl md:text-6xl tracking-tighter italic text-foreground">Alley Favorites</h2>
            </div>
            <Link href="/shop" className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-foreground hover:border-secondary transition-all pb-1">
              Explore All
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* ── MARQUEE 1: KEEPSAKES ── */}
        <section className="mb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
            <div>
              <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] block mb-2">Memories Preserved</span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter italic text-foreground">Handcrafted Keepsakes</h2>
            </div>
            <Link href="/shop" className="text-sm font-black uppercase tracking-[0.3em] text-foreground/50 hover:text-secondary transition-colors pb-1 border-b border-foreground/20">Browse All</Link>
          </div>
          <div className="flex overflow-hidden">
            <div className="marquee-track flex gap-5 flex-nowrap" style={{ width: "max-content" }}>
              {[...keepsakes, ...keepsakes].map((product, index) => (
                <Link
                  key={`k-${product.id}-${index}`}
                  href={`/shop/product/${product.id}`}
                  className="group relative flex-shrink-0 w-56 h-72 rounded-[1.8rem] overflow-hidden bg-surface shadow-sm"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${product.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="text-white text-xs font-black uppercase tracking-[0.2em] leading-snug">{product.name}</p>
                    <p className="text-white/80 text-sm font-serif italic mt-1">{typeof product.price === "number" ? `₹${product.price}` : product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE 2: BLOOMS ── */}
        <section className="mb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
            <div>
              <span className="text-accent text-xs font-black uppercase tracking-[0.4em] block mb-2">Nature & Warmth</span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter italic text-foreground">Blooms, Candles & Gifts</h2>
            </div>
            <Link href="/shop" className="text-sm font-black uppercase tracking-[0.3em] text-foreground/50 hover:text-accent transition-colors pb-1 border-b border-foreground/20">Browse All</Link>
          </div>
          <div className="flex overflow-hidden">
            <div className="marquee-track-reverse flex gap-5 flex-nowrap" style={{ width: "max-content" }}>
              {[...blooms, ...blooms].map((product, index) => (
                <Link
                  key={`b-${product.id}-${index}`}
                  href={`/shop/product/${product.id}`}
                  className="group relative flex-shrink-0 w-56 h-72 rounded-[1.8rem] overflow-hidden bg-surface shadow-sm"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${product.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="text-white text-xs font-black uppercase tracking-[0.2em] leading-snug">{product.name}</p>
                    <p className="text-white/80 text-sm font-serif italic mt-1">{typeof product.price === "number" ? `₹${product.price}` : product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOP BY OCCASION ── */}
        <section className="bg-surface border-y border-foreground/8 py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-14">
              <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] block mb-3">Orchestrate the Moment</span>
              <h2 className="font-serif text-5xl md:text-6xl tracking-tighter italic text-foreground">Shop by Occasion</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {occasions.map((occ) => (
                <Link
                  key={occ.name}
                  href={occ.href}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-foreground/5"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${occ.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-7 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black mb-2 text-white/60">{occ.tag}</span>
                    <h3 className="font-serif text-3xl tracking-tight">{occ.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BESPEAK CTA ── */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="relative bg-foreground rounded-[3rem] py-20 px-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
              <span className="text-secondary text-xs font-black uppercase tracking-[0.5em] block">The Ultimate Personalization</span>
              <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tighter leading-[0.9]">
                Something truly unique <br />
                awaits your <span className="italic text-secondary">ordinance.</span>
              </h2>
              <p className="text-white/50 font-serif italic text-xl max-w-xl mx-auto">
                Not seeing exactly what your soul envisions? We architect memories from scratch.
              </p>
              <Link
                href="/bespeak"
                className="inline-block px-10 py-5 bg-secondary text-white rounded-2xl text-sm font-black uppercase tracking-[0.3em] hover:bg-white hover:text-foreground transition-all hover:scale-105 active:scale-95"
              >
                Start Bespeak Order
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
