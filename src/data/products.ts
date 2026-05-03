import pokemonProductImg from "@/assets/product-pokemon-vending.jpg";
import pokemonLifestyleImg from "@/assets/product-pokemon-lifestyle.jpg";
import pokemonHeroImg from "@/assets/hero-pokemon-vending.jpg";

// === Auto-imported unique product images (from CSV scrape) ===
import comboCompact from "@/assets/products/combo-compact-23-10-combo-vending-machine.jpg";
import comboEpay from "@/assets/products/combo-epay-combo-vending-machine.jpg";
import comboExpress from "@/assets/products/combo-express-combo-vending-machine.jpg";
import comboM3wFood from "@/assets/products/combo-marketone-3w-cold-food-and-drink-vending-machine.jpg";
import comboM3wSnack from "@/assets/products/combo-marketone-3w-snack-and-cold-drink-vending-machine.jpg";
import comboM5wElev from "@/assets/products/combo-marketone-5w-cold-food-elevator-vending-machine.jpg";
import comboM5wOutdoor from "@/assets/products/combo-marketone-5w-outdoor-combo-vending-machine.jpg";
import comboM5wSnack from "@/assets/products/combo-marketone-5w-snack-and-cold-drink-vending-machine.jpg";
import comboMidsize from "@/assets/products/combo-midsize-32-10-combo-energy-star-vending-machine.jpg";
import comboVertCooler from "@/assets/products/combo-vertical-cooler-vending-machine.jpg";

import drink10 from "@/assets/products/drink-10-selections-soda-soft-drink-vending-machine.jpg";
import drinkM3w28 from "@/assets/products/drink-marketone-3w-28-select-cold-drink-vending-machine.jpg";
import drinkM48Water from "@/assets/products/drink-marketone-48-select-water-bottle-vending-machine-for-sale.jpg";
import drinkM5w43 from "@/assets/products/drink-marketone-5w-43-select-cold-drink-vending-machine.jpg";
import drinkM5wElev from "@/assets/products/drink-marketone-5w-cold-drink-vending-machine-with-elevator.jpg";
import drinkMSeries10 from "@/assets/products/drink-marketone-series-cold-drink-vending-machine-10-selections.jpg";

import kioskMm6 from "@/assets/products/kiosks-mm6-kiosk.jpg";
import kioskMm6Mini from "@/assets/products/kiosks-mm6-mini-kiosk.jpg";
import kioskPico from "@/assets/products/kiosks-picomarket.jpg";

import scFrozen from "@/assets/products/smartcoolers-haha-frozen-smart-cooler.webp";
import scMini from "@/assets/products/smartcoolers-haha-mini-smart-cooler.webp";
import scPro from "@/assets/products/smartcoolers-haha-pro-smart-cooler.webp";
import scUltra from "@/assets/products/smartcoolers-haha-ultra-smart-cooler.webp";

import ssAmbient from "@/assets/products/smartstores-picoambient-vision.jpg";
import ssCoolerAmb from "@/assets/products/smartstores-picocooler-vision-ambient-cabinet.jpg";
import ssCooler from "@/assets/products/smartstores-picocooler-vision.jpg";
import ssFreezer from "@/assets/products/smartstores-picofreezer-vision.jpg";
import ssStockwell from "@/assets/products/smartstores-stockwell.jpg";

import snack23 from "@/assets/products/snack-23-selection-snack-vending-machine.jpg";
import snack32 from "@/assets/products/snack-32-selection-snack-vending-machine.jpg";
import snack5w from "@/assets/products/snack-5w-marketone-snack-vending-machine.jpg";
import snack40 from "@/assets/products/snack-large-capacity-snack-vending-machine-40-selection.jpg";
import snack6w from "@/assets/products/snack-marketone-snack-6w-vending-machine-with-card-reader.jpg";

import sp18Book from "@/assets/products/specialized-18-select-book-vending-machine.jpg";
import sp20Laundry from "@/assets/products/specialized-20-select-laundry-vending-machine.jpg";
import sp30Tobacco from "@/assets/products/specialized-30-selection-tobacco-cigarette-vending-machine-for-sale.jpg";
import spCarWash from "@/assets/products/specialized-autovend-plus-car-wash-vending-machine.jpg";
import spBowling from "@/assets/products/specialized-bowling-vending-machine.jpg";
import spExpressFitness from "@/assets/products/specialized-express-fitness-combo.jpg";
import spM35Laundry from "@/assets/products/specialized-marketone-35-select-vending-machine-for-laundry-supplies.jpg";
import spFitnessGym from "@/assets/products/specialized-marketone-fitness-gym-vending-machine.jpg";
import spFitnessLocker from "@/assets/products/specialized-marketone-fitness-vending-machine-with-add-on-locker.jpg";
import spSani from "@/assets/products/specialized-sani-center-plus-vending-machine.jpg";
import spStorage from "@/assets/products/specialized-storage-supply-depot-vending-machine-for-selling-storage-ite.jpg";

import used10 from "@/assets/products/used-10-selections-soda-soft-drink-vending-machine-used.jpg";
import used23 from "@/assets/products/used-23-selection-snack-vending-machine-used.jpg";
import used32 from "@/assets/products/used-32-selection-snack-vending-machine-used.jpg";
import used5w from "@/assets/products/used-5w-marketone-snack-vending-machine-used.jpg";
import usedExpress from "@/assets/products/used-express-combo-vending-machine-used.jpg";
import used40 from "@/assets/products/used-large-capacity-snack-vending-machine-40-selection-used.jpg";
import usedM5wDrink from "@/assets/products/used-marketone-5w-cold-drink-elevator-vending-machine-used.jpg";

export interface Product {
  title: string;
  slug: string;
  price: number;
  salePrice: number | null;
  category: string;
  categorySlug: string;
  images: string[];
  description: string;
  excerpt: string;
  estimatedMonthlyIncomeMin: number;
  estimatedMonthlyIncomeMax: number;
  roiMonths: number;
  deposit: number;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
}

export const categories = [
  { slug: "combo", name: "Combo Machines", icon: "layers" },
  { slug: "drink", name: "Drink Machines", icon: "cup-soda" },
  { slug: "snack", name: "Snack Machines", icon: "cookie" },
  { slug: "specialized", name: "Specialized Machines", icon: "settings" },
  { slug: "used", name: "Used Machines", icon: "recycle" },
  { slug: "smart-store", name: "Smart Stores", icon: "store" },
  { slug: "smart-cooler", name: "Smart Coolers", icon: "snowflake" },
  { slug: "kiosk", name: "Self-Checkout Kiosks", icon: "monitor" },
];

export const categoryDescriptions: Record<string, { title: string; description: string; keywords: string }> = {
  combo: {
    title: "Combo Vending Machines for Sale",
    description: "Browse premium combo vending machines for sale at Vending Machine Hub. Our combo snack and drink vending machines offer up to 60 selections in a single footprint — ideal for offices, schools, gyms, and high-traffic locations. Backed by industry-leading research from the National Automatic Merchandising Association (NAMA), every combo machine ships with free nationwide delivery and supports cashless payments including Apple Pay and Google Pay.",
    keywords: "combo vending machine for sale, snack and drink vending machine, combo vending machine",
  },
  drink: {
    title: "Drink & Soda Vending Machines for Sale",
    description: "Explore the best drink vending machines for sale, including soda, bottled water, juice, and energy drink merchandisers. Our cold drink vending machines feature elevator delivery, ADA compliance, and cashless payment systems.",
    keywords: "drink vending machine for sale, soda vending machine, cold drink vending machine",
  },
  snack: {
    title: "Snack Vending Machines for Sale",
    description: "Shop high-capacity snack vending machines for sale at VMH. From 23-selection starter machines to MarketOne 6W large-capacity merchandisers, our snack vending machines for sale support chips, candy, pastries, and healthy snacks.",
    keywords: "snack vending machine for sale, vending machine for sale, large capacity snack machine",
  },
  specialized: {
    title: "Specialized Vending Machines for Sale",
    description: "Discover specialized vending machines for sale — including fitness, laundry, book, PPE, tobacco, car wash, and bowling vending machines. Per NAMA industry reports, specialty vending is the fastest-growing segment of the unattended retail market.",
    keywords: "specialized vending machine for sale, fitness vending machine, niche vending machine",
  },
  used: {
    title: "Used Vending Machines for Sale",
    description: "Save thousands on certified-refurbished used vending machines for sale. Every used vending machine at VMH is fully tested, repainted, and warrantied — perfect for new operators looking to start a vending business with minimal capital.",
    keywords: "used vending machine for sale, refurbished vending machine, cheap vending machine",
  },
  "smart-store": {
    title: "Smart Stores & AI-Powered Vending Machines for Sale",
    description: "Step into the future of unattended retail with AI-powered smart stores for sale. Featuring computer-vision product recognition, frictionless tap-grab-go checkout, and remote inventory management.",
    keywords: "smart vending machine for sale, AI vending machine, smart store cooler",
  },
  "smart-cooler": {
    title: "Smart Coolers for Sale",
    description: "Browse compact AI smart coolers for sale — perfect for hotels, condos, gyms, and small offices. The HAHA series of smart coolers for sale uses computer-vision to track every item.",
    keywords: "smart cooler for sale, AI cooler vending machine, frictionless cooler",
  },
  kiosk: {
    title: "Self-Checkout Kiosks for Sale",
    description: "Add a self-checkout kiosk for sale to your micro market or break room. Our 365 Retail Markets MM6 and PicoMarket kiosks integrate secure payments, inventory, and loyalty programs.",
    keywords: "self-checkout kiosk for sale, micro market kiosk, vending kiosk",
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const SEO_LINKS = `
## About This Vending Machine for Sale

Vending Machine Hub (VMH) is one of the leading suppliers of commercial-grade vending machines for sale in the United States. According to the [National Automatic Merchandising Association (NAMA)](https://www.namanow.org/), the U.S. vending and unattended retail industry generates over $25 billion in annual revenue.

## Why Buy This Vending Machine

When evaluating any vending machine for sale, consider build quality, payment flexibility, and warranty. Our machines support modern cashless systems like Apple Pay and Google Pay, which the [U.S. Small Business Administration](https://www.sba.gov/business-guide) cites as essential for modern unattended retail. Industry publications including [Forbes Small Business](https://www.forbes.com/small-business/) and [Entrepreneur Magazine](https://www.entrepreneur.com/starting-a-business) consistently rank vending as a top low-overhead business model.

## Financing & Payment Options

Every vending machine for sale at VMH can be paid in full upfront or financed through our flexible **$150/month payment plan**. Compare with industry pricing at [Vending.com](https://www.vending.com/) and [VendingWorld](https://vendingworld.com/) and you'll see VMH delivers the best total cost of ownership.

## Delivery, Warranty & Support

Free nationwide delivery is included on every vending machine for sale. All machines come with a 1-year limited parts warranty, lifetime toll-free technical support, and access to our [training videos](/training-videos), [technical support](/technical-support), [parts & service](/parts-service), and [warranty registration](/warranty-registration) resources. New operators should also consult the [Better Business Bureau](https://www.bbb.org/) for supplier verification best practices.
`;

interface CSVProduct {
  title: string;
  price: number;
  monthly: number;
  excerpt: string;
  category: string;
  features?: string[];
  image: string;
  isFeatured?: boolean;
  estMin?: number;
  estMax?: number;
  inStock?: boolean;
  stockCount?: number;
}

const csvProducts: CSVProduct[] = [
  // ==================== COMBO ====================
  { title: "Express Combo Vending Machine", price: 5350, monthly: 141, excerpt: "With nine drink selections and 20 snack selections, the Express Combo snack and drink vending machine for sale will easily satisfy your customers. Eco-friendly compact design with bright LED lighting.", category: "combo", image: comboExpress, isFeatured: true, estMin: 400, estMax: 900, stockCount: 7 },
  { title: "MarketOne 3W Snack and Cold Drink Vending Machine", price: 6450, monthly: 169, excerpt: "The MarketOne 3W combo vending machine for sale gives customers easy access to refrigerated food, snacks and cold beverages with enhanced LED lighting.", category: "combo", image: comboM3wSnack, isFeatured: true, estMin: 500, estMax: 1100, stockCount: 5 },
  { title: "MarketOne 5W Snack and Cold Drink Vending Machine", price: 7300, monthly: 191, excerpt: "The MarketOne 5W combo vending machine for sale offers up to 60 selections through a large merchandising window with enhanced LED lighting.", category: "combo", image: comboM5wSnack, isFeatured: true, estMin: 600, estMax: 1300, stockCount: 4 },
  { title: "ePay Combo Vending Machine", price: 5350, monthly: 141, excerpt: "Cashless ePay combo vending machine for sale — accepts ALL major credit cards, debit cards, Apple Pay and Google Pay through the Greenlite system.", category: "combo", image: comboEpay, estMin: 400, estMax: 900, stockCount: 6 },
  { title: "Vertical Cooler Vending Machine", price: 2999, monthly: 82, excerpt: "Eco-friendly vertical cooler vending machine for sale using hydrocarbon refrigerant — lowest utility costs in its category and fully California-compliant.", category: "combo", image: comboVertCooler, estMin: 300, estMax: 700, stockCount: 8 },
  { title: "MarketOne 5W Outdoor Combo Vending Machine", price: 8550, monthly: 223, excerpt: "Weather-rated outdoor combo vending machine for sale with rain guards, anti-pry covers, and impact-resistant polycarbonate window.", category: "combo", image: comboM5wOutdoor, isFeatured: true, estMin: 700, estMax: 1500, stockCount: 3 },
  { title: "MarketOne 3W Cold Food and Drink Vending Machine", price: 6100, monthly: 161, excerpt: "Cold food and drink combo vending machine for sale with up to 36 selections — perfect for high-traffic offices and break rooms.", category: "combo", image: comboM3wFood, estMin: 500, estMax: 1100, stockCount: 5 },
  { title: "MarketOne 5W Cold Food Elevator Vending Machine", price: 8250, monthly: 215, excerpt: "Elevator-delivery cold food vending machine for sale — gently vends fragile items like yogurt and salads with maximum capacity.", category: "combo", image: comboM5wElev, estMin: 700, estMax: 1500, stockCount: 4 },
  { title: "Compact 23/10 Combo Vending Machine", price: 9500, monthly: 247, excerpt: "Two-machine combo vending machine for sale offering 23 snack and 10 drink selections in a compact dual footprint.", category: "combo", image: comboCompact, estMin: 600, estMax: 1300, stockCount: 3 },
  { title: "Midsize 32/10 Combo Energy Star Vending Machine", price: 9900, monthly: 257, excerpt: "Energy Star midsize 32/10 combo vending machine for sale — 32 snacks plus 10 drinks with low energy consumption.", category: "combo", image: comboMidsize, estMin: 700, estMax: 1500, stockCount: 3 },

  // ==================== DRINK ====================
  { title: "10 Selections Soda & Soft Drink Vending Machine", price: 5690, monthly: 150, excerpt: "Drink vending machine for sale with 10 selections — fits 12oz cans, 20/24oz bottles, and 16oz bottled water.", category: "drink", image: drink10, isFeatured: true, estMin: 400, estMax: 900, stockCount: 6 },
  { title: "MarketOne 3W 28 Select Cold Drink Vending Machine", price: 6590, monthly: 173, excerpt: "Cold drink vending machine for sale with 28 selections and 168-bottle capacity — sodas, juices, teas, energy drinks.", category: "drink", image: drinkM3w28, estMin: 500, estMax: 1100, stockCount: 5 },
  { title: "MarketOne 5W 43 Select Cold Drink Vending Machine", price: 7300, monthly: 191, excerpt: "MarketOne 5W cold drink vending machine for sale — 43 selections, the highest-margin profile in our drink lineup.", category: "drink", image: drinkM5w43, isFeatured: true, estMin: 600, estMax: 1300, stockCount: 4 },
  { title: "MarketOne 5W Cold Drink Vending Machine With Elevator", price: 8200, monthly: 215, excerpt: "Cold drink elevator vending machine for sale — soft delivery for fragile bottles and large delivery bin.", category: "drink", image: drinkM5wElev, estMin: 700, estMax: 1500, stockCount: 3 },
  { title: "MarketOne Series Cold Drink Vending Machine 10 Selections", price: 5700, monthly: 150, excerpt: "MarketOne 10-selection drink vending machine for sale — vends bottled and canned beverages including water and energy drinks.", category: "drink", image: drinkMSeries10, estMin: 400, estMax: 900, stockCount: 5 },
  { title: "MarketOne 48 Select Water Bottle Vending Machine", price: 7300, monthly: 191, excerpt: "Stylish 48-select water bottle vending machine for sale — the most-vended beverage delivered through MarketOne styling.", category: "drink", image: drinkM48Water, estMin: 400, estMax: 900, stockCount: 5 },

  // ==================== SNACK ====================
  { title: "23 Selection Snack Vending Machine", price: 3850, monthly: 104, excerpt: "Entry-level 23-selection snack vending machine for sale — perfect for first-time vending entrepreneurs.", category: "snack", image: snack23, isFeatured: true, estMin: 300, estMax: 700, stockCount: 8 },
  { title: "32 Selection Snack Vending Machine", price: 4200, monthly: 113, excerpt: "32-selection snack vending machine for sale — 12 chip slots, 16 candy/cracker, gum & mint, plus 4 pastry selections.", category: "snack", image: snack32, isFeatured: true, estMin: 350, estMax: 800, stockCount: 6 },
  { title: "Large Capacity Snack Vending Machine 40 Selection", price: 4750, monthly: 126, excerpt: "40-selection large capacity snack vending machine for sale — built for high-volume locations with 630+ item capacity.", category: "snack", image: snack40, isFeatured: true, estMin: 500, estMax: 1100, stockCount: 5 },
  { title: "5W MarketOne Snack Vending Machine", price: 7800, monthly: 202, excerpt: "MarketOne 5W snack vending machine for sale — best-in-class lighting and visual merchandising for premium locations.", category: "snack", image: snack5w, estMin: 600, estMax: 1300, stockCount: 4 },
  { title: "MarketOne Snack 6W Vending Machine with Card Reader", price: 9700, monthly: 251, excerpt: "MarketOne Snack 6W vending machine for sale — largest merchandising window, up to 738 items, and integrated card reader.", category: "snack", image: snack6w, estMin: 800, estMax: 1700, stockCount: 3 },

  // ==================== SPECIALIZED ====================
  { title: "Express Fitness Combo", price: 5300, monthly: 141, excerpt: "Fitness combo vending machine for sale — pre/post-workout snacks and refreshments for gyms and studios.", category: "specialized", image: spExpressFitness, isFeatured: true, estMin: 500, estMax: 1100, stockCount: 4 },
  { title: "AutoVend Plus Car Wash Vending Machine", price: 8800, monthly: 230, excerpt: "Outdoor car wash vending machine for sale — 24/7 dispenser for car wash supplies and drinks at any car wash facility.", category: "specialized", image: spCarWash, estMin: 600, estMax: 1400, stockCount: 3 },
  { title: "20 Select Laundry Vending Machine", price: 4400, monthly: 117, excerpt: "Laundry vending machine for sale with 20 selections of detergents, fabric softeners, and laundry goods.", category: "specialized", image: sp20Laundry, estMin: 300, estMax: 700, stockCount: 5 },
  { title: "18 Select Book Vending Machine", price: 7800, monthly: 202, excerpt: "Book vending machine for sale — reward positive student behavior and increase reading excitement with an 18-select literary vendor.", category: "specialized", image: sp18Book, estMin: 200, estMax: 500, stockCount: 4 },
  { title: "MarketOne Fitness Gym Vending Machine", price: 5300, monthly: 141, excerpt: "Fitness gym vending machine for sale — supplements, beverages, towels, gloves, earbuds, and wearable accessories.", category: "specialized", image: spFitnessGym, estMin: 500, estMax: 1100, stockCount: 4 },
  { title: "MarketOne Fitness Vending Machine with Add-On Locker", price: 9100, monthly: 237, excerpt: "Dual-zone fitness vending machine for sale with add-on locker — merchandise large bulky products and exercise equipment.", category: "specialized", image: spFitnessLocker, estMin: 600, estMax: 1300, stockCount: 3 },
  { title: "Storage Supply Depot Vending Machine", price: 8550, monthly: 223, excerpt: "Storage supply depot vending machine for sale — best-selling supplies for self-storage facility customers.", category: "specialized", image: spStorage, estMin: 400, estMax: 900, stockCount: 3 },
  { title: "MarketOne 35 Select Vending Machine for Laundry Supplies", price: 4200, monthly: 113, excerpt: "MarketOne 35-select laundry vending machine for sale — detergents, softeners, and laundry cleaning products.", category: "specialized", image: spM35Laundry, estMin: 300, estMax: 700, stockCount: 5 },
  { title: "Sani-Center Plus Vending Machine", price: 7100, monthly: 186, excerpt: "PPE vending machine for sale — Sani-Center Plus dispenses safety equipment, masks, gloves, and disinfecting supplies.", category: "specialized", image: spSani, estMin: 400, estMax: 900, stockCount: 4 },
  { title: "30 Selection Tobacco & Cigarette Vending Machine", price: 3900, monthly: 105, excerpt: "Tobacco and cigarette vending machine for sale — 30 selections including cigarettes, cigars, chewing tobacco, and lighters.", category: "specialized", image: sp30Tobacco, estMin: 500, estMax: 1100, stockCount: 4 },
  { title: "Bowling Vending Machine", price: 4800, monthly: 123, excerpt: "Bowling vending machine for sale — provide accessories and supplies to bowling customers 24/7.", category: "specialized", image: spBowling, estMin: 200, estMax: 500, stockCount: 3 },

  // ==================== USED ====================
  { title: "Express Combo Vending Machine - Used", price: 3800, monthly: 96, excerpt: "Refurbished Express Combo used vending machine for sale — wide selection of snacks, candy, pastries, and beverages.", category: "used", image: usedExpress, isFeatured: true, estMin: 400, estMax: 900, stockCount: 4 },
  { title: "10 Selections Soda & Soft Drink Vending Machine - Used", price: 3999, monthly: 107, excerpt: "Used 10-selection soda vending machine for sale — fully refurbished, fits 12oz cans through 24oz bottles.", category: "used", image: used10, estMin: 400, estMax: 900, stockCount: 3 },
  { title: "23 Selection Snack Vending Machine - Used", price: 2999, monthly: 82, excerpt: "Affordable used snack vending machine for sale — 23 selections of chips, candy, and crackers, fully refurbished.", category: "used", image: used23, isFeatured: true, estMin: 300, estMax: 700, stockCount: 5 },
  { title: "32 Selection Snack Vending Machine - Used", price: 3300, monthly: 90, excerpt: "Used 32-selection snack vending machine for sale — 474 item capacity with iVend Guaranteed delivery.", category: "used", image: used32, estMin: 350, estMax: 800, stockCount: 4 },
  { title: "Large Capacity Snack Vending Machine 40 Selection - Used", price: 3500, monthly: 95, excerpt: "Used large capacity 40-selection snack vending machine for sale — 630-item capacity for busy locations.", category: "used", image: used40, estMin: 500, estMax: 1100, stockCount: 3 },
  { title: "5W MarketOne Snack Vending Machine - Used", price: 3900, monthly: 105, excerpt: "Used MarketOne Snack 5W vending machine for sale — 40 selections with iVend Guaranteed delivery.", category: "used", image: used5w, estMin: 500, estMax: 1100, stockCount: 3 },
  { title: "MarketOne 5W Cold Drink Elevator Vending Machine - Used", price: 4950, monthly: 131, excerpt: "Used MarketOne 5W cold drink elevator vending machine for sale — soft elevator delivery for fragile and carbonated beverages.", category: "used", image: usedM5wDrink, estMin: 600, estMax: 1300, stockCount: 3 },

  // ==================== SMART STORES ====================
  { title: "Stockwell Smart Store", price: 7950, monthly: 207, excerpt: "Stockwell smart store vending machine for sale — secure self-checkout with verify, take, and go shopping experience.", category: "smart-store", image: ssStockwell, isFeatured: true, estMin: 800, estMax: 1800, stockCount: 4 },
  { title: "PicoCooler Vision + Ambient Cabinet", price: 13150, monthly: 339, excerpt: "AI-powered PicoCooler Vision smart store for sale — refrigerated and ambient products in a single tap-grab-go transaction.", category: "smart-store", image: ssCoolerAmb, estMin: 1000, estMax: 2500, stockCount: 2 },
  { title: "PicoFreezer Vision", price: 9600, monthly: 249, excerpt: "PicoFreezer Vision AI smart freezer for sale — frozen meals and treats through a fully unattended setup.", category: "smart-store", image: ssFreezer, estMin: 800, estMax: 2000, stockCount: 3 },
  { title: "PicoAmbient Vision", price: 8000, monthly: 209, excerpt: "PicoAmbient Vision AI ambient cabinet for sale — no scanning required, fast self-serve shopping.", category: "smart-store", image: ssAmbient, estMin: 700, estMax: 1600, stockCount: 3 },
  { title: "PicoCooler Vision", price: 8000, monthly: 209, excerpt: "Large-capacity AI PicoCooler Vision smart cooler for sale — automatic product recognition and strong security.", category: "smart-store", image: ssCooler, isFeatured: true, estMin: 700, estMax: 1700, stockCount: 3 },

  // ==================== SELF-CHECKOUT KIOSKS ====================
  { title: "MM6 Self-Checkout Kiosk", price: 5450, monthly: 144, excerpt: "Premium MM6 self-checkout kiosk for sale — high-traffic micro market self-checkout with secure integrated payments.", category: "kiosk", image: kioskMm6, isFeatured: true, estMin: 0, estMax: 0, stockCount: 5 },
  { title: "MM6 Mini Self-Checkout Kiosk", price: 4850, monthly: 129, excerpt: "Compact MM6 Mini self-checkout kiosk for sale — fast, intuitive checkout for breakrooms and micro markets.", category: "kiosk", image: kioskMm6Mini, estMin: 0, estMax: 0, stockCount: 5 },
  { title: "PicoMarket Countertop Kiosk", price: 1565, monthly: 46, excerpt: "PicoMarket countertop self-checkout kiosk for sale — modern self-service in a compact, limited-space format.", category: "kiosk", image: kioskPico, estMin: 0, estMax: 0, stockCount: 8 },

  // ==================== SMART COOLERS ====================
  { title: "HAHA Mini Smart Cooler", price: 3095, monthly: 82, excerpt: "HAHA Mini smart cooler for sale — compact AI-powered grab-and-go cooler ideal for small offices and condos.", category: "smart-cooler", image: scMini, isFeatured: true, estMin: 400, estMax: 900, stockCount: 6 },
  { title: "HAHA Pro Smart Cooler", price: 4395, monthly: 117, excerpt: "HAHA Pro smart cooler for sale — mid-size AI cooler with frictionless tap-grab-go retail experience.", category: "smart-cooler", image: scPro, estMin: 500, estMax: 1200, stockCount: 5 },
  { title: "HAHA Ultra Smart Cooler", price: 6895, monthly: 184, excerpt: "HAHA Ultra smart cooler for sale — large-capacity AI cooler with broadest product selection in its class.", category: "smart-cooler", image: scUltra, estMin: 700, estMax: 1600, stockCount: 4 },
  { title: "HAHA Frozen Smart Cooler", price: 5895, monthly: 157, excerpt: "HAHA Frozen smart cooler for sale — AI-powered frozen retail cooler for ice cream, frozen meals, and treats.", category: "smart-cooler", image: scFrozen, estMin: 600, estMax: 1500, stockCount: 4 },
];

const categoryDisplayNames: Record<string, string> = {
  combo: "Combo and Dual Vending Machines",
  drink: "Drink and Soda Vending Machines",
  snack: "Snack Vending Machines",
  specialized: "Specialized Vending Machines",
  used: "Used Vending Machines",
  "smart-store": "Smart Stores",
  "smart-cooler": "Smart Coolers",
  kiosk: "Self-Checkout Kiosks",
};

function buildDescription(p: CSVProduct): string {
  return `## ${p.title} — Vending Machine for Sale

${p.excerpt} This ${p.title} is available for one-time purchase or through our flexible **$150/month payment plan**.

${SEO_LINKS}

### Key Specs

- **Category:** ${categoryDisplayNames[p.category]}
- **Price:** $${p.price.toLocaleString()} or $${p.monthly}/month financed
- **Estimated Monthly Income:** $${(p.estMin ?? 400).toLocaleString()} – $${(p.estMax ?? 1000).toLocaleString()}
- **Payment:** Bank Transfer, Wire Transfer, Zelle, or Bitcoin (BTC) — details sent after order confirmation
- **Warranty:** 1-Year Limited Parts + Lifetime Toll-Free Support
- **Shipping:** Free Nationwide Delivery

For broader vending machine business resources, see our [training videos](/training-videos), [parts & service](/parts-service) library, and [VendingWorld manuals](https://vendingworld.com/information/manuals/).`;
}

const pokemonProduct: Product = {
  title: "Pokemon Trading Card Vending Machine",
  slug: "pokemon-trading-card-vending-machine",
  price: 3499,
  salePrice: 2999,
  category: "Specialized Vending Machines",
  categorySlug: "specialized",
  images: [pokemonProductImg, pokemonLifestyleImg, pokemonHeroImg],
  description: `## Pokemon Trading Card Vending Machine for Sale — The #1 Specialty Vending Machine

The **Pokemon Trading Card Vending Machine for sale** is the hottest specialty vending machine on the market — a turn-key passive income business built around one of the most valuable collectible categories in the world. According to [Forbes](https://www.forbes.com/) and [Entrepreneur](https://www.entrepreneur.com/), this Pokemon vending machine for sale delivers consistent demand from kids, teens, and adult collectors.

## Why This Pokemon Vending Machine Outperforms

- 7" HD touch screen with Apple Pay & Google Pay
- Bright LED product showcase
- ADA compliant
- Holds 200+ booster packs / ETBs
- Anti-theft tempered glass
- Remote inventory monitoring

Industry data from the [National Automatic Merchandising Association (NAMA)](https://www.namanow.org/) shows specialty Pokemon vending machines can generate $2,000–$6,000+ in monthly revenue. Backed by [SBA](https://www.sba.gov/business-guide) startup guidance and verified by the [Better Business Bureau](https://www.bbb.org/), VMH is the trusted source for Pokemon vending machines for sale.

${SEO_LINKS}`,
  excerpt: "The Pokemon Trading Card Vending Machine for sale is a turn-key specialty vending business — Pokemon-branded, ADA compliant, cashless-ready, and engineered for high-margin sales of Pokemon TCG booster packs, ETBs, and collectibles.",
  estimatedMonthlyIncomeMin: 2000,
  estimatedMonthlyIncomeMax: 6000,
  roiMonths: 6,
  deposit: 0,
  features: [
    "Officially-Styled Pokemon Branding",
    "7\" HD Touch Screen",
    "Cashless Payment (Apple Pay, Google Pay, Cards)",
    "Bright LED Product Showcase",
    "ADA Compliant",
    "Holds 200+ Booster Packs / ETBs",
    "Anti-Theft Tempered Glass",
    "Remote Inventory Monitoring",
  ],
  inStock: true,
  stockCount: 4,
  isFeatured: true,
};

export const products: Product[] = [
  pokemonProduct,
  ...csvProducts.map<Product>((p) => ({
    title: p.title,
    slug: slugify(p.title),
    price: p.price,
    salePrice: null,
    category: categoryDisplayNames[p.category],
    categorySlug: p.category,
    images: [p.image],
    description: buildDescription(p),
    excerpt: p.excerpt,
    estimatedMonthlyIncomeMin: p.estMin ?? 400,
    estimatedMonthlyIncomeMax: p.estMax ?? 1000,
    roiMonths: 6,
    deposit: 0,
    features: p.features ?? ["ADA Compliant", "Cashless Payment Ready", "LED Lighting", "Free Nationwide Delivery", "1-Year Parts Warranty"],
    inStock: p.inStock ?? true,
    stockCount: p.stockCount ?? 5,
    isFeatured: p.isFeatured ?? false,
  })),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);
}
