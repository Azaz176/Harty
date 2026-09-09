export const CURRENCY = "INR" as const;
export const LOCALE = "en-IN" as const;

export const CART_EXPIRY_HOURS = 72;
export const INVENTORY_RESERVATION_MINUTES = 15;
export const RETURN_WINDOW_DAYS = 15;

export const FREE_SHIPPING_THRESHOLD = 99900; // ₹999 in paise
export const DEFAULT_SHIPPING_COST = 4900; // ₹49

export const RATINGS_MIN = 1;
export const RATINGS_MAX = 5;

export const PLP_PAGE_SIZE = 40;
export const SEARCH_PAGE_SIZE = 40;
export const REVIEWS_PAGE_SIZE = 10;

export const IMAGE_SIZES = {
  thumb: 80,
  card: 320,
  pdp: 640,
  hero: 1280,
  zoom: 1920,
} as const;

export const TIER_THRESHOLDS = {
  bronze: 0,
  silver: 500000, // ₹5,000
  gold: 2000000, // ₹20,000
  platinum: 5000000, // ₹50,000
} as const;
