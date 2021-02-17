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
  // const {surveyId} = route ? route.params : '';
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
            source={require('../../imgs/adWalletIcon.png')}
          />
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {marginTop: '5%', lineHeight: 25},
            ]}>
            {t('mainVideoComplete1')}
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
            {t('mainVideoComplete2')}
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
            {t('mainVideoComplete3')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainVideoComplete;
