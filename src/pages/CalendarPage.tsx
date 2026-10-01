import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CalendarEvent } from '../types';

export const CalendarPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const defaultEvents: CalendarEvent[] = [
    {
      id: 'ev-1',
      title: 'Second Semester Unit Test 2 (घटक चाचणी २)',
      titleMr: 'द्वितीय सत्र घटक चाचणी २',
      date: '2026-03-05',
      category: 'exam',
      description: 'Evaluation for Marathi, Math, English and Parisar Abhyas for all grades 1 to 5.',
      descriptionMr: 'इयत्ता १ ली ते ५ वी च्या विद्यार्थ्यांची घटक चाचणी २ घेण्यात येईल.',
      time: '10:30 AM - 01:30 PM'
    },
    {
      id: 'ev-2',
      title: 'School Management Committee (SMC) Meeting',
      titleMr: 'शाळा व्यवस्थापन समिती (SMC) मासिक सभा',
      date: '2026-03-10',
      category: 'meeting',
      description: 'Monthly meeting with parents, Gram Panchayat members, and teachers regarding school development.',
      descriptionMr: 'शालेय विकास, विद्यार्थ्यांची प्रगती व स्वच्छता या विषयावर पालकांशी चर्चा.',
      time: '02:00 PM - 04:00 PM'
    },
    {
      id: 'ev-3',
      title: 'Holi / Dhulivandan Holiday (धूलिवंदन सुट्टी)',
      titleMr: 'धूलिवंदन शासकीय सुट्टी',
      date: '2026-03-25',
      category: 'holiday',
      description: 'School closed for the festive celebration of Holi and Dhulivandan.',
      descriptionMr: 'धूलिवंदन सणानिमित्त शाळेस शासकीय सुट्टी राहील.',
      time: 'All Day'
    },
    {
      id: 'ev-4',
      title: 'Annual Final Examinations (वार्षिक परीक्षा)',
      titleMr: 'वार्षिक परीक्षा (इयत्ता १ ते ५)',
      date: '2026-04-10',
      category: 'exam',
      description: 'Comprehensive annual evaluation for the Academic Year 2025–26.',
      descriptionMr: 'शैक्षणिक वर्ष २०२५-२६ ची अंतिम सत्र परीक्षा.',
      time: '10:30 AM - 01:30 PM'
    },
    {
      id: 'ev-5',
      title: 'Maharashtra Day & Annual Result Day (महाराष्ट्र दिन व निकाल)',
      titleMr: 'महाराष्ट्र दिन ध्वजारोहण व वार्षिक निकाल वाटप',
      date: '2026-05-01',
      category: 'national',
      description: 'Flag hoisting ceremony, cultural presentation, and annual progress report distribution to parents.',
      descriptionMr: 'ध्वजारोहण, सांस्कृतिक कार्यक्रम व पालकांना प्रगतीपुस्तक वाटप.',
      time: '08:00 AM - 11:30 AM'
    },
    {
      id: 'ev-6',
      title: 'New Academic Session Re-opening (नवीन शैक्षणिक वर्ष आरंभ)',
      titleMr: 'नवीन शैक्षणिक वर्ष २०२६-२७ आरंभ व प्रवेशोत्सव',
      date: '2026-06-15',
      category: 'event',
      description: 'School reopening ceremony, welcome of Grade 1 students with sweets, books, and flowers.',
      descriptionMr: 'पहिल्या दिवशी विद्यार्थ्यांचे स्वागत, मोफत पाठ्यपुस्तके व गणवेश वाटप.',
      time: '09:30 AM'
    }
  ];

  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: lang === 'mr' ? 'सर्व कार्यक्रम' : 'All Events' },
    { id: 'exam', label: lang === 'mr' ? 'परीक्षा व चाचण्या' : 'Exams & Tests', icon: 'edit_calendar', color: '#ff7b54' },
    { id: 'holiday', label: lang === 'mr' ? 'शासकीय सुट्ट्या' : 'Holidays', icon: 'beach_access', color: '#ffe16e' },
    { id: 'national', label: lang === 'mr' ? 'राष्ट्रीय सण' : 'National Days', icon: 'flag', color: '#8bf3cd' },
    { id: 'meeting', label: lang === 'mr' ? 'पालक व SMC सभा' : 'PTA & SMC Meetings', icon: 'groups', color: '#00c2a8' },
    { id: 'event', label: lang === 'mr' ? 'शालेय उत्सव व कार्यक्रम' : 'School Events', icon: 'celebration', color: '#65fade' },
  ];

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setEvents(data.data);
        }
      })
      .catch((err) => console.log('Loaded fallback events:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((e) => {
    if (activeCategory === 'all') return true;
    return e.category === activeCategory;
  });

  return (
    <div className="space-y-10 md:space-y-14 animate-fadeIn">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ffe16e] rounded-full mix-blend-multiply opacity-50 neo-border pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-block bg-[#00c2a8] text-white neo-border-sm rounded-lg px-3.5 py-1 text-xs font-black">
            {lang === 'mr' ? 'शैक्षणिक वर्ष २०२६-२७' : 'Academic Year 2026-27'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            {lang === 'mr' ? 'शालेय वार्षिक दिनदर्शिका व कार्यक्रम' : 'Annual Academic & Event Calendar'}
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === 'mr'
              ? 'घटक चाचण्या, सत्र परीक्षा, पालक-शिक्षक सभा, राष्ट्रीय सण आणि शासकीय सुट्ट्यांचे संपूर्ण वेळापत्रक.'
              : 'Complete schedule of semester exams, monthly unit tests, PTA meetings, national celebrations, and official holidays.'}
          </p>
        </div>
      </section>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black neo-border-sm dark:border-slate-700 transition-all flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-black text-white dark:bg-[#00c2a8] dark:text-black shadow-[2px_2px_0_#000]'
                : 'bg-white dark:bg-[#131b2e] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat.icon && <span className="material-symbols-outlined text-sm">{cat.icon}</span>}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Events Timeline View */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-bold">Loading calendar events...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-8 text-center space-y-2">
          <span className="material-symbols-outlined text-4xl text-slate-400">event_busy</span>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {lang === 'mr' ? 'या वर्गात कोणतेही कार्यक्रम उपलब्ध नाहीत.' : 'No events found in this category.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const displayTitle = (lang === 'mr' && event.titleMr) ? event.titleMr : event.title;
            const displayDesc = (lang === 'mr' && event.descriptionMr) ? event.descriptionMr : event.description;
            const dateObj = new Date(event.date);
            const monthStr = dateObj.toLocaleDateString(lang === 'mr' ? 'mr-IN' : 'en-US', { month: 'short' });
            const dayStr = dateObj.getDate();

            let badgeBg = '#8bf3cd';
            let badgeText = '#005045';
            let catName = 'Event';

            if (event.category === 'exam') {
              badgeBg = '#ff7b54';
              badgeText = '#ffffff';
              catName = lang === 'mr' ? 'परीक्षा' : 'Examination';
            } else if (event.category === 'holiday') {
              badgeBg = '#ffe16e';
              badgeText = '#000000';
              catName = lang === 'mr' ? 'सुट्टी' : 'Holiday';
            } else if (event.category === 'meeting') {
              badgeBg = '#00c2a8';
              badgeText = '#ffffff';
              catName = lang === 'mr' ? 'पालक सभा' : 'PTA Meeting';
            } else if (event.category === 'national') {
              badgeBg = '#65fade';
              badgeText = '#00332c';
              catName = lang === 'mr' ? 'राष्ट्रीय सण' : 'National Festival';
            }

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                {/* Date Badge */}
                <div className="bg-[#000e24] text-white neo-border-sm dark:border-slate-700 rounded-xl p-3 text-center min-w-[75px] shrink-0">
                  <div className="text-[10px] font-black uppercase text-[#8bf3cd] tracking-wider">{monthStr}</div>
                  <div className="text-2xl font-black">{dayStr}</div>
                  <div className="text-[9px] font-bold text-slate-300">2026</div>
                </div>

                {/* Event Details */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="text-[10px] font-black px-2.5 py-0.5 rounded-md border border-black/20"
                      style={{ backgroundColor: badgeBg, color: badgeText }}
                    >
                      {catName}
                    </span>
                    {event.time && (
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        <span>{event.time}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-black dark:text-white leading-tight">
                    {displayTitle}
                  </h3>

                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                    {displayDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
