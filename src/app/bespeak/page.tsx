import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";

export default function BespeakPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navigation />
      
      <main className="flex-grow">
        {/* HERO SECTION - THE MANIFESTO */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center px-8 py-20 overflow-hidden bg-surface">
          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-foreground text-surface text-[9px] font-black uppercase tracking-[0.5em] mb-4">
              The Bespeak Ordinance
            </div>
            <h1 className="font-serif text-5xl md:text-8xl text-foreground leading-[0.85] tracking-tighter">
              Crafting <br/>
              <span className="italic text-secondary">Absolution.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 font-serif italic max-w-2xl mx-auto pt-6">
              "We do not merely customize. We exhume the stories trapped in your soul and bind them into physical existence."
            </p>
            <div className="pt-10 flex flex-col items-center gap-6">
              <div className="w-px h-16 bg-gradient-to-b from-secondary to-transparent" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary opacity-60">Scroll to Enter</span>
            </div>
          </div>
        </section>

        {/* THE THREE PILARS OF BESPEAK */}
        <section className="py-20 md:py-24 px-4 md:px-8 border-y border-foreground/5 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {/* Pillar 1 */}
              <div className="space-y-6 group">
                <div className="aspect-[4/5] bg-surface rounded-[2rem] overflow-hidden relative border border-foreground/5 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=30&w=300&auto=format&fit=crop" 
                    alt="Conceptual Architecture" 
                    className="object-contain w-full h-full p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl italic">I. Conceptual Architecture</h3>
                <p className="text-[13px] font-sans font-medium text-foreground/50 leading-relaxed italic">
                  "Your narrative is exhumed and architected into an intricate blueprint. We sequence every layer, shadow, and resonance before the first medium is chosen."
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-6 group">
                <div className="aspect-[4/5] bg-surface rounded-[2rem] overflow-hidden relative border border-foreground/5 shadow-md">
                  <img 
                    src="/images/bespeak/canvas-global.png" 
                    alt="Ancestral Sourcing" 
                    className="object-contain w-full h-full p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl italic">II. Global Archival Sourcing</h3>
                <p className="text-[13px] font-sans font-medium text-foreground/50 leading-relaxed italic">
                  "We traverse the globe—from the secluded paper mills of Kyoto to the antique stalls of Florence—to procure and curate the singular textures your story demands."
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-6 group">
                <div className="aspect-[4/5] bg-surface rounded-[2rem] overflow-hidden relative border border-foreground/5 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=30&w=300&auto=format&fit=crop" 
                    alt="Master Craftmanship" 
                    className="object-contain w-full h-full p-6 grayscale group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl italic">III. The Eternal Binding</h3>
                <p className="text-[13px] font-sans font-medium text-foreground/50 leading-relaxed italic">
                  "A hundred hours of silent devotion. Our master artisans hand-stitch and haunt each page with soul, binding your memories into an immutable physical legacy."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE ORDINANCE FORM - STREAMLINED */}
        <section className="py-24 px-6 md:px-8">
          <div className="max-w-4xl mx-auto bg-foreground text-surface rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-xl">
            <div className="relative z-10 text-center space-y-8">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-secondary">Step into the ordinance</span>
              <h2 className="font-serif text-4xl md:text-6xl leading-none">Apply for <br/> <span className="italic">Exclusivity.</span></h2>
              <p className="text-surface/60 font-serif italic text-base md:text-lg max-w-xl mx-auto">
                "We accept only 3 major bespeak commissions per month to ensure every project receives our total archival devotion."
              </p>
              
              <div className="pt-6">
                <a 
                  href="https://forms.gle/CWA-Personalisation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-surface text-foreground px-10 py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-secondary hover:text-white"
                >
                  Request Consultation
                </a>
                <p className="mt-8 text-[8px] uppercase tracking-widest text-surface/30 font-bold">Expect a WhatsApp connect within 24 archival hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & LEGACY */}
        <section className="pb-24 px-8 text-center space-y-12">
          <div className="w-10 h-10 bg-secondary/20 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
          </div>
          <h4 className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">End-to-End Privacy & Soul Protection Guaranteed</h4>
          <div className="flex justify-center gap-8 md:gap-12 opacity-30 flex-wrap">
            <span className="font-serif italic text-xl">Archival Grade</span>
            <span className="font-serif italic text-xl">Museum Quality</span>
            <span className="font-serif italic text-xl">One of One</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
