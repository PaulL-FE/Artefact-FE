import React, { useEffect } from 'react';
import './DownloadModal.scss';
import { useTranslation } from 'react-i18next';
import { CloseIcon, StarIcon, AppleIcon, GooglePlayIcon } from '../../constants/icons';
import { trackEvent } from '../../analytics';
import logo from '../../images/Logo.svg';

const DownloadModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStoreClick = (store) => () => trackEvent('download_clicked', { store, source: 'download_modal' });

  return (
    <div className="download-modal" role="dialog" aria-modal="true" aria-label={t('landing.downloadModal.title', 'Download Artefact')}>
      <div className="download-modal__backdrop" onClick={onClose} />

      <div className="download-modal__card">
        <button
          type="button"
          className="download-modal__close"
          aria-label={t('landing.downloadModal.close', 'Close')}
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        <img src={logo} alt="Artefact" className="download-modal__logo" />

        <h2 className="download-modal__title">
          {t('landing.downloadModal.title', 'Download Artefact')}
        </h2>
        <p className="download-modal__subtitle">
          {t(
            'landing.downloadModal.subtitle',
            "Explore Romania's cultural heritage in an interactive way. Download the app for free and start the adventure."
          )}
        </p>

        <div className="download-modal__stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>
        <span className="download-modal__rating">
          {t('landing.hero.ratingValue', '5.0')} — {t('landing.downloadModal.ratingLabel', 'User rating')}
        </span>

        <div className="download-modal__buttons">
          <button
            type="button"
            className="download-modal__store-btn download-modal__store-btn--apple"
            onClick={handleStoreClick('app_store')}
          >
            <AppleIcon />
            {t('landing.hero.appStore', 'App Store')}
          </button>
          <button
            type="button"
            className="download-modal__store-btn download-modal__store-btn--google"
            onClick={handleStoreClick('google_play')}
          >
            <GooglePlayIcon />
            {t('landing.hero.googlePlay', 'Google Play')}
          </button>
        </div>

        <span className="download-modal__availability">
          {t('landing.downloadModal.availability', 'Available for free on iOS and Android')}
        </span>
      </div>
    </div>
  );
};

export default DownloadModal;
