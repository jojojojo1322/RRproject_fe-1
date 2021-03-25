import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Image,
  YellowBox,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import {isPossiblePhoneNumber} from 'react-phone-number-input';
import ListModal from '@factory/modal/ListModal';
import CountDown from '@factory/CountDown';
import ResetStyle from '@style/ResetStyle.js';

import {server} from '@context/server';
import axios from 'axios';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';

const SignUp = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleRe, setModalVisibleRe] = useState(false);
  const [modalVisibleNotAuth, setModalVisibleNotAuth] = useState(false);
  const [modalVisibleNotAuthExpire, setModalVisibleNotAuthExpire] = useState(
    false,
  );
  const [modalVisibleNotPhone, setModalVisibleNotPhone] = useState(false);
  const [modalVisibleNotPhoneVali, setModalVisibleNotPhoneVali] = useState(
    false,
  );
  const [modalVisibleResend, setModalVisibleResend] = useState(false);
  const [modalVisibleGoBack, setModalVisibleGoBack] = useState(false);
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
  const [countryData, setCountryData] = useState([]);

  const countryDataApi = async () => {
    try {
      await axios
        .get(`${server}/util/global/country`)
        .then((response) => {
          if (response.data) {
            setCountryData(response.data);
          }
        })
        .catch(({e}) => {
          console.log('error', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // only number
  const handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      setPhoneNum(phoneNum);
    }
  };

  const setCountryInfo = (country, cd, phone) => {
    setCountry(country);
    setCountryCd(cd);
    setCountryPhoneCode(phone);
  };

  const smsAuthApi = async (device, phone) => {
    try {
      await axios
        .post(`${server}/util/sms/auth`, {
          deviceKey: device,
          phoneNum: phone,
        })
        .then((response) => {
          if (response.data) {
            setPhoneAuthCheck(response.data.ret_val);
            setAuthKey(response.data.authkey);
            return response.data.ret_val;
          }
        })
        .catch((e) => {
          console.log('smsAuthApi ERROR>>', e.response);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const smsAuthApproveApi = async (authKey, phone) => {
    try {
      await axios
        .patch(`${server}/util/sms/auth/approve`, {
          authKey: authKey,
          phoneNum: phone,
        })
        .then((response) => {
          if (response.data) {
            const result = response.data.ret_val;
            setAuthKeyCheck(result);
            if (result == '-3') {
              setModalVisibleNotAuth(true);
            } else if (result == '-1') {
              setModalVisibleNotAuthExpire(true);
            } else if (result == '0') {
              setAuthKeyCheck('');
              setIsRunning(false);
              setCountDownCheck('');
              setTimeLeftNumber(180);
              navigation.navigate('AgreementTermsConditions', {
                deviceKey: deviceKey,
                phoneNum: `+${countryPhoneCode}${phoneNum}`,
              });
              navigation.setOptions({title: '약관동의'});
            }
            return response.data.ret_val;
          } else {
            setModalVisibleNotAuth(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const smsAuthExpireApi = async (authKey) => {
    console.log('Expire AUAUAUAU', authKey);
    try {
      await axios
        .patch(`${server}/util/sms/auth/expired`, {
          authKey: authKey,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCountDown = () => {
    setIsRunning(!isRunning);
    setCountDownExpireCheck(false);
  };

  const handleReCountDown = async () => {
    await setTimeLeftNumber(180);
    await setCountDownExpireCheck(false);

    await setIsRunning(true);
    await setIsRunning(false);
  };

  const handleCountDownCheck = (value) => {
    setCountDownCheck(value);
  };

  const handleCountDownExpireCheck = () => {
    setCountDownExpireCheck(true);
  };

  const goBack = () => {
    setModalVisibleGoBack(true);
  };

  useEffect(() => {
    countryDataApi();
    setDeviceKey(DeviceInfo.getUniqueId());
  }, []);

  useEffect(() => {
    if (CountDownExpireCheck === true && AuthKeyCheck != '0') {
      console.log(AuthKey);
      smsAuthExpireApi(AuthKey);
    }
  }, [CountDownExpireCheck]);

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        setModalVisibleGoBack(true);
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onAndroidBackPress,
          );
        }
      };
    }, []),
  );

  return (
    <SafeAreaView style={ResetStyle.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginHorizontal: '5%',
            marginBottom: Platform.OS === 'ios' ? 0 : '5%',
            backgroundColor: '#fff',
          }}>
          <View>
            {/* topBackButton */}
            <View style={ResetStyle.topBackButton}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => goBack()}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 22,
                    height: Platform.OS === 'ios' ? 28 : 22,
                    resizeMode: 'contain',
                  }}
                  source={require('@images/backIcon.png')}
                />

                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  {t('signUpBack')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {marginTop: '10%', fontWeight: '300'},
              ]}>
              {t('signUp1')}
            </Text>
          </View>

          <View style={ResetStyle.textInputStyle}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResetStyle.textInputTitle,
                {marginTop: '10%'},
              ]}>
              {t('signUp2')}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              underlayColor={'transparent'}>
              <View
                style={[
                  ResetStyle.textInputText,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {textAlign: 'left'},
                    country !== '' && ResetStyle.fontBlack,
                  ]}>
                  {country == '' ? t('signUp3') : `${country} (${countryCd})`}
                </Text>

                {/* triangle img */}
                <View
                  style={{
                    width: 0,
                    height: 0,
                    marginTop: '1%',
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 7,
                    borderRightWidth: 7,
                    borderBottomWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: '#787878',
                    transform: [{rotate: '180deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TextInput
                placeholder={t('signUp4')}
                placeholderTextColor="#a9a9a9"
                keyboardType={'numeric'}
                returnKeyType={'done'}
                onChangeText={(text) => handleInputChange(text)}
                value={phoneNum}
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  ResetStyle.textInputText,
                  {marginBottom: '5%', width: '100%'},
                ]}
              />
            </View>
            {/* 인증 문자 재전송 */}
            {CountDownCheck == 'start' && (
              <TouchableOpacity
                onPress={async () => {
                  console.log(
                    'CountDownCheck start',
                    `${countryPhoneCode}${phoneNum}`,
                  );
                  console.log(
                    isPossiblePhoneNumber(`+${countryPhoneCode}${phoneNum}`),
                  );
                  if (
                    isPossiblePhoneNumber(`+${countryPhoneCode}${phoneNum}`)
                  ) {
                    handleReCountDown();
                    setModalVisibleResend(true);
                    await smsAuthApi(
                      deviceKey,
                      `+${countryPhoneCode}${phoneNum}`,
                    );

                    if (phoneAuthCheck == '-1') {
                      setModalVisibleNotPhone(true);
                    } else {
                      setModalVisibleRe(true);
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
                  {t('signUp6')}
                </Text>
              </TouchableOpacity>
            )}
            {/* 인증문자 처음 발송 */}
            {CountDownCheck == '' && (
              <TouchableOpacity
                onPress={async () => {
                  console.log(
                    'CountDownCheck ',
                    `${countryPhoneCode}${phoneNum}`,
                  );
                  if (
                    isPossiblePhoneNumber(`+${countryPhoneCode}${phoneNum}`)
                  ) {
                    handleCountDown();
                    if (phoneAuthCheck == '-1') {
                      setModalVisibleNotPhone(true);
                    }
                    await smsAuthApi(
                      deviceKey,
                      `+${countryPhoneCode}${phoneNum}`,
                    );
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
                  {t('signUp5')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={[ResetStyle.textInputStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResetStyle.textInputTitle,
                {marginTop: '10%'},
              ]}>
              {t('signUp7')}
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder={t('signUp8')}
                placeholderTextColor="#a9a9a9"
                value={password}
                keyboardType={'numeric'}
                returnKeyType={'done'}
                // secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  ResetStyle.textInputText,
                  {borderBottomWidth: 0, maxWidth: '80%'},
                ]}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: '4%',
                }}>
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
                  {marginLeft: '2%', textAlign: 'left'},
                ]}>
                {t('signUp9')}
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

                  {
                    marginLeft: '2%',

                    textAlign: 'left',
                  },
                ]}>
                {t('signUp10')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              ResetStyle.button,
              password.length !== 6 && {
                backgroundColor: '#e6e6e6',
              },
              {marginTop: '20%'},
            ]}
            onPress={async () => {
              await smsAuthApproveApi(
                password,
                `+${countryPhoneCode}${phoneNum}`,
              );
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('signUpNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <View>
        <ListModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setCountry={setCountryInfo}
          titleText={t('signUpModal1')}
          list={countryData}
        />
      </View>
      <BottomModal
        setModalVisible={setModalVisibleResend}
        modalVisible={modalVisibleResend}
        text={t('signUpModal2')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotAuth}
        modalVisible={modalVisibleNotAuth}
        text={t('signUpModal3')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotAuthExpire}
        modalVisible={modalVisibleNotAuthExpire}
        text={t('signUpModal4')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotPhone}
        modalVisible={modalVisibleNotPhone}
        text={t('signUpModal5')}
      />
      <BottomModal
        setModalVisible={setModalVisibleNotPhoneVali}
        modalVisible={modalVisibleNotPhoneVali}
        text={country == '' ? t('signUpModal6') : t('signUpModal7')}
      />
      <TextConfirmCancelModal
        modalVisible={modalVisibleGoBack}
        setModalVisible={setModalVisibleGoBack}
        text={t('SignUp_Reset')}
        confirm={t('confirm')}
        confirmHandle={() => navigation.popToTop()}
        cancel={t('cancel')}
        cancelHandle={() => setModalVisibleGoBack(false)}
      />
    </SafeAreaView>
  );
};

export default SignUp;

// export default hoistStatics(withTranslation()(SignUp), SignUp);
