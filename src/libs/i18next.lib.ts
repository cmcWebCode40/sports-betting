import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../languages/en/translation.json';
import turTranslation from '../languages/tur/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  tr: {
    translation: turTranslation,
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
