import React from 'react';
import './PlaceholderSection.scss';
import { useTranslation } from 'react-i18next';

const AdminSection = () => {
  const { t } = useTranslation();

  return (
    <section id="admin" className="placeholder-section">
      <span className="placeholder-section__eyebrow">
        {t('landing.admin.eyebrow', 'Admin')}
      </span>
      <h2 className="placeholder-section__title font-display">
        {t('landing.admin.title', 'A dashboard built for museums and admins')}
      </h2>
      <p className="placeholder-section__note">
        {t('landing.admin.comingSoon', 'This section is coming soon.')}
      </p>
    </section>
  );
};

export default AdminSection;
