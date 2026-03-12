import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const categories = [
  { name: "Flowers", img: "/images/velvet_tulip.png", href: "/shop/flowers" },
  { name: "Scrolls", img: "/images/hero_scroll.png", href: "/shop/scrolls/1" },
  { name: "Memory Books", img: "/images/memory_book.png", href: "/shop/books/1" },
  { name: "Hampers", img: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg", href: "/shop/hampers" },
  { name: "Cards", img: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg", href: "/shop/cards" },
  { name: "Candles", img: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg", href: "/shop/candles" },
  { name: "Corporate", img: "https://i.pinimg.com/736x/69/c7/78/69c778a731cb0424aefb5b7a6ba485fb.jpg", href: "/shop/corporate" },
  { name: "Resin Art", img: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg", href: "/shop/resin" },
  { name: "Torans", img: "/images/toran.png", href: "/shop/toran" },
  { name: "Jewellery", img: "/images/jewellery.png", href: "/shop/jewellery" },
  { name: "Sketches", img: "/images/sketches.png", href: "/shop/sketches" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      
      {/* Dynamic Announcement Bar */}
      <div className="bg-foreground text-background text-[10px] uppercase tracking-[0.3em] py-2.5 text-center font-bold">
        Free Shipping on all Artisanal Bouquets today • Code: ARTISAN
      </div>

      <main className="flex-grow">
        {/* Hero Section: Editorial & Clean */}
        <section className="px-8 pt-12 pb-20 max-w-7xl mx-auto">
          <div className="relative aspect-[21/9] w-full premium-card premium-shadow bg-surface group overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
              style={{ backgroundImage: `url('/images/hero_scroll.png')` }}
            ></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4">
              <h1 className="font-serif text-white text-5xl md:text-8xl tracking-tighter drop-shadow-lg">
                The Physical Soul
              </h1>
              <p className="font-serif italic text-white/90 text-xl md:text-2xl max-w-xl drop-shadow-md">
                Handcrafted treasures delivered from our alley to your heart.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-foreground">
                  Shop Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Circular Category Nav: Quinn's Signature Style */}
        <section className="px-8 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <header className="mb-12 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground/80 lowercase italic">
                Let&apos;s explore the alley...
              </h2>
            </header>
            <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar snap-x touch-pan-x">
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.href} className="flex-shrink-0 group snap-center text-center space-y-3">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-foreground/5 p-1 group-hover:border-secondary transition-all">
                    <div 
                      className="w-full h-full rounded-full bg-cover bg-center bg-surface"
                      style={{ backgroundImage: `url(${cat.img})` }}
                    ></div>
                  </div>
                  <span className="block font-sans text-[10px] uppercase tracking-widest font-bold text-foreground/60 group-hover:text-foreground transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections: Scrolls & Memory Books */}
        <section className="bg-surface/50 py-32 px-8 border-y border-foreground/5">
          <div className="max-w-7xl mx-auto space-y-24">
            
            {/* Featured Section: The Stitched Scroll */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square lg:aspect-[4/5] premium-card premium-shadow overflow-hidden order-1">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-1000" 
                  style={{ backgroundImage: "url('/images/scroll_stitched_real.jpg')" }}
                ></div>
                <div className="absolute top-8 left-8 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
                  Top Seller
                </div>
              </div>
              <div className="space-y-8 order-2">
                <span className="text-secondary text-xs uppercase tracking-[0.4em] font-sans font-bold">Featured Collection</span>
                <h2 className="font-serif text-5xl lg:text-7xl leading-tight tracking-tighter">Letter Scrolls</h2>
                <p className="font-serif italic text-xl text-foreground/60 leading-relaxed max-w-lg">
                  &quot;Physical whispers of love, hand-lettered on chemically aged parchment and finished with a physical wax seal.&quot;
                </p>
                <div className="flex gap-4 items-center">
                  <Button variant="secondary" size="lg">Design Your Scroll</Button>
                  <Link href="/shop/scrolls/1" className="text-xs font-sans font-bold uppercase tracking-widest border-b border-foreground/20 hover:border-secondary transition-all pb-1">Learn the craft</Link>
                </div>
              </div>
            </div>

            {/* Featured Section: Memory Books */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                <span className="text-accent text-xs uppercase tracking-[0.4em] font-sans font-bold">Your Story, Bound</span>
                <h2 className="font-serif text-5xl lg:text-7xl leading-tight tracking-tighter">Memory Books</h2>
                <p className="font-serif italic text-xl text-foreground/60 leading-relaxed max-w-lg">
                  Hand-bound chronicles for your most cherished moments. Japanese stab stitching meets archival paper for a legacy that lasts.
                </p>
                <div className="flex gap-4 items-center">
                  <Button variant="primary" size="lg">Explore Albums</Button>
                   <Link href="/shop/books/1" className="text-xs font-sans font-bold uppercase tracking-widest border-b border-foreground/20 hover:border-accent transition-all pb-1">Inside the book</Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
                <div className="aspect-[3/4] premium-card premium-shadow overflow-hidden relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/scrapbook_friends_real.jpg')" }}></div>
                </div>
                <div className="aspect-[3/4] premium-card premium-shadow overflow-hidden relative translate-y-8">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/scrapbook_birthday_real.jpg')" }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
