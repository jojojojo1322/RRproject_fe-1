import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {server} from '../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../style/ResetStyle.js';
import WalletStyle from '../../style/WalletStyle.js';
import {TextInput} from 'react-native-gesture-handler';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const IdVerificationSorry = ({navigation}) => {
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
            style={{
              width: Platform.OS === 'ios' ? 28 : 25,
              height: Platform.OS === 'ios' ? 28 : 25,
              resizeMode: 'contain',
            }}
            source={require('../../imgs/backIcon.png')}
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
          source={require('../../imgs/sorryIcon.png')}
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
          {t('idVerificationSorryTitle')}
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {lineHeight: 28},
          ]}>
          {t('idVerificationSorry1')}
        </Text>
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default IdVerificationSorry;
