// import {NativeModules, Platform} from 'react-native';
// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';

// // the translations
// // (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       'Welcome to React': 'Welcome to React and react-i18next',
//     },
//   },
//   ko: {
//     translation: {
//       'Welcome to React': '안녕하세요',
//     },
//   },
// };

// export const deviceLanguageSet = async () => {
//   var deviceLanguage =
//     Platform.OS === 'ios'
//       ? NativeModules.SettingsManager.settings.AppleLocale ||
//         NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
//       : NativeModules.I18nManager.localeIdentifier;
//   if (deviceLanguage.slice(0, 2) == 'en') {
//     deviceLanguage = deviceLanguage.slice(0, 2);
//   } else if (deviceLanguage.slice(0, 2) == 'ko') {
//     deviceLanguage = deviceLanguage.slice(0, 2);
//   } else if (deviceLanguage.slice(0, 2) == 'es') {
//     deviceLanguage = deviceLanguage.slice(0, 2);
//   } else if (deviceLanguage.slice(0, 2) == 'pt') {
//     deviceLanguage = deviceLanguage.slice(0, 2);
//   } else if (deviceLanguage.slice(0, 2) == 'ru') {
//     deviceLanguage = deviceLanguage.slice(0, 2);
//   } else {
//     deviceLanguage = 'en';
//   }
//   return deviceLanguage;
//   //   await AsyncStorage.setItem('deviceLanguage', deviceLanguage);
// };

// const deviceLanguage = deviceLanguageSet;

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: 'en',

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

// export default i18n;

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './language/en';
import ko from './language/ko';
import es from './language/es';
import pt from './language/pt';
import ru from './language/ru';

const resources = {
  ...ko,
  ...en,
  ...es,
  ...pt,
  ...ru,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  keySeparator: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
