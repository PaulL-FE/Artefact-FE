import React from 'react';
import './PlaceholderSection.scss';
import { useTranslation } from 'react-i18next';

const MuseumSection = () => {
  const { t } = useTranslation();

  return (
    <section id="museums" className="placeholder-section placeholder-section--alt">
      <span className="placeholder-section__eyebrow">
        {t('landing.museums.eyebrow', 'Museums')}
      </span>
      <h2 className="placeholder-section__title font-display">
        {t('landing.museums.title', 'Artefact partner museums')}
      </h2>
      <p className="placeholder-section__note">
        {t('landing.museums.comingSoon', 'This section is coming soon.')}
      </p>
    </section>
  );
};

export default MuseumSection;
