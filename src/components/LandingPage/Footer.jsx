import React from 'react';
import './Footer.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../images/Logo-white.svg';
import facebookIcon from '../../images/ic_outline-facebook.svg';
import youtubeIcon from '../../images/mdi_youtube.svg';
import instagramIcon from '../../images/ri_instagram-fill.svg';

const SOCIAL_LINKS = [
  { key: 'facebook', icon: facebookIcon, url: '#' },
  { key: 'youtube', icon: youtubeIcon, url: '#' },
  { key: 'instagram', icon: instagramIcon, url: '#' },
];

const FOOTER_LINKS = [
  { key: 'functionalities', sectionId: 'functionalities' },
  { key: 'museums', sectionId: 'museums' },
  { key: 'admin', sectionId: 'admin' },
  { key: 'privacy' },
  { key: 'contact' },
];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer id="footer" className="landing-footer">
      <div className="landing-footer__top">
        <div className="landing-footer__brand">
          <img
            src={logo}
            alt="arte·fact"
            className="landing-footer__logo"
            onClick={goToSection('hero')}
          />
          <p className="landing-footer__tagline">
            {t('landing.footer.tagline', 'Museums. Art. Discovery.')}
          </p>

          <div className="landing-footer__social">
            <span className="landing-footer__social-title">
              {t('landing.footer.socialMedia', 'Social Media')}
            </span>
            <div className="landing-footer__social-icons">
              {SOCIAL_LINKS.map(({ key, icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-footer__social-icon"
                  aria-label={key}
                >
                  <img src={icon} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav className="landing-footer__links">
          {FOOTER_LINKS.map((link) =>
            link.sectionId ? (
              <a
                key={link.key}
                href={`/#${link.sectionId}`}
                className="landing-footer__link"
                onClick={goToSection(link.sectionId)}
              >
                {t(`landing.footer.links.${link.key}`, link.key)}
              </a>
            ) : (
              <span key={link.key} className="landing-footer__link landing-footer__link--disabled">
                {t(`landing.footer.links.${link.key}`, link.key)}
              </span>
            )
          )}
        </nav>
      </div>

      <div className="landing-footer__divider" />

      <span className="landing-footer__copyright">
        © {new Date().getFullYear()} {t('landing.footer.copyright', 'arte·fact. All rights reserved.')}
      </span>
    </footer>
  );
};

export default Footer;
