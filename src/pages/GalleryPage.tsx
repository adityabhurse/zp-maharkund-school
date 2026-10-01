import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GalleryItem } from '../types';
import { SafeImage } from '../components/SafeImage';

export const GalleryPage: React.FC = () => {
  const { lang } = useLanguage();
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Our Vibrant Classrooms',
      titleMr: 'आमच्या डिजिटल व बोलक्या वर्गखोल्या',
      category: 'classrooms',
      accentColor: '#ffe16e',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOa3bSk42wkBb9OfWrDbUa8UMloW7tC9coQC980C6zBn2dGO-BxnntS9zHl_qJTPMCq5RpaVdEidAIMa1Q86mzvvNPP7avws5ROqQOgI2tUYFgz2RZ2kdWx2cbg-8KmfyFF5mGFC4zYF5aZhJh287AqhqnwS8u5sjX0yMIPxj4-sSR7D0ZsfERoD25iowNAHA4BycT9kaT8Wef8TzshWqg4fyUVoO87evy24ZoRc4W1csjdn66xLVn',
      description: 'Interactive and joyful learning spaces where curiosity blooms.',
      descriptionMr: 'आनंददायी वातावरणात शिक्षण घेणारे चिमुकले विद्यार्थी व बोलक्या भिंती.',
      date: 'Feb 2026',
    },
    {
      id: '2',
      title: 'Cozy Library Corner',
      titleMr: 'समृद्ध ग्रंथालय व वाचन कोपरा',
      category: 'library',
      accentColor: '#00c2a8',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjhcLgG3O5ieySqRRooXeU3Xsd_l04HAsp5WIhho6OrftdnqsAT7pRwFrNgikEZ-E9Ld02mXLpthGZjvecHd1FrIhU2x7j3QdUr8838DWOdJrb8YVStvFyDR7PRxbKVe1kxUg7LEmoFBzgPvaqpvWeUPER4HVCkOR8Q7DV5tX-_igwwBxKANipwYcCwWAAKwUG7z_XcFI6LL7oCVKxn0EEVcmQ2-Df2wwRCiQLR2TcQtujAOIQQJWW',
      description: 'A quiet haven for young readers to explore new worlds.',
      descriptionMr: 'मराठी बालकथा, चित्रपुस्तके व ज्ञानवर्धक पुस्तकांचा मोठा संग्रह.',
      date: 'Jan 2026',
      hasBadge: true,
    },
    {
      id: '3',
      title: 'Recess Fun on Campus Playground',
      titleMr: 'खेळ व क्रीडांगणाचा आनंद',
      category: 'playground',
      accentColor: '#ff7b54',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD-4IRUQvVFoliobQjSy_rsAG44nDGilhqAK8JUoeRuJrfBBV6xqPydKluDmwiURboT4UwiNuKK9GSdCI-4_qMWdWhv4hiKc96WRaD9bwzlKkJwJ5P2kVEJ83MtpfKL64WbXex8mErhfic9yWedxvFMNRWQBcV_cUFhn2bTojQjvi-Nsk-r95jxMdy8CYFyrYfnMJMFe4WHKpel9yJY3BTeWQRgzoNaJrz-nP5tHa2w3lYSrdpvobL',
      description: 'Ample open space for traditional Indian games and physical fitness.',
      descriptionMr: 'खो-खो, लंगडी, कबड्डी आणि मैदानी खेळांचे भव्य आवार.',
      date: 'Feb 2026',
    },
    {
      id: '4',
      title: 'Nutritious PM POSHAN Mid-Day Meals',
      titleMr: 'आरोग्यदायी व चवदार पोषण आहार',
      category: 'meals',
      accentColor: '#8bf3cd',
      imageUrl: '/school-building.jpg',
      description: 'Clean, hygienic, and protein-rich lunches served daily.',
      descriptionMr: 'दररोज स्वच्छता राखून बनवला जाणारा सकस आहार.',
      date: 'Jan 2026',
    },
    {
      id: '5',
      title: 'Science Fair & Practical Demonstrations',
      titleMr: 'विज्ञान प्रदर्शन व प्रयोग',
      category: 'events',
      accentColor: '#ff7b54',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFz_XUa9GbQqcuwarXfthk6yZJ3wUblhr1euzlFQP0k40vYJ-T0OBjh0DeAhFTHv-ayFuN5AwIM0RTB7gZ2ILEELk_Hcong0PG_0xMx26reTNtzuebmZIQHD1FRkveHrKgDZ1ZX5El3nQBK9R4IC-ouSQX-lxVUbjH2XvBaJ_L7E2tRHicYGhODkIlo1-QS9cANvUXT-2g0ECIEuwWxBKHt0TX-HWBL23lJf4gCKavN1_e-_9OYid6',
      description: 'Exploring everyday science through interactive models and experiments.',
      descriptionMr: 'हसत खेळत विज्ञान - विद्यार्थ्यांनी तयार केलेले विविध वैज्ञानिक प्रयोग.',
      date: 'Feb 2026',
    },
  ]);

  const categories = [
    { id: 'All', label: lang === 'mr' ? 'सर्व छायाचित्रे' : 'All Photos' },
    { id: 'classrooms', label: lang === 'mr' ? '🏫 वर्गखोल्या' : '🏫 Classrooms' },
    { id: 'library', label: lang === 'mr' ? '📚 ग्रंथालय' : '📚 Library' },
    { id: 'playground', label: lang === 'mr' ? '⚽ क्रीडांगण' : '⚽ Playground' },
    { id: 'meals', label: lang === 'mr' ? '🍲 पोषण आहार' : '🍲 Meals' },
    { id: 'events', label: lang === 'mr' ? '🎉 उत्सव व स्नेहसंमेलन' : '🎉 Events' },
  ];

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setGalleryItems(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-10 md:space-y-14 animate-fadeIn">
      {/* Header Banner */}
      <section className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] p-6 md:p-10 neo-shadow relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ffe16e] rounded-full mix-blend-multiply opacity-50 neo-border pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-block bg-[#00c2a8] text-white neo-border-sm rounded-lg px-3.5 py-1 text-xs font-black">
            {lang === 'mr' ? 'शालेय आठवणी व उपक्रम' : 'School Moments'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            {lang === 'mr' ? 'छायाचित्र दालन (फोटो गॅलरी)' : 'School Photo Gallery'}
          </h1>
          <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
            {lang === 'mr'
              ? 'डिजिटल वर्गखोल्या, समृद्ध ग्रंथालय, क्रीडा स्पर्धा, मध्यान्ह भोजन आणि वार्षिक स्नेहसंमेलनाची क्षणचित्रे.'
              : 'A glimpse into the daily life, classrooms, library sessions, sports events, and cultural festivals of our rural scholars.'}
          </p>
        </div>
      </section>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black neo-border-sm dark:border-slate-700 transition-all ${
              activeCategory === cat.id
                ? 'bg-black text-white dark:bg-[#00c2a8] dark:text-black shadow-[2px_2px_0_#000]'
                : 'bg-white dark:bg-[#131b2e] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 font-bold">Loading gallery photos...</div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-2xl p-8 text-center text-slate-600 dark:text-slate-300 font-bold">
          No photos found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const displayTitle = (lang === 'mr' && item.titleMr) ? item.titleMr : item.title;
            const displayDesc = (lang === 'mr' && item.descriptionMr) ? item.descriptionMr : item.description;

            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[24px] overflow-hidden neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden relative border-b-4 border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.title}
                      accentColor={item.accentColor || '#ffe16e'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-black neo-border-sm text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-black px-2 py-0.5 rounded backdrop-blur-sm">
                        {item.date}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-1.5">
                    <h3 className="font-black text-base text-black dark:text-white group-hover:text-[#00c2a8] transition-colors leading-snug">
                      {displayTitle}
                    </h3>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-1 flex items-center justify-between text-xs font-black text-[#00c2a8]">
                  <span>{lang === 'mr' ? 'फोटो मोठा पहा' : 'View Full Photo'}</span>
                  <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">
                    zoom_in
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox / Fullscreen Image Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white dark:bg-[#131b2e] neo-border dark:border-slate-700 rounded-[28px] max-w-3xl w-full overflow-hidden neo-shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 bg-white dark:bg-[#1e293b] text-black dark:text-white p-2 rounded-full neo-border-sm dark:border-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close photo"
            >
              <span className="material-symbols-outlined font-bold">close</span>
            </button>

            <div className="max-h-[60vh] w-full bg-slate-950 flex items-center justify-center border-b-4 border-black dark:border-slate-700 overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-white dark:bg-[#131b2e]">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#8bf3cd] dark:bg-[#005045] text-[#005045] dark:text-white text-xs font-black uppercase px-2.5 py-0.5 rounded neo-border-sm">
                  {activePhoto.category}
                </span>
                {activePhoto.date && (
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                    🗓️ {activePhoto.date}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-black dark:text-white">
                {(lang === 'mr' && activePhoto.titleMr) ? activePhoto.titleMr : activePhoto.title}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {(lang === 'mr' && activePhoto.descriptionMr) ? activePhoto.descriptionMr : activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
