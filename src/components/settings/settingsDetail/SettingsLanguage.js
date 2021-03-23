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
import {RoundCheckbox, SelectedCheckboxes} from '../../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import {useTranslation} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const SettingsAlert = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [DATA] = useState([
    {
      id: '1',
      lng: 'en',
      title: t('settingsLanguage1'),
    },
    {
      id: '2',
      lng: 'ko',
      title: t('settingsLanguage2'),
    },
    {
      id: '3',
      lng: 'pt',
      title: t('settingsLanguage3'),
    },
    {
      id: '4',
      lng: 'es',
      title: t('settingsLanguage4'),
    },
    {
      id: '5',
      lng: 'ru',
      title: t('settingsLanguage5'),
    },
  ]);
  const [nowLanguage, setNowLanguage] = useState('en');

  useEffect(() => {
    setNowLanguage(RNLocalize.getLocales()[0].languageTag.slice(0, 2));
  }, []);

  console.log('now language???? >>>>', nowLanguage);

  const changelanguageToEn = () => {
    console.log('en');
    i18n.changeLanguage('en');
  };

  const changelanguageToKo = () => {
    console.log('ko');
    i18n.changeLanguage('ko');
  };

  const changelanguageToPt = () => {
    console.log('pt');
    i18n.changeLanguage('pt');
  };

  const changelanguageToEs = () => {
    console.log('es');
    i18n.changeLanguage('es');
  };

  const changelanguageToRu = () => {
    console.log('ru');
    i18n.changeLanguage('ru');
  };

  const Item = ({title, id, onPress}) => {
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#dddddd',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
        onPress={() => {
          if (id === '1') {
            changelanguageToEn();
            setNowLanguage('en');
          } else if (id === '2') {
            changelanguageToKo();
            setNowLanguage('ko');
          } else if (id === '3') {
            changelanguageToPt();
            setNowLanguage('pt');
          } else if (id === '4') {
            changelanguageToEs();
            setNowLanguage('es');
          } else if (id === '5') {
            changelanguageToRu();
            setNowLanguage('ru');
          } else {
            changelanguageToEn();
          }
        }}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
          ]}>
          {title}
        </Text>
        {(id === '1' && nowLanguage === 'en') ||
        (id === '2' && nowLanguage === 'ko') ||
        (id === '3' && nowLanguage === 'pt') ||
        (id === '4' && nowLanguage === 'es') ||
        (id === '5' && nowLanguage === 'ru') ? (
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('@images/iconCheckedS.png')}
          />
        ) : (
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('@images/iconUncheckedS.png')}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      id={item.id}
      onPress={() => {
        setNowLanguage(item.lng);
      }}
    />
  );

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
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsAlert;
