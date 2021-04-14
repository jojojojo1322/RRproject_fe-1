import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '@factory/Roundcheck';
import ResetStyle from '@style/ResetStyle.js';
import axios from 'axios';
import {server} from '@context/server';

import TextConfirmModal from '@factory/modal/TextConfirmModal';
import AuthStyle from '@style/AuthStyle';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

//비밀번호 유효성 체크
function chkPW(password) {
  var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var regHigh = /^(?=.*?[A-Z])/;
  var regRow = /^(?=.*?[a-z])/;
  var regNumber = /^(?=.*?[0-9])/;
  var regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
  var pw = password;

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
  } else {
    return true;
  }
}
function chkPWHigh(password) {
  var regHigh = /^(?=.*?[A-Z])/;
  var pw = password;

  return regHigh.test(pw);
}
function chkPWRow(password) {
  var regRow = /^(?=.*?[a-z])/;
  var pw = password;

  return regRow.test(pw);
}
function chkPWNumber(password) {
  var regNumber = /^(?=.*?[0-9])/;
  var pw = password;

  return regNumber.test(pw);
}
function chkPWCharacter(password) {
  var regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
  var pw = password;
  return regCharacters.test(pw);
}

const SettingsPersonalResetPassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [checkBoolean, setCheckBoolean] = useState('');
  const [firstBlur, setFirstBlur] = useState(true);
  const [secondBlur, setSecondBlur] = useState(true);
  const [ret_val, setRet_val] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const {t} = useTranslation();

  const handleCheckPassword = (e) => {
    setCheckPassword(e);
    setCheckBoolean('');
  };
  const handleNextPage = () => {
    navigation.navigate('Login');
  };

  const pwReSettingApi = async (password) => {
    console.log('password', password);
    console.log('userno', route.params?.userNo);
    await axios
      .patch(`${server}/user/${route.params?.userNo}`, {
        userPw: password,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);

        setRet_val(response.data.ret_val);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        <View style={{flexDirection: 'column'}}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
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
                {t('settingsPersonalResetPasswordTitle')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity>
              <View style={[ResetStyle.textInputStyle]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    ResetStyle.textInputTitle,
                  ]}>
                  {t('settingsPersonalResetPassword1')}
                </Text>
                <TextInput
                  placeholder={t('settingsPersonalResetPassword2')}
                  placeholderTextColor="#a9a9a9"
                  // keyboardType={'numeric'}
                  secureTextEntry={firstBlur}
                  onChangeText={(e) => {
                    setPassword(e);
                  }}
                  value={password}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    ResetStyle.textInputText,
                  ]}
                  onBlur={() => {
                    if (checkPassword == '' || password == '') {
                      setCheckBoolean('');
                    } else if (checkPassword == password) {
                      setCheckBoolean(true);
                    } else if (checkPassword != password) {
                      setCheckBoolean(false);
                    }
                  }}></TextInput>
                <TouchableOpacity
                  style={[ResetStyle.textInputTextButton, {top: '45%'}]}
                  onPress={() => {
                    const first = firstBlur;

                    setFirstBlur(!first);
                  }}>
                  {firstBlur ? (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('@images/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('@images/icoViewD.png')}
                    />
                  )}
                </TouchableOpacity>
                <View style={[AuthStyle.resetPasswordView1]}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[AuthStyle.resetPasswordView2]}>
                      {!chkPWRow(password) ? (
                        <Image
                          style={[ResetStyle.xsmallImg]}
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
                        {t('settingsPersonalResetPassword3')}
                      </Text>
                    </View>
                    <View style={[AuthStyle.resetPasswordView2]}>
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
                        {t('settingsPersonalResetPassword4')}
                      </Text>
                    </View>
                    <View style={[AuthStyle.resetPasswordView2]}>
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
                        {t('settingsPersonalResetPassword5')}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[AuthStyle.resetPasswordView2]}>
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
                        {t('settingsPersonalResetPassword6')}
                      </Text>
                    </View>
                    <View style={[AuthStyle.resetPasswordView2]}>
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
                        {t('settingsPersonalResetPassword7')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/* 비밀번호 확인 */}
            <TouchableOpacity>
              <View style={[ResetStyle.textInputStyle, {marginTop: '10%'}]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    ResetStyle.textInputTitle,
                  ]}>
                  {t('settingsPersonalResetPassword8')}
                </Text>
                <TextInput
                  secureTextEntry={secondBlur}
                  placeholder={t('settingsPersonalResetPassword9')}
                  placeholderTextColor="#a9a9a9"
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
                  onChangeText={(e) => {
                    handleCheckPassword(e);
                  }}
                  value={checkPassword}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    ResetStyle.textInputText,
                  ]}></TextInput>
                {/* <Image
                style={ResetStyle.smallImg}
                source={require('@images/icoViewD.png')}
              /> */}
                <TouchableOpacity
                  style={[ResetStyle.textInputTextButton]}
                  onPress={() => {
                    const second = secondBlur;

                    setSecondBlur(!second);
                  }}>
                  {secondBlur ? (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('@images/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('@images/icoViewD.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '3%',
              }}>
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
                    {t('settingsPersonalResetPassword10')}
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
          {/* 비밀번호 */}
        </View>

        {/* 확인버튼 */}
        <TouchableOpacity
          // style={[styles.button, {backgroundColor: '#4696ff'}]}
          style={
            chkPW(password) && password == checkPassword
              ? [ResetStyle.button]
              : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
          }
          onPress={async () => {
            // api 확인용

            if (chkPW(password) && password == checkPassword) {
              console.log('비밀번호 api 접근');
              pwReSettingApi(password);
            } else if (password !== checkPassword) {
              console.log('비밀번호 api 노접근');

              setCheckBoolean(false);
            }
            if (ret_val === 0) {
              console.log('비밀번호 api 성공');
              setModalVisible(true);
              navigation.navigate('SettingsPersonal');
            }

            //본부장님 테스트용
            // if (
            //   chkPW(password) &&
            //   password == checkPassword
            // ) {
            //   this.setModalVisible(true);
            //   this.props.navigation.navigate('SettingsPersonal');
            // } else if (password !== checkPassword) {
            //   this.setState({
            //     checkBoolean: false,
            //   });
            // }
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settingsPersonalResetPasswordNextButton')}
          </Text>
        </TouchableOpacity>
        <TextConfirmModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settingsPersonalResetPassword11')}
          confirm={t('settingsPersonalResetPassword12')}
          handleNextPage={handleNextPage}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPersonalResetPassword;
