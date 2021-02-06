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

const IdVerificationSorry = ({navigation}) => {
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
          인증 실패
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {lineHeight: 28},
          ]}>
          인증이 금지되었습니다.{'\n'}
          제출하신 서류가 기준에 맞지 않습니다.{'\n'}
          자세한 사항은 CS팀에 문의해주세요.
        </Text>
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default IdVerificationSorry;
