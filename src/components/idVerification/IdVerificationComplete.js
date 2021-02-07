import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../style/ResetStyle.js';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const IdVerificationComplete = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      {/* topBackButton */}
      <View style={[ResetStyle.topBackButton, {paddingHorizontal: '5%'}]}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
          />
        </TouchableOpacity>
      </View>

      {/* body */}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30%',
        }}>
        <Image
          style={{width: 130, height: 130, resizeMode: 'contain'}}
          source={require('../../imgs/drawable-xxxhdpi/confirmed_icon.png')}
        />
        <Text
          style={[
            ResetStyle.fontBoldK,
            ResetStyle.fontB,
            {
              marginTop: '10%',
              marginBottom: '5%',
            },
          ]}>
          {t('idVerificationCompleteTitle')}
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {lineHeight: 30},
          ]}>
          {t('idVerificationComplete1')}
        </Text>
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default IdVerificationComplete;
