import type { Design, Product, Collection, BlogPost, ProductType, ProductColor } from "./types";

// --- Premium product mockups matching the dark-bg gold-lion photography style ---
// All product images use a consistent dark charcoal background with gold geometric lion
// Hero image uses a man wearing the branded t-shirt

// Real product photo URLs — contextual images for each product type
// Hero: man in branded black t-shirt, products: matching real photography
const productPhotos: Record<string, string> = {
  "t-shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center",
  "hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&crop=center",
  "sweatshirt": "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=600&fit=crop&crop=center",
  "tote-bag": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop&crop=center",
  "mug": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&crop=center",
  "phone-case": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop&crop=center",
  "cap": "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&h=600&fit=crop&crop=center",
  "poster": "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop&crop=center",
  "sticker": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop&crop=center",
  "notebook": "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=600&fit=crop&crop=center",
  "cushion": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=600&fit=crop&crop=center",
  "kids-t-shirt": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop&crop=center",
  "baby-onesie": "https://images.unsplash.com/photo-1522771930-78543b3472af?w=600&h=600&fit=crop&crop=center",
};

// Hero photo: man wearing black graphic t-shirt, dark studio
const heroPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=top";































// ── Design images ──
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

// ── Exported placeholder functions ──
export function designPlaceholder(name: string, _hue: number = 0): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return designImages[slug] || `https://picsum.photos/seed/${slug}/800/800`;
}

export function productPlaceholder(type: string, _designName: string): string {
  return productPhotos[type] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&crop=center";
}

export function collectionPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return collectionImages[slug] || `https://picsum.photos/seed/col-${slug}/1200/600`;
}

export function blogPlaceholder(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return blogImages[slug] || `https://picsum.photos/seed/blog-${slug}/1200/600`;
}

// Hero image: real photo
export const heroLifestyleImage = heroPhoto;

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

const sweatshirtColors: ProductColor[] = [
  { name: "Sand", hex: "#d4c4a8", available: true },
  { name: "Bone", hex: "#e8e0d4", available: true },
  { name: "Light Grey", hex: "#c8c8c8", available: true },
];

const kidsColors: ProductColor[] = [
  { name: "Black", hex: "#111111", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
];

const babyColors: ProductColor[] = [
  { name: "Natural", hex: "#e8e0d4", available: true },
  { name: "White", hex: "#f5f5f0", available: true },
];

function productColors(type: ProductType): ProductColor[] {
  switch (type) {
    case "t-shirt":
      return tshirtColors;
    case "hoodie":
      return hoodieColors;
    case "sweatshirt":
      return sweatshirtColors;
    case "tote-bag":
      return toteColors;
    case "mug":
      return mugColors;
    case "phone-case":
      return phoneCaseColors;
    case "cap":
      return capColors;
    case "poster":
      return posterColors;
    case "kids-t-shirt":
      return kidsColors;
    case "baby-onesie":
      return babyColors;
    default:
      return tshirtColors;
  }
}

function productSizes(type: ProductType): string[] | undefined {
  switch (type) {
    case "t-shirt":
    case "hoodie":
    case "sweatshirt":
    case "kids-t-shirt":
      return ["XS", "S", "M", "L", "XL", "XXL"];
    case "baby-onesie":
      return ["0-3M", "3-6M", "6-12M", "12-18M"];
    case "mug":
    case "tote-bag":
    case "sticker":
      return undefined;
    case "phone-case":
      return ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "Samsung S24", "Samsung S23"];
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

function typeLabel(type: ProductType): string {
  const labels: Record<ProductType, string> = {
    "t-shirt": "T-Shirt", "hoodie": "Hoodie", "sweatshirt": "Sweatshirt",
    "tote-bag": "Tote Bag", "mug": "Mug", "phone-case": "Phone Case",
    "cap": "Cap", "poster": "Poster", "sticker": "Sticker",
    "notebook": "Notebook", "cushion": "Cushion",
    "kids-t-shirt": "Kids T-Shirt", "baby-onesie": "Baby Onesie",
  };
  return labels[type];
}

function typePrice(type: ProductType): number {
  const prices: Record<ProductType, number> = {
    "t-shirt": 29.99, "hoodie": 49.99, "sweatshirt": 44.99, "tote-bag": 24.99,
    "mug": 16.99, "phone-case": 19.99, "cap": 22.99, "poster": 24.99,
    "sticker": 8.99, "notebook": 14.99, "cushion": 29.99,
    "kids-t-shirt": 24.99, "baby-onesie": 22.99,
  };
  return prices[type];
}

function generateProducts(): Product[] {
  const prods: Product[] = [];
  for (const design of designs) {
    for (const type of design.products) {
      const hasSale = design.id === "d3" && type === "t-shirt";
      prods.push({
        id: `${design.id}-${type}`, designId: design.id, type,
        title: `${design.name} ${typeLabel(type)}`, designName: design.name,
        slug: `${design.slug}-${type}`,
        price: hasSale ? 24.99 : typePrice(type),
        compareAtPrice: hasSale ? 34.99 : undefined, currency: "EUR",
        images: [productPlaceholder(type, design.name), productPlaceholder(type, design.name), productPlaceholder(type, design.name)],
        hoverImage: productPlaceholder(type, design.name),
        colors: productColors(type), sizes: productSizes(type),
        badge: design.isNew && type === "t-shirt" ? "new" : undefined,
        description: `${design.description} Available as a premium ${typeLabel(type).toLowerCase()} featuring our signature ${design.name} design.`,
        details: productDetails(type),
        mockupImage: productPlaceholder(type, design.name),
      });
    }
  }
  return prods;
}

export const designs: Design[] = [
  { id: "d1", name: "Midnight Lion", slug: "midnight-lion", description: "A majestic lion rendered in midnight tones.", heroImage: designPlaceholder("Midnight Lion"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","cap","poster","sticker","notebook","cushion","kids-t-shirt","baby-onesie"], tags: ["animals","bold","dark"], collectionId: "c1", isNew: true, createdAt: "2026-08-01" },
  { id: "d2", name: "Neon Tokyo", slug: "neon-tokyo", description: "Electric cityscape vibes.", heroImage: designPlaceholder("Neon Tokyo"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","poster","sticker","notebook"], tags: ["urban","neon","japanese"], collectionId: "c2", createdAt: "2026-07-15" },
  { id: "d3", name: "Desert Rose", slug: "desert-rose", description: "Delicate desert botanicals.", heroImage: designPlaceholder("Desert Rose"), products: ["t-shirt","hoodie","tote-bag","mug","poster","sticker","notebook","cushion"], tags: ["botanical","earthy","minimal"], collectionId: "c1", createdAt: "2026-07-20" },
  { id: "d4", name: "Concrete Jungle", slug: "concrete-jungle", description: "Raw urban architecture meets nature.", heroImage: designPlaceholder("Concrete Jungle"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","cap","poster","sticker","notebook"], tags: ["urban","architecture","nature"], collectionId: "c2", isNew: true, createdAt: "2026-08-10" },
  { id: "d5", name: "Ocean Drift", slug: "ocean-drift", description: "Fluid abstract waves.", heroImage: designPlaceholder("Ocean Drift"), products: ["t-shirt","hoodie","tote-bag","mug","phone-case","poster","sticker","notebook","cushion"], tags: ["abstract","ocean","calm"], collectionId: "c1", createdAt: "2026-06-01" },
  { id: "d6", name: "Wild Geometry", slug: "wild-geometry", description: "Sacred geometry reimagined.", heroImage: designPlaceholder("Wild Geometry"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","poster","sticker","notebook","phone-case"], tags: ["geometric","sacred","abstract"], collectionId: "c2", createdAt: "2026-06-20" },
  { id: "d7", name: "Solar Flare", slug: "solar-flare", description: "Cosmic energy.", heroImage: designPlaceholder("Solar Flare"), products: ["t-shirt","hoodie","tote-bag","poster","sticker","notebook"], tags: ["space","cosmic","bold"], collectionId: "c3", isNew: true, createdAt: "2026-08-15" },
  { id: "d8", name: "Shadow Botanical", slug: "shadow-botanical", description: "Dark florals.", heroImage: designPlaceholder("Shadow Botanical"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","poster","sticker","notebook","cushion","kids-t-shirt"], tags: ["botanical","dark","moody"], collectionId: "c3", createdAt: "2026-05-10" },
  { id: "d9", name: "Nordic Lines", slug: "nordic-lines", description: "Scandinavian minimalism.", heroImage: designPlaceholder("Nordic Lines"), products: ["t-shirt","hoodie","tote-bag","mug","poster","notebook"], tags: ["minimal","geometric","nature"], collectionId: "c1", createdAt: "2026-04-15" },
  { id: "d10", name: "After Dark", slug: "after-dark", description: "Nightlife captured in ink.", heroImage: designPlaceholder("After Dark"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","mug","phone-case","cap","poster","sticker"], tags: ["urban","bold","dark"], collectionId: "c2", isNew: true, createdAt: "2026-08-20" },
  { id: "d11", name: "Modern Heritage", slug: "modern-heritage", description: "Classic motifs reimagined.", heroImage: designPlaceholder("Modern Heritage"), products: ["t-shirt","hoodie","sweatshirt","tote-bag","cap","poster","notebook"], tags: ["typography","bold","minimal"], collectionId: "c1", createdAt: "2026-03-10" },
  { id: "d12", name: "Sunday Studio", slug: "sunday-studio", description: "Slow living aesthetics.", heroImage: designPlaceholder("Sunday Studio"), products: ["t-shirt","hoodie","tote-bag","mug","notebook","cushion"], tags: ["minimal","earthy","nature"], collectionId: "c1", createdAt: "2026-02-20" },
];

export const products = generateProducts();

export const collections: Collection[] = [
  { id: "c1", name: "Essentials", slug: "essentials", description: "Core designs for everyday expression.", image: collectionPlaceholder("Essentials"), designIds: ["d1","d3","d5","d9","d11","d12"], productCount: 72 },
  { id: "c2", name: "New Drops", slug: "new-drops", description: "Fresh releases.", image: collectionPlaceholder("New Drops"), designIds: ["d1","d4","d7","d10"], productCount: 42 },
  { id: "c3", name: "Minimal", slug: "minimal", description: "Less is more.", image: collectionPlaceholder("Minimal"), designIds: ["d7","d8","d9","d12"], productCount: 30 },
  { id: "c4", name: "Design Stories", slug: "design-stories", description: "Behind every design is a story.", image: collectionPlaceholder("Design Stories"), designIds: ["d1","d5","d6"], productCount: 24 },
  { id: "c5", name: "Best Sellers", slug: "best-sellers", description: "Our most popular designs.", image: collectionPlaceholder("Best Sellers"), designIds: ["d1","d2","d5","d6"], productCount: 40 },
  { id: "c6", name: "Street Culture", slug: "street-culture", description: "Urban energy and bold graphics.", image: collectionPlaceholder("Street Culture"), designIds: ["d2","d4","d6","d10"], productCount: 36 },
];

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "The Art of Wearing What You Believe", slug: "art-of-wearing-what-you-believe", excerpt: "How visual design becomes part of personal identity.", content: "", image: blogPlaceholder("Design Identity"), author: "FAYANITY Studio", date: "2026-08-20", readTime: "6 min read", category: "Design", tags: ["design","identity","fashion"] },
  { id: "b2", title: "Behind the Design: Midnight Lion", slug: "behind-design-midnight-lion", excerpt: "The creative process behind our signature design.", content: "", image: blogPlaceholder("Design Process"), author: "FAYANITY Studio", date: "2026-08-12", readTime: "4 min read", category: "Design", tags: ["design","process","midnight-lion"] },
  { id: "b3", title: "How to Build a Minimal Everyday Wardrobe", slug: "build-minimal-everyday-wardrobe", excerpt: "A curated approach to a better wardrobe.", content: "", image: blogPlaceholder("Minimal Wardrobe"), author: "FAYANITY Team", date: "2026-08-05", readTime: "7 min read", category: "Style", tags: ["style","minimal","wardrobe"] },
  { id: "b4", title: "5 Ways to Style an Oversized Hoodie", slug: "style-oversized-hoodie", excerpt: "From street-style to smart-casual.", content: "", image: blogPlaceholder("Hoodie Styling"), author: "FAYANITY Team", date: "2026-07-28", readTime: "5 min read", category: "Style", tags: ["style","hoodie","guide"] },
  { id: "b5", title: "How to Choose the Right T-Shirt Fit", slug: "choose-right-tshirt-fit", excerpt: "Understanding slim, regular, and oversized fits.", content: "", image: blogPlaceholder("T-Shirt Fit"), author: "FAYANITY Team", date: "2026-07-20", readTime: "4 min read", category: "Product Guide", tags: ["t-shirt","fit","guide"] },
  { id: "b6", title: "The Story Behind Our Print Quality", slug: "story-behind-print-quality", excerpt: "From archival inks to precision printing.", content: "", image: blogPlaceholder("Print Quality"), author: "FAYANITY Studio", date: "2026-07-15", readTime: "5 min read", category: "Brand", tags: ["quality","printing"] },
  { id: "b7", title: "T-Shirt vs Sweatshirt", slug: "tshirt-vs-sweatshirt", excerpt: "A practical guide to two wardrobe staples.", content: "", image: blogPlaceholder("T-Shirt vs Sweatshirt"), author: "FAYANITY Team", date: "2026-07-08", readTime: "4 min read", category: "Product Guide", tags: ["t-shirt","sweatshirt"] },
  { id: "b8", title: "How to Care for Your Printed Apparel", slug: "care-for-printed-apparel", excerpt: "Keep your prints looking fresh.", content: "", image: blogPlaceholder("Apparel Care"), author: "FAYANITY Team", date: "2026-07-01", readTime: "3 min read", category: "Care Guide", tags: ["care","washing"] },
  { id: "b9", title: "The Best Gift Ideas for Design Lovers", slug: "gift-ideas-design-lovers", excerpt: "Thoughtful gifts for creative people.", content: "", image: blogPlaceholder("Gift Ideas"), author: "FAYANITY Team", date: "2026-06-25", readTime: "5 min read", category: "Gift Guide", tags: ["gifts","design"] },
  { id: "b10", title: "Minimal Design in Modern Fashion", slug: "minimal-design-modern-fashion", excerpt: "Why minimal design dominates.", content: "", image: blogPlaceholder("Minimal Fashion"), author: "FAYANITY Studio", date: "2026-06-18", readTime: "6 min read", category: "Design", tags: ["minimal","design"] },
  { id: "b11", title: "Understanding Organic Cotton", slug: "understanding-organic-cotton", excerpt: "What makes organic cotton different.", content: "", image: blogPlaceholder("Organic Cotton"), author: "FAYANITY Team", date: "2026-06-10", readTime: "5 min read", category: "Brand", tags: ["sustainability","cotton"] },
  { id: "b12", title: "Gift Guide: For the Minimalist", slug: "gift-guide-minimalist", excerpt: "Clean gifts for simplicity lovers.", content: "", image: blogPlaceholder("Minimalist Gift"), author: "FAYANITY Team", date: "2026-06-03", readTime: "4 min read", category: "Gift Guide", tags: ["gifts","minimal"] },
];

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
  return new Intl.NumberFormat("en-EU", { style: "currency", currency, minimumFractionDigits: 2 }).format(price);
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
