import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import {useTranslation} from 'react-i18next';
import CountryItem from './CountryItem/CountryItem';

const SettingsAlert = ({navigation}) => {
  const {t} = useTranslation();

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
          <CountryItem name={t('settingsLanguage1')} code="en" />
          <CountryItem name={t('settingsLanguage2')} code="ko" />
          <CountryItem name={t('settingsLanguage3')} code="pt" />
          <CountryItem name={t('settingsLanguage4')} code="es" />
          <CountryItem name={t('settingsLanguage5')} code="ru" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsAlert;
