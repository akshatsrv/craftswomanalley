export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  deliveryTime: string;
  details?: string;
};

export const products: Record<string, Product> = {
  "flower-1": {
    id: "flower-1",
    name: "Velvet Tulip Bouquet",
    price: "₹850",
    image: "/images/velvet_tulip.png",
    category: "Ever-lasting Blooms",
    description: "Hand-woven with premium velvet yarn and fuzzy wire. These flowers never fade, much like the physical soul that crafted them.",
    deliveryTime: "10-15 business days"
  },
  "flower-2": {
    id: "flower-2",
    name: "Sun-Kissed Bloom",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop",
    category: "Crochet",
    description: "A bright and cheery crochet sunflower, perfect for adding a touch of warmth to any room.",
    deliveryTime: "10-15 business days"
  },
  "book-1": {
    id: "book-1",
    name: "Archival Memory Journal",
    price: "₹1,850",
    image: "/images/memory_book.png",
    category: "Hand-Bound Books",
    description: "Japanese stab stitching using silk thread. Archival paper that welcomes both ink and watercolor. A legacy for your physical soul.",
    deliveryTime: "10-15 business days"
  },
  "scroll-1": {
    id: "scroll-1",
    name: "The Eternal Vow Scroll",
    price: "₹1,450",
    image: "/images/hero_scroll.png",
    category: "Antique Scrolls",
    description: "Chemically aged parchment, hand-scripted with archival pigment ink. Finished with a wooden rod and a physical wax seal from our alley.",
    deliveryTime: "10-15 business days",
    details: "As this is a bespoke handcrafted item, please allow 10-15 business days for delivery."
  },
  "card-1": {
    id: "card-1",
    name: "Linen Note Card",
    price: "₹199",
    image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg",
    category: "Cards",
    description: "Hand-pressed linen card for your deepest thoughts.",
    deliveryTime: "3-5 business days"
  },
  "candle-1": {
    id: "candle-1",
    name: "Soy Wax Candle",
    price: "₹349",
    image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg",
    category: "Candles",
    description: "Lavender scented soy wax candle for a cozy alley.",
    deliveryTime: "5-7 business days"
  }
};
