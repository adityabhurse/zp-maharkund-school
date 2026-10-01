import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AchievementItem } from '../types';

export const AchievementsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const defaultAchievements: AchievementItem[] = [
    {
      id: 'ach-1',
      title: 'Middle School Scholarship Examination 2025',
      titleMr: 'पूर्व उच्च प्राथमिक शिष्यवृत्ती परीक्षा २०२५',
      studentName: 'Tanvi Rajesh Bokde',
      studentNameMr: 'कु. तन्वी राजेश बोकडे',
      grade: 'Grade 5 (इयत्ता ५ वी)',
      year: '2025',
      category: 'Scholarship',
      award: 'Merit List Holder (Taluka Rank 3)',
      awardMr: 'तालुका गुणवत्ता यादीत तृतीय क्रमांक',
      icon: 'military_tech',
      accentColor: '#ffe16e',
      description: 'Secured state scholarship award with distinction in Marathi and Mathematics.',
      descriptionMr: 'सावनेर तालुक्यात उज्ज्वल यश संपादन करून शासकीय शिष्यवृत्ती मिळवली.'
    },
    {
      id: 'ach-2',
      title: 'Jawahar Navodaya Vidyalaya Selection',
      titleMr: 'जवाहर नवोदय विद्यालय निवड चाचणी',
      studentName: 'Omkar Vijayrao Dhoke',
      studentNameMr: 'चि. ओंकार विजयराव ढोके',
      grade: 'Grade 5 (इयत्ता ५ वी)',
      year: '2024',
      category: 'Navodaya',
      award: 'Selected for JNV Navegaon Khairi',
      awardMr: 'नवोदय विद्यालय नवेगाव खैरीसाठी निवड',
      icon: 'school',
      accentColor: '#00c2a8',
      description: 'Qualified the prestigious national entrance examination with a 100% free residential seat.',
      descriptionMr: 'राष्ट्रीय पातळीवरील कठीण प्रवेश परीक्षेत यश मिळवून मोफत निवासी शाळेत निवड.'
    },
    {
      id: 'ach-3',
      title: 'Taluka Level Primary Sports Meet (Kho-Kho)',
      titleMr: 'तालुकास्तरीय प्राथमिक क्रीडा स्पर्धा (खो-खो)',
      studentName: 'Girls Kho-Kho Team (Maharkund)',
      studentNameMr: 'मुलींचा खो-खो संघ (महारकुंड)',
      grade: 'Grades 4 & 5',
      year: '2025',
      category: 'Sports',
      award: 'Runners-Up Trophy (सावनेर तालुका उपविजेते)',
      awardMr: 'सावनेर तालुका उपविजेतेपद',
      icon: 'emoji_events',
      accentColor: '#ff7b54',
      description: 'Demonstrated outstanding teamwork, endurance, and agility against 24 participating schools.',
      descriptionMr: '२४ शाळांच्या स्पर्धेत उत्कृष्ट खेळ करून उपविजेतेपद पटकावले.'
    },
    {
      id: 'ach-4',
      title: 'District Level Drawing & Craft Competition',
      titleMr: 'जिल्हास्तरीय बाल चित्रकला व हस्तकला स्पर्धा',
      studentName: 'Pranav Nilesh Shinde',
      studentNameMr: 'चि. प्रणव निलेश शिंदे',
      grade: 'Grade 3 (इयत्ता ३ री)',
      year: '2025',
      category: 'Science & Arts',
      award: 'First Prize (प्रथम पारितोषिक)',
      awardMr: 'नागपूर जिल्हा प्रथम पारितोषिक',
      icon: 'palette',
      accentColor: '#8bf3cd',
      description: 'Awarded gold certificate for depiction of rural village life and environmental conservation.',
      descriptionMr: 'पर्यावरण संवर्धन व ग्रामीण जीवन विषयावरील उत्कृष्ट चित्रास सुवर्ण प्रमाणपत्र.'
    }
  ];

  const [achievements, setAchievements] = useState<AchievementItem[]>(defaultAchievements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAchievements(data.data);
        }
      })
      .catch((err) => console.log('Loaded fallback achievements:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ffe16e] rounded-full mix-blend-multiply opacity-60 neo-border pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-block bg-[#ff7b54] text-white neo-border-sm rounded-lg px-3.5 py-1 text-xs font-black">
            {lang === 'mr' ? 'शाळेचा अभिमान व गौरव' : 'Pride of Maharkund'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            {lang === 'mr' ? 'गुणवंत विद्यार्थी व यशोगाथा' : 'Student Achievements & Hall of Fame'}
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === 'mr'
              ? 'शासकीय शिष्यवृत्ती परीक्षा, जवाहर नवोदय विद्यालय प्रवेश, तालुकास्तरीय क्रीडा व चित्रकला स्पर्धांमध्ये दैदीप्यमान यश मिळवणारे आमचे विद्यार्थी.'
              : 'Celebrating our bright rural scholars in state scholarship examinations, Navodaya Vidyalaya selections, sports tournaments, and creative arts.'}
          </p>
        </div>
      </section>

      {/* Key Highlights Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#ffe16e] text-black neo-border rounded-2xl p-5 text-center neo-shadow">
          <div className="text-3xl font-black mb-1">100%</div>
          <div className="text-xs font-black text-slate-800">
            {lang === 'mr' ? 'वार्षिक प्राथमिक निकाल' : 'Primary Pass Rate'}
          </div>
        </div>

        <div className="bg-[#8bf3cd] neo-border rounded-2xl p-5 text-center neo-shadow">
          <div className="text-3xl font-black text-[#005045] mb-1">15+</div>
          <div className="text-xs font-black text-[#005045]">
            {lang === 'mr' ? 'शिष्यवृत्तीधारक विद्यार्थी' : 'Scholarship Awardees'}
          </div>
        </div>

        <div className="bg-[#65fade] neo-border rounded-2xl p-5 text-center neo-shadow">
          <div className="text-3xl font-black text-[#002a24] mb-1">JNV</div>
          <div className="text-xs font-black text-[#002a24]">
            {lang === 'mr' ? 'नवोदय निवड परंपरा' : 'Navodaya Selections'}
          </div>
        </div>

        <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 text-center neo-shadow">
          <div className="text-3xl font-black text-black dark:text-white mb-1">२४+</div>
          <div className="text-xs font-black text-slate-700 dark:text-slate-300">
            {lang === 'mr' ? 'क्रीडा व कला पारितोषिके' : 'Sports & Arts Trophies'}
          </div>
        </div>
      </section>

      {/* Achievements Cards Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white bg-white dark:bg-[#131b2e] inline-block px-4 py-2 neo-border-sm dark:border-slate-700 rounded-xl neo-shadow-sm rotate-[-1deg]">
          {lang === 'mr' ? 'विशेष सन्मान व पारितोषिके' : 'Distinguished Honors & Awards'}
        </h2>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-bold">Loading achievements...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item) => {
              const displayTitle = (lang === 'mr' && item.titleMr) ? item.titleMr : item.title;
              const displayName = (lang === 'mr' && item.studentNameMr) ? item.studentNameMr : item.studentName;
              const displayAward = (lang === 'mr' && item.awardMr) ? item.awardMr : item.award;
              const displayDesc = (lang === 'mr' && item.descriptionMr) ? item.descriptionMr : item.description;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-6 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl neo-border-sm flex items-center justify-center font-bold text-2xl text-black shadow-[2px_2px_0_#000]"
                          style={{ backgroundColor: item.accentColor }}
                        >
                          <span className="material-symbols-outlined text-2xl text-black">
                            {item.icon || 'military_tech'}
                          </span>
                        </div>
                        <div>
                          <span className="bg-[#000e24] text-[#8bf3cd] text-[10px] font-black uppercase px-2 py-0.5 rounded">
                            {item.category} • {item.year}
                          </span>
                          <h3 className="text-lg font-black text-black dark:text-white mt-0.5">{displayName}</h3>
                          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.grade}</div>
                        </div>
                      </div>
                    </div>

                    {/* Award Highlight Badge */}
                    <div className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-3">
                      <div className="text-xs font-black text-[#00c2a8] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">emoji_events</span>
                        <span>{displayAward}</span>
                      </div>
                      <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">{displayTitle}</div>
                    </div>

                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span>🏆 Z.P. Primary School Maharkund</span>
                    <span className="text-[#00c2a8] font-black">Saoner Block</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Inspiring Quote Box */}
      <section className="bg-[#ffe16e] text-black neo-border rounded-[28px] p-6 md:p-8 neo-shadow flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-white neo-border rounded-full flex items-center justify-center text-3xl font-black shrink-0 text-black">
          💡
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-black text-black">
            {lang === 'mr' ? 'प्रत्येक मूल हे प्रतिभावान असते!' : 'Every Rural Child Holds Infinite Potential!'}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
            {lang === 'mr'
              ? 'आम्ही केवळ पुस्तकी ज्ञान देत नाही, तर प्रत्येक मुलाची आंतरिक आवड ओळखून त्याला शिष्यवृत्ती, क्रीडा व कला क्षेत्रात पुढे नेतो.'
              : 'Our dedicated teachers provide personalized guidance, weekend scholarship training, and sports coaching to ensure every student thrives.'}
          </p>
        </div>
      </section>
    </div>
  );
};
