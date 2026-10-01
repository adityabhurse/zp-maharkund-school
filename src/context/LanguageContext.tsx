import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'school.name': 'Z.P. Primary School, Maharkund',
    'school.shortName': 'Z.P. Maharkund',
    'school.tagline': 'Saoner Block, Nagpur District, Maharashtra',
    'school.udise': 'UDISE: 27090411101',
    'school.established': 'Est. 1991',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.academics': 'Academics',
    'nav.facilities': 'Facilities',
    'nav.welfare': 'PM POSHAN & Welfare',
    'nav.gallery': 'Gallery',
    'nav.downloads': 'Downloads & Circulars',
    'nav.calendar': 'School Calendar',
    'nav.achievements': 'Achievements',
    'nav.admin': 'Staff Portal',
    'nav.contact': 'Contact / Admissions',
    'nav.menu': 'Menu',

    // Hero Section
    'hero.badge': 'Nagpur, Maharashtra | Nurturing Young Minds Since 1991',
    'hero.title': 'Z.P. Primary School, Maharkund',
    'hero.subtitle': 'Providing foundational education and holistic development in a safe, community-rooted, Marathi-medium environment for rural scholars in Grades 1 to 5.',
    'hero.exploreBtn': 'Explore Facilities',
    'hero.academicBtn': 'Academic Info',
    'hero.admissionsBtn': 'Enquire for Admissions 2026-27',
    'hero.buildingCaption': 'Main School Building & Playground',

    // Quick Stats
    'stat.est': 'Established Year',
    'stat.grades': 'Primary Grades',
    'stat.coed': 'Institution',
    'stat.coedVal': 'Co-ed',
    'stat.medium': 'Medium of Study',
    'stat.marathi': 'Marathi',
    'stat.udise': 'Government UDISE',

    // Quick Action Pillars
    'pillar.academics.title': 'Foundational Curriculum',
    'pillar.academics.desc': 'Maharashtra State Board aligned Marathi-medium instruction with activity-based learning.',
    'pillar.welfare.title': '100% Free PM POSHAN Meals',
    'pillar.welfare.desc': 'Daily hot nutritious lunches prepared fresh on campus following government hygiene standards.',
    'pillar.facilities.title': 'Digital Classroom & Library',
    'pillar.facilities.desc': 'Smart TV learning modules, sports playground, clean RO drinking water and child-friendly toilets.',
    'pillar.calendar.title': 'Annual Academic Calendar',
    'pillar.calendar.desc': 'Check upcoming unit tests, semester exams, national festivals, and school holidays.',
    'pillar.circulars.title': 'Official Circulars & Forms',
    'pillar.circulars.desc': 'Download admission forms, syllabus outlines, holiday lists, and RTE guidelines.',
    'pillar.achievements.title': 'Student Hall of Fame',
    'pillar.achievements.desc': 'Celebrating our bright stars in scholarship exams, sports, drawing, and cultural events.',

    // Common Buttons & Actions
    'btn.readMore': 'Read More',
    'btn.viewAll': 'View All',
    'btn.download': 'Download PDF',
    'btn.downloadForm': 'Download Admission Form',
    'btn.callUs': 'Call Headmaster',
    'btn.getDirections': 'Get Directions',
    'btn.submit': 'Submit Inquiry',
    'btn.submitting': 'Submitting...',
    'btn.close': 'Close',
    'btn.filterAll': 'All',
    'btn.backToHome': 'Back to Home',

    // Notice Bar
    'notice.ticker': 'Latest Notice',
    'notice.liveBadge': 'LIVE',
    
    // Contact Modal
    'modal.contact.title': 'Admissions & School Inquiry',
    'modal.contact.subtitle': 'Fill out this form or call the school headmaster directly. We welcome every child into Grades 1 to 5.',
    'modal.contact.parentName': 'Parent / Guardian Name',
    'modal.contact.parentNamePlaceholder': 'e.g. Ramesh Patil',
    'modal.contact.phone': '10-Digit Mobile Number',
    'modal.contact.phonePlaceholder': 'e.g. 9876543210',
    'modal.contact.grade': 'Child Grade for Admission',
    'modal.contact.subject': 'Inquiry Subject',
    'modal.contact.message': 'Your Message / Questions',
    'modal.contact.messagePlaceholder': 'Write your questions about admission documents, transfer certificates, or school timings...',
    'modal.contact.successTitle': 'Inquiry Submitted Successfully!',
    'modal.contact.successDesc': 'Your inquiry has been recorded. Our administrative staff will contact you shortly.',

    // Footer
    'footer.aboutDesc': 'Zilla Parishad Primary School Maharkund is a government recognized Marathi-medium elementary institution dedicated to child-centric foundational learning in Saoner Block, Nagpur.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'School Contact & Location',
    'footer.address': 'At Post Maharkund, Saoner Block, Nagpur District, Maharashtra - 441107',
    'footer.timing': 'School Timings: Mon – Fri: 10:00 AM – 5:00 PM | Sat: 8:00 AM – 12:30 PM',
    'footer.rights': 'All Rights Reserved. Z.P. Primary School Maharkund, Nagpur.',
    'footer.adminLink': 'Teacher & Staff Login',
  },
  mr: {
    // Brand & Header
    'school.name': 'जि. प. प्राथमिक शाळा, महारकुंड',
    'school.shortName': 'जि. प. महारकुंड',
    'school.tagline': 'पंचायत समिती सावनेर, जि. नागपूर, महाराष्ट्र',
    'school.udise': 'युडास क्रमांक: २७०९०४१११०१',
    'school.established': 'स्थापना: १९९१',
    
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'शाळेविषयी',
    'nav.academics': 'शैक्षणिक',
    'nav.facilities': 'सुविधा',
    'nav.welfare': 'पोषण आहार व कल्याण',
    'nav.gallery': 'छायाचित्रे',
    'nav.downloads': 'परिपत्रके व अर्ज',
    'nav.calendar': 'वार्षिक दिनदर्शिका',
    'nav.achievements': 'यशस्वी विद्यार्थी',
    'nav.admin': 'शिक्षक पोर्टल',
    'nav.contact': 'प्रवेश / संपर्क',
    'nav.menu': 'सूची',

    // Hero Section
    'hero.badge': 'नागपूर, महाराष्ट्र | १९९१ पासून ग्रामीण विद्यार्थ्यांची ज्ञानगंगा',
    'hero.title': 'जि. प. प्राथमिक शाळा, महारकुंड',
    'hero.subtitle': 'इयत्ता १ ली ते ५ वी च्या ग्रामीण विद्यार्थ्यांसाठी सुरक्षित, आनंददायी आणि संस्कारक्षम मराठी माध्यमात दर्जेदार प्राथमिक शिक्षण.',
    'hero.exploreBtn': 'शालेय सुविधा पहा',
    'hero.academicBtn': 'शैक्षणिक माहिती',
    'hero.admissionsBtn': 'प्रवेश २०२६-२७ ची चौकशी करा',
    'hero.buildingCaption': 'शाळेची मुख्य इमारत व भव्य क्रीडांगण',

    // Quick Stats
    'stat.est': 'स्थापना वर्ष',
    'stat.grades': 'प्राथमिक वर्ग',
    'stat.coed': 'सहशिक्षण',
    'stat.coedVal': 'मुलगा व मुलगी',
    'stat.medium': 'शिक्षणाचे माध्यम',
    'stat.marathi': 'मराठी माध्यम',
    'stat.udise': 'शासकीय युडायस कोड',

    // Quick Action Pillars
    'pillar.academics.title': 'पायाभूत अभ्यासक्रम',
    'pillar.academics.desc': 'महाराष्ट्र राज्य शिक्षण मंडळाच्या मार्गदर्शक तत्त्वांवर आधारित कृतियुक्त व आनंददायी शिक्षण.',
    'pillar.welfare.title': '१००% मोफत पीएम-पोषण आहार',
    'pillar.welfare.desc': 'स्वच्छ वातावरणात बनवला जाणारा गरमागरम चवदार व पौष्टिक दुपारचा आहार.',
    'pillar.facilities.title': 'डिजिटल वर्गखोली व ग्रंथालय',
    'pillar.facilities.desc': 'स्मार्ट टीव्ही, ई-लर्निंग, प्रशस्त खेळण्याचे मैदान, शुद्ध पिण्याचे पाणी व स्वतंत्र स्वच्छतागृहे.',
    'pillar.calendar.title': 'वार्षिक शैक्षणिक दिनदर्शिका',
    'pillar.calendar.desc': 'सत्र परीक्षा, घटक चाचण्या, राष्ट्रीय सण आणि शालेय सुट्ट्यांचे संपूर्ण वेळापत्रक.',
    'pillar.circulars.title': 'शासकीय परिपत्रके व अर्ज',
    'pillar.circulars.desc': 'प्रवेश अर्ज, अभ्यासक्रम रूपरेषा, सुट्टी यादी आणि शिक्षण हक्क (RTE) नियमावली डाउनलोड करा.',
    'pillar.achievements.title': 'गुणवंत विद्यार्थी दालन',
    'pillar.achievements.desc': 'स्कॉलरशिप परीक्षा, क्रीडा स्पर्धा, चित्रकला व सांस्कृतिक कार्यक्रमातील यशस्वी विद्यार्थी.',

    // Common Buttons & Actions
    'btn.readMore': 'अधिक वाचा',
    'btn.viewAll': 'सर्व पहा',
    'btn.download': 'पीडीएफ डाउनलोड करा',
    'btn.downloadForm': 'प्रवेश अर्ज डाउनलोड करा',
    'btn.callUs': 'मुख्याध्यापकांशी बोला',
    'btn.getDirections': 'नकाशा व दिशा पहा',
    'btn.submit': 'चौकशी नोंदवा',
    'btn.submitting': 'नोंदवत आहे...',
    'btn.close': 'बंद करा',
    'btn.filterAll': 'सर्व',
    'btn.backToHome': 'मुख्यपृष्ठावर जा',

    // Notice Bar
    'notice.ticker': 'महत्त्वाची सूचना',
    'notice.liveBadge': 'थेट',
    
    // Contact Modal
    'modal.contact.title': 'प्रवेश व शालेय चौकशी',
    'modal.contact.subtitle': 'इयत्ता १ ली ते ५ वी मध्ये मोफत व दर्जेदार प्रवेशासाठी खालील अर्ज भरा किंवा थेट मुख्याध्यापकांशी संपर्क साधा.',
    'modal.contact.parentName': 'पालकांचे पूर्ण नाव',
    'modal.contact.parentNamePlaceholder': 'उदा. रमेश पाटील',
    'modal.contact.phone': '१० अंकी मोबाईल क्रमांक',
    'modal.contact.phonePlaceholder': 'उदा. ९८७६५४३२१०',
    'modal.contact.grade': 'प्रवेशासाठी इयत्ता',
    'modal.contact.subject': 'चौकशीचा विषय',
    'modal.contact.message': 'आपला संदेश / प्रश्न',
    'modal.contact.messagePlaceholder': 'दाखला, मोफत पुस्तके, गणवेश किंवा शाळेच्या वेळेबाबत आपले प्रश्न लिहा...',
    'modal.contact.successTitle': 'चौकशी यशस्वीरीत्या नोंदवली गेली!',
    'modal.contact.successDesc': 'आपली माहिती शाळेच्या प्रशासनाकडे पोहोचली आहे. आम्ही लवकरच आपल्याशी संपर्क करू.',

    // Footer
    'footer.aboutDesc': 'जिल्हा परिषद प्राथमिक शाळा महारकुंड ही सावनेर तालुक्यातील एक अग्रगण्य शासकीय प्राथमिक शाळा असून येथे विद्यार्थ्यांचा सर्वांगीण विकास घडवून आणला जातो.',
    'footer.quickLinks': 'महत्त्वाचे दुवे',
    'footer.contactInfo': 'शाळेचा पत्ता व संपर्क',
    'footer.address': 'मु. पो. महारकुंड, ता. सावनेर, जि. नागपूर, महाराष्ट्र - ४४११०७',
    'footer.timing': 'शाळेची वेळ: सोम – शुक्र: सकाळी १०:०० ते सायं ५:०० | शनि: स. ८:०० ते दु. १२:३०',
    'footer.rights': 'सर्व हक्क राखीव. जि. प. प्राथमिक शाळा महारकुंड, नागपूर.',
    'footer.adminLink': 'शिक्षक व मुख्याध्यापक लॉगिन',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('zp_school_lang');
    return (saved === 'mr' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('zp_school_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'mr' : 'en');
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
