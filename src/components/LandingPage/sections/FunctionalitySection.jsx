import React from 'react';
import './PlaceholderSection.scss';
import { useTranslation } from 'react-i18next';

const FunctionalitySection = () => {
  const { t } = useTranslation();

  return (
    <section id="functionalities" className="placeholder-section">
      <span className="placeholder-section__eyebrow">
        {t('landing.functionalities.eyebrow', 'Features')}
      </span>
      <h2 className="placeholder-section__title font-display">
        {t('landing.functionalities.title', 'Everything you need to explore a museum')}
      </h2>
      <p className="placeholder-section__note">
        {t('landing.functionalities.comingSoon', 'This section is coming soon.')}
      </p>
    </section>
  );
};

export default FunctionalitySection;
