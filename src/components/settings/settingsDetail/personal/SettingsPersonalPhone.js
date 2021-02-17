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
import ListModal from '../../../factory/modal/ListModal';
import CountDown from '../../../factory/CountDown';
import ResetStyle from '../../../../style/ResetStyle.js';

import {server} from '../../../defined/server';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import BottomModal from '../../../factory/modal/BottomModal';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

//휴대폰 유효성 검사
function isCellPhone(p) {
  p = p.split('-').join('');

  var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

  return regPhone.test(p);
}

class SettingsPersonalPhone extends Component {
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
    countryPhoneCode: '',
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
      if (
        this.state.CountDownExpireCheck === true &&
        this.state.AuthKeyCheck != '0'
      ) {
        console.log(this.state.AuthKey);
        this.smsAuthExpireApi(this.state.AuthKey);
      }
    }
  }
  setCountry = (a, b, c) => {
    this.setState({
      country: a,
      countryCd: b,
      countryPhoneCode: c,
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
    const {t} = this.props;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[ResetStyle.containerInner]}>
            <View>
              {/* topBackButton */}
              <View style={ResetStyle.topBackButton}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    style={{
                      width: Platform.OS === 'ios' ? 28 : 25,
                      height: Platform.OS === 'ios' ? 28 : 25,
                      resizeMode: 'contain',
                    }}
                    source={require('../../../../imgs/backIcon.png')}
                  />
                  <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                    {t('settingsPersonalPhoneTitle')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginTop: '10%'},
                ]}>
                {t('settingsPersonalPhone1')}
              </Text>
            </View>

            <View style={ResetStyle.textInputStyle}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('settingsPersonalPhone2')}
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
                      ? 'Country Code'
                      : `${this.state.country} (${this.state.countryCd})`}
                  </Text>
                  <Image
                    style={[
                      ResetStyle.smallImg,
                      ResetStyle.textInputTextButton,
                      {top: '100%'},
                    ]}
                    source={require('../../../../imgs/moreIcon.png')}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                placeholder={t('settingsPersonalPhone3')}
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
                    {t('settingsPersonalPhone4')}
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
                    {t('settingsPersonalPhone5')}
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
                {t('settingsPersonalPhone6')}
              </Text>
              <View>
                <TextInput
                  placeholder={t('settingsPersonalPhone7')}
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
                  source={require('../../../../imgs/iconTime.png')}
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
                  source={require('../../../../imgs/iconNoticeCheck.png')}
                  style={ResetStyle.smallImg}
                />
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontG,
                    {marginLeft: '2%'},
                  ]}>
                  {t('settingsPersonalPhone8')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../../imgs/iconNoticeCheck.png')}
                  style={ResetStyle.smallImg}
                />
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontG,
                    {marginLeft: '2%'},
                  ]}>
                  {t('settingsPersonalPhone9')}
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
                await this.smsAuthApproveApi(
                  this.state.passWord,
                  `+82${this.state.phoneNum.slice(1, undefined)}`,
                );
                if (this.state.AuthKeyCheck == '-3') {
                  this.setModalVisibleNotAuth(true);
                } else if (this.state.AuthKeyCheck == '-1') {
                  this.setModalVisibleNotAuthExpire(true);
                } else if (this.state.AuthKeyCheck == '0') {
                  this.props.navigation.navigate('AgreementTermsConditions', {
                    deviceKey: this.state.deviceKey,
                    phoneNum: `+82${this.state.phoneNum.slice(1, undefined)}`,
                  });
                  this.props.navigation.setOptions({title: '약관동의'});
                }
                // this.props.navigation.navigate('AgreementTermsConditions', {
                //   deviceKey: this.state.deviceKey,
                //   phoneNum: `+82${this.state.phoneNum.slice(1, undefined)}`,
                // });
                // this.props.navigation.setOptions({title: '약관동의'});
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                {t('settingsPersonalPhoneNextButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <View>
          <ListModal
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
            setCountry={this.setCountry}
            titleText={t('settingsPersonalPhone10')}
          />
        </View>
        <BottomModal
          setModalVisible={this.setModalVisibleNotAuth}
          modalVisible={this.state.modalVisibleNotAuth}
          text={t('settingsPersonalPhone11')}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotAuthExpire}
          modalVisible={this.state.modalVisibleNotAuthExpire}
          text={t('settingsPersonalPhone12')}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotPhone}
          modalVisible={this.state.modalVisibleNotPhone}
          text={t('settingsPersonalPhone13')}
        />
        <BottomModal
          setModalVisible={this.setModalVisibleNotPhoneVali}
          modalVisible={this.state.modalVisibleNotPhoneVali}
          text={
            this.state.country == ''
              ? t('settingsPersonalPhone14')
              : t('settingsPersonalPhone15')
          }
        />
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(SettingsPersonalPhone),
  SettingsPersonalPhone,
);
