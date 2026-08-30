import type { Design, Product, Collection, BlogPost, ProductType, ProductColor } from "./types";

// --- Contextual demo images ---
// Design images: themed Unsplash photos matching each design's visual identity
// Product images: styled SVG mockups shaped like the actual product type
// Collection images: thematic lifestyle photos

const designImages: Record<string, string> = {
  "midnight-lion": "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=800&fit=crop&crop=center",
  "neon-tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=800&fit=crop&crop=center",
  "desert-rose": "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=800&fit=crop&crop=center",
  "concrete-jungle": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop&crop=center",
  "ocean-drift": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=800&fit=crop&crop=center",
  "wild-geometry": "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=800&fit=crop&crop=center",
  "solar-flare": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&crop=center",
  "shadow-botanical": "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=800&fit=crop&crop=center",
  "nordic-lines": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&crop=center",
  "after-dark": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=800&fit=crop&crop=center",
  "modern-heritage": "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=800&h=800&fit=crop&crop=center",
  "sunday-studio": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=800&fit=crop&crop=center",
};

const productMockups: Record<string, { bg: string; shape: string; label: string }> = {
  "t-shirt": { bg: "#1a1a1a", shape: "tshirt", label: "T-Shirt" },
  "hoodie": { bg: "#222222", shape: "hoodie", label: "Hoodie" },
  "sweatshirt": { bg: "#2a2a2a", shape: "sweatshirt", label: "Sweatshirt" },
  "tote-bag": { bg: "#e8dcc8", shape: "tote", label: "Tote Bag" },
  "mug": { bg: "#f5f5f0", shape: "mug", label: "Mug" },
  "phone-case": { bg: "#111111", shape: "phone", label: "Phone Case" },
  "cap": { bg: "#1a1a1a", shape: "cap", label: "Cap" },
  "poster": { bg: "#0a0a0a", shape: "poster", label: "Poster" },
  "sticker": { bg: "#ffffff", shape: "sticker", label: "Sticker" },
  "notebook": { bg: "#2c2c2c", shape: "notebook", label: "Notebook" },
  "cushion": { bg: "#e8e0d4", shape: "cushion", label: "Cushion" },
  "kids-t-shirt": { bg: "#2a2a2a", shape: "tshirt", label: "Kids Tee" },
  "baby-onesie": { bg: "#f0ebe4", shape: "onesie", label: "Baby Onesie" },
};

function productSvgDataUri(type: string, designName: string): string {
  const mockup = productMockups[type] || productMockups["t-shirt"];
  const textColor = mockup.bg === "#ffffff" || mockup.bg === "#f5f5f0" || mockup.bg === "#e8dcc8" || mockup.bg === "#e8e0d4" || mockup.bg === "#f0ebe4"
    ? "#333333" : "#ffffff";
  const accentColor = "#c9a96e";
  const designShort = designName.length > 12 ? designName.substring(0, 12) + "…" : designName;

  const shapes: Record<string, string> = {
    tshirt: `<path d="M250 120 L180 160 L140 300 L200 300 L200 520 L300 520 L300 300 L360 300 L320 160 L250 120Z" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <path d="M250 120 C220 130 200 155 195 180" fill="none" stroke="${textColor}20" stroke-width="1"/>
      <path d="M250 120 C280 130 300 155 305 180" fill="none" stroke="${textColor}20" stroke-width="1"/>` ,
    hoodie: `<path d="M240 100 L170 145 L120 300 L190 300 L190 520 L310 520 L310 300 L380 300 L330 145 L260 100Z" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <path d="M240 100 L230 80 L270 80 L260 100" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <rect x="220" y="340" width="60" height="50" rx="5" fill="${textColor}08" stroke="${textColor}15" stroke-width="0.8"/>`,
    sweatshirt: `<path d="M250 120 L180 155 L140 300 L200 300 L200 520 L300 520 L300 300 L360 300 L320 155 L250 120Z" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <path d="M220 120 C235 135 250 140 280 120" fill="none" stroke="${textColor}20" stroke-width="1"/>`,
    tote: `<path d="M170 180 L170 480 L330 480 L330 180Z" fill="${mockup.bg}" stroke="#33333315" stroke-width="1.5"/>
      <path d="M210 180 C210 130 290 130 290 180" fill="none" stroke="#33333330" stroke-width="2.5"/>
      <line x1="170" y1="200" x2="330" y2="200" stroke="#33333310" stroke-width="0.8"/>`,
    mug: `<rect x="160" y="200" width="140" height="200" rx="8" fill="${mockup.bg}" stroke="#33333315" stroke-width="1.5"/>
      <path d="M300 250 C350 250 350 350 300 350" fill="none" stroke="#33333325" stroke-width="3"/>
      <ellipse cx="230" cy="200" rx="70" ry="12" fill="${mockup.bg}" stroke="#33333315" stroke-width="1"/>
      <ellipse cx="230" cy="200" rx="58" ry="8" fill="#00000008"/>`,
    phone: `<rect x="180" y="100" width="140" height="320" rx="20" fill="${mockup.bg}" stroke="${textColor}20" stroke-width="2"/>
      <rect x="195" y="115" width="110" height="270" rx="4" fill="${textColor}10"/>
      <circle cx="250" cy="405" r="4" fill="${textColor}15"/>
      <rect x="220" y="107" width="60" height="4" rx="2" fill="${textColor}15"/>`,
    cap: `<path d="M150 300 C150 220 200 170 250 170 C300 170 350 220 350 300Z" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <path d="M140 300 C140 305 360 305 360 300" fill="none" stroke="${textColor}20" stroke-width="2"/>
      <path d="M150 300 C120 310 100 330 140 340 L360 340 C400 330 380 310 350 300" fill="${mockup.bg}" stroke="${textColor}12" stroke-width="1"/>`,
    poster: `<rect x="150" y="100" width="200" height="340" fill="${mockup.bg}" stroke="${textColor}15" stroke-width="1.5"/>
      <rect x="170" y="120" width="160" height="200" fill="${textColor}08" stroke="${textColor}10" stroke-width="0.5"/>
      <line x1="170" y1="350" x2="330" y2="350" stroke="${textColor}10" stroke-width="0.5"/>
      <line x1="170" y1="370" x2="280" y2="370" stroke="${textColor}10" stroke-width="0.5"/>
      <line x1="170" y1="385" x2="250" y2="385" stroke="${textColor}10" stroke-width="0.5"/>`,
    sticker: `<circle cx="250" cy="310" r="140" fill="${mockup.bg}" stroke="#dddddd" stroke-width="1.5"/>
      <circle cx="250" cy="310" r="125" fill="none" stroke="#eeeeee" stroke-width="0.5" stroke-dasharray="4 3"/>`,
    notebook: `<rect x="165" y="120" width="170" height="300" rx="4" fill="${mockup.bg}" stroke="${textColor}20" stroke-width="1.5"/>
      <line x1="185" y1="120" x2="185" y2="420" stroke="${textColor}15" stroke-width="1"/>
      <rect x="195" y="140" width="120" height="2" rx="1" fill="${textColor}12"/>
      <rect x="195" y="155" width="90" height="2" rx="1" fill="${textColor}10"/>
      <rect x="195" y="170" width="105" height="2" rx="1" fill="${textColor}10"/>`,
    cushion: `<rect x="150" y="160" width="200" height="220" rx="24" fill="${mockup.bg}" stroke="#33333312" stroke-width="1.5"/>
      <path d="M155 175 C180 165 320 165 345 175" fill="none" stroke="#33333308" stroke-width="1"/>
      <path d="M155 365 C180 375 320 375 345 365" fill="none" stroke="#33333308" stroke-width="1"/>`,
    onesie: `<path d="M220 120 L200 140 L170 250 L190 250 L185 400 L315 400 L310 250 L330 250 L300 140 L280 120Z" fill="${mockup.bg}" stroke="#33333312" stroke-width="1.5"/>
      <path d="M230 120 C240 130 260 130 270 120" fill="none" stroke="#33333315" stroke-width="1"/>
      <circle cx="250" cy="380" r="3" fill="#33333315"/>
      <circle cx="250" cy="360" r="3" fill="#33333315"/>`,
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 620" width="600" height="740">
    <rect width="500" height="620" fill="${mockup.bg}"/>
    <defs>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="500" height="620" fill="url(#glow)"/>
    ${shapes[mockup.shape] || shapes.tshirt}
    <text x="250" y="290" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="22" font-weight="700" fill="${accentColor}" letter-spacing="2">${designShort.toUpperCase()}</text>
    <text x="250" y="320" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="11" fill="${textColor}80" letter-spacing="3">${mockup.label.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const collectionImages: Record<string, string> = {
  "essentials": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=600&fit=crop&crop=center",
  "new-drops": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
  "minimal": "https://images.unsplash.com/photo-1493655185874-a03e77f7bf73?w=1200&h=600&fit=crop&crop=center",
  "street-culture": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=600&fit=crop&crop=center",
  "design-stories": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop&crop=center",
  "best-sellers": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
};

const blogImages: Record<string, string> = {
  "design-identity": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=600&fit=crop&crop=center",
  "design-process": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop&crop=center",
  "minimal-wardrobe": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
  "hoodie-styling": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop&crop=center",
  "t-shirt-fit": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=600&fit=crop&crop=center",
  "print-quality": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop&crop=center",
  "t-shirt-vs-sweatshirt": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=600&fit=crop&crop=center",
  "apparel-care": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=600&fit=crop&crop=center",
  "gift-ideas": "https://images.unsplash.com/photo-1549465220-1a8b9238f4d1?w=1200&h=600&fit=crop&crop=center",
  "minimal-fashion": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=600&fit=crop&crop=center",
  "organic-cotton": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=600&fit=crop&crop=center",
  "minimalist-gift": "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&h=600&fit=crop&crop=center",
};

export function designPlaceholder(name: string, _hue: number = 0): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return designImages[slug] || `https://picsum.photos/seed/${slug}/800/800`;
}

export function productPlaceholder(type: string, designName: string): string {
  return productSvgDataUri(type, designName);
}

export function collectionPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return collectionImages[slug] || `https://picsum.photos/seed/col-${slug}/1200/600`;
}

export function blogPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return blogImages[slug] || `https://picsum.photos/seed/blog-${slug}/1200/600`;
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
    image: blogPlaceholder("Design Identity"),
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
    image: blogPlaceholder("Design Process"),
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
    image: blogPlaceholder("Minimal Wardrobe"),
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
    image: blogPlaceholder("Hoodie Styling"),
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
    image: blogPlaceholder("T-Shirt Fit"),
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
    image: blogPlaceholder("Print Quality"),
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
    image: blogPlaceholder("T-Shirt vs Sweatshirt"),
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
    image: blogPlaceholder("Apparel Care"),
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
    image: blogPlaceholder("Gift Ideas"),
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
    image: blogPlaceholder("Minimal Fashion"),
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
    image: blogPlaceholder("Organic Cotton"),
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
    image: blogPlaceholder("Minimalist Gift"),
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
