import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
 initReactI18next
} from 'react-i18next';
//import * as Localization from 'expo-localization';
import en from './en';
import tr from './tr';

const LANGUAGES = {
 en,
 tr,
};
i18n.init({
    compatibilityJSON: 'v3'
  }, (err, t) => { /* resources are loaded */ })
const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
 type: 'languageDetector',
 async: true,
 detect: callback => {
  AsyncStorage.getItem('user-language', (err, language) => {
    if (err || !language) {
      if (err) {
        console.log('Error fetching Languages from asyncstorage ', err);
      } else {
        console.log('No language is set, choosing English as fallback');
      }
      callback('en'); // Varsayılan olarak 'en' dilini döndür
      return;
    }
    callback(language);
  });
},
 init: () => {},
 cacheUserLanguage: language => {
  AsyncStorage.setItem('user-language', language);
 },
};
i18n
 .use(LANGUAGE_DETECTOR)
 .use(initReactI18next)
 .init({
  resources: LANGUAGES,
  react: {
   useSuspense: false,
  },
  interpolation: {
   escapeValue: false,
  },
 });
 