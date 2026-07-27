import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationRO from './locales/ro/translation.json';

const resources = {
    en: { translation: translationEN },
    ro: { translation: translationRO }
};

i18n
    .use(LanguageDetector) // Automatically handles localStorage
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ro',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            caches: ['localStorage'], // This keeps the choice saved
        }
    });

export default i18n;