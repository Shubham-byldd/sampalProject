import 'expo-localization';
import i18n, { InitOptions, Module } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';

// Import translations
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

type Resources = {
  en: { translation: typeof enTranslations };
  es: { translation: typeof esTranslations };
};

const resources: Resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
};
export const storage = new MMKV();
interface LanguageDetectorType extends Module {
  type: 'languageDetector';
  async: boolean;
  detect: (callback: (lang: string) => void) => Promise<void>;
  init: () => void;
  cacheUserLanguage: () => void;
}

const languageDetector: LanguageDetectorType = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    try {
      callback(storage.getString('user-language') ?? 'en');
    } catch {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const initOptions: InitOptions = {
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
};

i18n.use(languageDetector).use(initReactI18next).init(initOptions);

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}

export default i18n;
