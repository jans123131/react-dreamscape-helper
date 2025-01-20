import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en';
import frTranslations from './locales/fr';

const resources = {
  en: {
    translation: enTranslations
  },
  fr: {
    translation: frTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;