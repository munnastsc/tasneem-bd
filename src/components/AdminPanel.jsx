import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Package, Clock, CheckCircle2, 
  Truck, DollarSign, Search, Filter, Phone, MessageSquare, 
  Printer, Trash2, Download, ExternalLink, RefreshCw, AlertCircle, X, ChevronRight
} from 'lucide-react';

export default function AdminPanel({ onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('tasneem_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Orders State
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('tasneem_orders');
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
        localStorage.setItem('tasneem_orders', JSON.stringify(sampleOrders));
        setOrders(sampleOrders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'tasneem2026') {
      setIsAuthenticated(true);
      localStorage.setItem('tasneem_admin_auth', 'true');
      setLoginError('');
      showToast('স্বাগতম! অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে।');
    } else {
      setLoginError('ভুল ইউজারনেম বা পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tasneem_admin_auth');
    showToast('অ্যাডমিন প্যানেল থেকে লগআউট সম্পন্ন হয়েছে।');
  };

  // Update Status
  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('tasneem_orders', JSON.stringify(updated));
    showToast(`অর্ডার ${orderId} এর স্ট্যাটাস '${newStatus}' করা হয়েছে।`);
  };

  // Delete Order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`আপনি কি নিশ্চিতভাবে অর্ডার ${orderId} মুছে ফেলতে চান?`)) {
      const updated = orders.filter(o => o.orderId !== orderId);
      setOrders(updated);
      localStorage.setItem('tasneem_orders', JSON.stringify(updated));
      showToast(`অর্ডার ${orderId} ডিলিট করা হয়েছে।`);
    }
  };

  // Export to CSV
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
    link.setAttribute('download', `tasneem_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('অর্ডার লিস্ট CSV ফাইলে ডাউনলোড হয়েছে!');
  };

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (o.orderId && o.orderId.toLowerCase().includes(q)) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.includes(q)) ||
      (o.customerAddress && o.customerAddress.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

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
            <div className="admin-logo-badge">
              <ShieldCheck size={28} color="#fbbf24" />
            </div>
            <h2>TASNEEM BD অ্যাডমিন পোর্টাল</h2>
            <p>অর্ডার ম্যানেজমেন্ট ও কাস্টমার ডাটাবেজ এক্সেস</p>
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
              <code>Password: <strong>tasneem2026</strong></code>
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
            <span className="brand-dot"></span>
            <h2>TASNEEM BD</h2>
            <span className="admin-pill">ম্যানেজমেন্ট প্যানেল</span>
          </div>
        </div>

        <div className="admin-nav-right">
          <button onClick={loadOrders} className="admin-icon-btn" title="রিফ্রেশ করুন">
            <RefreshCw size={16} />
            <span className="hide-mobile">রিফ্রেশ</span>
          </button>
          <button onClick={handleExportCSV} className="admin-icon-btn success" title="এক্সেল/CSV ডাউনলোড">
            <Download size={16} />
            <span className="hide-mobile">এক্সেল ডাউনলোড</span>
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
                            {/* WhatsApp Direct Chat */}
                            <a 
                              href={`https://wa.me/88${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${order.customerName} সাহেব, TASNEEM BD (tasneembd.com) থেকে আপনার অর্ডার ${order.orderId} এর বিষয়ে যোগাযোগ করা হচ্ছে।`)}`}
                              target="_blank" 
                              rel="noreferrer"
                              className="action-icon-btn whatsapp"
                              title="কাস্টমারকে হোয়াটসঅ্যাপে মেসেজ দিন"
                            >
                              <MessageSquare size={15} />
                            </a>

                            {/* Call Button */}
                            <a 
                              href={`tel:${order.customerPhone}`}
                              className="action-icon-btn phone"
                              title="সরাসরি কল দিন"
                            >
                              <Phone size={15} />
                            </a>

                            {/* View Invoice */}
                            <button 
                              onClick={() => setSelectedInvoiceOrder(order)}
                              className="action-icon-btn invoice"
                              title="মেমো / ইনভয়েস প্রিন্ট"
                            >
                              <Printer size={15} />
                            </button>

                            {/* Delete */}
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
      </main>

      {/* Invoice Modal for Printing */}
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
              <div>
                <h2>TASNEEM BD</h2>
                <p>tasneembd.com | খাঁটি প্রাকৃতিক খাদ্য ও সুন্নাহ লাইফস্টাইল</p>
                <small>হটলাইন: 01714-740430 | বনানী, ঢাকা</small>
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
    </div>
  );
}
