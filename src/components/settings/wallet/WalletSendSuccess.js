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

const WalletSendSuccess = ({navigation, route}) => {
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 100, height: 100, resizeMode: 'contain'}}
            source={require('../../../imgs/drawable-xhdpi/icon_l_check.png')}
          />
          <Text
            style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginTop: '3%'}]}>
            송금완료
          </Text>
        </View>
        <View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>받는 주소</Text>
            <Text style={[ModalStyle.walletDetailsub]}>{to}</Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>보낼 수량</Text>
            <Text style={[ModalStyle.walletDetailsub]}>{amount} TNC</Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>송금 수수료</Text>
            <Text style={[ModalStyle.walletDetailsub]}>10 TNC</Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>잔액</Text>
            <Text style={[ModalStyle.walletDetailsub]}>
              {parseFloat(Number(balance).toFixed(6))} TNC
            </Text>
          </View>
          <View style={[ModalStyle.walletMain]}>
            <Text style={[ModalStyle.walletDetailTitle]}>Memo</Text>
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
              navigation.navigate('WalletMain');
              // this.props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletSendSuccess;
