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
          <div className="font-sans text-lg text-foreground/70 leading-loose text-justify space-y-8">
            <p>
              In a world that increasingly moves toward the digital and the ephemeral, we choose to celebrate the slow, the tactile, and the permanent. Our alley is a curated space for female artisans who weave, dye, letter, and bind stories into objects.
            </p>
            <p>
              From the fuzzy wire blooms that never fade to the antique scrolls that carry your most intimate words, every piece is a legacy. We believe in the power of natural materials—linen, kraft paper, hand-pressed flowers, and silk.
            </p>
            <p>
              Thank you for supporting the slow craft movement.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
