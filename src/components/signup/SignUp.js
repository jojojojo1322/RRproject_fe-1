import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import ListModal from '../../components/factory/modal/ListModal';
import CountDown from '../../components/factory/CountDown';
import ResetStyle from '../../style/ResetStyle.js';

import {server} from '../defined/server';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import BottomModal from '../factory/modal/BottomModal';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

//휴대폰 유효성 검사
function isCellPhone(p) {
  p = p.split('-').join('');

  var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

  return regPhone.test(p);
}

class SignUp extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    modalVisibleNotAuth: false,
    modalVisibleNotAuthExpire: false,
    modalVisibleNotPhone: false,
    modalVisibleNotPhoneVali: false,
    phoneAuthCheck: '',
    AuthKeyCheck: '',
    AuthKey: '',
    phoneNum: '',
    country: '',
    countryCd: '',
    deviceKey: '',
    isRunning: false,
    timeLeftNumber: 180,
    CountDownCheck: '',
    CountDownExpireCheck: false,
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
  setModalVisibleNotAuthExpire = (visible) => {
    this.setState({modalVisibleNotAuthExpire: visible});
  };
  setModalVisibleNotPhone = (visible) => {
    this.setState({modalVisibleNotPhone: visible});
  };
  setModalVisibleNotPhoneVali = (visible) => {
    this.setState({modalVisibleNotPhoneVali: visible});
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
  componentDidUpdate(preProps, preState) {
    if (preState.CountDownExpireCheck !== this.state.CountDownExpireCheck) {
      if (this.state.CountDownExpireCheck === true) {
        console.log(this.state.AuthKey);
        this.smsAuthExpireApi(this.state.AuthKey);
      }
    }
  }
  setCountry = (a, b) => {
    this.setState({
      country: a,
      countryCd: b,
    });
  };

  smsAuthApi = async (device, phone) => {
    console.log('smsmsmsmsmsmsmsmsmsmsm');
    await axios
      .post(`${server}/util/sms/auth`, {
        deviceKey: device,
        phoneNum: phone,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.authkey);
        this.setState({
          phoneAuthCheck: response.data.ret_val,
          AuthKey: response.data.authkey,
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
  smsAuthExpireApi = (authKey) => {
    console.log('Expire AUAUAUAU', authKey);
    axios
      .patch(`${server}/util/sms/auth/expired`, {
        authKey: authKey,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleCountDown() {
    this.setState((state) => ({
      isRunning: !state.isRunning,
      CountDownExpireCheck: false,
    }));
  }

  handleReCountDown = async () => {
    await this.setState({
      isRunning: true,
      timeLeftNumber: 180,
      CountDownExpireCheck: false,
    });
    await this.setState({
      isRunning: false,
      timeLeftNumber: 180,
      CountDownExpireCheck: false,
    });
    // this.setState({
    //   isRunning: true,
    //   timeLeftNumber: 180,
    // });
  };
  handleCountDownCheck = (value) => {
    this.setState({
      CountDownCheck: value,
    });
  };
  handleCountDownExpireCheck = () => {
    console.log(
      'handleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheck',
    );
    this.setState({
      CountDownExpireCheck: true,
    });
  };

  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={[ResetStyle.containerInner]}>
            <View>
              {/* topBackButton */}
              <View>
                <View style={ResetStyle.topBackButton}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}>
                    <Image
                      source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                    />
                  </TouchableOpacity>
                  <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                    휴대폰 인증
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginTop: '10%'},
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

              <TouchableOpacity
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
              </TouchableOpacity>

              <ListModal
                modalVisible={this.state.modalVisible}
                setModalVisible={this.setModalVisible}
                setCountry={this.setCountry}
                titleText={`국가선택`}
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

              {this.state.CountDownCheck == 'start' && (
                <TouchableOpacity
                  onPress={async () => {
                    // console.log(this.state.phoneNum);
                    // console.log(this.state.countryCd);
                    // console.log(
                    //   `${this.state.countryCd}${this.state.phoneNum.slice(
                    //     1,
                    //     undefined,
                    //   )}`,
                    // );

                    // console.log(`+82${this.state.phoneNum.slice(1, undefined)}`);
                    if (isCellPhone(this.state.phoneNum)) {
                      this.handleReCountDown();
                      await this.smsAuthApi(
                        this.state.deviceKey,
                        `+82${this.state.phoneNum.slice(1, undefined)}`,
                      );
                      if (this.state.phoneAuthCheck == '-1') {
                        this.setModalVisibleNotPhone(true);
                      }
                    } else {
                      this.setModalVisibleNotPhoneVali(true);
                    }
                  }}
                  underlayColor={'#164895'}
                  style={[ResetStyle.buttonWhite]}>
                  <Text
                    style={[
                      ResetStyle.fontMediumK,
                      ResetStyle.fontB,
                      {fontWeight: '600'},
                    ]}>
                    재요청
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.CountDownCheck == '' && (
                <TouchableOpacity
                  onPress={async () => {
                    // console.log(this.state.phoneNum);
                    // console.log(this.state.countryCd);
                    // console.log(
                    //   `${this.state.countryCd}${this.state.phoneNum.slice(
                    //     1,
                    //     undefined,
                    //   )}`,
                    // );
                    if (isCellPhone(this.state.phoneNum)) {
                      this.handleCountDown();
                      await this.smsAuthApi(
                        this.state.deviceKey,
                        `+82${this.state.phoneNum.slice(1, undefined)}`,
                      );
                      if (this.state.phoneAuthCheck == '-1') {
                        this.setModalVisibleNotPhone(true);
                      }
                    } else {
                      this.setModalVisibleNotPhoneVali(true);
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
                </TouchableOpacity>
              )}
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
              <View>
                <TextInput
                  placeholder="인증번호 입력"
                  placeholderTextColor="#a9a9a9"
                  value={this.state.passWord}
                  keyboardType={'numeric'}
                  returnKeyType={'done'}
                  // secureTextEntry={true}
                  onChangeText={(text) => this.handlePassword(text)}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    ResetStyle.textInputText,
                  ]}
                />
              </View>

              <View
                style={[
                  ResetStyle.textInputTextButton,
                  {flexDirection: 'row', top: '38%'},
                ]}>
                <Image
                  source={require('../../imgs/drawable-xhdpi/icon_time.png')}
                  style={[ResetStyle.smallImg, {marginRight: 8}]}
                />
                {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}

                <CountDown
                  standard={this.state.isRunning}
                  timeLeftNumber={this.state.timeLeftNumber}
                  handleReCountDown={this.handleReCountDown}
                  handleCountDownCheck={this.handleCountDownCheck}
                  CountDownCheck={this.state.CountDownCheck}
                  CountDownExpireCheck={this.state.CountDownExpireCheck}
                  handleCountDownExpireCheck={this.handleCountDownExpireCheck}
                />
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
            <TouchableOpacity
              style={[
                ResetStyle.button,
                this.state.passWord.length !== 6 && {
                  backgroundColor: '#e6e6e6',
                },
              ]}
              onPress={async () => {
                // await this.smsAuthApproveApi(
                //   this.state.passWord,
                //   `+82${this.state.phoneNum.slice(1, undefined)}`,
                // );
                // if (this.state.AuthKeyCheck == '-3') {
                //   this.setModalVisibleNotAuth(true);
                // } else if (this.state.AuthKeyCheck == '-1') {
                //   this.setModalVisibleNotAuthExpire(true);
                // } else if (this.state.AuthKeyCheck == '0') {
                //   this.props.navigation.navigate('AgreementTermsConditions', {
                //     deviceKey: this.state.deviceKey,
                //     phoneNum: `+82${this.state.phoneNum.slice(1, undefined)}`,
                //   });
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
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <BottomModal
          setModalVisible={this.setModalVisibleNotAuth}
          modalVisible={this.state.modalVisibleNotAuth}
          text={`인증번호가 틀렸습니다`}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotAuthExpire}
          modalVisible={this.state.modalVisibleNotAuthExpire}
          text={`만료된 인증번호입니다`}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotPhone}
          modalVisible={this.state.modalVisibleNotPhone}
          text={`이미 인증된 번호입니다`}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotPhoneVali}
          modalVisible={this.state.modalVisibleNotPhoneVali}
          text={
            this.state.country == ''
              ? `국가를 선택해주세요`
              : `휴대폰 번호를 정확히 입력해주세요`
          }
        />
      </SafeAreaView>
    );
  }
}

export default SignUp;
