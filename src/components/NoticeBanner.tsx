import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { NoticeItem } from '../types';

interface NoticeBannerProps {
  onOpenContact: () => void;
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: '1',
      title: '● Admissions Open (2026–27) for Grades 1 to 5 - Free Education',
      titleMr: '● इयत्ता १ ली ते ५ वी मोफत प्रवेश २०२६-२७ सुरू - RTE अंतर्गत मोफत शिक्षण',
      type: 'urgent',
      linkPath: '/academics',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'UDISE Code: 27090411101 | Saoner Block, Nagpur',
      titleMr: 'शासकीय युडायस कोड: २७०९०४१११०१ | पंचायत समिती सावनेर, जि. नागपूर',
      type: 'info',
      linkPath: '/about',
      createdAt: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setNotices(data.data);
        }
      })
      .catch((err) => console.log('Loaded fallback notices:', err));
  }, []);

  return (
    <div className="bg-[#ffe16e] dark:bg-[#ffe16e] text-[#000e24] border-b-4 border-black dark:border-slate-800 px-4 py-2 font-extrabold text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-2 shadow-[0_4px_0_#000e24] dark:shadow-[0_4px_0_#000000] relative z-40">
      <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
        <span className="bg-black text-[#ffe16e] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-black shrink-0 border border-black flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          {t('notice.ticker')}
        </span>
        <div className="truncate flex items-center gap-2">
          {notices.map((notice, idx) => {
            const displayTitle = (lang === 'mr' && notice.titleMr) ? notice.titleMr : notice.title;
            return (
              <React.Fragment key={notice.id || idx}>
                {idx > 0 && <span className="text-slate-500 font-normal">|</span>}
                <Link
                  to={notice.linkPath || '/downloads'}
                  className={`inline-block hover:underline truncate ${
                    notice.type === 'urgent' ? 'text-red-700 font-black' : 'text-[#005045]'
                  }`}
                >
                  {displayTitle}
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/downloads"
          className="bg-white hover:bg-[#8bf3cd] text-black text-xs px-2.5 py-1 rounded-lg border-2 border-black neo-shadow-sm font-extrabold transition-all"
        >
          {lang === 'mr' ? 'परिपत्रके' : 'Circulars'}
        </Link>
        <button
          onClick={onOpenContact}
          className="bg-[#00c2a8] hover:bg-[#006b5c] text-white text-xs px-2.5 py-1 rounded-lg border-2 border-black neo-shadow-sm font-extrabold transition-all"
        >
          {lang === 'mr' ? 'प्रवेश चौकशी' : 'Admission'}
        </button>
      </div>
    </div>
  );
};
