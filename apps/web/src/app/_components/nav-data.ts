export type NavCategory = {
  label: string;
  href: string;
  groups: NavGroup[];
  featuredImage?: string;
};

export type NavGroup = {
  title: string;
  links: { label: string; href: string }[];
};

export const NAV_CATEGORIES: NavCategory[] = [
  {
    label: "Men",
    href: "/men",
    featuredImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Topwear",
        links: [
          { label: "T-Shirts", href: "/men/t-shirts" },
          { label: "Casual Shirts", href: "/men/casual-shirts" },
          { label: "Formal Shirts", href: "/men/formal-shirts" },
          { label: "Polos", href: "/men/polos" },
          { label: "Kurtas", href: "/men/kurtas" },
          { label: "Jackets", href: "/men/jackets" },
          { label: "Blazers", href: "/men/blazers" },
          { label: "Sweaters & Sweatshirts", href: "/men/sweaters" },
        ],
      },
      {
        title: "Bottomwear",
        links: [
          { label: "Jeans", href: "/men/jeans" },
          { label: "Casual Trousers", href: "/men/casual-trousers" },
          { label: "Formal Trousers", href: "/men/formal-trousers" },
          { label: "Shorts", href: "/men/shorts" },
          { label: "Track Pants & Joggers", href: "/men/track-pants" },
        ],
      },
      {
        title: "Ethnic Wear",
        links: [
          { label: "Kurta Sets", href: "/men/kurta-sets" },
          { label: "Sherwanis", href: "/men/sherwanis" },
          { label: "Nehru Jackets", href: "/men/nehru-jackets" },
          { label: "Dhotis & Lungis", href: "/men/dhotis" },
        ],
      },
      {
        title: "Innerwear & Sleepwear",
        links: [
          { label: "Briefs & Trunks", href: "/men/briefs" },
          { label: "Vests", href: "/men/vests" },
          { label: "Boxers", href: "/men/boxers" },
          { label: "Thermals", href: "/men/thermals" },
          { label: "Pyjamas & Lounge", href: "/men/pyjamas" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Casual Shoes", href: "/men/casual-shoes" },
          { label: "Sports Shoes", href: "/men/sports-shoes" },
          { label: "Formal Shoes", href: "/men/formal-shoes" },
          { label: "Sandals & Floaters", href: "/men/sandals" },
          { label: "Sneakers", href: "/men/sneakers" },
        ],
      },
    ],
  },
  {
    label: "Women",
    href: "/women",
    featuredImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Western Wear",
        links: [
          { label: "Tops", href: "/women/tops" },
          { label: "Dresses", href: "/women/dresses" },
          { label: "Jeans", href: "/women/jeans" },
          { label: "Trousers & Capris", href: "/women/trousers" },
          { label: "Shorts & Skirts", href: "/women/shorts-skirts" },
          { label: "Jackets & Coats", href: "/women/jackets" },
          { label: "Jumpsuits", href: "/women/jumpsuits" },
        ],
      },
      {
        title: "Ethnic Wear",
        links: [
          { label: "Sarees", href: "/women/sarees" },
          { label: "Kurtis & Suits", href: "/women/kurtis" },
          { label: "Lehengas", href: "/women/lehengas" },
          { label: "Salwar Suits", href: "/women/salwar-suits" },
          { label: "Blouses", href: "/women/blouses" },
          { label: "Dupattas", href: "/women/dupattas" },
        ],
      },
      {
        title: "Lingerie & Sleepwear",
        links: [
          { label: "Bras", href: "/women/bras" },
          { label: "Panties", href: "/women/panties" },
          { label: "Nightdresses & Nighties", href: "/women/nightdresses" },
          { label: "Shapewear", href: "/women/shapewear" },
          { label: "Loungewear", href: "/women/loungewear" },
        ],
      },
      {
        title: "Activewear",
        links: [
          { label: "Sports Bras", href: "/women/sports-bras" },
          { label: "Tights & Leggings", href: "/women/tights" },
          { label: "Track Pants", href: "/women/track-pants" },
          { label: "Jackets & Sweatshirts", href: "/women/active-jackets" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Flats", href: "/women/flats" },
          { label: "Heels", href: "/women/heels" },
          { label: "Casual Shoes", href: "/women/casual-shoes" },
          { label: "Sports Shoes", href: "/women/sports-shoes" },
          { label: "Boots", href: "/women/boots" },
        ],
      },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
    featuredImage:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Boys Clothing",
        links: [
          { label: "T-Shirts", href: "/kids/boys-t-shirts" },
          { label: "Shirts", href: "/kids/boys-shirts" },
          { label: "Jeans", href: "/kids/boys-jeans" },
          { label: "Shorts", href: "/kids/boys-shorts" },
          { label: "Ethnic Wear", href: "/kids/boys-ethnic" },
          { label: "Winterwear", href: "/kids/boys-winterwear" },
        ],
      },
      {
        title: "Girls Clothing",
        links: [
          { label: "Dresses & Frocks", href: "/kids/girls-dresses" },
          { label: "Tops", href: "/kids/girls-tops" },
          { label: "Leggings", href: "/kids/girls-leggings" },
          { label: "Skirts", href: "/kids/girls-skirts" },
          { label: "Ethnic Wear", href: "/kids/girls-ethnic" },
          { label: "Winterwear", href: "/kids/girls-winterwear" },
        ],
      },
      {
        title: "Baby (0-2 yrs)",
        links: [
          { label: "Bodysuits", href: "/kids/baby-bodysuits" },
          { label: "Rompers", href: "/kids/baby-rompers" },
          { label: "Sets", href: "/kids/baby-sets" },
          { label: "Nightwear", href: "/kids/baby-nightwear" },
        ],
      },
      {
        title: "Footwear",
        links: [
          { label: "Boys Shoes", href: "/kids/boys-shoes" },
          { label: "Girls Shoes", href: "/kids/girls-shoes" },
          { label: "School Shoes", href: "/kids/school-shoes" },
          { label: "Sandals", href: "/kids/sandals" },
        ],
      },
    ],
  },
  {
    label: "Girls",
    href: "/girls",
    featuredImage:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Clothing",
        links: [
          { label: "Dresses & Frocks", href: "/girls/dresses" },
          { label: "Tops & Tees", href: "/girls/tops" },
          { label: "Leggings & Jeans", href: "/girls/leggings" },
          { label: "Skirts & Shorts", href: "/girls/skirts" },
          { label: "Jumpsuits", href: "/girls/jumpsuits" },
        ],
      },
      {
        title: "Ethnic Wear",
        links: [
          { label: "Lehenga Cholis", href: "/girls/lehenga-cholis" },
          { label: "Salwar Suits", href: "/girls/salwar-suits" },
          { label: "Kurtis", href: "/girls/kurtis" },
          { label: "Sarees (Teen)", href: "/girls/sarees" },
        ],
      },
      {
        title: "Winterwear",
        links: [
          { label: "Jackets", href: "/girls/jackets" },
          { label: "Sweaters", href: "/girls/sweaters" },
          { label: "Sweatshirts", href: "/girls/sweatshirts" },
          { label: "Thermals", href: "/girls/thermals" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Hair Accessories", href: "/girls/hair-accessories" },
          { label: "Bags", href: "/girls/bags" },
          { label: "Jewellery", href: "/girls/jewellery" },
          { label: "Watches", href: "/girls/watches" },
        ],
      },
    ],
  },
  {
    label: "Boys",
    href: "/boys",
    featuredImage:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Clothing",
        links: [
          { label: "T-Shirts", href: "/boys/t-shirts" },
          { label: "Shirts", href: "/boys/shirts" },
          { label: "Jeans & Trousers", href: "/boys/jeans" },
          { label: "Shorts", href: "/boys/shorts" },
          { label: "Track Pants", href: "/boys/track-pants" },
        ],
      },
      {
        title: "Ethnic Wear",
        links: [
          { label: "Kurta Sets", href: "/boys/kurta-sets" },
          { label: "Sherwanis", href: "/boys/sherwanis" },
          { label: "Nehru Jackets", href: "/boys/nehru-jackets" },
        ],
      },
      {
        title: "Winterwear",
        links: [
          { label: "Jackets", href: "/boys/jackets" },
          { label: "Sweaters", href: "/boys/sweaters" },
          { label: "Sweatshirts", href: "/boys/sweatshirts" },
          { label: "Thermals", href: "/boys/thermals" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Bags", href: "/boys/bags" },
          { label: "Watches", href: "/boys/watches" },
          { label: "Belts", href: "/boys/belts" },
          { label: "Caps & Hats", href: "/boys/caps" },
        ],
      },
    ],
  },
  {
    label: "Beautify",
    href: "/beautify",
    featuredImage:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Skincare",
        links: [
          { label: "Moisturisers", href: "/beautify/moisturisers" },
          { label: "Serums", href: "/beautify/serums" },
          { label: "Sunscreen", href: "/beautify/sunscreen" },
          { label: "Face Wash", href: "/beautify/face-wash" },
          { label: "Face Masks", href: "/beautify/face-masks" },
          { label: "Lip Care", href: "/beautify/lip-care" },
        ],
      },
      {
        title: "Makeup",
        links: [
          { label: "Lipstick", href: "/beautify/lipstick" },
          { label: "Foundation", href: "/beautify/foundation" },
          { label: "Mascara", href: "/beautify/mascara" },
          { label: "Eyeshadow", href: "/beautify/eyeshadow" },
          { label: "Compact", href: "/beautify/compact" },
          { label: "Nail Polish", href: "/beautify/nail-polish" },
        ],
      },
      {
        title: "Haircare",
        links: [
          { label: "Shampoo", href: "/beautify/shampoo" },
          { label: "Conditioner", href: "/beautify/conditioner" },
          { label: "Hair Oil", href: "/beautify/hair-oil" },
          { label: "Hair Serum", href: "/beautify/hair-serum" },
          { label: "Hair Color", href: "/beautify/hair-color" },
        ],
      },
      {
        title: "Fragrances",
        links: [
          { label: "Perfumes", href: "/beautify/perfumes" },
          { label: "Deodorants", href: "/beautify/deodorants" },
          { label: "Body Mists", href: "/beautify/body-mists" },
          { label: "Gift Sets", href: "/beautify/gift-sets" },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    href: "/accessories",
    featuredImage:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
    groups: [
      {
        title: "Watches",
        links: [
          { label: "Men's Watches", href: "/accessories/mens-watches" },
          { label: "Women's Watches", href: "/accessories/womens-watches" },
          { label: "Smart Watches", href: "/accessories/smart-watches" },
          { label: "Luxury Watches", href: "/accessories/luxury-watches" },
        ],
      },
      {
        title: "Bags & Purses",
        links: [
          { label: "Handbags", href: "/accessories/handbags" },
          { label: "Backpacks", href: "/accessories/backpacks" },
          { label: "Wallets", href: "/accessories/wallets" },
          { label: "Clutches", href: "/accessories/clutches" },
          { label: "Tote Bags", href: "/accessories/tote-bags" },
          { label: "Laptop Bags", href: "/accessories/laptop-bags" },
        ],
      },
      {
        title: "Belts & Wallets",
        links: [
          { label: "Men's Belts", href: "/accessories/mens-belts" },
          { label: "Women's Belts", href: "/accessories/womens-belts" },
          { label: "Wallets", href: "/accessories/wallets" },
          { label: "Card Holders", href: "/accessories/card-holders" },
        ],
      },
      {
        title: "Jewellery & Sunglasses",
        links: [
          { label: "Earrings", href: "/accessories/earrings" },
          { label: "Necklaces", href: "/accessories/necklaces" },
          { label: "Rings", href: "/accessories/rings" },
          { label: "Bracelets", href: "/accessories/bracelets" },
          { label: "Sunglasses", href: "/accessories/sunglasses" },
        ],
      },
    ],
  },
];

export const BRAND_LINKS: { label: string; href: string }[] = [
  { label: "All Brands", href: "/brands" },
  { label: "Gucci", href: "/brands/gucci" },
  { label: "Prada", href: "/brands/prada" },
  { label: "Louis Vuitton", href: "/brands/louis-vuitton" },
  { label: "Versace", href: "/brands/versace" },
  { label: "Burberry", href: "/brands/burberry" },
  { label: "Dior", href: "/brands/dior" },
  { label: "Balenciaga", href: "/brands/balenciaga" },
  { label: "Armani", href: "/brands/armani" },
  { label: "Valentino", href: "/brands/valentino" },
  { label: "Fendi", href: "/brands/fendi" },
  { label: "Dolce & Gabbana", href: "/brands/dolce-gabbana" },
];
