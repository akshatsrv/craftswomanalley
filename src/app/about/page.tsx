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
          <div className="font-sans text-lg text-foreground/70 leading-loose text-justify space-y-12">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-foreground italic">The Beginning</h2>
              <p>
                CraftswomanAlley didn&apos;t start in a boardroom; it started in a quiet corner of a home, surrounded by scraps of vintage paper, dried petals, and a growing frustration with a world that felt increasingly &quot;plastic.&quot; We noticed that as our lives moved more onto screens, the physical objects we held were losing their pulse. The idea was simple: to create a narrow path—an alley—away from the noise of mass production, where every object still carries the warmth of the hand that made it.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-foreground italic">The Vision</h2>
              <p>
                Our core belief is that the most beautiful things are born from the human hand and the physical soul. We saw countless talented female artisans across India creating breathtaking work in isolation. We chose to bring them together into a single community. CraftswomanAlley exists to bridge the gap between these rural and urban creators and the people who seek objects with meaning. For us, it&apos;s not about &quot;products&quot;; it&apos;s about preserving the &quot;Slow Craft&quot; legacy.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-surface/50 border border-foreground/5 rounded-2xl italic">
              <h2 className="font-serif text-3xl text-foreground not-italic mb-4 text-center">Why we are the Right Choice</h2>
              <p>
                In an era of instant gratification, we choose intentionality. When you pick something from our alley, you aren&apos;t just buying an item; you are supporting a woman&apos;s livelihood, preserving a traditional skill, and owning something that cannot be replicated by a machine. Whether it is a hand-lettered scroll to say &quot;I love you&quot; or a stitched memory book to hold your life&apos;s highlights, we are the choice for those who believe that the best gifts aren&apos;t just given—they are felt.
              </p>
            </div>

            <p className="text-center font-serif text-xl text-neutral-900 border-t border-neutral-100 pt-8 uppercase tracking-widest text-sm">
              Handcrafted with devotion. Delivered from our alley to your heart.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
