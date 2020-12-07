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

import {server} from '../defined/server';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import BottomModal from '../factory/modal/BottomModal';

class SignUp extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    modalVisibleNotAuth: false,
    modalVisibleNotPhone: false,
    phoneAuthCheck: '',
    AuthKeyCheck: '',
    phoneNum: '',
    country: '',
    countryCd: '',
    deviceKey: '',
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModalVisibleNotAuth = (visible) => {
    this.setState({modalVisibleNotAuth: visible});
  };
  setModalVisibleNotPhone = (visible) => {
    this.setState({modalVisibleNotPhone: visible});
  };

  // only number
  handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      this.setState({
        phoneNum,
      });
    }
  };
  componentDidMount() {
    this.setState({
      deviceKey: DeviceInfo.getUniqueId(),
    });
  }
  setCountry = (a, b) => {
    this.setState({
      country: a,
      countryCd: b,
    });
  };

  smsAuthApi = async (device, phone) => {
    await axios
      .post(`${server}/util/sms/auth`, {
        deviceKey: device,
        phoneNum: phone,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          phoneAuthCheck: response.data.ret_val,
        });
        return response.data.ret_val;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  smsAuthApproveApi = async (authKey, phone) => {
    await axios
      .patch(`${server}/util/sms/auth/approve`, {
        authKey: authKey,
        phoneNum: phone,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.ret_val);
        this.setState({
          AuthKeyCheck: response.data.ret_val,
        });
        return response.data.ret_val;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  smsAuthExpireApi = (device, phone) => {
    axios
      .patch(`${server}/util/sms/auth/expired`, {
        deviceKey: device,
        phoneNum: phone,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
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
              onPress={async () => {
                // console.log(this.state.phoneNum);
                // console.log(this.state.countryCd);
                // console.log(
                //   `${this.state.countryCd}${this.state.phoneNum.slice(
                //     1,
                //     undefined,
                //   )}`,
                // );
                console.log(`+82${this.state.phoneNum.slice(1, undefined)}`);
                await this.smsAuthApi(
                  this.state.deviceKey,
                  `+82${this.state.phoneNum.slice(1, undefined)}`,
                );
                if (this.state.phoneAuthCheck == '-1') {
                  this.setModalVisibleNotPhone(true);
                }
              }}
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
            onPress={async () => {
              // await this.smsAuthApproveApi(
              //   this.state.passWord,
              //   `+82${this.state.phoneNum.slice(1, undefined)}`,
              // );
              // if (
              //   this.state.AuthKeyCheck == '-3'
              //   // true
              // ) {
              //   this.setModalVisibleNotAuth(true);
              // } else if (this.state.AuthKeyCheck == '0') {
              //   this.props.navigation.navigate('AgreementTermsConditions');
              //   this.props.navigation.setOptions({title: '약관동의'});
              // }
              this.props.navigation.navigate('AgreementTermsConditions', {
                deviceKey: this.state.deviceKey,
                phoneNum: `+82${this.state.phoneNum.slice(1, undefined)}`,
              });
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
        <BottomModal
          setModalVisible={this.setModalVisibleNotAuth}
          modalVisible={this.state.modalVisibleNotAuth}
          text={`인증번호가 틀렸습니다`}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotPhone}
          modalVisible={this.state.modalVisibleNotPhone}
          text={`이미 인증된 번호입니다`}
        />
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
