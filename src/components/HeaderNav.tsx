import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderNavProps {
  onOpenContact: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenContact }) => {
  const { lang, toggleLang, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/academics', label: t('nav.academics') },
    { to: '/facilities', label: t('nav.facilities') },
    { to: '/welfare', label: t('nav.welfare') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/downloads', label: t('nav.downloads') },
    { to: '/calendar', label: t('nav.calendar') },
    { to: '/achievements', label: t('nav.achievements') },
  ];

  return (
    <>
      <header className="bg-[#f8f9ff]/95 dark:bg-[#0b1120]/95 backdrop-blur-md w-full sticky top-0 border-b-4 border-black dark:border-slate-800 shadow-[0_4px_0_#000e24] dark:shadow-[0_4px_0_#000000] z-50 transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-[1280px] mx-auto">
          {/* Logo & School Name */}
          <Link
            to="/"
            className="text-left font-black text-lg sm:text-xl md:text-2xl text-black dark:text-white flex items-center gap-2 group transition-transform"
          >
            <span
              className="material-symbols-outlined text-3xl md:text-4xl text-[#00c2a8] group-hover:rotate-12 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            <div className="flex flex-col">
              <span className="font-black tracking-tight leading-tight">{t('school.shortName')}</span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 hidden sm:inline">{t('school.tagline')}</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-4 text-sm font-black">
            {navLinks.slice(0, 6).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-2 py-1 transition-all rounded-md ${
                    isActive
                      ? 'text-[#00c2a8] border-b-4 border-[#00c2a8] font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#00c2a8] dark:hover:text-[#00c2a8]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Dropdown / More links */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-[#00c2a8] font-black px-2 py-1 rounded-md">
                <span>{lang === 'mr' ? 'अधिक' : 'More'}</span>
                <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
              </button>
              <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 neo-shadow-sm rounded-xl p-2 min-w-[200px] z-50">
                {navLinks.slice(6).map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-xs font-black rounded-lg transition-colors ${
                        isActive ? 'bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Controls: Day/Night Theme + Language Switcher + Contact Button + Admin */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Day / Night Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-white dark:bg-[#1e293b] text-black dark:text-[#ffe16e] rounded-xl neo-border-sm dark:border-slate-700 neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center"
              title={isDark ? 'Switch to Day Mode / दिवस मोड' : 'Switch to Night Mode / रात्र मोड'}
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined text-lg leading-none">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLang}
              className="bg-[#ffe16e] text-black font-black text-xs px-3 py-2 rounded-xl neo-border-sm neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
              title="Switch Language / भाषा बदला"
            >
              <span className="material-symbols-outlined text-base">translate</span>
              <span>{lang === 'en' ? 'मराठी' : 'English'}</span>
            </button>

            {/* Admission / Contact CTA */}
            <button
              onClick={onOpenContact}
              className="bg-[#00c2a8] text-white text-xs md:text-sm font-black px-4 py-2 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
            >
              {t('nav.contact')}
            </button>

            {/* Staff Portal Icon */}
            <button
              onClick={() => navigate('/admin')}
              className="bg-white dark:bg-[#1e293b] text-black dark:text-white p-2 rounded-xl neo-border-sm dark:border-slate-700 neo-shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              title={t('nav.admin')}
              aria-label="Admin Portal"
            >
              <span className="material-symbols-outlined text-lg leading-none">lock</span>
            </button>
          </div>

          {/* Mobile Menu & Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-white dark:bg-[#1e293b] text-black dark:text-[#ffe16e] rounded-lg neo-border-sm dark:border-slate-700 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-base leading-none">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button
              onClick={toggleLang}
              className="bg-[#ffe16e] text-black font-black text-xs px-2.5 py-1.5 rounded-lg neo-border-sm"
            >
              {lang === 'en' ? 'मराठी' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-black dark:text-white p-2 neo-border-sm dark:border-slate-700 rounded-lg bg-white dark:bg-[#1e293b] active:scale-95 transition-transform flex items-center justify-center"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] w-full max-h-[90vh] rounded-t-[32px] border-t-4 border-black dark:border-slate-800 p-6 flex flex-col shadow-[0_-6px_0_#000e24] dark:shadow-[0_-6px_0_#000000] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 pb-3 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00c2a8] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
                <span className="font-black text-lg text-black dark:text-white">{t('school.shortName')}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-black dark:text-white bg-white dark:bg-[#1e293b] rounded-full neo-border-sm dark:border-slate-700"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `p-3 rounded-xl neo-border-sm dark:border-slate-700 text-xs font-black text-center transition-all ${
                      isActive
                        ? 'bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white shadow-[2px_2px_0_#000]'
                        : 'bg-white dark:bg-[#131b2e] text-slate-800 dark:text-slate-200'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="space-y-3 pt-2 border-t-2 border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full bg-[#00c2a8] text-white font-black text-sm py-3 rounded-xl neo-border dark:border-slate-700 neo-shadow-sm"
              >
                {t('nav.contact')}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={toggleLang}
                  className="flex-1 bg-[#ffe16e] text-black font-black text-xs py-2.5 rounded-xl neo-border-sm text-center"
                >
                  🌐 {lang === 'en' ? 'मराठी भाषेत वाचा' : 'Switch to English'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="bg-white dark:bg-[#1e293b] text-black dark:text-[#ffe16e] font-black text-xs px-4 py-2.5 rounded-xl neo-border-sm dark:border-slate-700 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">
                    {isDark ? 'light_mode' : 'dark_mode'}
                  </span>
                  <span>{isDark ? 'Day' : 'Night'}</span>
                </button>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white dark:bg-[#1e293b] text-black dark:text-white font-black text-xs px-4 py-2.5 rounded-xl neo-border-sm dark:border-slate-700 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>{t('nav.admin')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
