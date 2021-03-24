import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '@context/server';

import CountDown from '@factory/CountDown';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';

import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';

const EmailAuthentication = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [passWord, setPassWord] = useState('');
  const [email, setEmail] = useState(route.params?.email);
  const [authKey, setAuthKey] = useState('');
  const [returnValue, setReturnValue] = useState('');
  const [returnApprove, setReturnApprove] = useState('');
  const [isRunning, setIsRunning] = useState(true);
  const [timeLeftNumber, setTimeLeftNumber] = useState(180);
  const [CountDownCheck, setCountDownCheck] = useState('');
  const [CountDownExpireCheck, setCountDownExpireCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const handleNextPage = () => {
    console.log('success');
  };

  const handleCountDown = () => {
    setIsRunning(!isRunning);
    setCountDownExpireCheck(false);
  };

  const handleReCountDown = async () => {
    await setIsRunning(true);
    await setTimeLeftNumber(180);
    await setCountDownExpireCheck(false);

    await setIsRunning(false);
    await setTimeLeftNumber(180);
    await setCountDownExpireCheck(false);
  };

  const handleCountDownCheck = (value) => {
    setCountDownCheck(value);
  };

  const handleCountDownExpireCheck = () => {
    setCountDownExpireCheck(true);
  };

  const handlePassword = (text) => {
    setPassWord(text);
    setReturnValue('');
  };

  const emailAuthApi = async (email) => {
    console.log('email', email);
    await axios
      .post(`${server}/util/email/auth`, {
        email: email.replace(/(\s*)/g, ''),
      })
      .then((data) => {
        console.log('then', data);
        console.log('then', data.data.ret_val);
        setAuthKey(data.data.authKey);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const userEmailApprove = async () => {
    await axios
      .post(`${server}/util/email/auth/approve`, {
        authKey: passWord,
        mailId: route.params?.email,
      })
      .then((data) => {
        console.log('THENuserEmailApprove', data);
        console.log('THENuserEmailApprove', data.data.ret_val);
        setReturnApprove(data.data.ret_val);
      })
      .catch((error) => {
        console.log('ERRORuserEmailApprove', error);
        console.log('ERRORuserEmailApprove', error.response);
      });
  };

  const userRegistApi = async (osType) => {
    await axios
      .post(`${server}/user/register`, {
        deviceKey: route.params?.deviceKey,
        inviteCode: '',
        mailId: route.params?.email,
        osType: osType,
        phoneNum: route.params?.phoneNum,
        userPw: route.params?.password,
      })
      .then(async (data) => {
        console.log('thenuserRegistApi', data);
        console.log('thenuserRegistApi', data.data.ret_val);
        await AsyncStorage.setItem('userNo', data.data.userNo);
        setReturnValue(data.data.ret_val);
      })
      .catch((error) => {
        console.log('ERRORuserRegistApi', error);
      });
  };

  const setAuthKeyData = async () => {
    if (CountDownExpireCheck == true && returnApprove != '0') {
      if (authKey == '') {
        this.emailExpireApi(await AsyncStorage.getItem('authKey'));
      } else {
        this.emailExpireApi(authKey);
      }
    }
  };

  useEffect(() => {
    setAuthKeyData();
  }, [CountDownExpireCheck, returnApprove, authKey]);

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
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
                  width: Platform.OS === 'ios' ? 28 : 22,
                  height: Platform.OS === 'ios' ? 28 : 22,
                  resizeMode: 'contain',
                }}
                source={require('@images/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('emailAuthenticationTitle')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {marginTop: '10%', marginBottom: '10%'},
            ]}>
            {email} {t('emailAuthentication1')}
          </Text>
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('emailAuthentication2')}
            </Text>

            <View>
              <View
                style={[
                  AuthStyle.emailAuthTextInputStyle,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '2%',
                    paddingTop: '3%',
                  },
                ]}>
                <View
                  style={{
                    position: 'relative',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    placeholder={t('emailAuthentication3')}
                    placeholderTextColor="#a9a9a9"
                    value={passWord}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    // secureTextEntry={true}
                    onChangeText={(text) => handlePassword(text)}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {textAlign: 'left'},
                      returnApprove != '0' && {
                        width: '100%',
                        height: 40,
                      },
                    ]}
                  />
                  {returnApprove == '0' && (
                    <Image
                      style={{
                        position: 'absolute',
                        left: '40%',
                        height: 15,
                        width: 15,
                        resizeMode: 'contain',
                      }}
                      source={require('@images/verificationCodeCheckIcon.png')}
                    />
                  )}
                  <TouchableOpacity
                    style={[
                      ResetStyle.buttonSmall,
                      {position: 'absolute', right: 0, width: '25%'},
                      returnApprove == '0' && {
                        backgroundColor: '#e6e6e6',
                      },
                    ]}
                    onPress={async () => {
                      await userEmailApprove();
                      console.log('인증하기버튼 클릭후 >>>>', returnApprove);
                      if (returnApprove == '0') {
                        setModalVisible(true);
                      } else if (returnApprove != '0') {
                        setModal2Visible(true);
                      }
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontWhite,
                        {paddingHorizontal: 7, paddingVertical: 7},
                      ]}>
                      {t('emailAuthentication5')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '3%',
                }}>
                {/* <View style={[AuthStyle.emailAuthCountdownBox]}> */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                {/* 재전송 버튼 */}
                <TouchableOpacity
                  onPress={() => {
                    setModal3Visible(true);
                    handleReCountDown();
                    emailAuthApi(email);
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontB,
                      {marginLeft: '5%', fontWeight: '600'},
                    ]}>
                    {t('emailAuthentication4')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            ResetStyle.button,
            returnApprove != '0' && {backgroundColor: '#e6e6e6'},
            // passWord.length < 6 && {backgroundColor: '#e6e6e6'},
          ]}
          onPress={async () => {
            //api 잠시 끄기
            const os = Platform.OS;
            if (os === 'I') {
              await userRegistApi('I');
            } else {
              await userRegistApi('A');
            }
            if (returnValue === 0) {
              navigation.navigate('CompleteAuth');
            }
            //본부장님 테스트용
            // if (returnApprove == 0) {
            //   navigation.navigate('CompleteAuth');
            // }
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {fontWeight: '600'},
            ]}>
            {t('emailAuthenticationNextButton')}
          </Text>
        </TouchableOpacity>
        <TextConfirmModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          handleNextPage={handleNextPage}
          text={t('emailAuthentication6')}
          confirm={t('emailAuthentication7')}
        />
        <BottomModal
          setModalVisible={setModal2Visible}
          modalVisible={modal2Visible}
          text={t('emailAuthentication8')}
        />
        <BottomModal
          setModalVisible={setModal3Visible}
          modalVisible={modal3Visible}
          text={t('signUpModal2')}
        />
      </View>
    </SafeAreaView>
  );
};

export default EmailAuthentication;
