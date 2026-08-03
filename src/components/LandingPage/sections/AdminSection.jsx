import React from 'react';
import './AdminSection.scss';
import { useTranslation } from 'react-i18next';
import { TrophyIcon, TrendingUpIcon, UsersIcon, StarIcon } from '../../../constants/icons';
import useIsMobile from '../../../hooks/useIsMobile';
import adminDesktopImage from '../../../images/admin-pic-desktop.png';
import adminMobileImage from '../../../images/admin-pic-mobile.png';

const FEATURES = [
  { key: 'hunt', Icon: TrophyIcon },
  { key: 'stats', Icon: TrendingUpIcon },
  { key: 'content', Icon: UsersIcon },
];

const REVIEWS = ['andreea', 'bogdan', 'elena'];

const AdminSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile(900);

  return (
    <section id="admin" className="admin-section">
      <div className="admin-section__top">
        <div className="admin-section__content">
          <span className="admin-section__eyebrow">
            {t('landing.admin.eyebrow', 'For administrators')}
          </span>
          <h2 className="admin-section__title font-display">
            <span className="admin-section__title-line">
              {t('landing.admin.titleLine1', 'Control the')}
            </span>
            <span className="admin-section__title-line">
              {t('landing.admin.titleLine2', 'museum')}
            </span>
            <span className="admin-section__title-line admin-section__title-line--accent">
              {t('landing.admin.titleHighlight', 'experience.')}
            </span>
          </h2>
          <p className="admin-section__subtitle">
            {t(
              'landing.admin.subtitle',
              'The Admin app gives you full control: monitor visitors in real time, manage the treasure hunt, and analyze engagement data.'
            )}
          </p>

          <div className="admin-section__features">
            {FEATURES.map(({ key, Icon }) => (
              <div key={key} className="admin-section__feature">
                <span className="admin-section__feature-icon">
                  <Icon />
                </span>
                <div className="admin-section__feature-text">
                  <strong>{t(`landing.admin.features.${key}.title`, key)}</strong>
                  <p>{t(`landing.admin.features.${key}.description`, '')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section__visual">
          <img src={isMobile ? adminMobileImage : adminDesktopImage} alt="Artefact admin dashboard" />
        </div>
      </div>

      <div className="admin-section__reviews">
        <div className="admin-reviews">
          {REVIEWS.map((key) => (
            <div key={key} className="admin-section__review">
              <div className="admin-section__review-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <p className="admin-section__review-quote">
                &ldquo;{t(`landing.admin.reviews.${key}.quote`, '')}&rdquo;
              </p>
              <strong className="admin-section__review-name">
                {t(`landing.admin.reviews.${key}.name`, '')}
              </strong>
              <span className="admin-section__review-role">
                {t(`landing.admin.reviews.${key}.role`, '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSection;
