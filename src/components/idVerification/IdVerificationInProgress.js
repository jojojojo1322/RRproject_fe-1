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

const IdVerificationInProgress = ({navigation}) => {
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
          style={{width: 140, height: 140, resizeMode: 'contain'}}
          source={require('../../imgs/drawable-xxxhdpi/ing_icon.png')}
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
          인증 진행중
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {lineHeight: 28},
          ]}>
          파일이 성공적으로 제출되었습니다.{'\n'}
          승인 여부는 Real Research 앱에서{'\n'}
          알림으로 확인해주세요!
        </Text>
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default IdVerificationInProgress;
