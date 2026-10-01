import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface AcademicsPageProps {
  onOpenContact: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();

  const grades = [
    {
      grade: 1,
      title: lang === 'mr' ? 'इयत्ता १ ली (Grade 1)' : 'Grade 1 (Foundational)',
      desc: lang === 'mr'
        ? 'पायाभूत साक्षरता व संख्याज्ञान: मराठी वर्णमाला, मुळाक्षरे, १ ते १०० अंक, बडबडगीते व कृतियुक्त खेळ.'
        : 'Foundational Literacy & Numeracy: Marathi Alphabets, Numbers 1–100, Rhymes & Sensory Learning.',
      subjects: ['मराठी (बालभारती)', 'गणित (Math)', 'इंग्रजी (My English Book)', 'कला व खेळ'],
      color: '#ffe16e',
      icon: 'child_care',
    },
    {
      grade: 2,
      title: lang === 'mr' ? 'इयत्ता २ री (Grade 2)' : 'Grade 2 (Reading & Numbers)',
      desc: lang === 'mr'
        ? 'वाचन ओघ, बेरीज व वजाबाकी, लहान गोष्टींचे वाचन, चित्र वर्णन आणि परिसर परिचय.'
        : 'Reading Fluency, Basic Addition & Subtraction, Story Comprehension and Nature Exploration.',
      subjects: ['मराठी वाचन', 'गणित (अंकक्रिया)', 'इंग्रजी संवाद', 'परिसर परिचय'],
      color: '#8bf3cd',
      icon: 'menu_book',
    },
    {
      grade: 3,
      title: lang === 'mr' ? 'इयत्ता ३ री (Grade 3)' : 'Grade 3 (Concept Building)',
      desc: lang === 'mr'
        ? 'गुणाकार व भागाकार संकल्पना, परिसर अभ्यास (विज्ञान व समाज), वाक्यरचना व हस्तकला.'
        : 'Multiplication & Division concepts, Environmental Studies (EVS), Creative Expression & Handcrafts.',
      subjects: ['परिसर अभ्यास भाग १', 'मराठी व्याकरण', 'व्यावहारिक गणित', 'इंग्रजी'],
      color: '#65fade',
      icon: 'psychology',
    },
    {
      grade: 4,
      title: lang === 'mr' ? 'इयत्ता ४ थी (Grade 4)' : 'Grade 4 (Maharashtra History)',
      desc: lang === 'mr'
        ? 'छत्रपती शिवाजी महाराज व शिवकालीन इतिहास, परिसर अभ्यास, अपूर्णांक आणि इंग्रजी वाचन.'
        : 'Shivaji Maharaj History (Maharashtra Pride), Advanced Geography, Fractions & Science basics.',
      subjects: ['शिवछत्रपती इतिहास', 'परिसर अभ्यास भाग २', 'गणित', 'इंग्रजी व्याकरण'],
      color: '#ff7b54',
      icon: 'history_edu',
    },
    {
      grade: 5,
      title: lang === 'mr' ? 'इयत्ता ५ वी (Grade 5)' : 'Grade 5 (Scholarship & Navodaya)',
      desc: lang === 'mr'
        ? 'पूर्व उच्च प्राथमिक शिष्यवृत्ती परीक्षा तयारी, जवाहर नवोदय सराव, बुद्धिमत्ता चाचणी व विज्ञानाचे प्रयोग.'
        : 'Scholarship Exam Prep, Jawahar Navodaya Entrance coaching, Logical Reasoning & Hands-on Science.',
      subjects: ['शिष्यवृत्ती विशेष मार्गदर्शन', 'बुद्धिमत्ता चाचणी', 'भाषा व गणित', 'परिसर विज्ञान'],
      color: '#ffe16e',
      icon: 'military_tech',
    },
  ];

  const digitalResources = [
    {
      title: lang === 'mr' ? 'इ-बालभारती अधिकृत पाठ्यपुस्तके (PDF)' : 'e-Balbharati Marathi Textbooks (PDF)',
      desc: lang === 'mr'
        ? 'इयत्ता १ ली ते ५ वी ची सर्व अधिकृत पुस्तके पीडीएफ स्वरूपात मोफत डाऊनलोड करा.'
        : 'Download official Maharashtra State Board primary curriculum textbooks.',
      link: 'https://ebalbharati.in',
      icon: 'menu_book',
      badge: 'SCERT Maharashtra',
    },
    {
      title: lang === 'mr' ? 'दीक्षा (DIKSHA) ई-लर्निंग प्लॅटफॉर्म' : 'DIKSHA National E-Learning Hub',
      desc: lang === 'mr'
        ? 'क्यूआर कोड द्वारे धड्यांचे डिजिटल व्हिडिओ, प्रश्नमंजुषा व ऑडिओ स्पष्टीकरण.'
        : 'Interactive QR-coded chapter lessons, quizzes, and animations for rural scholars.',
      link: 'https://diksha.gov.in',
      icon: 'smart_display',
      badge: 'NCERT / DIKSHA',
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-block bg-[#ffe16e] text-black neo-border-sm rounded-full px-4 py-1 text-xs font-black">
            {lang === 'mr' ? 'गुणवत्तापूर्ण शिक्षण' : 'LEARNING PATH'}
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-tight">
            {lang === 'mr' ? 'शैक्षणिक उत्कृष्टता व अभ्यासक्रम' : 'Academic Excellence & Curriculum'}
          </h1>

          <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
            {lang === 'mr'
              ? 'महाराष्ट्र राज्य शिक्षण मंडळाच्या मार्गदर्शक तत्त्वांनुसार इयत्ता १ ली ते ५ वी मधील विद्यार्थ्यांना आनंददायी, कृतियुक्त आणि गुणवत्तापूर्ण शिक्षण देणारी शाळा.'
              : 'Nurturing foundational skills in a supportive Marathi medium environment for Grades 1 to 5, combining Maharashtra State Board curriculum with joyful activity-based learning.'}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenContact}
              className="bg-[#00c2a8] text-white neo-border neo-shadow-sm px-6 py-2.5 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all inline-flex items-center gap-2"
            >
              <span>{t('hero.admissionsBtn')}</span>
              <span className="material-symbols-outlined text-base">forum</span>
            </button>
            <Link
              to="/downloads"
              className="bg-white dark:bg-[#1e293b] text-black dark:text-white neo-border-sm dark:border-slate-700 px-5 py-2.5 rounded-xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>{lang === 'mr' ? 'अभ्यासक्रम डाउनलोड करा' : 'Download Syllabus'}</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md aspect-[4/3] rounded-[24px] neo-border dark:border-slate-700 neo-shadow overflow-hidden relative">
            <img
              src="/foto/academics.png"
              alt={lang === 'mr' ? 'जि. प. प्राथमिक शाळा महारकुंड शाळा प्रवेशोत्सव' : 'Academic Excellence & School Entrance Celebration at Maharkund School'}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Grades Overview Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white bg-white dark:bg-[#131b2e] inline-block px-4 py-2 neo-border-sm dark:border-slate-700 rounded-xl neo-shadow-sm rotate-[-1deg]">
            {lang === 'mr' ? 'इयत्तानिहाय अभ्यासक्रम (१ ली ते ५ वी)' : 'Grades Overview (Grades 1 to 5)'}
          </h2>
          <span className="text-xs font-black text-slate-600 dark:text-slate-400">
            {lang === 'mr' ? 'SCERT महाराष्ट्र शासन अभ्यासक्रम' : 'Aligned with SCERT Maharashtra'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.map((g) => (
            <div
              key={g.grade}
              className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-6 neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div
                    className="w-12 h-12 neo-border-sm rounded-full flex items-center justify-center font-black text-xl text-black shadow-[2px_2px_0_#000]"
                    style={{ backgroundColor: g.color }}
                  >
                    {g.grade}
                  </div>
                  <span className="material-symbols-outlined text-4xl text-[#00c2a8] group-hover:rotate-12 transition-transform">
                    {g.icon}
                  </span>
                </div>

                <h3 className="font-black text-xl text-black dark:text-white">{g.title}</h3>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{g.desc}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-[10px] font-black uppercase text-slate-400">
                  {lang === 'mr' ? 'प्रमुख विषय:' : 'Key Subjects:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.subjects.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-[#f8f9ff] dark:bg-[#0b1120] text-[11px] font-black text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Digital E-Learning Hub */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-8 neo-shadow space-y-6">
        <div>
          <span className="bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded neo-border-sm">
            {lang === 'mr' ? 'डिजिटल शिक्षण साधन' : 'Digital Learning Resources'}
          </span>
          <h2 className="text-2xl font-black text-black dark:text-white mt-1">
            {lang === 'mr' ? 'ई-बालभारती व दीक्षा डिजिटल प्लॅटफॉर्म' : 'E-Balbharti & Digital Learning Hub'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {digitalResources.map((res, idx) => (
            <a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-700 rounded-2xl p-5 hover:bg-[#ffe16e]/20 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase bg-[#ffe16e] text-black px-2 py-0.5 rounded">
                    {res.badge}
                  </span>
                  <span className="material-symbols-outlined text-xl text-[#00c2a8] group-hover:translate-x-1 transition-transform">
                    open_in_new
                  </span>
                </div>
                <h3 className="font-black text-base text-black dark:text-white">{res.title}</h3>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{res.desc}</p>
              </div>
              <div className="pt-3 mt-2 text-xs font-black text-[#00c2a8] flex items-center gap-1">
                <span>{lang === 'mr' ? 'अधिकृत पोर्टलवर जा' : 'Access Digital Portal'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
