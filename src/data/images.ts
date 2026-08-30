// ── Image Path Mapping ──
// Save uploaded images to public/images/ with these exact filenames.
// The app will use these paths; SVG fallbacks render if images are missing.

export const PRODUCT_IMAGES: Record<string, string> = {
  // Midnight Lion product images
  "midnight-lion/t-shirt": "/images/midnight-lion-tshirt.jpg",
  "midnight-lion/hoodie": "/images/midnight-lion-hoodie.jpg",
  "midnight-lion/sweatshirt": "/images/midnight-lion-sweatshirt.jpg",
  "midnight-lion/tote-bag": "/images/midnight-lion-tote.jpg",
  "midnight-lion/mug": "/images/midnight-lion-mug.jpg",
  "midnight-lion/phone-case": "/images/midnight-lion-phonecase.jpg",
  "midnight-lion/cap": "/images/midnight-lion-cap.jpg",
  "midnight-lion/poster": "/images/midnight-lion-poster.jpg",
  "midnight-lion/sticker": "/images/midnight-lion-sticker.jpg",
  "midnight-lion/notebook": "/images/midnight-lion-notebook.jpg",
  "midnight-lion/cushion": "/images/midnight-lion-cushion.jpg",
  "midnight-lion/kids-t-shirt": "/images/midnight-lion-kids.jpg",
  "midnight-lion/baby-onesie": "/images/midnight-lion-onesie.jpg",
};

export const HERO_IMAGE = "/images/hero-man-tshirt.jpg";

export const DESIGN_IMAGES: Record<string, string> = {
  "midnight-lion": "/images/midnight-lion-art.jpg",
  // Other designs use Unsplash
};

export const LIFESTYLE_IMAGES = {
  flatlay: "/images/lifestyle-flatlay.jpg",
  models: "/images/lifestyle-models.jpg",
  studio: "/images/studio-lion.jpg",
};

// Every product type maps to the Midnight Lion images above.
// For other designs, fall back to a general product image.
export function getProductImage(
  designSlug: string,
  productType: string,
  fallback: string
): string {
  // First try design-specific product image
  const key = `${designSlug}/${productType}`;
  if (PRODUCT_IMAGES[key]) return PRODUCT_IMAGES[key];

  // Then try Midnight Lion as default
  const mlKey = `midnight-lion/${productType}`;
  if (PRODUCT_IMAGES[mlKey]) return PRODUCT_IMAGES[mlKey];

  // Then try design image
  if (DESIGN_IMAGES[designSlug]) return DESIGN_IMAGES[designSlug];

  return fallback;
}
