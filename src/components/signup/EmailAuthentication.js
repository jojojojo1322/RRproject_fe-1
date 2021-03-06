import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {server} from '@context/server';

import CountDown from '@factory/CountDown';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';

import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';
import {signUp} from '@module/auth';
import {emailAuth, userEmailApprove} from '@repository/verifyRepository';

const EmailAuthentication = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {signupResult} = useSelector(({auth}) => ({
    signupResult: auth.signupResult,
  }));

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
  const [modalVisibleGoBack, setModalVisibleGoBack] = useState(false);

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
    await emailAuth({
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
    try {
      await userEmailApprove({
        authKey: passWord,
        mailId: route.params?.email,
      })
        .then((data) => {
          console.log('THENuserEmailApprove', data);
          console.log('THENuserEmailApprove', data.data.ret_val);

          const result = data.data.ret_val;
          setReturnApprove(result);

          if (result == '0') {
            setModalVisible(true);
            setIsRunning(false);
            setCountDownCheck('');
            setTimeLeftNumber(180);
          } else if (result != '0') {
            setModal2Visible(true);
          }
        })
        .catch((error) => {
          console.log('ERRORuserEmailApprove', error);
          console.log('ERRORuserEmailApprove', error.response);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const userRegistApi = (osType) => {
    console.log(osType);
    dispatch(
      signUp({
        deviceKey: route.params?.deviceKey,
        inviteCode: '',
        mailId: route.params?.email,
        osType: osType,
        phoneNum: route.params?.phoneNum,
        userPw: route.params?.password,
      }),
    );
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

  const goBack = () => {
    setModalVisibleGoBack(true);
  };

  useEffect(() => {
    if (signupResult) {
      const {userNo, ret_val} = signupResult;
      AsyncStorage.setItem('userNo', userNo);
      setReturnValue(ret_val);
    }
  }, [signupResult]);

  useEffect(() => {
    if (returnValue === 0) {
      navigation.navigate('CompleteAuth');
    }
    //???????????? ????????????
    // if (returnApprove == 0) {
    //   navigation.navigate('CompleteAuth');
    // }
  }, [returnValue]);

  useEffect(() => {
    setAuthKeyData();
  }, [CountDownExpireCheck, returnApprove, authKey]);

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
        <View style={ResetStyle.containerInner}>
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
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: '3%',
                    paddingBottom: '2%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e6e6e6',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      flexDirection: 'row',
                      alignItems: 'center',
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
                        {
                          width: 'auto',
                          textAlign: 'left',
                          padding: 0,
                        },
                      ]}
                    />
                    {returnApprove == '0' && (
                      <Image
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: 'contain',
                          marginLeft: 10,
                        }}
                        source={require('@images/verificationCodeCheckIcon.png')}
                      />
                    )}
                  </View>
                  {returnApprove == '0' ? (
                    <View
                      style={[
                        ResetStyle.buttonSmall,
                        {
                          width: '20%',
                          paddingVertical: '1.5%',
                          backgroundColor: '#e6e6e6',
                        },
                      ]}>
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontWhite,
                          {
                            backgroundColor: '#e6e6e6',
                          },
                        ]}>
                        {t('emailAuthentication5')}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[
                        ResetStyle.buttonSmall,
                        {
                          width: '20%',
                          paddingVertical: '1.5%',
                        },
                      ]}
                      onPress={() => userEmailApprove()}>
                      <Text
                        style={[ResetStyle.fontLightK, ResetStyle.fontWhite]}>
                        {t('emailAuthentication5')}
                      </Text>
                    </TouchableOpacity>
                  )}
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
                    {returnApprove == '0' ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#787878',
                          marginLeft: 5,
                        }}>
                        03:00
                      </Text>
                    ) : (
                      <CountDown
                        standard={isRunning}
                        timeLeftNumber={timeLeftNumber}
                        handleReCountDown={handleReCountDown}
                        handleCountDownCheck={handleCountDownCheck}
                        CountDownCheck={CountDownCheck}
                        CountDownExpireCheck={CountDownExpireCheck}
                        handleCountDownExpireCheck={handleCountDownExpireCheck}
                      />
                    )}
                  </View>
                  {/* ????????? ?????? */}
                  <TouchableOpacity
                    onPress={() => {
                      setModal3Visible(true);
                      handleReCountDown();
                      emailAuthApi(email);
                      setReturnApprove('');
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
            onPress={() => userRegistApi(Platform.OS === 'ios' ? 'I' : 'A')}>
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
          <TextConfirmCancelModal
            modalVisible={modalVisibleGoBack}
            setModalVisible={setModalVisibleGoBack}
            text={t('SignUp_Reset')}
            confirm={t('confirm')}
            confirmHandle={() => navigation.popToTop()}
            cancel={t('cancel')}
            cancelHandle={() => setModalVisibleGoBack(false)}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmailAuthentication;
