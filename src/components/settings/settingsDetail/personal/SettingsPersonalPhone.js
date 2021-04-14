import React, {Component, useEffect, useState} from 'react';
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
import ListModal from '@factory/modal/ListModal';
import CountDown from '@factory/CountDown';
import ResetStyle from '@style/ResetStyle.js';

import {server} from '@context/server';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import BottomModal from '@factory/modal/BottomModal';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useTranslation} from 'react-i18next';

//휴대폰 유효성 검사
function isCellPhone(p) {
  p = p.split('-').join('');

  var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

  return regPhone.test(p);
}
const SettingsPersonalPhone = () => {
  const [passWord, setPassWord] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleNotAuth, setModalVisibleNotAuth] = useState(false);
  const [modalVisibleNotAuthExpire, setModalVisibleNotAuthExpire] = useState(
    false,
  );
  const [modalVisibleNotPhone, setModalVisibleNotPhone] = useState(false);
  const [modalVisibleNotPhoneVali, setModalVisibleNotPhoneVali] = useState(
    false,
  );
  const [phoneAuthCheck, setPhoneAuthCheck] = useState('');
  const [AuthKeyCheck, setAuthKeyCheck] = useState('');
  const [AuthKey, setAuthKey] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [country, setCountry] = useState('');
  const [countryCd, setCountryCd] = useState('');
  const [countryPhoneCode, setCountryPhoneCode] = useState('');
  const [deviceKey, setDeviceKey] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeftNumber, setTimeLeftNumber] = useState(180);
  const [CountDownCheck, setCountDownCheck] = useState('');
  const [CountDownExpireCheck, setCountDownExpireCheck] = useState(false);

  const {t} = useTranslation();

  // only number
  const handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      setPhoneNum(phoneNum);
    }
  };
  // componentDidMount() {
  //   this.setState({
  //     deviceKey: DeviceInfo.getUniqueId(),
  //   });
  // }

  useEffect(() => {
    setDeviceKey(DeviceInfo.getUniqueId());
  }, []);

  // componentDidUpdate(preProps, preState) {
  //   if (preState.CountDownExpireCheck !== this.state.CountDownExpireCheck) {
  //     if (
  //       this.state.CountDownExpireCheck === true &&
  //       this.state.AuthKeyCheck != '0'
  //     ) {
  //       console.log(this.state.AuthKey);
  //       this.smsAuthExpireApi(this.state.AuthKey);
  //     }
  //   }
  // }
  useEffect(() => {
    if (CountDownExpireCheck === true && AuthKeyCheck != '0') {
      smsAuthExpireApi(AuthKeyCheck);
    }
  }, [CountDownExpireCheck]);
  const _setCountry = (a, b, c) => {
    setCountry(a);
    setCountryCd(b);
    setCountryPhoneCode(c);
  };

  const smsAuthApi = async (device, phone) => {
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

        setPhoneAuthCheck(response.data.ret_val);
        setAuthKey(response.data.authkey);
        return response.data.ret_val;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const smsAuthApproveApi = async (authKey, phone) => {
    await axios
      .patch(`${server}/util/sms/auth/approve`, {
        authKey: authKey,
        phoneNum: phone,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.ret_val);

        setAuthKeyCheck(response.data.ret_val);
        return response.data.ret_val;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const smsAuthExpireApi = (authKey) => {
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

  const handleCountDown = () => {
    setIsRunning(!isRunning);
    setCountDownExpireCheck(false);
  };

  const handleReCountDown = async () => {
    setTimeLeftNumber(180);
    setCountDownExpireCheck(false);
    setIsRunning(true);
    setIsRunning(false);

    // this.setState({
    //   isRunning: true,
    //   timeLeftNumber: 180,
    // });
  };
  const handleCountDownCheck = (value) => {
    setCountDownCheck(value);
  };

  const handleCountDownExpireCheck = () => {
    console.log(
      'handleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheck',
    );
    setCountDownExpireCheck(true);
  };

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
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 25,
                    height: Platform.OS === 'ios' ? 28 : 25,
                    resizeMode: 'contain',
                  }}
                  source={require('@images/backIcon.png')}
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
                setModalVisible(true);
              }}
              underlayColor={'transparent'}>
              <View style={[ResetStyle.textInputText]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {textAlign: 'left'},
                  ]}>
                  {country == '' ? 'Country Code' : `${country} (${countryCd})`}
                </Text>
                <Image
                  style={[
                    ResetStyle.smallImg,
                    ResetStyle.textInputTextButton,
                    {top: '100%'},
                  ]}
                  source={require('@images/moreIcon.png')}
                />
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder={t('settingsPersonalPhone3')}
              placeholderTextColor="#a9a9a9"
              keyboardType={'numeric'}
              returnKeyType={'done'}
              onChangeText={(e) => {
                handleInputChange(e);
              }}
              value={phoneNum}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
                {marginBottom: '5%'},
              ]}></TextInput>

            {CountDownCheck == 'start' && (
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
                  if (isCellPhone(phoneNum)) {
                    handleReCountDown();
                    smsAuthApi(deviceKey, `+82${phoneNum.slice(1, undefined)}`);
                    if (phoneAuthCheck == '-1') {
                      setModalVisibleNotPhone(true);
                    }
                  } else {
                    setModalVisibleNotPhoneVali(true);
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
            {CountDownCheck == '' && (
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
                  if (isCellPhone(phoneNum)) {
                    handleCountDown();
                    smsAuthApi(deviceKey, `+82${phoneNum.slice(1, undefined)}`);
                    if (phoneAuthCheck == '-1') {
                      setModalVisibleNotPhone(true);
                    }
                  } else {
                    setModalVisibleNotPhoneVali(true);
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
                value={passWord}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                // secureTextEntry={true}
                onChangeText={(text) => setPassWord(text)}
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
                source={require('@images/iconTime.png')}
                style={[ResetStyle.smallImg, {marginRight: 8}]}
              />
              {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}

              <CountDown
                standard={isRunning}
                timeLeftNumber={timeLeftNumber}
                handleReCountDown={handleReCountDown}
                handleCountDownCheck={handleCountDownCheck}
                CountDownCheck={CountDownCheck}
                CountDownExpireCheck={CountDownExpireCheck}
                handleCountDownExpireCheck={handleCountDownExpireCheck}
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
                source={require('@images/iconNoticeCheck.png')}
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
                source={require('@images/iconNoticeCheck.png')}
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
              passWord.length !== 6 && {
                backgroundColor: '#e6e6e6',
              },
            ]}
            onPress={async () => {
              smsAuthApproveApi(passWord, `+82${phoneNum.slice(1, undefined)}`);
              if (AuthKeyCheck == '-3') {
                setModalVisibleNotAuth(true);
              } else if (AuthKeyCheck == '-1') {
                setModalVisibleNotAuthExpire(true);
              } else if (AuthKeyCheck == '0') {
                navigation.navigate('AgreementTermsConditions', {
                  deviceKey: deviceKey,
                  phoneNum: `+82${phoneNum.slice(1, undefined)}`,
                });
                navigation.setOptions({title: '약관동의'});
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
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCountry={_setCountry}
          titleText={t('settingsPersonalPhone10')}
        />
      </View>
      <BottomModal
        setModalVisible={setModalVisibleNotAuth}
        modalVisible={modalVisibleNotAuth}
        text={t('settingsPersonalPhone11')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotAuthExpire}
        modalVisible={modalVisibleNotAuthExpire}
        text={t('settingsPersonalPhone12')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotPhone}
        modalVisible={modalVisibleNotPhone}
        text={t('settingsPersonalPhone13')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotPhoneVali}
        modalVisible={modalVisibleNotPhoneVali}
        text={
          country == ''
            ? t('settingsPersonalPhone14')
            : t('settingsPersonalPhone15')
        }
      />
    </SafeAreaView>
  );
};
export default SettingsPersonalPhone;
