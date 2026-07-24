"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow pt-48 pb-32 px-6 lg:px-12 max-w-4xl mx-auto w-full reveal-anim">
        <header className="mb-24">
          <h1 className="text-title mb-8 italic font-normal">Privacy & Provenance</h1>
          <p className="text-editorial">How we protect your data and the digital artifacts of your experience.</p>
        </header>
        <div className="prose prose-neutral max-w-none space-y-12">
          <section className="space-y-4">
            <h3 className="font-serif text-2xl">The Digital Archive</h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed uppercase tracking-wide text-[11px]">
              We only collect the information necessary to process your commissions and deliver your physical vessels. 
              Your data is stored in our secure digital archive and is never shared with third-party merchants for marketing.
            </p>
          </section>
          <section className="space-y-4">
            <h3 className="font-serif text-2xl">Contact & Identity</h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed uppercase tracking-wide text-[11px]">
              When you send an inquiry or subscribe to our Vernissage list, we use your email strictly for direct communication. 
              You may request deletion of your data from our archives at any time by contacting the concierge.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
