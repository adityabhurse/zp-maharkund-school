import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 animate-fadeIn">
      <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[32px] p-8 md:p-12 neo-shadow text-center max-w-lg space-y-6">
        <div className="w-24 h-24 bg-[#ffe16e] text-black neo-border rounded-full flex items-center justify-center text-4xl font-black mx-auto shadow-[4px_4px_0_#000]">
          🧭
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-black dark:text-white">404</h1>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-200">
            {lang === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
            {lang === 'mr'
              ? 'आपण शोधत असलेले पृष्ठ उपलब्ध नाही किंवा त्याचा पत्ता बदलला आहे.'
              : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#00c2a8] text-white font-black text-sm px-6 py-3 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
        >
          <span className="material-symbols-outlined text-base">home</span>
          <span>{t('btn.backToHome')}</span>
        </Link>
      </div>
    </div>
  );
};
