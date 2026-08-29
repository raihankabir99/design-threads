export type ProductType =
  | "t-shirt"
  | "hoodie"
  | "sweatshirt"
  | "tote-bag"
  | "mug"
  | "phone-case"
  | "cap"
  | "poster"
  | "sticker"
  | "notebook"
  | "cushion"
  | "kids-t-shirt"
  | "baby-onesie";

export type Badge = "new" | "bestseller" | "limited" | "sale";

export interface Design {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  heroImage: string;
  products: ProductType[];
  tags: string[];
  collectionId?: string;
  isNew?: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  designId: string;
  type: ProductType;
  title: string;
  designName: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  hoverImage?: string;
  colors: ProductColor[];
  sizes?: string[];
  badge?: Badge;
  description: string;
  details: string[];
  mockupImage: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  designIds: string[];
  productCount: number;
  isNew?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface CartItem {
  productId: string;
  designId: string;
  type: ProductType;
  designName: string;
  title: string;
  color: string;
  colorHex: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
}
