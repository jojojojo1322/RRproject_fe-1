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

const IdVerificationDecline = ({navigation}) => {
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
              source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
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
            source={require('../../imgs/drawable-xxxhdpi/rejected_icon.png')}
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
            인증 거절
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {lineHeight: 28},
            ]}>
            인증이 거절되었습니다.{'\n'}
            여권의 더 명확한 사본을 {'\n'}
            다시 제출해주세요.
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
            확인
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IdVerificationDecline;
