export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  machineSlug?: string;
}

const allReviews: Review[] = [
  { id: "r1", name: "Marcus T.", location: "Atlanta, GA", rating: 5, date: "2026-02-15", title: "Best investment I've ever made", comment: "Set up my Express Combo in an office building and started making money within the first week. The deposit model gave me confidence — saw the actual machine running before paying full price. Already ordering my second machine!", verified: true, helpful: 24, machineSlug: "express-combo-vending-machine" },
  { id: "r2", name: "Sarah K.", location: "Dallas, TX", rating: 5, date: "2026-01-28", title: "Video proof sealed the deal", comment: "I was worried about scams but the video proof process was legitimate. They showed me my exact machine working perfectly. Delivery was fast and the machine has been running flawlessly for 3 months now.", verified: true, helpful: 18, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r3", name: "James R.", location: "Phoenix, AZ", rating: 5, date: "2026-03-02", title: "Cashless is the way to go", comment: "The ePay Combo is amazing — no dealing with coins or bills. Just credit cards and Apple Pay. My gym location loves it. Making about $1,400/mo consistently. Best side hustle ever.", verified: true, helpful: 31, machineSlug: "epay-combo-vending-machine" },
  { id: "r4", name: "Lisa M.", location: "Chicago, IL", rating: 4, date: "2026-02-10", title: "Great machine, minor delivery delay", comment: "The MarketOne 3W is perfect for my smaller location. Only 4 stars because delivery took an extra 3 days. But the machine itself is excellent quality and the LED lighting really attracts customers.", verified: true, helpful: 12, machineSlug: "marketone-3w-snack-and-cold-drink-vending-machine" },
  { id: "r5", name: "David H.", location: "Miami, FL", rating: 5, date: "2026-03-10", title: "5 machines and counting!", comment: "Started with one machine 8 months ago. Now I have 5 across Miami. AutoVend's support team helped me choose the right machines for each location. Combined monthly income is over $5,000.", verified: true, helpful: 42, machineSlug: "large-capacity-snack-vending-machine-40-selection" },
  { id: "r6", name: "Amanda C.", location: "Seattle, WA", rating: 5, date: "2026-02-22", title: "Coffee machine is a goldmine", comment: "Placed the MarketOne Coffee machine in my coworking space. People go crazy for fresh coffee on demand. Revenue has exceeded my expectations — consistently $1,500+/mo.", verified: true, helpful: 27, machineSlug: "marketone-coffee-and-tea-vending-machine" },
  { id: "r7", name: "Robert P.", location: "Denver, CO", rating: 5, date: "2026-01-15", title: "Perfect for apartment complex", comment: "The compact combo machine fits perfectly in our apartment complex lobby. Residents love having 24/7 access to snacks and drinks. ROI in under 4 months!", verified: true, helpful: 19 },
  { id: "r8", name: "Maria G.", location: "Houston, TX", rating: 4, date: "2026-03-18", title: "Solid machine, great support", comment: "The 32 Selection Snack machine has been reliable. Support team responds quickly when I have questions. My only wish is more color options for the exterior.", verified: true, helpful: 8, machineSlug: "32-selection-snack-vending-machine" },
  { id: "r9", name: "Kevin W.", location: "Los Angeles, CA", rating: 5, date: "2026-02-05", title: "Outdoor machine is a beast", comment: "Got the MarketOne 5W Outdoor for a beach area. Rain, sun, doesn't matter — this thing is built like a tank. Sales are incredible during summer months.", verified: true, helpful: 35, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },
  { id: "r10", name: "Jennifer L.", location: "Portland, OR", rating: 5, date: "2026-03-22", title: "Fitness machine at my gym", comment: "The Express Fitness Combo is perfect for my CrossFit gym. Members buy protein bars and sports drinks all day. The machine practically runs itself. Easy $800/mo.", verified: true, helpful: 22, machineSlug: "express-fitness-combo" },
  { id: "r11", name: "Chris B.", location: "Nashville, TN", rating: 5, date: "2026-01-30", title: "From skeptic to believer", comment: "I thought this was too good to be true. But the $500 deposit + video proof model removed all risk. Now I'm earning passive income while working my day job. Life changing.", verified: true, helpful: 38 },
  { id: "r12", name: "Tanya R.", location: "San Diego, CA", rating: 4, date: "2026-03-05", title: "Great ROI on frozen food machine", comment: "The frozen food vending machine has been a hit in our office park. Employees love having hot meal options. Takes a bit more maintenance than snack machines but the margins are better.", verified: true, helpful: 15, machineSlug: "marketone-frozen-food-vending-machine" },
];

export function getReviewsForProduct(slug: string): Review[] {
  return allReviews.filter(r => r.machineSlug === slug);
}

export function getAllReviews(): Review[] {
  return allReviews;
}

export function getReviewStats() {
  const total = allReviews.length;
  const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / total;
  const distribution = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: allReviews.filter(r => r.rating === star).length,
    percentage: Math.round((allReviews.filter(r => r.rating === star).length / total) * 100),
  }));
  return { total, average: Math.round(avg * 10) / 10, distribution };
}
