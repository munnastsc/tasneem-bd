import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle,
  Truck,
  RotateCcw,
  Star,
  FileText,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  X,
  Package,
  Heart,
  ChevronRight,
  ChevronDown,
  Gift,
  Award,
  Clock,
  MapPin,
  HelpCircle,
  Copy,
  Eye,
  Home,
  Grid,
  Droplets,
  Menu,
  Mail,
  Loader2
} from 'lucide-react';
import { products, bundleItems, reviews, faqs, sourcingStories } from './data/products';
import AdminPanel from './components/AdminPanel';
import { logVisitorAction, sendHeartbeat } from './utils/visitorTracker';
import { 
  pixelPageView, 
  pixelViewContent, 
  pixelAddToCart, 
  pixelInitiateCheckout, 
  pixelPurchase, 
  pixelContact 
} from './utils/facebookPixel';

export default function App() {
  const [lang, setLang] = useState('bn');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [labModalProduct, setLabModalProduct] = useState(null);
  const [detailModalProduct, setDetailModalProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  
  // Admin Panel state & URL hash listener
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
        setIsCheckoutOpen(false);
      } else {
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Initialize Visitor Tracking & Facebook Pixel PageView + Heartbeat
  useEffect(() => {
    logVisitorAction('হোমপেজ ভিজিট', 'ওয়েবসাইটে প্রবেশ করেছে');
    pixelPageView('Home');

    const heartbeatTimer = setInterval(() => {
      sendHeartbeat(isCheckoutOpen ? 'চেকআউট পেজে আছে' : 'হোমপেজ ব্রাউজ করছে');
    }, 20000);

    return () => clearInterval(heartbeatTimer);
  }, []);

  // Track Checkout Modal Entry & Pixel InitiateCheckout
  useEffect(() => {
    if (isCheckoutOpen) {
      logVisitorAction('চেকআউট পেজে প্রবেশ করেছে', `মোট বিল: ৳${grandTotal}`);
      pixelInitiateCheckout(cart, grandTotal);
    }
  }, [isCheckoutOpen]);

  // Track Product Details View & Pixel ViewContent
  useEffect(() => {
    if (detailModalProduct) {
      logVisitorAction('পণ্য বিস্তারিত দেখছে', detailModalProduct.name);
      pixelViewContent(detailModalProduct);
    }
  }, [detailModalProduct]);

  // Track Lab Report Modal
  useEffect(() => {
    if (labModalProduct) {
      logVisitorAction('ল্যাব রিপোর্ট যাচাই করছে', labModalProduct.name);
    }
  }, [labModalProduct]);
  
  // Main Menu & Mobile Drawer states
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Card-level selected variant state: { [productId]: variantIndex }
  const [cardVariants, setCardVariants] = useState({});

  // Mobile search toggle
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Order Tracking State
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  // FAQ open index state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  
  // Custom Bundle Builder state
  const [selectedBundleIds, setSelectedBundleIds] = useState(['b1', 'b2', 'b4']);
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('dhaka'); // 'dhaka' (60) or 'outside' (120)
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'bkash', 'nagad'
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [recentOrderNotice, setRecentOrderNotice] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Social Proof Toast interval
  useEffect(() => {
    const fakeOrders = [
      { name: 'আসিফ ইকবাল ভাই', city: 'গুলশান, ঢাকা', product: 'সাতক্ষীরার খাঁটি গাওয়া ঘি' },
      { name: 'রাবেয়া সুলতানা আপু', city: 'পাঁচলাইশ, চট্টগ্রাম', product: "সুন্দরবনের সাতক্ষীরা রেঞ্জের র' মধু" },
      { name: 'মুহাম্মদ তাওহীদ ভাই', city: 'উত্তরা, ঢাকা', product: 'রয়েল উদ আল কা\'বা আতর' },
      { name: 'সালমান হোসেন ভাই', city: 'বোয়ালিয়া, রাজশাহী', product: 'আজওয়া ভিআইপি খেজুর ও খাঁটি গাওয়া ঘি' },
      { name: 'ফারজানা হক আপু', city: 'ধানমন্ডি, ঢাকা', product: 'সিলভার হোয়াইট মাস্ক আতর' }
    ];
    let index = 0;
    const interval = setInterval(() => {
      setRecentOrderNotice(fakeOrders[index % fakeOrders.length]);
      index++;
      setTimeout(() => setRecentOrderNotice(null), 5000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWishlist = !showWishlistOnly || wishlist.includes(p.id);
    return matchesCat && matchesSearch && matchesWishlist;
  });

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Cart actions
  const addToCart = (product, variant = null) => {
    const chosenPrice = variant ? variant.price : product.price;
    const chosenWeight = variant ? variant.label : product.weight;
    const cartItemId = `${product.id}-${chosenWeight}`;

    // Track Visitor Action & Facebook Pixel AddToCart
    logVisitorAction('কার্টে পণ্য যোগ করেছে', `${product.name} [${chosenWeight}] (৳${chosenPrice})`);
    pixelAddToCart(product, 1, chosenPrice);

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId && !item.isBundle);
      if (existing) {
        return prev.map(item => item.id === cartItemId && !item.isBundle ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        id: cartItemId,
        productId: product.id,
        product: {
          ...product,
          price: chosenPrice,
          weight: chosenWeight
        },
        qty: 1,
        isBundle: false
      }];
    });
  };

  const directOrder = (product, variant = null) => {
    addToCart(product, variant);
    setIsCheckoutOpen(true);
    logVisitorAction('সরাসরি অর্ডার শুরু করেছে', product.name);
    pixelInitiateCheckout([{ product, qty: 1 }], variant ? variant.price : product.price);
  };

  const updateQty = (id, delta, isBundle = false) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.isBundle === isBundle) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id, isBundle = false) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.isBundle === isBundle)));
  };

  // Bundle calculations
  const bundleChosenItems = bundleItems.filter(i => selectedBundleIds.includes(i.id));
  const rawBundleTotal = bundleChosenItems.reduce((acc, curr) => acc + curr.price, 0);
  const bundleDiscount = Math.round(rawBundleTotal * 0.15); // 15% instant savings
  const bundleFinalPrice = rawBundleTotal - bundleDiscount;

  const toggleBundleItem = (id) => {
    if (selectedBundleIds.includes(id)) {
      if (selectedBundleIds.length <= 1) return;
      setSelectedBundleIds(prev => prev.filter(x => x !== id));
    } else {
      setSelectedBundleIds(prev => [...prev, id]);
    }
  };

  const addCustomBundleToCart = () => {
    const bundleProduct = {
      id: 'custom-bundle-' + Date.now(),
      name: `কাস্টম সুন্নাহ গিফট বক্স (${bundleChosenItems.length} টি প্রিমিয়াম আইটেম)`,
      nameEn: `Custom Sunnah Wooden Gift Box (${bundleChosenItems.length} items)`,
      price: bundleFinalPrice,
      originalPrice: rawBundleTotal,
      weight: 'কাঠের লাক্সারি গিফট বক্সসহ',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    };
    setCart(prev => [...prev, { id: bundleProduct.id, product: bundleProduct, qty: 1, isBundle: true }]);
    setIsCheckoutOpen(true);
  };

  // Cart totals
  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.qty), 0);
  const deliveryCharge = deliveryArea === 'dhaka' ? 60 : 120;
  const grandTotal = subtotal > 0 ? subtotal + deliveryCharge : 0;
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  // Generate WhatsApp Order Message
  const generateWhatsAppMessage = (orderId) => {
    const orderItemsText = cart.map(item => `• ${item.product.name} [${item.product.weight}] (পরিমাণ: ${item.qty} টি, মূল্য: ৳${item.product.price * item.qty})`).join('%0A');
    const paymentDetails = (paymentMethod === 'bkash' || paymentMethod === 'nagad')
      ? `%0A*পেমেন্ট নম্বর:* ${senderNumber}%0A*TrxID:* ${trxId}`
      : '';
    
    return `*নতুন অর্ডার স্লিপ - ${orderId}*%0A` +
      `*খাঁটি সওদা (www.khatisaoda.com)*%0A` +
      `---------------------------------%0A` +
      `*ক্রেতার নাম:* ${customerName}%0A` +
      `*মোবাইল:* ${customerPhone}%0A` +
      (customerEmail ? `*ইমেইল:* ${customerEmail}%0A` : '') +
      `*ঠিকানা:* ${customerAddress}%0A` +
      `*ডেলিভারি এলাকা:* ${deliveryArea === 'dhaka' ? 'ঢাকা সিটি (৳ ৬০)' : 'ঢাকার বাইরে (৳ ১২০)'}%0A` +
      `*পেমেন্ট মাধ্যম:* ${paymentMethod.toUpperCase()}${paymentDetails}%0A%0A` +
      `*অর্ডারকৃত পণ্যসমূহ:*%0A${orderItemsText}%0A%0A` +
      `*পণ্য উপমোট:* ৳${subtotal}%0A` +
      `*ডেলিভারি চার্জ:* ৳${deliveryCharge}%0A` +
      `*সর্বমোট প্রদেয়:* ৳${grandTotal}%0A` +
      `---------------------------------%0A` +
      `দয়া করে অর্ডারটি নিশ্চিত করে পার্সেল বুকিং দিন। ধন্যবাদ!`;
  };

  // Order Submission with Auto WhatsApp Trigger
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন!');
      return;
    }
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId) {
      alert(`দয়া করে আপনার ${paymentMethod === 'bkash' ? 'বিকাশ' : 'নগদ'} ট্রানজেকশন আইডি (TrxID) প্রদান করুন!`);
      return;
    }
    if (cart.length === 0) {
      alert('আপনার শপিং কার্ট খালি!');
      return;
    }

    setIsSubmittingOrder(true);
    const orderId = 'FN-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedOrderId(orderId);

    // Save order in browser storage & Admin Panel database
    try {
      const existingOrders = JSON.parse(localStorage.getItem('khatisaoda_orders') || localStorage.getItem('tuhfashop_orders') || localStorage.getItem('tasneem_orders') || '[]');
      existingOrders.unshift({
        orderId,
        date: new Date().toISOString(),
        customerName,
        customerPhone,
        customerEmail: customerEmail || 'N/A',
        customerAddress,
        deliveryArea,
        paymentMethod,
        items: cart,
        grandTotal,
        status: 'pending'
      });
      localStorage.setItem('khatisaoda_orders', JSON.stringify(existingOrders));
      localStorage.setItem('tuhfashop_orders', JSON.stringify(existingOrders));
      localStorage.setItem('tasneem_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Error saving order', err);
    }

    // 📧 Primary Order Notification via Email to munnastsc@gmail.com
    try {
      const emailPayload = {
        _subject: `🛒 নতুন অর্ডার #${orderId} - খাঁটি সওদা (৳${grandTotal})`,
        _template: "table",
        _captcha: "false",
        "অর্ডার আইডি": orderId,
        "তারিখ ও সময়": new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' }),
        "ক্রেতার নাম": customerName,
        "মোবাইল নম্বর": customerPhone,
        "ইমেইল": customerEmail || 'প্রদান করা হয়নি',
        "পূর্ণ ঠিকানা": customerAddress,
        "ডেলিভারি এলাকা": deliveryArea === 'dhaka' ? 'ঢাকা সিটি (৳৬০)' : 'ঢাকার বাইরে (৳১২০)',
        "পেমেন্ট মাধ্যম": paymentMethod.toUpperCase(),
        "বিকাশ/নগদ নম্বর": (paymentMethod === 'bkash' || paymentMethod === 'nagad') ? (senderNumber || 'N/A') : 'ক্যাশ অন ডেলিভারি',
        "ট্রানজেকশন আইডি (TrxID)": (paymentMethod === 'bkash' || paymentMethod === 'nagad') ? (trxId || 'N/A') : 'প্রযোজ্য নয়',
        "অর্ডারকৃত পণ্যসমূহ": cart.map(i => `${i.product.name} [${i.product.weight}] (x${i.qty}) - ৳${i.product.price * i.qty}`).join(' | '),
        "পণ্য উপমোট": `৳${subtotal}`,
        "ডেলিভারি চার্জ": `৳${deliveryCharge}`,
        "সর্বমোট প্রদেয় বিল": `৳${grandTotal}`
      };

      if (customerEmail && customerEmail.includes('@')) {
        emailPayload._replyto = customerEmail;
      }

      await fetch("https://formsubmit.co/ajax/munnastsc@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });
    } catch (err) {
      console.log('Email dispatch notification log:', err);
    }

    // Confetti celebration
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Track Visitor Action & Facebook Pixel Purchase
    logVisitorAction('অর্ডার সম্পন্ন করেছে', `অর্ডার নং #${orderId} - মোট ৳${grandTotal}`);
    pixelPurchase(orderId, grandTotal, cart);

    setIsSubmittingOrder(false);
    setOrderConfirmed(true);
    // Note: No forced WhatsApp popup! Customer sees the confirmation directly, with WhatsApp as 2nd optional action.
  };

  const sendWhatsAppOrder = () => {
    logVisitorAction('হোয়াটসঅ্যাপে যোগাযোগ করছে', `অর্ডার #${confirmedOrderId}`);
    pixelContact('WhatsApp Order');
    const msg = generateWhatsAppMessage(confirmedOrderId);
    window.open(`https://wa.me/8801714740430?text=${msg}`, '_blank');
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackingInput) return;
    setTrackingResult({
      orderId: trackingInput.startsWith('FN-') ? trackingInput : 'FN-839210',
      status: 'কুরিয়ারে ট্রানজিটে রয়েছে',
      courier: 'Steadfast Courier',
      trackingCode: 'STDF-' + Math.floor(100000 + Math.random() * 900000),
      currentStep: 3,
      eta: 'আগামীকাল বিকালের মধ্যে'
    });
  };

  const copyPaymentNumber = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToCategories = (categoryKey = 'all') => {
    setSelectedCategory(categoryKey);
    setShowWishlistOnly(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Exclusive Fullscreen Admin Portal View
  if (isAdminOpen) {
    return (
      <AdminPanel 
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
          }
        }} 
      />
    );
  }

  return (
    <div className="store-wrapper">
      {/* 1. Top Announcement Marquee */}
      <div className="top-announcement">
        <span>
          <Sparkles size={16} />
          {lang === 'bn' 
            ? 'সাতক্ষীরার খাঁটি গাওয়া ঘি ও হিমসাগর আম, সুন্দরবনের র\' মধু, মদিনার আজওয়া খেজুর, সিলেটের চা ও রয়্যাল আতর | ক্যাশ অন ডেলিভারি!' 
            : 'Satkhira Ghee & Mango, Sundarban Raw Honey, Madinah Dates & Royal Attar | Nationwide Cash on Delivery!'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="tel:+8801714740430" className="top-phone-link">
            <Phone size={13} />
            <span>হটলাইন: 01714-740430</span>
          </a>
        </div>
      </div>

      {/* 2. Header & Luxury Navigation */}
      <header className="header-glass">
        <div className="nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Mobile Hamburger Menu Button */}
            <button 
              className="mobile-hamburger-btn" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>

            <div className="brand-emblem" onClick={() => { setSelectedCategory('all'); setShowWishlistOnly(false); }}>
              <div className="brand-logo-icon">
                <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" />
              </div>
              <div className="brand-text">
                <h1>খাঁটি <span>সওদা</span></h1>
                <p>www.khatisaoda.com | PURE & AUTHENTIC</p>
              </div>
            </div>
          </div>

          {/* Desktop Main Menu Mega Dropdown */}
          <div className="main-menu-dropdown-wrapper">
            <button 
              className={`nav-mainmenu-btn ${isMainMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
            >
              <Grid size={16} />
              <span>সকল ক্যাটাগরি ও উৎস</span>
              <ChevronDown size={14} style={{ transform: isMainMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isMainMenuOpen && (
              <div className="mega-menu-dropdown" onMouseLeave={() => setIsMainMenuOpen(false)}>
                <div className="mega-menu-grid">
                  <div className="mega-menu-column" onClick={() => { scrollToCategories('ghee'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🧈</span>
                      <strong>সাতক্ষীরার খাঁটি ঘি</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: সাতক্ষীরার গ্রাম | শতভাগ খাঁটি দানাদার গাওয়া ঘি (জিরো কেমিক্যাল)</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('mango'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🥭</span>
                      <strong>সাতক্ষীরার রসালো আম</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: কলারোয়া ও দেবহাটা | কেমিক্যাল ও ফরমালিনমুক্ত গাছপাকা হিমসাগর আম</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('honey'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🍯</span>
                      <strong>সুন্দরবন ও খাঁটি মধু</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: সুন্দরবন ও ফুলের খেত | খলিশা, কুল বরই, লিচু, সরিষা ও কালোজিরা মধু</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('attar'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">👑</span>
                      <strong>রয়্যাল আতর ও পারফিউম</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: মদিনা ও দুবাই | কাবার উদ, হোয়াইট মাস্ক, আমির আল উদ (অ্যালকোহলমুক্ত)</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('dates'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🌴</span>
                      <strong>সৌদি প্রিমিয়াম খেজুর</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: মদিনা ও আল-কাসিম | আজওয়া ভিআইপি ও সোনালী সুক্কারি নরম খেজুর</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('sylhet_tea'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🍃</span>
                      <strong>সিলেটের চা ও তেজপাতা</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: শ্রীমঙ্গল ও জৈন্তাপুর পাহাড় | ক্লোন কুঁড়ি চা ও পাহাড়ি সুগন্ধি তেজপাতা</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('spices'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🌶️</span>
                      <strong>খাঁটি মশলা সম্ভার</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: বগুড়া ও মাঠপর্যায় | খাঁটি দেশি গুঁড়া হলুদ, লাল মরিচ, এলাচ ও দারুচিনি</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('sunnah_oil'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🌿</span>
                      <strong>সুন্নতি খাদ্য ও তেল</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: দেশি কাঠের ঘানি | ঘানিভাঙা সরিষার তেল ও কোল্ড প্রেসড কালোজিরা তেল</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>

                  <div className="mega-menu-column" onClick={() => { scrollToCategories('lifestyle'); setIsMainMenuOpen(false); }}>
                    <div className="mega-menu-cat-title">
                      <span className="cat-icon">🕌</span>
                      <strong>ইসলামিক লাইফস্টাইল</strong>
                    </div>
                    <p className="mega-menu-cat-desc">📍 উৎস: তুরস্ক ও মদিনা | তুর্কি মেমরি-ফোম জায়নামাজ ও প্রাকৃতিক জয়তুন কাঠ মেসওয়াক</p>
                    <span className="mega-menu-link">পণ্যগুলো দেখুন →</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-pos" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'আতর, সাতক্ষীরার ঘি, সুন্দরবনের মধু, মশলা, কুঁড়ি চা খুঁজুন...' : 'Search attar, ghee, honey, spices, tea...'}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-actions">
            {/* Dedicated Attar & Perfume Header Menu Button */}
            <button 
              className="nav-icon-btn nav-attar-highlight" 
              onClick={() => scrollToCategories('attar')}
              title="Attar & Perfume Collection"
            >
              <Droplets size={16} />
              <span>আতর সম্ভার</span>
            </button>

            {/* Track Order Button */}
            <button 
              className="nav-icon-btn" 
              onClick={() => setIsTrackingOpen(true)}
              title="Track Order"
            >
              <Truck size={16} />
              <span style={{ display: 'inline' }}>ট্র্যাক</span>
            </button>

            {/* Wishlist Button */}
            <button 
              className="nav-icon-btn" 
              onClick={() => setShowWishlistOnly(prev => !prev)}
              style={showWishlistOnly ? { background: '#ef4444', color: '#fff' } : {}}
              title="Wishlist"
            >
              <Heart size={16} fill={showWishlistOnly || wishlist.length > 0 ? "currentColor" : "none"} />
              <span>{wishlist.length}</span>
            </button>

            {/* Language Switcher */}
            <button 
              className="lang-toggle-btn" 
              onClick={() => setLang(l => l === 'bn' ? 'en' : 'bn')}
              title="Change Language"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>

            {/* Cart Button */}
            <button 
              className="cart-btn-luxury" 
              onClick={() => setIsCheckoutOpen(true)}
            >
              <ShoppingBag size={18} />
              <span>কার্ট</span>
              {totalCartCount > 0 && (
                <span className="cart-badge">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="brand-emblem" onClick={() => { setSelectedCategory('all'); setIsMobileMenuOpen(false); }}>
                <div className="brand-logo-icon">
                  <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" />
                </div>
                <div className="brand-text">
                  <h2 style={{ fontSize: '1.15rem', color: '#064e3b', fontWeight: '800' }}>খাঁটি <span style={{ color: '#d97706' }}>সওদা</span></h2>
                  <p style={{ fontSize: '0.65rem', color: '#64748b' }}>www.khatisaoda.com | মেনু ও ক্যাটাগরি</p>
                </div>
              </div>
              <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Hotline in Drawer */}
            <div className="drawer-hotline-box">
              <Phone size={16} color="#064e3b" />
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>অর্ডার ও পরামর্শ হটলাইন</span>
                <a href="tel:+8801714740430" style={{ display: 'block', fontWeight: '800', color: '#064e3b', fontSize: '0.95rem' }}>
                  01714-740430
                </a>
              </div>
            </div>

            {/* Categories in Drawer */}
            <div className="drawer-categories-list">
              <p className="drawer-section-heading">সকল প্রোডাক্ট ক্যাটাগরি</p>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('all'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">✨</span>
                  <span>সকল পণ্য ({products.length}টি)</span>
                </span>
                <ChevronRight size={16} />
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'honey' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('honey'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🍯</span>
                  <div>
                    <span className="cat-name">সুন্দরবন ও খাঁটি মধু</span>
                    <span className="cat-sub">খলিশা, বরই, লিচু, সরিষা, কালোজিরা (250g-1kg)</span>
                  </div>
                </span>
                <span className="drawer-badge">৫টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'ghee' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('ghee'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🧈</span>
                  <div>
                    <span className="cat-name">সাতক্ষীরার খাঁটি ঘি</span>
                    <span className="cat-sub">সাতক্ষীরার চরের দানাদার গাওয়া ঘি</span>
                  </div>
                </span>
                <span className="drawer-badge">১টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'mango' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('mango'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🥭</span>
                  <div>
                    <span className="cat-name">সাতক্ষীরার রসালো আম</span>
                    <span className="cat-sub">কলারোয়ার কেমিক্যালমুক্ত হিমসাগর আম</span>
                  </div>
                </span>
                <span className="drawer-badge">১টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'spices' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('spices'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🌶️</span>
                  <div>
                    <span className="cat-name">খাঁটি মশলা সম্ভার</span>
                    <span className="cat-sub">বগুড়ার মরিচ ও দেশি হলুদ গুঁড়া</span>
                  </div>
                </span>
                <span className="drawer-badge">৪টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'sylhet_tea' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('sylhet_tea'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🍃</span>
                  <div>
                    <span className="cat-name">সিলেটের চা ও তেজপাতা</span>
                    <span className="cat-sub">শ্রীমঙ্গলের ক্লোন কুঁড়ি চা ও পাহাড়ি তেজপাতা</span>
                  </div>
                </span>
                <span className="drawer-badge">২টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'attar' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('attar'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">👑</span>
                  <div>
                    <span className="cat-name">রয়্যাল আতর ও পারফিউম</span>
                    <span className="cat-sub">মদিনা ও দুবাইয়ের কাবার উদ ও সুবাস</span>
                  </div>
                </span>
                <span className="drawer-badge special">জনপ্রিয়</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'dates' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('dates'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🌴</span>
                  <div>
                    <span className="cat-name">সৌদি প্রিমিয়াম খেজুর</span>
                    <span className="cat-sub">মদিনার আজওয়া ও কাসিমের সুক্কারি</span>
                  </div>
                </span>
                <span className="drawer-badge">২টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'sunnah_oil' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('sunnah_oil'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🌿</span>
                  <div>
                    <span className="cat-name">সুন্নতি খাদ্য ও তেল</span>
                    <span className="cat-sub">ঘানিভাঙা সরিষার তেল ও কালোজিরা তেল</span>
                  </div>
                </span>
                <span className="drawer-badge">২টি</span>
              </button>

              <button 
                className={`drawer-cat-btn ${selectedCategory === 'lifestyle' ? 'active' : ''}`}
                onClick={() => { scrollToCategories('lifestyle'); setIsMobileMenuOpen(false); }}
              >
                <span className="drawer-cat-left">
                  <span className="cat-emoji">🕌</span>
                  <div>
                    <span className="cat-name">ইসলামিক লাইফস্টাইল</span>
                    <span className="cat-sub">অর্থোপেডিক জায়নামাজ ও জয়তুন মেসওয়াক</span>
                  </div>
                </span>
                <span className="drawer-badge">২টি</span>
              </button>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="drawer-footer-actions">
              <a 
                href="https://wa.me/8801714740430?text=আসসালামু%20আলাইকুম,%20সাতক্ষীরার%20ঘি,%20মধু%20বা%20অন্যান্য%20পণ্য%20সম্পর্কে%20জানতে%20চাই।"
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-wa-btn"
              >
                <MessageCircle size={17} />
                <span>হোয়াটসঅ্যাপে সরাসরি চ্যাট</span>
              </a>
              <button 
                className="drawer-track-btn"
                onClick={() => { setIsTrackingOpen(true); setIsMobileMenuOpen(false); }}
              >
                <Truck size={17} />
                <span>অর্ডার ট্র্যাক করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Hero Section */}
      <section className="hero-luxury-wrapper">
        <div className="hero-glass-card">
          <div className="hero-content-grid">
            <div className="hero-left-info">
              <div className="hero-pill-badge">
                <CheckCircle size={15} />
                <span>দেশ ও বিদেশের খাঁটি প্রাকৃতিক খাদ্য, ঐতিহ্য ও সুন্নাহ লাইফস্টাইল</span>
              </div>
              <h2 className="hero-headline">
                খাঁটি ঐতিহ্যবাহী খাদ্য ও <br />
                <span>সুন্নাহর বরকতময় জীবন</span>
              </h2>
              <p className="hero-subtext">
                সাতক্ষীরার খাঁটি গাওয়া ঘি ও বিখ্যাত হিমসাগর আম, সুন্দরবনের র' মধু, সৌদি আরবের আজওয়া খেজুর, সিলেটের শ্রীমঙ্গলের কুঁড়ি চা এবং দুবাই-মদিনার ১০০% অ্যালকোহলমুক্ত রাজকীয় আতর—প্রতিটি পণ্য সরাসরি নিজস্ব আদি উৎস থেকে সংগৃহীত।
              </p>
              <div className="hero-cta-group">
                <button onClick={() => scrollToCategories('all')} className="btn-gold-primary">
                  <ShoppingBag size={18} />
                  <span>এখনই কেনাকাটা করুন</span>
                </button>
                <button onClick={() => scrollToCategories('attar')} className="btn-glass-secondary" style={{ borderColor: '#fbbf24', color: '#fbbf24' }}>
                  <Droplets size={18} />
                  <span>আতর কালেকশন</span>
                </button>
                <a href="#bundle-section" className="btn-glass-secondary">
                  <Gift size={18} />
                  <span>গিফট বক্স বানান</span>
                </a>
              </div>
            </div>

            <div className="hero-image-showcase">
              <div className="hero-main-img-card">
                <img 
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80" 
                  alt="Royal Attar and Pure Food" 
                />
                <div className="hero-floating-badge">
                  <div className="icon-box">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p>ল্যাব সার্টিফাইড ও সুন্নাহ সম্মত</p>
                    <span>১০০% খাঁটি, নিরাপদ ও ভেজালমুক্ত</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Regional Origin Authenticity Highlights */}
      <section className="origin-strip-section">
        <div className="origin-strip-header">
          <h3>
            <MapPin size={20} color="#fbbf24" />
            উৎস ও ঐতিহ্যের নিশ্চয়তা (আমাদের প্রতিটি পণ্যের নিজস্ব জন্মভূমি)
          </h3>
          <p>কোনো একক অঞ্চল নয়—বরং প্রতিটি বিখ্যাত পণ্যের আসল জন্মভূমি থেকে বিশ্বস্ত সংগ্রহের অঙ্গীকার</p>
        </div>
        <div className="origin-strip-grid">
          <div className="origin-chip" onClick={() => scrollToCategories('ghee')}>
            <div className="origin-chip-top">
              <span>🧈</span> সাতক্ষীরা
            </div>
            <div className="origin-chip-desc">খাঁটি গাওয়া ঘি ও বিখ্যাত হিমসাগর আম</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('honey')}>
            <div className="origin-chip-top">
              <span>🍯</span> সুন্দরবন
            </div>
            <div className="origin-chip-desc">সাতক্ষীরা রেঞ্জের গভীর বনের খলিশা ও প্রাকৃতিক মধু</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('dates')}>
            <div className="origin-chip-top">
              <span>🌴</span> সৌদি আরব
            </div>
            <div className="origin-chip-desc">পবিত্র মদিনার আজওয়া ও কাসিমের সুক্কারি খেজুর</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('attar')}>
            <div className="origin-chip-top">
              <span>👑</span> মদিনা ও দুবাই
            </div>
            <div className="origin-chip-desc">১০০% অ্যালকোহলমুক্ত কাবার উদ ও রয়্যাল আতর</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('sylhet_tea')}>
            <div className="origin-chip-top">
              <span>🍃</span> সিলেট ও শ্রীমঙ্গল
            </div>
            <div className="origin-chip-desc">কড়া লিকারের ক্লোন কুঁড়ি চা ও পাহাড়ি সুগন্ধি তেজপাতা</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('spices')}>
            <div className="origin-chip-top">
              <span>🌶️</span> বগুড়া ও মাঠপর্যায়
            </div>
            <div className="origin-chip-desc">খাঁটি দেশি হলুদ গুঁড়া, লাল মরিচ ও সিলন দারুচিনি</div>
          </div>

          <div className="origin-chip" onClick={() => scrollToCategories('lifestyle')}>
            <div className="origin-chip-top">
              <span>🕌</span> তুরস্ক ও মদিনা
            </div>
            <div className="origin-chip-desc">তুর্কি অর্থোপেডিক জায়নামাজ ও জয়তুন মেসওয়াক</div>
          </div>
        </div>
      </section>

      {/* 4. Trust Pillars */}
      <section className="trust-pillars-bar">
        <div className="trust-pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon-box">
              <ShieldCheck size={22} />
            </div>
            <div className="pillar-content">
              <h4>ল্যাব টেস্ট সার্টিফাইড</h4>
              <p>সায়েন্স ল্যাব ও বিএসটিআই টেস্টেড</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <RotateCcw size={22} />
            </div>
            <div className="pillar-content">
              <h4>টেস্ট অ্যান্ড রিটার্ন পলিসি</h4>
              <p>স্বাদ ও ঘ্রাণ চেক করে গ্রহণের সুযোগ</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <Truck size={22} />
            </div>
            <div className="pillar-content">
              <h4>ক্যাশ অন ডেলিভারি</h4>
              <p>২৪-৭২ ঘণ্টায় সারা দেশে হোম ডেলিভারি</p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon-box">
              <Award size={22} />
            </div>
            <div className="pillar-content">
              <h4>শতভাগ ফ্রেশনেস</h4>
              <p>সরাসরি নিজস্ব আদি উৎস থেকে সংগৃহীত</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Category Navigation Filter */}
      <section className="category-nav-section" id="products-section">
        <div className="category-nav-title">
          <h2>
            {showWishlistOnly ? 'আপনার পছন্দের সংরক্ষিত পণ্যসমূহ' : 'আমাদের নির্বাচিত ক্যাটাগরি'}
          </h2>
          <p>
            {showWishlistOnly 
              ? `${filteredProducts.length} টি পণ্য সংরক্ষিত রয়েছে` 
              : 'খাঁটি খাদ্য, প্রাকৃতিক সুবাস ও ইসলামিক লাইফস্টাইলের বিশ্বস্ত সংগ্রহ'}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="category-pills-list">
          <button 
            className={`category-pill-btn ${selectedCategory === 'all' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('all'); setShowWishlistOnly(false); }}
          >
            ✨ সকল পণ্য ({products.length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'ghee' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('ghee'); setShowWishlistOnly(false); }}
          >
            🧈 সাতক্ষীরার খাঁটি ঘি ({products.filter(p => p.category === 'ghee').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'mango' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('mango'); setShowWishlistOnly(false); }}
          >
            🥭 সাতক্ষীরার হিমসাগর আম ({products.filter(p => p.category === 'mango').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'honey' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('honey'); setShowWishlistOnly(false); }}
          >
            🍯 সুন্দরবন ও খাঁটি মধু ({products.filter(p => p.category === 'honey').length})
          </button>

          <button 
            className={`category-pill-btn special-attar ${selectedCategory === 'attar' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('attar'); setShowWishlistOnly(false); }}
          >
            👑 রয়্যাল আতর (মদিনা ও দুবাই) ({products.filter(p => p.category === 'attar').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'dates' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('dates'); setShowWishlistOnly(false); }}
          >
            🌴 সৌদি খেজুর (আজওয়া ও সুক্কারি) ({products.filter(p => p.category === 'dates').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'sylhet_tea' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('sylhet_tea'); setShowWishlistOnly(false); }}
          >
            🍃 সিলেটের চা ও তেজপাতা ({products.filter(p => p.category === 'sylhet_tea').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'spices' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('spices'); setShowWishlistOnly(false); }}
          >
            🌶️ খাঁটি দেশি মশলা ({products.filter(p => p.category === 'spices').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'sunnah_oil' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('sunnah_oil'); setShowWishlistOnly(false); }}
          >
            🌿 সুন্নতি খাদ্য ও তেল ({products.filter(p => p.category === 'sunnah_oil').length})
          </button>

          <button 
            className={`category-pill-btn ${selectedCategory === 'lifestyle' && !showWishlistOnly ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('lifestyle'); setShowWishlistOnly(false); }}
          >
            🕌 ইসলামিক লাইফস্টাইল ({products.filter(p => p.category === 'lifestyle').length})
          </button>
        </div>

        {/* Dynamic Category Highlight Banner */}
        {selectedCategory !== 'all' && !showWishlistOnly && (
          <div className="category-active-banner">
            <div className="cat-banner-content">
              <span className="cat-banner-icon">
                {selectedCategory === 'mango' && '🥭'}
                {selectedCategory === 'honey' && '🍯'}
                {selectedCategory === 'ghee' && '🧈'}
                {selectedCategory === 'spices' && '🌶️'}
                {selectedCategory === 'sylhet_tea' && '🍃'}
                {selectedCategory === 'attar' && '👑'}
                {selectedCategory === 'dates' && '🌴'}
                {selectedCategory === 'sunnah_oil' && '🌿'}
                {selectedCategory === 'lifestyle' && '🕌'}
              </span>
              <div>
                <h3>
                  {selectedCategory === 'mango' && 'সাতক্ষীরার বিখ্যাত কলারোয়ার কেমিক্যালমুক্ত গাছপাকা হিমসাগর আম (উৎস: সাতক্ষীরা)'}
                  {selectedCategory === 'ghee' && 'সাতক্ষীরার খাঁটি ঐতিহ্যবাহী গাওয়া ঘি (উৎস: সাতক্ষীরার গ্রাম)'}
                  {selectedCategory === 'honey' && 'সুন্দরবনের র\' মধু ও প্রাকৃতিক ফুলের মধু কালেকশন (উৎস: সুন্দরবন ও ফুলের খেত)'}
                  {selectedCategory === 'attar' && 'পবিত্র মদিনা ও দুবাইয়ের রয়্যাল আতর সম্ভার (১০০% অ্যালকোহলমুক্ত)'}
                  {selectedCategory === 'dates' && 'সৌদি আরবের আজওয়া ভিআইপি ও সুক্কারি নরম খেজুর (উৎস: মদিনা ও আল-কাসিম)'}
                  {selectedCategory === 'sylhet_tea' && 'সিলেটের শ্রীমঙ্গলের কুঁড়ি চা ও পাহাড়ি সুগন্ধি তেজপাতা (উৎস: সিলেট)'}
                  {selectedCategory === 'spices' && 'খাঁটি মশলা সম্ভার (উৎস: বগুড়া ও মাঠপর্যায়ের খাঁটি দেশি হলুদ)'}
                  {selectedCategory === 'sunnah_oil' && 'সুন্নতি খাদ্য, ঘানিভাঙা সরিষার তেল ও কালোজিরা তেল (উৎস: দেশি ঘানি)'}
                  {selectedCategory === 'lifestyle' && 'ইসলামিক লাইফস্টাইল, তুর্কি জায়নামাজ ও জয়তুন মেসওয়াক (উৎস: তুরস্ক ও মদিনা)'}
                </h3>
                <p>
                  {selectedCategory === 'mango' && 'সাতক্ষীরার সুপ্রসিদ্ধ কলারোয়া ও দেবহাটার প্রাচীন বাগান থেকে সংগৃহীত। কার্বাইড ও ফরমালিনমুক্ত গাছপাকা হিমসাগর—পাতলা খোসা, আঁশহীন রসালো মিষ্টি শাঁস।'}
                  {selectedCategory === 'ghee' && 'সাতক্ষীরার গ্রাম থেকে সংগৃহীত খাঁটি গাভীর দুধ থেকে কাঠের আগুনে জ্বাল দিয়ে তৈরি নিখুঁত সোনালী দানাদার ঘি। জিরো কেমিক্যাল ও কোনো কৃত্রিম গন্ধ বা রঙ নেই।'}
                  {selectedCategory === 'honey' && 'সুন্দরবনের খলিশা, কুল বরই, দিনাজপুরের লিচু, সরিষা ও কালোজিরা ফুলের কাঁচা র\' মধু—২৫০ গ্রাম, ৫০০ গ্রাম ও ১ কেজি সাইজে উপলব্ধ।'}
                  {selectedCategory === 'attar' && 'পবিত্র কাবার আদলে উদ আল কা\'বা, সিলভার হোয়াইট মাস্ক ও লাক্সারি আমির আল উদ—কাপড়ে দীর্ঘস্থায়ী রাজকীয় সুবাস।'}
                  {selectedCategory === 'dates' && 'সৌদি আরবের বাগান থেকে সরাসরি আমদানিকৃত এ-গ্রেড নরম ও সুস্বাদু খেজুর। কোনো প্রিজারভেটিভ বা কেমিক্যাল পলিশ নেই।'}
                  {selectedCategory === 'sylhet_tea' && 'শ্রীমঙ্গলের সেরা বাগানের দুটি পাতা একটি কুঁড়ি এবং সিলেটের পাহাড়ি ঢালে প্রাকৃতিকভাবে জন্ম নেওয়া সুগন্ধি তেজপাতা (কুড়েই পাতা)।'}
                  {selectedCategory === 'spices' && 'মাঠপর্যায়ের কৃষকদের থেকে খাঁটি দেশি হলুদ ও বগুড়ার মরিচ ধুয়ে রোদে শুকিয়ে পরিচ্ছন্নভাবে ভাঙানো। গুয়াতেমালা এলাচ ও আসল সিলন দারুচিনি।'}
                  {selectedCategory === 'sunnah_oil' && 'কাঠের ঘানিতে কোল্ড-প্রেসড সরিষার তেল ও উচ্চ থাইমোকুইনোন সমৃদ্ধ কাঁচা কালোজিরা তেল।'}
                  {selectedCategory === 'lifestyle' && '২৫ মিলিমিটার পুরু অর্থোপেডিক মেমোরি ফোম তুর্কি জায়নামাজ ও ভ্যাকুয়াম সিল্ড জয়তুন কাঠের তাজা মেসওয়াক।'}
                </p>
              </div>
            </div>
            <button 
              className="cat-banner-clear-btn" 
              onClick={() => setSelectedCategory('all')}
            >
              সব পণ্য দেখুন ✕
            </button>
          </div>
        )}
      </section>

      {/* 6. Products Grid (Mobile 2 Columns, Desktop Multi Columns) */}
      <section className="products-grid-section">
        {filteredProducts.map(product => {
          const isFavorited = wishlist.includes(product.id);
          const activeVarIdx = cardVariants[product.id] ?? 0;
          const currentVariant = (product.variants && product.variants.length > 0)
            ? (product.variants[activeVarIdx] || product.variants[0])
            : null;
          const currentPrice = currentVariant ? currentVariant.price : product.price;
          const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
          const currentWeight = currentVariant ? currentVariant.label : product.weight;

          return (
            <div key={product.id} className="product-luxury-card">
              <div 
                className="product-img-box" 
                onClick={() => { setDetailModalProduct(product); setSelectedVariantIndex(activeVarIdx); }}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && (
                  <span className={`product-badge-float ${product.badgeColor || ''}`}>
                    {product.badge}
                  </span>
                )}
                {product.isSunnah && (
                  <span className="sunnah-verified-tag">
                    <Sparkles size={11} />
                    সুন্নাহ
                  </span>
                )}

                {/* Heart Wishlist Trigger */}
                <button 
                  className={`wishlist-heart-btn ${isFavorited ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  title="পছন্দের তালিকায় রাখুন"
                >
                  <Heart size={15} fill={isFavorited ? "#ef4444" : "none"} color={isFavorited ? "#ef4444" : "currentColor"} />
                </button>
              </div>

              <div className="product-card-body">
                <div className="product-category-weight">
                  <span>{product.categoryName}</span>
                  <span className="product-weight-badge">{currentWeight}</span>
                </div>

                {product.origin && (
                  <div className="product-origin-badge">
                    <MapPin size={11} color="#059669" />
                    <span>উৎস: {product.origin}</span>
                  </div>
                )}

                <h3 
                  className="product-title"
                  onClick={() => { setDetailModalProduct(product); setSelectedVariantIndex(activeVarIdx); }}
                >
                  {lang === 'bn' ? product.name : product.nameEn}
                </h3>

                <div className="rating-row">
                  <div className="stars-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span>({product.reviewsCount})</span>
                </div>

                {/* 250g, 500g, 1kg Variant Size Selector Pills */}
                {product.variants && product.variants.length > 0 && (
                  <div className="card-variant-selector">
                    <span className="variant-label-tiny">সাইজ / ওজন বেছে নিন:</span>
                    <div className="variant-pill-group">
                      {product.variants.map((v, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`card-var-pill ${activeVarIdx === idx ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardVariants(prev => ({ ...prev, [product.id]: idx }));
                          }}
                          title={`${v.label} - ৳${v.price}`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.hadith && (
                  <div className="product-hadith-snippet">
                    "{product.hadith}"
                  </div>
                )}

                {/* Lab Test Viewer Button */}
                {product.labReport && (
                  <button 
                    className="lab-test-btn-trigger"
                    onClick={() => setLabModalProduct(product)}
                  >
                    <FileText size={13} />
                    <span>ল্যাব টেস্ট রিপোর্ট</span>
                  </button>
                )}

                <div className="price-cta-row">
                  <div className="price-block">
                    <span className="current-price">৳{currentPrice}</span>
                    {currentOriginalPrice && (
                      <span className="regular-price">৳{currentOriginalPrice}</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      className="btn-add-cart" 
                      title="কার্টে যোগ করুন"
                      onClick={() => addToCart(product, currentVariant)}
                    >
                      <Plus size={16} />
                    </button>
                    <button 
                      className="btn-direct-order"
                      onClick={() => directOrder(product, currentVariant)}
                    >
                      <ShoppingBag size={14} />
                      <span>অর্ডার</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 7. Interactive Custom "Sunnah Gift Box Builder" */}
      <section className="bundle-builder-section" id="bundle-section">
        <div className="bundle-box-container">
          <div className="bundle-header">
            <h3>🎁 কাস্টম সুন্নাহ গিফট বক্স বিল্ডার</h3>
            <p>সাতক্ষীরার খাঁটি গাওয়া ঘি, সুন্দরবনের র' মধু ও রাজকীয় উদ আতর দিয়ে প্রিমিয়াম কাঠের গিফট বক্স সাজান এবং উপভোগ করুন সরাসরি ১৫% ইনস্ট্যান্ট ছাড়!</p>
          </div>

          <div className="bundle-interactive-grid">
            <div>
              <p style={{ color: '#94a3b8', marginBottom: '12px', fontSize: '0.88rem' }}>
                বক্সে যোগ করতে আইটেমে ক্লিক করুন (কমপক্ষে ১টি সিলেক্ট করুন):
              </p>
              <div className="bundle-choices-list">
                {bundleItems.map(item => {
                  const isSelected = selectedBundleIds.includes(item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`bundle-choice-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleBundleItem(item.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="bundle-choice-name">{item.name}</span>
                        {isSelected && <CheckCircle size={17} color="#fbbf24" />}
                      </div>
                      <span className="bundle-choice-price">৳{item.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bundle-wooden-preview-box">
              <div className="wooden-box-title">
                <Package size={18} color="#fbbf24" />
                <span>আপনার কাঠের সুন্নাহ গিফট বক্স</span>
              </div>

              <div className="wooden-items-slots">
                {bundleChosenItems.length === 0 ? (
                  <div className="wooden-slot-empty">কোনো পণ্য এখনো সিলেক্ট করা হয়নি</div>
                ) : (
                  bundleChosenItems.map(item => (
                    <div key={item.id} className="wooden-slot-item">
                      <span style={{ color: '#fef3c7' }}>{item.name}</span>
                      <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>৳{item.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="bundle-pricing-summary">
                <div className="bundle-summary-row">
                  <span>রেগুলার মূল্য:</span>
                  <span>৳{rawBundleTotal}</span>
                </div>
                <div className="bundle-summary-row" style={{ color: '#4ade80' }}>
                  <span>কম্বো বক্স ডিসকাউন্ট (১৫%):</span>
                  <span>- ৳{bundleDiscount}</span>
                </div>
                <div className="bundle-summary-row" style={{ color: '#cbd5e1' }}>
                  <span>প্রিমিয়াম কাঠের গিফট বক্স ও রিবন:</span>
                  <span style={{ color: '#4ade80' }}>সম্পূর্ণ ফ্রি!</span>
                </div>
                <div className="bundle-total-row">
                  <span>প্যাকেজ অফার মূল্য:</span>
                  <span>৳{bundleFinalPrice}</span>
                </div>

                <button 
                  className="btn-gold-primary" 
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={addCustomBundleToCart}
                >
                  <Gift size={18} />
                  <span>এই গিফট বক্সটি কার্টে যোগ করুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Sourcing Story & Documentary Section */}
      <section className="sourcing-section" id="sourcing-section">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#064e3b', fontWeight: '800' }}>মাঠ ও সুন্দরবন থেকে আপনার ঘরে</h2>
          <p style={{ color: '#57534e', fontSize: '0.92rem' }}>সাতক্ষীরার খাঁটি দুধের গাওয়া ঘি ও সুন্দরবনের কাঁচা মধু সংগ্রহের বিশ্বস্ত গল্প</p>
        </div>

        <div className="sourcing-grid">
          {sourcingStories.map(story => (
            <div key={story.id} className="sourcing-card">
              <img src={story.image} alt={story.title} />
              <div className="sourcing-card-body">
                <span className="sourcing-location-tag">
                  <MapPin size={13} />
                  {story.location}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#064e3b', marginBottom: '6px' }}>{story.title}</h3>
                <p style={{ color: '#57534e', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Customer Reviews & Social Proof */}
      <section className="testimonials-section">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#064e3b', fontWeight: '800' }}>সম্মানিত গ্রাহকদের সন্তুষ্টি</h2>
          <p style={{ color: '#57534e', fontSize: '0.92rem' }}>সততা ও খাঁটি মানের কারণে সারা বাংলাদেশ থেকে আমাদের গ্রাহকদের ভালোবাসা</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map(rev => (
            <div key={rev.id} className="review-card-luxury">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div className="stars-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#78716c' }}>{rev.date}</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#292524', marginBottom: '14px', lineHeight: '1.55' }}>
                "{rev.text}"
              </p>
              <div style={{ borderTop: '1px solid #f5f5f4', paddingTop: '10px' }}>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#064e3b' }}>{rev.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#78716c' }}>
                  <span>{rev.location}</span>
                  <span style={{ color: '#059669', fontWeight: '600' }}>✓ ভেরিফাইড ক্রেতা</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="faq-section">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#064e3b', fontWeight: '800' }}>সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)</h2>
          <p style={{ color: '#57534e', fontSize: '0.92rem' }}>ঘি, মধু, আতর ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় প্রশ্নোত্তর</p>
        </div>

        <div>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="faq-card">
                <div 
                  className="faq-header"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                    <HelpCircle size={17} color="#064e3b" />
                    {faq.q}
                  </span>
                  <ChevronDown size={17} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
                {isOpen && (
                  <div className="faq-body">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Product Detail Quick View Modal */}
      {detailModalProduct && (
        <div className="modal-overlay-luxury" onClick={() => setDetailModalProduct(null)}>
          <div className="modal-product-detail" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setDetailModalProduct(null)}>
              <X size={20} />
            </button>

            <div className="detail-img-box">
              <img src={detailModalProduct.image} alt={detailModalProduct.name} />
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '700' }}>
                {detailModalProduct.categoryName}
              </span>
              <h2 style={{ fontSize: '1.4rem', color: '#064e3b', margin: '4px 0 8px' }}>
                {lang === 'bn' ? detailModalProduct.name : detailModalProduct.nameEn}
              </h2>

              <div className="rating-row">
                <div className="stars-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span>({detailModalProduct.reviewsCount} ভেরিফাইড রিভিউ)</span>
              </div>

              {detailModalProduct.origin && (
                <div className="modal-origin-row">
                  <MapPin size={15} color="#059669" />
                  <span><strong>সংগ্রহের নিজস্ব খাঁটি উৎস:</strong> {detailModalProduct.origin}</span>
                </div>
              )}

              {/* Variant Weight / Size Selector */}
              {detailModalProduct.variants && detailModalProduct.variants.length > 0 && (
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1e293b' }}>
                    পরিমাণ / সাইজ সিলেক্ট করুন:
                  </p>
                  <div className="variant-selector-grid">
                    {detailModalProduct.variants.map((v, i) => (
                      <button 
                        key={i}
                        className={`variant-pill ${selectedVariantIndex === i ? 'active' : ''}`}
                        onClick={() => setSelectedVariantIndex(i)}
                      >
                        {v.label} - ৳{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div style={{ margin: '12px 0' }}>
                {detailModalProduct.variants ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#064e3b' }}>
                      ৳{detailModalProduct.variants[selectedVariantIndex].price}
                    </span>
                    <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.9rem' }}>
                      ৳{detailModalProduct.variants[selectedVariantIndex].originalPrice}
                    </span>
                  </div>
                ) : (
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#064e3b' }}>
                    ৳{detailModalProduct.price}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55', marginBottom: '14px' }}>
                {lang === 'bn' ? detailModalProduct.description : detailModalProduct.descriptionEn}
              </p>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px' }}>
                <p style={{ fontWeight: '700', fontSize: '0.82rem', color: '#064e3b', marginBottom: '4px' }}>
                  প্রধান উপকারিতাসমূহ:
                </p>
                <ul style={{ paddingLeft: '16px', fontSize: '0.82rem', color: '#334155', lineHeight: '1.45' }}>
                  {(lang === 'bn' ? detailModalProduct.benefits : detailModalProduct.benefitsEn).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-gold-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    const currentVar = detailModalProduct.variants ? detailModalProduct.variants[selectedVariantIndex] : null;
                    directOrder(detailModalProduct, currentVar);
                    setDetailModalProduct(null);
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>এখনই অর্ডার করুন</span>
                </button>
                <button 
                  className="btn-add-cart"
                  style={{ width: '44px', height: '44px' }}
                  title="কার্টে যোগ করুন"
                  onClick={() => {
                    const currentVar = detailModalProduct.variants ? detailModalProduct.variants[selectedVariantIndex] : null;
                    addToCart(detailModalProduct, currentVar);
                    setDetailModalProduct(null);
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. Lab Test Report Modal */}
      {labModalProduct && (
        <div className="modal-overlay-luxury" onClick={() => setLabModalProduct(null)}>
          <div className="modal-lab-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setLabModalProduct(null)}>
              <X size={20} />
            </button>

            <div className="lab-seal-header">
              <div className="lab-seal-icon">
                <Award size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#064e3b' }}>খাদ্য মান ও বিশুদ্ধতা ল্যাব টেস্ট রিপোর্ট</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  প্রোডাক্ট: {labModalProduct.name}
                </p>
              </div>
            </div>

            <table className="lab-parameters-table">
              <tbody>
                <tr>
                  <td>পরীক্ষাকারী ল্যাব:</td>
                  <td>{labModalProduct.labReport.labName}</td>
                </tr>
                <tr>
                  <td>টেস্ট সার্টিফিকেট আইডি:</td>
                  <td>{labModalProduct.labReport.testId}</td>
                </tr>
                <tr>
                  <td>আর্দ্রতা / ময়েশ্চার রেট:</td>
                  <td>{labModalProduct.labReport.moisture}</td>
                </tr>
                <tr>
                  <td>বিশুদ্ধতার মাত্রা (Purity Score):</td>
                  <td style={{ color: '#059669', fontSize: '1.05rem' }}>{labModalProduct.labReport.purityScore}</td>
                </tr>
                <tr>
                  <td>কেমিক্যাল ও ভেজাল স্ট্যাটাস:</td>
                  <td style={{ color: '#059669' }}>{labModalProduct.labReport.status}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <p style={{ fontSize: '0.82rem', color: '#065f46', lineHeight: '1.5' }}>
                ✓ এই রিপোর্টটি সায়েন্স ল্যাব ও খাদ্য গবেষণাগারের স্বীকৃত প্যারামিটার অনুযায়ী শতভাগ উত্তীর্ণ। আপনি চাইলে পার্সেল রিসিভ করার সময় সাথে দেওয়া টেস্ট সার্টিফিকেটের কিউআর কোড স্ক্যান করে অনলাইন ডাটাবেজেও মিলিয়ে নিতে পারবেন।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 13. Order Tracking Modal */}
      {isTrackingOpen && (
        <div className="modal-overlay-luxury" onClick={() => setIsTrackingOpen(false)}>
          <div className="modal-lab-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsTrackingOpen(false)}>
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Truck size={26} color="#064e3b" />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#064e3b' }}>আপনার পার্সেল ট্র্যাক করুন</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>অর্ডার নম্বর (যেমন: FN-839210) বা মোবাইল নম্বর লিখুন</p>
              </div>
            </div>

            <form onSubmit={handleTrackOrder} style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
              <input 
                type="text" 
                placeholder="FN-XXXXXX অথবা 017XXXXXXXX"
                className="form-input-luxury"
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                required
              />
              <button type="submit" className="btn-gold-primary" style={{ padding: '9px 18px', whiteSpace: 'nowrap' }}>
                ট্র্যাক করুন
              </button>
            </form>

            {trackingResult && (
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.88rem' }}>
                  <span><strong>অর্ডার নং:</strong> {trackingResult.orderId}</span>
                  <span style={{ color: '#059669', fontWeight: '700' }}>{trackingResult.status}</span>
                </div>

                <div className="tracking-stepper-box">
                  <div className="step-row">
                    <div className="step-circle done">✓</div>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem' }}>১. অর্ডার গৃহীত হয়েছে</p>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>সাতক্ষীরা হাব থেকে নিশ্চিতকরণ সম্পন্ন</span>
                    </div>
                  </div>

                  <div className="step-row">
                    <div className="step-circle done">✓</div>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem' }}>২. কোয়ালিটি ল্যাব চেক ও প্যাকিং সম্পন্ন</p>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>নিরাপদ এয়ারটাইট সিলিং</span>
                    </div>
                  </div>

                  <div className="step-row">
                    <div className="step-circle active">●</div>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#d97706' }}>৩. কুরিয়ারে ট্রানজিটে রয়েছে</p>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>ডেলিভারি পার্টনার: {trackingResult.courier} ({trackingResult.trackingCode})</span>
                    </div>
                  </div>

                  <div className="step-row">
                    <div className="step-circle pending">৪</div>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#94a3b8' }}>৪. হোম ডেলিভারি</p>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>সম্ভাব্য সময়: {trackingResult.eta}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 14. Superfast 1-Click BD Checkout Drawer */}
      {isCheckoutOpen && (
        <div className="checkout-drawer-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-drawer" onClick={e => e.stopPropagation()}>
            <div className="checkout-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} />
                <h3>১-ক্লিক ফাস্ট চেকআউট</h3>
              </div>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            {orderConfirmed ? (
              <div style={{ padding: '24px 18px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <CheckCircle size={34} />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#064e3b', marginBottom: '6px' }}>আলহামদুলিল্লাহ! আপনার অর্ডার সফল হয়েছে</h3>
                <p style={{ color: '#475569', fontSize: '0.86rem', marginBottom: '14px' }}>
                  অর্ডার আইডি: <strong style={{ color: '#064e3b', fontSize: '1.1rem' }}>{confirmedOrderId}</strong>
                </p>

                {/* 1st Primary Channel: Email & Admin Database Notice */}
                <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', textAlign: 'left', fontSize: '0.83rem' }}>
                  <div style={{ fontWeight: '700', color: '#166534', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={16} />
                    <span>১ম মাধ্যম: ইমেইল ও ডাটাবেজে অর্ডার কনফার্মড</span>
                  </div>
                  <p style={{ color: '#334155', margin: '0 0 8px 0', lineHeight: '1.45' }}>
                    আপনার অর্ডারটি সফলভাবে সেন্ট্রাল ডাটাবেজ এবং <strong>munnastsc@gmail.com</strong> ইমেইলে সংরক্ষিত হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার ঠিকানায় পার্সেল বুকিংয়ের জন্য ফোনে যোগাযোগ করবেন।
                  </p>
                  <div style={{ borderTop: '1px dashed #bbf7d0', paddingTop: '8px', color: '#1f2937', fontSize: '0.8rem' }}>
                    <div>• <strong>ক্রেতার নাম:</strong> {customerName} ({customerPhone})</div>
                    {customerEmail && <div>• <strong>ইমেইল:</strong> {customerEmail}</div>}
                    <div>• <strong>ঠিকানা:</strong> {customerAddress}</div>
                    <div>• <strong>ডেলিভারি:</strong> {deliveryArea === 'dhaka' ? 'ঢাকা সিটি (৳৬০)' : 'ঢাকার বাইরে (৳১২০)'}</div>
                    <div style={{ marginTop: '4px' }}>• <strong>সর্বমোট বিল:</strong> <span style={{ color: '#064e3b', fontWeight: '800' }}>৳{grandTotal}</span> ({paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : paymentMethod.toUpperCase()})</div>
                  </div>
                </div>

                {/* 2nd Optional Channel: WhatsApp (ঐচ্ছিক) */}
                <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '10px', padding: '12px 14px', marginBottom: '14px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageCircle size={16} color="#16a34a" />
                      <span>২য় মাধ্যম: হোয়াটসঅ্যাপে স্লিপ পাঠানো</span>
                    </div>
                    <span style={{ background: '#e2e8f0', color: '#475569', fontSize: '0.7rem', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>
                      ঐচ্ছিক / Optional
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', marginBottom: '10px', lineHeight: '1.35' }}>
                    আপনার পিসিতে বা ফোনে হোয়াটসঅ্যাপ থাকলে চাইলে এক ক্লিকে অর্ডার স্লিপটি আমাদের অফিশিয়াল হোয়াটসঅ্যাপেও পাঠিয়ে রাখতে পারেন:
                  </p>
                  <button 
                    type="button"
                    className="checkout-submit-btn" 
                    style={{ width: '100%', background: '#25d366', color: '#fff', padding: '10px 14px', fontSize: '0.88rem', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }}
                    onClick={sendWhatsAppOrder}
                  >
                    <MessageCircle size={17} />
                    <span>হোয়াটসঅ্যাপে স্লিপ পাঠান (ঐচ্ছিক)</span>
                  </button>
                </div>

                {/* Close & Continue Shopping */}
                <button 
                  type="button"
                  onClick={() => {
                    setOrderConfirmed(false);
                    setCart([]);
                    setIsCheckoutOpen(false);
                  }}
                  style={{ background: '#064e3b', color: '#fff', border: 'none', padding: '12px', width: '100%', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <ShoppingBag size={17} />
                  <span>কেনাকাটা সম্পন্ন করুন / হোম পেজে ফিরুন</span>
                </button>
              </div>
            ) : (
              <div className="checkout-form-body">
                {/* Cart Items List */}
                <div className="cart-summary-card">
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#1e293b' }}>অর্ডারকৃত পণ্যসমূহ:</h4>
                  {cart.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '8px' }}>
                      আপনার কার্ট এখনো খালি। পছন্দের পণ্যে অর্ডার বাটন চাপুন।
                    </p>
                  ) : (
                    cart.map(item => (
                      <div key={item.id + (item.isBundle ? '-bundle' : '')} className="cart-item-row">
                        <div style={{ flex: 1, paddingRight: '8px' }}>
                          <p style={{ fontWeight: '600', color: '#0f172a' }}>{item.product.name}</p>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            [{item.product.weight}] • ৳{item.product.price} × {item.qty}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button 
                            onClick={() => updateQty(item.id, -1, item.isBundle)}
                            style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                          >
                            <Minus size={10} />
                          </button>
                          <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1, item.isBundle)}
                            style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}
                          >
                            <Plus size={10} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id, item.isBundle)}
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '4px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                  {cart.length > 0 && (
                    <div style={{ borderTop: '1px dashed #cbd5e1', marginTop: '10px', paddingTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                        <span>পণ্য উপমোট:</span>
                        <span>৳{subtotal}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b' }}>
                        <span>ডেলিভারি চার্জ:</span>
                        <span>৳{deliveryCharge}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '800', color: '#064e3b', marginTop: '4px' }}>
                        <span>সর্বমোট:</span>
                        <span>৳{grandTotal}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleConfirmOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '10px 12px', fontSize: '0.82rem', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} style={{ flexShrink: 0, color: '#059669' }} />
                    <span><strong>সরাসরি ইমেইল ও ওয়েব অর্ডার:</strong> পিসিতে হোয়াটসঅ্যাপ না থাকলেও কোনো চিন্তা নেই, সরাসরি এক ক্লিকে অর্ডার সম্পন্ন হবে!</span>
                  </div>

                  <div className="form-group-luxury">
                    <label>আপনার পূর্ণ নাম *</label>
                    <input 
                      type="text" 
                      placeholder="যেমন: মো. কামরুল হাসান" 
                      className="form-input-luxury"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-luxury">
                    <label>সচল মোবাইল নম্বর * (যেটিতে ফোন যাবে)</label>
                    <input 
                      type="tel" 
                      placeholder="যেমন: 017XXXXXXXX" 
                      className="form-input-luxury"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-luxury">
                    <label>ইমেইল ঠিকানা (ঐচ্ছিক - ইনভয়েস ও মেমো পেতে)</label>
                    <input 
                      type="email" 
                      placeholder="যেমন: yourname@gmail.com" 
                      className="form-input-luxury"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group-luxury">
                    <label>পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/জেলা) *</label>
                    <textarea 
                      rows="2" 
                      placeholder="যেমন: বাড়ি ১২, রোড ৫, উত্তরা, ঢাকা" 
                      className="form-input-luxury"
                      value={customerAddress}
                      onChange={e => setCustomerAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-luxury">
                    <label>ডেলিভারি এলাকা সিলেক্ট করুন:</label>
                    <div className="delivery-options-grid">
                      <div 
                        className={`delivery-choice ${deliveryArea === 'dhaka' ? 'selected' : ''}`}
                        onClick={() => setDeliveryArea('dhaka')}
                      >
                        <span style={{ fontWeight: '700' }}>ঢাকা সিটি</span>
                        <span style={{ fontSize: '0.78rem', color: '#059669' }}>৳ ৬০ (২৪-৪৮ ঘণ্টা)</span>
                      </div>
                      <div 
                        className={`delivery-choice ${deliveryArea === 'outside' ? 'selected' : ''}`}
                        onClick={() => setDeliveryArea('outside')}
                      >
                        <span style={{ fontWeight: '700' }}>ঢাকার বাইরে</span>
                        <span style={{ fontSize: '0.78rem', color: '#059669' }}>৳ ১২০ (৪৮-৭২ ঘণ্টা)</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-luxury">
                    <label>পেমেন্ট পদ্ধতি:</label>
                    <div className="payment-methods-grid">
                      <div 
                        className={`payment-choice ${paymentMethod === 'cod' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        ক্যাশ অন ডেলিভারি
                      </div>
                      <div 
                        className={`payment-choice ${paymentMethod === 'bkash' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('bkash')}
                      >
                        বিকাশ (bKash)
                      </div>
                      <div 
                        className={`payment-choice ${paymentMethod === 'nagad' ? 'selected' : ''}`}
                        onClick={() => setPaymentMethod('nagad')}
                      >
                        নগদ (Nagad)
                      </div>
                    </div>
                  </div>

                  {/* bKash Instructions Box */}
                  {paymentMethod === 'bkash' && (
                    <div className="online-payment-box">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', color: '#e2136e' }}>বিকাশ নম্বর:</span>
                        <button 
                          type="button"
                          onClick={() => copyPaymentNumber('01714740430')}
                          style={{ border: 'none', background: '#e2136e', color: '#fff', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Copy size={11} />
                          {copiedPhone ? 'কপি হয়েছে!' : 'কপি করুন'}
                        </button>
                      </div>
                      <p style={{ fontWeight: '800', fontSize: '1.05rem', color: '#e2136e', marginBottom: '6px' }}>
                        01714-740430
                      </p>
                      <p style={{ fontSize: '0.78rem', color: '#57534e', marginBottom: '8px' }}>
                        বিকাশ অ্যাপ থেকে <strong>৳{grandTotal}</strong> টাকা 'Send Money' করে ট্রানজেকশন আইডি দিন:
                      </p>
                      <input 
                        type="text" 
                        placeholder="TrxID (যেমন: 9J76KL2X)"
                        className="form-input-luxury"
                        value={trxId}
                        onChange={e => setTrxId(e.target.value)}
                        required
                        style={{ marginBottom: '6px' }}
                      />
                      <input 
                        type="tel" 
                        placeholder="যে বিকাশ নম্বর থেকে পাঠিয়েছেন"
                        className="form-input-luxury"
                        value={senderNumber}
                        onChange={e => setSenderNumber(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {/* Nagad Instructions Box */}
                  {paymentMethod === 'nagad' && (
                    <div className="online-payment-box nagad">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', color: '#f7941d' }}>নগদ নম্বর:</span>
                        <button 
                          type="button"
                          onClick={() => copyPaymentNumber('01714740430')}
                          style={{ border: 'none', background: '#f7941d', color: '#fff', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          <Copy size={11} />
                          {copiedPhone ? 'কপি হয়েছে!' : 'কপি করুন'}
                        </button>
                      </div>
                      <p style={{ fontWeight: '800', fontSize: '1.05rem', color: '#f7941d', marginBottom: '6px' }}>
                        01714-740430
                      </p>
                      <p style={{ fontSize: '0.78rem', color: '#57534e', marginBottom: '8px' }}>
                        নগদ অ্যাপ থেকে <strong>৳{grandTotal}</strong> টাকা 'Send Money' করে তথ্য দিন:
                      </p>
                      <input 
                        type="text" 
                        placeholder="নগদ ট্রানজেকশন আইডি (TrxID)"
                        className="form-input-luxury"
                        value={trxId}
                        onChange={e => setTrxId(e.target.value)}
                        required
                        style={{ marginBottom: '6px' }}
                      />
                      <input 
                        type="tel" 
                        placeholder="যে নগদ নম্বর থেকে পাঠিয়েছেন"
                        className="form-input-luxury"
                        value={senderNumber}
                        onChange={e => setSenderNumber(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="checkout-submit-btn"
                    disabled={cart.length === 0 || isSubmittingOrder}
                    style={{ opacity: isSubmittingOrder ? 0.75 : 1, cursor: isSubmittingOrder ? 'wait' : 'pointer' }}
                  >
                    {isSubmittingOrder ? (
                      <>
                        <Loader2 size={18} className="spin-animation" />
                        <span>অর্ডারটি সিস্টেমে ও ইমেইলে জমা হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        <span>৳{grandTotal} - সরাসরি অর্ডার সম্পন্ন করুন</span>
                      </>
                    )}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    🔒 ক্যাশ অন ডেলিভারি | পিসিতে হোয়াটসঅ্যাপ ছাড়াও সরাসরি অর্ডার কনফার্ম হয়
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 15. Social Proof Floating Toast Notification */}
      {recentOrderNotice && (
        <div className="social-proof-toast">
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', color: '#064e3b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShoppingBag size={18} />
          </div>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1c1917', lineHeight: '1.2' }}>
              {recentOrderNotice.name} ({recentOrderNotice.city})
            </p>
            <span style={{ fontSize: '0.74rem', color: '#059669' }}>
              মাত্র অর্ডার করলেন: {recentOrderNotice.product}
            </span>
          </div>
        </div>
      )}

      {/* 16. Floating WhatsApp Instant Connect */}
      <a 
        href="https://wa.me/8801714740430?text=আসসালামু%20আলাইকুম,%20সাতক্ষীরার%20গাওয়া%20ঘি,%20মধু%20ও%20আতর%20সম্পর্কে%20জানতে%20চাই।" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        title="WhatsApp-এ সরাসরি যোগাযোগ করুন"
      >
        <MessageCircle size={28} />
      </a>

      {/* 17. MOBILE BOTTOM NAVIGATION BAR (BD Mobile First E-commerce UX) */}
      <nav className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${selectedCategory === 'all' && !showWishlistOnly ? 'active' : ''}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setSelectedCategory('all');
            setShowWishlistOnly(false);
          }}
        >
          <Home size={19} />
          <span>হোম</span>
        </button>

        <button 
          className={`mobile-nav-item ${selectedCategory === 'attar' ? 'active' : ''}`}
          onClick={() => scrollToCategories('attar')}
        >
          <Droplets size={19} color={selectedCategory === 'attar' ? '#d97706' : 'currentColor'} />
          <span style={selectedCategory === 'attar' ? { color: '#d97706', fontWeight: '700' } : {}}>আতর</span>
        </button>

        <button 
          className="mobile-nav-item"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Grid size={19} />
          <span>ক্যাটাগরি</span>
        </button>

        <button 
          className={`mobile-nav-item ${showWishlistOnly ? 'active' : ''}`}
          onClick={() => setShowWishlistOnly(prev => !prev)}
        >
          <Heart size={19} fill={wishlist.length > 0 ? "currentColor" : "none"} />
          <span>উইশলিস্ট</span>
          {wishlist.length > 0 && (
            <span className="mobile-nav-badge">{wishlist.length}</span>
          )}
        </button>

        <button 
          className="mobile-nav-item"
          onClick={() => setIsCheckoutOpen(true)}
        >
          <ShoppingBag size={19} />
          <span>কার্ট</span>
          {totalCartCount > 0 && (
            <span className="mobile-nav-badge">{totalCartCount}</span>
          )}
        </button>
      </nav>

      {/* 18. Luxury Footer */}
      <footer className="luxury-footer">
        <div className="footer-container">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid #fbbf24', background: '#fff' }} />
              <div>
                <h3 style={{ color: '#fbbf24', fontSize: '1.4rem', margin: 0, letterSpacing: '0.5px', lineHeight: 1.1 }}>খাঁটি সওদা</h3>
                <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 700 }}>www.khatisaoda.com</span>
              </div>
            </div>
            <p style={{ marginBottom: '12px' }}>
              সাতক্ষীরার খাঁটি গাওয়া ঘি ও বিখ্যাত হিমসাগর আম, সুন্দরবনের র' মধু, সৌদি আরবের আজওয়া খেজুর, সিলেটের চা এবং মদিনা ও দুবাইয়ের অ্যালকোহলমুক্ত রাজকীয় আতরের এক বিশ্বস্ত প্ল্যাটফর্ম।
            </p>
            <span style={{ fontSize: '0.78rem', color: '#6ee7b7' }}>ট্রেড লাইসেন্স নং: TRAD/DNCC/2026/0912</span>
          </div>

          <div className="footer-col">
            <h4>জনপ্রিয় ক্যাটাগরি ও উৎস</h4>
            <a href="#products-section" onClick={() => scrollToCategories('attar')}>👑 মদিনা ও দুবাইয়ের রাজকীয় আতর</a>
            <a href="#products-section" onClick={() => scrollToCategories('ghee')}>🧈 সাতক্ষীরার খাঁটি গাওয়া ঘি</a>
            <a href="#products-section" onClick={() => scrollToCategories('mango')}>🥭 সাতক্ষীরার হিমসাগর আম</a>
            <a href="#products-section" onClick={() => scrollToCategories('honey')}>🍯 সুন্দরবনের র' খলিশা মধু</a>
            <a href="#products-section" onClick={() => scrollToCategories('dates')}>🌴 সৌদি আরবের আজওয়া ও সুক্কারি</a>
            <a href="#products-section" onClick={() => scrollToCategories('sylhet_tea')}>🍃 সিলেটের শ্রীমঙ্গলের কুঁড়ি চা</a>
          </div>

          <div className="footer-col">
            <h4>গ্রাহক সেবা ও নীতি</h4>
            <a href="#!">টেস্ট অ্যান্ড রিটার্ন পলিসি</a>
            <a href="#!">ল্যাব টেস্ট ভেরিফিকেশন</a>
            <a href="#!">ডেলিভারি চার্জ ও সময়সীমা</a>
            <a href="#!">প্রাইভেসি ও শর্তাবলী</a>
            <button 
              onClick={() => { setIsAdminOpen(true); window.location.hash = 'admin'; }}
              style={{ background: 'none', border: 'none', color: '#fbbf24', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left', padding: '6px 0', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              🔑 অ্যাডমিন পোর্টাল (লগইন)
            </button>
          </div>

          <div className="footer-col">
            <h4>যোগাযোগ ও ঠিকানা</h4>
            <p>হটলাইন: +880 1714-740430</p>
            <p>হোয়াটসঅ্যাপ: +880 1714-740430</p>
            <p>
              <a 
                href="https://www.facebook.com/khatisaoda" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                🌐 ফেসবুক: facebook.com/khatisaoda
              </a>
            </p>
            <p>ইমেইল: support@khatisaoda.com</p>
            <p>ওয়েবসাইট: www.khatisaoda.com</p>
            <p>ঠিকানা: বাড়ি ১২, রোড ৫, বনানী, ঢাকা - ১২১৩</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '18px', textAlign: 'center', fontSize: '0.8rem', color: '#6ee7b7' }}>
          © {new Date().getFullYear()} খাঁটি সওদা (www.khatisaoda.com). All rights reserved. খাঁটি প্রাকৃতিক খাদ্য ও সুন্নাহ লাইফস্টাইল।
        </div>
      </footer>
    </div>
  );
}
