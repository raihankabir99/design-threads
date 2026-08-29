export type OrderStatus = "processing" | "in-production" | "shipped" | "delivered" | "cancelled";

export interface MockOrder {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  items: MockOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: MockAddress;
  deliveryMethod: "standard" | "express";
  paymentMethod: string;
  trackingNumber?: string;
}

export interface MockOrderItem {
  productId: string;
  designName: string;
  title: string;
  type: string;
  color: string;
  colorHex: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface MockAddress {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface MockCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatarUrl?: string;
}

export const mockCustomer: MockCustomer = {
  firstName: "Alex",
  lastName: "Müller",
  email: "alex@example.com",
  phone: "+49 170 123 4567",
  joinedDate: "2025-03-15",
};

export const mockAddresses: MockAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "Alex",
    lastName: "Müller",
    address: "Friedrichstraße 42",
    city: "Berlin",
    state: "Berlin",
    postalCode: "10117",
    country: "Germany",
    phone: "+49 170 123 4567",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    firstName: "Alex",
    lastName: "Müller",
    address: "Torstraße 100",
    apartment: "3rd Floor",
    city: "Berlin",
    postalCode: "10119",
    country: "Germany",
    isDefault: false,
  },
];

export const mockOrders: MockOrder[] = [
  {
    id: "ord-1",
    number: "FY-2026-00124",
    date: "2026-08-20",
    status: "in-production",
    items: [
      {
        productId: "d1-tshirt",
        designName: "Midnight Lion",
        title: "Classic T-Shirt",
        type: "t-shirt",
        color: "Black",
        colorHex: "#111111",
        size: "XL",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      },
      {
        productId: "d1-mug",
        designName: "Midnight Lion",
        title: "Ceramic Mug",
        type: "mug",
        color: "White",
        colorHex: "#f5f5f5",
        price: 16.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=500&fit=crop",
      },
    ],
    subtotal: 63.97,
    shipping: 0,
    total: 63.97,
    shippingAddress: mockAddresses[0],
    deliveryMethod: "standard",
    paymentMethod: "Card ending in 4242",
  },
  {
    id: "ord-2",
    number: "FY-2026-00098",
    date: "2026-07-14",
    status: "shipped",
    items: [
      {
        productId: "d2-hoodie",
        designName: "Abstract Horizon",
        title: "Premium Hoodie",
        type: "hoodie",
        color: "Cream",
        colorHex: "#f5f0e8",
        size: "L",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      },
    ],
    subtotal: 49.99,
    shipping: 0,
    total: 49.99,
    shippingAddress: mockAddresses[0],
    deliveryMethod: "standard",
    paymentMethod: "Card ending in 4242",
    trackingNumber: "DHL-DE-9876543210",
  },
  {
    id: "ord-3",
    number: "FY-2026-00072",
    date: "2026-06-28",
    status: "delivered",
    items: [
      {
        productId: "d3-tote",
        designName: "Urban Echo",
        title: "Canvas Tote Bag",
        type: "tote-bag",
        color: "Natural",
        colorHex: "#e8dcc8",
        price: 24.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=500&fit=crop",
      },
      {
        productId: "d3-phone-case",
        designName: "Urban Echo",
        title: "iPhone 15 Pro Case",
        type: "phone-case",
        color: "Black",
        colorHex: "#111111",
        price: 19.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=500&fit=crop",
      },
    ],
    subtotal: 44.98,
    shipping: 4.99,
    total: 49.97,
    shippingAddress: mockAddresses[1],
    deliveryMethod: "standard",
    paymentMethod: "Card ending in 4242",
    trackingNumber: "DHL-DE-1234567890",
  },
  {
    id: "ord-4",
    number: "FY-2026-00045",
    date: "2026-05-10",
    status: "delivered",
    items: [
      {
        productId: "d4-sweatshirt",
        designName: "Desert Geometry",
        title: "Crewneck Sweatshirt",
        type: "sweatshirt",
        color: "Sand",
        colorHex: "#c2a87d",
        size: "M",
        price: 44.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      },
    ],
    subtotal: 44.99,
    shipping: 0,
    total: 44.99,
    shippingAddress: mockAddresses[0],
    deliveryMethod: "standard",
    paymentMethod: "Card ending in 4242",
    trackingNumber: "DHL-DE-5555555555",
  },
  {
    id: "ord-5",
    number: "FY-2026-00031",
    date: "2026-04-02",
    status: "delivered",
    items: [
      {
        productId: "d5-poster",
        designName: "Quiet Motion",
        title: "A2 Poster",
        type: "poster",
        color: "White",
        colorHex: "#ffffff",
        price: 24.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop",
      },
    ],
    subtotal: 49.98,
    shipping: 4.99,
    total: 54.97,
    shippingAddress: mockAddresses[0],
    deliveryMethod: "standard",
    paymentMethod: "Card ending in 4242",
    trackingNumber: "DHL-DE-1111111111",
  },
];

export const statusLabels: Record<OrderStatus, string> = {
  "processing": "Processing",
  "in-production": "In Production",
  "shipped": "Shipped",
  "delivered": "Delivered",
  "cancelled": "Cancelled",
};

export const statusColors: Record<OrderStatus, string> = {
  "processing": "bg-blue-500/10 text-blue-500",
  "in-production": "bg-gold/10 text-gold",
  "shipped": "bg-purple-500/10 text-purple-500",
  "delivered": "bg-green-500/10 text-green-500",
  "cancelled": "bg-red-500/10 text-red-500",
};

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
