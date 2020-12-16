import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {getTags} from 'react-native-device-info';
const tnc = String.raw`<Text style={{color: '#F11'}}>10T,,m,mNC</Text>`;
export const lang = (level, value) => [
  {
    ko: {
      initial1: `나의 생각이 전세계에${'\n'}반영되는 설문조사`,
      initial2: `쉽고 안전하고 빠른 지갑 송금${'\n'}Real Research에서 가능합니다.`,
      initial3: `Real Research 만의${'\n'}놀라운 리워드 지금 시작하세요!`,
      confirm: '확인',
      cancel: '취소',
      RealResearch: 'Real Research',
      LoginHello: `Hello there${'\n'}Login to your account`,
      EmailAddress: 'Email Address',
      Password: 'PassWord',
      Login: 'Login',
      KycComplete: {
        1: `KYC Level ${level} `,
        2: `완료 보상으로${'\n'}`,
        3: value,
        4: `를 전송하였습니다.`,
      },
    },
    en: {
      initial1: `나의 생각이 전세계에${'\n'}반영되는 설문조사`,
      initial2: `쉽고 안전하고 빠른 지갑 송금${'\n'}Real Research에서 가능합니다.`,
      initial3: `Real Research 만의${'\n'}놀라운 리워드 지금 시작하세요!`,
      confirm: 'Confrim',
      cancel: 'Cancel',
      LoginHello: `Hello there${'\n'}Login to your account`,
      EmailAddress: 'Email Address',
      Password: 'PassWord',
      Login: 'Login',
    },
  },
];
