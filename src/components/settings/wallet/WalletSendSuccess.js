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

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import ModalStyle from '../../../style/ModalStyle';
import {lang} from '../../defined/lang';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const WalletSendSuccess = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const {amount} = route ? route.params : '';
  const {email} = route ? route.params : '';
  const {memo} = route ? route.params : '';
  const {to} = route ? route.params : '';
  const {type} = route ? route.params : '';
  const {balance} = route ? route.params : '';

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton]}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('../../../imgs/backIcon.png')}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 100, height: 100, resizeMode: 'contain'}}
            source={require('../../../imgs/iconLCheck.png')}
          />
          <Text
            style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginTop: '3%'}]}>
            {t('walletSendSuccessTitle')}
          </Text>
        </View>
        <View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>
              {t('walletSendSuccess1')}
            </Text>
            <Text style={[ModalStyle.walletDetailsub]}>{to}</Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>
              {t('walletSendSuccess2')}
            </Text>
            <Text style={[ModalStyle.walletDetailsub]}>
              {amount}
              {t('walletSendSuccess3')}
            </Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>
              {t('walletSendSuccess4')}
            </Text>
            <Text style={[ModalStyle.walletDetailsub]}>
              {t('walletSendSuccess5')}
            </Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>
              {t('walletSendSuccess6')}
            </Text>
            <Text style={[ModalStyle.walletDetailsub]}>
              {parseFloat(Number(balance).toFixed(6))}
              {t('walletSendSuccess7')}
            </Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>
              {t('walletSendSuccess8')}
            </Text>
            <Text style={[ModalStyle.walletDetailsub]}>{memo}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              // {backgroundColor: '#4696ff', width: '49%', marginLeft: '1%'},
            ]}
            onPress={() => {
              navigation.replace('WalletMain');
              // this.props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('walletSendSuccessNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletSendSuccess;
