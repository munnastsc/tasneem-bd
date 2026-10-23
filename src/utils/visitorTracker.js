/**
 * খাঁটি সওদা (www.khatisaoda.com) - Visitor Tracking & Analytics Engine
 * Tracks live visitors, device info, traffic sources (including Facebook), pageviews & heartbeats.
 */

const STORAGE_KEYS = {
  VID: 'khatisaoda_vid',
  SID: 'khatisaoda_sid',
  SESSIONS: 'khatisaoda_visitor_sessions',
  STATS: 'khatisaoda_visitor_stats',
  AUDIO_ENABLED: 'khatisaoda_admin_audio_enabled',
};

// Parse Device, OS & Browser from UserAgent
export function parseDeviceInfo() {
  const ua = navigator.userAgent || '';
  let device = 'কম্পিউটার (Desktop)';
  let os = 'Windows';
  let browser = 'Chrome';

  // Device
  if (/iPad|Tablet/i.test(ua)) {
    device = 'ট্যাবলেট (Tablet)';
  } else if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
    device = 'স্মার্টফোন (Mobile)';
  }

  // OS
  if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS (Apple)';
  else if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Browser
  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = 'Opera';
  else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung Internet';
  else if (/UCBrowser/i.test(ua)) browser = 'UC Browser';
  else if (/Chrome\//i.test(ua)) browser = 'Google Chrome';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
  else if (/Firefox\//i.test(ua)) browser = 'Mozilla Firefox';

  const screen = `${window.screen?.width || 0}×${window.screen?.height || 0}`;

  return { device, os, browser, screen };
}

// Detect Traffic Source (Facebook, Google, Direct, Referral)
export function detectTrafficSource() {
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const referrer = document.referrer ? document.referrer.toLowerCase() : '';

  if (fbclid || (utmSource && utmSource.toLowerCase().includes('facebook'))) {
    return {
      name: 'ফেসবুক অ্যাড/ক্যাম্পেইন',
      category: 'facebook',
      detail: fbclid ? 'Facebook Click (fbclid)' : `Facebook (${utmCampaign || utmMedium || 'Campaign'})`,
      isFacebook: true
    };
  }

  if (referrer.includes('facebook.com') || referrer.includes('fb.com') || referrer.includes('m.facebook.com') || referrer.includes('l.facebook.com')) {
    return {
      name: 'ফেসবুক পেজ/লিংক',
      category: 'facebook',
      detail: 'www.facebook.com/khatisaoda',
      isFacebook: true
    };
  }

  if (referrer.includes('google.com') || referrer.includes('google.com.bd')) {
    return {
      name: 'গুগল সার্চ (Organic)',
      category: 'google',
      detail: 'Google Search Engine',
      isFacebook: false
    };
  }

  if (referrer.includes('instagram.com')) {
    return {
      name: 'ইনস্টাগ্রাম (Instagram)',
      category: 'social',
      detail: 'Instagram App/Web',
      isFacebook: false
    };
  }

  if (referrer.includes('whatsapp') || referrer.includes('wa.me')) {
    return {
      name: 'হোয়াটসঅ্যাপ (WhatsApp)',
      category: 'chat',
      detail: 'WhatsApp Share Link',
      isFacebook: false
    };
  }

  if (referrer.includes('youtube.com')) {
    return {
      name: 'ইউটিউব (YouTube)',
      category: 'video',
      detail: 'YouTube Link',
      isFacebook: false
    };
  }

  if (!referrer || referrer.includes(window.location.hostname)) {
    return {
      name: 'সরাসরি ভিজিট (Direct)',
      category: 'direct',
      detail: 'Direct URL Entry / Bookmark',
      isFacebook: false
    };
  }

  try {
    const refHost = new URL(referrer).hostname;
    return {
      name: `রেফারেল (${refHost})`,
      category: 'referral',
      detail: referrer,
      isFacebook: false
    };
  } catch {
    return {
      name: 'অন্যান্য উৎস',
      category: 'other',
      detail: referrer,
      isFacebook: false
    };
  }
}

// Generate unique ID helper
function generateId(prefix = 'KS') {
  return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Get or Create Persistent Visitor ID
export function getVisitorId() {
  let vid = localStorage.getItem(STORAGE_KEYS.VID);
  let isNew = false;
  if (!vid) {
    vid = generateId('V');
    localStorage.setItem(STORAGE_KEYS.VID, vid);
    isNew = true;
  }
  return { vid, isNew };
}

// Get or Create Session ID
export function getSessionId() {
  let sid = sessionStorage.getItem(STORAGE_KEYS.SID);
  if (!sid) {
    sid = generateId('S');
    sessionStorage.setItem(STORAGE_KEYS.SID, sid);
  }
  return sid;
}

// Broadcast channel for real-time inter-tab notification
let broadcastChannel = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    broadcastChannel = new BroadcastChannel('khatisaoda_visitor_channel');
  }
} catch (e) {
  console.warn('BroadcastChannel not supported', e);
}

// Play pleasant chime sound using Web Audio API
export function playChimeSound() {
  try {
    const isMuted = localStorage.getItem(STORAGE_KEYS.AUDIO_ENABLED) === 'false';
    if (isMuted) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // First tone (E5 ~ 659.25Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second higher tone (B5 ~ 987.77Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.12);
    gain2.gain.setValueAtTime(0.18, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch (e) {
    console.log('Audio chime error:', e);
  }
}

// Track a visitor activity / page view
export function logVisitorAction(actionName, pageDetail = '') {
  try {
    const { vid, isNew } = getVisitorId();
    const sid = getSessionId();
    const now = Date.now();
    const todayStr = new Date().toISOString().slice(0, 10);
    const trafficSource = detectTrafficSource();
    const deviceInfo = parseDeviceInfo();

    // Load existing sessions
    let sessions = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (stored) sessions = JSON.parse(stored);
    } catch {
      sessions = [];
    }

    // Load existing stats
    let stats = {
      date: todayStr,
      todayVisitors: 0,
      todayPageviews: 0,
      fbVisitorsToday: 0,
      totalAllTimeVisitors: 0,
      knownVisitors: []
    };
    try {
      const storedStats = localStorage.getItem(STORAGE_KEYS.STATS);
      if (storedStats) {
        const parsed = JSON.parse(storedStats);
        if (parsed.date === todayStr) {
          stats = parsed;
        } else {
          // New day rollover
          stats = {
            date: todayStr,
            todayVisitors: 0,
            todayPageviews: 0,
            fbVisitorsToday: 0,
            totalAllTimeVisitors: parsed.totalAllTimeVisitors || 0,
            knownVisitors: []
          };
        }
      }
    } catch {
      // fallback default
    }

    // Find current session
    let currentSessionIndex = sessions.findIndex(s => s.sid === sid);
    let isSessionNew = currentSessionIndex === -1;

    const actionEntry = {
      time: now,
      action: actionName,
      detail: pageDetail,
      formattedTime: new Date(now).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    if (isSessionNew) {
      const newSession = {
        sid,
        vid,
        isNewVisitor: isNew,
        firstSeen: now,
        lastActive: now,
        source: trafficSource.name,
        sourceCategory: trafficSource.category,
        sourceDetail: trafficSource.detail,
        isFacebook: trafficSource.isFacebook,
        device: deviceInfo.device,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        screen: deviceInfo.screen,
        currentPage: actionName,
        currentDetail: pageDetail,
        pageviews: 1,
        actions: [actionEntry]
      };
      sessions.unshift(newSession);

      // Update stats
      if (!stats.knownVisitors.includes(vid)) {
        stats.knownVisitors.push(vid);
        stats.todayVisitors += 1;
        stats.totalAllTimeVisitors += 1;
      }
      if (trafficSource.isFacebook) {
        stats.fbVisitorsToday += 1;
      }
    } else {
      const session = sessions[currentSessionIndex];
      session.lastActive = now;
      session.currentPage = actionName;
      session.currentDetail = pageDetail;
      session.pageviews = (session.pageviews || 1) + 1;
      if (!session.actions) session.actions = [];
      session.actions.unshift(actionEntry);
      if (session.actions.length > 20) session.actions.pop(); // keep last 20 actions
      
      // Move active session to top
      sessions.splice(currentSessionIndex, 1);
      sessions.unshift(session);
    }

    stats.todayPageviews += 1;

    // Keep max 50 sessions in storage to prevent bloat
    if (sessions.length > 50) {
      sessions = sessions.slice(0, 50);
    }

    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));

    // Broadcast live event to open admin tabs
    const broadcastPayload = {
      type: isSessionNew ? 'NEW_VISITOR' : 'VISITOR_UPDATE',
      sid,
      vid,
      action: actionName,
      detail: pageDetail,
      source: trafficSource.name,
      isFacebook: trafficSource.isFacebook,
      now
    };

    if (broadcastChannel) {
      broadcastChannel.postMessage(broadcastPayload);
    }

    // Trigger local storage event for same-window / listeners
    window.dispatchEvent(new CustomEvent('khatisaoda_visitor_event', { detail: broadcastPayload }));

  } catch (err) {
    console.error('Visitor tracking error:', err);
  }
}

// Send periodic heartbeat to keep session "active"
export function sendHeartbeat(currentPage = 'ব্রাউজ করছে') {
  try {
    const sid = getSessionId();
    const now = Date.now();
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!stored) return;

    let sessions = JSON.parse(stored);
    const session = sessions.find(s => s.sid === sid);
    if (session) {
      session.lastActive = now;
      session.currentPage = currentPage;
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      
      if (broadcastChannel) {
        broadcastChannel.postMessage({ type: 'HEARTBEAT', sid, now });
      }
      window.dispatchEvent(new CustomEvent('khatisaoda_visitor_event', { detail: { type: 'HEARTBEAT', sid, now } }));
    }
  } catch (err) {
    console.error('Heartbeat error:', err);
  }
}

// Get calculated live visitor stats for Admin Panel
export function getLiveVisitorMetrics() {
  try {
    const todayStr = new Date().toISOString().slice(0, 10);
    const storedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    const storedStats = localStorage.getItem(STORAGE_KEYS.STATS);

    const sessions = storedSessions ? JSON.parse(storedSessions) : [];
    let stats = {
      date: todayStr,
      todayVisitors: 0,
      todayPageviews: 0,
      fbVisitorsToday: 0,
      totalAllTimeVisitors: 0
    };

    if (storedStats) {
      const parsed = JSON.parse(storedStats);
      if (parsed.date === todayStr) {
        stats = parsed;
      }
    }

    const now = Date.now();
    const ACTIVE_THRESHOLD_MS = 60 * 1000; // active in last 60 seconds

    // Add dynamic computed properties to sessions
    const enrichedSessions = sessions.map(s => {
      const diffMs = now - (s.lastActive || s.firstSeen || now);
      const isActive = diffMs <= ACTIVE_THRESHOLD_MS;
      
      let timeAgo = 'এইমাত্র';
      const sec = Math.floor(diffMs / 1000);
      if (sec >= 60) {
        const min = Math.floor(sec / 60);
        if (min >= 60) {
          const hr = Math.floor(min / 60);
          timeAgo = `${hr} ঘণ্টা আগে`;
        } else {
          timeAgo = `${min} মিনিট আগে`;
        }
      } else if (sec > 5) {
        timeAgo = `${sec} সেকেন্ড আগে`;
      }

      return {
        ...s,
        isActive,
        timeAgo,
        formattedFirstSeen: new Date(s.firstSeen).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        formattedLastActive: new Date(s.lastActive).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
    });

    const activeCount = enrichedSessions.filter(s => s.isActive).length;

    return {
      activeCount: Math.max(activeCount, 1), // At least current active visitor/admin
      todayVisitors: Math.max(stats.todayVisitors, 1),
      todayPageviews: Math.max(stats.todayPageviews, 1),
      fbVisitorsToday: stats.fbVisitorsToday || 0,
      totalAllTimeVisitors: Math.max(stats.totalAllTimeVisitors || 0, stats.todayVisitors || 1),
      sessions: enrichedSessions
    };
  } catch (err) {
    console.error('Error fetching live visitor metrics:', err);
    return {
      activeCount: 1,
      todayVisitors: 1,
      todayPageviews: 1,
      fbVisitorsToday: 0,
      totalAllTimeVisitors: 1,
      sessions: []
    };
  }
}

// Clear Visitor History
export function clearVisitorHistory() {
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  const todayStr = new Date().toISOString().slice(0, 10);
  const clearedStats = {
    date: todayStr,
    todayVisitors: 0,
    todayPageviews: 0,
    fbVisitorsToday: 0,
    totalAllTimeVisitors: 0,
    knownVisitors: []
  };
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(clearedStats));
  window.dispatchEvent(new CustomEvent('khatisaoda_visitor_event', { detail: { type: 'CLEARED' } }));
}
