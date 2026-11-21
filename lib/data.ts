// Catalogue data for the Diya demo storefront.
// Images are Unsplash photo URLs; lib/image-loader.ts adds sizing params.

export const img = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Variant = { name: string; priceDelta: number };

export type Product = {
  slug: string;
  name: string;
  category: string;
  rooms: string[];
  material: string;
  color: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  images: string[];
  badge?: "Bestseller" | "New" | "Handmade" | "Limited";
  fastDelivery?: boolean;
  festive?: boolean;
  variantLabel?: string;
  variants?: Variant[];
  blurb: string;
  highlights: string[];
  dimensions: string;
};

export type Category = { slug: string; name: string; image: string; blurb: string; subs: string[] };
export type Room = { slug: string; name: string; image: string };

const P = {
  cactus: img("1459411552884-841db9b3cc2a"),
  succulent: img("1485955900006-10f4d324d411"),
  budVase: img("1490312278390-ab64016e0aa9"),
  livingGrey: img("1493663284031-b7e3aefcae8e"),
  stool: img("1503602642458-232111445657"),
  bedClassic: img("1505693416388-ac5ce068fe85"),
  kitchen: img("1507089947368-19c1da9775ae"),
  pendant: img("1513506003901-1e6a229e2d15"),
  frames: img("1513519245088-0e12902e5a38"),
  floorLamp: img("1513694203232-719a280e022f"),
  giftRed: img("1513885535751-8b9238bd345a"),
  mug: img("1514228742587-6b1558fcca3d"),
  ficus: img("1520412099551-62b6bafeb5bb"),
  bedsideLamp: img("1522771739844-6a9f6d5f14af"),
  studio: img("1524758631624-e2822e304c36"),
  bedWhite: img("1540518614846-7eded433c457"),
  tanSofa: img("1540574163026-643ea20ade25"),
  dining: img("1544457070-4cd773b4d71e"),
  tote: img("1544816155-12df9643f363"),
  giftPink: img("1549465220-1a8b9238cd48"),
  velvetSofa: img("1555041469-a586c61ea9bc"),
  clock: img("1563861826100-9cb868fdbe1c"),
  slateVases: img("1565193566173-7a0ee3dbe261"),
  snakePlant: img("1567225557594-88d73e55f2cb"),
  ivoryChair: img("1567538096630-e0c55bd6374c"),
  soyCandle: img("1572726729207-a78d6feb18d7"),
  blueCushions: img("1575414003591-ece8d0416c7a"),
  tumbler: img("1577937927133-66ef06acdf18"),
  bluePlates: img("1578749556568-bc2c40e68b61"),
  tuftedCushions: img("1579656381226-5fc0f0100c3b"),
  pillow: img("1584100936595-c0654b55a2e2"),
  bellyVases: img("1584589167171-541ce45f1eea"),
  bath: img("1584622650111-993a426fbf0a"),
  blackChair: img("1592078615290-033ee584e267"),
  shelves: img("1594026112284-02bb6f3352fe"),
  waffleBed: img("1595526114035-0d45ed16cfbf"),
  rug: img("1600166898405-da9535204843"),
  amberCandle: img("1602874801007-bd458bb1b8b6"),
  candleDuo: img("1603006905003-be475563bc59"),
  corkBowls: img("1603199506016-b9a594b593c0"),
  diningGreen: img("1604578762246-41134e37f9cc"),
  loungeChair: img("1606744824163-985d376605aa"),
  nestingBowls: img("1610701596007-11502861dcfa"),
  dinnerSet: img("1610701596061-2ecf227e85b2"),
  urnVase: img("1612196808214-b8e1d6145a8c"),
  bedroomRust: img("1615874959474-d609969a20ed"),
  livingBright: img("1616486338812-3dadae4b4ace"),
  stripeCushion: img("1616627561950-9f746e330187"),
  diningEmerald: img("1617806118233-18e1de247200"),
  livingGold: img("1618220179428-22790b461013"),
  bathTub: img("1620626011761-996317b8d101"),
  knitThrow: img("1629949009765-40fc74c9ec21"),
  bedLinen: img("1631049307264-da0ec9d70304"),
  bedHotel: img("1631889993959-41b4e9c6e3c5"),
};

export const photos = P;

export const categories: Category[] = [
  { slug: "bedding", name: "Bedding", image: P.bedClassic, blurb: "Breathable cotton and linen for slow mornings.", subs: ["Bedsheets", "Duvet covers", "Comforters", "Pillows", "Dohars"] },
  { slug: "cushions-throws", name: "Cushions & Throws", image: P.stripeCushion, blurb: "Texture, colour and a soft place to land.", subs: ["Cushion covers", "Cushion sets", "Throws", "Floor cushions"] },
  { slug: "decor", name: "Home Décor", image: P.urnVase, blurb: "Vases, clocks and wall art with a handmade hand.", subs: ["Vases", "Wall art", "Clocks", "Showpieces", "Frames"] },
  { slug: "lighting", name: "Lamps & Lighting", image: P.pendant, blurb: "Warm light for every corner.", subs: ["Pendant lights", "Floor lamps", "Table lamps"] },
  { slug: "candles", name: "Candles & Fragrance", image: P.amberCandle, blurb: "Hand-poured soy candles in Indian scents.", subs: ["Jar candles", "Candle sets", "Diyas & tealights"] },
  { slug: "kitchen-dining", name: "Kitchen & Dining", image: P.dinnerSet, blurb: "Stoneware made for everyday thalis and long dinners.", subs: ["Dinner sets", "Plates", "Bowls", "Mugs", "Drinkware"] },
  { slug: "furniture", name: "Accent Furniture", image: P.velvetSofa, blurb: "Statement pieces that settle in.", subs: ["Sofas", "Accent chairs", "Stools", "Shelves"] },
  { slug: "rugs", name: "Rugs & Dhurries", image: P.rug, blurb: "Handwoven underfoot.", subs: ["Area rugs", "Dhurries", "Runners"] },
  { slug: "garden", name: "Plants & Planters", image: P.succulent, blurb: "Greenery for sills, balconies and desks.", subs: ["Planters", "Live plants", "Faux plants"] },
  { slug: "gifts", name: "Gifts", image: P.giftPink, blurb: "Wrapped, ready and thoughtfully chosen.", subs: ["Gift boxes", "Hampers", "Under ₹999"] },
];

export const rooms: Room[] = [
  { slug: "living-room", name: "Living Room", image: P.livingGold },
  { slug: "bedroom", name: "Bedroom", image: P.bedroomRust },
  { slug: "dining", name: "Dining", image: P.diningEmerald },
  { slug: "kitchen", name: "Kitchen", image: P.kitchen },
  { slug: "bath", name: "Bath", image: P.bathTub },
  { slug: "study", name: "Study & Work", image: P.studio },
];

const careDefault = "Wipe with a soft dry cloth. Keep away from direct sunlight and moisture.";

type Seed = Omit<Product, "highlights" | "dimensions"> & { highlights?: string[]; dimensions?: string };

const seeds: Seed[] = [
  // Bedding
  { slug: "ivory-percale-bedsheet-set", name: "Ivory Hotel Percale Bedsheet Set", category: "bedding", rooms: ["bedroom"], material: "Cotton", color: "White", price: 1899, mrp: 3499, rating: 4.7, reviews: 1284, images: [P.bedClassic, P.bedHotel], badge: "Bestseller", fastDelivery: true, variantLabel: "Size", variants: [{ name: "Single", priceDelta: -500 }, { name: "Queen", priceDelta: 0 }, { name: "King", priceDelta: 400 }], blurb: "A crisp 300 thread-count percale weave that gets softer with every wash. Includes one fitted sheet and two pillow covers.", highlights: ["300 TC long-staple cotton", "Fits mattresses up to 10 inches deep", "Hotel-style 2-inch hem"], dimensions: "Queen fitted sheet: 152 × 198 cm; pillow covers: 46 × 69 cm" },
  { slug: "cloud-grey-waffle-duvet-cover", name: "Cloud Grey Waffle Duvet Cover", category: "bedding", rooms: ["bedroom"], material: "Cotton", color: "Grey", price: 2499, mrp: 4299, rating: 4.6, reviews: 412, images: [P.waffleBed, P.bedLinen], badge: "New", variantLabel: "Size", variants: [{ name: "Queen", priceDelta: 0 }, { name: "King", priceDelta: 500 }], blurb: "A textured waffle-knit cover with hidden coconut-shell buttons. Light enough for Indian summers, cosy over a quilt in winter.", dimensions: "Queen: 228 × 228 cm" },
  { slug: "sandstone-linen-bed-set", name: "Sandstone Linen Blend Bed Set", category: "bedding", rooms: ["bedroom"], material: "Linen", color: "Beige", price: 3299, mrp: 5499, rating: 4.5, reviews: 238, images: [P.bedLinen, P.bedroomRust], badge: "Handmade", blurb: "Stonewashed linen-cotton for that relaxed, lived-in drape. Naturally temperature-regulating.", dimensions: "King flat sheet: 274 × 274 cm" },
  { slug: "crisp-white-sateen-bedding", name: "Crisp White Sateen Bedding", category: "bedding", rooms: ["bedroom"], material: "Cotton", color: "White", price: 2199, mrp: 3999, rating: 4.4, reviews: 356, images: [P.bedWhite, P.bedClassic], fastDelivery: true, blurb: "A silky sateen finish with a subtle sheen. The classic hotel-white look." },
  { slug: "stone-grey-comforter", name: "Stone Grey Microfibre Comforter", category: "bedding", rooms: ["bedroom"], material: "Microfibre", color: "Grey", price: 2799, mrp: 4999, rating: 4.3, reviews: 189, images: [P.bedHotel, P.waffleBed], blurb: "All-season fill that stays lofty. Box-stitched so the fill never bunches." },
  { slug: "organic-cotton-pillow-pair", name: "Organic Cotton Pillow, Set of 2", category: "bedding", rooms: ["bedroom"], material: "Cotton", color: "White", price: 999, mrp: 1799, rating: 4.5, reviews: 902, images: [P.pillow, P.bedWhite], fastDelivery: true, blurb: "Medium-firm pillows with a GOTS-certified organic cotton shell and hollow-fibre fill." },
  { slug: "rust-sage-dohar", name: "Rust & Sage Mulmul Dohar", category: "bedding", rooms: ["bedroom", "living-room"], material: "Cotton", color: "Orange", price: 1499, mrp: 2599, rating: 4.8, reviews: 674, images: [P.bedroomRust, P.knitThrow], badge: "Handmade", festive: true, blurb: "Three layers of airy mulmul cotton, block-printed by hand in Jaipur. The AC-room essential." },

  // Cushions & throws
  { slug: "woven-stripe-cushion-cover", name: "Woven Stripe Cushion Cover", category: "cushions-throws", rooms: ["living-room", "bedroom"], material: "Cotton", color: "Brown", price: 449, mrp: 899, rating: 4.6, reviews: 1532, images: [P.stripeCushion, P.livingGold], badge: "Bestseller", fastDelivery: true, variantLabel: "Pack", variants: [{ name: "Single", priceDelta: 0 }, { name: "Set of 2", priceDelta: 399 }, { name: "Set of 5", priceDelta: 1399 }], blurb: "Yarn-dyed stripes in caramel and cream, with a concealed zip.", dimensions: "40 × 40 cm" },
  { slug: "boho-tufted-cushion-set", name: "Boho Tufted Cushion Set of 3", category: "cushions-throws", rooms: ["living-room", "bedroom"], material: "Cotton", color: "White", price: 1299, mrp: 2499, rating: 4.7, reviews: 488, images: [P.tuftedCushions, P.livingBright], badge: "Handmade", festive: true, blurb: "Hand-tufted fringes and indigo accents. Fillers included." },
  { slug: "chunky-knit-throw", name: "Chunky Knit Throw", category: "cushions-throws", rooms: ["living-room", "bedroom"], material: "Acrylic", color: "Grey", price: 1599, mrp: 2999, rating: 4.5, reviews: 321, images: [P.knitThrow, P.livingGrey], fastDelivery: true, blurb: "An oversized cable-knit throw for sofa naps and winter evenings.", dimensions: "127 × 152 cm" },
  { slug: "ocean-blue-cushion-set", name: "Ocean Blue Cushion Cover Set", category: "cushions-throws", rooms: ["living-room"], material: "Linen", color: "Blue", price: 999, mrp: 1899, rating: 4.4, reviews: 207, images: [P.blueCushions, P.livingGrey], blurb: "Four covers in tonal blues: linen, slub and a geometric weave." },

  // Décor
  { slug: "ivory-urn-vase", name: "Hand-thrown Ivory Urn Vase", category: "decor", rooms: ["living-room", "bedroom"], material: "Ceramic", color: "White", price: 1499, mrp: 2299, rating: 4.8, reviews: 377, images: [P.urnVase, P.livingBright], badge: "Handmade", blurb: "Thrown on the wheel in Khurja with a soft matte glaze. Every piece varies slightly.", dimensions: "H 28 cm × W 20 cm" },
  { slug: "slate-stoneware-vase-trio", name: "Slate Stoneware Vase Trio", category: "decor", rooms: ["living-room"], material: "Stoneware", color: "Grey", price: 1799, mrp: 2999, rating: 4.6, reviews: 264, images: [P.slateVases, P.livingGrey], badge: "New", blurb: "Three graduated bottle vases in a stone-grey reactive glaze." },
  { slug: "twin-bud-vases", name: "Twin Ceramic Bud Vases", category: "decor", rooms: ["dining", "living-room"], material: "Ceramic", color: "White", price: 899, mrp: 1599, rating: 4.5, reviews: 198, images: [P.budVase, P.diningEmerald], fastDelivery: true, festive: true, blurb: "A pair of slim bud vases on a wavy wooden tray. Perfect for a single stem." },
  { slug: "terracotta-belly-vases", name: "Terracotta Belly Vases, Set of 2", category: "decor", rooms: ["living-room", "study"], material: "Terracotta", color: "Brown", price: 1199, mrp: 1999, rating: 4.7, reviews: 302, images: [P.bellyVases, P.studio], badge: "Handmade", blurb: "Rounded terracotta forms, fired and hand-polished by artisans in Kutch." },
  { slug: "silent-sweep-wall-clock", name: "Silent Sweep Wall Clock", category: "decor", rooms: ["living-room", "kitchen", "study"], material: "Metal", color: "White", price: 1099, mrp: 1899, rating: 4.4, reviews: 640, images: [P.clock, P.kitchen], fastDelivery: true, blurb: "A clean dial with a silent sweep movement, so no ticking at night.", dimensions: "Ø 30 cm" },
  { slug: "gallery-wall-frame-set", name: "Gallery Wall Frame Set of 9", category: "decor", rooms: ["living-room", "study"], material: "MDF", color: "Black", price: 2199, mrp: 3999, rating: 4.3, reviews: 151, images: [P.frames, P.livingGold], blurb: "Nine matte-black frames in mixed sizes with a paper hanging template." },

  // Lighting
  { slug: "teal-dome-pendant", name: "Dome Pendant Light", category: "lighting", rooms: ["dining", "kitchen"], material: "Metal", color: "White", price: 2499, mrp: 3999, rating: 4.6, reviews: 220, images: [P.pendant, P.diningGreen], badge: "Bestseller", blurb: "A powder-coated dome with a 1.5 m adjustable cord. Takes an E27 bulb." },
  { slug: "arc-reading-floor-lamp", name: "Arc Reading Floor Lamp", category: "lighting", rooms: ["living-room", "study"], material: "Metal", color: "Black", price: 4999, mrp: 7999, rating: 4.5, reviews: 133, images: [P.floorLamp, P.studio], blurb: "An adjustable arm puts light right where you read." },
  { slug: "brass-bedside-lamp", name: "Brass Bedside Table Lamp", category: "lighting", rooms: ["bedroom"], material: "Brass", color: "Gold", price: 1899, mrp: 2999, rating: 4.7, reviews: 285, images: [P.bedsideLamp, P.bedLinen], festive: true, fastDelivery: true, blurb: "An antique-brass base with a linen drum shade and an inline dimmer." },

  // Candles
  { slug: "sandalwood-soy-candle", name: "Mysore Sandalwood Soy Candle", category: "candles", rooms: ["living-room", "bedroom", "bath"], material: "Soy wax", color: "Brown", price: 599, mrp: 999, rating: 4.8, reviews: 2104, images: [P.soyCandle, P.candleDuo], badge: "Bestseller", fastDelivery: true, festive: true, variantLabel: "Size", variants: [{ name: "180 g", priceDelta: 0 }, { name: "350 g", priceDelta: 400 }], blurb: "Creamy sandalwood with a hint of vetiver. Hand-poured, with a 40-hour burn." },
  { slug: "amber-oud-candle", name: "Amber Glass Oud Candle", category: "candles", rooms: ["living-room", "bedroom"], material: "Soy wax", color: "Brown", price: 799, mrp: 1299, rating: 4.6, reviews: 744, images: [P.amberCandle, P.candleDuo], festive: true, blurb: "Smoky oud and rose in a reusable amber jar." },
  { slug: "vanilla-hearth-candle-duo", name: "Vanilla Hearth Candle Duo", category: "candles", rooms: ["living-room"], material: "Soy wax", color: "White", price: 999, mrp: 1599, rating: 4.7, reviews: 391, images: [P.candleDuo, P.amberCandle], badge: "Limited", festive: true, blurb: "Two glass votives of warm vanilla and toasted cardamom." },

  // Kitchen & dining
  { slug: "stoneware-dinner-set", name: "Stoneware Dinner Set, 12 pcs", category: "kitchen-dining", rooms: ["dining", "kitchen"], material: "Stoneware", color: "Beige", price: 3499, mrp: 5999, rating: 4.7, reviews: 566, images: [P.dinnerSet, P.diningEmerald], badge: "Bestseller", festive: true, blurb: "Four dinner plates, four quarter plates and four bowls in a speckled oat glaze. Microwave and dishwasher safe." },
  { slug: "ocean-glaze-plates", name: "Ocean Glaze Plates, Set of 4", category: "kitchen-dining", rooms: ["dining"], material: "Ceramic", color: "Blue", price: 1599, mrp: 2599, rating: 4.5, reviews: 287, images: [P.bluePlates, P.dining], badge: "Handmade", blurb: "Reactive blue glaze with a dark rim. Each plate is one of a kind.", dimensions: "Ø 27 cm" },
  { slug: "dune-cork-bowls", name: "Dune & Cork Snack Bowls", category: "kitchen-dining", rooms: ["dining", "kitchen"], material: "Stoneware", color: "Beige", price: 799, mrp: 1299, rating: 4.4, reviews: 140, images: [P.corkBowls, P.kitchen], badge: "New", blurb: "Stoneware bowls with cork bases that protect your table." },
  { slug: "cream-nesting-bowls", name: "Cream Nesting Bowls, Set of 4", category: "kitchen-dining", rooms: ["kitchen"], material: "Ceramic", color: "Beige", price: 1299, mrp: 2199, rating: 4.6, reviews: 233, images: [P.nestingBowls, P.kitchen], fastDelivery: true, blurb: "Graduated bowls for prep and serving that stack neatly." },
  { slug: "everyday-ceramic-mug", name: "Everyday Ceramic Mug", category: "kitchen-dining", rooms: ["kitchen", "study"], material: "Ceramic", color: "White", price: 349, mrp: 599, rating: 4.6, reviews: 1890, images: [P.mug, P.kitchen], fastDelivery: true, variantLabel: "Pack", variants: [{ name: "Single", priceDelta: 0 }, { name: "Set of 4", priceDelta: 900 }], blurb: "A rounded 350 ml mug that's right for chai, coffee or haldi doodh." },
  { slug: "cork-coffee-tumbler", name: "Reusable Cork Coffee Tumbler", category: "kitchen-dining", rooms: ["kitchen", "study"], material: "Glass", color: "Brown", price: 499, mrp: 899, rating: 4.3, reviews: 418, images: [P.tumbler, P.studio], blurb: "Borosilicate glass with a cork sleeve and a splash-proof lid." },

  // Furniture
  { slug: "emerald-velvet-sofa", name: "Emerald Velvet 3-Seater Sofa", category: "furniture", rooms: ["living-room"], material: "Velvet", color: "Green", price: 34999, mrp: 54999, rating: 4.7, reviews: 96, images: [P.velvetSofa, P.livingGold], badge: "Bestseller", blurb: "Deep seats, a solid sheesham frame and a jewel-tone velvet that wears beautifully.", dimensions: "W 210 × D 88 × H 78 cm" },
  { slug: "tan-leather-sofa", name: "Mid-century Tan Leather Sofa", category: "furniture", rooms: ["living-room"], material: "Leather", color: "Brown", price: 49999, mrp: 79999, rating: 4.6, reviews: 54, images: [P.tanSofa, P.livingGold], blurb: "Top-grain leather on tapered legs. It looks better as it ages.", dimensions: "W 220 × D 90 × H 80 cm" },
  { slug: "nordic-black-accent-chair", name: "Nordic Black Accent Chair", category: "furniture", rooms: ["dining", "study"], material: "Polypropylene", color: "Black", price: 4499, mrp: 7999, rating: 4.4, reviews: 177, images: [P.blackChair, P.studio], fastDelivery: true, blurb: "A moulded shell with a cushioned seat on beech-wood legs." },
  { slug: "ivory-tufted-vanity-chair", name: "Ivory Tufted Vanity Chair", category: "furniture", rooms: ["bedroom"], material: "Fabric", color: "White", price: 6999, mrp: 10999, rating: 4.5, reviews: 63, images: [P.ivoryChair, P.bedWhite], badge: "New", blurb: "Button-tufted boucle on turned legs for a dressing corner." },
  { slug: "wooden-kitchen-stool", name: "Wooden Kitchen Stool", category: "furniture", rooms: ["kitchen"], material: "Wood", color: "White", price: 2799, mrp: 4499, rating: 4.3, reviews: 121, images: [P.stool, P.kitchen], blurb: "A solid rubberwood stool with a carry slot. Counter height." },
  { slug: "floating-walnut-shelves", name: "Floating Walnut Wall Shelves", category: "furniture", rooms: ["living-room", "study"], material: "Engineered wood", color: "Brown", price: 2999, mrp: 4999, rating: 4.5, reviews: 208, images: [P.shelves, P.livingBright], fastDelivery: true, blurb: "Set of three shelves with concealed brackets. Holds up to 8 kg each." },
  { slug: "slate-lounge-chair", name: "Slate Lounge Chair & Ottoman", category: "furniture", rooms: ["living-room", "bedroom"], material: "Fabric", color: "Grey", price: 18999, mrp: 28999, rating: 4.8, reviews: 41, images: [P.loungeChair, P.livingGrey], badge: "Limited", blurb: "A deep-reclined reading chair with a matching ottoman." },

  // Rugs
  { slug: "heritage-woven-rug", name: "Heritage Woven Floor Rug", category: "rugs", rooms: ["living-room", "bedroom"], material: "Jute & wool", color: "Grey", price: 3999, mrp: 6999, rating: 4.6, reviews: 312, images: [P.rug, P.livingGrey], badge: "Handmade", variantLabel: "Size", variants: [{ name: "4 × 6 ft", priceDelta: 0 }, { name: "5 × 8 ft", priceDelta: 2000 }, { name: "6 × 9 ft", priceDelta: 4000 }], blurb: "Flat-woven on pit looms in Bhadohi with a muted border motif." },

  // Garden
  { slug: "desert-cactus-terracotta", name: "Desert Cactus in Terracotta Pot", category: "garden", rooms: ["study", "living-room"], material: "Terracotta", color: "Orange", price: 449, mrp: 699, rating: 4.5, reviews: 820, images: [P.cactus, P.studio], fastDelivery: true, blurb: "A hardy live cactus in a hand-finished terracotta pot. Needs very little water." },
  { slug: "echeveria-mint-planter", name: "Echeveria in Mint Planter", category: "garden", rooms: ["study", "bedroom"], material: "Ceramic", color: "Green", price: 549, mrp: 899, rating: 4.6, reviews: 455, images: [P.succulent, P.bedLinen], badge: "Bestseller", fastDelivery: true, blurb: "A rosette succulent in a glossy mint ceramic pot with a drainage hole." },
  { slug: "snake-plant-wood-stand", name: "Snake Plant with Wood Stand", category: "garden", rooms: ["living-room", "bedroom"], material: "Ceramic", color: "White", price: 1299, mrp: 1999, rating: 4.7, reviews: 367, images: [P.snakePlant, P.livingBright], blurb: "An air-purifying sansevieria in a white planter on an acacia stand." },
  { slug: "faux-ficus-tree", name: "Faux Ficus Tree, 4 ft", category: "garden", rooms: ["living-room", "study"], material: "Polyester", color: "Green", price: 2999, mrp: 4999, rating: 4.2, reviews: 98, images: [P.ficus, P.livingGold], blurb: "Realistic, maintenance-free greenery for low-light corners." },

  // Bath (uses room imagery)
  { slug: "spa-bath-accessory-set", name: "Spa Stone Bath Accessory Set", category: "decor", rooms: ["bath"], material: "Resin", color: "White", price: 1399, mrp: 2399, rating: 4.4, reviews: 176, images: [P.bath, P.bathTub], blurb: "A soap dispenser, tumbler, soap dish and toothbrush holder with a stone finish." },

  // Gifts
  { slug: "festive-gift-hamper", name: "Festive Gift Hamper", category: "gifts", rooms: [], material: "Mixed", color: "Red", price: 1999, mrp: 2999, rating: 4.8, reviews: 512, images: [P.giftRed, P.soyCandle], badge: "Limited", festive: true, blurb: "A sandalwood candle, a ceramic mug, artisanal chai and a handwritten note, all wrapped and ready." },
  { slug: "celebration-gift-box", name: "Pink Celebration Gift Box", category: "gifts", rooms: [], material: "Mixed", color: "Pink", price: 1499, mrp: 2199, rating: 4.6, reviews: 248, images: [P.giftPink, P.budVase], festive: true, blurb: "A bud vase, a mini candle and a linen napkin set in a keepsake box." },
  { slug: "canvas-market-tote", name: "Canvas Market Tote", category: "gifts", rooms: [], material: "Canvas", color: "Beige", price: 399, mrp: 699, rating: 4.3, reviews: 330, images: [P.tote, P.kitchen], fastDelivery: true, blurb: "Heavy 12 oz canvas with long handles, made for sabzi-mandi runs." },
];

export const products: Product[] = seeds.map((s) => ({
  ...s,
  highlights: s.highlights ?? [`${s.material} construction`, "Quality-checked before dispatch", careDefault],
  dimensions: s.dimensions ?? "See size guide on the product images",
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const discount = (p: { price: number; mrp: number }) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const bestsellers = () => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 10);
export const newArrivals = () => products.filter((p) => p.badge === "New" || p.badge === "Limited" || p.badge === "Handmade").slice(0, 10);
export const festive = () => products.filter((p) => p.festive);
export const dealOfTheDay = () => ["ivory-percale-bedsheet-set", "stoneware-dinner-set", "sandalwood-soy-candle", "heritage-woven-rug"].map((s) => getProduct(s)!);

/** Collections are categories, rooms, or one of the curated edits below. */
const curated: Record<string, { title: string; blurb: string; image: string; filter: (p: Product) => boolean }> = {
  all: { title: "All Products", blurb: "Everything we make and source, in one place.", image: P.livingGold, filter: () => true },
  bestsellers: { title: "Bestsellers", blurb: "The pieces our customers keep coming back for.", image: P.livingBright, filter: (p) => p.reviews >= 500 },
  "new-arrivals": { title: "New & Handmade", blurb: "Fresh drops and artisan-made one-offs.", image: P.urnVase, filter: (p) => !!p.badge && p.badge !== "Bestseller" },
  festive: { title: "The Festive Edit", blurb: "Warm light, good gifts and a table set for guests.", image: P.candleDuo, filter: (p) => !!p.festive },
  "under-499": { title: "Under ₹499", blurb: "Little upgrades that add up.", image: P.cactus, filter: (p) => p.price < 500 },
  "under-999": { title: "Under ₹999", blurb: "Small luxuries, easy prices.", image: P.mug, filter: (p) => p.price < 1000 },
  "fast-delivery": { title: "Fast Delivery", blurb: "Ships within 24 hours from our Delhi and Bengaluru warehouses.", image: P.stripeCushion, filter: (p) => !!p.fastDelivery },
};

export function getCollection(slug: string) {
  const cat = getCategory(slug);
  if (cat) return { title: cat.name, blurb: cat.blurb, image: cat.image, items: products.filter((p) => p.category === slug) };
  const room = rooms.find((r) => r.slug === slug);
  if (room) return { title: room.name, blurb: `Furnish and style your ${room.name.toLowerCase()} with pieces that work together.`, image: room.image, items: products.filter((p) => p.rooms.includes(slug)) };
  const c = curated[slug];
  if (c) return { title: c.title, blurb: c.blurb, image: c.image, items: products.filter(c.filter) };
  return null;
}

export const collectionSlugs = () => [...categories.map((c) => c.slug), ...rooms.map((r) => r.slug), ...Object.keys(curated)];

export function searchProducts(q: string) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const hay = [p.name, p.material, p.color, p.category, getCategory(p.category)?.name, ...p.rooms, p.blurb].join(" ").toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export const reviewsFor = (p: Product) => [
  { name: "Ananya R.", city: "Pune", rating: 5, title: "Better than the photos", body: `The ${p.material.toLowerCase()} quality is lovely and it arrived beautifully packed. Already planning my next order.` },
  { name: "Karthik S.", city: "Chennai", rating: 4, title: "Great value", body: "It looks premium for the price. Delivery took a day longer than shown, but support kept me posted." },
  { name: "Meher K.", city: "Delhi", rating: 5, title: "Gifted it and got asked where it's from", body: "The finish is exactly as described. It feels thoughtfully made." },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
