import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationRO from './locales/ro/translation.json';
import { detectLanguageByCountry } from './utils/geoLanguage';

const resources = {
    en: { translation: translationEN },
    ro: { translation: translationRO }
};

// Matches i18next-browser-languagedetector's default localStorage key.
const LANGUAGE_STORAGE_KEY = 'i18nextLng';

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
            // No 'navigator' here on purpose: for a brand-new visitor with no
            // saved preference, country-based detection below decides instead
            // of the browser's language setting.
            order: ['localStorage', 'cookie'],
            caches: ['localStorage'], // This keeps the choice saved
        }
    });

// Only geolocate brand-new visitors. Anyone who already has a saved
// preference — whether picked via the language switcher or set by a
// previous geo lookup — keeps it, so this never overrides an explicit choice.
if (!window.localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
    detectLanguageByCountry().then((language) => {
        if (language) i18n.changeLanguage(language);
    });
}

export default i18n;