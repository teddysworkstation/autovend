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
  { id: "r1", name: "Marcus T.", location: "Atlanta, GA", rating: 5, date: "2026-02-15", title: "Best investment I've ever made", comment: "Set up my Express Combo in an office building and started making money within the first week. The $150/mo plan made it easy to start without writing a giant check. Already ordering my second machine!", verified: true, helpful: 24, machineSlug: "express-combo-vending-machine" },
  { id: "r2", name: "Sarah K.", location: "Dallas, TX", rating: 5, date: "2026-01-28", title: "Quality assurance sealed the deal", comment: "I was worried about scams but the quality assurance process was thorough — they walked me through every spec before shipping. Delivery was fast and the machine has been running flawlessly for 3 months now.", verified: true, helpful: 18, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r3", name: "James R.", location: "Phoenix, AZ", rating: 5, date: "2026-03-02", title: "Cashless is the way to go", comment: "The ePay Combo is amazing — no dealing with coins or bills. Just credit cards and Apple Pay. My gym location loves it. Making about $1,400/mo consistently. Best side hustle ever.", verified: true, helpful: 31, machineSlug: "epay-combo-vending-machine" },
  { id: "r4", name: "Lisa M.", location: "Chicago, IL", rating: 4, date: "2026-02-10", title: "Great machine, minor delivery delay", comment: "The MarketOne 3W is perfect for my smaller location. Only 4 stars because delivery took an extra 3 days. But the machine itself is excellent quality and the LED lighting really attracts customers.", verified: true, helpful: 12, machineSlug: "marketone-3w-snack-and-cold-drink-vending-machine" },
  { id: "r5", name: "David H.", location: "Miami, FL", rating: 5, date: "2026-03-10", title: "5 machines and counting!", comment: "Started with one machine 8 months ago. Now I have 5 across Miami. VMH's support team helped me choose the right machines for each location. Combined monthly income is over $5,000.", verified: true, helpful: 42, machineSlug: "large-capacity-snack-vending-machine-40-selection" },
  { id: "r6", name: "Amanda C.", location: "Seattle, WA", rating: 5, date: "2026-02-22", title: "Coffee machine is a goldmine", comment: "Placed the MarketOne Coffee machine in my coworking space. People go crazy for fresh coffee on demand. Revenue has exceeded my expectations — consistently $1,500+/mo.", verified: true, helpful: 27, machineSlug: "marketone-coffee-and-tea-vending-machine" },
  { id: "r7", name: "Robert P.", location: "Denver, CO", rating: 5, date: "2026-01-15", title: "Perfect for apartment complex", comment: "The compact combo machine fits perfectly in our apartment complex lobby. Residents love having 24/7 access to snacks and drinks. ROI in under 4 months!", verified: true, helpful: 19 },
  { id: "r8", name: "Maria G.", location: "Houston, TX", rating: 4, date: "2026-03-18", title: "Solid machine, great support", comment: "The 32 Selection Snack machine has been reliable. Support team responds quickly when I have questions. My only wish is more color options for the exterior.", verified: true, helpful: 8, machineSlug: "32-selection-snack-vending-machine" },
  { id: "r9", name: "Kevin W.", location: "Los Angeles, CA", rating: 5, date: "2026-02-05", title: "Outdoor machine is a beast", comment: "Got the MarketOne 5W Outdoor for a beach area. Rain, sun, doesn't matter — this thing is built like a tank. Sales are incredible during summer months.", verified: true, helpful: 35, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },
  { id: "r10", name: "Jennifer L.", location: "Portland, OR", rating: 5, date: "2026-03-22", title: "Fitness machine at my gym", comment: "The Express Fitness Combo is perfect for my CrossFit gym. Members buy protein bars and sports drinks all day. The machine practically runs itself. Easy $800/mo.", verified: true, helpful: 22, machineSlug: "express-fitness-combo" },
  { id: "r11", name: "Chris B.", location: "Nashville, TN", rating: 5, date: "2026-01-30", title: "From skeptic to believer", comment: "I thought this was too good to be true. But the $150/mo plan removed all risk — no giant upfront cost. Now I'm earning passive income while working my day job. Life changing.", verified: true, helpful: 38 },
  { id: "r12", name: "Tanya R.", location: "San Diego, CA", rating: 4, date: "2026-03-05", title: "Great ROI on frozen food machine", comment: "The frozen food vending machine has been a hit in our office park. Employees love having hot meal options. Takes a bit more maintenance than snack machines but the margins are better.", verified: true, helpful: 15, machineSlug: "marketone-frozen-food-vending-machine" },
  { id: "r13", name: "Brandon S.", location: "Orlando, FL", rating: 5, date: "2026-03-25", title: "Pokemon machine is printing money", comment: "Placed the Pokemon vending machine inside a hobby shop near a mall. Booster packs sell out every week. Doing $4,200/mo consistently. Kids and adult collectors both love it.", verified: true, helpful: 56, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r14", name: "Nicole P.", location: "Austin, TX", rating: 5, date: "2026-03-12", title: "Charizard sells out daily", comment: "I was skeptical about a niche vending machine but Pokemon TCG demand is insane. ETBs go fast at $59 a pop. Margins are crazy. Best decision I've made.", verified: true, helpful: 41, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r15", name: "Greg M.", location: "Charlotte, NC", rating: 5, date: "2026-02-18", title: "ePay made it effortless", comment: "Cashless-only is the future. No coin jams, no theft risk. The ePay Combo paid for itself in 5 months at my office building.", verified: true, helpful: 29, machineSlug: "epay-combo-vending-machine" },
  { id: "r16", name: "Patricia L.", location: "Boston, MA", rating: 5, date: "2026-03-08", title: "Express Combo runs itself", comment: "Restocking takes me 20 minutes a week. The rest is pure profit. Customers at my apartment complex love it.", verified: true, helpful: 33, machineSlug: "express-combo-vending-machine" },
  { id: "r17", name: "Derek J.", location: "Las Vegas, NV", rating: 4, date: "2026-03-14", title: "Solid 5W combo, great visibility", comment: "The MarketOne 5W has tons of capacity and the LED lighting really pops. Sales 30% higher than my older machine.", verified: true, helpful: 17, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r18", name: "Olivia W.", location: "Minneapolis, MN", rating: 5, date: "2026-03-20", title: "40-selection snack is a beast", comment: "So many product options means I never lose a sale. Variety keeps customers coming back daily.", verified: true, helpful: 21, machineSlug: "large-capacity-snack-vending-machine-40-selection" },
  // 2025 reviews
  { id: "r19", name: "Anthony D.", location: "Pittsburgh, PA", rating: 5, date: "2025-11-22", title: "Two years in, still going strong", comment: "Bought my first VMH machine in late 2023. It has not missed a single day of operation. Just bought my fourth this fall. The build quality is the real deal.", verified: true, helpful: 47, machineSlug: "express-combo-vending-machine" },
  { id: "r20", name: "Renee K.", location: "Salt Lake City, UT", rating: 5, date: "2025-10-08", title: "Frozen food machine pays the mortgage", comment: "Placed in a 24-hour gym. Members buy protein meals at all hours. Net $1,800/mo after restocking. Thrilled.", verified: true, helpful: 35, machineSlug: "marketone-frozen-food-vending-machine" },
  { id: "r21", name: "Tyler M.", location: "Indianapolis, IN", rating: 4, date: "2025-09-14", title: "Solid, support team is great", comment: "Took a few days longer to ship than promised but the support team kept me updated and the machine itself is rock solid. 4 stars only because of the delay.", verified: true, helpful: 12, machineSlug: "epay-combo-vending-machine" },
  { id: "r22", name: "Veronica S.", location: "Sacramento, CA", rating: 5, date: "2025-08-02", title: "Coffee machine outperformed expectations", comment: "Placed in a coworking space and it pulled $1,650 in its first full month. The grind quality is genuinely good — not the burnt taste I expected from a vending coffee unit.", verified: true, helpful: 28, machineSlug: "marketone-coffee-and-tea-vending-machine" },
  { id: "r23", name: "Hank J.", location: "Tulsa, OK", rating: 5, date: "2025-06-19", title: "First machine ever — easier than I thought", comment: "I was nervous about everything from delivery to setup. VMH walked me through it all. The 5W has been making me $750-$900/mo for five months. Just put down on machine #2.", verified: true, helpful: 41, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r24", name: "Priya R.", location: "Raleigh, NC", rating: 5, date: "2025-05-11", title: "Pokemon machine — instant hit", comment: "We placed it inside a board game cafe. Customers spend $40-80 per visit. Restocked twice last week. Wild category.", verified: true, helpful: 53, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r25", name: "Marcus L.", location: "Birmingham, AL", rating: 4, date: "2025-04-03", title: "Outdoor unit handles southern heat", comment: "Was worried about the Alabama summer killing the compressor. Six months in, no issues. Sales spike when it's 95 outside and people want a cold drink.", verified: true, helpful: 19, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },
  { id: "r26", name: "Janelle B.", location: "Boise, ID", rating: 5, date: "2025-02-18", title: "Customer service is real", comment: "Had a question about restocking on a Sunday night. Got a real human on the phone in under 5 minutes. That alone is worth the price difference vs the cheaper imports.", verified: true, helpful: 22 },
  // 2024 reviews
  { id: "r27", name: "Owen T.", location: "Memphis, TN", rating: 5, date: "2024-12-12", title: "End of year update — 6 machines deep", comment: "Started with one in early 2024. By December I had six. Combined gross is around $5,400/mo. This is a real business, not a side gig.", verified: true, helpful: 64, machineSlug: "express-combo-vending-machine" },
  { id: "r28", name: "Cassidy O.", location: "Albany, NY", rating: 5, date: "2024-10-29", title: "Apartment complex placement", comment: "Property manager wanted reliable vending after their last vendor flaked. The MarketOne 3W has had zero issues for 7 months. Residents love it.", verified: true, helpful: 31, machineSlug: "marketone-3w-snack-and-cold-drink-vending-machine" },
  { id: "r29", name: "Rajiv P.", location: "San Jose, CA", rating: 5, date: "2024-08-17", title: "ePay is the right call for tech offices", comment: "Cashless-only fits the demographic perfectly. Engineers don't carry cash. Tap and go. Two months to ROI.", verified: true, helpful: 38, machineSlug: "epay-combo-vending-machine" },
  { id: "r30", name: "Beatrice H.", location: "New Orleans, LA", rating: 4, date: "2024-06-25", title: "Big machine, big revenue", comment: "The 40-selection snack unit was overkill at first but now I'm glad I bought it. Variety is what makes regulars. 4 stars because it's heavier than I expected — get the white-glove delivery.", verified: true, helpful: 17, machineSlug: "large-capacity-snack-vending-machine-40-selection" },
  { id: "r31", name: "Travis N.", location: "Omaha, NE", rating: 5, date: "2024-05-04", title: "Best decision of my year", comment: "Quit a soul-crushing W-2 in March. Started with three VMH machines. By May I was making more than my old salary. Real talk.", verified: true, helpful: 78 },
  { id: "r32", name: "Adriana V.", location: "Tucson, AZ", rating: 5, date: "2024-03-09", title: "Outdoor combo survives Arizona summer", comment: "If it works in Tucson in August, it works anywhere. R290 refrigeration is the real upgrade.", verified: true, helpful: 26, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },
  { id: "r33", name: "Mike R.", location: "Cleveland, OH", rating: 4, date: "2024-01-22", title: "First-time operator, mostly happy", comment: "Learning curve was real — restocking, accounting, sales tax registration. But the machine itself has been reliable. Wish someone had warned me about the paperwork.", verified: true, helpful: 14, machineSlug: "express-combo-vending-machine" },
  // 2023 reviews
  { id: "r34", name: "Geoffrey W.", location: "Hartford, CT", rating: 5, date: "2023-11-30", title: "One year update", comment: "Bought my first machine November 2022. Today, three machines, ~$2,100/mo net. The original combo is on its 13th month with zero service calls.", verified: true, helpful: 52, machineSlug: "express-combo-vending-machine" },
  { id: "r35", name: "Sandra C.", location: "Boise, ID", rating: 5, date: "2023-10-14", title: "Switched from a competitor", comment: "Had a cheaper import that broke down twice in 6 months. Replaced it with a VMH unit in spring 2023 — running flawlessly. Lesson learned: buy quality once.", verified: true, helpful: 33 },
  { id: "r36", name: "Hector Q.", location: "El Paso, TX", rating: 5, date: "2023-09-05", title: "Border-town gym placement is gold", comment: "Two MarketOne 5W units in two separate gyms. Combined $2,800/mo gross. Restock takes me 2 hours a week.", verified: true, helpful: 41, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r37", name: "Naomi F.", location: "Eugene, OR", rating: 4, date: "2023-07-18", title: "Solid machine, learning curve on placement", comment: "First placement was a bust — wrong demographic. Moved the machine in month 3 and it's been profitable ever since. The machine itself was never the problem.", verified: true, helpful: 18, machineSlug: "32-selection-snack-vending-machine" },
  { id: "r38", name: "Jordan A.", location: "Charleston, SC", rating: 5, date: "2023-05-26", title: "Coffee unit at a coworking space", comment: "Members tip me on Slack when the coffee runs out. That alone tells you how much they like it. $1,400/mo six months running.", verified: true, helpful: 29, machineSlug: "marketone-coffee-and-tea-vending-machine" },
  { id: "r39", name: "Lillian M.", location: "Madison, WI", rating: 5, date: "2023-04-08", title: "Great first machine for a beginner", comment: "I had zero business background. The setup guide and support calls got me operational in 10 days. Six months in, I'm consistently profitable.", verified: true, helpful: 36, machineSlug: "express-combo-vending-machine" },
  { id: "r40", name: "Damon K.", location: "Spokane, WA", rating: 5, date: "2023-02-19", title: "Reliable through a brutal winter", comment: "Indoor placement, heated lobby — but the machine still saw temperature swings. Zero issues. Bill validator never jammed once. That's the test.", verified: true, helpful: 24, machineSlug: "marketone-3w-snack-and-cold-drink-vending-machine" },
  { id: "r41", name: "Yvette R.", location: "Trenton, NJ", rating: 5, date: "2023-01-11", title: "Bought in 2022, reviewing in 2023", comment: "Late review — wanted to see how it held up. 14 months later, still my favorite purchase of last year. Pays itself + then some, every single month.", verified: true, helpful: 47 },

  // ===== Additional Pokemon machine reviews =====
  { id: "r42", name: "Trevor H.", location: "Columbus, OH", rating: 5, date: "2026-04-02", title: "Pokemon machine — sold out in 4 days", comment: "Placed it inside a comic shop on a Friday. By Tuesday I was driving back to restock. Booster boxes move fastest. Margins are absurd.", verified: true, helpful: 61, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r43", name: "Megan A.", location: "Kansas City, MO", rating: 5, date: "2026-03-28", title: "ETBs gone in a weekend", comment: "Stocked 24 ETBs on a Friday. Zero left by Sunday night. Had to set restock alerts on my phone.", verified: true, helpful: 49, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r44", name: "Diego F.", location: "El Paso, TX", rating: 5, date: "2026-03-15", title: "Best ROI of any machine I own", comment: "Have 3 snack machines and 1 Pokemon. The Pokemon out-earns all 3 snack machines combined. Different category entirely.", verified: true, helpful: 72, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r45", name: "Hannah K.", location: "Spokane, WA", rating: 5, date: "2026-02-26", title: "Mall placement = $5k/mo", comment: "Got into a regional mall on a kiosk lease. First full month: $5,200 gross. Adult collectors are the whales.", verified: true, helpful: 88, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r46", name: "Justin P.", location: "Reno, NV", rating: 4, date: "2026-02-09", title: "Great machine — be ready for restocking", comment: "The machine itself is flawless but you WILL be restocking weekly. Build that into your time. Otherwise, gold mine.", verified: true, helpful: 28, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r47", name: "Ariana T.", location: "Jacksonville, FL", rating: 5, date: "2026-01-19", title: "Hobby store owner — incremental revenue", comment: "Even with my full TCG case in the store, the Pokemon vending machine adds ~$3k/mo on top of regular sales. After-hours sales are the bonus.", verified: true, helpful: 44, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r48", name: "Connor R.", location: "Salt Lake City, UT", rating: 5, date: "2025-12-04", title: "Christmas season was insane", comment: "Black Friday weekend: $2,400 in three days from this one machine alone. Holiday demand for booster packs is no joke.", verified: true, helpful: 95, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r49", name: "Sophia M.", location: "Phoenix, AZ", rating: 5, date: "2025-09-30", title: "Replaced my cheap import — night and day", comment: "Had a no-name TCG machine that broke after 4 months. The VMH unit has been bulletproof for 7 months. Worth every dollar.", verified: true, helpful: 37, machineSlug: "pokemon-trading-card-vending-machine" },
  { id: "r50", name: "Mateo G.", location: "Denver, CO", rating: 5, date: "2025-07-12", title: "Game store bought a second one", comment: "First one paid for itself in 5 months. Just bought a second for a downtown location. Pokemon is not slowing down.", verified: true, helpful: 53, machineSlug: "pokemon-trading-card-vending-machine" },

  // ===== More Express Combo reviews =====
  { id: "r51", name: "Erin V.", location: "Madison, WI", rating: 5, date: "2026-04-08", title: "Office of 80, runs on autopilot", comment: "Restock takes 30 mins on Tuesdays. Net $950/mo. Coworkers all love it. Easiest income I've ever made.", verified: true, helpful: 31, machineSlug: "express-combo-vending-machine" },
  { id: "r52", name: "Phillip S.", location: "Richmond, VA", rating: 5, date: "2026-02-28", title: "Express Combo — entry-level winner", comment: "If you're new to vending, start with this exact machine. Compact, reliable, and the LED makes products pop.", verified: true, helpful: 26, machineSlug: "express-combo-vending-machine" },
  { id: "r53", name: "Whitney B.", location: "Tampa, FL", rating: 4, date: "2025-12-19", title: "Solid for the price", comment: "Not flashy but it works. Takes coins, bills, cards. After 4 months no jams. Would buy again.", verified: true, helpful: 14, machineSlug: "express-combo-vending-machine" },

  // ===== More MarketOne 5W Snack and Cold Drink =====
  { id: "r54", name: "Marcus W.", location: "Detroit, MI", rating: 5, date: "2026-04-15", title: "5W is the sweet spot", comment: "60 selections is plenty without overwhelming customers. LED merchandising window is a real differentiator.", verified: true, helpful: 29, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },
  { id: "r55", name: "Felicia D.", location: "Baltimore, MD", rating: 5, date: "2026-01-05", title: "Replaced an old machine, sales doubled", comment: "Same location, same products, new MarketOne 5W. Sales doubled in 60 days. Display matters more than I thought.", verified: true, helpful: 42, machineSlug: "marketone-5w-snack-and-cold-drink-vending-machine" },

  // ===== Large Capacity 40-Selection =====
  { id: "r56", name: "Brent K.", location: "Oklahoma City, OK", rating: 5, date: "2026-03-30", title: "40 selections kills it at hospitals", comment: "Placed in a hospital staff lounge. Variety is everything for shift workers. Top-grossing machine in my route.", verified: true, helpful: 48, machineSlug: "large-capacity-snack-vending-machine-40-selection" },
  { id: "r57", name: "Casey N.", location: "Buffalo, NY", rating: 4, date: "2025-11-04", title: "Big machine — needs a big spot", comment: "Make sure you measure the doorway. Once it was in, it's been a workhorse. 630-item capacity means weekly restocks instead of daily.", verified: true, helpful: 22, machineSlug: "large-capacity-snack-vending-machine-40-selection" },

  // ===== ePay Combo =====
  { id: "r58", name: "Logan M.", location: "Austin, TX", rating: 5, date: "2026-04-22", title: "Cashless saves me hours per week", comment: "No more counting bills or fixing coin jams. Apple Pay tap-to-buy. Takes literally 10 minutes a week now.", verified: true, helpful: 39, machineSlug: "epay-combo-vending-machine" },

  // ===== 23 Selection Snack =====
  { id: "r59", name: "Elise R.", location: "Lincoln, NE", rating: 5, date: "2026-03-19", title: "Perfect first machine", comment: "Affordable, reliable, easy to learn on. Made $480 in month 1, $620 in month 3. Great way to test placement strategy.", verified: true, helpful: 33, machineSlug: "23-selection-snack-vending-machine" },
  { id: "r60", name: "Devon C.", location: "Little Rock, AR", rating: 5, date: "2025-08-25", title: "Cheap to start, profitable in 90 days", comment: "$3,850 entry point, paying itself off in 7 months on a small office route. Beats stocks for me.", verified: true, helpful: 27, machineSlug: "23-selection-snack-vending-machine" },

  // ===== 32 Selection Snack =====
  { id: "r61", name: "Yara F.", location: "Wichita, KS", rating: 5, date: "2026-04-05", title: "Step up from the 23-select", comment: "Had the 23-select for a year. Upgraded to 32. Sales jumped 40% just from more variety. iVend sensor system has zero misfires.", verified: true, helpful: 25, machineSlug: "32-selection-snack-vending-machine" },

  // ===== MarketOne 5W Outdoor =====
  { id: "r62", name: "Zachary B.", location: "Galveston, TX", rating: 5, date: "2026-03-26", title: "Beachside placement, brutal conditions", comment: "Salt air, sun, humidity. The MarketOne 5W Outdoor doesn't care. Sealed perfectly. Summer revenue is unreal.", verified: true, helpful: 51, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },
  { id: "r63", name: "Wendy O.", location: "Boise, ID", rating: 4, date: "2025-10-17", title: "Survived a Boise winter", comment: "20°F mornings, no problem. Heated bill validator was the upsell I'm glad I took. Outdoor model is the real deal.", verified: true, helpful: 18, machineSlug: "marketone-5w-outdoor-combo-vending-machine" },

  // ===== Express Fitness Combo =====
  { id: "r64", name: "Kenji L.", location: "San Francisco, CA", rating: 5, date: "2026-04-11", title: "Gym owners — buy this", comment: "Members buy protein drinks, RXBARs, electrolyte packs. $1,100/mo on top of membership revenue. No-brainer.", verified: true, helpful: 36, machineSlug: "express-fitness-combo" },

  // ===== Stockwell Smart Store =====
  { id: "r65", name: "Imran D.", location: "Newark, NJ", rating: 5, date: "2026-03-04", title: "Stockwell in apartment lobby", comment: "Tap, take, go. Residents love how fast it is. Average ticket is higher than a vending machine because they grab multiple items.", verified: true, helpful: 44, machineSlug: "stockwell-smart-store" },
  { id: "r66", name: "Lana T.", location: "St. Louis, MO", rating: 5, date: "2025-12-09", title: "Theft is basically zero", comment: "AI tracks every item. People know they're being recorded. Six months in: zero shrinkage I can detect.", verified: true, helpful: 31, machineSlug: "stockwell-smart-store" },

  // ===== PicoCooler Vision =====
  { id: "r67", name: "Antoine W.", location: "Atlanta, GA", rating: 5, date: "2026-02-14", title: "PicoCooler Vision is a beast", comment: "Computer vision flags everything correctly. Ambient + cold combo means I sell sandwiches AND chips from one unit.", verified: true, helpful: 28, machineSlug: "picocooler-vision" },

  // ===== MM6 Kiosk =====
  { id: "r68", name: "Hailey J.", location: "Minneapolis, MN", rating: 5, date: "2026-03-17", title: "MM6 transformed our breakroom", comment: "Replaced an ancient vendor's machine with a micro market + MM6 kiosk. Sales tripled. Employees love the variety.", verified: true, helpful: 39, machineSlug: "mm6-self-checkout-kiosk" },

  // ===== HAHA Mini Smart Cooler =====
  { id: "r69", name: "Quinn S.", location: "Burlington, VT", rating: 5, date: "2026-04-19", title: "HAHA Mini fits anywhere", comment: "Put one in a small dental office reception. Patients buy waters and snacks. Pays for itself in coffee shop margins.", verified: true, helpful: 21, machineSlug: "haha-mini-smart-cooler" },
  { id: "r70", name: "Roland P.", location: "Anchorage, AK", rating: 4, date: "2025-09-22", title: "Compact AI cooler that just works", comment: "Setup was about an hour. Sales reporting is real-time on my phone. 4 stars only because the door hinge could be sturdier.", verified: true, helpful: 16, machineSlug: "haha-mini-smart-cooler" },

  // ===== MarketOne 5W 43 Select Cold Drink =====
  { id: "r71", name: "Bianca H.", location: "Jersey City, NJ", rating: 5, date: "2026-04-01", title: "43 selections crushes single-product machines", comment: "Sodas, juices, cold brews, energy drinks, water — all in one. Customers always find what they want.", verified: true, helpful: 32, machineSlug: "marketone-5w-43-select-cold-drink-vending-machine" },

  // ===== MarketOne 3W Snack and Cold Drink =====
  { id: "r72", name: "Trent E.", location: "Greensboro, NC", rating: 5, date: "2026-03-11", title: "3W is perfect for medium offices", comment: "75-person office. The 3W has the right capacity — not too big, not too small. Restock weekly, profit weekly.", verified: true, helpful: 24, machineSlug: "marketone-3w-snack-and-cold-drink-vending-machine" },

  // ===== Generic / multi-machine =====
  { id: "r73", name: "Camille R.", location: "Mobile, AL", rating: 5, date: "2026-02-20", title: "Quit my W-2 in March 2025", comment: "8 machines later I've replaced my full salary. VMH was the supplier through every order. Communication is the differentiator.", verified: true, helpful: 67 },
  { id: "r74", name: "Vince T.", location: "Bridgeport, CT", rating: 5, date: "2025-11-14", title: "Trustworthy company", comment: "I called 5 vending suppliers before buying. VMH was the only one that called me back same-day with real answers. That's why they got the order.", verified: true, helpful: 38 },
  { id: "r75", name: "Nadia O.", location: "Worcester, MA", rating: 5, date: "2025-06-27", title: "Best supplier I've worked with", comment: "Two machines, two states, zero issues. The shipping coordination alone was worth choosing VMH over the cheaper options.", verified: true, helpful: 29 },
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
