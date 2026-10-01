import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DotPatternCanvas } from './components/DotPatternCanvas';
import { NoticeBanner } from './components/NoticeBanner';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { WhatsAppButton } from './components/WhatsAppButton';

import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const AcademicsPage = lazy(() => import('./pages/AcademicsPage').then((m) => ({ default: m.AcademicsPage })));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage').then((m) => ({ default: m.FacilitiesPage })));
const WelfarePage = lazy(() => import('./pages/WelfarePage').then((m) => ({ default: m.WelfarePage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage').then((m) => ({ default: m.DownloadsPage })));
const CalendarPage = lazy(() => import('./pages/CalendarPage').then((m) => ({ default: m.CalendarPage })));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Scroll to top helper component on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-transparent text-[#191c20] dark:text-[#f1f5f9] selection:bg-[#65fade] selection:text-black transition-colors duration-300">
      <ScrollToTop />

      {/* Animated WebGL Dot Matrix Shader Background */}
      <DotPatternCanvas />

      {/* Top Notice Ticker with Live Alerts */}
      <NoticeBanner onOpenContact={() => setIsContactOpen(true)} />

      {/* Sticky Navigation Bar with Language & Day/Night Switchers */}
      <HeaderNav onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Page View Content Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#00c2a8] border-t-transparent"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/about" element={<AboutPage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/academics" element={<AcademicsPage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/facilities" element={<FacilitiesPage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/welfare" element={<WelfarePage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/downloads" element={<DownloadsPage onOpenContact={() => setIsContactOpen(true)} />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Helpdesk Pill */}
      <WhatsAppButton />

      {/* Interactive Admission Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
