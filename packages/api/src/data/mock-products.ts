export type MockBrand = {
  id: string;
  slug: string;
  name: string;
  isPremium: boolean;
};

export type MockCategory = {
  id: string;
  slug: string;
  name: string;
  gender: "men" | "women" | "kids" | "girls" | "boys" | "beautify" | "accessories";
};

export type MockVariant = {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  mrp: number;
  inStock: boolean;
};

export type MockMedia = {
  id: string;
  url: string;
  blurhash: string;
  width: number;
  height: number;
  kind: "image";
  position: number;
  alt: string;
};

export type MockProduct = {
  id: string;
  slug: string;
  brandId: string;
  categoryId: string;
  title: string;
  description: string;
  gender: "men" | "women" | "kids" | "girls" | "boys" | "beautify" | "accessories";
  basePrice: number;
  status: "active";
  ratingAvg: number;
  ratingCount: number;
  publishedAt: string;
  variants: MockVariant[];
  media: MockMedia[];
  attributes: Record<string, string>;
};

// ---------------------------------------------------------------------------
// Brands
// ---------------------------------------------------------------------------

export const brands: MockBrand[] = [
  // Fast fashion
  { id: "br-01", slug: "zara", name: "ZARA", isPremium: false },
  { id: "br-02", slug: "hm", name: "H&M", isPremium: false },
  { id: "br-03", slug: "uniqlo", name: "UNIQLO", isPremium: false },
  { id: "br-04", slug: "mango", name: "Mango", isPremium: false },
  { id: "br-05", slug: "massimo-dutti", name: "Massimo Dutti", isPremium: true },
  { id: "br-06", slug: "cos", name: "COS", isPremium: true },
  { id: "br-07", slug: "other-stories", name: "& Other Stories", isPremium: true },
  { id: "br-08", slug: "arket", name: "Arket", isPremium: true },
  // Luxury
  { id: "br-09", slug: "gucci", name: "Gucci", isPremium: true },
  { id: "br-10", slug: "prada", name: "Prada", isPremium: true },
  { id: "br-11", slug: "louis-vuitton", name: "Louis Vuitton", isPremium: true },
  { id: "br-12", slug: "versace", name: "Versace", isPremium: true },
  { id: "br-13", slug: "burberry", name: "Burberry", isPremium: true },
  { id: "br-14", slug: "dior", name: "Dior", isPremium: true },
  { id: "br-15", slug: "balenciaga", name: "Balenciaga", isPremium: true },
  { id: "br-16", slug: "armani", name: "Armani", isPremium: true },
  { id: "br-17", slug: "valentino", name: "Valentino", isPremium: true },
  { id: "br-18", slug: "fendi", name: "Fendi", isPremium: true },
  // Beauty brands
  { id: "br-19", slug: "mac", name: "M.A.C", isPremium: true },
  { id: "br-20", slug: "lakme", name: "Lakmé", isPremium: false },
  { id: "br-21", slug: "nykaa", name: "Nykaa", isPremium: false },
  { id: "br-22", slug: "forest-essentials", name: "Forest Essentials", isPremium: true },
  // Accessory brands
  { id: "br-23", slug: "titan", name: "Titan", isPremium: false },
  { id: "br-24", slug: "fossil", name: "Fossil", isPremium: true },
  { id: "br-25", slug: "hidesign", name: "Hidesign", isPremium: true },
  { id: "br-26", slug: "wildcraft", name: "Wildcraft", isPremium: false },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const categories: MockCategory[] = [
  // Men — existing
  { id: "cat-01", slug: "t-shirts", name: "T-Shirts", gender: "men" },
  { id: "cat-02", slug: "shirts", name: "Shirts", gender: "men" },
  { id: "cat-03", slug: "jeans", name: "Jeans", gender: "men" },
  { id: "cat-04", slug: "trousers", name: "Trousers", gender: "men" },
  { id: "cat-05", slug: "jackets", name: "Jackets", gender: "men" },
  { id: "cat-06", slug: "sweaters", name: "Sweaters", gender: "men" },
  // Men — new
  { id: "cat-13", slug: "casual-shirts", name: "Casual Shirts", gender: "men" },
  { id: "cat-14", slug: "formal-shirts", name: "Formal Shirts", gender: "men" },
  { id: "cat-15", slug: "polos", name: "Polos", gender: "men" },
  { id: "cat-16", slug: "kurtas", name: "Kurtas", gender: "men" },
  { id: "cat-17", slug: "blazers", name: "Blazers", gender: "men" },
  { id: "cat-18", slug: "shorts", name: "Shorts", gender: "men" },
  { id: "cat-19", slug: "track-pants", name: "Track Pants", gender: "men" },
  { id: "cat-20", slug: "sherwanis", name: "Sherwanis", gender: "men" },
  { id: "cat-21", slug: "nehru-jackets", name: "Nehru Jackets", gender: "men" },
  { id: "cat-22", slug: "briefs", name: "Briefs & Trunks", gender: "men" },
  { id: "cat-23", slug: "boxers", name: "Boxers", gender: "men" },
  { id: "cat-24", slug: "casual-shoes", name: "Casual Shoes", gender: "men" },
  { id: "cat-25", slug: "formal-shoes", name: "Formal Shoes", gender: "men" },
  { id: "cat-26", slug: "sneakers", name: "Sneakers", gender: "men" },
  { id: "cat-27", slug: "sports-shoes", name: "Sports Shoes", gender: "men" },

  // Women — existing
  { id: "cat-07", slug: "dresses", name: "Dresses", gender: "women" },
  { id: "cat-08", slug: "tops", name: "Tops", gender: "women" },
  { id: "cat-09", slug: "skirts", name: "Skirts", gender: "women" },
  { id: "cat-10", slug: "jeans-women", name: "Jeans", gender: "women" },
  { id: "cat-11", slug: "jackets-women", name: "Jackets", gender: "women" },
  { id: "cat-12", slug: "knitwear", name: "Knitwear", gender: "women" },
  // Women — new
  { id: "cat-28", slug: "trousers-women", name: "Trousers", gender: "women" },
  { id: "cat-29", slug: "shorts-women", name: "Shorts", gender: "women" },
  { id: "cat-30", slug: "blouses", name: "Blouses", gender: "women" },
  { id: "cat-31", slug: "sarees", name: "Sarees", gender: "women" },
  { id: "cat-32", slug: "kurtis", name: "Kurtis & Suits", gender: "women" },
  { id: "cat-33", slug: "lehengas", name: "Lehengas", gender: "women" },
  { id: "cat-34", slug: "salwar-suits", name: "Salwar Suits", gender: "women" },
  { id: "cat-35", slug: "bras", name: "Bras", gender: "women" },
  { id: "cat-36", slug: "nightwear", name: "Nightwear", gender: "women" },
  { id: "cat-37", slug: "sports-bras", name: "Sports Bras", gender: "women" },
  { id: "cat-38", slug: "tights", name: "Tights & Leggings", gender: "women" },
  { id: "cat-39", slug: "flats", name: "Flats", gender: "women" },
  { id: "cat-40", slug: "heels", name: "Heels", gender: "women" },
  { id: "cat-41", slug: "boots", name: "Boots", gender: "women" },
  { id: "cat-42", slug: "jumpsuits", name: "Jumpsuits", gender: "women" },

  // Kids
  { id: "cat-43", slug: "kids-tshirts", name: "T-Shirts", gender: "kids" },
  { id: "cat-44", slug: "kids-dresses", name: "Dresses & Frocks", gender: "kids" },
  { id: "cat-45", slug: "kids-jeans", name: "Jeans & Trousers", gender: "kids" },
  { id: "cat-46", slug: "kids-ethnic", name: "Ethnic Wear", gender: "kids" },
  { id: "cat-47", slug: "kids-shoes", name: "Shoes", gender: "kids" },
  { id: "cat-48", slug: "kids-winterwear", name: "Winterwear", gender: "kids" },

  // Girls
  { id: "cat-49", slug: "girls-dresses", name: "Dresses & Frocks", gender: "girls" },
  { id: "cat-50", slug: "girls-tops", name: "Tops & Tees", gender: "girls" },
  { id: "cat-51", slug: "girls-leggings", name: "Leggings & Jeans", gender: "girls" },
  { id: "cat-52", slug: "girls-skirts", name: "Skirts & Shorts", gender: "girls" },
  { id: "cat-53", slug: "girls-ethnic", name: "Ethnic Wear", gender: "girls" },
  { id: "cat-54", slug: "girls-winterwear", name: "Winterwear", gender: "girls" },

  // Boys
  { id: "cat-55", slug: "boys-tshirts", name: "T-Shirts", gender: "boys" },
  { id: "cat-56", slug: "boys-shirts", name: "Shirts", gender: "boys" },
  { id: "cat-57", slug: "boys-jeans", name: "Jeans & Trousers", gender: "boys" },
  { id: "cat-58", slug: "boys-shorts", name: "Shorts", gender: "boys" },
  { id: "cat-59", slug: "boys-ethnic", name: "Ethnic Wear", gender: "boys" },
  { id: "cat-60", slug: "boys-winterwear", name: "Winterwear", gender: "boys" },

  // Beautify
  { id: "cat-61", slug: "moisturisers", name: "Moisturisers", gender: "beautify" },
  { id: "cat-62", slug: "serums", name: "Serums & Essences", gender: "beautify" },
  { id: "cat-63", slug: "sunscreen", name: "Sunscreen", gender: "beautify" },
  { id: "cat-64", slug: "lipstick", name: "Lipstick", gender: "beautify" },
  { id: "cat-65", slug: "foundation", name: "Foundation", gender: "beautify" },
  { id: "cat-66", slug: "mascara", name: "Mascara", gender: "beautify" },
  { id: "cat-67", slug: "shampoo", name: "Shampoo", gender: "beautify" },
  { id: "cat-68", slug: "perfumes", name: "Perfumes", gender: "beautify" },
  { id: "cat-69", slug: "deodorants", name: "Deodorants", gender: "beautify" },

  // Accessories
  { id: "cat-70", slug: "watches-men", name: "Men's Watches", gender: "accessories" },
  { id: "cat-71", slug: "watches-women", name: "Women's Watches", gender: "accessories" },
  { id: "cat-72", slug: "smart-watches", name: "Smart Watches", gender: "accessories" },
  { id: "cat-73", slug: "handbags", name: "Handbags", gender: "accessories" },
  { id: "cat-74", slug: "backpacks", name: "Backpacks", gender: "accessories" },
  { id: "cat-75", slug: "wallets", name: "Wallets", gender: "accessories" },
  { id: "cat-76", slug: "belts-men", name: "Belts", gender: "accessories" },
  { id: "cat-77", slug: "earrings", name: "Earrings", gender: "accessories" },
  { id: "cat-78", slug: "necklaces", name: "Necklaces", gender: "accessories" },
  { id: "cat-79", slug: "sunglasses", name: "Sunglasses", gender: "accessories" },
];

// ---------------------------------------------------------------------------
// Size charts & colors
// ---------------------------------------------------------------------------

const SIZES_TOPS = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZES_BOTTOMS = ["28", "30", "32", "34", "36", "38"];
const SIZES_SHOES = ["6", "7", "8", "9", "10", "11"];
const SIZES_KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];
const SIZES_BEAUTY = ["50ml", "100ml", "200ml"];
const SIZES_ONE = ["One Size"];
const SIZES_BELTS = ["S", "M", "L", "XL"];
const SIZES_BRAS = ["32B", "34B", "34C", "36B", "36C", "38B"];

const COLORS: Array<{ name: string; hex: string }> = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#F5F5F0" },
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Olive", hex: "#5C6B4F" },
  { name: "Sand", hex: "#C8B898" },
  { name: "Burgundy", hex: "#6B2D3E" },
  { name: "Charcoal", hex: "#3D3D3D" },
  { name: "Stone", hex: "#A89F91" },
  { name: "Rust", hex: "#A0522D" },
  { name: "Slate Blue", hex: "#6A7B8B" },
];

const BEAUTY_COLORS: Array<{ name: string; hex: string }> = [
  { name: "Natural", hex: "#E8C39E" },
  { name: "Rose", hex: "#C9717B" },
  { name: "Berry", hex: "#8E354A" },
  { name: "Coral", hex: "#E8836B" },
  { name: "Nude", hex: "#D5A68E" },
];

const ETHNIC_COLORS: Array<{ name: string; hex: string }> = [
  { name: "Maroon", hex: "#800000" },
  { name: "Royal Blue", hex: "#002366" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Emerald", hex: "#046307" },
  { name: "Magenta", hex: "#B5338A" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Teal", hex: "#008080" },
  { name: "Ivory", hex: "#FFFFF0" },
];

const PLACEHOLDER_BLUR = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

const CATEGORY_IMAGES: Record<string, string[]> = {
  // Men's
  "t-shirts": [
    "photo-1521572163474-6864f9cf17ab",
    "photo-1618354691373-d851c5c3a990",
    "photo-1583743814966-8936f5b7be1a",
  ],
  shirts: [
    "photo-1596755094514-f87e34085b2c",
    "photo-1602810318383-e386cc2a3ccf",
    "photo-1598033129183-c4f50c736c10",
  ],
  "casual-shirts": ["photo-1596755094514-f87e34085b2c", "photo-1598033129183-c4f50c736c10"],
  "formal-shirts": ["photo-1507003211169-0a1dd7228f2d", "photo-1617137968427-85924c800a22"],
  jeans: [
    "photo-1542272604-787c3835535d",
    "photo-1541099649105-f69ad21f3246",
    "photo-1475178626620-a4d074967571",
  ],
  trousers: ["photo-1473966968600-fa801b869a1a", "photo-1624378439575-d8705ad7ae80"],
  jackets: [
    "photo-1551028719-00167b16eac5",
    "photo-1548883354-7622d03aca27",
    "photo-1591047139829-d91aecb6caea",
  ],
  sweaters: ["photo-1576566588028-4147f3842f27", "photo-1620799140408-edc6dcb6d633"],
  polos: ["photo-1625910513413-5fc21ef20aee", "photo-1586363104862-3a5e2ab60d99"],
  kurtas: ["photo-1583391733956-6c78276477e2", "photo-1610030469983-98e550d6193c"],
  blazers: ["photo-1594938298603-c8148c4dae35", "photo-1593032465175-481ac7f401a0"],
  shorts: ["photo-1591195853828-11db59a44f6b", "photo-1562157873-818bc0726f68"],
  "track-pants": ["photo-1556906781-9a412961c28c", "photo-1515886657613-9f3515b0c78f"],
  sherwanis: ["photo-1583391733956-6c78276477e2"],
  "nehru-jackets": ["photo-1583391733956-6c78276477e2"],
  briefs: ["photo-1586363104862-3a5e2ab60d99"],
  boxers: ["photo-1586363104862-3a5e2ab60d99"],
  "casual-shoes": ["photo-1542291026-7eec264c27ff", "photo-1525966222134-fcfa99b8ae77"],
  "formal-shoes": ["photo-1533867617858-e7b97e060509", "photo-1614252235316-8c857d38b5f4"],
  sneakers: [
    "photo-1542291026-7eec264c27ff",
    "photo-1460353581641-37baddab0fa2",
    "photo-1552346154-21d32810aba3",
  ],
  "sports-shoes": ["photo-1542291026-7eec264c27ff", "photo-1606107557195-0e29a4b5b4aa"],

  // Women's
  dresses: [
    "photo-1572804013309-59a88b7e92f1",
    "photo-1595777457583-95e059d581b8",
    "photo-1496747611176-843222e1e57c",
  ],
  tops: [
    "photo-1469334031218-e382a71b716b",
    "photo-1485968579580-b6d095142e6e",
    "photo-1434389677669-e08b4cda3a73",
  ],
  skirts: ["photo-1583496661160-fb5886a773b9", "photo-1577900232427-18219b9166a0"],
  "jeans-women": ["photo-1541099649105-f69ad21f3246", "photo-1475178626620-a4d074967571"],
  "jackets-women": ["photo-1548624313-0396c75e4b1a", "photo-1591047139829-d91aecb6caea"],
  knitwear: ["photo-1576566588028-4147f3842f27", "photo-1620799140408-edc6dcb6d633"],
  "trousers-women": ["photo-1594633312681-425c7b97ccd1", "photo-1509631179647-0177331693ae"],
  "shorts-women": ["photo-1591195853828-11db59a44f6b"],
  blouses: ["photo-1564257631407-4deb1f99d992", "photo-1485968579580-b6d095142e6e"],
  sarees: ["photo-1610030469983-98e550d6193c", "photo-1583391733956-6c78276477e2"],
  kurtis: ["photo-1583391733956-6c78276477e2", "photo-1610030469983-98e550d6193c"],
  lehengas: ["photo-1583391733956-6c78276477e2"],
  "salwar-suits": ["photo-1583391733956-6c78276477e2"],
  bras: ["photo-1571513722275-4b41940f54b8"],
  nightwear: ["photo-1571513722275-4b41940f54b8"],
  "sports-bras": ["photo-1571513722275-4b41940f54b8"],
  tights: ["photo-1506629082955-511b1aa562c8"],
  flats: ["photo-1543163521-1bf539c55dd2", "photo-1515347619252-60a4bf4fff4f"],
  heels: ["photo-1543163521-1bf539c55dd2", "photo-1518049362265-d5b2a6467571"],
  boots: ["photo-1543163521-1bf539c55dd2"],
  jumpsuits: ["photo-1572804013309-59a88b7e92f1"],

  // Kids / Girls / Boys
  "kids-tshirts": ["photo-1503944583220-79d8926ad5e2", "photo-1519238263530-99bdd11df2ea"],
  "kids-dresses": ["photo-1518831959646-742c3a14ebf7", "photo-1503944583220-79d8926ad5e2"],
  "kids-jeans": ["photo-1503919545889-aef636e10ad4", "photo-1503944583220-79d8926ad5e2"],
  "kids-ethnic": ["photo-1583391733956-6c78276477e2"],
  "kids-shoes": ["photo-1542291026-7eec264c27ff"],
  "kids-winterwear": ["photo-1503944583220-79d8926ad5e2"],
  "girls-dresses": ["photo-1518831959646-742c3a14ebf7", "photo-1524504388940-b1c1722653e1"],
  "girls-tops": ["photo-1518831959646-742c3a14ebf7"],
  "girls-leggings": ["photo-1518831959646-742c3a14ebf7"],
  "girls-skirts": ["photo-1518831959646-742c3a14ebf7"],
  "girls-ethnic": ["photo-1583391733956-6c78276477e2"],
  "girls-winterwear": ["photo-1503944583220-79d8926ad5e2"],
  "boys-tshirts": ["photo-1503919545889-aef636e10ad4", "photo-1519238263530-99bdd11df2ea"],
  "boys-shirts": ["photo-1503919545889-aef636e10ad4"],
  "boys-jeans": ["photo-1503919545889-aef636e10ad4"],
  "boys-shorts": ["photo-1503919545889-aef636e10ad4"],
  "boys-ethnic": ["photo-1583391733956-6c78276477e2"],
  "boys-winterwear": ["photo-1503919545889-aef636e10ad4"],

  // Beautify
  moisturisers: ["photo-1570194065650-d99fb4bedf0a", "photo-1556228578-0d85b1a4d571"],
  serums: ["photo-1570194065650-d99fb4bedf0a", "photo-1620916566398-39f1143ab7be"],
  sunscreen: ["photo-1556228578-0d85b1a4d571"],
  lipstick: ["photo-1596462502278-27bfdc403348", "photo-1586495777744-4413f21062fa"],
  foundation: ["photo-1596462502278-27bfdc403348"],
  mascara: ["photo-1596462502278-27bfdc403348"],
  shampoo: ["photo-1556228578-0d85b1a4d571"],
  perfumes: ["photo-1541643600914-78b084683601", "photo-1523293182086-7651a899d37f"],
  deodorants: ["photo-1541643600914-78b084683601"],

  // Accessories
  "watches-men": ["photo-1524805444758-089113d48a6d", "photo-1522312346375-d1a52e2b99b3"],
  "watches-women": ["photo-1524805444758-089113d48a6d", "photo-1522312346375-d1a52e2b99b3"],
  "smart-watches": ["photo-1579586337278-3befd40fd17a", "photo-1544117519-31731f4fac3d"],
  handbags: ["photo-1548036328-c9fa89d128fa", "photo-1584917865442-de89df76afd3"],
  backpacks: ["photo-1553062407-98eeb64c6a62", "photo-1622560480605-d83c853bc5c3"],
  wallets: ["photo-1627123424574-724758594e93"],
  "belts-men": ["photo-1553062407-98eeb64c6a62"],
  earrings: ["photo-1515562141589-67f0d8e73dd5", "photo-1535632066927-ab7c9ab60908"],
  necklaces: ["photo-1515562141589-67f0d8e73dd5"],
  sunglasses: ["photo-1511499767150-a48a237f0083", "photo-1572635196237-14b3f281503f"],
};

function getProductImage(catSlug: string, productIdx: number): string {
  const images = CATEGORY_IMAGES[catSlug];
  if (images && images.length > 0) {
    const img = images[productIdx % images.length];
    return `https://images.unsplash.com/${img}?w=640&q=80`;
  }
  return "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=640&q=80";
}

// ---------------------------------------------------------------------------
// Product templates
// ---------------------------------------------------------------------------

type SizeChart = "tops" | "bottoms" | "shoes" | "kids" | "beauty" | "one" | "belts" | "bras";

type ProductTemplate = {
  title: string;
  catSlug: string;
  gender: "men" | "women" | "kids" | "girls" | "boys" | "beautify" | "accessories";
  priceRange: [number, number];
  description: string;
  fabric?: string;
  fit?: string;
  occasion?: string;
  sizeChart?: SizeChart;
  colorSet?: "default" | "beauty" | "ethnic";
  brandPool?: "fashion" | "luxury" | "beauty" | "accessory";
};

const productTemplates: ProductTemplate[] = [
  // =========================================================================
  // MEN'S — existing
  // =========================================================================

  // Men's T-Shirts
  {
    title: "Relaxed Fit Cotton Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [79900, 99900],
    description:
      "Heavyweight 240gsm cotton jersey with a relaxed drop-shoulder silhouette. Pre-washed for a lived-in softness.",
    fabric: "100% Cotton",
    fit: "Relaxed",
    occasion: "Casual",
  },
  {
    title: "Oversized Graphic Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [99900, 149900],
    description:
      "Bold oversized proportions with a screen-printed graphic at chest. Raw-edge hem detail.",
    fabric: "100% Cotton",
    fit: "Oversized",
    occasion: "Casual",
  },
  {
    title: "Slim Fit Crew Neck Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [59900, 79900],
    description: "Essential crew neck in a refined slim cut. Sueded cotton for buttery hand-feel.",
    fabric: "100% Supima Cotton",
    fit: "Slim",
    occasion: "Daily Wear",
  },
  {
    title: "Boxy Pocket Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [89900, 119900],
    description:
      "Square-cut body with a patch pocket at chest. Garment-dyed for a matte, worn-in finish.",
    fabric: "100% Cotton",
    fit: "Boxy",
    occasion: "Casual",
  },
  {
    title: "Textured Knit Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [129900, 179900],
    description:
      "Open-knit cotton blend with visible texture. Ribbed collar holds its shape after washing.",
    fabric: "85% Cotton, 15% Linen",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Long Sleeve Waffle Tee",
    catSlug: "t-shirts",
    gender: "men",
    priceRange: [119900, 159900],
    description:
      "Thermal waffle-knit texture with a contemporary longer body. Perfect layering weight.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
  },

  // Men's Shirts
  {
    title: "Oversized Linen Shirt",
    catSlug: "shirts",
    gender: "men",
    priceRange: [199900, 299900],
    description:
      "Washed pure linen in a generous boxy cut. Camp collar. Mother-of-pearl buttons. Intentionally unstructured.",
    fabric: "100% Linen",
    fit: "Oversized",
    occasion: "Casual",
  },
  {
    title: "Oxford Button-Down",
    catSlug: "shirts",
    gender: "men",
    priceRange: [179900, 249900],
    description:
      "Classic oxford cloth with a soft button-down collar. Locker loop at back yoke. Chest pocket.",
    fabric: "100% Cotton Oxford",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Poplin Spread Collar Shirt",
    catSlug: "shirts",
    gender: "men",
    priceRange: [159900, 229900],
    description:
      "Crisp cotton poplin with a modern spread collar. Slim placket. Convertible cuffs.",
    fabric: "100% Cotton Poplin",
    fit: "Slim",
    occasion: "Formal",
  },
  {
    title: "Flannel Check Shirt",
    catSlug: "shirts",
    gender: "men",
    priceRange: [199900, 279900],
    description:
      "Brushed cotton flannel in a tonal check pattern. Double-needle stitching. Curved hem.",
    fabric: "100% Cotton Flannel",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Linen-Blend Resort Shirt",
    catSlug: "shirts",
    gender: "men",
    priceRange: [249900, 349900],
    description:
      "Relaxed camp collar in a textured linen-cotton blend. All-over micro print. Short sleeves.",
    fabric: "55% Linen, 45% Cotton",
    fit: "Relaxed",
    occasion: "Casual",
  },

  // Men's Jeans
  {
    title: "Straight Fit Raw Selvedge",
    catSlug: "jeans",
    gender: "men",
    priceRange: [349900, 499900],
    description: "14oz Japanese selvedge denim. Unwashed for true raw fading. Chain-stitch hem.",
    fabric: "100% Cotton Denim",
    fit: "Straight",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Slim Tapered Jean",
    catSlug: "jeans",
    gender: "men",
    priceRange: [249900, 349900],
    description:
      "Comfortable stretch denim in a modern slim-tapered silhouette. Mid-rise. 5-pocket styling.",
    fabric: "98% Cotton, 2% Elastane",
    fit: "Slim Tapered",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Relaxed Wide-Leg Jean",
    catSlug: "jeans",
    gender: "men",
    priceRange: [299900, 399900],
    description:
      "Full relaxed cut with a wide straight leg. Vintage wash. Double knee reinforcement.",
    fabric: "100% Cotton Denim",
    fit: "Relaxed Wide",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Athletic Fit Jean",
    catSlug: "jeans",
    gender: "men",
    priceRange: [219900, 299900],
    description:
      "Extra room through thigh tapering to ankle. Hidden stretch for freedom of movement.",
    fabric: "97% Cotton, 3% Elastane",
    fit: "Athletic",
    occasion: "Casual",
    sizeChart: "bottoms",
  },

  // Men's Trousers
  {
    title: "Pleated Wide Trouser",
    catSlug: "trousers",
    gender: "men",
    priceRange: [299900, 449900],
    description:
      "Double-pleated front with a generous wide leg. Pressed crease. Side tabs at waist.",
    fabric: "100% Wool",
    fit: "Wide",
    occasion: "Formal",
    sizeChart: "bottoms",
  },
  {
    title: "Drawstring Linen Pant",
    catSlug: "trousers",
    gender: "men",
    priceRange: [199900, 279900],
    description: "Pure linen with an elasticated drawstring waist. Tapered leg. Side pockets.",
    fabric: "100% Linen",
    fit: "Relaxed",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Slim Chino",
    catSlug: "trousers",
    gender: "men",
    priceRange: [179900, 249900],
    description: "Washed cotton twill in a clean slim cut. Flat front. Welt pockets at back.",
    fabric: "98% Cotton, 2% Elastane",
    fit: "Slim",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Cargo Trouser",
    catSlug: "trousers",
    gender: "men",
    priceRange: [249900, 349900],
    description:
      "Utility cargo with bellowed pockets at thigh. Relaxed straight leg. Garment-dyed.",
    fabric: "100% Cotton Ripstop",
    fit: "Relaxed",
    occasion: "Casual",
    sizeChart: "bottoms",
  },

  // Men's Jackets
  {
    title: "Unstructured Linen Blazer",
    catSlug: "jackets",
    gender: "men",
    priceRange: [499900, 699900],
    description: "Half-lined linen blazer with natural shoulder. Patch pockets. Horn buttons.",
    fabric: "100% Linen",
    fit: "Regular",
    occasion: "Formal",
  },
  {
    title: "Waxed Cotton Field Jacket",
    catSlug: "jackets",
    gender: "men",
    priceRange: [599900, 799900],
    description: "British waxed cotton with corduroy collar. Four bellowed pockets. Throat latch.",
    fabric: "100% Waxed Cotton",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Bomber Jacket",
    catSlug: "jackets",
    gender: "men",
    priceRange: [349900, 499900],
    description: "Nylon shell with quilted satin lining. Ribbed collar, cuffs, and hem. Front zip.",
    fabric: "100% Nylon",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Denim Trucker Jacket",
    catSlug: "jackets",
    gender: "men",
    priceRange: [299900, 399900],
    description: "Classic trucker in rigid unwashed denim. Pointed collar. Button flap pockets.",
    fabric: "100% Cotton Denim",
    fit: "Regular",
    occasion: "Casual",
  },

  // Men's Sweaters
  {
    title: "Merino Wool Crew Neck",
    catSlug: "sweaters",
    gender: "men",
    priceRange: [299900, 449900],
    description: "Extra-fine merino in 12-gauge knit. Fully fashioned construction. Ribbed trims.",
    fabric: "100% Merino Wool",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Cashmere Half-Zip",
    catSlug: "sweaters",
    gender: "men",
    priceRange: [799900, 999900],
    description: "Grade-A Mongolian cashmere in a relaxed half-zip silhouette. Mock neck.",
    fabric: "100% Cashmere",
    fit: "Relaxed",
    occasion: "Casual",
  },
  {
    title: "Chunky Cable Knit",
    catSlug: "sweaters",
    gender: "men",
    priceRange: [399900, 549900],
    description: "Heavyweight Aran-inspired cable in a boxy frame. Saddle shoulder. Tubular trims.",
    fabric: "100% Lambswool",
    fit: "Boxy",
    occasion: "Casual",
  },
  {
    title: "Cotton-Linen Cardigan",
    catSlug: "sweaters",
    gender: "men",
    priceRange: [349900, 449900],
    description: "Open-knit cotton-linen blend. Shawl collar. Horn toggle closures.",
    fabric: "60% Cotton, 40% Linen",
    fit: "Regular",
    occasion: "Casual",
  },

  // =========================================================================
  // MEN'S — new categories
  // =========================================================================

  // Men's Formal Shirts
  {
    title: "Classic White Formal Shirt",
    catSlug: "formal-shirts",
    gender: "men",
    priceRange: [199900, 299900],
    description:
      "Crisp white cotton poplin with French cuffs and a cutaway collar. Tailored fit for a sharp silhouette.",
    fabric: "100% Cotton Poplin",
    fit: "Tailored",
    occasion: "Formal",
  },
  {
    title: "Striped Business Shirt",
    catSlug: "formal-shirts",
    gender: "men",
    priceRange: [229900, 329900],
    description:
      "Fine Bengal stripe in premium two-ply cotton. Spread collar. Single-needle stitching throughout.",
    fabric: "100% Two-Ply Cotton",
    fit: "Slim",
    occasion: "Formal",
  },

  // Men's Polos
  {
    title: "Pique Polo Shirt",
    catSlug: "polos",
    gender: "men",
    priceRange: [149900, 199900],
    description:
      "Classic pique knit polo with ribbed collar and two-button placket. Side vents at hem.",
    fabric: "100% Cotton Pique",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Mercerised Cotton Polo",
    catSlug: "polos",
    gender: "men",
    priceRange: [199900, 279900],
    description:
      "Luxurious mercerised cotton with a subtle sheen. Mother-of-pearl buttons. Tipped collar.",
    fabric: "100% Mercerised Cotton",
    fit: "Slim",
    occasion: "Casual",
  },

  // Men's Kurtas (Ethnic)
  {
    title: "Silk Blend Kurta",
    catSlug: "kurtas",
    gender: "men",
    priceRange: [299900, 499900],
    description:
      "Lustrous silk-cotton blend with subtle jacquard weave. Mandarin collar. Chest pocket.",
    fabric: "60% Silk, 40% Cotton",
    fit: "Regular",
    occasion: "Ethnic",
    colorSet: "ethnic",
  },
  {
    title: "Cotton Chikankari Kurta",
    catSlug: "kurtas",
    gender: "men",
    priceRange: [249900, 399900],
    description:
      "Handcrafted Lucknowi chikankari embroidery on fine cotton. Round neck. Side slits.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Traditional",
    colorSet: "ethnic",
  },
  {
    title: "Linen Pathani Kurta Set",
    catSlug: "kurtas",
    gender: "men",
    priceRange: [399900, 599900],
    description:
      "Pure linen kurta with matching salwar. Minimal embroidery at placket. Relaxed fit.",
    fabric: "100% Linen",
    fit: "Relaxed",
    occasion: "Ethnic",
    colorSet: "ethnic",
  },

  // Men's Sherwanis
  {
    title: "Embroidered Wedding Sherwani",
    catSlug: "sherwanis",
    gender: "men",
    priceRange: [1499900, 2499900],
    description:
      "Richly embroidered raw silk sherwani with zardozi work. Achkan collar. Comes with matching stole.",
    fabric: "100% Raw Silk",
    fit: "Tailored",
    occasion: "Traditional",
    colorSet: "ethnic",
    brandPool: "luxury",
  },
  {
    title: "Brocade Sherwani Set",
    catSlug: "sherwanis",
    gender: "men",
    priceRange: [999900, 1799900],
    description:
      "Banarasi brocade with metallic thread work. Includes churidar and dupatta. Regal silhouette.",
    fabric: "Silk Brocade",
    fit: "Regular",
    occasion: "Traditional",
    colorSet: "ethnic",
    brandPool: "luxury",
  },

  // Men's Blazers
  {
    title: "Single-Breasted Wool Blazer",
    catSlug: "blazers",
    gender: "men",
    priceRange: [599900, 899900],
    description: "Italian wool in a contemporary single-breasted cut. Notch lapel. Dual vent back.",
    fabric: "100% Italian Wool",
    fit: "Slim",
    occasion: "Formal",
  },
  {
    title: "Velvet Evening Blazer",
    catSlug: "blazers",
    gender: "men",
    priceRange: [799900, 1199900],
    description:
      "Cotton velvet with peak lapels and satin trim. Grosgrain-covered buttons. Perfect for evening.",
    fabric: "100% Cotton Velvet",
    fit: "Tailored",
    occasion: "Party Wear",
  },

  // Men's Shorts
  {
    title: "Chino Bermuda Shorts",
    catSlug: "shorts",
    gender: "men",
    priceRange: [149900, 199900],
    description:
      "Washed cotton twill in a tailored above-knee length. Belt loops. Welt back pockets.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Athletic Running Shorts",
    catSlug: "shorts",
    gender: "men",
    priceRange: [99900, 149900],
    description: "Lightweight polyester with built-in brief liner. Side split. Reflective logo.",
    fabric: "100% Polyester",
    fit: "Regular",
    occasion: "Sportswear",
    sizeChart: "bottoms",
  },

  // Men's Track Pants
  {
    title: "Jogger Track Pants",
    catSlug: "track-pants",
    gender: "men",
    priceRange: [149900, 229900],
    description: "French terry cotton joggers with ribbed cuffs. Drawstring waist. Zip pockets.",
    fabric: "80% Cotton, 20% Polyester",
    fit: "Regular",
    occasion: "Sportswear",
    sizeChart: "bottoms",
  },

  // Men's Innerwear
  {
    title: "Classic Trunk 3-Pack",
    catSlug: "briefs",
    gender: "men",
    priceRange: [89900, 129900],
    description: "Micro-modal trunks for all-day comfort. Flat waistband. No-ride-up technology.",
    fabric: "95% Micro Modal, 5% Elastane",
    fit: "Regular",
    occasion: "Daily Wear",
  },
  {
    title: "Printed Boxer 3-Pack",
    catSlug: "boxers",
    gender: "men",
    priceRange: [79900, 119900],
    description: "Woven cotton boxers with fun prints. Elastic waistband. Button fly.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Daily Wear",
  },

  // Men's Sneakers
  {
    title: "Leather Low-Top Sneaker",
    catSlug: "sneakers",
    gender: "men",
    priceRange: [499900, 799900],
    description:
      "Full-grain leather upper with perforated detail. Rubber cup sole. Leather insole.",
    fabric: "Leather",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "shoes",
  },
  {
    title: "Canvas High-Top Sneaker",
    catSlug: "sneakers",
    gender: "men",
    priceRange: [299900, 449900],
    description:
      "Heavyweight canvas upper with vulcanized rubber sole. Padded ankle collar. Lace-up.",
    fabric: "Canvas",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "shoes",
  },

  // =========================================================================
  // WOMEN'S — existing
  // =========================================================================

  // Women's Dresses
  {
    title: "Silk Slip Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [499900, 699900],
    description:
      "Bias-cut sandwashed silk with adjustable spaghetti straps. Cowl neck. Falls at mid-calf.",
    fabric: "100% Silk",
    fit: "Regular",
    occasion: "Party Wear",
  },
  {
    title: "Cotton Poplin Shirt Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [299900, 399900],
    description: "Crisp cotton shirt dress with self-belt. Spread collar. Button-through front.",
    fabric: "100% Cotton Poplin",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Ribbed Knit Midi Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [249900, 349900],
    description:
      "Body-conscious rib knit falling to mid-calf. Boat neck. Short sleeves. Back slit.",
    fabric: "95% Cotton, 5% Elastane",
    fit: "Slim",
    occasion: "Casual",
  },
  {
    title: "Linen Wrap Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [349900, 499900],
    description:
      "Pure linen with a true wrap construction. V-neck. Internal ties. Relaxed A-line skirt.",
    fabric: "100% Linen",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Pleated Maxi Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [399900, 599900],
    description: "Fluid accordion-pleated chiffon. High neck with back button. Fully lined.",
    fabric: "100% Polyester Chiffon",
    fit: "Regular",
    occasion: "Party Wear",
  },
  {
    title: "Denim Mini Dress",
    catSlug: "dresses",
    gender: "women",
    priceRange: [249900, 349900],
    description: "Stiff denim in a structured A-line mini. Zip-front. Contrast stitching.",
    fabric: "100% Cotton Denim",
    fit: "Regular",
    occasion: "Casual",
  },

  // Women's Tops
  {
    title: "Draped Satin Blouse",
    catSlug: "tops",
    gender: "women",
    priceRange: [299900, 449900],
    description: "Fluid satin with a draped front neckline. Concealed back zip. Puff sleeves.",
    fabric: "100% Polyester Satin",
    fit: "Regular",
    occasion: "Party Wear",
  },
  {
    title: "Cropped Ribbed Tank",
    catSlug: "tops",
    gender: "women",
    priceRange: [79900, 119900],
    description: "Fine rib cotton in a cropped length. Scoop neck. Narrow straps.",
    fabric: "95% Cotton, 5% Elastane",
    fit: "Slim",
    occasion: "Casual",
  },
  {
    title: "Oversized Cotton Shirt",
    catSlug: "tops",
    gender: "women",
    priceRange: [199900, 279900],
    description: "Borrowed-from-him proportions in washed cotton twill. Drop shoulder. Curved hem.",
    fabric: "100% Cotton",
    fit: "Oversized",
    occasion: "Casual",
  },
  {
    title: "Mesh Long-Sleeve Top",
    catSlug: "tops",
    gender: "women",
    priceRange: [149900, 199900],
    description: "Sheer mesh with a mock neck. Slim fit through body. Thumbhole cuffs.",
    fabric: "92% Nylon, 8% Elastane",
    fit: "Slim",
    occasion: "Party Wear",
  },
  {
    title: "Linen Peplum Top",
    catSlug: "tops",
    gender: "women",
    priceRange: [249900, 349900],
    description: "Pure linen with a structured peplum hem. Square neck. Wide straps.",
    fabric: "100% Linen",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Silk Camisole",
    catSlug: "tops",
    gender: "women",
    priceRange: [199900, 299900],
    description:
      "Lightweight silk charmeuse with French seams. Adjustable straps. Lace trim at hem.",
    fabric: "100% Silk",
    fit: "Regular",
    occasion: "Daily Wear",
  },

  // Women's Skirts
  {
    title: "Pleated Midi Skirt",
    catSlug: "skirts",
    gender: "women",
    priceRange: [249900, 379900],
    description: "Permanent knife pleats in a fluid twill. Sits at natural waist. Side zip.",
    fabric: "100% Polyester Twill",
    fit: "Regular",
    occasion: "Formal",
    sizeChart: "bottoms",
  },
  {
    title: "Denim A-Line Mini",
    catSlug: "skirts",
    gender: "women",
    priceRange: [179900, 249900],
    description: "Rigid denim in a clean A-line. Raw hem. Front button fly.",
    fabric: "100% Cotton Denim",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Leather Pencil Skirt",
    catSlug: "skirts",
    gender: "women",
    priceRange: [699900, 999900],
    description: "Supple lambskin leather with a back slit. Fully lined. Concealed back zip.",
    fabric: "100% Lambskin Leather",
    fit: "Slim",
    occasion: "Formal",
    sizeChart: "bottoms",
  },
  {
    title: "Wrap Linen Skirt",
    catSlug: "skirts",
    gender: "women",
    priceRange: [199900, 299900],
    description: "Washed linen in a wrap silhouette. Self-tie waist. Asymmetric hem.",
    fabric: "100% Linen",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "bottoms",
  },

  // Women's Jeans
  {
    title: "High-Rise Straight Jean",
    catSlug: "jeans-women",
    gender: "women",
    priceRange: [249900, 349900],
    description: "Rigid high-rise with a true straight leg. Full length. Vintage inspired wash.",
    fabric: "100% Cotton Denim",
    fit: "Straight",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Wide-Leg Cropped Jean",
    catSlug: "jeans-women",
    gender: "women",
    priceRange: [279900, 379900],
    description: "High waist with a dramatic wide leg cropped at ankle. Dark rinse wash.",
    fabric: "100% Cotton Denim",
    fit: "Wide",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Skinny High-Rise Jean",
    catSlug: "jeans-women",
    gender: "women",
    priceRange: [219900, 299900],
    description: "Power stretch for sculpted fit. High rise. Ankle length. Clean dark wash.",
    fabric: "92% Cotton, 6% Polyester, 2% Elastane",
    fit: "Skinny",
    occasion: "Casual",
    sizeChart: "bottoms",
  },
  {
    title: "Boyfriend Distressed Jean",
    catSlug: "jeans-women",
    gender: "women",
    priceRange: [279900, 399900],
    description:
      "Relaxed through hip and thigh with a tapered leg. Artisanal distressing. Mid-rise.",
    fabric: "100% Cotton Denim",
    fit: "Relaxed",
    occasion: "Casual",
    sizeChart: "bottoms",
  },

  // Women's Jackets
  {
    title: "Oversized Wool Blazer",
    catSlug: "jackets-women",
    gender: "women",
    priceRange: [599900, 799900],
    description: "Double-breasted in a mannish oversized cut. Peak lapel. Padded shoulder.",
    fabric: "100% Wool",
    fit: "Oversized",
    occasion: "Formal",
  },
  {
    title: "Cropped Leather Jacket",
    catSlug: "jackets-women",
    gender: "women",
    priceRange: [899900, 1299900],
    description:
      "Buttery lambskin in a cropped biker silhouette. Asymmetric zip. Quilted shoulders.",
    fabric: "100% Lambskin Leather",
    fit: "Slim",
    occasion: "Casual",
  },
  {
    title: "Quilted Liner Jacket",
    catSlug: "jackets-women",
    gender: "women",
    priceRange: [349900, 499900],
    description:
      "Lightweight quilted liner that layers under or over. Snap front. Hand-warmer pockets.",
    fabric: "100% Recycled Nylon",
    fit: "Regular",
    occasion: "Casual",
  },
  {
    title: "Trench Coat",
    catSlug: "jackets-women",
    gender: "women",
    priceRange: [699900, 999900],
    description:
      "Water-repellent cotton gabardine. Double-breasted. Storm flap. Self-belt. Knee length.",
    fabric: "100% Cotton Gabardine",
    fit: "Regular",
    occasion: "Formal",
  },

  // Women's Knitwear
  {
    title: "Cashmere Crew Neck",
    catSlug: "knitwear",
    gender: "women",
    priceRange: [599900, 899900],
    description: "Grade-A cashmere in a relaxed crew. Rolled edges at neckline. Hip length.",
    fabric: "100% Cashmere",
    fit: "Relaxed",
    occasion: "Casual",
  },
  {
    title: "Mohair-Blend Cardigan",
    catSlug: "knitwear",
    gender: "women",
    priceRange: [449900, 599900],
    description:
      "Fuzzy mohair-blend in an oversized open-front cardigan. Drop shoulder. Patch pockets.",
    fabric: "42% Mohair, 34% Nylon, 24% Wool",
    fit: "Oversized",
    occasion: "Casual",
  },
  {
    title: "Ribbed Turtleneck",
    catSlug: "knitwear",
    gender: "women",
    priceRange: [249900, 349900],
    description: "Fine-gauge merino rib with a fitted turtleneck. Extra-long sleeves. Thumbholes.",
    fabric: "100% Merino Wool",
    fit: "Slim",
    occasion: "Casual",
  },
  {
    title: "Intarsia Stripe Sweater",
    catSlug: "knitwear",
    gender: "women",
    priceRange: [349900, 499900],
    description: "Bold colour-block intarsia in a boxy frame. Crew neck. Dropped shoulder.",
    fabric: "100% Lambswool",
    fit: "Boxy",
    occasion: "Casual",
  },
  {
    title: "Cotton Polo Knit",
    catSlug: "knitwear",
    gender: "women",
    priceRange: [199900, 279900],
    description: "Textured cotton in a vintage-inspired polo. Three-button placket. Short sleeves.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
  },

  // =========================================================================
  // WOMEN'S — new categories
  // =========================================================================

  // Women's Ethnic — Sarees
  {
    title: "Banarasi Silk Saree",
    catSlug: "sarees",
    gender: "women",
    priceRange: [999900, 2499900],
    description:
      "Handwoven Banarasi silk with rich zari work border and pallu. Includes matching blouse piece.",
    fabric: "100% Pure Silk",
    fit: "Free Size",
    occasion: "Traditional",
    colorSet: "ethnic",
    brandPool: "luxury",
  },
  {
    title: "Chanderi Cotton Saree",
    catSlug: "sarees",
    gender: "women",
    priceRange: [399900, 699900],
    description:
      "Lightweight Chanderi cotton with delicate gold motifs. Perfect for daytime events.",
    fabric: "Chanderi Cotton-Silk",
    fit: "Free Size",
    occasion: "Traditional",
    colorSet: "ethnic",
  },
  {
    title: "Georgette Party Saree",
    catSlug: "sarees",
    gender: "women",
    priceRange: [299900, 599900],
    description:
      "Sequin-embellished georgette with a pre-stitched option. Contemporary drape for cocktail parties.",
    fabric: "Georgette",
    fit: "Free Size",
    occasion: "Party Wear",
    colorSet: "ethnic",
  },

  // Women's Ethnic — Kurtis
  {
    title: "Printed A-Line Kurti",
    catSlug: "kurtis",
    gender: "women",
    priceRange: [99900, 199900],
    description:
      "Breezy cotton kurti with block-print motifs. Notched mandarin collar. Side pockets.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Daily Wear",
    colorSet: "ethnic",
  },
  {
    title: "Embroidered Anarkali Kurti",
    catSlug: "kurtis",
    gender: "women",
    priceRange: [249900, 449900],
    description:
      "Flared anarkali silhouette with thread embroidery at yoke. Three-quarter sleeves.",
    fabric: "Rayon",
    fit: "Flared",
    occasion: "Ethnic",
    colorSet: "ethnic",
  },

  // Women's Ethnic — Lehengas
  {
    title: "Bridal Lehenga Set",
    catSlug: "lehengas",
    gender: "women",
    priceRange: [2999900, 4999900],
    description:
      "Heavily embroidered raw silk lehenga with matching choli and net dupatta. Zardozi and sequin work.",
    fabric: "Raw Silk",
    fit: "Custom",
    occasion: "Traditional",
    colorSet: "ethnic",
    brandPool: "luxury",
  },
  {
    title: "Georgette Party Lehenga",
    catSlug: "lehengas",
    gender: "women",
    priceRange: [999900, 1999900],
    description:
      "Mirror-work georgette lehenga with crop-top style blouse. Lightweight and contemporary.",
    fabric: "Georgette",
    fit: "Regular",
    occasion: "Party Wear",
    colorSet: "ethnic",
  },

  // Women's Lingerie
  {
    title: "T-Shirt Bra — Full Coverage",
    catSlug: "bras",
    gender: "women",
    priceRange: [99900, 179900],
    description: "Seamless moulded cups for a smooth finish under T-shirts. Wide comfort straps.",
    fabric: "84% Nylon, 16% Spandex",
    fit: "Regular",
    occasion: "Daily Wear",
    sizeChart: "bras",
  },
  {
    title: "Lace Padded Bra",
    catSlug: "bras",
    gender: "women",
    priceRange: [149900, 249900],
    description: "Delicate floral lace with light padding. Underwire support. Adjustable straps.",
    fabric: "75% Nylon, 25% Spandex",
    fit: "Regular",
    occasion: "Daily Wear",
    sizeChart: "bras",
  },

  // Women's Heels
  {
    title: "Pointed-Toe Stiletto Pump",
    catSlug: "heels",
    gender: "women",
    priceRange: [399900, 699900],
    description: "Classic stiletto pump with a 100mm heel. Padded insole. Leather lining.",
    fabric: "Leather",
    fit: "Regular",
    occasion: "Formal",
    sizeChart: "shoes",
  },
  {
    title: "Block Heel Sandal",
    catSlug: "heels",
    gender: "women",
    priceRange: [249900, 399900],
    description: "Strappy sandal with a comfortable 60mm block heel. Ankle buckle closure.",
    fabric: "Leather",
    fit: "Regular",
    occasion: "Party Wear",
    sizeChart: "shoes",
  },

  // Women's Boots
  {
    title: "Chelsea Ankle Boot",
    catSlug: "boots",
    gender: "women",
    priceRange: [499900, 799900],
    description: "Leather Chelsea boot with elastic side panels. Pull tab at back. Stacked heel.",
    fabric: "Leather",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "shoes",
  },

  // =========================================================================
  // KIDS
  // =========================================================================

  {
    title: "Dinosaur Print Tee",
    catSlug: "kids-tshirts",
    gender: "kids",
    priceRange: [49900, 79900],
    description:
      "Soft cotton tee with fun dinosaur graphics. Crew neck. Tagless label for comfort.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Daily Wear",
    sizeChart: "kids",
  },
  {
    title: "Striped Polo T-Shirt",
    catSlug: "kids-tshirts",
    gender: "kids",
    priceRange: [59900, 99900],
    description:
      "Classic polo in colourful stripes. Ribbed collar and cuffs. Three-button placket.",
    fabric: "100% Cotton Pique",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Floral Frock with Bow",
    catSlug: "kids-dresses",
    gender: "kids",
    priceRange: [79900, 139900],
    description: "Pretty floral print on cotton poplin. Self-fabric bow at waist. Lined bodice.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Party Wear",
    sizeChart: "kids",
  },
  {
    title: "Denim Dungaree Set",
    catSlug: "kids-jeans",
    gender: "kids",
    priceRange: [99900, 179900],
    description: "Adjustable strap dungarees in soft stretch denim. Includes a basic striped tee.",
    fabric: "98% Cotton, 2% Elastane",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Dhoti Kurta Set",
    catSlug: "kids-ethnic",
    gender: "kids",
    priceRange: [99900, 199900],
    description:
      "Festive kurta with matching dhoti pants. Embroidered placket. Available in bright festive colours.",
    fabric: "Cotton Silk",
    fit: "Regular",
    occasion: "Ethnic",
    sizeChart: "kids",
    colorSet: "ethnic",
  },
  {
    title: "Velcro School Shoes",
    catSlug: "kids-shoes",
    gender: "kids",
    priceRange: [79900, 129900],
    description:
      "Durable school shoes with easy velcro closure. Cushioned insole. Non-marking outsole.",
    fabric: "Synthetic Leather",
    fit: "Regular",
    occasion: "Daily Wear",
    sizeChart: "kids",
  },
  {
    title: "Puffer Jacket with Hood",
    catSlug: "kids-winterwear",
    gender: "kids",
    priceRange: [149900, 249900],
    description: "Water-resistant puffer with detachable hood. Fleece-lined pockets. Chin guard.",
    fabric: "100% Polyester",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },

  // =========================================================================
  // GIRLS
  // =========================================================================

  {
    title: "Butterfly Print Dress",
    catSlug: "girls-dresses",
    gender: "girls",
    priceRange: [69900, 129900],
    description:
      "Twirl-worthy cotton dress with all-over butterfly print. Puff sleeves. Tiered skirt.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Sequin Party Dress",
    catSlug: "girls-dresses",
    gender: "girls",
    priceRange: [149900, 249900],
    description: "Sparkly sequin bodice with tulle skirt. Satin sash at waist. Fully lined.",
    fabric: "Polyester/Tulle",
    fit: "Regular",
    occasion: "Party Wear",
    sizeChart: "kids",
  },
  {
    title: "Graphic Crop Top",
    catSlug: "girls-tops",
    gender: "girls",
    priceRange: [49900, 79900],
    description: "Trendy crop-length tee with fun graphic print. Round neck. Short sleeves.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Leggings 3-Pack",
    catSlug: "girls-leggings",
    gender: "girls",
    priceRange: [69900, 99900],
    description: "Comfortable stretch leggings in three solid colours. Elasticated waistband.",
    fabric: "95% Cotton, 5% Elastane",
    fit: "Slim",
    occasion: "Daily Wear",
    sizeChart: "kids",
  },
  {
    title: "Lehenga Choli Set",
    catSlug: "girls-ethnic",
    gender: "girls",
    priceRange: [149900, 299900],
    description: "Festive lehenga choli with mirror work and embroidery. Includes dupatta.",
    fabric: "Silk Blend",
    fit: "Regular",
    occasion: "Traditional",
    sizeChart: "kids",
    colorSet: "ethnic",
  },
  {
    title: "Fleece Zip-Up Hoodie",
    catSlug: "girls-winterwear",
    gender: "girls",
    priceRange: [99900, 179900],
    description: "Cozy fleece hoodie with cute ear details on hood. Front zip. Kangaroo pocket.",
    fabric: "100% Polyester Fleece",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },

  // =========================================================================
  // BOYS
  // =========================================================================

  {
    title: "Superhero Graphic Tee",
    catSlug: "boys-tshirts",
    gender: "boys",
    priceRange: [49900, 79900],
    description: "Action-hero print on soft cotton jersey. Glow-in-the-dark detail. Crew neck.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Check Casual Shirt",
    catSlug: "boys-shirts",
    gender: "boys",
    priceRange: [69900, 119900],
    description: "Classic check pattern in soft cotton. Chest pocket. Curved hem.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Slim Fit Jeans",
    catSlug: "boys-jeans",
    gender: "boys",
    priceRange: [79900, 149900],
    description: "Stretch denim jeans with adjustable inner waistband. 5-pocket styling.",
    fabric: "98% Cotton, 2% Elastane",
    fit: "Slim",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Cargo Shorts",
    catSlug: "boys-shorts",
    gender: "boys",
    priceRange: [59900, 99900],
    description: "Durable cotton cargo shorts with multiple pockets. Elasticated drawstring waist.",
    fabric: "100% Cotton",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },
  {
    title: "Silk Kurta Pyjama Set",
    catSlug: "boys-ethnic",
    gender: "boys",
    priceRange: [149900, 249900],
    description:
      "Festive silk-blend kurta with embroidered neckline and matching pyjama. Vibrant colours.",
    fabric: "Silk Cotton Blend",
    fit: "Regular",
    occasion: "Ethnic",
    sizeChart: "kids",
    colorSet: "ethnic",
  },
  {
    title: "Quilted Bomber Jacket",
    catSlug: "boys-winterwear",
    gender: "boys",
    priceRange: [129900, 229900],
    description:
      "Sporty quilted bomber with ribbed collar and cuffs. Zip-up front. Two side pockets.",
    fabric: "100% Polyester",
    fit: "Regular",
    occasion: "Casual",
    sizeChart: "kids",
  },

  // =========================================================================
  // BEAUTIFY
  // =========================================================================

  {
    title: "Hydrating Gel Moisturiser",
    catSlug: "moisturisers",
    gender: "beautify",
    priceRange: [69900, 149900],
    description:
      "Lightweight gel-cream with hyaluronic acid and niacinamide. 72-hour hydration. Non-comedogenic.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Vitamin C Brightening Serum",
    catSlug: "serums",
    gender: "beautify",
    priceRange: [99900, 249900],
    description:
      "15% Vitamin C with ferulic acid for radiant skin. Antioxidant protection. Fragrance-free.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "SPF 50+ Sunscreen",
    catSlug: "sunscreen",
    gender: "beautify",
    priceRange: [49900, 99900],
    description:
      "Broad-spectrum PA++++ sunscreen. Lightweight, no white cast. Water-resistant 80 min.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Matte Liquid Lipstick",
    catSlug: "lipstick",
    gender: "beautify",
    priceRange: [59900, 129900],
    description:
      "Long-wearing matte formula that doesn't transfer. Enriched with vitamin E. 12-hour wear.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Dewy Foundation SPF 25",
    catSlug: "foundation",
    gender: "beautify",
    priceRange: [99900, 249900],
    description:
      "Medium-coverage buildable foundation with a natural dewy finish. 20 inclusive shades.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Volumising Mascara",
    catSlug: "mascara",
    gender: "beautify",
    priceRange: [49900, 99900],
    description:
      "Hourglass-shaped brush for maximum volume. Smudge-proof and flake-proof. Easily removable.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Anti-Dandruff Shampoo",
    catSlug: "shampoo",
    gender: "beautify",
    priceRange: [29900, 69900],
    description:
      "Zinc pyrithione formula for flake-free hair. Gentle enough for daily use. Fresh mint scent.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Eau de Parfum — Noir",
    catSlug: "perfumes",
    gender: "beautify",
    priceRange: [299900, 799900],
    description:
      "Sophisticated woody-oriental fragrance. Notes of bergamot, oud wood, and vanilla. 100ml.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Party Wear",
    sizeChart: "beauty",
    colorSet: "beauty",
    brandPool: "beauty",
  },
  {
    title: "Fresh Deodorant Spray",
    catSlug: "deodorants",
    gender: "beautify",
    priceRange: [19900, 39900],
    description: "48-hour freshness. Alcohol-free formula. Cool aquatic scent. 150ml can.",
    fabric: "N/A",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    colorSet: "beauty",
    brandPool: "beauty",
  },

  // =========================================================================
  // ACCESSORIES
  // =========================================================================

  {
    title: "Chronograph Leather Watch",
    catSlug: "watches-men",
    gender: "accessories",
    priceRange: [499900, 999900],
    description:
      "Stainless steel case with genuine leather strap. Chronograph movement. Water-resistant 50m.",
    fabric: "Leather/Steel",
    fit: "N/A",
    occasion: "Formal",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Minimalist Rose Gold Watch",
    catSlug: "watches-women",
    gender: "accessories",
    priceRange: [399900, 799900],
    description:
      "Slim rose-gold case with mesh bracelet. Japanese quartz movement. Sapphire crystal glass.",
    fabric: "Stainless Steel",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Fitness Smart Watch",
    catSlug: "smart-watches",
    gender: "accessories",
    priceRange: [299900, 599900],
    description:
      "Heart rate, SpO2, sleep tracking. AMOLED always-on display. 7-day battery. 5ATM water resistance.",
    fabric: "Silicone/Aluminium",
    fit: "N/A",
    occasion: "Sportswear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Leather Tote Bag",
    catSlug: "handbags",
    gender: "accessories",
    priceRange: [399900, 799900],
    description:
      "Full-grain leather tote with interior zip pocket and laptop compartment. Magnetic snap closure.",
    fabric: "Leather",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Luxury Crossbody Bag",
    catSlug: "handbags",
    gender: "accessories",
    priceRange: [899900, 1999900],
    description:
      "Quilted lambskin crossbody with chain strap. Gold-tone hardware. Signature clasp.",
    fabric: "Lambskin Leather",
    fit: "N/A",
    occasion: "Party Wear",
    sizeChart: "one",
    brandPool: "luxury",
  },
  {
    title: "Urban Laptop Backpack",
    catSlug: "backpacks",
    gender: "accessories",
    priceRange: [199900, 399900],
    description:
      'Water-resistant fabric with padded laptop sleeve (up to 15"). USB charging port. Ergonomic straps.',
    fabric: "Polyester",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Slim Bi-Fold Wallet",
    catSlug: "wallets",
    gender: "accessories",
    priceRange: [149900, 349900],
    description:
      "Full-grain leather bi-fold with 8 card slots, 2 bill compartments, and coin pocket. RFID blocking.",
    fabric: "Leather",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Reversible Leather Belt",
    catSlug: "belts-men",
    gender: "accessories",
    priceRange: [199900, 399900],
    description: "Two-tone reversible belt in black and brown. Rotating buckle. Adjustable length.",
    fabric: "Leather",
    fit: "N/A",
    occasion: "Formal",
    sizeChart: "belts",
    brandPool: "accessory",
  },
  {
    title: "Statement Drop Earrings",
    catSlug: "earrings",
    gender: "accessories",
    priceRange: [99900, 299900],
    description:
      "Gold-plated drop earrings with semi-precious stone. Nickel-free. Butterfly clasp.",
    fabric: "Gold-Plated Brass",
    fit: "N/A",
    occasion: "Party Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Layered Pendant Necklace",
    catSlug: "necklaces",
    gender: "accessories",
    priceRange: [149900, 349900],
    description:
      "Delicate layered chains with minimalist pendants. Adjustable length. Tarnish-resistant.",
    fabric: "Sterling Silver",
    fit: "N/A",
    occasion: "Daily Wear",
    sizeChart: "one",
    brandPool: "accessory",
  },
  {
    title: "Aviator Sunglasses",
    catSlug: "sunglasses",
    gender: "accessories",
    priceRange: [299900, 599900],
    description:
      "Classic aviator frame with polarised lenses. UV400 protection. Spring-loaded temples.",
    fabric: "Metal/Glass",
    fit: "N/A",
    occasion: "Casual",
    sizeChart: "one",
    brandPool: "accessory",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateId(prefix: string, n: number): string {
  return `${prefix}-${String(n).padStart(4, "0")}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomBetween(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

function randomPrice(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) / 100) * 100;
}

function slugify(brandName: string, title: string): string {
  return `${brandName}-${title}`
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const fashionBrands = brands.filter((b) => b.id <= "br-08");
const luxuryBrands = brands.filter((b) => b.id >= "br-09" && b.id <= "br-18");
const beautyBrands = brands.filter((b) => b.id >= "br-19" && b.id <= "br-22");
const accessoryBrands = brands.filter((b) => b.id >= "br-23" && b.id <= "br-26");

function pickBrand(pool?: string): MockBrand {
  switch (pool) {
    case "luxury":
      return pick(luxuryBrands);
    case "beauty":
      return pick(beautyBrands);
    case "accessory":
      return pick(accessoryBrands);
    default:
      return Math.random() > 0.3 ? pick(fashionBrands) : pick(luxuryBrands);
  }
}

function getSizes(template: ProductTemplate): string[] {
  switch (template.sizeChart) {
    case "bottoms":
      return SIZES_BOTTOMS;
    case "shoes":
      return SIZES_SHOES;
    case "kids":
      return SIZES_KIDS;
    case "beauty":
      return SIZES_BEAUTY;
    case "one":
      return SIZES_ONE;
    case "belts":
      return SIZES_BELTS;
    case "bras":
      return SIZES_BRAS;
    default: {
      const slug = template.catSlug;
      if (
        slug.includes("jeans") ||
        slug === "trousers" ||
        slug.includes("trousers") ||
        slug === "skirts" ||
        slug === "shorts" ||
        slug.includes("shorts")
      )
        return SIZES_BOTTOMS;
      return SIZES_TOPS;
    }
  }
}

function getColors(template: ProductTemplate): Array<{ name: string; hex: string }> {
  switch (template.colorSet) {
    case "beauty":
      return BEAUTY_COLORS;
    case "ethnic":
      return ETHNIC_COLORS;
    default:
      return COLORS;
  }
}

function generateVariants(
  productId: string,
  template: ProductTemplate,
  brandSlug: string,
  colorCount: number,
): MockVariant[] {
  const sizes = getSizes(template);
  const allColors = getColors(template);
  const selectedColors = allColors.slice(0, Math.min(colorCount, allColors.length));
  const variants: MockVariant[] = [];
  let idx = 0;

  for (const color of selectedColors) {
    for (const size of sizes) {
      const price = randomPrice(template.priceRange[0], template.priceRange[1]);
      const hasDiscount = Math.random() > 0.5;
      const mrp = hasDiscount
        ? Math.round((price * (1 + Math.random() * 0.4 + 0.1)) / 100) * 100
        : price;

      variants.push({
        id: `${productId}-v${idx}`,
        sku: `${brandSlug}-${productId}-${color.name.toLowerCase().replace(/\s/g, "")}-${size}`.toUpperCase(),
        colorName: color.name,
        colorHex: color.hex,
        size,
        price,
        mrp,
        inStock: Math.random() > 0.15,
      });
      idx++;
    }
  }
  return variants;
}

function generateMedia(
  productId: string,
  title: string,
  catSlug: string,
  productIdx: number,
): MockMedia[] {
  const primaryUrl = getProductImage(catSlug, productIdx);
  return Array.from({ length: 4 }, (_, i) => ({
    id: `${productId}-m${i}`,
    url: i === 0 ? primaryUrl : getProductImage(catSlug, productIdx + i),
    blurhash: PLACEHOLDER_BLUR,
    width: 640,
    height: 800,
    kind: "image" as const,
    position: i,
    alt: `${title} — view ${i + 1}`,
  }));
}

function buildProducts(): MockProduct[] {
  const products: MockProduct[] = [];
  let idx = 1;

  for (const template of productTemplates) {
    const brandCount = Math.random() > 0.5 ? 2 : 1;
    const usedBrands = new Set<string>();

    for (let b = 0; b < brandCount; b++) {
      let brand: MockBrand;
      do {
        brand = pickBrand(template.brandPool);
      } while (usedBrands.has(brand.id));
      usedBrands.add(brand.id);

      const category = categories.find((c) => c.slug === template.catSlug);
      if (!category) continue;

      const productId = generateId("prod", idx);
      const slug = `${slugify(brand.name, template.title)}--${productId}`;
      const colorCount = randomBetween(2, 4);
      const variants = generateVariants(productId, template, brand.slug, colorCount);

      products.push({
        id: productId,
        slug,
        brandId: brand.id,
        categoryId: category.id,
        title: template.title,
        description: template.description,
        gender: template.gender,
        basePrice: Math.min(...variants.map((v) => v.price)),
        status: "active",
        ratingAvg: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        ratingCount: randomBetween(12, 2400),
        publishedAt: new Date(Date.now() - randomBetween(1, 180) * 86400000).toISOString(),
        variants,
        media: generateMedia(productId, `${brand.name} ${template.title}`, template.catSlug, idx),
        attributes: {
          ...(template.fabric && template.fabric !== "N/A" ? { fabric: template.fabric } : {}),
          ...(template.fit && template.fit !== "N/A" ? { fit: template.fit } : {}),
          pattern: "Solid",
          occasion: template.occasion ?? "Casual",
          ...(template.fabric !== "N/A" ? { washCare: "Machine Wash Cold" } : {}),
        },
      });
      idx++;
    }
  }
  return products;
}

// Seeded for consistent dev experience
const seed = 42;
let _seededRandom = seed;
const _origRandom = Math.random;
Math.random = () => {
  _seededRandom = (_seededRandom * 16807) % 2147483647;
  return (_seededRandom - 1) / 2147483646;
};
export const products: MockProduct[] = buildProducts();
Math.random = _origRandom;

export function getBrand(id: string): MockBrand | undefined {
  return brands.find((b) => b.id === id);
}

export function getCategory(id: string): MockCategory | undefined {
  return categories.find((c) => c.id === id);
}
