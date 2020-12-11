import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

class CompleteAuth extends Component {
  state = {};

  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '25%',
            }}>
            <Image
              style={{width: '35%', height: '35%', resizeMode: 'contain'}}
              source={require('../../imgs/drawable-xhdpi/icon_l_check.png')}
            />
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {marginTop: '3%'},
              ]}>
              회원가입 완료
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: '3%'},
              ]}>
              Real Research 회원가입이 완료되었습니다
            </Text>
          </View>

          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#787878',
              marginBottom: '3%',
            }}
          />

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {lineHeight: 28, marginBottom: '10%'},
              ]}>
              다음 단계는 KYC인증 단계입니다{'\n'}
              KYC 인증을 등록하시면{'\n'}
              설문조사 참여 가능합니다
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {marginBottom: '10%'},
              ]}>
              지금 시작해보세요!
            </Text>
          </View>

          <TouchableOpacity
            style={[ResetStyle.button, {backgroundColor: '#4696ff'}]}
            onPress={() => {
              this.props.navigation.navigate('Kyc');
              // this.props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default CompleteAuth;
