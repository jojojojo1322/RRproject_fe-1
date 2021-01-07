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

export default class WalletSendSuccess extends Component {
  render() {
    const level = 2;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
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
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {marginTop: '3%'},
              ]}>
              송금완료
            </Text>
          </View>
          <View>
            <View style={[ModalStyle.walletMain]}>
              <Text style={[ModalStyle.walletDetailTitle]}>받는 주소</Text>
              <Text style={[ModalStyle.walletDetailsub]}>
                0x6565232c6565ed6565659desds6565c565c565c565c565c5
              </Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text style={[ModalStyle.walletDetailTitle]}>보낼 수량</Text>
              <Text style={[ModalStyle.walletDetailsub]}>1,000,000 TNC</Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text style={[ModalStyle.walletDetailTitle]}>Memo</Text>
              <Text style={[ModalStyle.walletDetailsub]}>10월의 수익</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[
                ResetStyle.button,
                // {backgroundColor: '#4696ff', width: '49%', marginLeft: '1%'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('WalletMain');
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
  }
}
