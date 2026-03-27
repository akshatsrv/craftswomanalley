export type ProductVariant = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  price: string | number;
  image: string;
  category: string;
  description: string;
  deliveryTime: string;
  details?: string;
  variants?: ProductVariant[];
  includes?: string[];
  images?: string[];
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
    category: "Ever-lasting Blooms",
    description: "A bright and cheery crochet sunflower, perfect for adding a touch of warmth to any room.",
    deliveryTime: "10-15 business days"
  },
  "book-1": {
    id: "book-1",
    name: "Archival Memory Journal",
    price: "₹1,850",
    image: "/images/memory_book.png",
    category: "Hand-Bound Journals & Scrapbooks",
    description: "Japanese stab stitching using silk thread. Archival paper that welcomes both ink and watercolor. A legacy for your physical soul.",
    deliveryTime: "10-15 business days"
  },
  "personalised-journal": {
    id: "personalised-journal",
    name: "Personalised Journal or Scrapbook",
    price: "From ₹1,499",
    image: "/images/personalised-journal/journal_cover.jpg",
    category: "Hand-Bound Journals & Scrapbooks",
    description: "A5 hand-bound bespoke book crafted for your most intimate memories. Each page is a canvas for your story, layered with collage work and personalized elements.",
    deliveryTime: "12-15 business days",
    images: [
      "/images/personalised-journal/journal_cover.jpg",
      "/images/personalised-journal/journal_page_1.jpg",
      "/images/personalised-journal/journal_page_2.jpg",
      "/images/personalised-journal/journal_page_3.jpg",
      "/images/personalised-journal/journal_page_4.jpg"
    ],
    includes: [
      "Complete collage work on each side as required",
      "Option to add pictures, quotes, and personalised elements",
      "Special dates, hashtags, and hidden pockets",
      "A5 size, premium archival-grade paper",
      "Artisanal hand-bound finish"
    ],
    variants: [
      { id: "v1", label: "2 Pages (4 Sides)", price: 1499 },
      { id: "v2", label: "3 Pages (6 Sides)", price: 2399 },
      { id: "v3", label: "4 Pages (8 Sides)", price: 3000 },
      { id: "v4", label: "5 Pages (10 Sides)", price: 3999 }
    ]
  },
  "scroll-1": {
    id: "scroll-1",
    name: "The Eternal Vow Scroll",
    price: "₹1,450",
    image: "/images/hero_scroll.png",
    category: "Antique Scrolls",
    description: "Chemically aged parchment, hand-scripted with archival pigment ink. Finished with a wooden rod and a physical wax seal from our alley.",
    deliveryTime: "10-15 business days"
  },
  "card-1": {
    id: "card-1",
    name: "Linen Note Card",
    price: "₹199",
    image: "https://i.pinimg.com/736x/e4/52/88/e4528881961e8d7eafe425dadb3df1af.jpg",
    category: "Handmade Cards",
    description: "Hand-pressed linen card for your deepest thoughts.",
    deliveryTime: "3-5 business days"
  },
  "candle-1": {
    id: "candle-1",
    name: "Soy Wax Candle",
    price: "₹349",
    image: "https://i.pinimg.com/736x/61/ed/7d/61ed7d05f3f7056d07a484790b897b86.jpg",
    category: "Artisan Candles",
    description: "Lavender scented soy wax candle for a cozy alley.",
    deliveryTime: "5-7 business days"
  },
  "candle-2": {
    id: "candle-2",
    name: "Sculptural Bubble Candle",
    price: "₹499",
    image: "https://i.pinimg.com/736x/0e/42/df/0e42dfcd98872d01d9f71b0e410feb93.jpg",
    category: "Artisan Candles",
    description: "Hand-poured aesthetic candle for mindful presence.",
    deliveryTime: "5-7 business days"
  },
  "hamper-1": {
    id: "hamper-1",
    name: "Wedding Blessing Hamper",
    price: "₹3,499",
    image: "https://i.pinimg.com/736x/58/14/4d/58144d3d1d642b348ac4a7301a950902.jpg",
    category: "Gift Hampers",
    description: "A curated collection of bespoke items to celebrate fresh beginnings.",
    deliveryTime: "15-20 business days"
  },
  "resin-1": {
    id: "resin-1",
    name: "Floral Preservation Coaster",
    price: "₹899",
    image: "https://i.pinimg.com/736x/aa/0d/68/aa0d682f256dc59ee694180278c94106.jpg",
    category: "Resin Art",
    description: "Your memories suspended in crystal clear resin. Archival for eternity.",
    deliveryTime: "12-15 business days"
  },
  "toran-1": {
    id: "toran-1",
    name: "Auspicious Marigold Toran",
    price: "₹1,250",
    image: "/images/toran.png",
    category: "Traditional Torans",
    description: "Handmade toran to invite prosperity into your physical home.",
    deliveryTime: "10-15 business days"
  },
  "jewellery-1": {
    id: "jewellery-1",
    name: "Pressed Flower Locket",
    price: "₹799",
    image: "/images/jewellery.png",
    category: "Artisanal Jewellery",
    description: "Carry a piece of the alley with you. Real flowers preserved in brass.",
    deliveryTime: "7-10 business days"
  },
  "sketch-1": {
    id: "sketch-1",
    name: "Charcoal Soul Portrait",
    price: "₹2,500",
    image: "/images/sketches.png",
    category: "Custom Sketches",
    description: "A hand-drawn charcoal study of your internal self.",
    deliveryTime: "15-20 business days"
  }
};
