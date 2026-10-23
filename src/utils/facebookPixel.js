/**
 * খাঁটি সওদা (www.khatisaoda.com) - Official Meta / Facebook Pixel Integration
 * Connected to Facebook Page: https://www.facebook.com/khatisaoda
 * Supports dynamic Pixel ID configuration, standard eCommerce events & live event debugging.
 */

const PIXEL_STORAGE_KEY = 'khatisaoda_fb_pixel_id';
const PIXEL_EVENTS_KEY = 'khatisaoda_pixel_events_log';
export const DEFAULT_PIXEL_ID = '123849105429184'; // Meta Pixel ID for khatisaoda.com

// Get Active Pixel ID
export function getPixelId() {
  return localStorage.getItem(PIXEL_STORAGE_KEY) || DEFAULT_PIXEL_ID;
}

// Update Active Pixel ID
export function setPixelId(newId) {
  if (!newId) return;
  const cleaned = String(newId).trim();
  localStorage.setItem(PIXEL_STORAGE_KEY, cleaned);
  // Reinitialize pixel
  initFacebookPixel(cleaned);
  return cleaned;
}

// Initialize Meta Pixel Base Script
export function initFacebookPixel(customPixelId = null) {
  if (typeof window === 'undefined') return;

  const pixelId = customPixelId || getPixelId();

  // If fbq already initialized
  if (window.fbq) {
    try {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    } catch (e) {
      console.warn('Facebook Pixel init warning:', e);
    }
    return;
  }

  // Meta Pixel Base Code
  /* eslint-disable */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    try {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    } catch (err) {
      console.warn('Error running fbq init:', err);
    }
  }

  logPixelEvent('PageView', { page: window.location.pathname });
}

// Save event to local debug log for Admin verification
function logPixelEvent(eventName, params = {}) {
  try {
    const now = Date.now();
    const eventEntry = {
      id: 'EVT-' + Math.floor(1000 + Math.random() * 9000),
      eventName,
      params,
      timestamp: now,
      formattedTime: new Date(now).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      pixelId: getPixelId()
    };

    let events = [];
    const stored = localStorage.getItem(PIXEL_EVENTS_KEY);
    if (stored) events = JSON.parse(stored);
    events.unshift(eventEntry);
    if (events.length > 30) events.pop(); // keep last 30
    localStorage.setItem(PIXEL_EVENTS_KEY, JSON.stringify(events));

    // Dispatch event for Admin Panel live monitoring
    window.dispatchEvent(new CustomEvent('khatisaoda_pixel_event', { detail: eventEntry }));
  } catch (e) {
    console.error('Error logging pixel event:', e);
  }
}

// Track Generic Event with safety wrapper
export function trackPixelEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
    }
    logPixelEvent(eventName, params);
  } catch (err) {
    console.warn(`Facebook Pixel event [${eventName}] error:`, err);
  }
}

// 1. PageView Event
export function pixelPageView(pageName = 'Home') {
  trackPixelEvent('PageView', {
    page_name: pageName,
    url: window.location.href,
    site: 'www.khatisaoda.com'
  });
}

// 2. ViewContent Event (Product View)
export function pixelViewContent(product) {
  if (!product) return;
  trackPixelEvent('ViewContent', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    content_category: product.category,
    value: product.price,
    currency: 'BDT'
  });
}

// 3. AddToCart Event
export function pixelAddToCart(product, qty = 1, price = null) {
  if (!product) return;
  const finalPrice = price || product.price || 0;
  trackPixelEvent('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    content_type: 'product',
    content_category: product.category,
    value: finalPrice * qty,
    currency: 'BDT',
    quantity: qty
  });
}

// 4. InitiateCheckout Event
export function pixelInitiateCheckout(cartItems = [], grandTotal = 0) {
  trackPixelEvent('InitiateCheckout', {
    content_ids: cartItems.map(item => item.product?.id || item.id),
    content_type: 'product',
    num_items: cartItems.length,
    value: grandTotal,
    currency: 'BDT'
  });
}

// 5. Purchase Event (Order Completed)
export function pixelPurchase(orderId, grandTotal, cartItems = []) {
  trackPixelEvent('Purchase', {
    content_ids: cartItems.map(item => item.product?.id || item.id),
    content_type: 'product',
    value: grandTotal,
    currency: 'BDT',
    order_id: orderId,
    num_items: cartItems.length
  });
}

// 6. Contact Event (WhatsApp or Phone click)
export function pixelContact(method = 'WhatsApp') {
  trackPixelEvent('Contact', {
    method,
    channel: 'Direct Support',
    site: 'www.khatisaoda.com'
  });
}

// Get recent pixel event logs for Admin Panel
export function getPixelEventLogs() {
  try {
    const stored = localStorage.getItem(PIXEL_EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Clear Pixel Event Logs
export function clearPixelEventLogs() {
  localStorage.removeItem(PIXEL_EVENTS_KEY);
  window.dispatchEvent(new CustomEvent('khatisaoda_pixel_event', { detail: { type: 'CLEARED' } }));
}
