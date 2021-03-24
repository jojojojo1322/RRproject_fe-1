import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
  Platform,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '@factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import {useTranslation} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import CountryItem from './CountryItem/CountryItem';

const SettingsAlert = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [nowLanguage, setNowLanguage] = useState('en');

  useEffect(() => {
    setNowLanguage(RNLocalize.getLocales()[0].languageTag.slice(0, 2));
  }, []);

  console.log('now language???? >>>>', nowLanguage);

  const changelanguageToEn = () => {
    console.log('en');
    i18n.changeLanguage('en');
  };

  const [select, setSelect] = useState(i18n.language);

  useEffect(() => {
    if (select) {
      setNowLanguage(select);
    }
  }, [select]);

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View
          style={[
            ResetStyle.topBackButton,
            {marginLeft: '5%', marginRight: '5%'},
          ]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('settingsLanguageTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, borderTopWidth: 1, borderTopColor: '#dddddd'}}>
          <CountryItem
            name={t('settingsLanguage1')}
            code="en"
            select={select}
            setSelect={setSelect}
          />
          <CountryItem
            name={t('settingsLanguage2')}
            code="ko"
            select={select}
            setSelect={setSelect}
          />
          <CountryItem
            name={t('settingsLanguage3')}
            code="pt"
            select={select}
            setSelect={setSelect}
          />
          <CountryItem
            name={t('settingsLanguage4')}
            code="es"
            select={select}
            setSelect={setSelect}
          />
          <CountryItem
            name={t('settingsLanguage5')}
            code="ru"
            select={select}
            setSelect={setSelect}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsAlert;
