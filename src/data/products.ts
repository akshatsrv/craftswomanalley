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
  },
  "flower-lavender-large": {
    id: "flower-lavender-large",
    name: "Lavender Bloom Bouquet",
    price: "₹999",
    image: "/images/products/B0H2HGTNSM/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handcrafted with premium plush pipe cleaners in rich lavender tones. An everlasting floral arrangement perfect for birthdays, anniversaries, Valentine's Day, and room decor.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2HGTNSM/img_1.jpg",
      "/images/products/B0H2HGTNSM/img_2.jpg",
      "/images/products/B0H2HGTNSM/img_3.jpg",
      "/images/products/B0H2HGTNSM/img_4.jpg",
      "/images/products/B0H2HGTNSM/img_5.jpg",
      "/images/products/B0H2HGTNSM/img_6.jpg"
    ],
    includes: [
      "Handcrafted plush lavender pipe cleaner flowers",
      "Bespoke gift wrapping & ribbon finish",
      "Everlasting durability - never fades or wilts",
      "Ideal gift for birthdays, anniversaries & Valentine's Day"
    ]
  },
  "flower-blush-pink": {
    id: "flower-blush-pink",
    name: "Blush Pink Bouquet",
    price: "₹599",
    image: "/images/products/B0H3DM8QHP/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Delicate blush pink pipe cleaner bouquet crafted by hand. Soft pastel tones designed for graduation, Mother's Day, birthdays, and room styling.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H3DM8QHP/img_1.jpg",
      "/images/products/B0H3DM8QHP/img_2.jpg",
      "/images/products/B0H3DM8QHP/img_3.jpg",
      "/images/products/B0H3DM8QHP/img_4.jpg",
      "/images/products/B0H3DM8QHP/img_5.jpg"
    ],
    includes: [
      "Hand-shaped blush pink petals",
      "Crafted with soft plush wire stems",
      "Artisanal bouquet wrapping",
      "Perfect for graduation, Mother's Day & birthdays"
    ]
  },
  "flower-pink-5": {
    id: "flower-pink-5",
    name: "Classic Pink Bouquet (5 Blooms)",
    price: "₹999",
    image: "/images/products/B0H2H9TV4F/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "A vibrant 5-flower pink pipe cleaner bouquet, hand-sculpted for everlasting memory, anniversary gifts, and aesthetic room decoration.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2H9TV4F/img_1.jpg",
      "/images/products/B0H2H9TV4F/img_2.jpg",
      "/images/products/B0H2H9TV4F/img_3.jpg",
      "/images/products/B0H2H9TV4F/img_4.jpg",
      "/images/products/B0H2H9TV4F/img_5.jpg",
      "/images/products/B0H2H9TV4F/img_6.jpg",
      "/images/products/B0H2H9TV4F/img_7.jpg"
    ],
    includes: [
      "5 individual hand-sculpted pink flowers",
      "Decorative foliage & stem wraps",
      "Signature Alley gift packaging",
      "Zero maintenance forever bloom"
    ]
  },
  "flower-lavender-compact": {
    id: "flower-lavender-compact",
    name: "Petite Lavender Bouquet",
    price: "₹599",
    image: "/images/products/B0H3B9WFVR/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Elegant compact lavender pipe cleaner arrangement. Perfect touch of handmade charm for desks, nightstands, or thoughtful micro-gifting.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H3B9WFVR/img_1.jpg",
      "/images/products/B0H3B9WFVR/img_2.jpg",
      "/images/products/B0H3B9WFVR/img_3.jpg",
      "/images/products/B0H3B9WFVR/img_4.jpg"
    ],
    includes: [
      "Compact hand-bound lavender stems",
      "Soft texture plush craft wire",
      "Elegant gift presentation",
      "Ideal for special occasions & desk decor"
    ]
  },
  "flower-blue-3": {
    id: "flower-blue-3",
    name: "Forever Blue Bouquet (3 Blooms)",
    price: "₹599",
    image: "/images/products/B0H2HH5BPD/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "A calming 3-flower blue pipe cleaner bouquet. Handcrafted with deep and pastel blue tones for a unique aesthetic floral gift.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2HH5BPD/img_1.jpg",
      "/images/products/B0H2HH5BPD/img_2.jpg",
      "/images/products/B0H2HH5BPD/img_3.jpg",
      "/images/products/B0H2HH5BPD/img_4.jpg",
      "/images/products/B0H2HH5BPD/img_5.jpg",
      "/images/products/B0H2HH5BPD/img_6.jpg"
    ],
    includes: [
      "3 handcrafted blue pipe cleaner blooms",
      "Hand-wrapped aesthetic stems",
      "Craftswoman Alley signature packaging",
      "Long-lasting color and structure"
    ]
  },
  "flower-red-bouquet": {
    id: "flower-red-bouquet",
    name: "Passionate Red Bouquet",
    price: "₹599",
    image: "/images/products/B0H2PGSV3Q/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Red Pipe Cleaner Flower Bouquet. A vibrant red bouquet symbolising love, ideal for Valentine's Day, anniversaries, and romantic surprises.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2PGSV3Q/img_1.jpg",
      "/images/products/B0H2PGSV3Q/img_2.jpg",
      "/images/products/B0H2PGSV3Q/img_3.jpg",
      "/images/products/B0H2PGSV3Q/img_4.jpg",
      "/images/products/B0H2PGSV3Q/img_5.jpg",
      "/images/products/B0H2PGSV3Q/img_6.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-lavender-pink-pastel": {
    id: "flower-lavender-pink-pastel",
    name: "Pastel Lavender & Pink Bouquet",
    price: "₹1,899",
    image: "/images/products/B0H3BWPB9R/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Lavender & Pink Pastel Pipe Cleaner Bouquet. A deluxe multi-flower pastel arrangement crafted with plush craft wire.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H3BWPB9R/img_1.jpg",
      "/images/products/B0H3BWPB9R/img_2.jpg",
      "/images/products/B0H3BWPB9R/img_3.jpg",
      "/images/products/B0H3BWPB9R/img_4.jpg",
      "/images/products/B0H3BWPB9R/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-yellow-bouquet": {
    id: "flower-yellow-bouquet",
    name: "Sunburst Yellow Bouquet",
    price: "₹599",
    image: "/images/products/B0H2Z5DQG8/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Yellow Pipe Cleaner Flower Bouquet. Bright, cheerful yellow blooms that bring sunshine and joy to any room forever.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2Z5DQG8/img_1.jpg",
      "/images/products/B0H2Z5DQG8/img_2.jpg",
      "/images/products/B0H2Z5DQG8/img_3.jpg",
      "/images/products/B0H2Z5DQG8/img_4.jpg",
      "/images/products/B0H2Z5DQG8/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-baby-pink-bouquet": {
    id: "flower-baby-pink-bouquet",
    name: "Sweet Baby Pink Bouquet",
    price: "₹999",
    image: "/images/products/B0H2QLTJQS/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Baby Pink Pipe Cleaner Flower Bouquet. Soft, romantic pink tones arranged in artisanal packaging.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2QLTJQS/img_1.jpg",
      "/images/products/B0H2QLTJQS/img_2.jpg",
      "/images/products/B0H2QLTJQS/img_3.jpg",
      "/images/products/B0H2QLTJQS/img_4.jpg",
      "/images/products/B0H2QLTJQS/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-baby-pink-large": {
    id: "flower-baby-pink-large",
    name: "Grand Baby Pink Bouquet",
    price: "₹1,449",
    image: "/images/products/B0H2QK5GGM/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Large Baby Pink Pipe Cleaner Flower Bouquet. A lush, full-bodied arrangement crafted for major celebrations.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2QK5GGM/img_1.jpg",
      "/images/products/B0H2QK5GGM/img_2.jpg",
      "/images/products/B0H2QK5GGM/img_3.jpg",
      "/images/products/B0H2QK5GGM/img_4.jpg",
      "/images/products/B0H2QK5GGM/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-pastel-yellow-bouquet": {
    id: "flower-pastel-yellow-bouquet",
    name: "Pastel Yellow Bouquet",
    price: "₹599",
    image: "/images/products/B0H2Z1CCQV/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Pastel Yellow Pipe Cleaner Flower Bouquet. Subtle, warm pastel yellow tones for aesthetic home decor.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2Z1CCQV/img_1.jpg",
      "/images/products/B0H2Z1CCQV/img_2.jpg",
      "/images/products/B0H2Z1CCQV/img_3.jpg",
      "/images/products/B0H2Z1CCQV/img_4.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-baby-pink-medium": {
    id: "flower-baby-pink-medium",
    name: "Medium Baby Pink Bouquet",
    price: "₹949",
    image: "/images/products/B0H2MTDWFV/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Medium Baby Pink Pipe Cleaner Flower Bouquet. The perfect balanced size for gifting and table styling.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2MTDWFV/img_1.jpg",
      "/images/products/B0H2MTDWFV/img_2.jpg",
      "/images/products/B0H2MTDWFV/img_3.jpg",
      "/images/products/B0H2MTDWFV/img_4.jpg",
      "/images/products/B0H2MTDWFV/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-love": {
    id: "scroll-embroidery-love",
    name: "Vintage Romance Scroll",
    price: "₹459",
    image: "/images/products/B0G4H47NVJ/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card on Vintage Parchment Paper. Features writing space for personal notes, wishes, romantic vows, Valentine & anniversaries.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0G4H47NVJ/img_1.jpg",
      "/images/products/B0G4H47NVJ/img_2.jpg",
      "/images/products/B0G4H47NVJ/img_3.jpg",
      "/images/products/B0G4H47NVJ/img_4.jpg",
      "/images/products/B0G4H47NVJ/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-anniversary": {
    id: "scroll-embroidery-anniversary",
    name: "Anniversary Vow Scroll",
    price: "₹459",
    image: "/images/products/B0G4H51WD5/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card on Vintage Parchment Paper. Designed for anniversary vows, intimate notes, and lifelong keepsakes.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0G4H51WD5/img_1.jpg",
      "/images/products/B0G4H51WD5/img_2.jpg",
      "/images/products/B0G4H51WD5/img_3.jpg",
      "/images/products/B0G4H51WD5/img_4.jpg",
      "/images/products/B0G4H51WD5/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-royal": {
    id: "scroll-embroidery-royal",
    name: "Royal Parchment Scroll",
    price: "₹499",
    image: "/images/products/B0G4H72ZYC/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card on Vintage Parchment Paper. Crafted with royal gold-trimmed parchment and wooden rod ends.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0G4H72ZYC/img_1.jpg",
      "/images/products/B0G4H72ZYC/img_2.jpg",
      "/images/products/B0G4H72ZYC/img_3.jpg",
      "/images/products/B0G4H72ZYC/img_4.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-ribbon-red-rose-light": {
    id: "flower-ribbon-red-rose-light",
    name: "Ribbon Red Rose Bouquet (with Light)",
    price: "₹799",
    image: "/images/products/B0H292FTGG/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Ribbon Red Rose Bouquet with ambient fairy lighting and ribbon wrap. An enchanting glowing bouquet for special nights.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H292FTGG/img_1.jpg",
      "/images/products/B0H292FTGG/img_2.jpg",
      "/images/products/B0H292FTGG/img_3.jpg",
      "/images/products/B0H292FTGG/img_4.jpg",
      "/images/products/B0H292FTGG/img_5.jpg",
      "/images/products/B0H292FTGG/img_6.jpg",
      "/images/products/B0H292FTGG/img_7.jpg",
      "/images/products/B0H292FTGG/img_8.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-crochet-sunflower": {
    id: "flower-crochet-sunflower",
    name: "Crochet Sunflower Bouquet",
    price: "₹399",
    image: "/images/products/B0H39FNNVS/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Crochet Sunflower Bouquet. Woven with soft yarn for an everlasting rustic sunflower charm.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H39FNNVS/img_1.jpg",
      "/images/products/B0H39FNNVS/img_2.jpg",
      "/images/products/B0H39FNNVS/img_3.jpg",
      "/images/products/B0H39FNNVS/img_4.jpg",
      "/images/products/B0H39FNNVS/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "flower-ribbon-sunflower": {
    id: "flower-ribbon-sunflower",
    name: "Ribbon Sunflower Bouquet",
    price: "₹449",
    image: "/images/products/B0H36SDGZ1/img_1.jpg",
    category: "Ever-lasting Blooms",
    description: "Handmade Ribbon Sunflower Bouquet. Bright yellow satin ribbon petals crafted into an everlasting bloom.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H36SDGZ1/img_1.jpg",
      "/images/products/B0H36SDGZ1/img_2.jpg",
      "/images/products/B0H36SDGZ1/img_3.jpg",
      "/images/products/B0H36SDGZ1/img_4.jpg",
      "/images/products/B0H36SDGZ1/img_5.jpg",
    ],
    includes: [
      "Handmade ever-lasting blooms signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-classic-gold": {
    id: "scroll-embroidery-classic-gold",
    name: "Classic Gold Scroll",
    price: "₹499",
    image: "/images/products/B0H2VTS96D/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper in Blue Gift Box. Features writing space for notes, wishes, anniversaries, and love letters.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2VTS96D/img_1.jpg",
      "/images/products/B0H2VTS96D/img_2.jpg",
      "/images/products/B0H2VTS96D/img_3.jpg",
      "/images/products/B0H2VTS96D/img_4.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-blossom": {
    id: "scroll-embroidery-blossom",
    name: "Blossom Message Scroll",
    price: "₹499",
    image: "/images/products/B0H2VDZYK6/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper with floral embroidery motif and premium presentation box.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2VDZYK6/img_1.jpg",
      "/images/products/B0H2VDZYK6/img_2.jpg",
      "/images/products/B0H2VDZYK6/img_3.jpg",
      "/images/products/B0H2VDZYK6/img_4.jpg",
      "/images/products/B0H2VDZYK6/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-heartbeat": {
    id: "scroll-embroidery-heartbeat",
    name: "Heartbeat Vintage Scroll",
    price: "₹449",
    image: "/images/products/B0G4H6XTWW/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper crafted for emotional letters and heartfelt expressions.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0G4H6XTWW/img_1.jpg",
      "/images/products/B0G4H6XTWW/img_2.jpg",
      "/images/products/B0G4H6XTWW/img_3.jpg",
      "/images/products/B0G4H6XTWW/img_4.jpg",
      "/images/products/B0G4H6XTWW/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-pastel-floral": {
    id: "scroll-embroidery-pastel-floral",
    name: "Pastel Floral Scroll",
    price: "₹449",
    image: "/images/products/B0H2VFFFNF/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper featuring soft pastel floral accents and archival writing space.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2VFFFNF/img_1.jpg",
      "/images/products/B0H2VFFFNF/img_2.jpg",
      "/images/products/B0H2VFFFNF/img_3.jpg",
      "/images/products/B0H2VFFFNF/img_4.jpg",
      "/images/products/B0H2VFFFNF/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-heritage-velvet": {
    id: "scroll-embroidery-heritage-velvet",
    name: "Heritage Velvet Ribbon Scroll",
    price: "₹499",
    image: "/images/products/B0H2VLMVWN/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper with pink velvet ribbon accents for women and special keepsakes.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2VLMVWN/img_1.jpg",
      "/images/products/B0H2VLMVWN/img_2.jpg",
      "/images/products/B0H2VLMVWN/img_3.jpg",
      "/images/products/B0H2VLMVWN/img_4.jpg",
      "/images/products/B0H2VLMVWN/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "scroll-embroidery-intimate": {
    id: "scroll-embroidery-intimate",
    name: "Intimate Memories Scroll",
    price: "₹449",
    image: "/images/products/B0H2VN992J/img_1.jpg",
    category: "Antique Scrolls",
    description: "Embroidery Scroll-Style Message Card Vintage Paper with personalized writing canvas and keepsake storage.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0H2VN992J/img_1.jpg",
      "/images/products/B0H2VN992J/img_2.jpg",
      "/images/products/B0H2VN992J/img_3.jpg",
      "/images/products/B0H2VN992J/img_4.jpg",
      "/images/products/B0H2VN992J/img_5.jpg",
    ],
    includes: [
      "Handmade antique scrolls signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  },
  "candle-lotus-urli": {
    id: "candle-lotus-urli",
    name: "Lotus Urli Floral Candle",
    price: "₹750",
    image: "/images/products/B0FYFK8QJW/img_1.jpg",
    category: "Artisan Candles",
    description: "Lotus Urli Decorative Floating Floral Diya Candle (6.5 inches). Handcrafted with soy wax and rose fragrance for home decor, pujas, and celebrations.",
    deliveryTime: "7-10 business days",
    images: [
      "/images/products/B0FYFK8QJW/img_1.jpg",
      "/images/products/B0FYFK8QJW/img_2.jpg",
      "/images/products/B0FYFK8QJW/img_3.jpg",
      "/images/products/B0FYFK8QJW/img_4.jpg",
      "/images/products/B0FYFK8QJW/img_5.jpg",
    ],
    includes: [
      "Handmade artisan candles signature piece",
      "Artisanal Alley gift packaging & ribbon finish",
      "Everlasting durability & keepsake quality",
    ]
  }
};