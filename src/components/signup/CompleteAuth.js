import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle.js';

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
              marginTop: 80,
            }}>
            <Image
              style={{width: 130, height: 130}}
              source={require('../../imgs/drawable-xhdpi/icon_l_check.png')}
            />
            <Text
              style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginTop: 20}]}>
              회원가입 완료
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 10, marginBottom: 40},
              ]}>
              Real Research 회원가입이 완료되었습니다
            </Text>
          </View>

          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#787878',
              marginBottom: 30,
            }}
          />

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {lineHeight: 28, marginBottom: 30},
              ]}>
              다음 단계는 KYC인증 단계입니다{'\n'}
              KYC 인증을 등록하시면{'\n'}
              설문조사 참여 가능합니다
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {marginBottom: 110},
              ]}>
              지금 시작해보세요!
            </Text>
          </View>

          <TouchableWithoutFeedback
            style={[
              ResetStyle.button,
              {backgroundColor: '#4696ff', marginBottom: 150},
            ]}
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
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

export default CompleteAuth;