import React, { useEffect, useRef, useState } from 'react';
import './LandingHeader.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useIsMobile from '../../hooks/useIsMobile';
import logo from '../../images/Logo.svg';
import { ChevronDownIcon, DownloadIcon } from '../../constants/icons';
import { trackEvent } from '../../analytics';

const NAV_ITEMS = ['functionalities', 'museums', 'admin'];
const LANGUAGES = ['ro', 'en'];
const HEADER_OFFSET = 90;
const SCROLL_DURATION = 700;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const smoothScrollTo = (targetY, duration = SCROLL_DURATION) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = Math.max(el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0);
  smoothScrollTo(targetY);
};

const LandingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile(1100);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isOnLandingPage = location.pathname === '/';

  useEffect(() => {
    if (!isOnLandingPage) {
      setActiveSection(null);
      return;
    }

    const elements = NAV_ITEMS.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActiveSection((prev) => {
            if (entry.isIntersecting) return entry.target.id;
            return prev === entry.target.id ? null : prev;
          });
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isOnLandingPage]);

  const goToNavItem = (sectionId) => {
    setMenuOpen(false);
    if (isOnLandingPage) {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  const goToContact = () => {
    trackEvent('contact_us_clicked');
    setMenuOpen(false);
    if (isOnLandingPage) {
      scrollToSection('footer');
    } else {
      navigate('/');
      setTimeout(() => scrollToSection('footer'), 100);
    }
  };

  const goToDownload = () => {
    trackEvent('download_clicked');
    setMenuOpen(false);
    goToNavItem('hero');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    setMenuOpen(false);
  };

  const languageSwitcher = (
    <div className="landing-header__lang" ref={langRef}>
      <button
        type="button"
        className="landing-header__lang-toggle"
        onClick={() => setLangOpen((open) => !open)}
        aria-expanded={langOpen}
      >
        {i18n.resolvedLanguage?.toUpperCase() || 'RO'}
        <ChevronDownIcon />
      </button>
      {langOpen && (
        <div className="landing-header__lang-menu">
          {LANGUAGES.map((lng) => (
            <button
              key={lng}
              type="button"
              className={`landing-header__lang-option${i18n.resolvedLanguage === lng ? ' active' : ''}`}
              onClick={() => changeLanguage(lng)}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className={`landing-header${scrolled ? ' landing-header--scrolled' : ''}${isMobile ? ' landing-header--mobile' : ''}`}>
      <div className="landing-header__inner">
        {!isMobile && (
          <nav className="landing-header__nav">
            {NAV_ITEMS.map((key) => (
              <span
                key={key}
                className={`landing-header__nav-item${isOnLandingPage && activeSection === key ? ' active' : ''}`}
                onClick={() => goToNavItem(key)}
              >
                {t(`landing.nav.${key}`, key)}
              </span>
            ))}
          </nav>
        )}

        <div className="landing-header__logo" onClick={() => goToNavItem('hero')}>
          <img src={logo} alt="Artefact" />
        </div>

        {isMobile ? (
          <button
            type="button"
            className="landing-header__burger"
            aria-label={t('landing.header.menu', 'Menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 5.5L5.5 16.5M5.5 5.5L16.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.75 6.41667H19.25M2.75 11H19.25M2.75 15.5833H19.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ) : (
          <div className="landing-header__actions">
            <span className="landing-header__contact" onClick={goToContact}>
              {t('landing.header.contact', 'Contact')}
            </span>
            <button type="button" className="landing-header__download" onClick={goToDownload}>
              <DownloadIcon />
              {t('landing.header.download', 'Descarcă')}
            </button>
            {languageSwitcher}
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <div className="landing-header__mobile-menu">
          <nav className="landing-header__mobile-nav">
            {NAV_ITEMS.map((key) => (
              <span
                key={key}
                className={`landing-header__mobile-nav-item${isOnLandingPage && activeSection === key ? ' active' : ''}`}
                onClick={() => goToNavItem(key)}
              >
                {t(`landing.nav.${key}`, key)}
              </span>
            ))}
            <span className="landing-header__mobile-nav-item" onClick={goToContact}>
              {t('landing.header.contact', 'Contact')}
            </span>
          </nav>

          <div className="landing-header__mobile-actions">
            <button type="button" className="landing-header__download" onClick={goToDownload}>
              <DownloadIcon />
              {t('landing.header.download', 'Descarcă')}
            </button>
            {languageSwitcher}
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
