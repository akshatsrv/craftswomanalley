import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function JewelleryPage() {
  const products = [
    { id: 1, name: "Terracotta Statement Necklace", price: "₹1,850", img: "/images/jewellery.png" },
    { id: 2, name: "Hand-Painted Earth Earrings", price: "₹650", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Artisanal Bead Bracelet", price: "₹450", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "Tribal Accent Jhumkas", price: "₹950", img: "/images/jewellery.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-24 px-8 max-w-7xl mx-auto w-full">
        <header className="mb-20 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary">Wearable Soul</span>
          <h1 className="font-serif text-6xl tracking-tighter text-foreground">Artisanal Jewellery</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto">Handcrafted adornments inspired by tradition and earth.</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[3/4] premium-card premium-shadow bg-surface mb-6 relative group overflow-hidden border border-foreground/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${product.img})` }}></div>
              </div>
              <h3 className="font-serif text-xl tracking-tight mb-1 group-hover:text-secondary transition-colors">{product.name}</h3>
              <p className="font-sans text-sm text-foreground/40 font-medium">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
