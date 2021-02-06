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

const IdVerificationComplete = ({navigation}) => {
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
          인증 완료
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {lineHeight: 30},
          ]}>
          인증이 승인되었습니다!{'\n'}
          ID를 제출해주셔서 감사합니다.{'\n'}
          귀하의 프로필이 검증되었습니다.
        </Text>
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default IdVerificationComplete;