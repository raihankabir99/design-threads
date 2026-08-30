import type { Design, Product, Collection, BlogPost, ProductType, ProductColor } from "./types";

// --- Demo image generators using Picsum (free, fast, deterministic) ---
export function designPlaceholder(name: string, _hue: number = 0): string {
  // Use a stable seed derived from the design name
  const seed = name.toLowerCase().replace(/\s+/g, "-");
  return `https://picsum.photos/seed/${seed}/800/800`;
}

export function productPlaceholder(type: string, designName: string): string {
  // Combine design + type for a unique but stable image per product
  const seed = `${designName.toLowerCase().replace(/\s+/g, "-")}-${type}`;
  return `https://picsum.photos/seed/${seed}/600/600`;
}

export function collectionPlaceholder(name: string): string {
  const seed = `col-${name.toLowerCase().replace(/\s+/g, "-")}`;
  return `https://picsum.photos/seed/${seed}/1200/600`;
}

// --- Color palettes ---
const tshirtColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
  { name: "Charcoal", hex: "#333333", available: true },
  { name: "Sand", hex: "#c2b280", available: true },
  { name: "Olive", hex: "#556b2f", available: true },
];

const hoodieColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Charcoal", hex: "#333333", available: true },
  { name: "Navy", hex: "#1a1a3e", available: true },
];

const mugColors: ProductColor[] = [
  { name: "White", hex: "#f5f5f0", available: true },
  { name: "Black", hex: "#111111", available: true },
];

const toteColors: ProductColor[] = [
  { name: "Natural", hex: "#e8dcc8", available: true },
  { name: "Black", hex: "#111111", available: true },
];

const phoneCaseColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Clear", hex: "#e0e0e0", available: true },
];

const posterColors: ProductColor[] = [
  { name: "Standard", hex: "#111111", available: true },
];

const capColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "Navy", hex: "#1a1a3e", available: true },
  { name: "Khaki", hex: "#bfb48f", available: true },
];

// --- Designs ---
export const designs: Design[] = [
  {
    id: "d1",
    name: "Midnight Lion",
    slug: "midnight-lion",
    description: "A majestic lion rendered in midnight tones — bold, dark, and unapologetic.",
    heroImage: designPlaceholder("Midnight Lion", 0),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "mug", "phone-case", "cap", "poster", "sticker", "notebook", "cushion", "kids-t-shirt", "baby-onesie"],
    tags: ["animals", "bold", "dark"],
    collectionId: "c1",
    isNew: true,
    createdAt: "2026-08-01",
  },
  {
    id: "d2",
    name: "Neon Tokyo",
    slug: "neon-tokyo",
    description: "Electric cityscape vibes — neon kanji, rain-soaked streets, infinite energy.",
    heroImage: designPlaceholder("Neon Tokyo", 280),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "mug", "phone-case", "poster", "sticker", "notebook"],
    tags: ["urban", "neon", "japanese"],
    collectionId: "c2",
    createdAt: "2026-07-15",
  },
  {
    id: "d3",
    name: "Desert Rose",
    slug: "desert-rose",
    description: "Delicate desert botanicals — earthy tones, natural elegance, quiet luxury.",
    heroImage: designPlaceholder("Desert Rose", 350),
    products: ["t-shirt", "hoodie", "tote-bag", "mug", "poster", "sticker", "notebook", "cushion"],
    tags: ["botanical", "earthy", "minimal"],
    collectionId: "c1",
    createdAt: "2026-07-20",
  },
  {
    id: "d4",
    name: "Concrete Jungle",
    slug: "concrete-jungle",
    description: "Raw urban architecture meets nature — brutalist shapes, organic vines.",
    heroImage: designPlaceholder("Concrete Jungle", 160),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "cap", "poster", "sticker", "notebook"],
    tags: ["urban", "architecture", "nature"],
    collectionId: "c2",
    isNew: true,
    createdAt: "2026-08-10",
  },
  {
    id: "d5",
    name: "Ocean Drift",
    slug: "ocean-drift",
    description: "Fluid abstract waves — deep sea blues, movement, and calm power.",
    heroImage: designPlaceholder("Ocean Drift", 200),
    products: ["t-shirt", "hoodie", "tote-bag", "mug", "phone-case", "poster", "sticker", "notebook", "cushion"],
    tags: ["abstract", "ocean", "calm"],
    collectionId: "c1",
    createdAt: "2026-06-01",
  },
  {
    id: "d6",
    name: "Wild Geometry",
    slug: "wild-geometry",
    description: "Sacred geometry reimagined — precise, hypnotic, endlessly captivating.",
    heroImage: designPlaceholder("Wild Geometry", 40),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "mug", "poster", "sticker", "notebook", "phone-case"],
    tags: ["geometric", "sacred", "abstract"],
    collectionId: "c2",
    createdAt: "2026-06-20",
  },
  {
    id: "d7",
    name: "Solar Flare",
    slug: "solar-flare",
    description: "Cosmic energy — solar winds, corona, and celestial fire.",
    heroImage: designPlaceholder("Solar Flare", 25),
    products: ["t-shirt", "hoodie", "tote-bag", "poster", "sticker", "notebook"],
    tags: ["space", "cosmic", "bold"],
    collectionId: "c3",
    isNew: true,
    createdAt: "2026-08-15",
  },
  {
    id: "d8",
    name: "Shadow Botanical",
    slug: "shadow-botanical",
    description: "Dark florals — moody roses, shadow leaves, midnight garden.",
    heroImage: designPlaceholder("Shadow Botanical", 300),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "mug", "poster", "sticker", "notebook", "cushion", "kids-t-shirt"],
    tags: ["botanical", "dark", "moody"],
    collectionId: "c3",
    createdAt: "2026-05-10",
  },
  {
    id: "d9",
    name: "Nordic Lines",
    slug: "nordic-lines",
    description: "Scandinavian minimalism — clean geometry, muted tones, quiet confidence.",
    heroImage: designPlaceholder("Nordic Lines", 190),
    products: ["t-shirt", "hoodie", "tote-bag", "mug", "poster", "notebook"],
    tags: ["minimal", "geometric", "nature"],
    collectionId: "c1",
    createdAt: "2026-04-15",
  },
  {
    id: "d10",
    name: "After Dark",
    slug: "after-dark",
    description: "Nightlife captured in ink — cocktails, neon signs, and after-hours energy.",
    heroImage: designPlaceholder("After Dark", 270),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "mug", "phone-case", "cap", "poster", "sticker"],
    tags: ["urban", "bold", "dark"],
    collectionId: "c2",
    isNew: true,
    createdAt: "2026-08-20",
  },
  {
    id: "d11",
    name: "Modern Heritage",
    slug: "modern-heritage",
    description: "Classic motifs reimagined — vintage typography, modern execution.",
    heroImage: designPlaceholder("Modern Heritage", 35),
    products: ["t-shirt", "hoodie", "sweatshirt", "tote-bag", "cap", "poster", "notebook"],
    tags: ["typography", "bold", "minimal"],
    collectionId: "c1",
    createdAt: "2026-03-10",
  },
  {
    id: "d12",
    name: "Sunday Studio",
    slug: "sunday-studio",
    description: "Slow living aesthetics — coffee stains, sketchbooks, and creative calm.",
    heroImage: designPlaceholder("Sunday Studio", 320),
    products: ["t-shirt", "hoodie", "tote-bag", "mug", "notebook", "cushion"],
    tags: ["minimal", "earthy", "nature"],
    collectionId: "c1",
    createdAt: "2026-02-20",
  },
];

// --- Products ---
function generateProducts(): Product[] {
  const products: Product[] = [];

  for (const design of designs) {
    for (const type of design.products) {
      const id = `${design.id}-${type}`;
      const title = `${design.name} ${typeLabel(type)}`;
      const basePrice = typePrice(type);
      const hasSale = design.id === "d3" && type === "t-shirt";

      products.push({
        id,
        designId: design.id,
        type,
        title,
        designName: design.name,
        slug: `${design.slug}-${type}`,
        price: hasSale ? 24.99 : basePrice,
        compareAtPrice: hasSale ? 34.99 : undefined,
        currency: "EUR",
        images: [
          productPlaceholder(type, design.name),
          productPlaceholder(type, design.name),
          productPlaceholder(type, design.name),
        ],
        hoverImage: productPlaceholder(type, design.name),
        colors: productColors(type),
        sizes: productSizes(type),
        badge: design.isNew && type === "t-shirt" ? "new" : undefined,
        description: `${design.description} Available as a premium ${typeLabel(type).toLowerCase()} featuring our signature ${design.name} design.`,
        details: productDetails(type),
        mockupImage: productPlaceholder(type, design.name),
      });
    }
  }
  return products;
}

function typeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    "t-shirt": "T-Shirt",
    "hoodie": "Hoodie",
    "sweatshirt": "Sweatshirt",
    "tote-bag": "Tote Bag",
    "mug": "Mug",
    "phone-case": "Phone Case",
    "cap": "Cap",
    "poster": "Poster",
    "sticker": "Sticker",
    "notebook": "Notebook",
    "cushion": "Cushion",
    "kids-t-shirt": "Kids T-Shirt",
    "baby-onesie": "Baby Onesie",
  };
  return labels[type];
}

function typePrice(type: ProductType): number {
  const prices: Record<ProductType, number> = {
    "t-shirt": 34.99,
    "hoodie": 59.99,
    "sweatshirt": 49.99,
    "tote-bag": 29.99,
    "mug": 19.99,
    "phone-case": 24.99,
    "cap": 29.99,
    "poster": 24.99,
    "sticker": 4.99,
    "notebook": 19.99,
    "cushion": 39.99,
    "kids-t-shirt": 24.99,
    "baby-onesie": 22.99,
  };
  return prices[type];
}

function productColors(type: ProductType): ProductColor[] {
  switch (type) {
    case "hoodie":
    case "sweatshirt":
      return hoodieColors;
    case "mug":
      return mugColors;
    case "tote-bag":
      return toteColors;
    case "phone-case":
      return phoneCaseColors;
    case "poster":
    case "sticker":
      return posterColors;
    case "cap":
      return capColors;
    default:
      return tshirtColors;
  }
}

function productSizes(type: ProductType): string[] | undefined {
  switch (type) {
    case "t-shirt":
    case "kids-t-shirt":
      return ["XS", "S", "M", "L", "XL", "XXL"];
    case "hoodie":
    case "sweatshirt":
      return ["S", "M", "L", "XL", "XXL"];
    case "baby-onesie":
      return ["0-3M", "3-6M", "6-12M", "12-18M"];
    case "cap":
      return ["One Size"];
    default:
      return undefined;
  }
}

function productDetails(type: ProductType): string[] {
  const common = ["Premium quality", "Designed in Europe", "Printed to order"];
  switch (type) {
    case "t-shirt":
      return [...common, "100% organic cotton", "180 GSM fabric", "Pre-shrunk", "Side-seamed construction"];
    case "hoodie":
      return [...common, "80% cotton, 20% polyester", "320 GSM fleece", "Kangaroo pocket", "Ribbed cuffs and hem"];
    case "sweatshirt":
      return [...common, "80% cotton, 20% polyester", "300 GSM fleece", "Crew neck", "Ribbed collar"];
    case "tote-bag":
      return [...common, "100% organic cotton canvas", "12oz weight", "Reinforced handles", "Interior pocket"];
    case "mug":
      return [...common, "Ceramic", "11oz capacity", "Dishwasher safe", "Microwave safe"];
    case "phone-case":
      return [...common, "Polycarbonate shell", "Slim profile", "Wireless charging compatible", "Raised edges for screen protection"];
    case "cap":
      return [...common, "Structured front panel", "Adjustable snapback", "Curved brim", "Embroidered design"];
    case "poster":
      return [...common, "Premium matte paper", "200gsm weight", "Vibrant archival inks", "Ships in protective tube"];
    case "sticker":
      return [...common, "Waterproof vinyl", "UV resistant", "Die-cut to shape", "3-4 inch diameter"];
    case "notebook":
      return [...common, "Hardcover", "192 lined pages", "80gsm paper", "Ribbon bookmark", "Lay-flat binding"];
    case "cushion":
      return [...common, "Polyester cover", "Polyester fill", "45×45cm", "Hidden zipper", "Removable cover"];
    case "kids-t-shirt":
      return [...common, "100% organic cotton", "150 GSM", "Tag-free neck label", "Pre-shrunk"];
    case "baby-onesie":
      return [...common, "100% organic cotton", "Envelope neckline", "Three-snap closure", "Tag-free"];
    default:
      return common;
  }
}

export const products = generateProducts();

// --- Collections ---
export const collections: Collection[] = [
  {
    id: "c1",
    name: "Essentials",
    slug: "essentials",
    description: "Core designs for everyday expression. Timeless, wearable, essential.",
    image: collectionPlaceholder("Essentials"),
    designIds: ["d1", "d3", "d5"],
    productCount: 39,
  },
  {
    id: "c2",
    name: "Urban Nights",
    slug: "urban-nights",
    description: "City-inspired designs — neon, concrete, and after-dark energy.",
    image: collectionPlaceholder("Urban Nights"),
    designIds: ["d2", "d4", "d6"],
    productCount: 30,
  },
  {
    id: "c3",
    name: "Botanical Dark",
    slug: "botanical-dark",
    description: "Dark florals and nature-inspired art for the moody at heart.",
    image: collectionPlaceholder("Botanical Dark"),
    designIds: ["d7", "d8"],
    productCount: 20,
  },
  {
    id: "c4",
    name: "New Drops",
    slug: "new-drops",
    description: "Fresh from the studio — our latest designs, just released.",
    image: collectionPlaceholder("New Drops"),
    designIds: ["d1", "d4", "d7", "d10"],
    productCount: 40,
    isNew: true,
  },
  {
    id: "c5",
    name: "Minimal",
    slug: "minimal",
    description: "Quiet design. Strong identity. Less is more.",
    image: collectionPlaceholder("Minimal"),
    designIds: ["d3", "d9", "d11", "d12"],
    productCount: 30,
  },
  {
    id: "c6",
    name: "Street Culture",
    slug: "street-culture",
    description: "Urban energy, bold graphics, and street-ready designs.",
    image: collectionPlaceholder("Street Culture"),
    designIds: ["d2", "d4", "d6", "d10"],
    productCount: 36,
  },
];

// --- Blog Posts ---
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Wearing What You Believe",
    slug: "art-of-wearing-what-you-believe",
    excerpt: "How visual design becomes part of modern personal identity — and why what you wear says more about you than you think.",
    content: "",
    image: collectionPlaceholder("Design Identity"),
    author: "FAYANITY Studio",
    date: "2026-08-20",
    readTime: "6 min read",
    category: "Design",
    tags: ["design", "identity", "fashion"],
  },
  {
    id: "b2",
    title: "Behind the Design: Midnight Lion",
    slug: "behind-design-midnight-lion",
    excerpt: "The creative process behind our signature design — from initial sketch to final product.",
    content: "",
    image: collectionPlaceholder("Design Process"),
    author: "FAYANITY Studio",
    date: "2026-08-12",
    readTime: "4 min read",
    category: "Design",
    tags: ["design", "process", "midnight-lion"],
  },
  {
    id: "b3",
    title: "How to Build a Minimal Everyday Wardrobe",
    slug: "build-minimal-everyday-wardrobe",
    excerpt: "A curated approach to building a wardrobe that works harder with fewer, better pieces.",
    content: "",
    image: collectionPlaceholder("Minimal Wardrobe"),
    author: "FAYANITY Team",
    date: "2026-08-05",
    readTime: "7 min read",
    category: "Style",
    tags: ["style", "minimal", "wardrobe"],
  },
  {
    id: "b4",
    title: "5 Ways to Style an Oversized Hoodie",
    slug: "style-oversized-hoodie",
    excerpt: "From street-style to smart-casual — five ways to make an oversized hoodie work for any occasion.",
    content: "",
    image: collectionPlaceholder("Hoodie Styling"),
    author: "FAYANITY Team",
    date: "2026-07-28",
    readTime: "5 min read",
    category: "Style",
    tags: ["style", "hoodie", "guide"],
  },
  {
    id: "b5",
    title: "How to Choose the Right T-Shirt Fit",
    slug: "choose-right-tshirt-fit",
    excerpt: "Understanding the difference between slim, regular, and oversized fits — and which one suits you best.",
    content: "",
    image: collectionPlaceholder("T-Shirt Fit"),
    author: "FAYANITY Team",
    date: "2026-07-20",
    readTime: "4 min read",
    category: "Product Guide",
    tags: ["t-shirt", "fit", "guide"],
  },
  {
    id: "b6",
    title: "The Story Behind Our Print Quality",
    slug: "story-behind-print-quality",
    excerpt: "From archival inks to precision printing — why our prints look as good after 50 washes as they do on day one.",
    content: "",
    image: collectionPlaceholder("Print Quality"),
    author: "FAYANITY Studio",
    date: "2026-07-15",
    readTime: "5 min read",
    category: "Brand",
    tags: ["quality", "printing", "brand-story"],
  },
  {
    id: "b7",
    title: "T-Shirt vs Sweatshirt: Which One Is Right For You?",
    slug: "tshirt-vs-sweatshirt",
    excerpt: "A practical guide to choosing between two wardrobe staples — fit, fabric, and occasion.",
    content: "",
    image: collectionPlaceholder("T-Shirt vs Sweatshirt"),
    author: "FAYANITY Team",
    date: "2026-07-08",
    readTime: "4 min read",
    category: "Product Guide",
    tags: ["t-shirt", "sweatshirt", "comparison"],
  },
  {
    id: "b8",
    title: "How to Care for Your Printed Apparel",
    slug: "care-for-printed-apparel",
    excerpt: "Simple steps to keep your printed t-shirts, hoodies, and sweatshirts looking fresh for years.",
    content: "",
    image: collectionPlaceholder("Apparel Care"),
    author: "FAYANITY Team",
    date: "2026-07-01",
    readTime: "3 min read",
    category: "Care Guide",
    tags: ["care", "washing", "maintenance"],
  },
  {
    id: "b9",
    title: "The Best Gift Ideas for Design Lovers",
    slug: "gift-ideas-design-lovers",
    excerpt: "Thoughtful, design-led gifts for the creative people in your life — from mugs to hoodies.",
    content: "",
    image: collectionPlaceholder("Gift Ideas"),
    author: "FAYANITY Team",
    date: "2026-06-25",
    readTime: "5 min read",
    category: "Gift Guide",
    tags: ["gifts", "design", "shopping"],
  },
  {
    id: "b10",
    title: "Minimal Design in Modern Fashion",
    slug: "minimal-design-modern-fashion",
    excerpt: "Why minimal, clean design continues to dominate contemporary fashion — and how to wear it.",
    content: "",
    image: collectionPlaceholder("Minimal Fashion"),
    author: "FAYANITY Studio",
    date: "2026-06-18",
    readTime: "6 min read",
    category: "Design",
    tags: ["minimal", "design", "fashion"],
  },
  {
    id: "b11",
    title: "Understanding Organic Cotton and Why It Matters",
    slug: "understanding-organic-cotton",
    excerpt: "What makes organic cotton different, why we use it, and how it benefits both you and the environment.",
    content: "",
    image: collectionPlaceholder("Organic Cotton"),
    author: "FAYANITY Team",
    date: "2026-06-10",
    readTime: "5 min read",
    category: "Brand",
    tags: ["sustainability", "cotton", "materials"],
  },
  {
    id: "b12",
    title: "Gift Guide: For the Minimalist",
    slug: "gift-guide-minimalist",
    excerpt: "Clean, intentional, and beautifully designed — the perfect gifts for people who value simplicity.",
    content: "",
    image: collectionPlaceholder("Minimalist Gift"),
    author: "FAYANITY Team",
    date: "2026-06-03",
    readTime: "4 min read",
    category: "Gift Guide",
    tags: ["gifts", "minimal", "guide"],
  },
];

// --- Utility: get products by design ---
export function getProductsByDesign(designId: string): Product[] {
  return products.filter((p) => p.designId === designId);
}

export function getProductByDesignAndType(designId: string, type: ProductType): Product | undefined {
  return products.find((p) => p.designId === designId && p.type === type);
}

export function getDesignBySlug(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getDesignsByCollection(collectionId: string): Design[] {
  return designs.filter((d) => d.collectionId === collectionId);
}

export function formatPrice(price: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function productTypeLabel(type: ProductType): string {
  return typeLabel(type);
}

export function getFeaturedDesigns(): Design[] {
  return designs.filter((d) => d.isNew || d.id === "d1" || d.id === "d2" || d.id === "d5");
}

export function getBestsellerDesigns(): Design[] {
  return [designs[0], designs[1], designs[4], designs[5]];
}
