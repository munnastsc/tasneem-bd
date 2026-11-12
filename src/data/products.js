export const products = [
  // ==========================================
  // ১. সাতক্ষীরার খাঁটি ঘি (SATKHIRA GHEE)
  // ==========================================
  {
    id: 1,
    name: "সাতক্ষীরার খাঁটি গাওয়া ঘি",
    nameEn: "Satkhira Pure Danadaar Gawa Ghee",
    category: "ghee",
    categoryName: "সাতক্ষীরার খাঁটি ঘি",
    price: 1900,
    originalPrice: 2250,
    weight: "১ কেজি (কাঁচের জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 490, originalPrice: 580 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 970, originalPrice: 1150 },
      { label: "১ কেজি (জার)", labelEn: "1kg (Jar)", price: 1900, originalPrice: 2250 },
      { label: "২ কেজি (ফ্যামিলি প্যাক)", labelEn: "2kg", price: 3750, originalPrice: 4400 }
    ],
    rating: 4.9,
    reviewsCount: 418,
    image: "/images/satkhira_ghee.jpg",
    badge: "সাতক্ষীরার ঐতিহ্য",
    badgeColor: "gold",
    origin: "সাতক্ষীরা সদর ও শ্যামনগর",
    isSunnah: true,
    isBestseller: true,
    stock: 24,
    hadith: "গাভীর দুধে নিরাময় আছে এবং এর ঘিয়ে রোগমুক্তি আছে। (মুসতাদরাক হাকেম)",
    description: "সাতক্ষীরার গ্রাম থেকে সংগৃহীত খাঁটি গাভীর দুধ থেকে এই ঘি তৈরি করা হয়। এটি শতভাগ খাঁটি গাওয়া ঘি—এতে কোনো প্রকার কেমিক্যাল, কৃত্রিম সুগন্ধি (গন্ধ) বা কোনো রং মেশানো হয় না।",
    descriptionEn: "Pure Gawa Ghee crafted solely from authentic cow milk sourced from Satkhira villages. Completely natural with zero chemicals, added fragrances, or artificial colors.",
    labReport: {
      labName: "সায়েন্স ল্যাব (BCSIR) ও বিএসটিআই টেস্টেড",
      testId: "BCSIR-SAT-GH-2026-982",
      moisture: "০.২% (নিরাপদ খাদ্য মান)",
      purityScore: "৯৯.৯%",
      status: "১০০% খাঁটি দুধের মাখন প্রমাণিত (জিরো ডালডা/পাম অয়েল)"
    },
    benefits: [
      "প্রাকৃতিক গুড-ফ্যাট ও শক্তির শ্রেষ্ঠ উৎস",
      "হজমশক্তি বৃদ্ধি ও মেটাবলিজম উন্নত করে",
      "স্মৃতিশক্তি ও সার্বিক রোগ প্রতিরোধ ক্ষমতা বাড়ায়"
    ],
    benefitsEn: [
      "Rich source of healthy essential fatty acids",
      "Aids digestion and gut wellness",
      "Boosts immunity and mental sharpness"
    ]
  },

  // ==========================================
  // ২. খাঁটি মধু সম্ভার (PURE HONEY COLLECTION)
  // ==========================================
  {
    id: 2,
    name: "সুন্দরবনের খাঁটি র' খলিশা মধু",
    nameEn: "Raw Sundarban Khalisha Honey (Satkhira Range)",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 1999,
    originalPrice: 2350,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 540, originalPrice: 640 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 1050, originalPrice: 1250 },
      { label: "১ কেজি (জার)", labelEn: "1kg (Jar)", price: 1999, originalPrice: 2350 }
    ],
    rating: 5.0,
    reviewsCount: 562,
    image: "/images/sundarban_honey.jpg",
    badge: "সুন্দরবনের খলিশা মধু",
    badgeColor: "green",
    origin: "বুড়িগোয়ালিনী রেঞ্জ, সুন্দরবন (সাতক্ষীরা)",
    isSunnah: true,
    isBestseller: true,
    stock: 25,
    hadith: "মধু সকল শারীরিক রোগের মহৌষধ এবং কোরআন অন্তরের রোগের শেফা। (ইবনে মাজাহ)",
    description: "সুন্দরবনের সাতক্ষীরা বুড়িগোয়ালিনী ও মুন্সিগঞ্জ রেঞ্জের গভীর জঙ্গল থেকে মৌয়ালদের সাথে সরাসরি গিয়ে সংগৃহীত খলিশা ফুলের প্রথম ফ্লাশের কাঁচা মধু। কোনো হিট প্রসেসিং ছাড়া অপরিশোধিত প্রাকৃতিক এনজাইম সমৃদ্ধ।",
    descriptionEn: "Unfiltered raw wild honey collected directly with Mowals from the deep forest of Sundarban Satkhira range.",
    labReport: {
      labName: "বিএসটিআই ও এগ্রিকালচার ল্যাব ভেরিফাইড",
      testId: "BSTI-SAT-HNY-2026-441",
      moisture: "১৭.৩% (আন্তর্জাতিক কাঁচা মধুর মান)",
      purityScore: "১০০% ন্যাচারাল",
      status: "জিরো অ্যাডেড সুগার ও শতভাগ কেমিক্যালমুক্ত"
    },
    benefits: [
      "সর্দি-কাশি, কফ ও শ্বাসকষ্ট নিরাময়ে অব্যর্থ",
      "প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা ও এনার্জি বাড়ায়",
      "ত্বক উজ্জ্বল ও রক্ত পরিষ্কার রাখে"
    ],
    benefitsEn: [
      "Effective natural relief for cough and cold",
      "High antioxidant power for strong immunity",
      "Nourishes skin and boosts daily vitality"
    ]
  },
  {
    id: 20,
    name: "প্রাকৃতিক কুল বরই ফুলের মধু",
    nameEn: "Pure Natural Jujube / Kul Boroi Flower Honey",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 849,
    originalPrice: 1050,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 240, originalPrice: 300 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 450, originalPrice: 550 },
      { label: "১ কেজি", labelEn: "1kg", price: 849, originalPrice: 1050 }
    ],
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
    badge: "গাঢ় লালচে সোনালী",
    badgeColor: "gold",
    origin: "নাটোর ও রাজশাহী বরই বাগান",
    isSunnah: true,
    isBestseller: true,
    stock: 30,
    hadith: "মধু পানে বরকত ও আরোগ্য রয়েছে।",
    description: "শীতের শুরুতে বরই ফুলের মৌসুমে সংগৃহীত খাঁটি মধু। ঘন আঠালো টেক্সচার, হালকা ফলের সুবাস এবং কড়া মিষ্টি স্বাদ। শিশুদের ঠান্ডা-কাশির জন্য অতুলনীয়।",
    descriptionEn: "Rich, dense, and caramel-like raw honey collected during the blooming of wild jujube (boroi) orchards.",
    labReport: {
      labName: "সায়েন্স ল্যাব খাদ্য বিভাগ",
      testId: "BCSIR-BOROI-2026",
      moisture: "১৭.৮%",
      purityScore: "১০০% প্রাকৃতিক মধু",
      status: "কোনো চিনি বা সিরাপের ভেজাল নেই"
    },
    benefits: [
      "গলা ব্যথা ও শুকনো কাশি দ্রুত উপশম করে",
      "বাচ্চাদের স্মৃতিশক্তি ও খাবারের রুচি বৃদ্ধি করে",
      "কোষ্ঠকাঠিন্য ও গ্যাস্ট্রিকের সমস্যায় দারুণ কার্যকর"
    ],
    benefitsEn: [
      "Rapid natural relief for sore throat and cough",
      "Improves appetite and energy for children",
      "Soothes gastric inflammation and acidity"
    ]
  },
  {
    id: 21,
    name: "দিনাজপুরের খাঁটি লিচু ফুলের মধু",
    nameEn: "Pure Dinajpur Lychee Blossom Honey",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 850,
    originalPrice: 1050,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 240, originalPrice: 300 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 450, originalPrice: 550 },
      { label: "১ কেজি", labelEn: "1kg", price: 850, originalPrice: 1050 }
    ],
    rating: 4.9,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80",
    badge: "মিষ্টি সুবাসিত মধু",
    badgeColor: "emerald",
    origin: "দিনাজপুরের ঐতিহ্যবাহী লিচু বাগান",
    isSunnah: true,
    isBestseller: false,
    stock: 22,
    hadith: "মধুর রয়েছে আশ্চর্য নিরাময় ক্ষমতা।",
    description: "দিনাজপুরের সুপ্রসিদ্ধ বেদানা ও বোম্বাই লিচু বাগান থেকে সংগৃহীত। হালকা সোনালী স্বচ্ছ রং, চমৎকার লিচুর সুবাস এবং অত্যন্ত সুস্বাদু হালকা মিষ্টি।",
    descriptionEn: "Light, floral, and aromatic raw honey harvested straight from the prized lychee orchards of Dinajpur.",
    labReport: {
      labName: "বিএসটিআই ল্যাব টেস্ট",
      testId: "BSTI-LYCH-2026",
      moisture: "১৮.০%",
      purityScore: "১০০% খাঁটি লিচু ফুলের মধু",
      status: "জিরো কেমিক্যাল ও ফ্রেশ"
    },
    benefits: [
      "শরীরের ক্লান্তি ও দুর্বলতা নিমিষে দূর করে",
      "হালকা ও সহজে হজমযোগ্য, ছোটদের জন্য আদর্শ",
      "ত্বকের উজ্জ্বলতা বাড়াতে ও রূপচর্চায় সেরা"
    ],
    benefitsEn: [
      "Gentle and fast-digesting for young children",
      "Hydrates and rejuvenates skin tone",
      "Delightful floral natural sweetness"
    ]
  },
  {
    id: 22,
    name: "প্রাকৃতিক সরিষা ফুলের খাঁটি মধু",
    nameEn: "Pure Mustard Blossom Raw Honey (Natural Cream)",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 699,
    originalPrice: 850,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 210, originalPrice: 260 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 380, originalPrice: 460 },
      { label: "১ কেজি", labelEn: "1kg", price: 699, originalPrice: 850 }
    ],
    rating: 4.8,
    reviewsCount: 380,
    image: "/images/mustard_honey.jpg",
    badge: "ক্রিমি সাদা জমাকৃত মধু",
    badgeColor: "gold",
    origin: "সিরাজগঞ্জ ও মানিকগঞ্জের সরিষা খেত",
    isSunnah: true,
    isBestseller: true,
    stock: 40,
    hadith: "খাঁটি মধু রোগ নিরাময়ের অন্যতম সেরা মাধ্যম।",
    description: "শীতকালে বিস্তীর্ণ সরিষা খেত থেকে সংগৃহীত। প্রাকৃতিকভাবে ঠান্ডা আবহাওয়ায় জমে মাখনের মতো ক্রিমি হয়—যা খাঁটি সরিষা মধুর সবচেয়ে বড় বৈজ্ঞানিক প্রমাণ। পাউরুটি বা দুধের সাথে খাওয়ার জন্য দারুণ।",
    descriptionEn: "Raw mustard blossom honey that naturally crystallizes into a velvety, creamy spreadable texture.",
    labReport: {
      labName: "সায়েন্স ল্যাব খাদ্য শাখা",
      testId: "BCSIR-MUST-HNY-2026",
      moisture: "১৭.৫%",
      purityScore: "১০০% প্রাকৃতিক সরিষা মধু",
      status: "প্রাকৃতিক গ্লুকোজ ক্রিস্টাল প্রমাণিত"
    },
    benefits: [
      "প্রাকৃতিক মাখন বা স্প্রেড হিসেবে দারুণ স্বাস্থ্যকর",
      "রক্তে কোলেস্টেরল নিয়ন্ত্রণে সহায়ক",
      "সর্দি ও ঋতু পরিবর্তনের জ্বর-কাশিতে উপকারী"
    ],
    benefitsEn: [
      "Delicious natural spreadable honey butter substitute",
      "Assists healthy metabolic circulation",
      "Rich in beneficial natural glucose crystals"
    ]
  },
  {
    id: 13,
    name: "প্রাকৃতিক কালোজিরা ফুলের খাঁটি মধু",
    nameEn: "Pure Black Seed (Kalonji) Flower Honey",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 1150,
    originalPrice: 1380,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 320, originalPrice: 390 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 600, originalPrice: 720 },
      { label: "১ কেজি", labelEn: "1kg", price: 1150, originalPrice: 1380 }
    ],
    rating: 4.9,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80",
    badge: "কালোজিরার নির্যাসযুক্ত",
    badgeColor: "green",
    origin: "ফরিদপুর ও শরীয়তপুরের কালোজিরা খেত",
    isSunnah: true,
    isBestseller: true,
    stock: 25,
    hadith: "কালোজিরা ও মধু উভয়ই শেফা।",
    description: "কালোজিরা ফুলের মৌসুমের প্রাকৃতিক মধু। গাড় তামাটে রং, হালকা ঝাঝালো মিষ্টি স্বাদ এবং সুন্নতি শেফায় ভরপুর।",
    descriptionEn: "Honey harvested exclusively from Nigella Sativa (black seed) blossom fields. Naturally dark, rich and therapeutic.",
    labReport: {
      labName: "বিএসটিআই খাদ্য উইং",
      testId: "BSTI-KLN-2026",
      moisture: "১৮.১%",
      purityScore: "৯৯.৮%",
      status: "শতভাগ ভেজালমুক্ত প্রাকৃতিক মধু"
    },
    benefits: [
      "ঠান্ডা লাগা ও শ্বাসকষ্ট নিয়ন্ত্রণে বিশেষ উপকারী",
      "রক্তে শর্করার মাত্রা নিয়ন্ত্রণে সহায়ক",
      "রোগ প্রতিরোধ ক্ষমতা বহুগুণ বাড়ায়"
    ],
    benefitsEn: [
      "Natural respiratory and asthma defense",
      "Potent thymoquinone content from black seed flowers",
      "Enhances immune resilience"
    ]
  },

  // ==========================================
  // ৩. ঘানিভাঙা সরিষার তেল (SORISAR OIL)
  // ==========================================
  {
    id: 4,
    name: "কাঠের ঘানিভাঙা খাঁটি সরিষার তেল",
    nameEn: "Cold Wood-Pressed Mustard Oil",
    category: "oil",
    categoryName: "ঘানিভাঙা সরিষার তেল",
    price: 360,
    originalPrice: 420,
    weight: "১ লিটার (বোতল)",
    variants: [
      { label: "১ লিটার", labelEn: "1 Litre", price: 360, originalPrice: 420 },
      { label: "২ লিটার", labelEn: "2 Litres", price: 700, originalPrice: 820 },
      { label: "৫ লিটার (পারিবারিক ক্যান)", labelEn: "5 Litres", price: 1700, originalPrice: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 230,
    image: "/images/sorisar_oil.jpg",
    badge: "তীব্র প্রাকৃতিক ঝাঁঝ",
    badgeColor: "gold",
    origin: "দেশি কাঠের ঘানি, পাবনা",
    isSunnah: true,
    isBestseller: true,
    stock: 40,
    hadith: "খাঁটি আহার গ্রহণ করো এবং খাদ্যে ভেজাল দেওয়া থেকে বিরত থাকো।",
    description: "দেশি মাঘী সরিষা থেকে কাঠের ঘানিতে ধীরগতিতে কোল্ড-প্রেস করে তৈরি। কোনো কেমিক্যাল ওয়াশ বা রাইস ব্রান মিশ্রণ নেই। তীব্র খাঁটি ঝাঁঝ ও অতুলনীয় সুবাস।",
    descriptionEn: "Cold pressed on traditional wooden ghani at low temperature to retain natural pungency, pungent flavor and authentic nutrients.",
    labReport: {
      labName: "সায়েন্স ল্যাব ফুড উইং টেস্টেড",
      testId: "BCSIR-MO-2026-302",
      moisture: "শূন্য ভেজাল",
      purityScore: "৯৯.৯% খাঁটি সরিষা নির্যাস",
      status: "কোনো রাইস ব্রান বা পাম অয়েল মিশ্রণ নেই"
    },
    benefits: [
      "খারাপ কোলেস্টেরল কমায় ও হার্ট ভালো রাখে",
      "বাতের ব্যথা ও শরীর ম্যাসাজে অত্যন্ত উপকারী",
      "ভর্তা ও রান্নায় ঐতিহ্যবাহী খাঁটি বাঙালি স্বাদ আনে"
    ],
    benefitsEn: [
      "Heart-friendly monounsaturated fats",
      "Effective traditional massage oil for aches",
      "Unmatched authentic village culinary aroma"
    ]
  },

  // ==========================================
  // ৪. প্রিমিয়াম বাদাম সম্ভার (NUTS COLLECTION)
  // কাজু বাদাম, কাঠ বাদাম ও পেস্তা বাদাম
  // ==========================================
  {
    id: 60,
    name: "প্রিমিয়াম কাজু বাদাম",
    nameEn: "Premium Whole Cashew Nuts (Kaju Badam)",
    category: "nuts",
    categoryName: "প্রিমিয়াম বাদাম সম্ভার",
    price: 1900,
    originalPrice: 2200,
    weight: "১ কেজি (জার/প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 490, originalPrice: 580 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 970, originalPrice: 1150 },
      { label: "১ কেজি", labelEn: "1kg", price: 1900, originalPrice: 2200 }
    ],
    rating: 5.0,
    reviewsCount: 176,
    image: "/images/kaju_badam.jpg",
    badge: "মিডিয়াম সাইজ ১৯০০৳/কেজি",
    badgeColor: "gold",
    origin: "আমদানিকৃত প্রিমিয়াম গ্রেড (ভিয়েতনাম)",
    isSunnah: true,
    isBestseller: true,
    stock: 45,
    hadith: "পুষ্টিকর খাদ্য ও বাদাম শরীরকে কর্মক্ষম ও সবল রাখে।",
    description: "সম্পূর্ণ মচমচে, টাটকা ও মিষ্টি স্বাদের এ-গ্রেড আস্ত কাজু বাদাম। কোনো প্রকার পচা, ঘুণে ধরা দানা বা কেমিক্যাল প্রিজারভেটিভ নেই। সম্পূর্ণ কাঁচা ও প্রাকৃতিক পুষ্টিগুণে ভরপুর। নিয়মিত খেলে শরীর ও মন চাঙ্গা থাকে।",
    descriptionEn: "Supreme quality crispy, unroasted whole cashew nuts. Freshly packed, nutrient-dense and zero chemical additives.",
    labReport: {
      labName: "সায়েন্স ল্যাব খাদ্য বিভাগ (BCSIR)",
      testId: "BCSIR-CASHEW-2026",
      moisture: "৪.২% (নিখুঁত ক্রিস্পি আর্দ্রতা)",
      purityScore: "১০০% প্রিমিয়াম কাজু বাদাম",
      status: "জিরো অ্যাডিটিভস ও প্রাকৃতিক ফ্রেশনেস"
    },
    benefits: [
      "প্রচুর ম্যাগনেসিয়াম, জিংক ও আয়রন সমৃদ্ধ যা শক্তিবর্ধক",
      "হার্ট ভালো রাখে এবং রক্তনালীর স্বাস্থ্য রক্ষা করে",
      "ত্বক, চুল ও হাড়ের সুস্বাস্থ্যে প্রতিদিনের শ্রেষ্ঠ পুষ্টি"
    ],
    benefitsEn: [
      "Rich in heart-healthy plant fats and minerals",
      "Packed with zinc and magnesium for daily stamina",
      "Delicious wholesome crunch for kids and adults"
    ]
  },
  {
    id: 61,
    name: "প্রিমিয়াম কাঠ বাদাম",
    nameEn: "California Premium Whole Almonds (Kat Badam)",
    category: "nuts",
    categoryName: "প্রিমিয়াম বাদাম সম্ভার",
    price: 1600,
    originalPrice: 1950,
    weight: "১ কেজি (জার/প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 420, originalPrice: 500 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 820, originalPrice: 1000 },
      { label: "১ কেজি", labelEn: "1kg", price: 1600, originalPrice: 1950 }
    ],
    rating: 5.0,
    reviewsCount: 194,
    image: "/images/kat_badam.jpg",
    badge: "ক্যালিফোর্নিয়া ১৬০০৳/কেজি",
    badgeColor: "emerald",
    origin: "ক্যালিফোর্নিয়া, ইউএসএ (সরাসরি আমদানিকৃত)",
    isSunnah: true,
    isBestseller: true,
    stock: 50,
    hadith: "স্বাস্থ্যকর প্রাকৃতিক আহার দীর্ঘায়ু ও সুস্থতার সহায়ক।",
    description: "আমেরিকার ক্যালিফোর্নিয়া থেকে সরাসরি সংগৃহীত সেরা মানের ফ্রেশ কাঠ বাদাম (বাদামি খোসাসহ)। সকালে ভিজিয়ে খাওয়ার জন্য অত্যন্ত কার্যকরী। উচ্চমাত্রার ভিটামিন ই, ক্যালসিয়াম ও প্রাকৃতিক ফাইবারের অতুলনীয় উৎস।",
    descriptionEn: "Top-grade direct imported California whole almonds with supreme crunch, high dietary fiber and active vitamin E.",
    labReport: {
      labName: "বিএসটিআই ও এগ্রিকালচার ল্যাব ভেরিফাইড",
      testId: "BSTI-ALM-2026",
      moisture: "৪.৫% (মচমচে গুণমান)",
      purityScore: "১০০% প্রিমিয়াম কাঠ বাদাম",
      status: "কোনো কৃত্রিম তেল পলিশ বা রং নেই"
    },
    benefits: [
      "মস্তিষ্কের স্মৃতিশক্তি প্রখর ও স্নায়ুতন্ত্র শান্ত রাখে",
      "উচ্চ ভিটামিন-ই ত্বক মসৃণ ও তারুণ্যদীপ্ত রাখে",
      "খারাপ কোলেস্টেরল কমায় ও রক্তে শর্পরার মাত্রা নিয়ন্ত্রণ করে"
    ],
    benefitsEn: [
      "Enhances memory retention and cognitive sharpness",
      "Abundant Vitamin E nourishes skin and hair",
      "Lowers LDL cholesterol and stabilizes blood glucose"
    ]
  },
  {
    id: 62,
    name: "প্রিমিয়াম পেস্তা বাদাম",
    nameEn: "Premium Iranian Whole Pistachios (Pesta Badam)",
    category: "nuts",
    categoryName: "প্রিমিয়াম বাদাম সম্ভার",
    price: 2600,
    originalPrice: 3100,
    weight: "১ কেজি (জার/প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 680, originalPrice: 800 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 1350, originalPrice: 1600 },
      { label: "১ কেজি", labelEn: "1kg", price: 2600, originalPrice: 3100 }
    ],
    rating: 5.0,
    reviewsCount: 154,
    image: "/images/pesta_badam.jpg",
    badge: "ইরানি এ-গ্রেড পেস্তা",
    badgeColor: "emerald",
    origin: "ইরান (সরাসরি আমদানিকৃত)",
    isSunnah: true,
    isBestseller: true,
    stock: 35,
    hadith: "সুস্থ ও সবল মুমিন দুর্বল মুমিনের চেয়ে উত্তম।",
    description: "সম্পূর্ণ অক্ষত, বড় সাইজের ও প্রাকৃতিক মিষ্টি স্বাদের আস্ত সবুজ পেস্তা বাদাম। কোনো কৃত্রিম লবণ বা রাসায়নিক রং ছাড়া শতভাগ প্রাকৃতিক। ভিটামিন বি-৬, অ্যান্টিঅক্সিডেন্ট ও প্রোটিনে ভরপুর। মিষ্টি, সেমাই ও পায়েসে অনন্য স্বাদ এনে দেয়।",
    descriptionEn: "Authentic whole Iranian green pistachios. Unsalted, unbleached, rich in antioxidants and vital nutrients.",
    labReport: {
      labName: "সায়েন্স ল্যাব ফুড উইং টেস্টেড",
      testId: "BCSIR-PIST-2026",
      moisture: "৪.১%",
      purityScore: "১০০% খাঁটি ইরানি পেস্তা",
      status: "জিরো কেমিক্যাল ও কৃত্রিম রংমুক্ত"
    },
    benefits: [
      "চোখের দৃষ্টিশক্তি ভালো রাখে ও অ্যান্টিঅক্সিডেন্ট যোগায়",
      "রক্তে হিমোগ্লোবিন বাড়ায় ও রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে",
      "মিষ্টি ও ডেজার্ট রান্নায় দেয় রাজকীয় স্বাদ ও চমৎকার রূপ"
    ],
    benefitsEn: [
      "Packed with lutein and zeaxanthin for vision health",
      "Heart-friendly protein and rich healthy fats",
      "Naturally vibrant and crisp"
    ]
  },

  // ==========================================
  // ৫. খাঁটি দেশি মশলা (PURE SPICES)
  // হলুদ গুঁড়া, ঝালের গুঁড়া ও জিরা গুঁড়া
  // ==========================================
  {
    id: 30,
    name: "খাঁটি দেশি হলুদ গুঁড়া",
    nameEn: "Pure Deshi Organic Turmeric Powder (Holud Gura)",
    category: "spices",
    categoryName: "খাঁটি দেশি মশলা",
    price: 250,
    originalPrice: 320,
    weight: "৫০০ গ্রাম (ফুড-গ্রেড সিল্ড প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 135, originalPrice: 170 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 250, originalPrice: 320 },
      { label: "১ কেজি", labelEn: "1kg", price: 490, originalPrice: 620 }
    ],
    rating: 5.0,
    reviewsCount: 218,
    image: "/images/turmeric_powder.jpg",
    badge: "১০০% সিসা ও রঞ্জকমুক্ত",
    badgeColor: "gold",
    origin: "দেশি মাঠপর্যায়ের কাঁচা হলুদ",
    isSunnah: false,
    isBestseller: true,
    stock: 45,
    hadith: "খাঁটি আহার সুস্বাস্থ্যের চাবিকাঠি।",
    description: "মাঠপর্যায়ে সরাসরি সংগৃহীত আঁশযুক্ত দেশি কাঁচা হলুদ ধুয়ে, রোদে শুকিয়ে পরিচ্ছন্নভাবে ভাঙানো। কোনো টেক্সটাইল রং, সিসা বা ধানের গুঁড়ার ভেজাল নেই। তরকারিতে দেয় প্রাকৃতিক উজ্জ্বল সোনালী রং ও খাঁটি সুঘ্রাণ। ঘরের বাজারের চেয়েও সাশ্রয়ী মূল্যে খাঁটি নিশ্চয়তা।",
    descriptionEn: "Stone-ground pure deshi turmeric sourced directly from farmers. Tested 100% free of lead chromate and artificial yellow dyes. Superior quality at the most honest price.",
    labReport: {
      labName: "সায়েন্স ল্যাব (BCSIR) কেমিক্যাল শাখা",
      testId: "BCSIR-TUR-2026",
      moisture: "৭.৫% (আদর্শ শুষ্কতা)",
      purityScore: "১০০% খাঁটি হলুদ",
      status: "জিরো লেড ক্রোমেট (সিসা মুক্ত প্রমাণিত)"
    },
    benefits: [
      "উচ্চ কার্কিউমিন সমৃদ্ধ শক্তিশালী অ্যান্টিঅক্সিডেন্ট",
      "শরীরের যেকোনো প্রদাহ ও বাত নিরাময়ে সহায়ক",
      "ক্যান্সার প্রতিরোধ ও ত্বক সুস্থ রাখতে অতুলনীয়"
    ],
    benefitsEn: [
      "High natural Curcumin compound",
      "Powerful anti-inflammatory properties",
      "Completely pure, safe for the whole family"
    ]
  },
  {
    id: 31,
    name: "খাঁটি দেশি ঝালের গুঁড়া",
    nameEn: "Pure Hot Red Chili Powder (Jhaler Gura)",
    category: "spices",
    categoryName: "খাঁটি দেশি মশলা",
    price: 310,
    originalPrice: 390,
    weight: "৫০০ গ্রাম (ফুড-প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 160, originalPrice: 200 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 310, originalPrice: 390 },
      { label: "১ কেজি", labelEn: "1kg", price: 590, originalPrice: 740 }
    ],
    rating: 4.9,
    reviewsCount: 195,
    image: "/images/jhaler_gura.jpg",
    badge: "তীব্র খাঁটি ঝাঁঝ ও লালচে আভা",
    badgeColor: "emerald",
    origin: "বগুড়ার ঝাল মরিচ খেত",
    isSunnah: false,
    isBestseller: true,
    stock: 40,
    hadith: "খাবারে ভেজাল দেওয়া থেকে কঠোরভাবে বিরত থাকো।",
    description: "বগুড়ার সেরা শুকনো ঝাল মরিচ বোঁটা বেছে, কড়া রোদে শুকিয়ে সম্পূর্ণ নিজস্ব তত্ত্বাবধানে ভাঙানো। কোনো কৃত্রিম লাল রং, কেমিক্যাল বা ইটের গুঁড়া মেশানো হয় না। রান্নায় দেয় আসল দেশি ঝাঁঝ ও চমৎকার স্বাদ।",
    descriptionEn: "Authentic sun-dried hot chili powder ground from handpicked chilis with zero synthetic red coloring. Genuine punch and natural aroma.",
    labReport: {
      labName: "খাদ্য মান নিয়ন্ত্রণ ল্যাব",
      testId: "FQC-CHILI-2026",
      moisture: "৮.২%",
      purityScore: "১০০% খাঁটি মরিচ নির্যাস",
      status: "কোনো ক্ষতিকারক কৃত্রিম রঞ্জক নেই"
    },
    benefits: [
      "প্রাকৃতিক ক্যাপসাইসিন মেটাবলিজম বৃদ্ধি করে",
      "হজমশক্তি উদ্দীপিত করে ও ক্ষুধা বাড়ায়",
      "রান্নায় প্রাকৃতিক লালচে আভা ও আসল ঝাঁঝ আনে"
    ],
    benefitsEn: [
      "Boosts metabolism through natural capsaicin",
      "Zero brick dust or textile dye adulteration",
      "Rich deep flavor and punch"
    ]
  },
  {
    id: 34,
    name: "খাঁটি প্রিমিয়াম জিরা গুঁড়া",
    nameEn: "Pure Aromatic Roasted Cumin Powder (Jira Gura)",
    category: "spices",
    categoryName: "খাঁটি দেশি মশলা",
    price: 610,
    originalPrice: 750,
    weight: "৫০০ গ্রাম (ফুড-গ্রেড সিল্ড প্যাক)",
    variants: [
      { label: "২০০ গ্রাম", labelEn: "200g", price: 250, originalPrice: 310 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 610, originalPrice: 750 },
      { label: "১ কেজি", labelEn: "1kg", price: 1190, originalPrice: 1450 }
    ],
    rating: 5.0,
    reviewsCount: 162,
    image: "/images/jira_gura.jpg",
    badge: "১০০% খাঁটি কিউমিন সুবাস",
    badgeColor: "gold",
    origin: "নির্বাচিত প্রিমিয়াম কিউমিন বীজ",
    isSunnah: false,
    isBestseller: true,
    stock: 38,
    hadith: "সুস্বাদু ও সুবাসিত মসলা খাবারের তৃপ্তি বাড়ায়।",
    description: "বাছাইকৃত সেরা কিউমিন (জিরা) ধুলোবালি ও ময়লামুক্ত করে হালকা তাওয়ায় টেলে নিজস্ব মিলে ভাঙানো। কোনো কাঠের ভুসি, ডাল বা ধানের গুঁড়ার ভেজাল নেই। তরকারি, মাছ ও মাংসের ভুনা রান্নায় এক চামচেই ছড়িয়ে পড়ে রাজকীয় সুবাস। ঘরের বাজারের চেয়েও সাশ্রয়ী দামে সেরা নিশ্চয়তা।",
    descriptionEn: "Stone-ground roasted aromatic cumin powder. Cleaned, destoned and slow-roasted for intense authentic aroma.",
    labReport: {
      labName: "সায়েন্স ল্যাব খাদ্য শাখা",
      testId: "BCSIR-CUMIN-2026",
      moisture: "৭.৮%",
      purityScore: "১০০% বিশুদ্ধ কিউমিন নির্যাস",
      status: "কোনো প্রকার ভেজাল বা ডাস্ট মিশ্রণ নেই"
    },
    benefits: [
      "হজমশক্তি উন্নত করে ও এসিডিটি নিরাময়ে দারুণ সহায়ক",
      "শরীরে আয়রনের ভারসাম্য রক্ষা করে ও রোগ প্রতিরোধ বাড়ায়",
      "যেকোনো সাধারণ রান্নাকে করে তোলে অতুলনীয় সুস্বাদু"
    ],
    benefitsEn: [
      "Enhances digestion and eases bloating",
      "Rich in natural dietary iron and essential oils",
      "Imparts unmatched warm aroma to any gourmet dish"
    ]
  },

  // ==========================================
  // ৬. সাতক্ষীরার বিখ্যাত রসালো আম (SATKHIRA MANGO)
  // ফরমালিন ও কেমিক্যালমুক্ত গাছপাকা হিমসাগর
  // ==========================================
  {
    id: 50,
    name: "সাতক্ষীরার বিখ্যাত কেমিক্যালমুক্ত হিমসাগর আম",
    nameEn: "Satkhira Authentic Chemical-Free Himsagar Mango (Export Quality)",
    category: "mango",
    categoryName: "সাতক্ষীরার রসালো আম",
    price: 650,
    originalPrice: 800,
    weight: "৫ কেজি (ফুড-প্যাকিং বক্স)",
    variants: [
      { label: "৫ কেজি (বক্স)", labelEn: "5kg Box", price: 650, originalPrice: 800 },
      { label: "১০ কেজি (ক্যারেট)", labelEn: "10kg Crate", price: 1250, originalPrice: 1550 },
      { label: "২০ কেজি (পারিবারিক ক্যারেট)", labelEn: "20kg Mega", price: 2400, originalPrice: 3000 }
    ],
    rating: 5.0,
    reviewsCount: 310,
    image: "/images/satkhira_mango.jpg",
    badge: "সাতক্ষীরার বিখ্যাত আম",
    badgeColor: "gold",
    origin: "কলারোয়া ও দেবহাটা, সাতক্ষীরা",
    isSunnah: false,
    isBestseller: true,
    stock: 60,
    originEn: "Kalaroa & Debhata, Satkhira",
    hadith: "আল্লাহর দেওয়া সুমিষ্ট ফলমূল ও নেয়ামতের শুকরিয়া আদায় করো।",
    description: "সাতক্ষীরার সুপরিচিত কলারোয়া ও দেবহাটার প্রাচীন বাগান থেকে সরাসরি সংগৃহীত গাছপাকা হিমসাগর আম। কোনো ক্ষতিকর কার্বাইড, ফরমালিন বা ইথোফেন ছাড়া সম্পূর্ণ প্রাকৃতিক উপায়ে পাকানো। পাতলা খোসা, আঁশহীন রসালো মিষ্টি শাঁস ও অতুলনীয় মনমাতানো সুবাস।",
    descriptionEn: "World-renowned GI-heritage Himsagar mangoes harvested directly from Satkhira orchards. Naturally ripened with zero calcium carbide, formalin, or artificial ripening agents.",
    labReport: {
      labName: "কৃষি সম্প্রসারণ অধিদপ্তর ও বিসিএসআইআর টেস্টেড",
      testId: "DAE-SAT-MNG-2026-114",
      moisture: "প্রাকৃতিক সুগার ও ভিটামিন সি সমৃদ্ধ",
      purityScore: "১০০% কার্বাইড ও ফরমালিন মুক্ত",
      status: "এক্সপোর্ট কোয়ালিটি সার্টিফাইড"
    },
    benefits: [
      "শতভাগ ফরমালিন ও ক্ষতিকারক রাসায়নিক কার্বাইডমুক্ত গাছপাকা আম",
      "প্রাকৃতিক ভিটামিন এ, সি ও রোগ প্রতিরোধকারী অ্যান্টিঅক্সিডেন্টে ভরপুর",
      "সম্পূর্ণ আঁশবিহীন নরম মিষ্টি শাঁস, শিশুদের অত্যন্ত প্রিয়"
    ],
    benefitsEn: [
      "Zero chemical, carbide, and formalin guarantee",
      "Rich in dietary vitamin A and C for energy and vitality",
      "Silky fiberless sweet pulp beloved by kids and families"
    ]
  }
];

export const bundleItems = [
  { id: 'b1', name: 'সাতক্ষীরার খাঁটি গাওয়া ঘি (৫০০ গ্রাম)', price: 970, weight: '৫০০ গ্রাম' },
  { id: 'b2', name: 'সুন্দরবনের খাঁটি খলিশা মধু (৫০০ গ্রাম)', price: 1050, weight: '৫০০ গ্রাম' },
  { id: 'b3', name: 'কাঠের ঘানিভাঙা সরিষার তেল (১ লিটার)', price: 360, weight: '১ লিটার' },
  { id: 'b4', name: 'প্রিমিয়াম কাজু বাদাম (২৫০ গ্রাম)', price: 490, weight: '২৫০ গ্রাম' },
  { id: 'b5', name: 'প্রিমিয়াম কাঠ বাদাম (২৫০ গ্রাম)', price: 420, weight: '২৫০ গ্রাম' },
  { id: 'b6', name: 'প্রিমিয়াম পেস্তা বাদাম (২৫০ গ্রাম)', price: 680, weight: '২৫০ গ্রাম' },
  { id: 'b7', name: 'খাঁটি দেশি হলুদ গুঁড়া (৫০০ গ্রাম)', price: 250, weight: '৫০০ গ্রাম' },
  { id: 'b8', name: 'খাঁটি দেশি ঝালের গুঁড়া (৫০০ গ্রাম)', price: 310, weight: '৫০০ গ্রাম' },
  { id: 'b9', name: 'খাঁটি প্রিমিয়াম জিরা গুঁড়া (২০০ গ্রাম)', price: 250, weight: '২০০ গ্রাম' },
  { id: 'b10', name: 'সাতক্ষীরার হিমসাগর আম (৫ কেজি)', price: 650, weight: '৫ কেজি' }
];

export const faqs = [
  {
    q: "সাতক্ষীরার ঘি, মধু ও সরিষার তেলের সত্যতা যাচাই করব কীভাবে?",
    a: "আমাদের প্রতিটি পণ্যের পেছনে সায়েন্স ল্যাব (BCSIR) ও বিএসটিআই টেস্ট রিপোর্টের কিউআর কোড থাকে। এছাড়াও ডেলিভারির সময় ডেলিভারি ম্যানের সামনেই প্যাকেট খুলে ঘ্রাণ ও স্বাদ পরীক্ষা করে নেওয়ার পূর্ণ স্বাধীনতা রয়েছে। পছন্দ না হলে সাথে সাথে ফেরত দিতে পারবেন—১ টাকাও ডেলিভারি চার্জ দিতে হবে না।"
  },
  {
    q: "সুন্দরবনের কাঁচা মধু কি শীতে বা ফ্রিজে জমে যায়?",
    a: "হ্যাঁ, খাঁটি কাঁচা মধুতে থাকা প্রাকৃতিক গ্লুকোজ ও পোলেনের কারণে তাপমাত্রা কমে গেলে তা জমাট বাঁধতে পারে—এটি কাঁচা মধুর অন্যতম প্রধান বৈজ্ঞানিক প্রমাণ। কোনো হিট-প্রসেসিং ছাড়া সরাসরি সুন্দরবনের সাতক্ষীরা রেঞ্জ থেকে সংগৃহীত হওয়ায় এর সব এনজাইম অক্ষুণ্ণ থাকে।"
  },
  {
    q: "হলুদ, ঝালের গুঁড়া ও জিরা গুঁড়ায় কি কোনো কৃত্রিম রং বা ভেজাল আছে?",
    a: "আলহামদুলিল্লাহ, আমাদের দেশি কাঁচা হলুদ, বগুড়ার মরিচ ও বাছাইকৃত জিরা নিজস্ব তত্ত্বাবধানে রোদে শুকিয়ে পরিচ্ছন্ন মিলে ভাঙানো হয়। বিসিএসআইআর টেস্টে এটি ১০০% সিসা ও কৃত্রিম টেক্সটাইল রঞ্জকমুক্ত প্রমাণিত। কোনো কাঠের ভুসি বা ধানের কুঁড়া মেশানো হয় না।"
  },
  {
    q: "বাদামগুলো (কাজু, কাঠ ও পেস্তা বাদাম) কেমন ফ্রেশ?",
    a: "আমাদের প্রতিটি বাদাম বাছাইকৃত নতুন লটের এবং ভ্যাকুয়াম এয়ারটাইট প্যাকেজিংয়ে সিল করা। কোনো পোকা-ধরা, পচা বা নরম বাদাম নেই—প্রতিটি দানা ক্রিস্পি ও টাটকা মিষ্টি স্বাদের।"
  },
  {
    q: "অর্ডার করার পর ডেলিভারি পেতে কতদিন সময় লাগবে?",
    a: "ঢাকা সিটির মধ্যে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে যেকোনো জেলা বা উপজেলায় ৪৮ থেকে ৭২ ঘণ্টার মধ্যে স্টিডফাস্ট কুরিয়ারের মাধ্যমে ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি পৌঁছে দেওয়া হয়।"
  }
];

export const sourcingStories = [
  {
    id: 's1',
    title: "সাতক্ষীরার গ্রাম থেকে সংগৃহীত খাঁটি গাওয়া ঘি",
    location: "সাতক্ষীরার গ্রাম",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
    desc: "সাতক্ষীরার গ্রাম থেকে সংগৃহীত খাঁটি দুধ থেকে এই ঘি তৈরি করা হয়। এটি শুধুই খাঁটি গাওয়া ঘি—এতে কোনো প্রকার কেমিক্যাল, কৃত্রিম গন্ধ বা কোনো প্রকার রং মেশানো হয় না।"
  },
  {
    id: 's2',
    title: "সুন্দরবনের সাতক্ষীরা রেঞ্জে মৌয়ালদের মধু অভিযান",
    location: "বুড়িগোয়ালিনী ও গাবুরা, সাতক্ষীরা",
    image: "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80",
    desc: "সুন্দরবনের সাতক্ষীরা রেঞ্জে মৌয়ালদের সাথে সরাসরি গিয়ে গভীর বনের খলিশা গাছের ফুল থেকে মধু সংগ্রহ করা হয়। এটি শতভাগ র' এবং অক্ষত অ্যান্টিঅক্সিডেন্টে সমৃদ্ধ।"
  },
  {
    id: 's3',
    title: "সাতক্ষীরার বিখ্যাত কলারোয়ার রাসায়নিকমুক্ত হিমসাগর আম",
    location: "কলারোয়া ও দেবহাটা, সাতক্ষীরা",
    image: "/images/satkhira_mango.jpg",
    desc: "সাতক্ষীরার ঐতিহ্যবাহী বাগান থেকে সরাসরি সংগৃহীত গাছপাকা হিমসাগর আম। কোনো ক্ষতিকারক কার্বাইড বা ফরমালিন ছাড়া শতভাগ প্রাকৃতিক উপায়ে পাকানো অতুলনীয় সুমিষ্ট আম।"
  },
  {
    id: 's4',
    title: "পাবনার ঐতিহ্যবাহী কাঠের ঘানিতে সরিষার তেল",
    location: "পাবনা ও নাটোর",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    desc: "দেশি মাঘী সরিষা কাঠের ঘানিতে ধীরগতিতে কোল্ড-প্রেস করে তৈরি। কোনো কেমিক্যাল ওয়াশ বা কৃত্রিম ঝাঁঝ নেই—শতভাগ খাঁটি।"
  },
  {
    id: 's5',
    title: "আমদানিকৃত প্রিমিয়াম গ্রেড কাজু, কাঠ ও পেস্তা বাদাম",
    location: "ভিয়েতনাম, ইরান ও ক্যালিফোর্নিয়া",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80",
    desc: "সরাসরি আমদানিকৃত সেরা নতুন লটের ক্রিস্পি আস্ত কাজু, কাঠ ও সবুজ পেস্তা বাদাম। স্বাস্থ্যকর সকালের পুষ্টিতে অতুলনীয়।"
  }
];

export const reviews = [
  {
    id: 1,
    name: "ইঞ্জি. তারিকুল ইসলাম",
    location: "মিরপুর ডিওএইচএস, ঢাকা",
    rating: 5,
    text: "সাতক্ষীরার গাওয়া ঘি ও বরই ফুলের মধু নিয়েছিলাম। বয়াম খোলার পরেই খাঁটি মাখনের মিষ্টি গন্ধ পেয়েছি। আর কাজু ও কাঠ বাদামগুলো একদম ফ্রেশ ও ক্রিস্পি! ল্যাব টেস্ট রিপোর্ট থাকায় কোনো দ্বিধা থাকে না।",
    productName: "সাতক্ষীরার গাওয়া ঘি ও প্রিমিয়াম কাজু বাদাম",
    date: "২ দিন আগে",
    verified: true
  },
  {
    id: 2,
    name: "ডা. মাহমুদুর রহমান",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    text: "দেশি খাঁটি গুঁড়া হলুদ, ঝালের গুঁড়া আর ঘানিভাঙা সরিষার তেল নিয়মিত ব্যবহার করছি। বাজারে সিসাযুক্ত হলুদ নিয়ে ভয়ে ছিলাম, কিন্তু আপনাদের ল্যাব টেস্ট রিপোর্ট দেখে পুরোপুরি নিশ্চিন্ত হয়েছি। খাঁটি জিনিস দেওয়ার জন্য ধন্যবাদ।",
    productName: "খাঁটি দেশি হলুদ ও সরিষার তেল",
    date: "৪ দিন আগে",
    verified: true
  },
  {
    id: 3,
    name: "ফাহমিদা আক্তার",
    location: "জিইসি মোড়, চট্টগ্রাম",
    rating: 5,
    text: "কাস্টম গিফট বক্সে সাতক্ষীরার ঘি, খলিশা মধু আর ইরানি পেস্তা বাদাম দিয়ে বাবার জন্য অর্ডার করেছিলাম। প্যাকেজিং অত্যন্ত লাক্সারি ছিল এবং প্রতিটি জিনিস শতভাগ খাঁটি। জাযাকাল্লাহু খাইরান!",
    productName: "কাস্টম সুন্নাহ গিফট বক্স",
    date: "১ সপ্তাহ আগে",
    verified: true
  }
];
