import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '@context/server';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';

const SignUpPersonal = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkBoolean, setCheckBoolean] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [passwordBlur, setPasswordBlur] = useState(true);
  const [checkPasswordBlur, setCheckPasswordBlur] = useState(true);
  const [checkEmail, setCheckEmail] = useState('');
  const [checkEmailValidation, setCheckEmailValidation] = useState(true);
  const [modalVisibleGoBack, setModalVisibleGoBack] = useState(false);

  const handleEmail = (e) => {
    setEmail(e);
  };

  const handlePassword = (e) => {
    setPassword(e.replace(' ', ''));
  };

  const handleCheckPassword = (e) => {
    setCheckPassword(e.replace(' ', ''));
    setCheckBoolean(e.replace(' ', ''));
  };

  const handleInviteCode = (e) => {
    setInviteCode(e);
  };

  const emailCheckApi = async (email) => {
    console.log('email', email);
    await axios
      .post(`${server}/user/duplicate/mailid`, {
        mailId: email,
      })
      .then((data) => {
        console.log('then', data);
        console.log('then', data.data.ret_val);
        setCheckEmail(data.data.ret_val);
      })
      .catch((error) => {
        console.log('error>>>>>>>>>>>>>>>>', error);
      });
  };

  const emailAuthApi = async (email) => {
    console.log('email', email);
    await axios
      .post(`${server}/util/email/auth`, {
        email: email,
      })
      .then(async (data) => {
        console.log('then', data);
        console.log('then', data.data.ret_val);
        await AsyncStorage.setItem('authKey', data.data.authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  //이메일 유효성 체크
  const CheckEmail = (str) => {
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!reg_email.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  //비밀번호 유효성 체크
  const chkPW = (password) => {
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const regHigh = /^(?=.*?[A-Z])/;
    const regRow = /^(?=.*?[a-z])/;
    const regNumber = /^(?=.*?[0-9])/;
    const regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
    const pw = password;

    if (false === regHigh.test(pw)) {
      console.log('대문자');
      return false;
    } else if (false === regRow.test(pw)) {
      console.log('소문자');
      return false;
    } else if (false === regNumber.test(pw)) {
      console.log('숫자');
      return false;
    } else if (false === regCharacters.test(pw)) {
      console.log('특수문자');
      return false;
    } else if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  };

  const chkPWHigh = (password) => {
    const regHigh = /^(?=.*?[A-Z])/;
    const pw = password;

    return regHigh.test(pw);
  };

  const chkPWRow = (password) => {
    const regRow = /^(?=.*?[a-z])/;
    const pw = password;

    return regRow.test(pw);
  };

  const chkPWNumber = (password) => {
    const regNumber = /^(?=.*?[0-9])/;
    const pw = password;

    return regNumber.test(pw);
  };

  const chkPWCharacter = (password) => {
    const regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
    const pw = password;
    return regCharacters.test(pw);
  };

  const goBack = () => {
    setModalVisibleGoBack(true);
  };

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
          style={[
            {
              flex: 1,
              marginHorizontal: '5%',
              marginBottom: Platform.OS === 'ios' ? 0 : '5%',
              backgroundColor: '#fff',
            },
          ]}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
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
                {t('signUpPersonalTitle')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* 이메일 */}
          <View>
            {/* <View> */}
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {marginTop: '10%', textAlign: 'left'},
                ]}>
                {t('signUpPersonal1')}
              </Text>
            </View>

            <TouchableOpacity>
              <View style={AuthStyle.signupInputImageAll}>
                <TextInput
                  keyboardType={'email-address'}
                  placeholder={t('signUpPersonal2')}
                  placeholderTextColor="#a9a9a9"
                  onBlur={async () => {
                    console.log('>>>>>>>>>>>>>>>>>>>>aaa>>>>>>>>');
                    console.log(email.trim());
                    console.log('>>>>>>>>>>>>>>>>>>>>aaa>>>>>>>>');
                    setCheckEmailValidation(true);
                    if (CheckEmail(email.trim())) {
                      emailCheckApi(email.trim());
                    } else {
                      setCheckEmailValidation(false);
                      console.log('유효성 에러');
                      console.log(checkEmailValidation);
                      console.log('유효성 에러');
                    }
                  }}
                  // keyboardType={'numeric'}
                  onChangeText={(text) => handleEmail(text)}
                  value={email}
                  autoCapitalize={'none'}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      paddingTop: '6%',
                      paddingBottom: '3%',
                      width: '90%',
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => {
                    setEmail('');
                    setCheckEmail('');
                    setCheckEmailValidation('');
                  }}>
                  <Image
                    style={ResetStyle.mediumImg}
                    source={require('@images/iconX.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* alert */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '3%',
              }}>
              {checkEmail !== 0 &&
                checkEmail != '' &&
                checkEmailValidation === true && (
                  // checkEmail !== '' &&

                  <>
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('@images/iconXRed.png')}
                    />
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontR,
                        {marginLeft: 5},
                      ]}>
                      {t('signUpPersonal13')}
                    </Text>
                  </>
                )}
              {checkEmailValidation === false && (
                // checkEmail !== '' &&

                <>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('@images/iconXRed.png')}
                  />
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontR,
                      {marginLeft: 5},
                    ]}>
                    {t('signUpPersonal14')}
                  </Text>
                </>
              )}
              {checkEmail === 0 && checkEmailValidation === true && (
                <>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('@images/iconCheckedM.png')}
                  />
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontB,
                      {marginLeft: 5},
                    ]}>
                    {t('signUpPersonal15')}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* 호 */}
          <View>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {marginTop: '10%', textAlign: 'left'},
                ]}>
                {t('signUpPersonal3')}
              </Text>
            </View>

            <TouchableOpacity>
              {/* 상단 비밀번호 */}
              <View style={AuthStyle.signupInputImageAll}>
                <TextInput
                  placeholder={t('signUpPersonal4')}
                  placeholderTextColor="#a9a9a9"
                  secureTextEntry={passwordBlur}
                  // keyboardType={'numeric'}
                  onChangeText={(text) => handlePassword(text)}
                  value={password}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      paddingTop: '6%',
                      paddingBottom: '3%',
                      width: '90%',
                    },
                  ]}
                  onBlur={() => {
                    if (checkPassword == '' || password == '') {
                      setCheckBoolean('');
                    } else if (checkPassword == password) {
                      setCheckBoolean(true);
                    } else if (checkPassword != password) {
                      setCheckBoolean(false);
                    }
                  }}
                  blurOnSubmit={false}
                  // onSubmitEditing={() => Keyboard.dismiss()}
                  textContentType={'oneTimeCode'}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPasswordBlur(!passwordBlur);
                  }}>
                  {passwordBlur ? (
                    <Image
                      style={ResetStyle.mediumImg}
                      source={require('@images/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.mediumImg}
                      source={require('@images/icoViewD.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              {/* d */}
              <View style={{flexDirection: 'row'}}>
                {/* d */}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '3%',
                  }}>
                  {!chkPWRow(password) ? (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconUncheckedS.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconCheckedS.png')}
                    />
                  )}
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      {marginLeft: 5, marginRight: '4%'},
                    ]}>
                    {t('signUpPersonal5')}
                  </Text>
                </View>
                <View style={[AuthStyle.signupCheckView]}>
                  {!chkPWNumber(password) ? (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconUncheckedS.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconCheckedS.png')}
                    />
                  )}
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      {marginLeft: 5, marginRight: '4%'},
                    ]}>
                    {t('signUpPersonal6')}
                  </Text>
                </View>
                <View style={[AuthStyle.signupCheckView]}>
                  {!chkPWHigh(password) ? (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconUncheckedS.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconCheckedS.png')}
                    />
                  )}
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      {marginLeft: 5, marginRight: '4%'},
                    ]}>
                    {t('signUpPersonal7')}
                  </Text>
                </View>
                {/* d */}
              </View>
              {/* d */}
              <View style={{flexDirection: 'row'}}>
                <View style={[AuthStyle.signupCheckView]}>
                  {!chkPWCharacter(password) ? (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconUncheckedS.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconCheckedS.png')}
                    />
                  )}
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      {marginLeft: 5, marginRight: '4%'},
                    ]}>
                    {t('signUpPersonal8')}
                  </Text>
                </View>
                <View style={[AuthStyle.signupCheckView]}>
                  {password.length < 8 ? (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconUncheckedS.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.xsmallImg}
                      source={require('@images/iconCheckedS.png')}
                    />
                  )}
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      {marginLeft: 5, marginRight: '4%'},
                    ]}>
                    {t('signUpPersonal9')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* 인 */}
          <View>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {marginTop: '10%', textAlign: 'left'},
                ]}>
                {t('signUpPersonal10')}
              </Text>
            </View>
            {/* 하단 비밀번호  */}
            <TouchableOpacity>
              <View style={AuthStyle.signupInputImageAll}>
                <TextInput
                  placeholder={t('signUpPersonal12')}
                  placeholderTextColor="#a9a9a9"
                  secureTextEntry={checkPasswordBlur}
                  // keyboardType={'numeric'}
                  onBlur={() => {
                    if (checkPassword == '' || password == '') {
                      setCheckBoolean('');
                    } else if (checkPassword == password) {
                      setCheckBoolean(true);
                    } else if (checkPassword != password) {
                      setCheckBoolean(false);
                    }
                  }}
                  onChangeText={(text) => handleCheckPassword(text)}
                  value={checkPassword}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      paddingTop: '6%',
                      paddingBottom: '3%',
                      width: '90%',
                    },
                  ]}
                  blurOnSubmit={false}
                  // onSubmitEditing={() => Keyboard.dismiss()}
                  textContentType={'oneTimeCode'}
                />
                {/* <Image
                  style={ResetStyle.smallImg}
                  source={require('@images/icoViewD.png')}
                /> */}
                <TouchableOpacity
                  onPress={() => {
                    setCheckPasswordBlur(!checkPasswordBlur);
                  }}>
                  {checkPasswordBlur ? (
                    <Image
                      style={ResetStyle.mediumImg}
                      source={require('@images/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.mediumImg}
                      source={require('@images/icoViewD.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* alert */}
            <View style={[AuthStyle.signupCheckView]}>
              {checkBoolean !== '' && checkBoolean == false && (
                <>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('@images/iconXRed.png')}
                  />

                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontR,
                      {marginLeft: 5},
                    ]}>
                    {t('signUpPersonal16')}
                  </Text>
                </>
              )}
              {checkBoolean == true && (
                <>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('@images/iconCheckedM.png')}
                  />
                  <Text
                    style={{color: '#0080ff', fontSize: 14, marginLeft: 10}}>
                    {t('signUpPersonal17')}
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* 초대코드 */}
          {/* <View>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left'},
                ]}>
                초대코드 (선택사항)
              </Text>
            </View>

            <TouchableOpacity>
              <View style={AuthStyle.signupInputImageAll}>
                <TextInput
                  placeholder="비밀번호 다시 입력"
                  placeholderTextColor="#a9a9a9"
                  // keyboardType={'numeric'}
                  onChangeText={this.handleInviteCode}
                  value={inviteCode}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      paddingTop: '6%',
                      paddingBottom: '3%',
                    },
                  ]}></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      inviteCode: '',
                    });
                  }}>
                  <Image
                    style={[ResetStyle.mediumImg]}
                    source={require('@images/iconX.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
            // style={[ResetStyle.button, {backgroundColor: '#e6e6e6'}]}
            style={[
              ResetStyle.button,
              {marginTop: '40%'},
              (checkBoolean !== true ||
                checkEmail !== 0 ||
                !chkPW(password)) && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              console.log('nextBoolean', checkBoolean);
              console.log('nextsadasdasd', checkEmail);
              console.log(Platform.OS);
              console.log({
                checkBoolean: checkBoolean,
                checkEmail: checkEmail,
                cpassword: chkPW(password),
              });
              if (checkBoolean == true && checkEmail === 0 && chkPW(password)) {
                emailAuthApi(email);
                console.log('aaaa');
                navigation.navigate('EmailAuthentication', {
                  email: email.trim(),
                  password: password,
                  deviceKey: route.params?.deviceKey,
                  phoneNum: route.params?.phoneNum,
                  inviteCode: inviteCode,
                });
              }
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('signUpPersonalNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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

export default SignUpPersonal;
