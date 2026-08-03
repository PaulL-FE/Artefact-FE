import React, { useEffect, useState } from 'react';
import './ContactPage.scss';
import { useTranslation } from 'react-i18next';
import LandingHeader from '../LandingPage/LandingHeader';
import Footer from '../LandingPage/Footer';
import CookieConsent from '../LandingPage/CookieConsent';
import { ContactArrowIcon } from '../../constants/icons';
import { trackEvent, trackPageView } from '../../analytics';
import api from '../../api';
import { MapPinIcon } from '../../constants/icons';


const INITIAL_FORM = { fullName: '', workEmail: '', museumName: '', message: '' };

const ContactPage = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView('Contact Page');
  }, []);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', form);
      trackEvent('contact_form_submitted', { source: 'contact_page' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <LandingHeader />

      <main className="contact-page__main">
        <span className="contact-page__eyebrow">
          {t('landing.contactPage.eyebrow', 'Contact')}
        </span>
        <h1 className="contact-page__title font-display">
          {t('landing.contactPage.title', "Let's talk")}
        </h1>
        <p className="contact-page__subtitle">
          {t(
            'landing.contactPage.subtitle',
            'Contact us to arrange a discussion about enrolling your museum in the Artefact app.'
          )}
        </p>

        <div className="contact-page__card">
          {status === 'success' ? (
            <p className="contact-page__success">
              {t('landing.contactPage.success', "Thanks! We'll get back to you within 24 hours.")}
            </p>
          ) : (
            <form className="contact-page__form" onSubmit={handleSubmit}>
              <div className="contact-page__row">
                <div className="contact-page__field">
                  <label htmlFor="contact-fullName">
                    {t('landing.contactPage.fullName', 'Full name')}<span>*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    placeholder={t('landing.contactPage.fullNamePlaceholder', 'Ana Popescu')}
                  />
                </div>
                <div className="contact-page__field">
                  <label htmlFor="contact-workEmail">
                    {t('landing.contactPage.workEmail', 'Email')}<span>*</span>
                  </label>
                  <input
                    id="contact-workEmail"
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={handleChange('workEmail')}
                    placeholder={t('landing.contactPage.workEmailPlaceholder', 'ana@museum.ro')}
                  />
                </div>
              </div>

              <div className="contact-page__field">
                <label htmlFor="contact-museumName">
                  {t('landing.contactPage.museumName', 'Museum name')}
                </label>
                <input
                  id="contact-museumName"
                  type="text"
                  value={form.museumName}
                  onChange={handleChange('museumName')}
                  placeholder={t('landing.contactPage.museumNamePlaceholder', 'Your museum...')}
                />
              </div>

              <div className="contact-page__field">
                <label htmlFor="contact-message">
                  {t('landing.contactPage.message', 'Message')}<span>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder={t('landing.contactPage.messagePlaceholder', 'Tell us how we can help.')}
                />
              </div>

              {status === 'error' && (
                <p className="contact-page__error">
                  {t('landing.contactPage.error', 'Something went wrong. Please try again.')}
                </p>
              )}

              <button type="submit" className="contact-page__submit" disabled={status === 'sending'}>
                {status === 'sending'
                  ? t('landing.contactPage.sending', 'Sending...')
                  : t('landing.contactPage.submit', 'Send message')}
                <ContactArrowIcon />
              </button>
            </form>
          )}
        </div>
      </main>
      <div className="contact-page__divider">
        <span>
          <MapPinIcon />
          {t('landing.functionalities.divider.exampleMuseum', 'Muzeul Arta Lemnului, Câmpulung Moldovenesc')}
        </span>
        <span>
          <MapPinIcon />
          {t('landing.functionalities.divider.suggestMuseum', 'Suggest a museum at contact@art-fact.ai')}
        </span>
      </div>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default ContactPage;
