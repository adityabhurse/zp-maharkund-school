import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ContactInquiry, NoticeItem, GalleryItem, CircularItem } from '../types';

// Secure token management
function getToken(): string | null {
  return sessionStorage.getItem('zp_admin_token');
}

function setToken(token: string): void {
  sessionStorage.setItem('zp_admin_token', token);
}

function clearToken(): void {
  sessionStorage.removeItem('zp_admin_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

// Convert Google Drive share link to direct embed/image URL
function driveToDirectUrl(url: string): string {
  // Convert https://drive.google.com/file/d/FILE_ID/view → embed/preview
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }
  // Already a direct link or other format
  return url;
}

function isDriveUrl(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('docs.google.com');
}

export const AdminPage: React.FC = () => {
  const { lang } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  const [activeTab, setActiveTab] = useState<'inquiries' | 'notices' | 'gallery' | 'circulars'>('inquiries');

  // Data states
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [circulars, setCirculars] = useState<CircularItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Form states for new entries
  const [newNotice, setNewNotice] = useState({ title: '', titleMr: '', type: 'urgent', linkPath: '/academics' });
  const [newGallery, setNewGallery] = useState({
    title: '',
    titleMr: '',
    category: 'events' as const,
    imageUrl: '',
    driveUrl: '',
    description: '',
    descriptionMr: '',
    accentColor: '#ffe16e',
    date: 'Feb 2026',
  });
  const [newCircular, setNewCircular] = useState({
    title: '',
    titleMr: '',
    category: 'Admissions' as const,
    fileSize: '150 KB',
    description: '',
    descriptionMr: '',
    driveUrl: '',
  });

  const [searchInquiry, setSearchInquiry] = useState('');

  // Check existing session on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetch('/api/admin/verify', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            clearToken();
          }
        })
        .catch(() => clearToken())
        .finally(() => setSessionChecked(true));
    } else {
      setSessionChecked(true);
    }
  }, []);

  const loadAllData = useCallback(() => {
    setLoadingData(true);
    Promise.all([
      fetch('/api/contact', { headers: authHeaders() }).then((r) => r.json()).catch(() => ({ data: [] })),
      fetch('/api/notices').then((r) => r.json()).catch(() => ({ data: [] })),
      fetch('/api/gallery').then((r) => r.json()).catch(() => ({ data: [] })),
      fetch('/api/circulars').then((r) => r.json()).catch(() => ({ data: [] })),
    ]).then(([inqRes, notRes, galRes, circRes]) => {
      if (inqRes.data) setInquiries(inqRes.data);
      if (notRes.data) setNotices(notRes.data);
      if (galRes.data) setGallery(galRes.data);
      if (circRes.data) setCirculars(circRes.data);
      setLoadingData(false);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated, loadAllData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setToken(data.token);
        setIsAuthenticated(true);
        setRemainingAttempts(null);
      } else {
        setAuthError(data.error || 'Invalid Admin PIN.');
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
      }
    } catch {
      setAuthError('Connection error. Make sure the backend server is running on port 5000.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch {
      // logout even if network fails
    }
    clearToken();
    setIsAuthenticated(false);
    setPin('');
  };

  const showFeedback = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 4000);
  };

  // Wrapper for authenticated API calls — handles 401 by logging out
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const res = await fetch(url, {
      ...options,
      headers: { ...authHeaders(), ...(options.headers || {}) },
    });
    if (res.status === 401) {
      clearToken();
      setIsAuthenticated(false);
      setAuthError('Session expired. Please log in again.');
    }
    return res;
  };

  // Handle local file picking for Gallery image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showFeedback('⚠️ File too large. Maximum 5MB allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGallery((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
        showFeedback('✅ Photo loaded from device! Fill details and click Upload.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Inquiry Operations
  const handleUpdateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    try {
      const res = await authFetch(`/api/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
        showFeedback(`Inquiry status updated to ${status}`);
      }
    } catch {
      showFeedback('Failed to update status.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await authFetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        showFeedback('Inquiry deleted successfully.');
      }
    } catch {
      showFeedback('Failed to delete inquiry.');
    }
  };

  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Inquiry ID', 'Parent Name', 'Mobile Number', 'Child Grade', 'Subject', 'Message', 'Status', 'Date Submitted'];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.parentName}"`,
      `"${inq.phone}"`,
      `"${inq.childAge}"`,
      `"${inq.subject}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${new Date(inq.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Maharkund_Admission_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Notice Operations
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title) return;
    try {
      const res = await authFetch('/api/notices', {
        method: 'POST',
        body: JSON.stringify(newNotice),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setNotices(data.data);
        setNewNotice({ title: '', titleMr: '', type: 'urgent', linkPath: '/academics' });
        showFeedback('New notice published live to ticker & board.');
      }
    } catch {
      showFeedback('Failed to publish notice.');
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      const res = await authFetch(`/api/notices/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.data) {
        setNotices(data.data);
        showFeedback('Notice removed.');
      }
    } catch {
      showFeedback('Failed to remove notice.');
    }
  };

  // Gallery Operations (with Google Drive support)
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || (!newGallery.imageUrl && !newGallery.driveUrl)) {
      showFeedback('⚠️ Please provide a title and either upload a photo or paste a Google Drive link.');
      return;
    }

    const payload = {
      ...newGallery,
      imageUrl: newGallery.driveUrl
        ? driveToDirectUrl(newGallery.driveUrl)
        : newGallery.imageUrl,
    };

    try {
      const res = await authFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setGallery([data.data, ...gallery]);
        setNewGallery({
          title: '',
          titleMr: '',
          category: 'events',
          imageUrl: '',
          driveUrl: '',
          description: '',
          descriptionMr: '',
          accentColor: '#ffe16e',
          date: 'Feb 2026',
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
        showFeedback('✅ New photo added to school gallery.');
      }
    } catch {
      showFeedback('Failed to add gallery photo.');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      const res = await authFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.data) {
        setGallery(data.data);
        showFeedback('Photo deleted.');
      }
    } catch {
      showFeedback('Failed to delete photo.');
    }
  };

  // Circulars Operations (with Google Drive support)
  const handleAddCircular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircular.title) return;
    try {
      const res = await authFetch('/api/circulars', {
        method: 'POST',
        body: JSON.stringify(newCircular),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setCirculars([data.data, ...circulars]);
        setNewCircular({
          title: '',
          titleMr: '',
          category: 'Admissions',
          fileSize: '150 KB',
          description: '',
          descriptionMr: '',
          driveUrl: '',
        });
        showFeedback('✅ New circular / document added.');
      }
    } catch {
      showFeedback('Failed to add circular.');
    }
  };

  const handleDeleteCircular = async (id: string) => {
    if (!window.confirm('Delete this circular?')) return;
    try {
      const res = await authFetch(`/api/circulars/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.data) {
        setCirculars(data.data);
        showFeedback('Circular deleted.');
      }
    } catch {
      showFeedback('Failed to delete circular.');
    }
  };

  // ==================== LOGIN SCREEN ====================
  if (!sessionChecked) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center text-slate-600 dark:text-slate-300 font-bold animate-fadeIn">
          <span className="material-symbols-outlined text-3xl text-[#00c2a8] animate-spin">progress_activity</span>
          <p className="mt-2 text-sm">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 animate-fadeIn">
        <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-8 neo-shadow space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#ffe16e] text-black neo-border-sm rounded-2xl flex items-center justify-center mx-auto shadow-[2px_2px_0_#000]">
              <span className="material-symbols-outlined text-3xl font-black">shield_lock</span>
            </div>
            <h1 className="text-2xl font-black text-black dark:text-white">
              {lang === 'mr' ? 'सुरक्षित प्रशासकीय पोर्टल' : 'Secure Admin Portal'}
            </h1>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {lang === 'mr'
                ? 'शाळेच्या व्यवस्थापनासाठी अधिकृत पिन (PIN) प्रविष्ट करा.'
                : 'Enter school administrative access PIN to authenticate.'}
            </p>
          </div>

          {/* Security Info Badge */}
          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3 flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined text-base text-[#00c2a8]">verified_user</span>
            <span>
              {lang === 'mr'
                ? '🔐 सत्र आधारित सुरक्षा, 4 तास कालबाह्य, 5 अयशस्वी प्रयत्नांनंतर IP लॉकआऊट.'
                : '🔐 Token-based auth, 4-hour sessions, IP lockout after 5 failed attempts.'}
            </span>
          </div>

          {authError && (
            <div className="p-3 bg-red-100 dark:bg-red-950/40 border-2 border-red-500 rounded-xl text-xs font-black text-red-800 dark:text-red-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{authError}</span>
            </div>
          )}

          {remainingAttempts !== null && remainingAttempts > 0 && (
            <div className="p-3 bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-500 rounded-xl text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">warning</span>
              <span>
                {lang === 'mr'
                  ? `⚠️ ${remainingAttempts} प्रयत्न शिल्लक आहेत.`
                  : `⚠️ ${remainingAttempts} attempt(s) remaining before IP lockout.`}
              </span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                {lang === 'mr' ? 'मास्टर ॲडमिन पिन (Master PIN)' : 'Master Admin PIN'}
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter secure PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-sm font-mono font-black text-black dark:text-white tracking-widest focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
              />
              <div className="text-[10px] font-bold text-slate-400 mt-1">
                🔑 Default Demo PIN: <strong>1991</strong> (change in .env ADMIN_PIN)
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#00c2a8] text-white font-black text-sm py-3 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
            >
              {authLoading ? 'Authenticating...' : (lang === 'mr' ? 'सुरक्षित लॉगिन' : 'Secure Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== ADMIN DASHBOARD ====================

  const filteredInquiries = inquiries.filter((inq) => {
    const q = searchInquiry.toLowerCase();
    return (
      inq.parentName.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.childAge.toLowerCase().includes(q) ||
      inq.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Admin Bar */}
      <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white neo-border-sm rounded-xl flex items-center justify-center font-black text-2xl">
            🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#00c2a8] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Authenticated Session
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">UDISE: 27090411101</span>
            </div>
            <h1 className="text-xl font-black text-black dark:text-white">Z.P. Primary School Maharkund CMS</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAllData}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white rounded-xl neo-border-sm dark:border-slate-700 transition-colors"
            title="Refresh Data"
          >
            <span className="material-symbols-outlined text-lg">refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#ff7b54] text-white text-xs font-black px-4 py-2 rounded-xl neo-border-sm hover:bg-[#e05f38] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Secure Logout</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white neo-border-sm rounded-xl font-black text-xs flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-300 dark:border-slate-800 pb-3">
        {[
          { key: 'inquiries' as const, icon: 'inbox', label: `Admission Inquiries (${inquiries.length})` },
          { key: 'notices' as const, icon: 'campaign', label: `Notice Ticker (${notices.length})` },
          { key: 'gallery' as const, icon: 'photo_library', label: `Photo Gallery (${gallery.length})` },
          { key: 'circulars' as const, icon: 'description', label: `Circulars (${circulars.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-black neo-border-sm dark:border-slate-700 transition-all flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-[#ffe16e] text-black shadow-[2px_2px_0_#000]'
                : 'bg-white dark:bg-[#131b2e] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= TAB 1: INQUIRIES ================= */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative max-w-sm w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
              <input
                type="text"
                placeholder="Search by parent name, phone, grade..."
                value={searchInquiry}
                onChange={(e) => setSearchInquiry(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl text-xs font-bold text-black dark:text-white focus:outline-none"
              />
            </div>

            <button
              onClick={exportInquiriesCSV}
              disabled={inquiries.length === 0}
              className="bg-[#00c2a8] text-white text-xs font-black px-4 py-2 rounded-xl neo-border-sm hover:bg-[#00a892] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Export CSV for Headmaster</span>
            </button>
          </div>

          {loadingData ? (
            <div className="p-8 text-center text-slate-500 font-bold">Loading inquiries...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-8 text-center text-slate-600 dark:text-slate-300 font-bold">
              No inquiries found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black bg-[#ffe16e] text-black px-2 py-0.5 rounded border border-black/20">
                        {inq.id}
                      </span>
                      <span className="text-xs font-black bg-[#8bf3cd] text-[#005045] px-2 py-0.5 rounded">
                        {inq.childAge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-black dark:text-white">
                      {inq.parentName}{' '}
                      <a href={`tel:${inq.phone}`} className="text-[#00c2a8] hover:underline font-mono text-sm ml-2">
                        📞 +91 {inq.phone}
                      </a>
                    </h3>

                    <div className="text-xs font-black text-slate-800 dark:text-slate-200">Subject: {inq.subject}</div>
                    {inq.message && (
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#0b1120] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                        "{inq.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0">
                    <select
                      value={inq.status}
                      onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as ContactInquiry['status'])}
                      className="px-3 py-1.5 rounded-xl neo-border-sm dark:border-slate-700 text-xs font-black bg-white dark:bg-[#1e293b] text-black dark:text-white"
                    >
                      <option value="RECEIVED">🟡 RECEIVED</option>
                      <option value="IN_REVIEW">🔵 IN REVIEW</option>
                      <option value="ADMITTED">🟢 ADMITTED</option>
                      <option value="CLOSED">⚪ CLOSED</option>
                    </select>

                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                      title="Delete inquiry"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: NOTICES ================= */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          <form onSubmit={handleAddNotice} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow space-y-4">
            <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00c2a8]">add_circle</span>
              <span>Publish New Notice on Ticker</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Title (English) *</label>
                <input type="text" required placeholder="e.g. Free Mid-Day Meals Active" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Title (Marathi)</label>
                <input type="text" placeholder="उदा. पोषण आहार सुरू" value={newNotice.titleMr} onChange={(e) => setNewNotice({ ...newNotice, titleMr: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Type</label>
                <select value={newNotice.type} onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white">
                  <option value="urgent">🔴 Urgent / Admission</option>
                  <option value="info">🔵 Info / Announcement</option>
                  <option value="event">🟢 Event / Meeting</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Link Path</label>
                <select value={newNotice.linkPath} onChange={(e) => setNewNotice({ ...newNotice, linkPath: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white">
                  <option value="/academics">/academics</option>
                  <option value="/welfare">/welfare</option>
                  <option value="/downloads">/downloads</option>
                  <option value="/calendar">/calendar</option>
                  <option value="/about">/about</option>
                </select>
              </div>
            </div>

            <button type="submit" className="bg-[#ffe16e] text-black font-black text-xs px-5 py-2.5 rounded-xl neo-border-sm hover:bg-[#ffdc54] transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">campaign</span>
              <span>Publish Notice Live</span>
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-black dark:text-white">Active Notices ({notices.length})</h3>
            {notices.map((n) => (
              <div key={n.id} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4 neo-shadow-sm">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${n.type === 'urgent' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{n.type}</span>
                    <span className="text-xs font-mono font-bold text-slate-500">{n.linkPath}</span>
                  </div>
                  <div className="text-sm font-black text-black dark:text-white">{n.title}</div>
                  {n.titleMr && <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{n.titleMr}</div>}
                </div>
                <button onClick={() => handleDeleteNotice(n.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: GALLERY WITH DRIVE + FILE UPLOAD ================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <form onSubmit={handleAddGallery} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow space-y-4">
            <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00c2a8]">add_photo_alternate</span>
              <span>Add School Photo to Gallery</span>
            </h3>

            {/* Source Picker: Local File OR Google Drive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: Device Upload */}
              <div className="p-4 bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-black text-black dark:text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#00c2a8]">upload_file</span>
                  <span>Option A: Upload from Device</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:neo-border-sm file:bg-[#ffe16e] file:text-black file:font-black file:text-xs hover:file:bg-[#ffe78a] w-full"
                />
                <p className="text-[10px] font-bold text-slate-400">Max 5MB · JPG, PNG, WebP</p>
              </div>

              {/* Option B: Google Drive Link */}
              <div className="p-4 bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-black text-black dark:text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#4285F4]">add_to_drive</span>
                  <span>Option B: Google Drive Link</span>
                </div>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/.../view"
                  value={newGallery.driveUrl}
                  onChange={(e) => setNewGallery({ ...newGallery, driveUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white"
                />
                <p className="text-[10px] font-bold text-slate-400">
                  {lang === 'mr' ? 'Google Drive ला "Anyone with the link" शेअरिंग सुरू करा' : 'Set Drive sharing to "Anyone with the link"'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Photo Title (English) *</label>
                <input type="text" required placeholder="e.g. Annual Sports Day 2026" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Photo Title (Marathi)</label>
                <input type="text" placeholder="उदा. वार्षिक क्रीडा स्पर्धा" value={newGallery.titleMr} onChange={(e) => setNewGallery({ ...newGallery, titleMr: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Category</label>
                <select value={newGallery.category} onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white">
                  <option value="classrooms">🏫 Classrooms</option>
                  <option value="library">📚 Library</option>
                  <option value="playground">⚽ Playground</option>
                  <option value="meals">🍲 Mid-Day Meals</option>
                  <option value="events">🎉 Events & Functions</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Description</label>
                <input type="text" placeholder="Short caption..." value={newGallery.description} onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
            </div>

            <button type="submit" className="bg-[#00c2a8] text-white font-black text-xs px-5 py-2.5 rounded-xl neo-border-sm hover:bg-[#00a892] transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">cloud_upload</span>
              <span>Upload Photo</span>
            </button>
          </form>

          {/* Existing Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-xl p-3 neo-shadow-sm space-y-2">
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-black/20 bg-slate-100 dark:bg-slate-900">
                  <img src={item.imageUrl || driveToDirectUrl(item.driveUrl || '')} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase bg-[#ffe16e] text-black px-2 py-0.5 rounded">{item.category}</span>
                      {(item.driveUrl || isDriveUrl(item.imageUrl || '')) && (
                        <span className="text-[10px] font-black text-[#4285F4] flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">add_to_drive</span>
                          Drive
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-black text-black dark:text-white mt-1 truncate max-w-[180px]">{item.title}</h4>
                  </div>
                  <button onClick={() => handleDeleteGallery(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: CIRCULARS WITH DRIVE ================= */}
      {activeTab === 'circulars' && (
        <div className="space-y-6">
          <form onSubmit={handleAddCircular} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow space-y-4">
            <h3 className="text-sm font-black text-black dark:text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#00c2a8]">note_add</span>
              <span>Publish Official Circular / Document</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Title (English) *</label>
                <input type="text" required placeholder="e.g. Unit Test 2 Schedule" value={newCircular.title} onChange={(e) => setNewCircular({ ...newCircular, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Title (Marathi)</label>
                <input type="text" placeholder="उदा. घटक चाचणी २ वेळापत्रक" value={newCircular.titleMr} onChange={(e) => setNewCircular({ ...newCircular, titleMr: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Category</label>
                <select value={newCircular.category} onChange={(e) => setNewCircular({ ...newCircular, category: e.target.value as any })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white">
                  <option value="Admissions">Admissions</option>
                  <option value="Academic">Academic</option>
                  <option value="Holidays">Holidays</option>
                  <option value="Welfare">Welfare</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">File Size</label>
                <input type="text" value={newCircular.fileSize} onChange={(e) => setNewCircular({ ...newCircular, fileSize: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
              {/* Google Drive PDF Link */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  <span className="material-symbols-outlined text-sm align-middle text-[#4285F4]">add_to_drive</span>
                  {' '}Google Drive PDF / Document Link
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/.../view   or   https://docs.google.com/document/d/..."
                  value={newCircular.driveUrl}
                  onChange={(e) => setNewCircular({ ...newCircular, driveUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white"
                />
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                  {lang === 'mr' ? 'Google Drive वरील PDF, Doc किंवा Image ला "Anyone with the link" शेअरिंग ठेवा' : 'Paste any Google Drive PDF, Doc, Sheets, or Image link. Set sharing to "Anyone with the link".'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">Instructions / Description</label>
                <textarea rows={2} value={newCircular.description} onChange={(e) => setNewCircular({ ...newCircular, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white" />
              </div>
            </div>

            <button type="submit" className="bg-[#65fade] text-black font-black text-xs px-5 py-2.5 rounded-xl neo-border-sm hover:bg-[#4fe8cb] transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">publish</span>
              <span>Publish Document</span>
            </button>
          </form>

          {/* Existing Circulars */}
          <div className="space-y-3">
            {circulars.map((c) => (
              <div key={c.id} className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4 neo-shadow-sm">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase bg-[#8bf3cd] text-[#005045] px-2 py-0.5 rounded">{c.category}</span>
                    <span className="text-xs font-mono text-slate-400">{c.fileSize}</span>
                    {c.driveUrl && (
                      <a href={c.driveUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-[#4285F4] flex items-center gap-0.5 hover:underline">
                        <span className="material-symbols-outlined text-xs">add_to_drive</span>
                        Open in Drive
                      </a>
                    )}
                  </div>
                  <div className="text-sm font-black text-black dark:text-white">{c.title}</div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{c.description}</div>
                </div>
                <button onClick={() => handleDeleteCircular(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
