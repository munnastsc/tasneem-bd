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
    price: 1350,
    originalPrice: 1600,
    weight: "৯০০ গ্রাম (কাঁচের জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 420, originalPrice: 500 },
      { label: "৪৫০ গ্রাম", labelEn: "450g", price: 720, originalPrice: 850 },
      { label: "৯০০ গ্রাম (জার)", labelEn: "900g (Jar)", price: 1350, originalPrice: 1600 },
      { label: "২ কেজি (ফ্যামিলি প্যাক)", labelEn: "2kg", price: 2850, originalPrice: 3400 }
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
  // ২৫০ গ্রাম, ৫০০ গ্রাম ও ১ কেজি ভ্যারিয়েন্টসহ
  // ==========================================
  {
    id: 2,
    name: "সুন্দরবনের খাঁটি র' খলিশা ফুলের মধু (সাতক্ষীরা রেঞ্জ)",
    nameEn: "Raw Sundarban Khalisha Honey (Satkhira Range)",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 1150,
    originalPrice: 1400,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 340, originalPrice: 420 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 620, originalPrice: 750 },
      { label: "১ কেজি (জার)", labelEn: "1kg (Jar)", price: 1150, originalPrice: 1400 }
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
    name: "প্রাকৃতিক কুল বরই ফুলের খাঁটি মধু (Jujube Blossom Honey)",
    nameEn: "Pure Natural Jujube / Kul Boroi Flower Honey",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 950,
    originalPrice: 1150,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 290, originalPrice: 360 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 520, originalPrice: 650 },
      { label: "১ কেজি", labelEn: "1kg", price: 950, originalPrice: 1150 }
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
    name: "দিনাজপুরের খাঁটি লিচু ফুলের মধু (Lychee Honey)",
    nameEn: "Pure Dinajpur Lychee Blossom Honey",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 880,
    originalPrice: 1050,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 260, originalPrice: 320 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 480, originalPrice: 580 },
      { label: "১ কেজি", labelEn: "1kg", price: 880, originalPrice: 1050 }
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
    name: "প্রাকৃতিক সরিষা ফুলের খাঁটি মধু (Cream Honey)",
    nameEn: "Pure Mustard Blossom Raw Honey (Natural Cream)",
    category: "honey",
    categoryName: "খাঁটি মধু সম্ভার",
    price: 750,
    originalPrice: 900,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 230, originalPrice: 280 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 420, originalPrice: 500 },
      { label: "১ কেজি", labelEn: "1kg", price: 750, originalPrice: 900 }
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
    price: 950,
    originalPrice: 1150,
    weight: "১ কেজি (জার)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 290, originalPrice: 360 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 520, originalPrice: 650 },
      { label: "১ কেজি", labelEn: "1kg", price: 950, originalPrice: 1150 }
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
  // ৩. খাঁটি মশলা সম্ভার (PURE SPICES COLLECTION)
  // খাঁটি দেশি গুঁড়া হলুদ, শুকনো মরিচ, এলাচ, দারুচিনি ইত্যাদি
  // ==========================================
  {
    id: 30,
    name: "খাঁটি দেশি গুঁড়া হলুদ",
    nameEn: "Pure Deshi Organic Turmeric Powder",
    category: "spices",
    categoryName: "খাঁটি মশলা সম্ভার",
    price: 320,
    originalPrice: 400,
    weight: "৫০০ গ্রাম (ফুড-গ্রেড সিল্ড প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 170, originalPrice: 210 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 320, originalPrice: 400 },
      { label: "১ কেজি", labelEn: "1kg", price: 600, originalPrice: 750 }
    ],
    rating: 5.0,
    reviewsCount: 198,
    image: "/images/turmeric_powder.jpg",
    badge: "১০০% সিসা ও রং মুক্ত",
    badgeColor: "gold",
    origin: "দেশি মাঠপর্যায়ের কাঁচা হলুদ",
    isSunnah: false,
    isBestseller: true,
    stock: 35,
    hadith: "খাঁটি আহার সুস্বাস্থ্যের চাবিকাঠি।",
    description: "মাঠপর্যায়ে সরাসরি সংগৃহীত আঁশযুক্ত দেশি কাঁচা হলুদ ধুয়ে, রোদে শুকিয়ে পরিচ্ছন্নভাবে ভাঙানো। কোনো টেক্সটাইল রং, সিসা বা ধানের গুঁড়ার ভেজাল নেই। তরকারিতে দেয় প্রাকৃতিক উজ্জ্বল সোনালী রং ও খাঁটি সুঘ্রাণ।",
    descriptionEn: "Stone-ground pure deshi turmeric sourced directly from farmers. Tested 100% free of lead chromate and artificial yellow dyes.",
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
    name: "খাঁটি দেশি লাল মরিচ গুঁড়া (ভেজালমুক্ত)",
    nameEn: "Pure Sun-Dried Red Chili Powder",
    category: "spices",
    categoryName: "খাঁটি মশলা সম্ভার",
    price: 350,
    originalPrice: 440,
    weight: "৫০০ গ্রাম (ফুড-প্যাক)",
    variants: [
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 190, originalPrice: 240 },
      { label: "৫০০ গ্রাম", labelEn: "500g", price: 350, originalPrice: 440 },
      { label: "১ কেজি", labelEn: "1kg", price: 680, originalPrice: 850 }
    ],
    rating: 4.9,
    reviewsCount: 172,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    badge: "গাঢ় লাল ও তীব্র ঝাঁঝ",
    badgeColor: "emerald",
    origin: "বগুড়ার ঝাল মরিচ খেত",
    isSunnah: false,
    isBestseller: true,
    stock: 28,
    hadith: "খাবারে ভেজাল দেওয়া থেকে কঠোরভাবে বিরত থাকো।",
    description: "বগুড়ার ঝাল মরিচ বোঁটা বেছে, রোদে শুকিয়ে নিজস্ব তত্ত্বাবধানে ভাঙানো। কোনো কৃত্রিম লাল রং বা ইটের গুঁড়া মেশানো হয় না। রান্নায় দেয় আসল দেশি ঝাঁঝ ও স্বাদ।",
    descriptionEn: "Authentic sun-dried hot chili powder ground from handpicked chilis with zero synthetic red coloring.",
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
    id: 32,
    name: "গুয়াতেমালা প্রিমিয়াম সবুজ এলাচ (Jumbo Green Cardamom)",
    nameEn: "Guatemala Jumbo Green Cardamom (8mm Bold)",
    category: "spices",
    categoryName: "খাঁটি মশলা সম্ভার",
    price: 480,
    originalPrice: 600,
    weight: "১০০ গ্রাম (কাঁচের জার)",
    variants: [
      { label: "১০০ গ্রাম", labelEn: "100g", price: 480, originalPrice: 600 },
      { label: "২৫০ গ্রাম", labelEn: "250g", price: 1150, originalPrice: 1450 }
    ],
    rating: 5.0,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    badge: "৮ মিমি বোল্ড দানা",
    badgeColor: "gold",
    origin: "গুয়াতেমালা (সরাসরি আমদানিকৃত)",
    isSunnah: false,
    isBestseller: true,
    stock: 20,
    hadith: "সুস্বাদু ও সুবাসিত মশলা খাবারের তৃপ্তি বাড়ায়।",
    description: "গুয়াতেমালার সেরা ৮ মিমি বড় সাইজের গাঢ় সবুজ এলাচ। ভেতরে কালো তৈলাক্ত দানায় ভরপুর। একটি এলাচেই পুরো ঘরের পায়েস বা বিরিয়ানি সুবাসে ভরে উঠবে।",
    descriptionEn: "Jumbo 8mm bold green cardamom pods packed with oily aromatic dark seeds.",
    labReport: {
      labName: "স্পাইস বোর্ড কোয়ালিটি সনদ",
      testId: "SBC-CARD-2026",
      moisture: "আদর্শ প্রিমিয়াম মান",
      purityScore: "গ্রেড-১ জাম্বো এলাচ",
      status: "কোনো ক্যামিকেল ওয়াশ বা কৃত্রিম রং নেই"
    },
    benefits: [
      "মুখের দুর্গন্ধ দূর করে ও হজমে সাহায্য করে",
      "রক্তচাপ স্বাভাবিক রাখতে সহায়তা করে",
      "পোলাও, সেমাই ও মিষ্টি খাবারের অতুলনীয় সুবাস"
    ],
    benefitsEn: [
      "Freshens breath and aids gastric digestive enzymes",
      "Supreme aromatic essential oils in every pod",
      "Grade-A export quality"
    ]
  },
  {
    id: 33,
    name: "খাঁটি সিলন দারুচিনি (Ceylon True Cinnamon)",
    nameEn: "Original Ceylon Cinnamon Sticks (Thin Layer Bark)",
    category: "spices",
    categoryName: "খাঁটি মশলা সম্ভার",
    price: 380,
    originalPrice: 480,
    weight: "২০০ গ্রাম (এয়ারটাইট প্যাক)",
    variants: [
      { label: "১০০ গ্রাম", labelEn: "100g", price: 210, originalPrice: 260 },
      { label: "২০০ গ্রাম", labelEn: "200g", price: 380, originalPrice: 480 }
    ],
    rating: 4.9,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    badge: "আসল সিলন পাতলা বাকল",
    badgeColor: "emerald",
    origin: "শ্রীলঙ্কা (আসল সিলন দারুচিনি)",
    isSunnah: false,
    isBestseller: false,
    stock: 22,
    hadith: "প্রাকৃতিক ভেষজ মশলা মানবদেহের সুরক্ষক।",
    description: "শ্রীলঙ্কার আসল সিলন দারুচিনি। চায়নিজ মোটা বিষাক্ত ক্যাসিয়া নয়—এটি সিগারের মতো পাতলা নরম বহুপল্লার মিষ্টি দারুচিনি। ডায়াবেটিস রোগীদের জন্য সম্পূর্ণ নিরাপদ।",
    descriptionEn: "True Ceylon cinnamon from Sri Lanka with paper-thin layers and ultra-low coumarin.",
    labReport: {
      labName: "সায়েন্স ল্যাব অর্গানিক উইং",
      testId: "BCSIR-CIN-2026",
      moisture: "প্রাকৃতিক আর্দ্রতা",
      purityScore: "১০০% আসল সিলন",
      status: "কমুমারিন টক্সিন মুক্ত প্রমাণিত"
    },
    benefits: [
      "রক্তে সুগারের মাত্রা নিয়ন্ত্রণে রাখতে সাহায্য করে",
      "খারাপ কোলেস্টেরল কমায় ও হার্ট সুরক্ষিত রাখে",
      "চায়নিজ ক্যাসিয়ার মতো লিভারের কোনো ক্ষতি করে না"
    ],
    benefitsEn: [
      "Helps regulate insulin sensitivity safely",
      "Low coumarin protects liver health",
      "Delicate sweet herbal flavor"
    ]
  },

  // ==========================================
  // ৪. সিলেটের চা ও সুগন্ধি পাতা (SYLHET TEA & AROMATICS)
  // শ্রীমঙ্গলের কুঁড়ি চা পাতা, সিলেটের তেজপাতা ও সাতকড়া
  // ==========================================
  {
    id: 40,
    name: "শ্রীমঙ্গলের প্রিমিয়াম ক্লোন কুঁড়ি চা (Sylhet First Flush)",
    nameEn: "Sreemangal Premium First Flush Clone Leaf Tea",
    category: "sylhet_tea",
    categoryName: "সিলেটের চা ও সুগন্ধি পাতা",
    price: 380,
    originalPrice: 480,
    weight: "৪০০ গ্রাম (ফয়েল এয়ারটাইট প্যাক)",
    variants: [
      { label: "২০০ গ্রাম", labelEn: "200g", price: 210, originalPrice: 260 },
      { label: "৪০০ গ্রাম", labelEn: "400g", price: 380, originalPrice: 480 },
      { label: "১ কেজি মেগা প্যাক", labelEn: "1kg", price: 880, originalPrice: 1100 }
    ],
    rating: 5.0,
    reviewsCount: 310,
    image: "/images/sreemangal_tea.jpg",
    badge: "শ্রীমঙ্গলের প্রথম কুঁড়ি",
    badgeColor: "gold",
    origin: "শ্রীমঙ্গল, মৌলভীবাজার, সিলেট",
    isSunnah: false,
    isBestseller: true,
    stock: 45,
    hadith: "অতিথিদের সুস্বাদু পানীয় দ্বারা আপ্যায়ন করো।",
    description: "চা-এর রাজধানী শ্রীমঙ্গলের সেরা বাগান থেকে বাছাই করা দুটি পাতা একটি কুঁড়ির সিলেকশন বিওপি চা। কড়া লালচে সোনালী লিকার, মোহনীয় সুবাস এবং মুখে চমৎকার ফ্রেশনেস। দুধ চা বা র চা উভয়ের জন্যই সেরা।",
    descriptionEn: "Top-grade CTC and orthodox leaf tea harvested from the lush rain-washed hilltops of Sreemangal, Sylhet.",
    labReport: {
      labName: "বাংলাদেশ চা গবেষণা ইনস্টিটিউট (BTRI)",
      testId: "BTRI-TEA-2026",
      moisture: "৬.৫% (নিখুঁত ড্রায়ার মান)",
      purityScore: "১০০% শ্রীমঙ্গল ক্লোন চা",
      status: "কোনো কৃত্রিম কালার বা পুরাতন পাতার ডাস্ট নেই"
    },
    benefits: [
      "মস্তিষ্কের ক্লান্তি দূর করে তাৎক্ষণিক সতেজতা দেয়",
      "উচ্চ পলিফেনল সমৃদ্ধ ভালো অ্যান্টিঅক্সিডেন্ট",
      "কড়া লিকার ও মনকাড়া চা-বাগানের আদিম সুবাস"
    ],
    benefitsEn: [
      "Rich brisk golden liquor with robust aroma",
      "Abundant catechins and antioxidants",
      "Authentic artisanal Sreemangal tea garden profile"
    ]
  },
  {
    id: 41,
    name: "সিলেটের অর্গানিক সুগন্ধি তেজপাতা (Kurei Pata)",
    nameEn: "Sylhet Authentic Organic Fragrant Bay Leaves",
    category: "sylhet_tea",
    categoryName: "সিলেটের চা ও সুগন্ধি পাতা",
    price: 160,
    originalPrice: 220,
    weight: "২০০ গ্রাম (প্যাক)",
    variants: [
      { label: "১০০ গ্রাম", labelEn: "100g", price: 90, originalPrice: 120 },
      { label: "২০০ গ্রাম", labelEn: "200g", price: 160, originalPrice: 220 }
    ],
    rating: 4.9,
    reviewsCount: 140,
    image: "/images/sylhet_bay_leaf.jpg",
    badge: "সিলেটের পাহাড়ি সুগন্ধি",
    badgeColor: "emerald",
    origin: "জৈন্তাপুর ও তামাবিল পাহাড়, সিলেট",
    isSunnah: false,
    isBestseller: false,
    stock: 30,
    hadith: "প্রকৃতির খাঁটি ফলমূল ও পাতার মাঝে শেফা রয়েছে।",
    description: "সিলেটের জৈন্তাপুর ও তামাবিলের পাহাড়ি ঢালে প্রাকৃতিকভাবে জন্ম নেওয়া তেলতেলে সুগন্ধি তেজপাতা (কুড়েই পাতা)। একটু ছিঁড়লেই তীব্র মিষ্টি সুবাস ছড়িয়ে পড়ে। বিরিয়ানি ও মাংসে অতুলনীয় ঘ্রাণ দেয়।",
    descriptionEn: "Wild harvested aromatic mountain bay leaves from the foothills of Sylhet.",
    labReport: {
      labName: "সায়েন্স ল্যাব বোটানিক্যাল শাখা",
      testId: "BCSIR-BAY-2026",
      moisture: "প্রাকৃতিক শুকানো",
      purityScore: "১০০% অর্গানিক পাহাড়ি পাতা",
      status: "কীটনাশকমুক্ত ও ফ্রেশ"
    },
    benefits: [
      "হজমশক্তি বৃদ্ধি করে ও গ্যাসের সমস্যা দূর করে",
      "রান্নায় অভিজাত রাজকীয় সুবাস তৈরি করে",
      "কোনো কৃত্রিম কেমিক্যাল ছাড়া পাহাড়ি তাজা পাতা"
    ],
    benefitsEn: [
      "Intensely aromatic essential bay oils",
      "Aids gut motility and digestion",
      "Unmatched fragrant note for biryani and curries"
    ]
  },

  // ==========================================
  // ৫. আতর ও পারফিউম (ATTAR & PERFUMES)
  // ==========================================
  {
    id: 6,
    name: "রয়েল মদিনা আতর - 'উদ আল কা'বা'",
    nameEn: "Royal Oud Al Kaaba - 100% Non-Alcoholic Concentrated Attar",
    category: "attar",
    categoryName: "আতর ও পারফিউম",
    price: 980,
    originalPrice: 1250,
    weight: "১২ মিলি (ক্রিস্টাল কাঁচের বোতল)",
    variants: [
      { label: "৬ মিলি পকেট সাইজ", labelEn: "6ml Pocket", price: 550, originalPrice: 700 },
      { label: "১২ মিলি ক্রিস্টাল জার", labelEn: "12ml Crystal", price: 980, originalPrice: 1250 }
    ],
    rating: 5.0,
    reviewsCount: 340,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    badge: "শতভাগ অ্যালকোহলমুক্ত",
    badgeColor: "gold",
    origin: "পবিত্র মদিনা ও দুবাই (ইউএই)",
    isSunnah: true,
    isBestseller: true,
    stock: 15,
    hadith: "সুগন্ধি গ্রহণ করো; কারণ এটি আত্মাকে প্রফুল্ল করে এবং এতে কোনো অপছন্দনীয় গন্ধ থাকে না। (তিরমিযি)",
    description: "পবিত্র কাবার গিলাফের মোহনীয় সুবাসের আদলে তৈরি রাজকীয় ও গভীর উদের স্নিগ্ধ সুবাস। কাপড়ে একবার মাখলে ২-৩ দিন স্থায়ী সুবাস ছড়ায়। শতভাগ অ্যালকোহল ও সিন্থেটিক কেমিক্যালমুক্ত।",
    descriptionEn: "Majestic concentrated perfume oil inspired by the Kiswah of the Holy Kaaba. Long-lasting, alcohol-free projection.",
    labReport: {
      labName: "ইন্টারন্যাশনাল ফ্র্যাগরেন্স স্ট্যান্ডার্ড কমপ্লায়েন্ট",
      testId: "IFRA-OUD-2026-772",
      moisture: "১০০% প্রিমিয়াম সুবাস তেল",
      purityScore: "জিরো অ্যালকোহল প্রমাণিত",
      status: "স্কিন ফ্রেন্ডলি ও দীর্ঘস্থায়ী"
    },
    benefits: [
      "নামাজ ও ইবাদতে মনঃসংযোগ ও আত্মিক প্রশান্তি আনে",
      "দীর্ঘস্থায়ী সুবাস (কাপড়ে ২ দিন পর্যন্ত থাকে)",
      "মাথা ভার বা অস্বস্তি করে না"
    ],
    benefitsEn: [
      "Enhances spiritual focus and serenity in Salah",
      "Stays vibrant on clothing for up to 48 hours",
      "Skin-safe, headache-free pure essential oil"
    ]
  },
  {
    id: 14,
    name: "সিলভার হোয়াইট মাস্ক আতর (Silver White Musk)",
    nameEn: "Premium Silver White Musk - Pure Concentrated Perfume Oil",
    category: "attar",
    categoryName: "আতর ও পারফিউম",
    price: 650,
    originalPrice: 850,
    weight: "৬ মিলি (রয়েল কাঠের বক্সসহ)",
    variants: [
      { label: "৬ মিলি", labelEn: "6ml", price: 650, originalPrice: 850 },
      { label: "১২ মিলি", labelEn: "12ml", price: 1150, originalPrice: 1500 }
    ],
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80",
    badge: "স্নিগ্ধ ও মিষ্টি কস্তুরী সুবাস",
    badgeColor: "emerald",
    origin: "পবিত্র মদিনা ও মধ্যপ্রাচ্য",
    isSunnah: true,
    isBestseller: true,
    stock: 20,
    hadith: "কস্তুরী হলো সর্বোত্তম সুগন্ধি। (সহিহ মুসলিম)",
    description: "নরম, মিষ্টি ও স্নিগ্ধ হোয়াইট মাস্ক। গরমের দিনে শরীরকে সারাদিন সতেজ ও সুরভিত রাখে। কোনো ঝাঁঝালো গন্ধ নেই, চারপাশের সবাইকে মুগ্ধ করবে।",
    descriptionEn: "Velvety, clean, and celestial white musk attar. Alcohol-free soothing aura that lasts all day.",
    labReport: {
      labName: "IFRA সার্টিফাইড ল্যাব",
      testId: "IFRA-WM-2026",
      moisture: "১০০% পারফিউম অয়েল",
      purityScore: "স্কিন ফ্রেন্ডলি জিরো অ্যালকোহল",
      status: "অ্যালার্জি-মুক্ত ও কাপড়ে দাগহীন"
    },
    benefits: [
      "গরমে শরীর সারাদিন ফ্রেশ ও সুবাসিত রাখে",
      "কাপড়ে কোনো তেলতেলে দাগ ফেলে না",
      "দৈনন্দিন ব্যবহার ও জুমার দিনের জন্য সেরা"
    ],
    benefitsEn: [
      "Fresh crisp musk note ideal for warm weather",
      "Leaves zero stains on white thobes and panjabis",
      "Calming and universally pleasing scent profile"
    ]
  },
  {
    id: 15,
    name: "আমির আল উদ প্রিমিয়াম পারফিউম (Ameer Al Oudh)",
    nameEn: "Ameer Al Oudh Luxury Eau De Parfum (Alcohol-Free Halal)",
    category: "attar",
    categoryName: "আতর ও পারফিউম",
    price: 1250,
    originalPrice: 1600,
    weight: "৫০ মিলি (লাক্সারি গোল্ডেন স্প্রে)",
    variants: [
      { label: "৫০ মিলি স্প্রে বোতল", labelEn: "50ml Spray", price: 1250, originalPrice: 1600 }
    ],
    rating: 5.0,
    reviewsCount: 182,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    badge: "রাজকীয় অ্যারাবিয়ান স্প্রে",
    badgeColor: "gold",
    origin: "দুবাই, সংযুক্ত আরব আমিরাত",
    isSunnah: true,
    isBestseller: false,
    stock: 14,
    hadith: "উত্তম সুবাস ব্যক্তিত্বের শোভা বৃদ্ধি করে।",
    description: "কম্বোডিয়ান উদ, ভ্যানিলা, ক্যারামেল ও অ্যাম্বারের এক অপূর্ব মেলবন্ধন। অভিজাত বিয়ের অনুষ্ঠান, জুমা বা বিশেষ মেহমানদারির জন্য সেরা রাজকীয় পারফিউম।",
    descriptionEn: "Rich Arabian luxury scent blending aged Cambodian agarwood with amber, sugar and vanilla.",
    labReport: {
      labName: "ইউরোপিয়ান কসমেটিকস স্ট্যান্ডার্ড",
      testId: "EU-FRG-2026",
      moisture: "হালাল স্প্রে ফর্মুলেশন",
      purityScore: "১০০% হালাল উপাদান",
      status: "দীর্ঘস্থায়ী প্রজেকশন সার্টিফাইড"
    },
    benefits: [
      "৮ থেকে ১২ ঘণ্টা পর্যন্ত আকর্ষণীয় সুবাস ছড়ায়",
      "যেকোনো প্রিমিয়াম গিফটের জন্য দারুণ আকর্ষণীয়",
      "অ্যারাবিয়ান লাক্সারি লাইফস্টাইলের অনুভূতি"
    ],
    benefitsEn: [
      "Impressive 12+ hour scent projection",
      "Exquisite royal packaging ideal for gifting",
      "Captivating oriental amber and agarwood accords"
    ]
  },

  // ==========================================
  // ৬. প্রিমিয়াম খেজুর ও ড্রাই ফ্রুটস (DATES)
  // ==========================================
  {
    id: 3,
    name: "আজওয়া ভিআইপি খেজুর",
    nameEn: "VIP Ajwa Dates (Jumbo Grade)",
    category: "dates",
    categoryName: "প্রিমিয়াম খেজুর",
    price: 1450,
    originalPrice: 1750,
    weight: "৮০০ গ্রাম (এয়ারটাইট গিফট প্যাক)",
    variants: [
      { label: "৪০০ গ্রাম", labelEn: "400g", price: 780, originalPrice: 950 },
      { label: "৮০০ গ্রাম (বক্স)", labelEn: "800g (Box)", price: 1450, originalPrice: 1750 },
      { label: "২ কেজি (কার্টন)", labelEn: "2kg (Carton)", price: 3400, originalPrice: 4200 }
    ],
    rating: 5.0,
    reviewsCount: 412,
    image: "/images/ajwa_vip_dates.jpg",
    badge: "সুন্নাহ স্পেশাল",
    badgeColor: "emerald",
    origin: "পবিত্র মদিনা মুনাওয়ারাহ, সৌদি আরব",
    isSunnah: true,
    isBestseller: true,
    stock: 35,
    hadith: "যে ব্যক্তি প্রতিদিন সকালে সাতটি আজওয়া খেজুর খাবে, সেদিন কোনো বিষ বা জাদু তার ক্ষতি করতে পারবে না। (সহিহ বুখারি)",
    description: "সৌদি আরবের বাগান থেকে সরাসরি আমদানিকৃত এ-গ্রেড বড় সাইজের নরম ও কালো আজওয়া খেজুর। প্রাকৃতিক আয়রন ও ফাইবারে সমৃদ্ধ।",
    descriptionEn: "Authentic Jumbo A-Grade Ajwa dates imported directly from Saudi Arabia.",
    labReport: {
      labName: "সৌদি ফুড অ্যান্ড ড্রাগ কোয়ালিটি সার্টিফাইড",
      testId: "SFDA-AJW-2026-108",
      moisture: "প্রাকৃতিক আর্দ্রতা বজায় রাখা",
      purityScore: "১০০% অরজিনাল আজওয়া",
      status: "কোনো প্রিজারভেটিভ বা তেল পলিশ নেই"
    },
    benefits: [
      "হৃদযন্ত্র সুস্থ রাখে ও রক্তচাপ নিয়ন্ত্রণে সহায়ক",
      "রক্তস্বল্পতা দূর করে ও প্রচুর প্রাকৃতিক আয়রন যোগায়",
      "গর্ভবতী মা ও শিশুদের আদর্শ পুষ্টিকর খাবার"
    ],
    benefitsEn: [
      "Protects cardiovascular system and manages blood pressure",
      "Rich in organic iron, combats anemia",
      "Essential superfood for mothers and children"
    ]
  },
  {
    id: 17,
    name: "সৌদি প্রিমিয়াম সুক্কারি নরম খেজুর (Sukkari Dates)",
    nameEn: "Royal Saudi Golden Sukkari Dates (Rutab / Soft)",
    category: "dates",
    categoryName: "প্রিমিয়াম খেজুর",
    price: 680,
    originalPrice: 850,
    weight: "৮০০ গ্রাম (ফুড-বক্স)",
    variants: [
      { label: "৮০০ গ্রাম", labelEn: "800g", price: 680, originalPrice: 850 },
      { label: "২ কেজি কার্টন", labelEn: "2kg", price: 1600, originalPrice: 2000 }
    ],
    rating: 4.9,
    reviewsCount: 270,
    image: "/images/golden_sukkari_dates.jpg",
    badge: "মুখের ভেতর গলে যায়",
    badgeColor: "gold",
    origin: "আল-কাসিম, সৌদি আরব",
    isSunnah: true,
    isBestseller: true,
    stock: 30,
    hadith: "খেজুর দিয়ে রোজা ভাঙা বরকতপূর্ণ।",
    description: "সৌদি আল-কাসিমের সুপরিচিত সুক্কারি খেজুর। হালকা সোনালী রং, মুখে দিলে মিষ্টি মধুর মতো গলে যায়। বয়োজ্যেষ্ঠ ও শিশুদের অত্যন্ত প্রিয়।",
    descriptionEn: "Mouth-melting golden soft Sukkari dates from Al-Qassim, Saudi Arabia.",
    labReport: {
      labName: "সৌদি এসএফডিএ মান সনদ",
      testId: "SFDA-SUK-2026",
      moisture: "প্রাকৃতিক ক্যারামেল আর্দ্রতা",
      purityScore: "১০০% তাজা খেজুর",
      status: "কোনো চিনি বা সিরাপ নেই"
    },
    benefits: [
      "শরীরে তাৎক্ষণিক এনার্জি সরবরাহ করে",
      "প্রাকৃতিক ক্যালসিয়াম ও পটাশিয়ামের সেরা উৎস",
      "চিনির নিরাপদ ও প্রাকৃতিক বিকল্প"
    ],
    benefitsEn: [
      "Instant natural glucose replenishment",
      "Gentle on sensitive teeth and digestion",
      "Packed with dietary potassium and magnesium"
    ]
  },

  // ==========================================
  // ৭. সুন্নতি খাদ্য ও তেল (SUNNAH OILS & SUPERFOOD)
  // ==========================================
  {
    id: 4,
    name: "কাঠের ঘানিভাঙা খাঁটি সরিষার তেল",
    nameEn: "Cold Wood-Pressed Mustard Oil",
    category: "sunnah_oil",
    categoryName: "সুন্নতি খাদ্য ও তেল",
    price: 360,
    originalPrice: 420,
    weight: "১ লিটার (বোতল)",
    variants: [
      { label: "১ লিটার", labelEn: "1 Litre", price: 360, originalPrice: 420 },
      { label: "২ লিটার", labelEn: "2 Litres", price: 700, originalPrice: 820 },
      { label: "৫ লিটার (পারিবারিক ক্যান)", labelEn: "5 Litres", price: 1700, originalPrice: 2000 }
    ],
    rating: 4.8,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    badge: "তীব্র প্রাকৃতিক ঝাঁঝ",
    badgeColor: "gold",
    origin: "দেশি কাঠের ঘানি, পাবনা",
    isSunnah: false,
    isBestseller: false,
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
  {
    id: 18,
    name: "কোল্ড প্রেসড প্রিমিয়াম কালোজিরা তেল",
    nameEn: "Cold-Pressed Pure Black Seed Oil (Nigella Sativa)",
    category: "sunnah_oil",
    categoryName: "সুন্নতি খাদ্য ও তেল",
    price: 450,
    originalPrice: 550,
    weight: "২০০ মিলি (অ্যাম্বার বোতল)",
    variants: [
      { label: "১০০ মিলি", labelEn: "100ml", price: 260, originalPrice: 320 },
      { label: "২০০ মিলি", labelEn: "200ml", price: 450, originalPrice: 550 }
    ],
    rating: 5.0,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    badge: "মৃত্যু ছাড়া সব রোগের শেফা",
    badgeColor: "emerald",
    origin: "কোল্ড-প্রেসড ভার্জিন, বাংলাদেশ",
    isSunnah: true,
    isBestseller: true,
    stock: 28,
    hadith: "তোমরা অবশ্যই কালোজিরা ব্যবহার করবে; কারণ এতে মৃত্যু ছাড়া সকল রোগের নিরাময় রয়েছে। (সহিহ বুখারি)",
    description: "নির্বাচিত কালোজিরা বীজ থেকে কোল্ড-প্রেস প্রক্রিয়ায় নিষ্কাশিত শতভাগ খাঁটি ও কাঁচা তেল। ড্রপারে করে হালকা গরম পানি বা মধুর সাথে সহজে সেবনযোগ্য।",
    descriptionEn: "Virgin cold-pressed virgin black seed oil packed in amber medicinal glass bottle.",
    labReport: {
      labName: "বিসিএসআইআর হারবাল শাখা",
      testId: "BCSIR-BSO-2026",
      moisture: "১০০% পিউর তেল",
      purityScore: "উচ্চ থাইমোকুইনোন (TQ) সমৃদ্ধ",
      status: "ফার্মাসিউটিক্যাল গ্রেড মানসম্মত"
    },
    benefits: [
      "রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি করে",
      "ব্লাড প্রেশার ও কোলেস্টেরল নিয়ন্ত্রণে সাহায্য করে",
      "চুল পড়া বন্ধ ও ত্বকের উজ্জ্বলতা বাড়ায়"
    ],
    benefitsEn: [
      "Potent natural immuno-modulator",
      "Regulates blood lipids and sugar balance",
      "Promotes thicker hair and youthful skin"
    ]
  },

  // ==========================================
  // ৮. ইসলামিক লাইফস্টাইল ও প্রেয়ার (LIFESTYLE)
  // ==========================================
  {
    id: 7,
    name: "তুর্কি মেমরি-ফোম লাক্সারি অর্থোপেডিক জায়নামাজ",
    nameEn: "Luxury Turkish Memory Foam Orthopedic Prayer Mat",
    category: "lifestyle",
    categoryName: "ইসলামিক লাইফস্টাইল",
    price: 1850,
    originalPrice: 2200,
    weight: "১ পিস (লাক্সারি গিফট ব্যাগসহ)",
    variants: [
      { label: "স্ট্যান্ডার্ড সাইজ", labelEn: "Standard", price: 1850, originalPrice: 2200 }
    ],
    rating: 4.9,
    reviewsCount: 167,
    image: "/images/turkish_prayer_mat.jpg",
    badge: "হাঁটু ও জয়েন্ট ব্যথামুক্ত",
    badgeColor: "emerald",
    origin: "ইস্তাম্বুল, তুরস্ক",
    isSunnah: true,
    isBestseller: false,
    stock: 12,
    hadith: "নামাজ মুমিনের মেরাজ এবং চোখের শীতলতা।",
    description: "উচ্চমানের তুর্কি ভেলভেট ও ভেতরে ২৫ মিলিমিটার পুরু মেমোরি ফোম প্রযুক্তিতে তৈরি। দীর্ঘ সিজদা বা রুকুতে হাঁটু ও গোড়ালিতে কোনো চাপ লাগে না। তলায় অ্যান্টি-স্লিপ গ্রিপ থাকায় মেঝেতে পিছলে যায় না।",
    descriptionEn: "High-density 25mm orthopedic memory foam crafted with soft Turkish velvet, anti-slip bottom for pain-free prayer posture.",
    labReport: {
      labName: "টেক্সটাইল কোয়ালিটি গ্রেড ১",
      testId: "TR-TXT-2026-901",
      moisture: "এন্টি-স্লিপ গ্রিপ তলদেশ",
      purityScore: "হাই-ডেনসিটি অর্থোপেডিক ফোম",
      status: "টেকসই ও ওয়াশেবল"
    },
    benefits: [
      "হাঁটু ও জয়েন্টের ব্যথা ছাড়াই স্বস্তিদায়ক নামাজ আদায়",
      "মেঝেতে পিছলে যাওয়ার ভয় নেই (অ্যান্টি-স্লিপ বটম)",
      "বয়োজ্যেষ্ঠ বাবা-মা ও প্রিয়জনদের জন্য শ্রেষ্ঠ উপহার"
    ],
    benefitsEn: [
      "Cushions knees and ankles, perfect for elders",
      "Anti-slip backing secures firmly to any floor",
      "Premium Ottoman geometric aesthetic"
    ]
  },
  {
    id: 19,
    name: "প্রাকৃতিক জয়তুন কাঠ মেসওয়াক সেট (Pack of 3)",
    nameEn: "Natural Olive-Wood & Peelu Miswak Fresh Pack",
    category: "lifestyle",
    categoryName: "ইসলামিক লাইফস্টাইল",
    price: 180,
    originalPrice: 240,
    weight: "৩ পিস (ভ্যাকুয়াম সিল্ড প্যাক)",
    variants: [
      { label: "৩ পিসের প্যাক", labelEn: "Pack of 3", price: 180, originalPrice: 240 },
      { label: "৬ পিসের মেগা প্যাক", labelEn: "Pack of 6", price: 340, originalPrice: 450 }
    ],
    rating: 5.0,
    reviewsCount: 190,
    image: "/images/natural_olive_miswak.jpg",
    badge: "সুন্নতি টুথব্রাশ",
    badgeColor: "emerald",
    origin: "পবিত্র মদিনা ও মধ্যপ্রাচ্য",
    isSunnah: true,
    isBestseller: true,
    stock: 45,
    hadith: "মেসওয়াক মুখের পবিত্রতা এবং রবের সন্তুষ্টির মাধ্যম। (নাসায়ি)",
    description: "তাজা ও নরম জয়তুন কাঠের মেসওয়াক। সম্পূর্ণ প্রাকৃতিকভাবে সিল করা, ব্যবহারে কোনো কৃত্রিম পেস্ট বা ব্রাশের প্রয়োজন নেই। মাড়ি ও দাঁতকে রাখে পাথর-শক্ত।",
    descriptionEn: "Fresh natural organic Sewak / Miswak roots harvested from olive trees, vacuum sealed for fresh softness.",
    labReport: {
      labName: "ডেন্টাল অ্যাসোসিয়েশন গাইডলাইন",
      testId: "MISWAK-2026",
      moisture: "প্রাকৃতিক অ্যান্টিব্যাকটেরিয়াল রস",
      purityScore: "১০০% অর্গানিক",
      status: "কেমিক্যালমুক্ত মুখগহ্বর সুরক্ষা"
    },
    benefits: [
      "দাঁতের হলুদ দাগ ও জীবাণু দূর করে প্রাকৃতিকভাবে সাদা করে",
      "মাড়ি দিয়ে রক্ত পড়া বন্ধ করে ও মুখের দুর্গন্ধ দূর করে",
      "প্রতিবার ওযুর সাথে মেসওয়াক করা অপরিসীম সওয়াবের কাজ"
    ],
    benefitsEn: [
      "Natural fluoride and silica gently whiten enamel",
      "Strengthens gums and destroys bacterial tartar",
      "Great spiritual Sunnah with immense blessings"
    ]
  },

  // ==========================================
  // ৯. সাতক্ষীরার বিখ্যাত রসালো আম (SATKHIRA MANGO)
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
    origin: "কলারোয়া ও দেবহাটা, সাতক্ষীরা",
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
  { id: 'b1', name: 'সাতক্ষীরার খাঁটি গাওয়া ঘি (৪৫০ গ্রাম)', price: 720, weight: '৪৫০ গ্রাম' },
  { id: 'b2', name: 'সুন্দরবন সাতক্ষীরা খলিশা মধু (৫০০ গ্রাম)', price: 620, weight: '৫০০ গ্রাম' },
  { id: 'b3', name: 'আজওয়া ভিআইপি খেজুর (৪০০ গ্রাম)', price: 780, weight: '৪০০ গ্রাম' },
  { id: 'b4', name: 'রয়েল উদ আতর (৬ মিলি)', price: 550, weight: '৬ মিলি' },
  { id: 'b5', name: 'শ্রীমঙ্গলের কুঁড়ি চা পাতা (৪০০ গ্রাম)', price: 380, weight: '৪০০ গ্রাম' },
  { id: 'b6', name: 'খাঁটি দেশি গুঁড়া হলুদ (৫০০ গ্রাম)', price: 320, weight: '৫০০ গ্রাম' },
  { id: 'b7', name: 'সাতক্ষীরার হিমসাগর আম (৫ কেজি)', price: 650, weight: '৫ কেজি' }
];

export const faqs = [
  {
    q: "সাতক্ষীরার ঘি ও সুন্দরবনের মধুর সত্যতা যাচাই করব কীভাবে?",
    a: "আমাদের প্রতিটি জারের পেছনে সায়েন্স ল্যাব (BCSIR) ও বিএসটিআই টেস্ট রিপোর্টের কিউআর কোড থাকে। এছাড়াও ডেলিভারির সময় ডেলিভারি ম্যানের সামনেই প্যাকেট খুলে ঘ্রাণ ও স্বাদ পরীক্ষা করে নেওয়ার পূর্ণ স্বাধীনতা রয়েছে। পছন্দ না হলে সাথে সাথে ফেরত দিতে পারবেন—১ টাকাও ডেলিভারি চার্জ দিতে হবে না।"
  },
  {
    q: "সুন্দরবনের কাঁচা মধু কি শীতে বা ফ্রিজে জমে যায়?",
    a: "হ্যাঁ, খাঁটি কাঁচা মধুতে থাকা প্রাকৃতিক গ্লুকোজ ও পোলেনের কারণে তাপমাত্রা কমে গেলে তা জমাট বাঁধতে পারে—এটি কাঁচা মধুর অন্যতম প্রধান বৈজ্ঞানিক প্রমাণ। কোনো হিট-প্রসেসিং ছাড়া সরাসরি সুন্দরবনের সাতক্ষীরা রেঞ্জ থেকে সংগৃহীত হওয়ায় এর সব এনজাইম অক্ষুণ্ণ থাকে।"
  },
  {
    q: "আমাদের হলুদ ও মরিচের গুঁড়ায় কি কোনো কৃত্রিম রং বা সিসা আছে?",
    a: "আলহামদুলিল্লাহ, আমাদের দেশি হলুদ ও বগুড়ার মরিচ সরাসরি মাঠপর্যায়ে কৃষকদের থেকে এনে নিজস্ব তত্ত্বাবধানে রোদে শুকিয়ে ভাঙানো হয়। বিসিএসআইআর টেস্টে এটি ১০০% সিসা ও কৃত্রিম টেক্সটাইল রঞ্জকমুক্ত প্রমাণিত।"
  },
  {
    q: "শ্রীমঙ্গলের চা পাতা ও সিলেটের তেজপাতার বিশেষত্ব কী?",
    a: "চা পাতাটি শ্রীমঙ্গলের ঐতিহ্যবাহী প্রথম ফ্লাশের দুটি পাতা একটি কুঁড়ি দিয়ে তৈরি হওয়ায় অত্যন্ত কড়া লিকার ও মনকাড়া সুবাস পাওয়া যায়। আর পাহাড়ি তেজপাতাটি অত্যন্ত তৈলাক্ত ও মিষ্টি সুবাসযুক্ত।"
  },
  {
    q: "আমাদের আতর ও পারফিউম কি ১০০% অ্যালকোহলমুক্ত ও নামাজের উপযুক্ত?",
    a: "আলহামদুলিল্লাহ, আমাদের প্রতিটি আতর ও সুগন্ধি তেল ১০০% অ্যালকোহল ও সিন্থেটিক কেমিক্যালমুক্ত। এগুলো পবিত্র শরীর ও কাপড়ে ব্যবহার করে নিশ্চিন্তে নামাজ ও ইবাদত আদায় করা যায়।"
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
    title: "শ্রীমঙ্গলের সবুজ পাহাড় থেকে দুটি পাতা একটি কুঁড়ি",
    location: "শ্রীমঙ্গল, মৌলভীবাজার, সিলেট",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    desc: "বৃষ্টিস্নাত শ্রীমঙ্গলের সেরা বাগানের কচি কুঁড়ি পাতা সংগ্রহ করে খাঁটি ক্লোন চা প্রস্তুত করা হয়। কোনো প্রকার কৃত্রিম রং বা পুরাতন ডাস্ট মেশানো হয় না।"
  },
  {
    id: 's5',
    title: "পবিত্র মদিনা ও আল-কাসিম থেকে প্রিমিয়াম এ-গ্রেড খেজুর",
    location: "মদিনা ও আল-কাসিম, সৌদি আরব",
    image: "/images/ajwa_vip_dates.jpg",
    desc: "সৌদি আরবের বাগান থেকে সরাসরি আমদানিকৃত এ-গ্রেড বড় সাইজের নরম ও কালো আজওয়া ও মধু-মিষ্টি সুক্কারি খেজুর। কোনো প্রিজারভেটিভ বা তেল পলিশ নেই।"
  },
  {
    id: 's6',
    title: "মদিনা ও মধ্যপ্রাচ্যের খাঁটি অ্যালকোহলমুক্ত রাজকীয় আতর",
    location: "মদিনা ও দুবাই (সংযুক্ত আরব আমিরাত)",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    desc: "পবিত্র কাবার গিলাফের আদলে তৈরি উদ আল কা'বা ও সিলভার হোয়াইট মাস্ক। শতভাগ অ্যালকোহলমুক্ত দীর্ঘস্থায়ী রাজকীয় সুবাস।"
  }
];

export const reviews = [
  {
    id: 1,
    name: "ইঞ্জি. তারিকুল ইসলাম",
    location: "মিরপুর ডিওএইচএস, ঢাকা",
    rating: 5,
    text: "সাতক্ষীরার গাওয়া ঘি ও বরই ফুলের মধু নিয়েছিলাম। বয়াম খোলার পরেই খাঁটি মাখনের মিষ্টি গন্ধ পেয়েছি। আর শ্রীমঙ্গলের কুঁড়ি চায়ের লিকার সত্যিই অসাধারণ! ল্যাব টেস্ট রিপোর্ট থাকায় কোনো দ্বিধা থাকে না।",
    productName: "সাতক্ষীরার গাওয়া ঘি ও শ্রীমঙ্গলের চা",
    date: "২ দিন আগে",
    verified: true
  },
  {
    id: 2,
    name: "ডা. মাহমুদুর রহমান",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    text: "দেশি খাঁটি গুঁড়া হলুদ আর সুন্দরবনের খলিশা মধু নিয়মিত ব্যবহার করছি। বাজারে সিসাযুক্ত হলুদ নিয়ে ভয়ে ছিলাম, কিন্তু আপনাদের ল্যাব টেস্ট রিপোর্ট দেখে পুরোপুরি নিশ্চিন্ত হয়েছি। খাঁটি জিনিস দেওয়ার জন্য ধন্যবাদ।",
    productName: "খাঁটি দেশি হলুদ ও খলিশা মধু",
    date: "৪ দিন আগে",
    verified: true
  },
  {
    id: 3,
    name: "ফাহমিদা আক্তার",
    location: "জিইসি মোড়, চট্টগ্রাম",
    rating: 5,
    text: "কাস্টম গিফট বক্সে সাতক্ষীরার ঘি, মধু আর উদ আতর দিয়ে বাবার জন্য কাঠের গিফট বক্স অর্ডার করেছিলাম। প্যাকেজিং এতটাই লাক্সারি ছিল যে উনি খুব খুশি হয়েছেন। জাযাকাল্লাহু খাইরান!",
    productName: "কাস্টম সুন্নাহ গিফট বক্স",
    date: "১ সপ্তাহ আগে",
    verified: true
  }
];
