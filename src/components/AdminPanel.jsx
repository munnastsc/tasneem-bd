import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Package, Clock, CheckCircle2, 
  Truck, DollarSign, Search, Filter, Phone, MessageSquare, 
  Printer, Trash2, Download, ExternalLink, RefreshCw, AlertCircle, X, ChevronRight,
  Users, Activity, Eye, Globe, Smartphone, Monitor, Bell, BellOff, ArrowUpRight, Share2, Tag, Sparkles, Check, Play,
  ShoppingBag, Plus, Edit2, Upload, Image as ImageIcon, Layers, RotateCcw, AlertTriangle
} from 'lucide-react';
import { products as defaultProducts } from '../data/products';
import { 
  getLiveVisitorMetrics, 
  clearVisitorHistory, 
  playChimeSound 
} from '../utils/visitorTracker';
import { 
  getPixelId, 
  setPixelId, 
  getPixelEventLogs, 
  clearPixelEventLogs, 
  trackPixelEvent, 
  DEFAULT_PIXEL_ID 
} from '../utils/facebookPixel';

const STORE_CATEGORIES = [
  { id: 'ghee', name: 'সাতক্ষীরার খাঁটি ঘি', icon: '🧈' },
  { id: 'honey', name: 'সুন্দরবন ও খাঁটি মধু', icon: '🍯' },
  { id: 'mango', name: 'সাতক্ষীরার হিমসাগর আম', icon: '🥭' },
  { id: 'attar', name: 'রয়্যাল আতর (মদিনা ও দুবাই)', icon: '👑' },
  { id: 'dates', name: 'সৌদি খেজুর (আজওয়া ও সুক্কারি)', icon: '🌴' },
  { id: 'sylhet_tea', name: 'সিলেটের চা ও তেজপাতা', icon: '🍃' },
  { id: 'spices', name: 'খাঁটি দেশি মশলা', icon: '🌶️' },
  { id: 'sunnah_oil', name: 'সুন্নতি খাদ্য ও তেল', icon: '🌿' },
  { id: 'lifestyle', name: 'ইসলামিক লাইফস্টাইল', icon: '🕌' },
  { id: 'other', name: 'অন্যান্য প্রাকৃতিক পণ্য', icon: '📦' }
];

export default function AdminPanel({ onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('khatisaoda_admin_auth') === 'true' || localStorage.getItem('tuhfa_admin_auth') === 'true' || localStorage.getItem('tasneem_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'orders' | 'visitors' | 'pixel'
  const [activeTab, setActiveTab] = useState('orders');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Live Visitors State
  const [visitorMetrics, setVisitorMetrics] = useState(() => getLiveVisitorMetrics());
  const [visitorSearch, setVisitorSearch] = useState('');
  const [visitorFilter, setVisitorFilter] = useState('all'); // 'all', 'active', 'facebook', 'mobile'
  const [selectedSessionHistory, setSelectedSessionHistory] = useState(null);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(() => {
    return localStorage.getItem('khatisaoda_admin_audio_enabled') !== 'false';
  });

  // Facebook Pixel State
  const [currentPixelId, setCurrentPixelId] = useState(() => getPixelId());
  const [pixelInput, setPixelInput] = useState(() => getPixelId());
  const [pixelEvents, setPixelEvents] = useState(() => getPixelEventLogs());

  // Products Catalog Management State
  const [productsList, setProductsList] = useState(() => {
    try {
      const stored = localStorage.getItem('khatisaoda_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return defaultProducts;
  });
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productStockFilter, setProductStockFilter] = useState('all'); // 'all', 'instock', 'outofstock'
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const initialProductForm = {
    name: '',
    nameEn: '',
    category: 'ghee',
    categoryName: 'সাতক্ষীরার খাঁটি ঘি',
    price: '',
    originalPrice: '',
    weight: '১ প্যাক',
    origin: 'সাতক্ষীরা',
    stock: 25,
    badge: 'সেরা অফার',
    badgeColor: 'gold',
    image: '',
    description: '',
    benefits: '',
    isSunnah: false,
    isBestseller: true
  };
  const [productFormData, setProductFormData] = useState(initialProductForm);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('khatisaoda_orders') || localStorage.getItem('tuhfashop_orders') || localStorage.getItem('tasneem_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // Sample orders for demonstration
        const sampleOrders = [
          {
            orderId: 'FN-849201',
            date: new Date(Date.now() - 3600000 * 2).toISOString(),
            customerName: 'মো. তারিকুল ইসলাম',
            customerPhone: '01712984512',
            customerAddress: 'বাড়ি ১২, রোড ৪, সেক্টর ৯, উত্তরা, ঢাকা',
            deliveryArea: 'dhaka',
            paymentMethod: 'cash',
            status: 'pending',
            items: [
              { product: { name: 'সাতক্ষীরার খাঁটি গাওয়া ঘি', weight: '১ কেজি (কাঁচের জার)', price: 1900 }, qty: 1 },
              { product: { name: 'সুন্দরবনের খাঁটি র\' খলিশা ফুলের মধু', weight: '৫০০ গ্রাম', price: 1050 }, qty: 1 }
            ],
            grandTotal: 3010
          },
          {
            orderId: 'FN-631892',
            date: new Date(Date.now() - 3600000 * 8).toISOString(),
            customerName: 'ডা. সানজিদা রহমান',
            customerPhone: '01819445566',
            customerAddress: 'ফ্ল্যাট ৪-বি, হাউজ ২১, ধানমন্ডি ২/এ, ঢাকা',
            deliveryArea: 'dhaka',
            paymentMethod: 'bkash',
            senderNumber: '01819445566',
            trxId: 'BKS892X019',
            status: 'confirmed',
            items: [
              { product: { name: 'প্রাকৃতিক কুল বরই ফুলের খাঁটি মধু', weight: '১ কেজি', price: 849 }, qty: 2 },
              { product: { name: 'পবিত্র মদিনার আজওয়া ভিআইপি খেজুর', weight: '৪০০ গ্রাম', price: 780 }, qty: 1 }
            ],
            grandTotal: 2538
          },
          {
            orderId: 'FN-519044',
            date: new Date(Date.now() - 3600000 * 24).toISOString(),
            customerName: 'মাহমুদুল হাসান',
            customerPhone: '01911223344',
            customerAddress: 'জিইসি মোড়, নাসিরাবাদ, চট্টগ্রাম',
            deliveryArea: 'outside',
            paymentMethod: 'cash',
            status: 'shipped',
            courierTracking: 'STDF-894102',
            items: [
              { product: { name: 'সাতক্ষীরার বিখ্যাত কেমিক্যালমুক্ত হিমসাগর আম', weight: '১০ কেজি (ক্যারেট)', price: 1250 }, qty: 1 },
              { product: { name: 'রয়েল মদিনা আতর - উদ আল কা\'বা', weight: '৬ মিলি', price: 550 }, qty: 1 }
            ],
            grandTotal: 1920
          }
        ];
        localStorage.setItem('khatisaoda_orders', JSON.stringify(sampleOrders));
        setOrders(sampleOrders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Refresh live visitor metrics
  const refreshVisitorMetrics = () => {
    setVisitorMetrics(getLiveVisitorMetrics());
  };

  // Refresh pixel events log
  const refreshPixelLogs = () => {
    setPixelEvents(getPixelEventLogs());
  };

  // Real-time Event Listeners and Timers
  useEffect(() => {
    loadOrders();
    refreshVisitorMetrics();
    refreshPixelLogs();

    // 1. Listen for Visitor Events
    const handleVisitorEvent = (e) => {
      refreshVisitorMetrics();
      if (e.detail?.type === 'NEW_VISITOR') {
        if (audioAlertEnabled) {
          playChimeSound();
        }
        showToast(`🔔 নতুন ভিজিটর সাইটে প্রবেশ করেছে (${e.detail.source || 'সরাসরি'})!`);
      }
    };
    window.addEventListener('khatisaoda_visitor_event', handleVisitorEvent);

    // 2. Listen for Facebook Pixel Events
    const handlePixelEvent = () => {
      refreshPixelLogs();
    };
    window.addEventListener('khatisaoda_pixel_event', handlePixelEvent);

    // 3. Periodic active status poll (every 4s)
    const interval = setInterval(() => {
      refreshVisitorMetrics();
    }, 4000);

    return () => {
      window.removeEventListener('khatisaoda_visitor_event', handleVisitorEvent);
      window.removeEventListener('khatisaoda_pixel_event', handlePixelEvent);
      clearInterval(interval);
    };
  }, [audioAlertEnabled]);

  // Audio Toggle
  const toggleAudioAlert = () => {
    const next = !audioAlertEnabled;
    setAudioAlertEnabled(next);
    localStorage.setItem('khatisaoda_admin_audio_enabled', String(next));
    if (next) {
      playChimeSound();
      showToast('🔊 ভিজিটর প্রবেশ সাউন্ড অ্যালার্ট চালু করা হয়েছে।');
    } else {
      showToast('🔇 ভিজিটর সাউন্ড অ্যালার্ট বন্ধ করা হয়েছে।');
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && (password === 'khati2026' || password === 'tuhfa2026' || password === 'tasneem2026')) {
      setIsAuthenticated(true);
      localStorage.setItem('khatisaoda_admin_auth', 'true');
      setLoginError('');
      showToast('স্বাগতম! খাঁটি সওদা (www.khatisaoda.com) অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে।');
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('khatisaoda_admin_auth');
    localStorage.removeItem('tuhfa_admin_auth');
    localStorage.removeItem('tasneem_admin_auth');
    showToast('অ্যাডমিন প্যানেল থেকে লগআউট সম্পন্ন হয়েছে।');
  };

  // Update Status
  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('khatisaoda_orders', JSON.stringify(updated));
    showToast(`অর্ডার ${orderId} এর স্ট্যাটাস '${newStatus}' করা হয়েছে।`);
  };

  // Delete Order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`আপনি কি নিশ্চিতভাবে অর্ডার ${orderId} মুছে ফেলতে চান?`)) {
      const updated = orders.filter(o => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('khatisaoda_orders', JSON.stringify(updated));
      showToast(`অর্ডার ${orderId} ডিলিট করা হয়েছে।`);
    }
  };

  // Export Orders to CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Address', 'Area', 'Payment Method', 'Items', 'Total'];
    const rows = orders.map(o => [
      o.orderId,
      new Date(o.date).toLocaleDateString('bn-BD'),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerAddress}"`,
      o.deliveryArea === 'dhaka' ? 'Dhaka' : 'Outside',
      o.paymentMethod,
      `"${(o.items || []).map(i => `${i.product.name} [${i.product.weight}] (x${i.qty})`).join(', ')}"`,
      o.grandTotal
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `khatisaoda_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('অর্ডার লিস্ট CSV ফাইলে ডাউনলোড হয়েছে!');
  };

  // Export Visitors to CSV
  const handleExportVisitorsCSV = () => {
    const headers = ['Visitor ID', 'Session ID', 'First Seen', 'Last Active', 'Status', 'Traffic Source', 'Source Detail', 'Device', 'OS', 'Browser', 'Current Page', 'Pageviews'];
    const rows = (visitorMetrics.sessions || []).map(s => [
      s.vid,
      s.sid,
      new Date(s.firstSeen).toLocaleString('bn-BD'),
      new Date(s.lastActive).toLocaleString('bn-BD'),
      s.isActive ? 'Active (Online)' : 'Offline',
      `"${s.source}"`,
      `"${s.sourceDetail || ''}"`,
      `"${s.device}"`,
      `"${s.os}"`,
      `"${s.browser}"`,
      `"${s.currentPage || ''}"`,
      s.pageviews || 1
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `khatisaoda_visitors_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ভিজিটর অ্যানালিটিক্স CSV ফাইলে ডাউনলোড হয়েছে!');
  };

  // Clear Visitors
  const handleClearVisitors = () => {
    if (window.confirm('আপনি কি সকল ভিজিটর হিস্ট্রি রিসেট করতে চান?')) {
      clearVisitorHistory();
      refreshVisitorMetrics();
      showToast('ভিজিটর লগ সফলভাবে পরিষ্কার করা হয়েছে।');
    }
  };

  // Save Facebook Pixel ID
  const handleSavePixelId = (e) => {
    e.preventDefault();
    if (!pixelInput.trim()) {
      showToast('দয়া করে সঠিক মেটা পিক্সেল আইডি প্রদান করুন!');
      return;
    }
    const saved = setPixelId(pixelInput.trim());
    setCurrentPixelId(saved);
    showToast(`ফেসবুক পিক্সেল আইডি (${saved}) সফলভাবে সংরক্ষিত ও সক্রিয় হয়েছে!`);
  };

  // Fire Test Pixel Event
  const handleFireTestPixelEvent = (evtName) => {
    trackPixelEvent(evtName, {
      test_trigger: 'Admin Panel Manual Test',
      page: 'www.facebook.com/khatisaoda Integration',
      value: evtName === 'Purchase' ? 3010 : 1900,
      currency: 'BDT'
    });
    refreshPixelLogs();
    showToast(`মেটা পিক্সেল [${evtName}] টেস্ট ইভেন্ট সফলভাবে ফায়ার হয়েছে!`);
  };

  // Save Products helper
  const handleSaveProductList = (newList) => {
    setProductsList(newList);
    try {
      localStorage.setItem('khatisaoda_products', JSON.stringify(newList));
      window.dispatchEvent(new CustomEvent('khatisaoda_products_updated', { detail: { products: newList } }));
    } catch (e) {
      console.error(e);
      showToast('⚠️ স্টোরেজে সংরক্ষণ করতে সমস্যা হয়েছে, ছবির সাইজ ছোট করুন!');
    }
  };

  // Open Add Product Modal
  const handleOpenNewProductModal = () => {
    setEditingProduct(null);
    setProductFormData(initialProductForm);
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProductModal = (product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name || '',
      nameEn: product.nameEn || '',
      category: product.category || 'ghee',
      categoryName: product.categoryName || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      weight: product.weight || '১ প্যাক',
      origin: product.origin || 'সাতক্ষীরা',
      stock: typeof product.stock === 'number' ? product.stock : 20,
      badge: product.badge || '',
      badgeColor: product.badgeColor || 'gold',
      image: product.image || '',
      description: product.description || '',
      benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : (product.benefits || ''),
      isSunnah: !!product.isSunnah,
      isBestseller: !!product.isBestseller
    });
    setIsProductModalOpen(true);
  };

  // Toggle Stock
  const handleToggleStock = (productId) => {
    const updated = productsList.map(p => {
      if (p.id === productId) {
        const currentStock = Number(p.stock) || 0;
        const newStock = currentStock > 0 ? 0 : 25;
        return { ...p, stock: newStock };
      }
      return p;
    });
    handleSaveProductList(updated);
    showToast('পণ্যের স্টক স্ট্যাটাস সফলভাবে আপডেট হয়েছে!');
  };

  // Delete Product
  const handleDeleteProduct = (productId) => {
    const target = productsList.find(p => p.id === productId);
    if (window.confirm(`আপনি কি নিশ্চিতভাবে "${target?.name || 'এই পণ্যটি'}" মুছে ফেলতে চান?`)) {
      const updated = productsList.filter(p => p.id !== productId);
      handleSaveProductList(updated);
      showToast('পণ্যটি সফলভাবে ডিলিট করা হয়েছে!');
    }
  };

  // Reset Default Catalog
  const handleResetDefaultProducts = () => {
    if (window.confirm('আপনি কি ডিফল্ট প্রোডাক্ট ক্যাটালগ রিস্টোর করতে চান? আপনার কাস্টম পণ্যগুলো রিসেট হয়ে মূল পণ্যগুলো ফিরে আসবে।')) {
      handleSaveProductList(defaultProducts);
      showToast('ডিফল্ট পণ্য ক্যাটালগ সফলভাবে রিস্টোর হয়েছে!');
    }
  };

  // Image Upload with Canvas Compression
  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('অনুগ্রহ করে শুধুমাত্র ছবি (JPG, PNG, WebP) ফাইল সিলেক্ট করুন!');
      return;
    }

    setImageUploadLoading(true);
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.src = loadEvent.target.result;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 800;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          setProductFormData(prev => ({ ...prev, image: compressed }));
          setImageUploadLoading(false);
          showToast('ছবি সফলভাবে আপলোড ও অপ্টিমাইজ হয়েছে!');
        } catch (err) {
          console.error(err);
          setProductFormData(prev => ({ ...prev, image: loadEvent.target.result }));
          setImageUploadLoading(false);
        }
      };
      img.onerror = () => {
        setImageUploadLoading(false);
        showToast('ছবি লোড করতে সমস্যা হয়েছে!');
      };
    };
    reader.onerror = () => {
      setImageUploadLoading(false);
      showToast('ফাইল রিড করা সম্ভব হয়নি!');
    };
    reader.readAsDataURL(file);
  };

  // Submit Product (Add or Edit)
  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      showToast('অনুগ্রহ করে পণ্যের বাংলা নাম লিখুন!');
      return;
    }
    const priceNum = Number(productFormData.price);
    if (!priceNum || priceNum <= 0) {
      showToast('অনুগ্রহ করে সঠিক বিক্রয় মূল্য দিন!');
      return;
    }

    const catObj = STORE_CATEGORIES.find(c => c.id === productFormData.category) || STORE_CATEGORIES[0];
    const benefitsList = (productFormData.benefits || '')
      .split('\n')
      .map(b => b.trim())
      .filter(Boolean);

    const origPriceNum = productFormData.originalPrice 
      ? Number(productFormData.originalPrice) 
      : Math.round(priceNum * 1.15);

    const finalImage = productFormData.image.trim() || '/images/satkhira_ghee.jpg';

    if (editingProduct) {
      const updated = productsList.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: productFormData.name.trim(),
            nameEn: productFormData.nameEn.trim() || productFormData.name.trim(),
            category: productFormData.category,
            categoryName: catObj.name,
            price: priceNum,
            originalPrice: origPriceNum,
            weight: productFormData.weight.trim() || '১ প্যাক',
            origin: productFormData.origin.trim() || 'সাতক্ষীরা',
            stock: Number(productFormData.stock) || 0,
            badge: productFormData.badge.trim(),
            badgeColor: productFormData.badgeColor,
            image: finalImage,
            description: productFormData.description.trim() || p.description,
            benefits: benefitsList.length > 0 ? benefitsList : (p.benefits || []),
            isSunnah: !!productFormData.isSunnah,
            isBestseller: !!productFormData.isBestseller
          };
        }
        return p;
      });
      handleSaveProductList(updated);
      showToast(`"${productFormData.name}" সফলভাবে আপডেট হয়েছে!`);
    } else {
      const newProduct = {
        id: Date.now(),
        name: productFormData.name.trim(),
        nameEn: productFormData.nameEn.trim() || productFormData.name.trim(),
        category: productFormData.category,
        categoryName: catObj.name,
        price: priceNum,
        originalPrice: origPriceNum,
        weight: productFormData.weight.trim() || '১ প্যাক',
        origin: productFormData.origin.trim() || 'সাতক্ষীরা',
        stock: Number(productFormData.stock) || 20,
        badge: productFormData.badge.trim() || 'নতুন কালেকশন',
        badgeColor: productFormData.badgeColor || 'gold',
        image: finalImage,
        description: productFormData.description.trim() || 'খাঁটি সওদার শতভাগ বিশুদ্ধ প্রাকৃতিক পণ্য। স্বাস্থ্যসম্মত ও কেমিক্যালমুক্ত।',
        descriptionEn: productFormData.nameEn.trim() || '',
        rating: 5.0,
        reviewsCount: 1,
        benefits: benefitsList.length > 0 ? benefitsList : [
          '১০০% খাঁটি ও প্রাকৃতিক উপাদানে তৈরি',
          'স্বাস্থ্যসম্মত ও ক্ষতিকারক কেমিক্যালমুক্ত'
        ],
        isSunnah: !!productFormData.isSunnah,
        isBestseller: !!productFormData.isBestseller,
        variants: [
          {
            label: productFormData.weight.trim() || '১ প্যাক',
            labelEn: 'Standard Pack',
            price: priceNum,
            originalPrice: origPriceNum
          }
        ]
      };
      const updated = [newProduct, ...productsList];
      handleSaveProductList(updated);
      showToast(`নতুন পণ্য "${newProduct.name}" সফলভাবে ক্যাটালগে আপলোড হয়েছে!`);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Export Products CSV
  const handleExportProductsCSV = () => {
    const headers = ['ID', 'Name (Bengali)', 'Name (English)', 'Category', 'Sale Price (BDT)', 'Regular Price (BDT)', 'Weight/Unit', 'Stock', 'Origin', 'Badge'];
    const rows = productsList.map(p => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${(p.nameEn || '').replace(/"/g, '""')}"`,
      p.category,
      p.price,
      p.originalPrice || '',
      `"${p.weight || ''}"`,
      p.stock || 0,
      `"${p.origin || ''}"`,
      `"${p.badge || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `khatisaoda_products_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('পণ্য ক্যাটালগ CSV ফাইলে ডাউনলোড হয়েছে!');
  };

  // Filtered Products
  const filteredProductsList = useMemo(() => {
    return productsList.filter(p => {
      const q = productSearch.toLowerCase();
      const matchesSearch = 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
        (p.origin && p.origin.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) {
        return false;
      }

      if (productStockFilter === 'instock' && (!p.stock || p.stock <= 0)) return false;
      if (productStockFilter === 'outofstock' && (p.stock && p.stock > 0)) return false;

      return true;
    });
  }, [productsList, productSearch, productCategoryFilter, productStockFilter]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        (o.orderId && o.orderId.toLowerCase().includes(q)) ||
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.customerPhone && o.customerPhone.includes(q)) ||
        (o.customerAddress && o.customerAddress.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [orders, searchQuery, statusFilter]);

  // Filtered visitors
  const filteredVisitors = useMemo(() => {
    return (visitorMetrics.sessions || []).filter(s => {
      const q = visitorSearch.toLowerCase();
      const matchesSearch = 
        (s.vid && s.vid.toLowerCase().includes(q)) ||
        (s.source && s.source.toLowerCase().includes(q)) ||
        (s.device && s.device.toLowerCase().includes(q)) ||
        (s.os && s.os.toLowerCase().includes(q)) ||
        (s.currentPage && s.currentPage.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (visitorFilter === 'active') return s.isActive;
      if (visitorFilter === 'facebook') return s.isFacebook;
      if (visitorFilter === 'mobile') return (s.device || '').includes('Mobile') || (s.device || '').includes('মোবাইল');

      return true;
    });
  }, [visitorMetrics.sessions, visitorSearch, visitorFilter]);

  // Analytics Metrics
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'pending' || !o.status).length;
  const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
  const shippedCount = orders.filter(o => o.status === 'shipped').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0);

  // If not logged in, render login modal
  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo-badge" style={{ padding: 0, overflow: 'hidden', borderRadius: '50%', border: '2px solid #059669', background: '#fff' }}>
              <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h2>খাঁটি সওদা অ্যাডমিন পোর্টাল</h2>
            <p>www.khatisaoda.com অর্ডার ম্যানেজমেন্ট ও লাইভ ভিজিটর ট্র্যাকিং</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {loginError && (
              <div className="admin-error-box">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <div className="form-group-admin">
              <label>ইউজারনেম (Username)</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="যেমন: admin"
                required
                className="admin-input"
              />
            </div>

            <div className="form-group-admin">
              <label>পাসওয়ার্ড (Password)</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                required
                className="admin-input"
              />
            </div>

            <div className="admin-hint-box">
              <span>ডিফল্ট লগইন তথ্য:</span>
              <code>Username: <strong>admin</strong></code>
              <code>Password: <strong>khati2026</strong> (বা tuhfa2026)</code>
            </div>

            <div className="admin-actions-row">
              <button type="submit" className="admin-btn-primary">
                <Lock size={16} />
                <span>লগইন করুন</span>
              </button>
              <button type="button" onClick={onClose} className="admin-btn-secondary">
                ওয়েবসাইটে ফিরুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Logged In Dashboard
  return (
    <div className="admin-fullpage-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <div className="admin-nav-brand">
            <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid #fbbf24', background: '#fff' }} />
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.1 }}>খাঁটি সওদা</h2>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>www.khatisaoda.com</span>
            </div>
          </div>

          {/* Real-time Online Pill */}
          <div className="live-active-tag hide-mobile" onClick={() => setActiveTab('visitors')} style={{ cursor: 'pointer' }} title="লাইভ ভিজিটর দেখতে ক্লিক করুন">
            <span className="live-pulse-dot"></span>
            <span>{visitorMetrics.activeCount} জন অনলাইনে</span>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <div className="admin-header-tabs">
          <button 
            className={`admin-nav-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} />
            <span>অর্ডারসমূহ</span>
            <span className="tab-badge">{orders.length}</span>
          </button>

          <button 
            className={`admin-nav-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <ShoppingBag size={16} />
            <span>পণ্য আপলোড</span>
            <span className="tab-badge" style={{ background: '#059669' }}>{productsList.length}</span>
          </button>

          <button 
            className={`admin-nav-tab-btn ${activeTab === 'visitors' ? 'active' : ''}`}
            onClick={() => setActiveTab('visitors')}
          >
            <Users size={16} />
            <span>লাইভ ভিজিটর</span>
            <span className="tab-badge" style={{ background: '#10b981' }}>{visitorMetrics.activeCount} লাইভ</span>
          </button>

          <button 
            className={`admin-nav-tab-btn pixel-tab ${activeTab === 'pixel' ? 'active' : ''}`}
            onClick={() => setActiveTab('pixel')}
          >
            <Share2 size={16} />
            <span>ফেসবুক পিক্সেল</span>
            <span className="tab-badge" style={{ background: '#3b82f6' }}>Active</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="admin-nav-right">
          <button 
            onClick={activeTab === 'orders' ? loadOrders : activeTab === 'products' ? () => showToast('পণ্য তালিকা রিফ্রেশ হয়েছে!') : activeTab === 'visitors' ? refreshVisitorMetrics : refreshPixelLogs} 
            className="admin-icon-btn" 
            title="রিফ্রেশ করুন"
          >
            <RefreshCw size={16} />
            <span className="hide-mobile">রিফ্রেশ</span>
          </button>

          <button 
            onClick={activeTab === 'visitors' ? handleExportVisitorsCSV : activeTab === 'products' ? handleExportProductsCSV : handleExportCSV} 
            className="admin-icon-btn success" 
            title="এক্সেল/CSV ডাউনলোড"
          >
            <Download size={16} />
            <span className="hide-mobile">CSV ডাউনলোড</span>
          </button>

          <button onClick={onClose} className="admin-icon-btn" title="স্টোর প্রিভিউ">
            <ExternalLink size={16} />
            <span className="hide-mobile">স্টোরে ফিরুন</span>
          </button>

          <button onClick={handleLogout} className="admin-icon-btn danger" title="লগআউট">
            <LogOut size={16} />
            <span className="hide-mobile">লগআউট</span>
          </button>
        </div>
      </header>

      <main className="admin-main-container">

        {/* ============================================================ */}
        {/* TAB 1: ORDERS MANAGEMENT                                    */}
        {/* ============================================================ */}
        {activeTab === 'orders' && (
          <>
            {/* Email Notification Notice Banner */}
            <div className="admin-email-alert-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.4rem' }}>✉️</span>
                <div>
                  <strong>অটোমেটিক ইমেইল নোটিফিকেশন সার্ভিস সক্রিয়:</strong>
                  <p>প্রতিটি অর্ডার ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে আপনার ইমেইলে (<code>munnastsc@gmail.com</code>) পাঠানো হচ্ছে এবং নিচের তালিকায় রিয়েল-টাইমে যোগ হচ্ছে।</p>
                </div>
              </div>
            </div>

            {/* Analytics Statistics Cards */}
            <section className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-icon bg-emerald">
                  <Package size={22} color="#059669" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">মোট অর্ডার</span>
                  <h3 className="metric-value">{totalOrdersCount} টি</h3>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-amber">
                  <Clock size={22} color="#d97706" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">অপেক্ষমাণ (Pending)</span>
                  <h3 className="metric-value text-amber">{pendingCount} টি</h3>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-blue">
                  <Truck size={22} color="#2563eb" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">কুরিয়ারে ট্রানজিট</span>
                  <h3 className="metric-value text-blue">{shippedCount} টি</h3>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-gold">
                  <DollarSign size={22} color="#b45309" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">মোট বিক্রয় মূল্য</span>
                  <h3 className="metric-value text-gold">৳ {totalRevenue.toLocaleString('bn-BD')}</h3>
                </div>
              </div>
            </section>

            {/* Orders Controls: Search & Filters */}
            <section className="admin-table-controls">
              <div className="admin-search-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="অর্ডার আইডি, কাস্টমারের নাম, ফোন বা ঠিকানা খুঁজুন..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="search-clear-btn">✕</button>
                )}
              </div>

              <div className="admin-filter-pills">
                <button 
                  className={`filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  সব অর্ডার ({orders.length})
                </button>
                <button 
                  className={`filter-pill pending ${statusFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('pending')}
                >
                  পেন্ডিং ({pendingCount})
                </button>
                <button 
                  className={`filter-pill confirmed ${statusFilter === 'confirmed' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('confirmed')}
                >
                  কনফার্মড ({confirmedCount})
                </button>
                <button 
                  className={`filter-pill shipped ${statusFilter === 'shipped' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('shipped')}
                >
                  কুরিয়ারে ({shippedCount})
                </button>
              </div>
            </section>

            {/* Orders Table */}
            <section className="admin-orders-card">
              <div className="table-responsive">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>অর্ডার নং ও সময়</th>
                      <th>কাস্টমার বিবরণ</th>
                      <th>অর্ডারকৃত পণ্যসমূহ</th>
                      <th>ডেলিভারি ও পেমেন্ট</th>
                      <th>সর্বমোট বিল</th>
                      <th>স্ট্যাটাস</th>
                      <th>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                          কোনো অর্ডার পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => {
                        const statusClass = order.status || 'pending';
                        const formattedDate = new Date(order.date).toLocaleDateString('bn-BD', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        });

                        return (
                          <tr key={order.orderId} className={`order-row ${statusClass}`}>
                            <td>
                              <strong className="order-id-tag">{order.orderId}</strong>
                              <span className="order-time-text">{formattedDate}</span>
                            </td>

                            <td>
                              <div className="customer-info-box">
                                <strong className="customer-name">{order.customerName}</strong>
                                <a href={`tel:${order.customerPhone}`} className="customer-phone-link">
                                  <Phone size={12} />
                                  <span>{order.customerPhone}</span>
                                </a>
                                <p className="customer-address-text">{order.customerAddress}</p>
                              </div>
                            </td>

                            <td>
                              <div className="order-items-snippet">
                                {(order.items || []).map((it, idx) => (
                                  <div key={idx} className="item-row">
                                    <span>• {it.product.name}</span>
                                    <span className="item-qty-tag">[{it.product.weight}] × {it.qty}</span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td>
                              <div className="delivery-badge-group">
                                <span className="delivery-zone-pill">
                                  {order.deliveryArea === 'dhaka' ? 'ঢাকা সিটি (৳৬০)' : 'ঢাকার বাইরে (৳১২০)'}
                                </span>
                                <span className={`payment-pill ${order.paymentMethod}`}>
                                  {order.paymentMethod === 'bkash' ? 'বিকাশ' : order.paymentMethod === 'nagad' ? 'নগদ' : 'ক্যাশ অন ডেলিভারি'}
                                </span>
                                {order.trxId && (
                                  <span className="trx-code">TrxID: {order.trxId}</span>
                                )}
                              </div>
                            </td>

                            <td>
                              <strong className="price-tag">৳{order.grandTotal}</strong>
                            </td>

                            <td>
                              <select 
                                value={order.status || 'pending'} 
                                onChange={e => handleUpdateStatus(order.orderId, e.target.value)}
                                className={`status-select ${order.status || 'pending'}`}
                              >
                                <option value="pending">⏳ পেন্ডিং</option>
                                <option value="confirmed">✓ কনফার্মড</option>
                                <option value="shipped">🚚 কুরিয়ারে</option>
                                <option value="delivered">🎉 ডেলিভার্ড</option>
                                <option value="cancelled">✕ বাতিল</option>
                              </select>
                            </td>

                            <td>
                              <div className="action-buttons-group">
                                <a 
                                  href={`https://wa.me/88${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${order.customerName} সাহেব, খাঁটি সওদা (www.khatisaoda.com) থেকে আপনার অর্ডার ${order.orderId} এর বিষয়ে যোগাযোগ করা হচ্ছে।`)}`}
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="action-icon-btn whatsapp"
                                  title="কাস্টমারকে হোয়াটসঅ্যাপে মেসেজ দিন"
                                >
                                  <MessageSquare size={15} />
                                </a>

                                <a 
                                  href={`tel:${order.customerPhone}`}
                                  className="action-icon-btn phone"
                                  title="সরাসরি কল দিন"
                                >
                                  <Phone size={15} />
                                </a>

                                <button 
                                  onClick={() => setSelectedInvoiceOrder(order)}
                                  className="action-icon-btn invoice"
                                  title="মেমো / ইনভয়েস প্রিন্ট"
                                >
                                  <Printer size={15} />
                                </button>

                                <button 
                                  onClick={() => handleDeleteOrder(order.orderId)}
                                  className="action-icon-btn delete"
                                  title="অর্ডার মুছুন"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PRODUCT UPLOAD & CATALOG MANAGEMENT                   */}
        {/* ============================================================ */}
        {activeTab === 'products' && (
          <>
            {/* Products Action Strip */}
            <div className="admin-email-alert-strip" style={{ background: '#f0fdf4', borderColor: '#10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <strong>পণ্য আপলোড ও ক্যাটালগ কন্ট্রোল সেন্টার:</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#334155' }}>
                      নতুন পণ্য যুক্ত করুন, মূল্য ও অফার পরিবর্তন করুন অথবা সরাসরি স্টক ইন/আউট করুন। এটি ওয়েবসাইটে তৎক্ষণাৎ লাইভ হবে।
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    onClick={handleOpenNewProductModal}
                    className="admin-btn-primary"
                    style={{ background: '#059669', borderColor: '#047857', padding: '9px 18px', fontSize: '0.9rem' }}
                  >
                    <Plus size={18} />
                    <span>নতুন পণ্য আপলোড করুন</span>
                  </button>

                  <button 
                    onClick={handleResetDefaultProducts}
                    className="admin-icon-btn"
                    title="ডিফল্ট ক্যাটালগ রিস্টোর করুন"
                    style={{ background: '#ffffff' }}
                  >
                    <RotateCcw size={15} />
                    <span className="hide-mobile">ডিফল্ট রিস্টোর</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Statistics Cards for Products */}
            <section className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-icon bg-emerald">
                  <ShoppingBag size={22} color="#059669" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">মোট সক্রিয় পণ্য</span>
                  <strong className="metric-value">{productsList.length} টি</strong>
                  <span className="metric-subtext">অনলাইন শপে লাইভ প্রদর্শিত</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-amber">
                  <Layers size={22} color="#d97706" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">ক্যাটাগরি সংখ্যা</span>
                  <strong className="metric-value">{new Set(productsList.map(p => p.category)).size} টি</strong>
                  <span className="metric-subtext">বিভিন্ন ক্যাটাগরির প্রাকৃতিক খাদ্য</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-blue">
                  <CheckCircle2 size={22} color="#2563eb" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">ইন-স্টক পণ্য</span>
                  <strong className="metric-value">{productsList.filter(p => (Number(p.stock) || 0) > 0).length} টি</strong>
                  <span className="metric-subtext">গ্রাহকরা সরাসরি অর্ডার করতে পারবেন</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon bg-rose">
                  <AlertCircle size={22} color="#e11d48" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">স্টক আউট পণ্য</span>
                  <strong className="metric-value">{productsList.filter(p => !(Number(p.stock) || 0) || Number(p.stock) <= 0).length} টি</strong>
                  <span className="metric-subtext">রি-স্টক প্রয়োজন</span>
                </div>
              </div>
            </section>

            {/* Search & Filter Controls */}
            <section className="admin-filters-bar">
              <div className="admin-search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="পণ্যের নাম (বাংলা বা ইংরেজি) অথবা অঞ্চল দিয়ে খুঁজুন..." 
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                />
                {productSearch && (
                  <button onClick={() => setProductSearch('')} className="clear-search-btn">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="admin-filter-group">
                <Filter size={16} />
                <select 
                  value={productCategoryFilter} 
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="admin-select"
                >
                  <option value="all">সকল ক্যাটাগরি ({productsList.length})</option>
                  {STORE_CATEGORIES.map(c => {
                    const count = productsList.filter(p => p.category === c.id).length;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name} ({count})
                      </option>
                    );
                  })}
                </select>

                <select 
                  value={productStockFilter} 
                  onChange={e => setProductStockFilter(e.target.value)}
                  className="admin-select"
                >
                  <option value="all">সকল স্টক স্ট্যাটাস</option>
                  <option value="instock">শুধুমাত্র ইন-স্টক</option>
                  <option value="outofstock">শুধুমাত্র স্টক আউট</option>
                </select>
              </div>
            </section>

            {/* Products Table */}
            <section className="admin-table-container">
              <div className="admin-products-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>ছবি</th>
                      <th>পণ্যের নাম ও বিবরণ</th>
                      <th>ক্যাটাগরি</th>
                      <th>বিক্রয় মূল্য</th>
                      <th>স্টক স্ট্যাটাস</th>
                      <th style={{ textAlign: 'center', width: '130px' }}>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductsList.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
                          <ShoppingBag size={42} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                          <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: '#334155' }}>কোনো পণ্য পাওয়া যায়নি</p>
                          <p style={{ margin: '4px 0 16px', fontSize: '0.85rem' }}>আপনার সার্চ বা ক্যাটাগরি ফিল্টারে মিল পাওয়া যায়নি অথবা এখনো কোনো পণ্য আপলোড করা হয়নি।</p>
                          <button onClick={handleOpenNewProductModal} className="admin-btn-primary">
                            <Plus size={16} />
                            <span>প্রথম পণ্যটি আপলোড করুন</span>
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredProductsList.map(product => {
                        const inStock = (Number(product.stock) || 0) > 0;
                        const catObj = STORE_CATEGORIES.find(c => c.id === product.category) || { name: product.category, icon: '📦' };
                        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                        const discountPercent = hasDiscount 
                          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                          : 0;

                        return (
                          <tr key={product.id} className="product-row">
                            <td>
                              <div style={{ position: 'relative', width: '52px', height: '52px' }}>
                                <img 
                                  src={product.image || '/images/satkhira_ghee.jpg'} 
                                  alt={product.name} 
                                  className="admin-product-thumb"
                                  onError={(e) => { e.target.src = '/images/satkhira_ghee.jpg'; }}
                                />
                                {product.badge && (
                                  <span style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: product.badgeColor === 'red' ? '#dc2626' : product.badgeColor === 'green' ? '#059669' : '#d97706',
                                    color: '#ffffff',
                                    fontSize: '0.58rem',
                                    padding: '1px 4px',
                                    borderRadius: '4px',
                                    whiteSpace: 'nowrap',
                                    fontWeight: 700,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                  }}>
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td>
                              <div className="admin-product-name-cell">
                                <span className="admin-product-name-bn">{product.name}</span>
                                <div className="admin-product-meta">
                                  {product.nameEn && <span>{product.nameEn}</span>}
                                  {product.weight && <span>• {product.weight}</span>}
                                  {product.origin && <span>• 📍 {product.origin}</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
                                  {product.isSunnah && (
                                    <span style={{ background: '#ecfdf5', color: '#047857', fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                      🌿 সুন্নতি
                                    </span>
                                  )}
                                  {product.isBestseller && (
                                    <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                      ⭐ বেস্টসেলার
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className="admin-product-cat-pill">
                                <span>{catObj.icon}</span>
                                <span>{catObj.name}</span>
                              </span>
                            </td>

                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <strong style={{ fontSize: '1.05rem', color: '#064e3b' }}>
                                  ৳{product.price}
                                </strong>
                                {hasDiscount && (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                                    <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>৳{product.originalPrice}</span>
                                    <span style={{ color: '#dc2626', fontWeight: 700 }}>(-{discountPercent}%)</span>
                                  </div>
                                )}
                              </div>
                            </td>

                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                                <button 
                                  type="button"
                                  onClick={() => handleToggleStock(product.id)}
                                  className={`admin-stock-toggle-btn ${inStock ? 'in-stock' : 'out-of-stock'}`}
                                  title="ক্লিক করে স্টক অন/অফ করুন"
                                >
                                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: inStock ? '#16a34a' : '#dc2626' }}></span>
                                  <span>{inStock ? `ইন-স্টক (${product.stock} টি)` : 'স্টক আউট'}</span>
                                </button>
                                <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>ক্লিক করে টগল করুন</span>
                              </div>
                            </td>

                            <td>
                              <div className="action-buttons-cell" style={{ justifyContent: 'center' }}>
                                <button 
                                  onClick={() => handleOpenEditProductModal(product)} 
                                  className="action-btn view-btn" 
                                  title="এডিট করুন"
                                  style={{ background: '#ecfdf5', color: '#047857' }}
                                >
                                  <Edit2 size={15} />
                                </button>

                                <button 
                                  onClick={() => handleDeleteProduct(product.id)} 
                                  className="action-btn delete-btn" 
                                  title="ডিলিট করুন"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/* TAB 2: LIVE VISITORS & TRAFFIC REPORT                       */}
        {/* ============================================================ */}
        {activeTab === 'visitors' && (
          <>
            {/* Live Visitors Notice Strip */}
            <div className="admin-email-alert-strip" style={{ background: '#ecfdf5', borderColor: '#10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="live-pulse-dot" style={{ width: '12px', height: '12px' }}></span>
                  <div>
                    <strong>রিয়েল-টাইম ভিজিটর ট্র্যাকিং সক্রিয়:</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>কে কোন পেজ ব্রাউজ করছেন, কোথা থেকে এসেছেন এবং ফেসবুকে কোন বিজ্ঞাপন/পোস্টের মাধ্যমে ঢুকেছেন তা লাইভ দেখা যাচ্ছে।</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={toggleAudioAlert} 
                    className={`sound-toggle-btn ${audioAlertEnabled ? 'on' : 'off'}`}
                    title="নতুন ভিজিটর প্রবেশ করলে সাউন্ড হবে"
                  >
                    {audioAlertEnabled ? <Bell size={15} /> : <BellOff size={15} />}
                    <span>সাউন্ড অ্যালার্ট: {audioAlertEnabled ? 'চালু' : 'বন্ধ'}</span>
                  </button>
                  <button onClick={handleClearVisitors} className="action-icon-btn delete" title="হিস্ট্রি পরিষ্কার করুন">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Visitors KPI Grid */}
            <section className="admin-metrics-grid">
              <div className="admin-metric-card" style={{ borderLeft: '4px solid #10b981' }}>
                <div className="metric-icon" style={{ background: '#ecfdf5' }}>
                  <Activity size={22} color="#10b981" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">🟢 লাইভ সক্রিয় ভিজিটর</span>
                  <h3 className="metric-value" style={{ color: '#047857' }}>{visitorMetrics.activeCount} জন অনলাইনে</h3>
                </div>
              </div>

              <div className="admin-metric-card" style={{ borderLeft: '4px solid #2563eb' }}>
                <div className="metric-icon" style={{ background: '#eff6ff' }}>
                  <Users size={22} color="#2563eb" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">আজকের মোট ভিজিটর</span>
                  <h3 className="metric-value" style={{ color: '#1d4ed8' }}>{visitorMetrics.todayVisitors} জন</h3>
                </div>
              </div>

              <div className="admin-metric-card" style={{ borderLeft: '4px solid #d97706' }}>
                <div className="metric-icon" style={{ background: '#fef3c7' }}>
                  <Eye size={22} color="#d97706" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">আজকের মোট পেজভিউ</span>
                  <h3 className="metric-value" style={{ color: '#b45309' }}>{visitorMetrics.todayPageviews} বার</h3>
                </div>
              </div>

              <div className="admin-metric-card" style={{ borderLeft: '4px solid #1877f2' }}>
                <div className="metric-icon" style={{ background: '#e7f0fd' }}>
                  <Share2 size={22} color="#1877f2" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">ফেসবুক ট্রাফিক সোর্স</span>
                  <h3 className="metric-value" style={{ color: '#1877f2' }}>{visitorMetrics.fbVisitorsToday} জন</h3>
                </div>
              </div>
            </section>

            {/* Filter and Search Bar */}
            <section className="admin-table-controls">
              <div className="admin-search-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="ভিজিটর আইডি, সোর্স, ডিভাইস বা দেখা পৃষ্ঠা খুঁজুন..." 
                  value={visitorSearch}
                  onChange={e => setVisitorSearch(e.target.value)}
                  className="admin-search-input"
                />
                {visitorSearch && (
                  <button onClick={() => setVisitorSearch('')} className="search-clear-btn">✕</button>
                )}
              </div>

              <div className="admin-filter-pills">
                <button 
                  className={`filter-pill ${visitorFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setVisitorFilter('all')}
                >
                  সব ভিজিটর ({visitorMetrics.sessions.length})
                </button>
                <button 
                  className={`filter-pill confirmed ${visitorFilter === 'active' ? 'active' : ''}`}
                  onClick={() => setVisitorFilter('active')}
                >
                  🟢 শুধু অ্যাক্টিভ ({visitorMetrics.sessions.filter(s => s.isActive).length})
                </button>
                <button 
                  className={`filter-pill shipped ${visitorFilter === 'facebook' ? 'active' : ''}`}
                  onClick={() => setVisitorFilter('facebook')}
                >
                  🌐 ফেসবুক ট্রাফিক ({visitorMetrics.sessions.filter(s => s.isFacebook).length})
                </button>
                <button 
                  className={`filter-pill pending ${visitorFilter === 'mobile' ? 'active' : ''}`}
                  onClick={() => setVisitorFilter('mobile')}
                >
                  📱 মোবাইল ভিজিটর
                </button>
              </div>
            </section>

            {/* Visitors Table */}
            <section className="admin-orders-card">
              <div className="table-responsive">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>ভিজিটর আইডি</th>
                      <th>লাইভ স্ট্যাটাস</th>
                      <th>ট্রাফিক সোর্স (Source)</th>
                      <th>ডিভাইস ও ব্রাউজার</th>
                      <th>বর্তমান পৃষ্ঠা / অ্যাকশন</th>
                      <th>ভিউ সংখ্যা</th>
                      <th>কার্যকলাপ হিস্ট্রি</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitors.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                          কোনো ভিজিটর ডাটা নেই বা ফিল্টারে মিল পাওয়া যায়নি।
                        </td>
                      </tr>
                    ) : (
                      filteredVisitors.map(session => {
                        return (
                          <tr key={session.sid} className={`order-row ${session.isActive ? 'active-row' : ''}`}>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <strong className="order-id-tag">{session.vid}</strong>
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                  সেশন: {session.sid} {session.isNewVisitor && <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '1px 4px', borderRadius: '4px', fontWeight: 700 }}>🆕 নতুন</span>}
                                </span>
                              </div>
                            </td>

                            <td>
                              {session.isActive ? (
                                <div className="live-active-tag">
                                  <span className="live-pulse-dot"></span>
                                  <span>অনলাইনে আছেন</span>
                                </div>
                              ) : (
                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                  <span>{session.timeAgo}</span>
                                </div>
                              )}
                            </td>

                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span className={`visitor-source-badge ${session.sourceCategory || 'other'}`}>
                                  {session.isFacebook ? '🌐 ' : session.sourceCategory === 'google' ? '🔍 ' : '🚀 '}
                                  {session.source}
                                </span>
                                {session.sourceDetail && (
                                  <span style={{ fontSize: '0.68rem', color: '#64748b', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={session.sourceDetail}>
                                    {session.sourceDetail}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <div className="device-pill">
                                  {(session.device || '').includes('Mobile') || (session.device || '').includes('মোবাইল') ? <Smartphone size={13} color="#059669" /> : <Monitor size={13} color="#2563eb" />}
                                  <span>{session.device}</span>
                                </div>
                                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                  {session.os} • {session.browser} ({session.screen})
                                </span>
                              </div>
                            </td>

                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span className={`visitor-action-pill ${session.currentPage?.includes('অর্ডার') || session.currentPage?.includes('চেকআউট') ? 'highlight' : ''}`}>
                                  {session.currentPage || 'হোমপেজ ব্রাউজ করছে'}
                                </span>
                                {session.currentDetail && (
                                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                    {session.currentDetail}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td>
                              <strong style={{ fontSize: '0.9rem', color: '#064e3b' }}>{session.pageviews || 1} বার</strong>
                            </td>

                            <td>
                              <button 
                                onClick={() => setSelectedSessionHistory(session)}
                                className="action-icon-btn invoice"
                                title="সম্পূর্ণ অ্যাকশন হিস্ট্রি দেখুন"
                              >
                                <Eye size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/* TAB 3: FACEBOOK PIXEL & MARKETING                            */}
        {/* ============================================================ */}
        {activeTab === 'pixel' && (
          <>
            {/* Facebook Connection Notice Card */}
            <div className="admin-email-alert-strip" style={{ background: '#eff6ff', borderColor: '#3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 800 }}>
                    f
                  </div>
                  <div>
                    <strong>অফিসিয়াল ফেসবুক পেজ ও মেটা পিক্সেল ইন্টিগ্রেশন:</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      সংযুক্ত পেজ: <code>www.facebook.com/khatisaoda</code> | মেটা কনভার্সন ট্র্যাকিং ও রিটার্গেটিং সক্রিয়।
                    </p>
                  </div>
                </div>

                <a 
                  href="https://www.facebook.com/khatisaoda" 
                  target="_blank" 
                  rel="noreferrer"
                  className="pixel-save-btn"
                  style={{ textDecoration: 'none', background: '#1877f2' }}
                >
                  <span>ফেসবুক পেজ খুলুন</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Pixel Config & Tester Grid */}
            <section className="pixel-settings-grid">
              {/* Card 1: Pixel ID Management */}
              <div className="pixel-card">
                <div className="pixel-card-header">
                  <h3>
                    <Share2 size={18} color="#2563eb" />
                    <span>মেটা পিক্সেল আইডি কনফিগারেশন</span>
                  </h3>
                  <span className="live-active-tag">
                    <span className="live-pulse-dot"></span>
                    <span>সক্রিয় ও কানেক্টেড</span>
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#475569', marginBottom: '12px' }}>
                  আপনার মেটা ইভেন্টস ম্যানেজার (Meta Events Manager) থেকে প্রাপ্ত পিক্সেল আইডিটি এখানে বসিয়ে সেভ করুন। সাইটের সকল ই-কমার্স ইভেন্ট (PageView, AddToCart, Purchase ইত্যাদি) সরাসরি আপনার ফেসবুক পেজ ও বিজ্ঞাপনে ট্র্যাক হবে।
                </p>

                <form onSubmit={handleSavePixelId}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    মেটা পিক্সেল আইডি (Pixel ID)
                  </label>
                  <div className="pixel-input-group">
                    <input 
                      type="text" 
                      value={pixelInput}
                      onChange={e => setPixelInput(e.target.value)}
                      placeholder="যেমন: 123849105429184"
                      className="pixel-input"
                      required
                    />
                    <button type="submit" className="pixel-save-btn">
                      <Check size={16} />
                      <span>সেভ করুন</span>
                    </button>
                  </div>
                </form>

                <div style={{ marginTop: '14px', fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>বর্তমান সক্রিয় আইডি:</span>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: 700, color: '#0f172a' }}>
                    {currentPixelId}
                  </code>
                </div>
              </div>

              {/* Card 2: Live Pixel Event Tester */}
              <div className="pixel-card">
                <div className="pixel-card-header">
                  <h3>
                    <Play size={18} color="#059669" />
                    <span>লাইভ পিক্সেল ইভেন্ট টেস্ট করুন</span>
                  </h3>
                  <button onClick={clearPixelEventLogs} className="action-icon-btn delete" title="লগ ক্লিয়ার করুন">
                    <Trash2 size={15} />
                  </button>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#475569', marginBottom: '10px' }}>
                  নিচের বাটনে ক্লিক করে সাথে সাথে একটি টেস্ট পিক্সেল ইভেন্ট পাঠিয়ে নিশ্চিত হতে পারেন ফেসবুক সঠিকভাবে ডাটা গ্রহণ করছে কিনা:
                </p>

                <div className="pixel-test-bar">
                  <button 
                    type="button" 
                    onClick={() => handleFireTestPixelEvent('PageView')} 
                    className="pixel-test-btn"
                  >
                    📄 টেস্ট PageView
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFireTestPixelEvent('ViewContent')} 
                    className="pixel-test-btn"
                  >
                    🔍 টেস্ট ViewContent
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFireTestPixelEvent('AddToCart')} 
                    className="pixel-test-btn"
                  >
                    🛒 টেস্ট AddToCart
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleFireTestPixelEvent('Purchase')} 
                    className="pixel-test-btn"
                    style={{ background: '#ecfdf5', borderColor: '#10b981', color: '#065f46' }}
                  >
                    🎉 টেস্ট Purchase (৳3010)
                  </button>
                </div>

                <div style={{ marginTop: '16px', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <small style={{ color: '#475569', display: 'block', lineHeight: 1.4 }}>
                    💡 <strong>টিপস:</strong> গুগল ক্রোম ব্রাউজারে <strong>"Meta Pixel Helper"</strong> এক্সটেনশন ইনস্টল করে রাখলে ব্রাউজারের উপরে নীল আইকনে প্রতিটি পিক্সেল ইভেন্ট দেখতে পারবেন।
                  </small>
                </div>
              </div>
            </section>

            {/* Live Pixel Event Logs Table */}
            <section className="admin-orders-card">
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={17} color="#2563eb" />
                  <span>রিয়েল-টাইম ফায়ার হওয়া পিক্সেল ইভেন্টস লগ ({pixelEvents.length} টি)</span>
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে</span>
              </div>

              <div className="table-responsive">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>ইভেন্ট নং ও সময়</th>
                      <th>ইভেন্টের নাম (Event Name)</th>
                      <th>পিক্সেল আইডি</th>
                      <th>বিস্তারিত প্যারামিটার (Parameters)</th>
                      <th>স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pixelEvents.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                          এখনো কোনো পিক্সেল ইভেন্ট ফায়ার হয়নি। স্টোরে ভিজিট করলে বা উপরের টেস্ট বাটনে ক্লিক করলে এখানে ইভেন্ট দেখা যাবে।
                        </td>
                      </tr>
                    ) : (
                      pixelEvents.map(evt => (
                        <tr key={evt.id}>
                          <td>
                            <strong className="order-id-tag">{evt.id}</strong>
                            <span className="order-time-text">{evt.formattedTime}</span>
                          </td>

                          <td>
                            <span style={{ 
                              display: 'inline-block',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              background: evt.eventName === 'Purchase' ? '#ecfdf5' : evt.eventName === 'AddToCart' ? '#fef3c7' : '#eff6ff',
                              color: evt.eventName === 'Purchase' ? '#047857' : evt.eventName === 'AddToCart' ? '#b45309' : '#1d4ed8'
                            }}>
                              {evt.eventName}
                            </span>
                          </td>

                          <td>
                            <code style={{ fontSize: '0.78rem', color: '#475569' }}>{evt.pixelId}</code>
                          </td>

                          <td>
                            <span style={{ fontSize: '0.78rem', color: '#334155', fontFamily: 'monospace' }}>
                              {JSON.stringify(evt.params)}
                            </span>
                          </td>

                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', color: '#059669', fontWeight: 700 }}>
                              <CheckCircle2 size={13} />
                              <span>Fired</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>

      {/* ============================================================ */}
      {/* TIMELINE DRILLDOWN MODAL FOR A VISITOR                        */}
      {/* ============================================================ */}
      {selectedSessionHistory && (
        <div className="visitor-detail-modal" onClick={() => setSelectedSessionHistory(null)}>
          <div className="visitor-detail-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#064e3b' }}>
                  ভিজিটর কার্যক্রম হিস্ট্রি ({selectedSessionHistory.vid})
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  সেশন: {selectedSessionHistory.sid} | সোর্স: {selectedSessionHistory.source}
                </span>
              </div>
              <button onClick={() => setSelectedSessionHistory(null)} className="drawer-close-btn">
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '14px' }}>
              <div><strong>ডিভাইস:</strong> {selectedSessionHistory.device} ({selectedSessionHistory.os} • {selectedSessionHistory.browser})</div>
              <div><strong>প্রথম প্রবেশ:</strong> {selectedSessionHistory.formattedFirstSeen}</div>
              <div><strong>সর্বশেষ সক্রিয়:</strong> {selectedSessionHistory.formattedLastActive}</div>
              <div><strong>মোট পেজভিউ:</strong> {selectedSessionHistory.pageviews} বার</div>
            </div>

            <h4 style={{ fontSize: '0.9rem', color: '#1e293b', marginBottom: '6px' }}>ভিজিটরের ক্লিকের টাইমলাইন:</h4>
            <div className="visitor-timeline-list">
              {(selectedSessionHistory.actions || []).map((act, i) => (
                <div key={i} className="visitor-timeline-item">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{act.action}</strong>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{act.formattedTime}</span>
                  </div>
                  {act.detail && (
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.76rem', color: '#475569' }}>
                      {act.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* INVOICE PRINT MODAL                                          */}
      {/* ============================================================ */}
      {selectedInvoiceOrder && (
        <div className="invoice-modal-overlay" onClick={() => setSelectedInvoiceOrder(null)}>
          <div className="invoice-modal-paper" onClick={e => e.stopPropagation()}>
            <div className="invoice-print-actions">
              <button onClick={() => window.print()} className="print-btn">
                <Printer size={16} />
                <span>প্রিন্ট মেমো</span>
              </button>
              <button onClick={() => setSelectedInvoiceOrder(null)} className="close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="invoice-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="/images/khatisaoda_logo.png" alt="খাঁটি সওদা" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid #064e3b', background: '#fff' }} />
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#064e3b' }}>খাঁটি সওদা</h2>
                  <p style={{ margin: '2px 0', fontSize: '0.85rem', color: '#475569' }}>www.khatisaoda.com | খাঁটি প্রাকৃতিক খাদ্য ও সুন্নাহ লাইফস্টাইল</p>
                  <small style={{ color: '#64748b' }}>হটলাইন: 01714-740430 | বনানী, ঢাকা</small>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ color: '#064e3b' }}>অর্ডার মেমো</h3>
                <p><strong>আইডি:</strong> {selectedInvoiceOrder.orderId}</p>
                <p><strong>তারিখ:</strong> {new Date(selectedInvoiceOrder.date).toLocaleDateString('bn-BD')}</p>
              </div>
            </div>

            <hr style={{ margin: '14px 0', borderColor: '#e2e8f0' }} />

            <div className="invoice-customer-grid">
              <div>
                <strong>গ্রাহকের তথ্য:</strong>
                <p>{selectedInvoiceOrder.customerName}</p>
                <p>ফোন: {selectedInvoiceOrder.customerPhone}</p>
                <p>ঠিকানা: {selectedInvoiceOrder.customerAddress}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>ডেলিভারি বিবরণ:</strong>
                <p>এলাকা: {selectedInvoiceOrder.deliveryArea === 'dhaka' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'}</p>
                <p>পেমেন্ট: {selectedInvoiceOrder.paymentMethod.toUpperCase()}</p>
              </div>
            </div>

            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>পণ্য বিবরণ</th>
                  <th>পরিমাণ</th>
                  <th>দর</th>
                  <th>মোট</th>
                </tr>
              </thead>
              <tbody>
                {(selectedInvoiceOrder.items || []).map((it, idx) => (
                  <tr key={idx}>
                    <td>{it.product.name} [{it.product.weight}]</td>
                    <td>{it.qty}</td>
                    <td>৳{it.product.price}</td>
                    <td>৳{it.product.price * it.qty}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={{ textAlign: 'right', fontWeight: 600 }}>ডেলিভারি চার্জ:</td>
                  <td style={{ fontWeight: 600 }}>৳{selectedInvoiceOrder.deliveryArea === 'dhaka' ? 60 : 120}</td>
                </tr>
                <tr style={{ background: '#f8fafc', fontSize: '1.05rem', fontWeight: 800 }}>
                  <td colSpan="3" style={{ textAlign: 'right', color: '#064e3b' }}>সর্বমোট প্রদেয়:</td>
                  <td style={{ color: '#064e3b' }}>৳{selectedInvoiceOrder.grandTotal}</td>
                </tr>
              </tbody>
            </table>

            <div className="invoice-footer-note">
              <p>✓ ধন্যবাদ আপনার অর্ডারের জন্য! খাঁটি জিনিস পৌঁছানোই আমাদের অঙ্গীকার।</p>
              <p>পার্সেল রিসিভ করার সময় চেক করে মূল্য পরিশোধ করুন।</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PRODUCT UPLOAD & EDIT MODAL                                  */}
      {/* ============================================================ */}
      {isProductModalOpen && (
        <div className="admin-product-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
          <div className="admin-product-modal-card" onClick={e => e.stopPropagation()}>
            <div className="admin-product-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="admin-modal-icon-badge">
                  <ShoppingBag size={20} color="#059669" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#064e3b', fontWeight: 800 }}>
                    {editingProduct ? '✏️ পণ্য এডিট ও আপডেট' : '➕ নতুন পণ্য আপলোড করুন'}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    {editingProduct ? `আইডি #${editingProduct.id} এর তথ্য পরিবর্তন করুন` : 'খাঁটি সওদা অনলাইন শপের পণ্য ক্যাটালগে সরাসরি যুক্ত করুন'}
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsProductModalOpen(false)} 
                className="admin-modal-close-btn"
                title="বন্ধ করুন"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="admin-product-form">
              {/* Row 1: Bangla & English Name */}
              <div className="admin-form-grid-2">
                <div className="form-group-admin">
                  <label>পণ্যের নাম (বাংলা) <span className="req">*</span></label>
                  <input 
                    type="text" 
                    placeholder="যেমন: সুন্দরবনের খাঁটি র' খলিশা ফুলের মধু" 
                    value={productFormData.name} 
                    onChange={e => setProductFormData({ ...productFormData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group-admin">
                  <label>পণ্যের নাম (English)</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: Raw Sundarban Khalisha Honey" 
                    value={productFormData.nameEn} 
                    onChange={e => setProductFormData({ ...productFormData, nameEn: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 2: Category, Weight, Origin */}
              <div className="admin-form-grid-3">
                <div className="form-group-admin">
                  <label>ক্যাটাগরি নির্বাচন <span className="req">*</span></label>
                  <select 
                    value={productFormData.category}
                    onChange={e => setProductFormData({ ...productFormData, category: e.target.value })}
                  >
                    {STORE_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-admin">
                  <label>ওজন / পরিমাপ <span className="req">*</span></label>
                  <input 
                    type="text" 
                    placeholder="যেমন: ১ কেজি / ৫০০ গ্রাম / ৬ মিলি" 
                    value={productFormData.weight} 
                    onChange={e => setProductFormData({ ...productFormData, weight: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-admin">
                  <label>উৎপত্তিস্থল (Sourcing Origin)</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: সাতক্ষীরা সদর / বুড়িগোয়ালিনী" 
                    value={productFormData.origin} 
                    onChange={e => setProductFormData({ ...productFormData, origin: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 3: Pricing & Stock */}
              <div className="admin-form-grid-3">
                <div className="form-group-admin">
                  <label>বিক্রয় মূল্য (৳) <span className="req">*</span></label>
                  <input 
                    type="number" 
                    placeholder="যেমন: ১০৫০" 
                    value={productFormData.price} 
                    onChange={e => setProductFormData({ ...productFormData, price: e.target.value })}
                    required
                    min="1"
                  />
                </div>

                <div className="form-group-admin">
                  <label>পূর্বের নিয়মিত মূল্য (৳)</label>
                  <input 
                    type="number" 
                    placeholder="যেমন: ১২৫০ (ছাড় দেখাতে)" 
                    value={productFormData.originalPrice} 
                    onChange={e => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                    min="1"
                  />
                </div>

                <div className="form-group-admin">
                  <label>মজুত পরিমাণ (স্টক)</label>
                  <input 
                    type="number" 
                    placeholder="যেমন: ২৫" 
                    value={productFormData.stock} 
                    onChange={e => setProductFormData({ ...productFormData, stock: e.target.value })}
                    min="0"
                  />
                </div>
              </div>

              {/* Row 4: Badge & Badge Color */}
              <div className="admin-form-grid-2">
                <div className="form-group-admin">
                  <label>বিশেষ ব্যাজ / অফার ট্যাগ</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: 🔥 হট ডিল / সাতক্ষীরার ঐতিহ্য / বেস্টসেলার" 
                    value={productFormData.badge} 
                    onChange={e => setProductFormData({ ...productFormData, badge: e.target.value })}
                  />
                </div>

                <div className="form-group-admin">
                  <label>ব্যাজের রং (Color)</label>
                  <select 
                    value={productFormData.badgeColor}
                    onChange={e => setProductFormData({ ...productFormData, badgeColor: e.target.value })}
                  >
                    <option value="gold">🥇 গোল্ডেন (Gold)</option>
                    <option value="green">🌿 এমারেল্ড সবুজ (Emerald)</option>
                    <option value="red">🔥 লাল (Hot Red)</option>
                    <option value="blue">💎 রয়েল ব্লু (Royal Blue)</option>
                    <option value="purple">👑 বেগুনি (Purple)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Product Image (File Upload & URL) */}
              <div className="admin-image-upload-section">
                <label className="section-label">
                  <ImageIcon size={15} />
                  <span>পণ্যের ছবি আপলোড ও প্রিভিউ</span>
                </label>

                <div className="admin-image-upload-grid">
                  {/* File Upload Zone */}
                  <label className={`admin-photo-dropzone ${imageUploadLoading ? 'loading' : ''}`}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileChange} 
                      style={{ display: 'none' }} 
                    />
                    <Upload size={28} className="upload-icon" />
                    <span className="dropzone-title">
                      {imageUploadLoading ? 'ছবি প্রসেস হচ্ছে...' : 'ছবি সিলেক্ট করতে ক্লিক করুন'}
                    </span>
                    <span className="dropzone-sub">মোবাইল বা পিসি থেকে ছবি নির্বাচন করুন (JPG, PNG, WebP)</span>
                  </label>

                  {/* Live Preview Card */}
                  <div className="admin-image-preview-box">
                    {productFormData.image ? (
                      <div className="preview-inner">
                        <img src={productFormData.image} alt="প্রিভিউ" />
                        <button 
                          type="button" 
                          onClick={() => setProductFormData({ ...productFormData, image: '' })}
                          className="preview-remove-btn"
                          title="ছবি মুছুন"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="preview-placeholder">
                        <ImageIcon size={32} color="#94a3b8" />
                        <span>ছবির প্রিভিউ এখানে দেখাবে</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alternative URL Input */}
                <div className="form-group-admin" style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#64748b' }}>অথবা সরাসরি ছবির লিঙ্ক (Image URL) দিন:</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: /images/satkhira_ghee.jpg অথবা https://.../photo.jpg" 
                    value={productFormData.image} 
                    onChange={e => setProductFormData({ ...productFormData, image: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 6: Description & Benefits */}
              <div className="admin-form-grid-2">
                <div className="form-group-admin">
                  <label>সংক্ষিপ্ত বিবরণ (Description)</label>
                  <textarea 
                    rows={3} 
                    placeholder="পণ্য তৈরির পদ্ধতি, খাঁটি হওয়ার প্রমাণ ও বিশেষত্ব..." 
                    value={productFormData.description} 
                    onChange={e => setProductFormData({ ...productFormData, description: e.target.value })}
                  />
                </div>

                <div className="form-group-admin">
                  <label>মূল উপকারিতা (Key Benefits - প্রতি লাইনে একটি)</label>
                  <textarea 
                    rows={3} 
                    placeholder="যেমন:&#10;রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে&#10;হজমশক্তি ও মেটাবলিজম বাড়ায়" 
                    value={productFormData.benefits} 
                    onChange={e => setProductFormData({ ...productFormData, benefits: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 7: Flags (Sunnah & Bestseller) */}
              <div className="admin-checkboxes-row">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={productFormData.isSunnah} 
                    onChange={e => setProductFormData({ ...productFormData, isSunnah: e.target.checked })}
                  />
                  <span>🌿 সুন্নতি পণ্য (Prophetic Sunnah Diet)</span>
                </label>

                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={productFormData.isBestseller} 
                    onChange={e => setProductFormData({ ...productFormData, isBestseller: e.target.checked })}
                  />
                  <span>⭐ বেস্টসেলার ব্যাজ (Homepage Highlight)</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="admin-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsProductModalOpen(false)} 
                  className="admin-btn-secondary"
                >
                  বাতিল করুন
                </button>

                <button 
                  type="submit" 
                  className="admin-btn-primary"
                  style={{ background: '#059669', borderColor: '#047857' }}
                >
                  <Check size={18} />
                  <span>{editingProduct ? 'পরিবর্তন সংরক্ষণ করুন' : 'পণ্য ক্যাটালগে যুক্ত করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
