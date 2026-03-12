import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function FAQPage() {
  const faqs = [
    { q: "How long does shipping take?", a: "As every piece is handcrafted with care, please allow 10-15 business days for delivery." },
    { q: "Do you take custom commissions?", a: "Yes. From specific flower colors to sentimental scroll messages, custom work is our specialty. Contact us to begin." },
    { q: "Where do you ship?", a: "We currently ship pan-India. International shipping is available upon request." },
    { q: "How can I track my order?", a: "Once your treasure is shipped, you will receive an email with a unique tracking ID." },
  ];

  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-4xl mx-auto w-full">
        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary block w-full text-center">Inquiry</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">Gentle Questions</h1>
        </header>

        <section className="space-y-16">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-serif text-3xl text-foreground tracking-tight">{faq.q}</h3>
              <p className="font-sans text-foreground/60 leading-relaxed max-w-2xl">{faq.a}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
