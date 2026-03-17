import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Image Section */}
        <section className="relative h-[60vh] w-full overflow-hidden">
          <Image 
            src="/images/about/workshop.png" 
            alt="Artisanal Workshop" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter">Our Story</h1>
          </div>
        </section>

        <section className="py-24 px-8 max-w-6xl mx-auto space-y-32">
          {/* Intro Text */}
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 leading-relaxed">
              CraftswomanAlley was born from a simple belief: the most beautiful things in the world are born from the human hand and the physical soul.
            </p>
            <div className="h-px w-20 bg-accent mx-auto"></div>
          </div>

          {/* Section 1: The Beginning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl text-foreground italic">The Beginning</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                CraftswomanAlley didn&apos;t start in a boardroom; it started in a quiet corner of a home, surrounded by scraps of vintage paper, dried petals, and a growing frustration with a world that felt increasingly &quot;plastic.&quot; We noticed that as our lives moved more onto screens, the physical objects we held were losing their pulse.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                The idea was simple: to create a narrow path—an alley—away from the noise of mass production, where every object still carries the warmth of the hand that made it.
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden premium-shadow group">
              <Image 
                src="/images/about/the-beginning.png" 
                alt="The Beginning - Quiet Corner" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>

          {/* Section 2: The Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden premium-shadow group order-2 md:order-1">
              <Image 
                src="/images/about/story-art-1.png" 
                alt="Artistic Blocks" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="font-serif text-4xl text-foreground italic">The Vision</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Our core belief is that the most beautiful things are born from the human hand and the physical soul. We saw countless talented female artisans across India creating breathtaking work in isolation. 
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We chose to bring them together into a single community. CraftswomanAlley exists to bridge the gap between these rural and urban creators and the people who seek objects with meaning. For us, it&apos;s not about &quot;products&quot;; it&apos;s about preserving a legacy.
              </p>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="max-w-4xl mx-auto space-y-12 py-16 px-8 md:px-16 bg-surface/50 border border-foreground/5 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            <h2 className="font-serif text-4xl text-foreground text-center">Why we are the Right Choice</h2>
            <p className="font-serif italic text-xl md:text-2xl text-foreground/70 text-center leading-relaxed">
              &quot;In an era of instant gratification, we choose intentionality. When you pick something from our alley, you aren&apos;t just buying an item; you are supporting a woman&apos;s livelihood and owning something that cannot be replicated by a machine.&quot;
            </p>
            <div className="flex justify-center pt-4">
              <p className="text-xs font-sans font-bold uppercase tracking-[0.4em] text-accent">Intentional Gifting • Handcrafted Legacy</p>
            </div>
          </div>

          <p className="text-center font-serif text-2xl text-foreground/90 pt-16 uppercase tracking-[0.2em]">
            Handcrafted with devotion.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
