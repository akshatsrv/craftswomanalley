"use client";

import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";

const books = [
  { id: "book-1", name: "Archival Memory Journal", price: "₹1,850", image: "/images/memory_book.png", category: "Hand-Bound Books", description: "Japanese stab stitching using silk thread. Archival paper that welcomes both ink and watercolor." },
  { id: "book-2", name: "Scrapbook of Friendships", price: "₹2,200", image: "/images/scrapbook_friends_real.jpg", category: "Hand-Bound Books", description: "A beautifully crafted scrapbook to celebrate the people who make life meaningful." },
  { id: "book-3", name: "Birthday Memory Album", price: "₹1,950", image: "/images/scrapbook_birthday_real.jpg", category: "Hand-Bound Books", description: "Chronicle every birthday milestone in a lovingly hand-bound album." },
  { id: "book-4", name: "Travel Chronicle Notebook", price: "₹1,650", image: "/images/memory_book.png", category: "Hand-Bound Books", description: "For the wanderer who keeps physical memories. Thread-bound with vintage cloth covers." },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen flex flex-col noise-bg">
      <Navigation />
      <main className="flex-grow py-32 px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-widest font-bold text-foreground/30 mb-16">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-secondary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground/60">Memory Books</span>
        </nav>

        <header className="mb-24 text-center space-y-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] font-bold text-secondary text-center block w-full">Your Story, Bound</span>
          <h1 className="font-serif text-5xl lg:text-7xl tracking-tighter text-foreground text-center">Memory Books</h1>
          <p className="font-serif italic text-xl text-foreground/40 max-w-xl mx-auto text-center">
            Hand-bound chronicles for your most cherished moments.
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {books.map((book) => (
            <ProductCard
              key={book.id}
              {...book}
              aspectRatio="aspect-[3/4]"
            />
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-24 text-center bg-surface border border-foreground/5 rounded-3xl p-16 space-y-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-secondary">Personalised</span>
          <h2 className="font-serif text-4xl tracking-tight">Commission your own book</h2>
          <p className="font-serif italic text-foreground/40 max-w-md mx-auto">Custom cover art, paper type, and binding style. Built just for your story.</p>
          <Link href="/contact" className="inline-block bg-secondary text-white font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-secondary/90 transition-all">
            Enquire About Custom Books
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
