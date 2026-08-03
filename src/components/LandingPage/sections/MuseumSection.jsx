import React from 'react';
import './MuseumSection.scss';
import { useTranslation } from 'react-i18next';
import { AppleIcon, GooglePlayIcon } from '../../../constants/icons';
import { trackEvent } from '../../../analytics';
import useIsMobile from '../../../hooks/useIsMobile';
import posterCard1 from '../../../images/PosterCard1.png';
import posterCard2 from '../../../images/PosterCard2.png';
import poserCard3 from '../../../images/PoserCard3.png';

const INFO_ITEMS = ['hours', 'address', 'contact'];

const MuseumSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile(900);

  const name = t('landing.museums.name', 'Muzeul Arta Lemnului');

  const eyebrow = (
    <span className="museum-section__eyebrow">
      {t('landing.museums.eyebrow', 'Partner museum')}
    </span>
  );

  const title = (
    <h2 className="museum-section__title font-display">{name}</h2>
  );

  const location = (
    <span className="museum-section__location">
      {t('landing.museums.location', 'Câmpulung Moldovenesc, Bucovina')}
    </span>
  );

  const description = (
    <p className="museum-section__description">
      {t('landing.museums.description', '')}
    </p>
  );

  const info = (
    <div className="museum-section__info">
      {INFO_ITEMS.map((key) => (
        <div key={key} className="museum-section__info-row">
          <span className="museum-section__info-label">
            {t(`landing.museums.info.${key}.label`, key)}
          </span>
          <span className="museum-section__info-value">
            {t(`landing.museums.info.${key}.value`, '')}
          </span>
        </div>
      ))}
    </div>
  );

  const cta = (
    <button type="button" className="museum-section__cta">
      {t('landing.museums.cta', 'Explore in Arte·fact')}
    </button>
  );

  const badge = (
    <span className="museum-section__badge">
      <span className="museum-section__badge-dot" />
      {t('landing.museums.badge', 'Artifact hunt available')}
    </span>
  );

  const handleStoreClick = (store) => () => trackEvent('download_clicked', { store, source: 'museums_download' });

  const downloadBanner = (
    <div className="museum-section__download">
      <span className="museum-section__download-eyebrow">
        {t('landing.museums.download.eyebrow', 'Available now, free')}
      </span>
      <h3 className="museum-section__download-title font-display">
        <span>{t('landing.museums.download.titleLine1', 'Start the')}</span>
        <span>{t('landing.museums.download.titleLine2', 'cultural adventure.')}</span>
      </h3>
      <p className="museum-section__download-subtitle">
        {t(
          'landing.museums.download.subtitle',
          'Download arte·fact for free and discover Romanian heritage in a whole new way.'
        )}
      </p>
      <div className="museum-section__download-buttons">
        <button
          type="button"
          className="museum-section__download-btn museum-section__download-btn--apple"
          onClick={handleStoreClick('app_store')}
        >
          <AppleIcon />
          {t('landing.hero.appStore', 'App Store')}
        </button>
        <button
          type="button"
          className="museum-section__download-btn museum-section__download-btn--google"
          onClick={handleStoreClick('google_play')}
        >
          <GooglePlayIcon />
          {t('landing.hero.googlePlay', 'Google Play')}
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section id="museums" className="museum-section museum-section--mobile">
        <div className="museum-section__content">
          {eyebrow}
          {title}
          {location}
          {description}
        </div>

        <div className="museum-section__main-visual">
          <img src={poserCard3} alt={name} />
          {badge}
        </div>

        <div className="museum-section__content">
          {info}
          {cta}
        </div>

        <div className="museum-section__thumbs">
          <img src={posterCard1} alt="" />
          <img src={posterCard2} alt="" />
        </div>

        {downloadBanner}
      </section>
    );
  }

  return (
    <section id="museums" className="museum-section">
      <div className="museum-section__inner">
        <div className="museum-section__content">
          {eyebrow}
          {title}
          {location}
          {description}
          {info}
          {cta}
        </div>

        <div className="museum-section__gallery">
          <div className="museum-section__thumbs">
            <img src={posterCard1} alt="" />
            <img src={posterCard2} alt="" />
          </div>
          <div className="museum-section__main-visual">
            <img src={poserCard3} alt={name} />
          </div>
        </div>
      </div>

      {downloadBanner}
    </section>
  );
};

export default MuseumSection;
