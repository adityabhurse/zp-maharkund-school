import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SafeImage } from '../components/SafeImage';
import { InquiryTracker } from '../components/InquiryTracker';

interface HomePageProps {
  onOpenContact: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pillars = [
    {
      to: '/academics',
      title: t('pillar.academics.title'),
      desc: t('pillar.academics.desc'),
      icon: 'menu_book',
      color: '#ffe16e',
      badge: lang === 'mr' ? 'इयत्ता १ ते ५' : 'Grades 1 to 5',
    },
    {
      to: '/welfare',
      title: t('pillar.welfare.title'),
      desc: t('pillar.welfare.desc'),
      icon: 'restaurant',
      color: '#8bf3cd',
      badge: lang === 'mr' ? '१००% मोफत' : 'PM POSHAN',
    },
    {
      to: '/facilities',
      title: t('pillar.facilities.title'),
      desc: t('pillar.facilities.desc'),
      icon: 'computer',
      color: '#65fade',
      badge: lang === 'mr' ? 'स्मार्ट शाळा' : 'Smart Campus',
    },
    {
      to: '/downloads',
      title: t('pillar.circulars.title'),
      desc: t('pillar.circulars.desc'),
      icon: 'description',
      color: '#ffe16e',
      badge: lang === 'mr' ? 'अर्ज व परिपत्रके' : 'PDF Forms',
    },
    {
      to: '/calendar',
      title: t('pillar.calendar.title'),
      desc: t('pillar.calendar.desc'),
      icon: 'calendar_month',
      color: '#ff7b54',
      badge: lang === 'mr' ? '२०२६-२७' : '2026-27 Schedule',
    },
    {
      to: '/achievements',
      title: t('pillar.achievements.title'),
      desc: t('pillar.achievements.desc'),
      icon: 'emoji_events',
      color: '#8bf3cd',
      badge: lang === 'mr' ? 'गुणवत्ता यादी' : 'Hall of Fame',
    },
  ];

  const faqs = [
    {
      q: 'What is the age requirement for Grade 1 admission in 2026-27?',
      qMr: 'शैक्षणिक वर्ष २०२६-२७ मध्ये इयत्ता १ ली प्रवेशासाठी वयाची काय अट आहे?',
      a: 'As per Maharashtra State Education & NEP 2020 guidelines, a child must complete 6 years of age on or before 31st December of the academic year.',
      aMr: 'महाराष्ट्र शासन व नवीन शैक्षणिक धोरणानुसार, शैक्षणिक वर्षाच्या ३१ डिसेंबर अखेरपर्यंत बालकाचे वय ६ वर्षे पूर्ण असणे आवश्यक आहे.',
    },
    {
      q: 'Are education, textbooks, and midday meals completely free?',
      qMr: 'शाळेत शिक्षण, पुस्तके व पोषण आहार १००% मोफत मिळतात का?',
      a: 'Yes! Under the Right to Education (RTE) Act, tuition, textbooks, notebooks, uniforms, and daily hot PM-POSHAN lunches are 100% free with zero fees.',
      aMr: 'होय! शिक्षण हक्क (RTE) कायद्यानुसार इयत्ता १ ली ते ५ वी मधील सर्व विद्यार्थ्यांसाठी मोफत शिक्षण, मोफत पाठ्यपुस्तके, २ गणवेश आणि दररोज चवदार मध्यान्ह भोजन दिले जाते.',
    },
    {
      q: 'What documents are required to complete school admission?',
      qMr: 'शाळेत प्रवेश घेण्यासाठी कोणती कागदपत्रे लागतात?',
      a: 'Required: (1) Birth Certificate, (2) Student Aadhaar Card, (3) Parent Aadhaar & Ration Card copy, (4) 2 Passport size photos, (5) Previous school Transfer Certificate if applicable.',
      aMr: 'आवश्यक कागदपत्रे: (१) जन्म दाखला, (२) विद्यार्थ्यांचे आधार कार्ड, (३) पालकांचे आधार व रेशन कार्ड, (४) २ पासपोर्ट फोटो, (५) मागील शाळेचा दाखला (इतर शाळेतून आल्यास).',
    },
    {
      q: 'What are the daily school hours and Saturday schedule?',
      qMr: 'शाळेची दैनंदिन वेळ व शनिवारचे वेळापत्रक काय असते?',
      a: 'Monday to Friday: 10:00 AM to 4:30 PM (with lunch break). Saturday: Morning session 7:30 AM to 12:30 PM followed by sports and extra-curricular activities.',
      aMr: 'सोमवार ते शुक्रवार: सकाळी १०:०० ते दुपारी ४:३० (दुपारच्या सुट्टीसह). शनिवार: सकाळचे सत्र सकाळी ७:३० ते दुपारी १२:३० (क्रीडा व सांस्कृतिक उपक्रम).',
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-12 neo-shadow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ffe16e] rounded-full mix-blend-multiply opacity-60 neo-border pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-block bg-[#ffe16e] text-black neo-border-sm rounded-lg px-3.5 py-1 text-xs font-black uppercase tracking-wider">
              {t('hero.badge')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/facilities"
                className="bg-[#00c2a8] text-white neo-border neo-shadow-sm px-6 py-3 rounded-xl font-black text-sm sm:text-base hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
              >
                <span>{t('hero.exploreBtn')}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>

              <button
                onClick={onOpenContact}
                className="bg-[#ffe16e] text-black neo-border neo-shadow-sm px-6 py-3 rounded-xl font-black text-sm sm:text-base hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
              >
                {t('hero.admissionsBtn')}
              </button>
            </div>
          </div>

          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-lg aspect-[4/3] rounded-[32px] neo-border dark:border-slate-700 neo-shadow overflow-hidden bg-[#d5e3ff] relative">
              <SafeImage
                src="/school-building.jpg"
                alt="Z.P. Primary School Maharkund Main Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-xl neo-border-sm dark:border-slate-700 text-xs font-black">
                📍 {t('hero.buildingCaption')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Status and Stats Counter Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: t('stat.est'), val: '1991', icon: 'history_edu', color: '#ffe16e' },
          { label: t('stat.grades'), val: '1 to 5', icon: 'school', color: '#8bf3cd' },
          { label: t('stat.medium'), val: t('stat.marathi'), icon: 'translate', color: '#65fade' },
          { label: t('stat.coed'), val: t('stat.coedVal'), icon: 'groups', color: '#ff7b54' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-4 sm:p-5 neo-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase">
                {item.label}
              </span>
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center neo-border-sm text-black text-sm"
                style={{ backgroundColor: item.color }}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white mt-3">
              {item.val}
            </div>
          </div>
        ))}
      </section>

      {/* Inquiry Tracker Component */}
      <section>
        <InquiryTracker />
      </section>

      {/* 6 Pillars of School Life */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-black text-[#00c2a8] uppercase tracking-wider">
              {lang === 'mr' ? 'शाळेचे प्रमुख विभाग' : 'Key Pillars & Facilities'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white mt-0.5">
              {lang === 'mr' ? 'समग्र बालविकास व शैक्षणिक सुविधा' : 'Holistic Development & Infrastructure'}
            </h2>
          </div>
          <Link
            to="/about"
            className="text-xs font-black text-slate-700 dark:text-slate-300 hover:text-[#00c2a8] flex items-center gap-1"
          >
            <span>{t('btn.viewAll')}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <Link
              key={idx}
              to={pillar.to}
              className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-6 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl neo-border-sm flex items-center justify-center text-black"
                    style={{ backgroundColor: pillar.color }}
                  >
                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                  </div>
                  <span className="text-[11px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-black dark:text-white group-hover:text-[#00c2a8] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-black text-[#00c2a8]">
                <span>{t('btn.readMore')}</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free Schemes Banner */}
      <section className="bg-[#8bf3cd] dark:bg-[#005045] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow text-black dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="bg-black text-[#8bf3cd] text-xs font-black uppercase px-3 py-1 rounded-md border border-black">
              {lang === 'mr' ? '१००% मोफत योजना' : '100% Free Government Schemes'}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white">
              {lang === 'mr'
                ? 'प्रत्येक विद्यार्थ्याला दर्जेदार शिक्षणासोबत मोफत सुविधा'
                : 'Free Textbooks, Uniforms & Daily Hot Lunches'}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              {lang === 'mr'
                ? 'शासनाच्या नियमांनुसार इयत्ता १ ली ते ५ वी मधील सर्व मुला-मुलींना मोफत पाठ्यपुस्तके, २ जोड मोफत गणवेश, वार्षिक आरोग्य तपासणी आणि पोषण आहार दिला जातो.'
                : 'Under Maharashtra State Govt & RTE provisions, all enrolled primary scholars receive free textbooks, free uniforms, regular health checkups, and PM-POSHAN mid-day meals.'}
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-3 justify-center">
            <Link
              to="/downloads"
              className="bg-white text-black font-black text-xs sm:text-sm px-5 py-3 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              <span>{t('btn.downloadForm')}</span>
            </Link>
            <button
              onClick={onOpenContact}
              className="bg-[#ffe16e] text-black font-black text-xs sm:text-sm px-5 py-3 rounded-xl neo-border neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#00c2a8] uppercase tracking-wider bg-[#8bf3cd] dark:bg-[#005045] px-3 py-1 rounded-md neo-border-sm text-[#005045] dark:text-white">
            {lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
            {lang === 'mr' ? 'पालकांच्या मनातील प्रमुख प्रश्न व उत्तरे' : 'Admissions & School FAQ'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
            {lang === 'mr'
              ? 'प्रवेश प्रक्रिया, आवश्यक कागदपत्रे आणि शाळा नियमांबाबत सर्व माहिती येथे उपलब्ध आहे.'
              : 'Clear answers on admission requirements, age norms, RTE benefits, and daily timings.'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const q = lang === 'mr' ? faq.qMr : faq.q;
            const a = lang === 'mr' ? faq.aMr : faq.a;

            return (
              <div
                key={idx}
                className="neo-border-sm dark:border-slate-700 rounded-2xl overflow-hidden transition-all bg-[#f8f9ff] dark:bg-[#0b1120]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-black text-sm sm:text-base text-black dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ffe16e] text-black text-xs flex items-center justify-center font-black shrink-0 neo-border-sm">
                      {idx + 1}
                    </span>
                    <span>{q}</span>
                  </span>
                  <span className="material-symbols-outlined text-lg shrink-0 transition-transform duration-200">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131b2e] animate-fadeIn">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Embedded Location & Directions Map */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-8 neo-shadow space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-xs font-black text-[#00c2a8] uppercase tracking-wider">
              {lang === 'mr' ? 'शाळेचा नकाशा व पत्ता' : 'School Location & Map'}
            </span>
            <h3 className="text-2xl font-black text-black dark:text-white mt-0.5">
              {lang === 'mr' ? 'आम्हाला भेटा: महारकुंड, ता. सावनेर' : 'Visit Us at Maharkund, Saoner'}
            </h3>
          </div>
          <a
            href="https://maps.app.goo.gl/VFLjtZVWYf3oj6iY8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffe16e] text-black font-black text-xs px-4 py-2 rounded-xl neo-border-sm hover:bg-[#ffe78a] transition-all flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
          >
            <span className="material-symbols-outlined text-base">directions</span>
            <span>{t('btn.getDirections')}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 aspect-[16/9] w-full rounded-2xl neo-border dark:border-slate-700 overflow-hidden bg-slate-100 relative">
            <iframe
              title="Z.P. Primary School Maharkund Location Map"
              src="https://maps.google.com/maps?q=21.524124,78.9852046&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          <div className="md:col-span-5 space-y-4 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-black dark:text-white font-black text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-[#00c2a8]">apartment</span>
                <span>Z.P. Primary School Maharkund</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Siranji Cluster, Saoner Taluka, Nagpur District, Maharashtra - 441107.
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-1">
                <div>🚌 <strong>Bus / Transport:</strong> Regular ST buses from Saoner & Khapa.</div>
                <div>📍 <strong>Block:</strong> Saoner | <strong>District:</strong> Nagpur</div>
              </div>
            </div>

            <div className="p-4 bg-[#ffe16e] text-black neo-border-sm rounded-xl space-y-1">
              <div className="font-black text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-base">phone_in_talk</span>
                <span>{lang === 'mr' ? 'मुख्याध्यापक कक्ष:' : 'Headmaster Helpline:'}</span>
              </div>
              <div className="font-mono font-black text-slate-900">+91 94221 00000 / +91 7113 250000</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
