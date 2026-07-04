export interface Product {
  id: string;
  name: string;
  category: "footwear" | "apparel" | "accessories";
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  sizes: string[];
  specs: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: "cr7-mercurial-fg",
    name: "CR7 Mercurial Superfly 9 Elite FG",
    category: "footwear",
    price: 279,
    rating: 5.0,
    reviewsCount: 154,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    badge: "Gold Edition",
    description: "Built for the defining moments of the game. Featuring a football-specific 3/4 Zoom Air unit underfoot, these boots provide elite responsiveness to secure your victory. Adorned with signature CR7 legacy patterns in Crimson, Gold, and Emerald.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    specs: [
      "3/4 Zoom Air unit for springy underfoot feel",
      "Vaporposite+ upper combining grippy mesh with premium lining",
      "Tri-star studs for multi-directional traction",
      "Dynamic Fit collar wraps your ankle in soft, stretchy knit"
    ],
    stock: 7
  },
  {
    id: "cr7-strike-jersey",
    name: "CR7 Strike Elite Training Jersey",
    category: "apparel",
    price: 75,
    rating: 4.8,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    badge: "Best Seller",
    description: "Designed for relentless workouts. Advanced moisture-wicking technology combined with targeted breathability areas keeps you cool and focused when training intensifies. Features the iconic CR7 speed lines.",
    sizes: ["S", "M", "L", "XL"],
    specs: [
      "Dri-FIT ADV technology combines moisture-wicking fabric with advanced engineering",
      "Open-hole fabric in high-heat zones",
      "Lightweight, streamlined fit that doesn't cling",
      "100% recycled polyester fibers"
    ],
    stock: 24
  },
  {
    id: "cr7-ballon-hoodie",
    name: "Ballon d'Or Gold Edition Hoodie",
    category: "apparel",
    price: 120,
    rating: 4.9,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1556821552-ec28bca24d6a?w=500&h=500&fit=crop",
    badge: "Limited Drop",
    description: "Celebrate the pursuit of greatness. Crafted with heavy, double-knit cotton fleece and detailed with premium 24K gold embroidery detailing Cristiano Ronaldo's record achievements.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: [
      "Ultra-heavyweight 450 GSM French Terry cotton",
      "Embroidered metallic gold CR7 monogram and signature",
      "Lined crossover hood with metallic aglets",
      "Hidden zippered pocket for secure storage"
    ],
    stock: 5
  },
  {
    id: "cr7-pro-shorts",
    name: "CR7 Pro-Vent Training Shorts",
    category: "apparel",
    price: 55,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1506629082632-401ba2c29042?w=500&h=500&fit=crop",
    description: "Engineered for maximum range of motion. Lightweight stretch fabric and split side hems let you sprint, jump, and change directions without restriction. Includes a secure phone sleeve within the liner.",
    sizes: ["S", "M", "L", "XL"],
    specs: [
      "4-way stretch woven fabric",
      "Perforated waistband with internal drawcord",
      "Side zipper pockets and media pocket in tight-liner",
      "Reflective CR7 branding for low-light visibility"
    ],
    stock: 15
  },
  {
    id: "cr7-compression-top",
    name: "CR7 Vapor Compression Baselayer",
    category: "apparel",
    price: 65,
    rating: 4.8,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1502458551821-bc82f50974d3?w=500&h=500&fit=crop",
    badge: "New Release",
    description: "Your second skin. Provides high-compression support to major muscle groups, reducing vibration and speeding recovery. Engineered mesh zones offer high ventilation under intense training.",
    sizes: ["S", "M", "L", "XL"],
    specs: [
      "Ergonomic seams prevent chafing",
      "High-stretch spandex blend for locked-in support",
      "Zonal ventilation mapping on back and underarms",
      "Sweat-wicking and quick-drying core fibers"
    ],
    stock: 30
  },
  {
    id: "cr7-legacy-armband",
    name: "CR7 Legacy Captain's Armband",
    category: "accessories",
    price: 20,
    rating: 4.9,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    badge: "Essential",
    description: "Lead your team with the spirit of a champion. Premium elastic captain armband featuring the majestic 'C' gold monogram, personal signature of Cristiano Ronaldo, and a secure hook-and-loop strap.",
    sizes: ["One Size"],
    specs: [
      "Extra-stretch durable elastic construction",
      "Heavy-duty hook-and-loop adjustable fastener",
      "Silicon grip-print on the inside prevents slipping during sprints",
      "Official licensed CR7 merchandise design"
    ],
    stock: 120
  },
  {
    id: "cr7-pitch-ball",
    name: "CR7 Pitch Elite Training Soccer Ball",
    category: "accessories",
    price: 40,
    rating: 4.6,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop",
    description: "Master your ball control. Built with high-contrast graphic panels tracking rotation and speed, a textured casing for optimal spin and grip, and a reinforced rubber bladder.",
    sizes: ["4", "5"],
    specs: [
      "12-panel machine-stitched design for durability",
      "High-contrast visual power tracking print",
      "Textured TPU casing for consistent touch",
      "Reinforced butyl rubber bladder holds air and shape"
    ],
    stock: 45
  },
  {
    id: "cr7-ultra-socks",
    name: "CR7 Ultra-Vent Speed Socks",
    category: "accessories",
    price: 18,
    rating: 4.7,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    description: "Advanced grip socks for sudden shifts in direction. Cushioned zones absorb impact, while silicone grip pads at the sole keep your foot locked into your boots, eliminating energy loss.",
    sizes: ["M (6-8)", "L (8-11)", "XL (11-13)"],
    specs: [
      "Sole silicone traction pads for non-slip grip inside footwear",
      "Zonal cushioning in heel and toe areas",
      "Mesh ventilation at midfoot for breathability",
      "Dynamic arch compression band for snug support"
    ],
    stock: 80
  }
];
