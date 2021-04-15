import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './language/en';
import ko from './language/ko';
import es from './language/es';
import pt from './language/pt';
import ru from './language/ru';

const resources = {
  ...en,
  ...ko,
  ...es,
  ...pt,
  ...ru,
};

let deviceLanguage;

if (RNLocalize.getLocales()[0].languageTag.slice(0, 2) == 'en') {
  deviceLanguage = 'en';
} else if (RNLocalize.getLocales()[0].languageTag.slice(0, 2) == 'ko') {
  deviceLanguage = 'ko';
} else if (RNLocalize.getLocales()[0].languageTag.slice(0, 2) == 'es') {
  deviceLanguage = 'es';
} else if (RNLocalize.getLocales()[0].languageTag.slice(0, 2) == 'pt') {
  deviceLanguage = 'pt';
} else if (RNLocalize.getLocales()[0].languageTag.slice(0, 2) == 'ru') {
  deviceLanguage = 'ru';
} else {
  deviceLanguage = 'en';
}

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
});

export default i18n;
