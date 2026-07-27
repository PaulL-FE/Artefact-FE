import React from 'react';
import './HeroSection.scss';
import { useTranslation } from 'react-i18next';
import { StarIcon, AppleIcon, GooglePlayIcon } from '../../../constants/icons';
import useIsMobile from '../../../hooks/useIsMobile';
import { trackEvent } from '../../../analytics';
import phoneDesktop from '../../../images/phone-1.png';
import phoneMobile from '../../../images/phone-1-mobile.png';

const HeroSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile(900);

  const handleStoreClick = (store) => () => trackEvent('download_clicked', { store });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-section__container">
        <div className="hero-section__content">
          <span className="hero-section__eyebrow">
            {t('landing.hero.eyebrow', 'The mobile app for visiting museums')}
          </span>

          <h1 className="hero-section__title font-display">
            <span className="hero-section__title-line">
              {t('landing.hero.titleLine1', 'Discover')}
            </span>{' '}
            <span className="hero-section__title-line hero-section__title-line--accent">
              {t('landing.hero.titleHighlight', 'art and history')}
            </span>{' '}
            <span className="hero-section__title-line">
              {t('landing.hero.titleLine3', 'differently.')}
            </span>
          </h1>

          <p className="hero-section__subtitle">
            {t(
              'landing.hero.subtitle',
              'Scan exhibits with your camera, get instant answers from AI, and follow personalized itineraries through museums. Romanian culture, a tap away.'
            )}
          </p>

          <div className="hero-section__cta">
            <button
              type="button"
              className="hero-section__store-btn hero-section__store-btn--apple"
              onClick={handleStoreClick('app_store')}
            >
              <AppleIcon />
              {t('landing.hero.appStore', 'App Store')}
            </button>
            <button
              type="button"
              className="hero-section__store-btn hero-section__store-btn--google"
              onClick={handleStoreClick('google_play')}
            >
              <GooglePlayIcon />
              {t('landing.hero.googlePlay', 'Google Play')}
            </button>
          </div>

          <div className="hero-section__rating">
            <div className="hero-section__stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <span className="hero-section__rating-value">
              {t('landing.hero.ratingValue', '5.0')}
            </span>
            <span className="hero-section__rating-count">
              {t('landing.hero.usersCount', '+100 active users')}
            </span>
          </div>
        </div>

        <div className="hero-section__visual">
          <div className="hero-section__glow" />
          <img
            className="hero-section__phone"
            src={isMobile ? phoneMobile : phoneDesktop}
            alt="Artefact app screenshot"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
