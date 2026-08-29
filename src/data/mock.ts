import type { Design, Product, Collection, BlogPost, ProductType, ProductColor } from "./types";

// --- Placeholder image generators ---
export function designPlaceholder(name: string, hue: number = 0): string {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect fill="#111" width="800" height="800"/><text x="400" y="380" text-anchor="middle" fill="#c9a96e" font-family="serif" font-size="72" font-weight="bold" opacity="0.9">${name.split(" ").map((w,i) => `<tspan x="400" dy="${i === 0 ? 0 : 90}">${w}</tspan>`).join("")}</text><text x="400" y="540" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="14" letter-spacing="6">FAYANITY</text></svg>`)}`;
}

export function productPlaceholder(type: string, designName: string): string {
  const labels: Record<string, string> = {
    "t-shirt": "Tee",
    "hoodie": "Hoodie",
    "sweatshirt": "Sweat",
    "tote-bag": "Tote",
    "mug": "Mug",
    "phone-case": "Phone",
    "cap": "Cap",
    "poster": "Poster",
    "sticker": "Sticker",
    "notebook": "Notebook",
    "cushion": "Cushion",
    "kids-t-shirt": "Kids",
    "baby-onesie": "Baby",
  };
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect fill="#161616" width="600" height="600" rx="4"/><rect fill="#1e1e1e" x="150" y="120" width="300" height="300" rx="8"/><text x="300" y="275" text-anchor="middle" fill="#c9a96e" font-family="serif" font-size="36" opacity="0.7">${designName}</text><text x="300" y="320" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="13" letter-spacing="4">${labels[type] || type}</text></svg>`)}`;
}

export function collectionPlaceholder(name: string): string {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#111"/><stop offset="100%" stop-color="#1a1a1a"/></linearGradient></defs><rect fill="url(#g)" width="1200" height="600"/><text x="600" y="280" text-anchor="middle" fill="#c9a96e" font-family="serif" font-size="56" font-weight="bold" opacity="0.8">${name}</text><text x="600" y="360" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="13" letter-spacing="8">COLLECTION</text></svg>`)}`;
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
];

// --- Blog Posts ---
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "The Art of Print-on-Demand: Quality Without Compromise",
    slug: "art-of-pod-quality",
    excerpt: "How modern POD technology delivers premium quality products without the overhead of traditional manufacturing.",
    content: "",
    image: collectionPlaceholder("POD Quality"),
    author: "FAYANITY Team",
    date: "2026-08-20",
    readTime: "5 min read",
    category: "Brand",
    tags: ["quality", "pod", "brand-story"],
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
    title: "Building a Wardrobe with Design-Led Fashion",
    slug: "wardrobe-design-led-fashion",
    excerpt: "Why choosing designs you love — rather than following trends — creates a more authentic personal style.",
    content: "",
    image: collectionPlaceholder("Wardrobe"),
    author: "FAYANITY Team",
    date: "2026-08-05",
    readTime: "6 min read",
    category: "Style",
    tags: ["style", "wardrobe", "sustainability"],
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
