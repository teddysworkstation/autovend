// Maps product slugs to bundled image URLs. Used as fallback when DB image_url
// references the bundled assets (path starting with /src/assets/...).
import pokemonProductImg from "@/assets/product-pokemon-vending.jpg";

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

import aiHahaPro542 from "@/assets/products/ai/haha-pro-542.jpg";
import aiHahaMini360 from "@/assets/products/ai/haha-mini-360.jpg";
import aiHahaUltra1200 from "@/assets/products/ai/haha-ultra-1200.jpg";
import aiHahaFreezer550 from "@/assets/products/ai/haha-freezer-550.jpg";
import aiHahaPlus440 from "@/assets/products/ai/haha-plus-440.jpg";

// Path → resolved bundled URL
export const BUNDLED_IMAGES: Record<string, string> = {
  "/src/assets/product-pokemon-vending.jpg": pokemonProductImg,
  "/src/assets/products/combo-compact-23-10-combo-vending-machine.jpg": comboCompact,
  "/src/assets/products/combo-epay-combo-vending-machine.jpg": comboEpay,
  "/src/assets/products/combo-express-combo-vending-machine.jpg": comboExpress,
  "/src/assets/products/combo-marketone-3w-cold-food-and-drink-vending-machine.jpg": comboM3wFood,
  "/src/assets/products/combo-marketone-3w-snack-and-cold-drink-vending-machine.jpg": comboM3wSnack,
  "/src/assets/products/combo-marketone-5w-cold-food-elevator-vending-machine.jpg": comboM5wElev,
  "/src/assets/products/combo-marketone-5w-outdoor-combo-vending-machine.jpg": comboM5wOutdoor,
  "/src/assets/products/combo-marketone-5w-snack-and-cold-drink-vending-machine.jpg": comboM5wSnack,
  "/src/assets/products/combo-midsize-32-10-combo-energy-star-vending-machine.jpg": comboMidsize,
  "/src/assets/products/combo-vertical-cooler-vending-machine.jpg": comboVertCooler,
  "/src/assets/products/drink-10-selections-soda-soft-drink-vending-machine.jpg": drink10,
  "/src/assets/products/drink-marketone-3w-28-select-cold-drink-vending-machine.jpg": drinkM3w28,
  "/src/assets/products/drink-marketone-48-select-water-bottle-vending-machine-for-sale.jpg": drinkM48Water,
  "/src/assets/products/drink-marketone-5w-43-select-cold-drink-vending-machine.jpg": drinkM5w43,
  "/src/assets/products/drink-marketone-5w-cold-drink-vending-machine-with-elevator.jpg": drinkM5wElev,
  "/src/assets/products/drink-marketone-series-cold-drink-vending-machine-10-selections.jpg": drinkMSeries10,
  "/src/assets/products/kiosks-mm6-kiosk.jpg": kioskMm6,
  "/src/assets/products/kiosks-mm6-mini-kiosk.jpg": kioskMm6Mini,
  "/src/assets/products/kiosks-picomarket.jpg": kioskPico,
  "/src/assets/products/smartcoolers-haha-frozen-smart-cooler.webp": scFrozen,
  "/src/assets/products/smartcoolers-haha-mini-smart-cooler.webp": scMini,
  "/src/assets/products/smartcoolers-haha-pro-smart-cooler.webp": scPro,
  "/src/assets/products/smartcoolers-haha-ultra-smart-cooler.webp": scUltra,
  "/src/assets/products/smartstores-picoambient-vision.jpg": ssAmbient,
  "/src/assets/products/smartstores-picocooler-vision-ambient-cabinet.jpg": ssCoolerAmb,
  "/src/assets/products/smartstores-picocooler-vision.jpg": ssCooler,
  "/src/assets/products/smartstores-picofreezer-vision.jpg": ssFreezer,
  "/src/assets/products/smartstores-stockwell.jpg": ssStockwell,
  "/src/assets/products/snack-23-selection-snack-vending-machine.jpg": snack23,
  "/src/assets/products/snack-32-selection-snack-vending-machine.jpg": snack32,
  "/src/assets/products/snack-5w-marketone-snack-vending-machine.jpg": snack5w,
  "/src/assets/products/snack-large-capacity-snack-vending-machine-40-selection.jpg": snack40,
  "/src/assets/products/snack-marketone-snack-6w-vending-machine-with-card-reader.jpg": snack6w,
  "/src/assets/products/specialized-18-select-book-vending-machine.jpg": sp18Book,
  "/src/assets/products/specialized-20-select-laundry-vending-machine.jpg": sp20Laundry,
  "/src/assets/products/specialized-30-selection-tobacco-cigarette-vending-machine-for-sale.jpg": sp30Tobacco,
  "/src/assets/products/specialized-autovend-plus-car-wash-vending-machine.jpg": spCarWash,
  "/src/assets/products/specialized-bowling-vending-machine.jpg": spBowling,
  "/src/assets/products/specialized-express-fitness-combo.jpg": spExpressFitness,
  "/src/assets/products/specialized-marketone-35-select-vending-machine-for-laundry-supplies.jpg": spM35Laundry,
  "/src/assets/products/specialized-marketone-fitness-gym-vending-machine.jpg": spFitnessGym,
  "/src/assets/products/specialized-marketone-fitness-vending-machine-with-add-on-locker.jpg": spFitnessLocker,
  "/src/assets/products/specialized-sani-center-plus-vending-machine.jpg": spSani,
  "/src/assets/products/specialized-storage-supply-depot-vending-machine-for-selling-storage-ite.jpg": spStorage,
  "/src/assets/products/used-10-selections-soda-soft-drink-vending-machine-used.jpg": used10,
  "/src/assets/products/used-23-selection-snack-vending-machine-used.jpg": used23,
  "/src/assets/products/used-32-selection-snack-vending-machine-used.jpg": used32,
  "/src/assets/products/used-5w-marketone-snack-vending-machine-used.jpg": used5w,
  "/src/assets/products/used-express-combo-vending-machine-used.jpg": usedExpress,
  "/src/assets/products/used-large-capacity-snack-vending-machine-40-selection-used.jpg": used40,
  "/src/assets/products/used-marketone-5w-cold-drink-elevator-vending-machine-used.jpg": usedM5wDrink,
  "/src/assets/products/ai/haha-pro-542.jpg": aiHahaPro542,
  "/src/assets/products/ai/haha-mini-360.jpg": aiHahaMini360,
  "/src/assets/products/ai/haha-ultra-1200.jpg": aiHahaUltra1200,
  "/src/assets/products/ai/haha-freezer-550.jpg": aiHahaFreezer550,
  "/src/assets/products/ai/haha-plus-440.jpg": aiHahaPlus440,
};

export function resolveImage(url: string): string {
  if (!url) return "";
  return BUNDLED_IMAGES[url] || url;
}
