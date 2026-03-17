import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <section className="py-24 px-8 max-w-4xl mx-auto text-center space-y-12">
          <h1 className="font-serif text-5xl lg:text-7xl">Our Story</h1>
          <p className="font-serif italic text-2xl text-foreground/70 leading-relaxed">
            CraftswomanAlley was born from a simple belief: the most beautiful things in the world are born from the human hand and the physical soul.
          </p>
          <div className="h-px w-20 bg-accent mx-auto"></div>
          <div className="font-sans text-lg text-foreground/70 leading-loose text-justify space-y-8 italic">
            <p>
              CraftswomanAlley is more than just a store—it is a community of talented female artisans who breathe life into the ordinary through the magic of their hands. Our alley is a curated collection of treasures, crafted not by machines or factories, but with the soul, patience, and authentic heritage of Indian craftsmanship.
            </p>
            <p>
              We believe in the power of the &quot;Slow Craft&quot; movement—where every hand-twisted wire bloom and every ink-stained parchment scroll is a work of art. By honoring natural materials like linen, hand-pressed flowers, and pure silk, we create legacies that carry your most intimate stories across generations.
            </p>
            <p className="text-center font-serif not-italic text-xl text-neutral-900 border-t border-neutral-100 pt-8 uppercase tracking-widest text-sm">
              Thank you for supporting the slow craft movement and the women who keep these traditions alive.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
