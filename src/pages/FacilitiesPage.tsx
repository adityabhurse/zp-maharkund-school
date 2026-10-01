import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SafeImage } from '../components/SafeImage';

interface FacilitiesPageProps {
  onOpenContact: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow">
        <div className="inline-block bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white neo-border-sm rounded-full px-4 py-1 text-xs font-black mb-3">
          {lang === 'mr' ? 'शालेय भौतिक पायाभूत सुविधा' : 'CAMPUS INFRASTRUCTURE'}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-3">
          {lang === 'mr' ? 'शाळेतील भौतिक व डिजिटल सुविधा' : 'School Infrastructure & Facilities'}
        </h1>

        <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 max-w-2xl">
          {lang === 'mr'
            ? 'जि. प. प्राथमिक शाळा महारकुंड येथे विद्यार्थ्यांसाठी सुरक्षित, स्वच्छ, डिजिटल आणि आरोग्यदायी वातावरण उपलब्ध आहे.'
            : 'Z.P. Primary School Maharkund is equipped with functional, child-safe infrastructure designed to ensure comfort, safety, hygiene, and accessible learning for all scholars.'}
        </p>

        {/* Infrastructure Compliance Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-[#00c2a8] text-2xl font-bold">bolt</span>
            <div className="text-xs font-black text-black dark:text-white mt-1">
              {lang === 'mr' ? '१००% विद्युतीकरण' : '100% Electrified'}
            </div>
            <div className="text-[10px] font-bold text-slate-500">{lang === 'mr' ? 'पंखे व प्रकाश व्यवस्था' : 'Power connection'}</div>
          </div>

          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-[#00c2a8] text-2xl font-bold">water_drop</span>
            <div className="text-xs font-black text-black dark:text-white mt-1">
              {lang === 'mr' ? 'शुद्ध पिण्याचे पाणी' : 'Purified Water'}
            </div>
            <div className="text-[10px] font-bold text-slate-500">{lang === 'mr' ? 'नळ पाणीपुरवठा व फिल्टर' : 'Clean RO / Tap supply'}</div>
          </div>

          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-[#00c2a8] text-2xl font-bold">wc</span>
            <div className="text-xs font-black text-black dark:text-white mt-1">
              {lang === 'mr' ? 'स्वतंत्र स्वच्छतागृहे' : 'Separate Toilets'}
            </div>
            <div className="text-[10px] font-bold text-slate-500">{lang === 'mr' ? 'मुले व मुलींसाठी स्वतंत्र' : 'Boys & Girls functional'}</div>
          </div>

          <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-[#00c2a8] text-2xl font-bold">security</span>
            <div className="text-xs font-black text-black dark:text-white mt-1">
              {lang === 'mr' ? 'संरक्षक भिंत' : 'Perimeter Wall'}
            </div>
            <div className="text-[10px] font-bold text-slate-500">{lang === 'mr' ? 'सुरक्षित शालेय परिसर' : 'Child-safe campus'}</div>
          </div>
        </div>
      </section>

      {/* Main Facilities Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white">
          {lang === 'mr' ? 'सविस्तर सुविधा माहिती' : 'Detailed Facilities Overview'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Classrooms */}
          <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] overflow-hidden neo-shadow group">
            <div className="h-56 border-b-4 border-black dark:border-slate-700 overflow-hidden relative">
              <SafeImage
                src="/foto/classroom.jpg"
                alt={lang === 'mr' ? 'जि. प. शाळा महारकुंड वर्ग खोली' : 'Dedicated Instructional Classrooms'}
                accentColor="#ffe16e"
                fallbackIcon="meeting_room"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#ffe16e] text-black neo-border-sm px-3 py-1 rounded-full text-xs font-black">
                {lang === 'mr' ? 'हवेशीर वर्गखोल्या' : 'Classrooms'}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-black text-xl text-black dark:text-white">
                {lang === 'mr' ? 'प्रशस्त व बोलक्या वर्गखोल्या' : 'Dedicated Instructional Classrooms'}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'mr'
                  ? 'हवा आणि पुरेसा सूर्यप्रकाश असणाऱ्या प्रशस्त वर्गखोल्या, सुंदर शैक्षणिक भित्तिचित्रे, ब्लॅकबोर्ड आणि विद्यार्थ्यांसाठी आरामदायक बाकडी.'
                  : 'Spacious instructional rooms with ample natural daylight, sturdy dual-desks, blackboard walls, and interactive educational charts.'}
              </p>
            </div>
          </div>

          {/* 2. Library Corner */}
          <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] overflow-hidden neo-shadow group">
            <div className="h-56 border-b-4 border-black dark:border-slate-700 overflow-hidden relative">
              <SafeImage
                src="/foto/library.png"
                alt={lang === 'mr' ? 'जि. प. शाळा महारकुंड वाचनालय व माहिती फलक' : 'Rich Storybook Library Corner'}
                accentColor="#00c2a8"
                fallbackIcon="local_library"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#00c2a8] text-white neo-border-sm px-3 py-1 rounded-full text-xs font-black">
                {lang === 'mr' ? 'वाचनालय' : 'Library Corner'}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-black text-xl text-black dark:text-white">
                {lang === 'mr' ? 'समृद्ध बाल वाचनालय व गोष्टींची पुस्तके' : 'Rich Storybook Library Corner'}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'mr'
                  ? 'मराठी व इंग्रजी भाषेतील बालकथा, पंचतंत्र, विज्ञान मासिके आणि स्पर्धा परीक्षा मार्गदर्शिका पुस्तकांचा संग्रह.'
                  : 'Over 400+ curated titles ranging from Marathi folklore, Panchatantra, illustrated science books, and reference encyclopedias.'}
              </p>
            </div>
          </div>

          {/* 3. Playground & Sports */}
          <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] overflow-hidden neo-shadow group">
            <div className="h-56 border-b-4 border-black dark:border-slate-700 overflow-hidden relative">
              <SafeImage
                src="/foto/playground.jpg"
                alt={lang === 'mr' ? 'जि. प. शाळा महारकुंड क्रीडांगण व व्यायाम अभ्यास' : 'Outdoor Sports Ground & Equipment'}
                accentColor="#ff7b54"
                fallbackIcon="sports_soccer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#ff7b54] text-white neo-border-sm px-3 py-1 rounded-full text-xs font-black">
                {lang === 'mr' ? 'क्रीडांगण' : 'Playground'}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-black text-xl text-black dark:text-white">
                {lang === 'mr' ? 'खेळाचे प्रशस्त आवार व क्रीडा साहित्य' : 'Outdoor Sports Ground & Equipment'}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'mr'
                  ? 'खो-खो, कबड्डी, दोरीउड्या, रिंग आणि चेंडू खेळांसाठी आवश्यक क्रीडा साहित्य व शिक्षक मार्गदर्शन.'
                  : 'Secured ground with equipment for Kho-Kho, Kabaddi, running, skipping, and traditional physical development.'}
              </p>
            </div>
          </div>

          {/* 4. Kitchen Shed & Dining */}
          <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] overflow-hidden neo-shadow group">
            <div className="h-56 border-b-4 border-black dark:border-slate-700 overflow-hidden relative">
              <SafeImage
                src="/foto/kitchen.jpg"
                alt={lang === 'mr' ? 'जि. प. शाळा महारकुंड पीएम पोषण मध्यान्ह आहार' : 'Hygienic PM-POSHAN Kitchen Shed'}
                accentColor="#8bf3cd"
                fallbackIcon="kitchen"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#8bf3cd] text-[#005045] neo-border-sm px-3 py-1 rounded-full text-xs font-black">
                {lang === 'mr' ? 'स्वयंपाकगृह' : 'Kitchen Shed'}
              </span>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="font-black text-xl text-black dark:text-white">
                {lang === 'mr' ? 'स्वच्छ पोषण आहार स्वयंपाकगृह' : 'Hygienic PM-POSHAN Kitchen Shed'}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {lang === 'mr'
                  ? 'शासकीय निकषांनुसार बांधलेले स्वतंत्र स्वयंपाकगृह, सुरक्षित अन्नधान्य साठवणूक आणि स्वच्छता.'
                  : 'Dedicated government-approved kitchen shed for preparing hot, fresh, and protein-rich daily meals under supervision.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
