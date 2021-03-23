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

const IdVerificationDecline = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton, {paddingHorizontal: '5%'}]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 22,
                height: Platform.OS === 'ios' ? 28 : 22,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* body */}
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '20%',
          }}>
          <Image
            style={{width: 130, height: 145, resizeMode: 'contain'}}
            source={require('@images/rejectedIcon.png')}
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
            {t('idVerificationDeclineTitle')}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {lineHeight: 28},
            ]}>
            {t('idVerificationDecline1')}
          </Text>
        </View>

        {/* footer */}
        <TouchableOpacity
          style={[ResetStyle.button, {width: '90%', marginLeft: '5%'}]}
          activeOpacity={0.75}
          onPress={() => {
            navigation.navigate('IdVerification');
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {fontWeight: '600'},
            ]}>
            {t('idVerificationDeclineNextButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IdVerificationDecline;
