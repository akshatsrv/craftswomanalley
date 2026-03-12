import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-5xl mx-auto w-full">
        <header className="mb-20 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary text-center block w-full">Let&apos;s Connect</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">Contact our Alley</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto text-center">
            Whether it&apos;s a bespoke commission or a gentle inquiry, we&apos;d love to hear from you.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl mb-4">Direct Inquiry</h3>
              <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-1">General: hello@craftswomanalley.com</p>
              <p className="font-sans text-sm text-foreground/60 leading-relaxed">Bespoke: craft@craftswomanalley.com</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-4">Instagram</h3>
              <p className="font-sans text-sm text-foreground/60 leading-relaxed">@craftswomanalley</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-foreground/40">Your Name</label>
              <input type="text" className="w-full bg-surface border border-foreground/5 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors" placeholder="Handwriting desired..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-foreground/40">Message</label>
              <textarea rows={6} className="w-full bg-surface border border-foreground/5 rounded-xl px-6 py-4 focus:outline-none focus:border-secondary transition-colors resize-none" placeholder="What&apos;s on your physical soul?"></textarea>
            </div>
            <button className="w-full bg-secondary text-white font-sans uppercase tracking-[0.3em] font-bold py-5 rounded-xl hover:bg-secondary/90 transition-all">Send Message</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
