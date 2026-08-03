import React, { useEffect } from 'react';
import './LandingPage.scss';
import LandingHeader from './LandingHeader';
import HeroSection from './sections/HeroSection';
import FunctionalitySection from './sections/FunctionalitySection';
import MuseumSection from './sections/MuseumSection';
import AdminSection from './sections/AdminSection';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import { trackPageView } from '../../analytics';

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('Landing Page');
  }, []);

  return (
    <div className="landing-page">
      <LandingHeader />
      <main className="landing-page__main">
        <HeroSection />
        <FunctionalitySection />
        <AdminSection />
        <MuseumSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default LandingPage;
