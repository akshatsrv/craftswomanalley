"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow pt-48 pb-32 px-6 lg:px-12 max-w-4xl mx-auto w-full reveal-anim">
        <header className="mb-24">
          <h1 className="text-title mb-8 italic font-normal">Legal Terms</h1>
          <p className="text-editorial">The formal framework of our boutique operations.</p>
        </header>
        <div className="prose prose-neutral max-w-none space-y-12">
          <section className="space-y-4">
            <h3 className="font-serif text-2xl">Arisanal Integrity</h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed uppercase tracking-wide text-[11px]">
              Every item sold through CraftswomanAlley is handcrafted. Variations in texture, color, and finish are the 
              intentional hallmarks of artisanal creation and do not constitute defects.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="font-serif text-2xl">Intellectual Provenance</h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed uppercase tracking-wide text-[11px]">
              All original artwork, photography, and textual content on this archive are the intellectual property 
              of CraftswomanAlley unless otherwise stated. Reproduction without consent is strictly prohibited.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
