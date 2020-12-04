import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ListModal from '../../components/factory/modal/ListModal';
import CountDown from '../../components/factory/CountDown';
import ResetStyle from '../../style/ResetStyle.js';

class SignUp extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    country: '',
    countryCd: '',
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  // only number
  handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      this.setState({
        phoneNum,
      });
    }
  };
  setCountry = (a, b) => {
    console.log('a>>', a);
    console.log('b>>', b);
    this.setState({
      country: a,
      countryCd: b,
    });
  };
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {marginTop: 50},
              ]}>
              원활한 서비스 제공을 위해{'\n'}휴대폰 번호를 입력해주세요
            </Text>
          </View>

          <View style={ResetStyle.textInputStyle}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              휴대폰 번호
            </Text>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
              underlayColor={'transparent'}>
              <View style={[ResetStyle.textInputText]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {textAlign: 'left'},
                  ]}>
                  {this.state.country == ''
                    ? '초기나라설정'
                    : `${this.state.country} (${this.state.countryCd})`}
                </Text>
                <Image
                  style={[
                    ResetStyle.smallImg,
                    ResetStyle.textInputTextButton,
                    {top: '100%'},
                  ]}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </View>
            </TouchableHighlight>

            <ListModal
              modalVisible={this.state.modalVisible}
              setModalVisible={this.setModalVisible}
              setCountry={this.setCountry}
              text={`인증번호를 발송하였습니다.`}
            />

            <TextInput
              placeholder="-없이 휴대폰 번호 입력"
              placeholderTextColor="#a9a9a9"
              keyboardType={'numeric'}
              returnKeyType={'done'}
              onChangeText={this.handleInputChange}
              value={this.state.phoneNum}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
                {marginBottom: '5%'},
              ]}></TextInput>

            <TouchableWithoutFeedback
              onPress={() => {}}
              underlayColor={'#164895'}
              style={[ResetStyle.button]}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                인증요청
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={[ResetStyle.textInputStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              인증 번호
            </Text>

            <TextInput
              placeholder="인증번호 입력"
              placeholderTextColor="#a9a9a9"
              value={this.state.passWord}
              keyboardType={'numeric'}
              returnKeyType={'done'}
              secureTextEntry={true}
              onChangeText={(text) => this.handlePassword(text)}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
              ]}
            />
            <View
              style={[
                ResetStyle.textInputTextButton,
                {flexDirection: 'row', top: '38%'},
              ]}>
              <Image
                source={require('../../imgs/drawable-xhdpi/icon_time.png')}
                style={ResetStyle.smallImg}
              />
              {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}
              <CountDown />
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                marginTop: '2%',
                marginBottom: '2%',
              }}>
              <Image
                source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')}
                style={ResetStyle.smallImg}
              />
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontG,
                  {marginLeft: '2%'},
                ]}>
                3분 이내에 인증번호를 입력해 주세요.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')}
                style={ResetStyle.smallImg}
              />
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontG,
                  {marginLeft: '2%'},
                ]}>
                입력시간 초과 시 ‘재요청’ 버튼을 눌려주세요.
              </Text>
            </View>
          </View>

          <TouchableWithoutFeedback
            style={[ResetStyle.button, {backgroundColor: '#e6e6e6'}]}
            onPress={() => {
              this.props.navigation.navigate('AgreementTermsConditions');
              this.props.navigation.setOptions({title: '약관동의'});
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              다음
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle3: {
    flexDirection: 'row',
  },
});

export default SignUp;
