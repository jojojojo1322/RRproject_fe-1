import React, {Component} from 'react';

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

import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import ProfileStyle from '@style/ProfileStyle';
import {useTranslation} from 'react-i18next';

const ProfileComplete = (props) => {
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner]}>
        {/* Top */}
        <View style={[ProfileStyle.profileCompleteTopView]}>
          <Image
            style={[ProfileStyle.profileTopImg]}
            source={require('@images/iconLCheck.png')}
          />
          <Text
            style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginTop: '5%'}]}>
            {/* {`KYC ${props.route.params?.KycLevel} LEVEL\n 인증완료`} */}

            {props.route.params?.updateCheck === false &&
              t('profileCompleteTitle', {
                kycLevel: props.route.params?.KycLevel,
              })}
            {props.route.params?.updateCheck === true &&
              t('profileCompleteFixTitle', {
                kycLevel: props.route.params?.KycLevel,
              })}
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={[ProfileStyle.profileBottomButtonView]}>
          <TouchableOpacity
            style={[
              ResetStyle.buttonWhite,
              {
                backgroundColor: '#ffffff',
                width: '49%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => {
              props.navigation.replace('WalletMain');
              // props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {fontWeight: '600'},
              ]}>
              {t('profileComplete1')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                backgroundColor: '#4696ff',
                width: '49%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            onPress={() => {
              // props.navigation.navigate('ProfileMain');
              props.navigation.replace('ProfileMain');

              // props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('profileComplete2')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileComplete;
