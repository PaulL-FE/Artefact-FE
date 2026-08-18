import React from 'react';
import './FunctionalitySection.scss';
import { useTranslation } from 'react-i18next';
import { AppleIcon, GooglePlayIcon, CheckIcon, MapPinIcon, EyeBrowIcon, ChatIcon, ArrowIcon } from '../../../constants/icons';
import { trackEvent } from '../../../analytics';
import useIsMobile from '../../../hooks/useIsMobile';
import discoverImage from '../../../images/desktop-2.png';
import scanImage from '../../../images/desktop-3.png';
import quizImage from '../../../images/desktop-1.png';
import cameraImage from '../../../images/desktop-4.png';
import aiImage from '../../../images/desktop-5.png';
import itineraryImage from '../../../images/desktop-6.png';
import closingDesktopImage from '../../../images/mobile-7.png';
import closingMobileImage from '../../../images/mobile-8.png';

const STEPS = [
  { key: 'discover', image: discoverImage, hasBullets: true },
  { key: 'scan', image: scanImage, hasBonus: true },
  { key: 'quiz', image: quizImage, hasBullets: true },
];

const SHOWCASE_ITEMS = [
  { key: 'camera', image: cameraImage, Icon: EyeBrowIcon, textBg: 'dark', imageBg: 'light' },
  { key: 'ai', image: aiImage, Icon: ChatIcon, textBg: 'cream', imageBg: 'white', reverse: true },
  { key: 'itinerary', image: itineraryImage, Icon: ArrowIcon, textBg: 'peach', imageBg: 'peach' },
];

const FunctionalitySection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile(900);

  const handleStoreClick = (store) => () => trackEvent('download_clicked', { store, source: 'functionalities_cta' });

  return (
    <section id="functionalities" className="functionality-section">
      <div className="functionality-section__inner">
        <div className="functionality-section__intro">
          <span className="functionality-section__badge">
            <span className="functionality-section__badge-dot" />
            {t('landing.functionalities.eyebrow', 'Features')}
          </span>
          <h2 className="functionality-section__title font-display">
            {t('landing.functionalities.title', 'The')}{' '}
            <span className="functionality-section__title-highlight">
              {t('landing.functionalities.titleHighlight', 'artifact hunt')}
            </span>
          </h2>
          <p className="functionality-section__subtitle">
            {t(
              'landing.functionalities.subtitle',
              'Explore partner museums in a fully interactive way. Find hidden exhibits through clever clues, scan them with your phone, and turn every visit into a captivating cultural game.'
            )}
          </p>
        </div>

        <div className="functionality-section__steps">
          {STEPS.map((step, index) => {
            const base = `landing.functionalities.steps.${step.key}`;
            const bullets = step.hasBullets
              ? t(`${base}.bullets`, { returnObjects: true, defaultValue: [] })
              : null;

            return (
              <div
                key={step.key}
                className={`functionality-section__step${index % 2 === 1 ? ' functionality-section__step--reverse' : ''}`}
              >
                <div className="functionality-section__step-content">
                  <h3 className="functionality-section__step-heading">
                    <span className="functionality-section__step-number font-display">
                      {t(`${base}.number`, `0${index + 1}`)}
                    </span>
                    <span className="functionality-section__step-title font-display">
                      {t(`${base}.title`, step.key)}
                    </span>
                  </h3>

                  <p className="functionality-section__step-description">
                    {t(`${base}.description`, '')}
                    {step.hasBonus && (
                      <span className="functionality-section__step-accent">
                        {' '}
                        {t(`${base}.descriptionHighlight`, '')}
                      </span>
                    )}
                  </p>

                  {Array.isArray(bullets) && bullets.length > 0 && (
                    <ul className="functionality-section__step-bullets">
                      {bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {step.hasBonus && (
                    <div className="functionality-section__bonus">
                      <span className="functionality-section__bonus-icon">
                        <CheckIcon />
                      </span>
                      <div className="functionality-section__bonus-text">
                        <strong>{t(`${base}.bonusTitle`, '')}</strong>
                        <span>{t(`${base}.bonusSubtitle`, '')}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="functionality-section__step-visual">
                  <img src={step.image} alt="" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="functionality-section__cta">
          <h3 className="functionality-section__cta-title font-display">
            {t('landing.functionalities.cta.title', 'Ready to start the')}
            <span className="functionality-section__cta-title-highlight">
              {t('landing.functionalities.cta.titleHighlight', 'hunt?')}
            </span>
          </h3>
          <p className="functionality-section__cta-subtitle">
            {t(
              'landing.functionalities.cta.subtitle',
              "Download the arte·fact app right now and start the most interactive adventure through Romania's museums."
            )}
          </p>
          <div className="functionality-section__cta-buttons">
            <button
              type="button"
              className="functionality-section__store-btn functionality-section__store-btn--apple"
              onClick={handleStoreClick('app_store')}
            >
              <AppleIcon />
              {t('landing.hero.appStore', 'App Store')}
            </button>
            <button
              type="button"
              className="functionality-section__store-btn functionality-section__store-btn--google"
              onClick={handleStoreClick('google_play')}
            >
              <GooglePlayIcon />
              {t('landing.hero.googlePlay', 'Google Play')}
            </button>
          </div>
        </div>
      </div>
        <div className="functionality-section__divider">
          <span>
            <MapPinIcon />
            {t('landing.functionalities.divider.exampleMuseum', 'Muzeul Arta Lemnului, Câmpulung Moldovenesc')}
          </span>
          <span>
            <MapPinIcon />
            {t('landing.functionalities.divider.suggestMuseum', 'Suggest a museum at laurentiu@art-fact.ai')}
          </span>
        </div>

      <div className="functionality-showcase">
        {SHOWCASE_ITEMS.map((item, index) => {
          const base = `landing.functionalities.showcase.items.${item.key}`;

          return (
            <div
              key={item.key}
              className={`functionality-showcase__row${item.reverse ? ' functionality-showcase__row--reverse' : ''}`}
            >
              <div className={`functionality-showcase__text functionality-showcase__text--${item.textBg}`}>
                <span className="functionality-showcase__ghost font-display">
                  {t(`${base}.number`, `0${index + 1}`)}
                </span>
                <span className="functionality-showcase__eyebrow">
                  <item.Icon />
                  {t('landing.functionalities.showcase.eyebrow', 'Feature')}
                </span>
                <h3 className="functionality-showcase__title font-display">
                  {t(`${base}.title`, item.key)}
                </h3>
                <p className="functionality-showcase__description">
                  {t(`${base}.description`, '')}
                </p>
              </div>
              <div className={`functionality-showcase__visual functionality-showcase__visual--${item.imageBg}`}>
                <img src={item.image} alt="" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="functionality-closer">
        <span className="functionality-closer__eyebrow">
          {t('landing.functionalities.closing.eyebrow', 'All in one place')}
        </span>
        <h3 className="functionality-closer__title font-display">
          {t('landing.functionalities.closing.titleLine1', 'One app.')}{' '}
          <span className="functionality-closer__title-highlight">
            {t('landing.functionalities.closing.titleHighlight', 'Infinite')}
          </span>{' '}
          {t('landing.functionalities.closing.titleLine2', 'discoveries.')}
        </h3>
        <div className="functionality-closer__visual">
          <img src={isMobile ? closingMobileImage : closingDesktopImage} alt="Artefact app screens" />
        </div>
      </div>
    </section>
  );
};

export default FunctionalitySection;
