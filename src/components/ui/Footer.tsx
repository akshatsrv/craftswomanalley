import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-surface/30 pt-24 pb-12 px-8 border-t border-foreground/5 noise-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="space-y-6">
          <Link href="/" className="font-serif text-2xl tracking-tighter block">CraftswomanAlley</Link>
          <p className="text-sm font-sans text-foreground/50 leading-relaxed font-medium">
            Elevated craft for the physical soul. Hand-picked and heart-made treasures from our alley to yours.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/craftswomanalley" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-secondary hover:border-secondary transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30 mb-8">The Alley</h4>
          <ul className="space-y-4 text-sm font-serif italic text-foreground/70">
            <li><Link href="/shop" className="hover:text-secondary transition-colors font-sans not-italic uppercase tracking-widest text-xs font-bold">The Collection</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition-colors font-sans not-italic uppercase tracking-widest text-xs font-bold">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors font-sans not-italic uppercase tracking-widest text-xs font-bold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30 mb-8">Care</h4>
          <ul className="space-y-4 text-sm font-sans text-foreground/70 font-medium">
            <li><Link href="/shipping" className="hover:text-secondary transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors">Bespeak Custom</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/30 mb-8">Newsletter</h4>
          <p className="text-xs text-foreground/40 font-sans leading-relaxed mb-6">Join the alley for releases and gentle updates.</p>
          <div className="flex border-b border-foreground/10 pb-2">
            <input type="email" placeholder="Email address..." className="bg-transparent border-none focus:ring-0 text-xs w-full font-serif italic" />
            <button className="text-[10px] uppercase font-bold tracking-widest text-secondary">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/30">© 2024 CraftswomanAlley. All Rights Reserved.</p>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/30">
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
