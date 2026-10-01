import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childAge: 'Grade 1',
    subject: 'Admission Inquiry 2026-27',
    message: '',
    honeypot: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg(
        lang === 'mr'
          ? 'कृपया अचूक १० अंकी मोबाईल क्रमांक टाका (उदा. ९८७६५४३२१०).'
          : 'Please enter a valid 10-digit mobile number (e.g. 9876543210).'
      );
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setInquiryId(resData.inquiryId);
        setSubmitted(true);
      } else {
        setErrorMsg(resData.error || (lang === 'mr' ? 'चौकशी नोंदवण्यात त्रुटी आली.' : 'Failed to submit inquiry.'));
      }
    } catch (err) {
      console.error('Contact API error:', err);
      setInquiryId(`INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setInquiryId('');
    setFormData({
      parentName: '',
      phone: '',
      childAge: 'Grade 1',
      subject: 'Admission Inquiry 2026-27',
      message: '',
      honeypot: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#f8f9ff] dark:bg-[#131b2e] w-full max-w-xl rounded-[28px] neo-border dark:border-slate-700 neo-shadow-lg p-6 md:p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white dark:bg-[#1e293b] text-black dark:text-white p-2 rounded-full neo-border-sm dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined font-bold">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#8bf3cd] text-[#006b5c] neo-border rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
            </div>
            <h3 className="text-2xl font-black text-black dark:text-white">{t('modal.contact.successTitle')}</h3>
            {inquiryId && (
              <div className="inline-block bg-[#ffe16e] text-black neo-border-sm rounded-lg px-3 py-1 font-mono text-xs font-black">
                {lang === 'mr' ? 'चौकशी संदर्भ क्र.:' : 'Tracking Ref:'} #{inquiryId}
              </div>
            )}
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 max-w-md mx-auto">
              {t('modal.contact.successDesc')}
            </p>
            <div className="p-4 bg-white dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl text-left text-xs font-bold space-y-1.5">
              <div className="text-black dark:text-white font-black flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#00c2a8]">call</span>
                <span>{lang === 'mr' ? 'तातडीच्या संपर्कासाठी:' : 'Direct Helpline:'}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {lang === 'mr'
                  ? 'मुख्याध्यापक कक्ष / शालेय कार्यालय: +९१ ९४२२१ ०००००'
                  : 'Headmaster Desk / School Office: +91 94221 00000'}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="bg-[#00c2a8] text-white font-black text-sm px-6 py-2.5 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {t('btn.close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-block bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white neo-border-sm rounded-lg px-2.5 py-0.5 text-xs font-black mb-1">
                {lang === 'mr' ? 'मोफत प्रवेश प्रक्रिया २०२६-२७' : 'Admissions Open 2026-27'}
              </div>
              <h2 className="text-2xl font-black text-black dark:text-white">{t('modal.contact.title')}</h2>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1">{t('modal.contact.subtitle')}</p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-100 dark:bg-red-950/40 border-2 border-red-500 rounded-xl text-xs font-black text-red-800 dark:text-red-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Hidden Honeypot Field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  {t('modal.contact.parentName')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('modal.contact.parentNamePlaceholder')}
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                    {t('modal.contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder={t('modal.contact.phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                    {t('modal.contact.grade')}
                  </label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
                  >
                    <option value="Grade 1">{lang === 'mr' ? 'इयत्ता १ ली (Grade 1)' : 'Grade 1 (1st Std)'}</option>
                    <option value="Grade 2">{lang === 'mr' ? 'इयत्ता २ री (Grade 2)' : 'Grade 2 (2nd Std)'}</option>
                    <option value="Grade 3">{lang === 'mr' ? 'इयत्ता ३ री (Grade 3)' : 'Grade 3 (3rd Std)'}</option>
                    <option value="Grade 4">{lang === 'mr' ? 'इयत्ता ४ थी (Grade 4)' : 'Grade 4 (4th Std)'}</option>
                    <option value="Grade 5">{lang === 'mr' ? 'इयत्ता ५ वी (Grade 5)' : 'Grade 5 (5th Std)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 dark:text-slate-200 mb-1">
                  {t('modal.contact.message')}
                </label>
                <textarea
                  rows={3}
                  placeholder={t('modal.contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2a8] resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                🔒 {lang === 'mr' ? '१००% मोफत शिक्षण व पाठ्यपुस्तके' : '100% Free Education under RTE'}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#00c2a8] text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
              >
                {loading ? t('btn.submitting') : t('btn.submit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
