import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-4xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary block w-full text-center">Policies</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">Shipping & Returns</h1>
        </header>

        <article className="prose-lg font-sans text-foreground/60 space-y-16">
          <section className="space-y-6">
            <h2 className="font-serif text-3xl text-foreground">Artisanal Patience</h2>
            <p>Every item at CraftswomanAlley is handmade to order. This slow craft process takes time. Please expect your treasures to arrive within 10-15 business days.</p>
          </section>

          <section className="space-y-6 border-t border-foreground/5 pt-16">
            <h2 className="font-serif text-3xl text-foreground">Returns & Exchanges</h2>
            <p>Due to the personalized nature of our products (scrolls, books, custom art), we do not offer returns or exchanges unless the item arrives damaged.</p>
            <p>If your item arrives in anything less than perfect condition, please contact us within 48 hours of delivery at hello@craftswomanalley.com.</p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
