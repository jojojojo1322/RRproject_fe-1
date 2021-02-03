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
import {lang} from '../../defined/lang';
import ProfileStyle from '../../../style/ProfileStyle';

export default class ProfileComplete extends Component {
  render() {
    const level = 2;
    return (
      <SafeAreaView style={[ResetStyle.container]}>
        <View style={[ResetStyle.containerInner]}>
          {/* Top */}
          <View style={[ProfileStyle.profileCompleteTopView]}>
            <Image
              style={[ProfileStyle.profileTopImg]}
              source={require('../../../imgs/drawable-xhdpi/icon_l_check.png')}
            />
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {marginTop: '5%'},
              ]}>
              {`KYC ${this.props.route.params?.KycLevel} LEVEL\n 인증완료`}
            </Text>
          </View>

          {/* Bottom Button */}
          <View style={[ProfileStyle.profileBottomButtonView]}>
            <TouchableOpacity
              style={[
                ResetStyle.buttonWhite,
                {backgroundColor: '#ffffff', width: '49%'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('WalletMain');
                // this.props.navigation.setOptions({ title: '약관동의' });
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '600'},
                ]}>
                지갑 확인하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ResetStyle.button,
                {backgroundColor: '#4696ff', width: '49%'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('ProfileMain');
                // this.props.navigation.setOptions({ title: '약관동의' });
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                Profile 이동
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
