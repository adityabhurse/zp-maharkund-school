import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onOpenContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);



  const smcMembers = [
    { role: 'SMC President / अध्यक्ष', roleMr: 'शाळा व्यवस्थापन समिती अध्यक्ष', name: 'Dipak Sahare (Sarpanch)' },
    { role: 'Vice President / उपाध्यक्षा', roleMr: 'उपाध्यक्षा (महिला प्रतिनिधी)', name: 'S.L. Dabre' },
    { role: 'Member Secretary / सचिव', roleMr: 'सदस्य सचिव', name: 'Headmaster, Z.P. School Maharkund' },
    { role: 'Parent Representative', roleMr: 'पालक प्रतिनिधी', name: 'Dipali Kumbre' },
  ];

  const faqs = [
    {
      q: 'What is the age requirement for Standard 1 admission?',
      qMr: 'इयत्ता १ ली मध्ये प्रवेशासाठी वयाची काय अट आहे?',
      a: 'As per the National Education Policy (NEP) and Maharashtra Govt guidelines, a child should complete 6 years of age as of 31st December 2026 for Standard 1 enrollment.',
      aMr: 'शासनाच्या नवीन शैक्षणिक धोरणानुसार (NEP) ३१ डिसेंबर २०२६ पर्यंत बालकाचे वय ६ वर्षे पूर्ण असणे आवश्यक आहे.',
    },
    {
      q: 'Are there any admission or tuition fees at Z.P. School?',
      qMr: 'शाळेत प्रवेश किंवा शिक्षणासाठी कोणतेही शुल्क आहे का?',
      a: 'No. Education at Z.P. Primary School Maharkund is 100% Free under the Right to Education (RTE) Act. No donation, admission, or examination fees are charged.',
      aMr: 'नाही. शिक्षण हक्क (RTE) कायद्यांतर्गत इयत्ता १ ली ते ५ वी पर्यंतचे शिक्षण १००% मोफत आहे. कोणत्याही प्रकारचे प्रवेश शुल्क अथवा परीक्षा फी घेतली जात नाही.',
    },
    {
      q: 'What documents are required during admission enrollment?',
      qMr: 'प्रवेशासाठी कोणती कागदपत्रे लागतात?',
      a: 'Required documents: (1) Child Birth Certificate, (2) Aadhar Card copy, (3) Parent Aadhar & Ration Card copy, (4) Passport size photo, (5) Previous school LC/TC if transferring.',
      aMr: 'आवश्यक कागदपत्रे: (१) जन्म दाखला, (२) विद्यार्थ्यांचे आधार कार्ड, (३) पालकांचे आधार व रेशन कार्ड, (४) २ पासपोर्ट फोटो, (५) दाखला (इतर शाळेतून येत असल्यास).',
    },
    {
      q: 'How is the quality and hygiene of the Mid-Day Meal ensured?',
      qMr: 'दुपारच्या पोषण आहाराची स्वच्छता व दर्जा कसा राखला जातो?',
      a: 'Meals are freshly prepared in our dedicated kitchen shed daily with RO purified water. Food is tested by teachers and SMC members before serving to children.',
      aMr: 'दररोज स्वच्छ किचन शेडमध्ये शुद्ध पाण्याचा वापर करून ताजे जेवण बनवले जाते. जेवण वाढण्यापूर्वी शिक्षक व समिती सदस्यांकडून चव व दर्जाची तपासणी केली जाते.',
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-12 neo-shadow relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ffe16e] rounded-full mix-blend-multiply opacity-50 neo-border pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-6 space-y-4">
            <div className="inline-block bg-[#8bf3cd] dark:bg-[#005045] neo-border-sm rounded-full px-4 py-1 mb-2">
              <span className="font-black text-xs text-[#005045] dark:text-white">
                {lang === 'mr' ? 'स्थापना: १९९१' : 'EST. 1991'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
              {lang === 'mr' ? 'महारकुंड शाळेची गौरवशाली परंपरा' : 'A Legacy of Learning in Maharkund'}
            </h1>

            <p className="text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
              {lang === 'mr'
                ? 'गेल्या ३ दशकांपासून जि. प. प्राथमिक शाळा महारकुंड ही सावनेर तालुक्यातील ग्रामीण विद्यार्थ्यांच्या शैक्षणिक व संस्कारक्षम प्रगतीचा आधारस्तंभ आहे.'
                : 'For over three decades, Z.P. Primary School Maharkund has been the beating heart of our community, providing quality Marathi-medium education and nurturing generations of rural scholars.'}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('our-roots-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#ffe16e] text-black neo-border neo-shadow-sm px-6 py-3 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all inline-flex items-center gap-2"
              >
                <span>{lang === 'mr' ? 'शाळेचा प्रवास जाणून घ्या' : 'Discover Our Journey'}</span>
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </button>
              <button
                onClick={onOpenContact}
                className="bg-[#00c2a8] text-white neo-border neo-shadow-sm px-6 py-3 rounded-xl font-black text-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>

          <div className="md:col-span-6 flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-[32px] neo-border dark:border-slate-700 neo-shadow overflow-hidden bg-[#d5e3ff] relative">
              <img
                src="/foto/about_legacy.png"
                alt={lang === 'mr' ? 'जि. प. प्राथमिक शाळा महारकुंड - विद्यार्थी व शिक्षक वर्गात' : 'Z.P. Primary School Maharkund students and teacher in classroom'}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Narrative */}
      <section id="our-roots-section" className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute -inset-4 bg-[#00c2a8] neo-border rounded-[24px] transform -rotate-2 z-0" />
            <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] p-2 relative z-10 neo-shadow">
              <img
                src="/school-building.jpg"
                alt="Z.P. Maharkund School main building with constitution preamble board"
                className="w-full h-auto rounded-[16px] object-cover aspect-[4/3]"
              />
            </div>
          </div>

          <div className="md:col-span-7 md:pl-4 space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white inline-block bg-[#ffe16e] dark:bg-[#ffe16e] text-black px-4 py-1.5 neo-border-sm rounded-lg transform -skew-x-3">
              {lang === 'mr' ? 'शाळेची स्थापना व उद्दिष्टे' : 'Our Roots & Mission'}
            </h2>

            <p className="text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
              {lang === 'mr'
                ? '१९९१ मध्ये स्थापन झालेली जि. प. प्राथमिक शाळा महारकुंड ही प्रत्येक ग्रामीण मुलापर्यंत मोफत, दर्जेदार आणि संस्कारक्षम प्राथमिक शिक्षण पोहोचवण्यासाठी अविरत कार्यरत आहे.'
                : 'Established in 1991, Z.P. Primary School Maharkund was born out of a simple yet profound vision: to bring accessible, high-quality education to the rural heartland.'}
            </p>

            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
              {lang === 'mr'
                ? 'जिल्हा परिषद नागपूरच्या अधिपत्याखाली चालणारी ही सहशिक्षणाची मराठी माध्यम शाळा इयत्ता १ ली ते ५ वी पर्यंतच्या विद्यार्थ्यांना आनंददायी शिक्षण, कृतियुक्त प्रयोग आणि क्रीडा संधी प्रदान करते.'
                : 'Operating under Zilla Parishad governance, we are a co-educational Marathi-medium school dedicated to serving students from Grades 1 to 5 with child-centric pedagogical practices.'}
            </p>

            <div className="flex gap-4 flex-wrap pt-2">
              <div className="bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 neo-shadow-sm flex-1 min-w-[200px]">
                <div className="bg-[#00c2a8] p-2.5 rounded-lg text-white font-bold neo-border-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                </div>
                <div>
                  <h4 className="font-black text-black dark:text-white">{lang === 'mr' ? 'सहशिक्षण (Co-Ed)' : 'Co-Educational'}</h4>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{lang === 'mr' ? 'इयत्ता १ ते ५ चे विद्यार्थी' : 'Grades 1-5 Scholars'}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 neo-shadow-sm flex-1 min-w-[200px]">
                <div className="bg-[#ff7b54] p-2.5 rounded-lg text-white font-bold neo-border-sm">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
                </div>
                <div>
                  <h4 className="font-black text-black dark:text-white">{lang === 'mr' ? 'मराठी माध्यम' : 'Marathi Medium'}</h4>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{lang === 'mr' ? 'मातृभाषेतून ज्ञान समृद्धी' : 'Cultural Roots & Mother Tongue'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Principal / Headmaster's Desk Message Section */}
      <section className="bg-[#fff9e6] dark:bg-[#1c2438] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Headmaster Photo & Profile Card */}
          <div className="w-full md:w-5/12 shrink-0">
            <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-5 neo-shadow text-center space-y-3 relative">
              <div className="w-36 h-40 sm:w-40 sm:h-44 mx-auto rounded-2xl bg-[#ffe16e] neo-border overflow-hidden shadow-[4px_4px_0_#000] relative group">
                <img
                  src="/foto/principle.jpeg"
                  alt={lang === 'mr' ? 'श्री. योगेश जे. भुरसे - मुख्याध्यापक' : 'Shri. Yogesh J. Bhurse - Headmaster / Principal'}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[10px] font-black text-black uppercase bg-[#8bf3cd] px-2.5 py-0.5 rounded neo-border-sm">
                  {lang === 'mr' ? 'मुख्याध्यापक कक्ष' : "Headmaster's Desk"}
                </span>
                <h3 className="text-xl font-black text-black dark:text-white mt-1">
                  {lang === 'mr' ? 'श्री. योगेश जे. भुरसे' : 'Shri. Yogesh J. Bhurse'}
                </h3>
                <p className="text-xs font-bold text-[#00c2a8]">
                  {lang === 'mr' ? 'मुख्याध्यापक, जि. प. शाळा महारकुंड' : 'Headmaster / Principal'}
                </p>
              </div>

              <div className="bg-[#f8f9ff] dark:bg-[#0b1120] p-3 rounded-xl neo-border-sm dark:border-slate-800 text-xs text-left space-y-1.5 font-bold">
                <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#00c2a8]">workspace_premium</span>
                  <span><strong>{lang === 'mr' ? 'पात्रता:' : 'Degree:'}</strong> M.A., B.Ed., D.T.Ed</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-[#ff7b54]">history_edu</span>
                  <span><strong>{lang === 'mr' ? 'अनुभव:' : 'Experience:'}</strong> {lang === 'mr' ? '२२+ वर्षे प्राथमिक शिक्षण' : '22+ Years in Primary Education'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Principal's Message Content */}
          <div className="w-full md:w-7/12 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#00c2a8]">format_quote</span>
              <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white">
                {lang === 'mr' ? 'मुख्याध्यापकांचे मनोगत' : "Principal's Message"}
              </h2>
            </div>

            <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-4 border-[#00c2a8] pl-4 py-1">
              {lang === 'mr'
                ? '"आमचे ध्येय केवळ पुस्तकी ज्ञान देणे नसून ग्रामीण भागातील प्रत्येक बालकामध्ये उत्कृष्ट संस्कार, वैज्ञानिक दृष्टिकोन आणि स्वावलंबनाची भावना निर्माण करणे हे आहे. जि. प. प्राथमिक शाळा महारकुंड येथे आम्ही प्रत्येक विद्यार्थ्याच्या सर्वांगीण व उज्ज्वल भविष्यासाठी कटिबद्ध आहोत."'
                : '"Our mission is not merely to impart textbook education, but to instill moral values, scientific inquiry, and self-reliance in every rural child. At Z.P. Primary School Maharkund, we are dedicated to shaping a bright and empowered future for every student."'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00c2a8] text-xl">child_care</span>
                <span className="text-xs font-black text-black dark:text-white">{lang === 'mr' ? 'विद्यार्थी-केंद्रित शिक्षण' : 'Student-Centric'}</span>
              </div>
              <div className="bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl p-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff7b54] text-xl">devices</span>
                <span className="text-xs font-black text-black dark:text-white">{lang === 'mr' ? 'डिजिटल व ई-लर्निंग' : 'Digital Classrooms'}</span>
              </div>
              <div className="bg-white dark:bg-[#131b2e] neo-border-sm dark:border-slate-700 rounded-xl p-3 flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="material-symbols-outlined text-[#ffe16e] text-xl">military_tech</span>
                <span className="text-xs font-black text-black dark:text-white">{lang === 'mr' ? 'संस्कार व मूल्ये' : 'Values & Ethics'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SMC & Governance Directory */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-8 neo-shadow space-y-6">
        <h2 className="text-2xl font-black text-black dark:text-white">
          {lang === 'mr' ? 'शाळा व्यवस्थापन समिती (SMC) पदाधिकारी' : 'School Management Committee (SMC) Members'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {smcMembers.map((member, idx) => (
            <div key={idx} className="bg-[#f8f9ff] dark:bg-[#0b1120] neo-border-sm dark:border-slate-800 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-black uppercase text-[#006b5c] dark:text-[#8bf3cd] bg-[#8bf3cd]/40 dark:bg-[#005045] px-2 py-0.5 rounded">
                {lang === 'mr' ? member.roleMr : member.role}
              </span>
              <h4 className="font-black text-sm text-black dark:text-white mt-1">{member.name}</h4>
              <p className="text-[11px] font-bold text-slate-500">Maharkund, Saoner</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bilingual FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white bg-white dark:bg-[#131b2e] inline-block px-4 py-2 neo-border-sm dark:border-slate-700 rounded-xl neo-shadow-sm">
          {lang === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl overflow-hidden neo-shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-black text-sm sm:text-base text-black dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{lang === 'mr' ? faq.qMr : faq.q}</span>
                  <span className="material-symbols-outlined text-xl transition-transform text-[#00c2a8]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3 leading-relaxed animate-fadeIn">
                    {lang === 'mr' ? faq.aMr : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
