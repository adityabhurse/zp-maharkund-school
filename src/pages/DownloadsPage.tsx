import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CircularItem } from '../types';
import { AdmissionFormModal } from '../components/AdmissionFormModal';

interface DownloadsPageProps {
  onOpenContact: () => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const defaultCirculars: CircularItem[] = [
    {
      id: 'circ-1',
      title: 'Standard 1 to 5 Admission Form (2026–2027) PDF',
      titleMr: 'इयत्ता १ ली ते ५ वी अधिकृत शालेय प्रवेश अर्ज (२०२६-२७) PDF',
      category: 'Admissions',
      fileSize: '145 KB',
      publishDate: '15 Feb 2026',
      description: 'Official printable admission enrollment form with list of mandatory documents (Aadhar, Birth certificate, Caste certificate if applicable).',
      descriptionMr: 'शाळेत प्रवेश घेण्यासाठी अधिकृत छापील अर्ज आणि आवश्यक कागदपत्रांची यादी.',
      isNew: true
    },
    {
      id: 'circ-2',
      title: 'Annual School Holiday Calendar & Schedule 2026–27',
      titleMr: 'वार्षिक शालेय सुट्ट्यांची यादी व वेळापत्रक २०२६-२७',
      category: 'Holidays',
      fileSize: '210 KB',
      publishDate: '01 Jan 2026',
      description: 'Approved list of government, regional, Diwali, Summer, and local festival holidays for primary schools in Nagpur district.',
      descriptionMr: 'नागपूर जिल्हा प्राथमिक शाळांसाठी शासनाने मंजूर केलेल्या सुट्ट्यांची अधिकृत यादी.',
      isNew: false
    },
    {
      id: 'circ-3',
      title: 'PM POSHAN Mid-Day Meal Menu & Nutritional Charter',
      titleMr: 'पीएम पोषण आहार दैनंदिन मेनू व पोषण मूल्य नियमावली',
      category: 'Welfare',
      fileSize: '180 KB',
      publishDate: '10 Jan 2026',
      description: 'Government guidelines on meal preparation, calories, egg/banana provision, and quality testing standards.',
      descriptionMr: 'शालेय पोषण आहारातील कॅलरी, प्रथिने आणि स्वच्छतेचे शासन नियम.',
      isNew: false
    },
    {
      id: 'circ-4',
      title: 'Right to Education (RTE) 100% Free Education Framework',
      titleMr: 'मोफत व सक्तीच्या शिक्षणाचा बालकांचा हक्क (RTE) नियमावली',
      category: 'Government',
      fileSize: '320 KB',
      publishDate: '20 Dec 2025',
      description: 'Guidelines on zero tuition fees, free uniform distribution, free textbooks, and no-detention policy.',
      descriptionMr: 'मोफत गणवेश, मोफत पाठ्यपुस्तके व बाल हक्कांची माहिती देणारे शासन परिपत्रक.',
      isNew: false
    },
    {
      id: 'circ-5',
      title: 'Curriculum Outlines & Learning Outcomes for Grades 1–5',
      titleMr: 'इयत्ता १ ली ते ५ वी अभ्यासक्रम व अध्ययन निष्पत्ती मार्गदर्शिका',
      category: 'Academic',
      fileSize: '410 KB',
      publishDate: '05 Jan 2026',
      description: 'Maharashtra State Board SCERT syllabus structure covering Marathi, Mathematics, English, and Environmental Studies.',
      descriptionMr: 'महाराष्ट्र राज्य शैक्षणिक संशोधन व प्रशिक्षण परिषद (SCERT) अभ्यासक्रम आराखडा.',
      isNew: false
    }
  ];

  const [circulars, setCirculars] = useState<CircularItem[]>(defaultCirculars);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const categories = ['All', 'Admissions', 'Academic', 'Holidays', 'Welfare', 'Government'];

  useEffect(() => {
    fetch('/api/circulars')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCirculars(data.data);
        }
      })
      .catch((err) => console.log('Loaded fallback circulars:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCirculars = circulars.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const titleMatch = (item.title + (item.titleMr || '')).toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = (item.description + (item.descriptionMr || '')).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (titleMatch || descMatch);
  });

  const handleDownload = (item: CircularItem) => {
    if (item.category === 'Admissions' || item.title.toLowerCase().includes('admission')) {
      setIsFormModalOpen(true);
      return;
    }

    const textContent = `=====================================================
ZILLA PARISHAD PRIMARY SCHOOL MAHARAKUND
Saoner Block, Nagpur District, Maharashtra (UDISE: 27090411101)
=====================================================
DOCUMENT: ${item.title}
CATEGORY: ${item.category}
PUBLISH DATE: ${item.publishDate}
FILE REF: ${item.id}

DETAILS / INSTRUCTIONS:
${item.description}

MARATHI DETAILS:
${item.descriptionMr || item.description}

=====================================================
Official Seal & Signature
Headmaster, Z.P. Primary School Maharkund, Nagpur.
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 md:space-y-14 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#8bf3cd] rounded-full mix-blend-multiply opacity-50 neo-border pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-block bg-[#ffe16e] text-black neo-border-sm rounded-lg px-3.5 py-1 text-xs font-black">
            {lang === 'mr' ? 'शासकीय परिपत्रके व कागदपत्रे' : 'Official Repository'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            {lang === 'mr' ? 'परिपत्रके, अर्ज व नियमावली' : 'Circulars, Forms & Downloads'}
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === 'mr'
              ? 'इयत्ता १ ली ते ५ वी प्रवेश अर्ज, वार्षिक शालेय सुट्ट्यांची यादी, पीएम-पोषण आहार वेळापत्रक आणि शिक्षण हक्क (RTE) नियमावली येथून थेट डाउनलोड करा.'
              : 'Official printable admission forms, annual holiday lists, Mid-Day Meal nutritional charters, and Right to Education government frameworks.'}
          </p>
        </div>
      </section>

      {/* Quick Admission Form Highlight Box */}
      <section className="bg-[#65fade] dark:bg-[#005045] neo-border dark:border-slate-700 rounded-2xl p-6 neo-shadow flex flex-col sm:flex-row items-center justify-between gap-6 text-black dark:text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white dark:bg-[#1e293b] neo-border-sm dark:border-slate-700 rounded-2xl flex items-center justify-center font-black text-3xl shrink-0 text-black dark:text-white">
            📄
          </div>
          <div>
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              {lang === 'mr' ? 'तातडीने उपलब्ध' : 'Featured Download'}
            </span>
            <h3 className="text-lg md:text-xl font-black mt-1">
              {lang === 'mr' ? 'शालेय प्रवेश अर्ज २०२६-२७ (मुद्रण प्रत)' : 'School Admission Form 2026-27 (Printable)'}
            </h3>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'mr' ? 'इयत्ता १ ली ते ५ वी प्रवेशासाठी अधिकृत अर्ज व कागदपत्रांची सूची' : 'Official printable application form for Grades 1 to 5 admissions.'}
            </p>
          </div>
        </div>
        <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="flex-1 sm:flex-initial bg-white dark:bg-[#1e293b] text-black dark:text-white neo-border-sm dark:border-slate-700 neo-shadow-sm px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">print</span>
            <span>{lang === 'mr' ? 'प्रवेश अर्ज प्रिंट करा' : 'Print Admission Form'}</span>
          </button>
          <button
            onClick={onOpenContact}
            className="flex-1 sm:flex-initial bg-[#00c2a8] text-white neo-border-sm dark:border-slate-700 neo-shadow-sm px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-lg">forum</span>
            <span>{lang === 'mr' ? 'ऑनलाइन चौकशी करा' : 'Enquire Online'}</span>
          </button>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black neo-border-sm dark:border-slate-700 transition-all ${
                  activeCategory === cat
                    ? 'bg-[#ffe16e] text-black shadow-[2px_2px_0_#000]'
                    : 'bg-white dark:bg-[#131b2e] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'All' ? t('btn.filterAll') : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
            <input
              type="text"
              placeholder={lang === 'mr' ? 'कागदपत्र शोधा...' : 'Search circulars...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl text-xs font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00c2a8]"
            />
          </div>
        </div>

        {/* Circulars List Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-bold">Loading circulars...</div>
        ) : filteredCirculars.length === 0 ? (
          <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-400">folder_off</span>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {lang === 'mr' ? 'कोणतेही परिपत्रक सापडले नाही.' : 'No circulars found matching your filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCirculars.map((item) => {
              const displayTitle = (lang === 'mr' && item.titleMr) ? item.titleMr : item.title;
              const displayDesc = (lang === 'mr' && item.descriptionMr) ? item.descriptionMr : item.description;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white text-[10px] font-black px-2.5 py-0.5 rounded-md border border-[#005045]/30">
                        {item.category}
                      </span>
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">calendar_today</span>
                        <span>{item.publishDate}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-black dark:text-white leading-snug">
                      {displayTitle}
                    </h3>

                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      📦 {item.fileSize}
                    </span>
                    <button
                      onClick={() => handleDownload(item)}
                      className="bg-[#ffe16e] text-black font-black text-xs px-3.5 py-1.5 rounded-lg neo-border-sm hover:bg-[#ffe78a] transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {item.category === 'Admissions' ? 'print' : 'download'}
                      </span>
                      <span>
                        {item.category === 'Admissions'
                          ? (lang === 'mr' ? 'अर्ज प्रिंट करा' : 'Print Form')
                          : t('btn.download')}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Printable Official Admission Form Modal */}
      <AdmissionFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />
    </div>
  );
};
