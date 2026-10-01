import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface WelfarePageProps {
  onOpenContact: () => void;
}

export const WelfarePage: React.FC<WelfarePageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();

  const weeklyMenu = [
    {
      day: 'Monday',
      dayMr: 'सोमवार',
      mainDish: 'Pithla Bhakri / Usal',
      mainDishMr: 'पिठलं भाकरी / उसळ भात',
      sideDish: 'Dal Rice & Mixed Sprouts',
      sideDishMr: 'वरण भात व मोड आलेली कडधान्ये',
      tag: 'High Protein',
      tagMr: 'प्रथिनेयुक्त आहार',
    },
    {
      day: 'Tuesday',
      dayMr: 'मंगळवार',
      mainDish: 'Masala Rice & Veg Curry',
      mainDishMr: 'मसाले भात व भाजी',
      sideDish: 'Nutritious Green Veggies',
      sideDishMr: 'ताजी हिरवी पालेभाजी',
      tag: 'Vitamin Rich',
      tagMr: 'व्हिटॅमिन समृद्ध',
    },
    {
      day: 'Wednesday',
      dayMr: 'बुधवार',
      mainDish: 'Rajma / Chana Chawal',
      mainDishMr: 'राजमा / चणा पुलाव',
      sideDish: 'Boiled Egg / Fresh Banana',
      sideDishMr: 'उकडलेले अंडे / ताजे केळे',
      tag: 'Special Wednesday',
      tagMr: 'विशेष आहार (अंडे/फळ)',
    },
    {
      day: 'Thursday',
      dayMr: 'गुरुवार',
      mainDish: 'Soyabean & Dal Curry',
      mainDishMr: 'सोयाबीन भाजी व भात',
      sideDish: 'Steamed Rice & Salad',
      sideDishMr: 'काकडी व टोमॅटो कोशिंबीर',
      tag: 'Iron Boost',
      tagMr: 'लोहयुक्त पोषण',
    },
    {
      day: 'Friday',
      dayMr: 'शुक्रवार',
      mainDish: 'Dal Khichdi & Pure Ghee',
      mainDishMr: 'मुगाची डाळ खिचडी व तूप',
      sideDish: 'Fresh Lemon & Pickle',
      sideDishMr: 'सकस हलका आहार',
      tag: 'Comfort Meal',
      tagMr: 'पचनास हलका',
    },
    {
      day: 'Saturday',
      dayMr: 'शनिवार',
      mainDish: 'Matki Usal & Rice',
      mainDishMr: 'मटकी उसळ व भात',
      sideDish: 'Jaggery Peanut Ladoo',
      sideDishMr: 'गूळ-शेंगदाणा लाडू / चिक्की',
      tag: 'Weekend Energy',
      tagMr: 'ऊर्जावर्धक खाऊ',
    },
  ];

  const welfareSchemes = [
    {
      title: lang === 'mr' ? 'मोफत पाठ्यपुस्तके (१००% मोफत)' : '100% Free Textbooks Scheme',
      desc: lang === 'mr'
        ? 'शाळा सुरू होण्याच्या पहिल्याच दिवशी सर्व इयत्ता १ ते ५ च्या विद्यार्थ्यांना बालभारतीची सर्व पाठ्यपुस्तके मोफत वाटप केली जातात.'
        : 'All Balbharati textbooks in Marathi, English, and Math provided free on reopening day.',
      icon: 'auto_stories',
      color: '#ffe16e',
    },
    {
      title: lang === 'mr' ? 'मोफत शालेय गणवेश (२ जोड)' : 'Free School Uniforms (2 Sets)',
      desc: lang === 'mr'
        ? 'सर्व मुलींना व सर्व संवर्गातील विद्यार्थ्यांना प्रतिवर्ष २ जोड मोफत दर्जेदार गणवेश शासनामार्फत दिले जातात.'
        : 'Two pairs of high-quality school uniforms distributed annually to all eligible scholars.',
      icon: 'checkroom',
      color: '#8bf3cd',
    },
    {
      title: lang === 'mr' ? 'नियमित आरोग्य व डोळे तपासणी' : 'Annual Health & Eye Checkups',
      desc: lang === 'mr'
        ? 'प्राथमिक आरोग्य केंद्र (PHC) च्या डॉक्टरांमार्फत विद्यार्थ्यांची वजन, उंची, दात व डोळे तपासणी आणि मोफत औषधोपचार.'
        : 'Routine physical health, dental, and vision screenings conducted with rural health medical teams.',
      icon: 'medical_services',
      color: '#65fade',
    },
    {
      title: lang === 'mr' ? 'सावित्रीबाई फुले व शासकीय शिष्यवृत्ती' : 'Government Scholarships Aid',
      desc: lang === 'mr'
        ? 'उपस्थिती भत्ता, मागासवर्गीय शिष्यवृत्ती आणि सावित्रीबाई फुले शिष्यवृत्तीचे थेट बँक खात्यात वाटप.'
        : 'Direct benefit transfers for girl student attendance, Savitribai Phule allowances, and merit aids.',
      icon: 'payments',
      color: '#ff7b54',
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow">
        <div className="inline-block bg-[#00c2a8] text-white neo-border-sm rounded-full px-4 py-1 text-xs font-black mb-3">
          {lang === 'mr' ? 'पीएम-पोषण व विद्यार्थी कल्याण योजना' : 'PM POSHAN & STUDENT WELFARE'}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-3">
          {lang === 'mr' ? 'मध्यान्ह भोजन व शासकीय कल्याण योजना' : 'Mid-Day Meals & Student Welfare'}
        </h1>

        <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 max-w-2xl">
          {lang === 'mr'
            ? 'जि. प. प्राथमिक शाळा महारकुंड येथे बालकांचे पोषण, आरोग्य आणि मोफत शिक्षण या मूलभूत अधिकारांची १००% अंमलबजावणी केली जाते.'
            : 'At Z.P. Primary School Maharkund, we believe that proper nutrition, health checkups, and government support schemes are vital pillars for every child\'s educational growth and well-being.'}
        </p>

        {/* PM POSHAN Highlight Box */}
        <div className="mt-6 bg-[#ffe16e] text-black neo-border rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white neo-border-sm rounded-full flex items-center justify-center font-bold text-2xl shrink-0 text-black">
              🍲
            </div>
            <div>
              <h3 className="font-black text-base text-black">
                {lang === 'mr' ? '१००% मोफत दररोज चवदार व सकस दुपारचा आहार' : '100% Free Daily Nutritious Lunch'}
              </h3>
              <p className="text-xs font-bold text-slate-800">
                {lang === 'mr'
                  ? 'शासकीय निकषांनुसार कॅलरी व प्रथिनांनी परिपूर्ण गरमागरम भोजन.'
                  : 'Served fresh on campus under PM POSHAN (Mid-Day Meal) guidelines.'}
              </p>
            </div>
          </div>
          <span className="bg-black text-white text-xs font-black px-3 py-1.5 rounded-lg border border-black shrink-0">
            {lang === 'mr' ? 'शासकीय उच्च दर्जा' : 'Government Mandated Quality'}
          </span>
        </div>
      </section>

      {/* Weekly Menu Schedule */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white">
            {lang === 'mr' ? 'साप्ताहिक पोषण आहार मेनू वेळापत्रक' : 'Weekly Mid-Day Meal Menu'}
          </h2>
          <span className="bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white neo-border-sm px-3 py-1 rounded-full text-xs font-black">
            {lang === 'mr' ? 'शैक्षणिक वर्ष २०२६ अद्ययावत' : 'Updated for Academic Year 2026'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklyMenu.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-[#ffe16e] text-black font-black text-xs px-3 py-1 rounded-lg neo-border-sm">
                    {lang === 'mr' ? item.dayMr : item.day}
                  </span>
                  <span className="text-[11px] font-black text-[#006b5c] dark:text-[#8bf3cd] bg-[#8bf3cd]/40 dark:bg-[#005045] px-2 py-0.5 rounded">
                    {lang === 'mr' ? item.tagMr : item.tag}
                  </span>
                </div>

                <h3 className="font-black text-lg text-black dark:text-white mb-1">
                  {lang === 'mr' ? item.mainDishMr : item.mainDish}
                </h3>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-4">
                  {lang === 'mr' ? item.sideDishMr : item.sideDish}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span>🍽️ {lang === 'mr' ? 'दुपारी १२:३० वाजता' : 'Served at 12:30 PM'}</span>
                <span className="text-[#00c2a8] font-black">{lang === 'mr' ? 'स्वच्छ व ताजे' : 'Fresh & Hot'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welfare Schemes 4-Card Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white">
          {lang === 'mr' ? 'शासकीय योजना व विद्यार्थी लाभ' : 'Government Welfare Schemes & Student Aids'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {welfareSchemes.map((scheme, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-6 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl neo-border-sm flex items-center justify-center font-bold text-2xl shadow-[2px_2px_0_#000] shrink-0"
                style={{ backgroundColor: scheme.color }}
              >
                <span className="material-symbols-outlined text-2xl text-black">{scheme.icon}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-black dark:text-white">{scheme.title}</h3>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{scheme.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
