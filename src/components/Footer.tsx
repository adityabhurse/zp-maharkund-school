import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();
  const [showTeam, setShowTeam] = React.useState(false);
  const teamRef = React.useRef<HTMLDivElement>(null);

  const teamMembers = [
    { name: 'ADITYA BHURSE', role: 'Project Lead & Developer' },
    { name: 'ANKIT ITANKAR', role: 'Team Member' },
    { name: 'RIYA CHAUHAN', role: 'Team Member' },
    { name: 'VAIDEHI PADOLE', role: 'Team Member' },
    { name: 'TANIYA SINHA', role: 'Team Member' },
  ];

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (teamRef.current && !teamRef.current.contains(event.target as Node)) {
        setShowTeam(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#ffe16e] dark:bg-[#131b2e] text-black dark:text-white w-full mt-16 border-t-4 border-black dark:border-slate-800 font-sans transition-colors relative">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Column 1: School Identity */}
          <div className="md:col-span-5 space-y-3">
            <Link to="/" className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#006b5c] dark:text-[#00c2a8]" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
              <span>{t('school.name')}</span>
            </Link>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300 leading-relaxed">
              {t('footer.aboutDesc')}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-white dark:bg-[#1e293b] px-3 py-1 rounded-lg border-2 border-black dark:border-slate-700 text-xs font-black neo-shadow-sm">
                UDISE: <strong>27090411101</strong>
              </span>
              <span className="bg-[#8bf3cd] dark:bg-[#005045] px-3 py-1 rounded-lg border-2 border-black dark:border-slate-700 text-xs font-black neo-shadow-sm text-[#005045] dark:text-white">
                {lang === 'mr' ? 'स्थापना: १९९१' : 'Est. 1991'}
              </span>
              <span className="bg-[#65fade] dark:bg-[#003830] px-3 py-1 rounded-lg border-2 border-black dark:border-slate-700 text-xs font-black neo-shadow-sm text-[#003830] dark:text-[#65fade]">
                {lang === 'mr' ? 'मराठी माध्यम (१ ते ५)' : 'Marathi Medium (Grades 1-5)'}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-base font-black text-black dark:text-white border-b-2 border-black dark:border-slate-700 pb-1 inline-block">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-300">
              <li>
                <Link to="/about" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.academics')}</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.facilities')}</span>
                </Link>
              </li>
              <li>
                <Link to="/welfare" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.welfare')}</span>
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.downloads')}</span>
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.calendar')}</span>
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-[#006b5c] dark:hover:text-[#00c2a8] transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>{t('nav.achievements')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Administrative details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-base font-black text-black dark:text-white border-b-2 border-black dark:border-slate-700 pb-1 inline-block">
              {t('footer.contactInfo')}
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="material-symbols-outlined text-lg shrink-0 text-[#006b5c] dark:text-[#00c2a8]">location_on</span>
              <span>{t('footer.address')}</span>
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="material-symbols-outlined text-lg shrink-0 text-[#006b5c] dark:text-[#00c2a8]">schedule</span>
              <span>{t('footer.timing')}</span>
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://maps.app.goo.gl/VFLjtZVWYf3oj6iY8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white dark:bg-[#1e293b] text-black dark:text-white text-xs font-black px-3.5 py-2 rounded-xl neo-border-sm dark:border-slate-700 neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-[#006b5c] dark:text-[#00c2a8]">directions</span>
                <span>{lang === 'mr' ? 'गुगल मॅप्स दिशा' : 'Google Maps'}</span>
              </a>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 bg-black dark:bg-[#1e293b] text-[#ffe16e] text-xs font-black px-3.5 py-2 rounded-xl border border-black dark:border-slate-700 neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>{t('footer.adminLink')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t-2 border-black/30 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-800 dark:text-slate-400">
          <div>
            © 1991–2026 {t('school.name')}. {t('footer.rights')}
          </div>

          {/* Made With Love Team Dropdown */}
          <div className="relative" ref={teamRef}>
            <button
              onClick={() => setShowTeam(!showTeam)}
              className="inline-flex items-center gap-1.5 bg-white dark:bg-[#1e293b] text-black dark:text-white px-3 py-1.5 rounded-xl neo-border-sm dark:border-slate-700 neo-shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black text-xs"
              aria-label="View Development Team"
            >
              <span>Made with ❤️ by</span>
              <span className="text-[#006b5c] dark:text-[#00c2a8] underline decoration-2 decoration-wavy underline-offset-2">
                ADITYA BHURSE & TEAM
              </span>
              <span className={`material-symbols-outlined text-base transition-transform duration-200 ${showTeam ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Team Dropdown Menu */}
            {showTeam && (
              <div className="absolute bottom-full mb-3 right-0 md:right-0 w-64 bg-white dark:bg-[#1e293b] neo-border dark:border-slate-700 neo-shadow-md rounded-2xl p-4 z-50 animate-fadeIn space-y-2">
                <div className="flex items-center justify-between border-b-2 border-black dark:border-slate-700 pb-2">
                  <span className="text-xs font-black uppercase text-black dark:text-white tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    Project Team
                  </span>
                  <span className="text-[10px] font-extrabold bg-[#ffe16e] text-black px-2 py-0.5 rounded-full neo-border-sm">
                    5 Members
                  </span>
                </div>
                <ul className="space-y-1.5 pt-1">
                  {teamMembers.map((member, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 p-1.5 rounded-lg hover:bg-[#8bf3cd]/40 dark:hover:bg-[#005045]/40 transition-colors"
                    >
                      <span className="font-black flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00c2a8]" />
                        {member.name}
                      </span>
                      {member.name.startsWith('ADITYA') && (
                        <span className="text-[10px] bg-[#006b5c] text-white px-1.5 py-0.5 rounded font-black">
                          Lead
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#005045] dark:text-[#00c2a8] font-black">Saoner Block • Nagpur District • Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
