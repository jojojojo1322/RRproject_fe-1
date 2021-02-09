import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import {useTranslation} from 'react-i18next';
import {server} from '../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainVideoComplete = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {surveyId} = route ? route.params : '';
  const URL = 'https://aladdin25.com/';
  const {t, i18n} = useTranslation();

  useEffect(() => {
    postRewardApi();
  }, []);

  // Reward Api

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner, {marginHorizontal: 0}]}>
        <View style={{width: '100%', height: '10%'}}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(URL);
            }}
            style={{width: '100%', height: '100%'}}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={require('../../imgs/ad_aladdinexchange.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: Platform.OS === 'ios' ? 70 : 50,
              height: Platform.OS === 'ios' ? 60 : 50,
              resizeMode: 'contain',
            }}
            source={require('../../imgs/drawable-xxxhdpi/ad_wallet_icon.png')}
          />
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {marginTop: '5%', lineHeight: 25},
            ]}>
            설문조사를 완료해주셔서 감사합니다.{'\n'}
            블록체인 네트워크에서 확인 완료 후{'\n'}
            당신의 리워드 코인을 받으실 수 있습니다.
          </Text>
          <View
            style={{
              width: '90%',
              marginTop: Platform.OS === 'ios' ? '6%' : '3%',
              marginBottom: Platform.OS === 'ios' ? '6%' : '3%',
              borderBottomWidth: 1,
              borderBottomColor: '#dedede',
              alignSelf: 'center',
            }}
          />
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontB,
              {marginRight: '2%'},
            ]}>
            거래 처리 중
          </Text>
        </View>

        {/* footer */}
        <TouchableOpacity
          style={[ResetStyle.button, {width: '90%', marginLeft: '5%'}]}
          activeOpacity={0.75}
          onPress={() => {
            navigation.replace('WalletMain');
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {fontWeight: '600'},
            ]}>
            지갑 확인하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainVideoComplete;
