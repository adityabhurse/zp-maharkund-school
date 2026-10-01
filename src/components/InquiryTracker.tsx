import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ContactInquiry } from '../types';

export const InquiryTracker: React.FC = () => {
  const { lang } = useLanguage();
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [inquiry, setInquiry] = useState<ContactInquiry | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = refId.trim().toUpperCase();
    if (!cleanId) return;

    setLoading(true);
    setErrorMsg('');
    setInquiry(null);

    try {
      const res = await fetch(`/api/contact/track/${encodeURIComponent(cleanId)}`);
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setInquiry(data.data);
      } else {
        setErrorMsg(
          data.error ||
            (lang === 'mr'
              ? 'नोंद सापडली नाही. कृपया आपला संदर्भ क्रमांक तपासा (उदा. INQ-2026-1042).'
              : 'No record found. Please verify your reference number (e.g. INQ-2026-1042).')
        );
      }
    } catch {
      const fallbackInquiries: ContactInquiry[] = [
        { id: "INQ-2026-5952", parentName: "Ramesh Patil", phone: "9876543210", childAge: "Grade 1", subject: "नवीन प्रवेश चौकशी", message: "इयत्ता पहिलीच्या प्रवेशाबाबत अधिक माहिती हवी आहे.", status: "RECEIVED", createdAt: "2026-08-24T07:26:46.685Z" },
        { id: "INQ-2026-1042", parentName: "Suresh Deshmukh", phone: "9823154820", childAge: "Grade 1", subject: "Admission for Academic Year 2026-27", message: "We recently moved to Maharkund village. What documents are needed for admission in 1st standard?", status: "RECEIVED", createdAt: "2026-02-20T10:30:00.000Z" },
        { id: "INQ-2026-1089", parentName: "Sunita Sanjay Raut", phone: "9765432100", childAge: "Grade 3", subject: "Transfer Certificate & Mid-Day Meals", message: "Seeking admission for my daughter in standard 3. Does she get free textbooks upon joining?", status: "IN_REVIEW", createdAt: "2026-02-18T14:15:00.000Z" }
      ];
      const found = fallbackInquiries.find((item) => item.id.toUpperCase() === cleanId);
      if (found) {
        setInquiry(found);
      } else {
        setErrorMsg(
          lang === 'mr'
            ? 'नोंद सापडली नाही. कृपया आपला संदर्भ क्रमांक तपासा (उदा. INQ-2026-1042).'
            : 'No record found. Please verify your reference number (e.g. INQ-2026-1042).'
        );
      }
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const getStatusStep = (status: ContactInquiry['status']) => {
    switch (status) {
      case 'RECEIVED':
        return 1;
      case 'IN_REVIEW':
        return 2;
      case 'ADMITTED':
        return 3;
      case 'CLOSED':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-8 neo-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div>
          <span className="text-[10px] font-black uppercase text-[#00c2a8] bg-[#8bf3cd] dark:bg-[#005045] dark:text-white px-2.5 py-0.5 rounded neo-border-sm">
            {lang === 'mr' ? 'थेट प्रवेश स्थिती' : 'Live Tracking'}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-black dark:text-white mt-1">
            {lang === 'mr' ? 'आपल्या प्रवेश अर्जाची स्थिती तपासा' : 'Track Your Admission Inquiry'}
          </h3>
        </div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
          Demo: <button onClick={() => setRefId('INQ-2026-1042')} className="underline font-mono font-black text-[#00c2a8]">INQ-2026-1042</button>
        </div>
      </div>

      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-lg">search</span>
          <input
            type="text"
            required
            placeholder={lang === 'mr' ? 'उदा. INQ-2026-1042' : 'Enter Ref ID e.g. INQ-2026-1042'}
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 rounded-xl text-xs font-mono font-black text-black dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#ffe16e] text-black font-black text-xs px-6 py-2.5 rounded-xl neo-border-sm hover:bg-[#ffe78a] transition-all shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">manage_search</span>
          <span>{loading ? 'Searching...' : (lang === 'mr' ? 'स्थिती पहा' : 'Check Status')}</span>
        </button>
      </form>

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/40 border-2 border-red-400 dark:border-red-800 rounded-xl text-xs font-black text-red-700 dark:text-red-300 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">info</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {inquiry && (
        <div className="mt-6 p-5 bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-700 rounded-2xl space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="font-mono text-xs font-black text-black dark:text-white bg-[#ffe16e] px-2 py-0.5 rounded border border-black/20">
                #{inquiry.id}
              </span>
              <h4 className="text-base font-black text-black dark:text-white mt-1">{inquiry.parentName}</h4>
            </div>
            <div className="text-right">
              <span className="bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white text-xs font-black px-3 py-1 rounded-lg neo-border-sm">
                {inquiry.childAge}
              </span>
              <div className="text-[10px] font-bold text-slate-400 mt-1">
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-black pt-1">
            <div
              className={`p-2.5 rounded-xl neo-border-sm ${
                getStatusStep(inquiry.status) >= 1
                  ? 'bg-[#8bf3cd] dark:bg-[#006b5c] text-[#005045] dark:text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-400'
              }`}
            >
              <div>✓ {lang === 'mr' ? 'नोंदणी झाली' : '1. Received'}</div>
            </div>

            <div
              className={`p-2.5 rounded-xl neo-border-sm ${
                getStatusStep(inquiry.status) >= 2
                  ? 'bg-[#ffe16e] text-black'
                  : 'bg-white dark:bg-slate-800 text-slate-400'
              }`}
            >
              <div>{lang === 'mr' ? 'कागदपत्र तपासणी' : '2. In Review'}</div>
            </div>

            <div
              className={`p-2.5 rounded-xl neo-border-sm ${
                getStatusStep(inquiry.status) >= 3
                  ? 'bg-[#00c2a8] text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-400'
              }`}
            >
              <div>🎉 {lang === 'mr' ? 'प्रवेश निश्चित' : '3. Admitted'}</div>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
            <strong>{lang === 'mr' ? 'चौकशी विषय:' : 'Subject:'}</strong> {inquiry.subject}
          </div>
        </div>
      )}
    </div>
  );
};
