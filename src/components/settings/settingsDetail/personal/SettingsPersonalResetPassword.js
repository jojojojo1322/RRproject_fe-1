import React, {Component} from 'react';
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
import {server} from '../../../defined/server';

import TextConfirmModal from '@factory/modal/TextConfirmModal';
import AuthStyle from '@style/AuthStyle';

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

class SettingsPersonalResetPassword extends Component {
  state = {
    password: '',
    checkPassword: '',
    checkBoolean: '',
    firstBlur: true,
    secondBlur: true,
    ret_val: 1,
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  handleFirst = (e) => {
    this.setState({
      firstPassword: e,
    });
  };
  handleSecond = (e) => {
    this.setState({
      secondPassword: e,
    });
  };
  handlePassword = async (e) => {
    await this.setState({
      password: e,
    });
    // console.log(chkPWHigh(this.state.password));
    // chkPWHigh(this.state.password);
  };
  handleCheckPassword = (e) => {
    this.setState({
      checkPassword: e,
      checkBoolean: '',
    });
  };
  handleNextPage = () => {
    this.props.navigation.navigate('Login');
  };
  pwReSettingApi = async (password) => {
    console.log('password', password);
    console.log('userno', this.props.route.params?.userNo);
    await axios
      .patch(`${server}/user/${this.props.route.params?.userNo}`, {
        userPw: password,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);
        this.setState({
          ret_val: response.data.ret_val,
        });
        // const authKey = response.data.authKey;
        // await AsyncStorage.setItem('authKey', authKey);
        // console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  render() {
    const {t} = this.props;
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View style={{flexDirection: 'column'}}>
            {/* topBackButton */}
            <View style={[ResetStyle.topBackButton]}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.goBack();
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
                    secureTextEntry={this.state.firstBlur}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontG,
                      ResetStyle.textInputText,
                    ]}
                    onBlur={() => {
                      if (
                        this.state.checkPassword == '' ||
                        this.state.password == ''
                      ) {
                        this.setState({
                          checkBoolean: '',
                        });
                      } else if (
                        this.state.checkPassword == this.state.password
                      ) {
                        this.setState({
                          checkBoolean: true,
                        });
                      } else if (
                        this.state.checkPassword != this.state.password
                      ) {
                        this.setState({
                          checkBoolean: false,
                        });
                      }
                    }}></TextInput>
                  <TouchableOpacity
                    style={[ResetStyle.textInputTextButton, {top: '45%'}]}
                    onPress={() => {
                      const first = this.state.firstBlur;
                      this.setState({
                        firstBlur: !first,
                      });
                    }}>
                    {this.state.firstBlur ? (
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
                        {!chkPWRow(this.state.password) ? (
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
                        {!chkPWNumber(this.state.password) ? (
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
                        {!chkPWHigh(this.state.password) ? (
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
                        {!chkPWCharacter(this.state.password) ? (
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
                        {this.state.password.length < 8 ? (
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
                    secureTextEntry={this.state.secondBlur}
                    placeholder={t('settingsPersonalResetPassword9')}
                    placeholderTextColor="#a9a9a9"
                    // keyboardType={'numeric'}
                    onBlur={() => {
                      if (
                        this.state.checkPassword == '' ||
                        this.state.password == ''
                      ) {
                        this.setState({
                          checkBoolean: '',
                        });
                      } else if (
                        this.state.checkPassword == this.state.password
                      ) {
                        this.setState({
                          checkBoolean: true,
                        });
                      } else if (
                        this.state.checkPassword != this.state.password
                      ) {
                        this.setState({
                          checkBoolean: false,
                        });
                      }
                    }}
                    onChangeText={this.handleCheckPassword}
                    value={this.state.checkPassword}
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
                      const second = this.state.secondBlur;
                      this.setState({
                        secondBlur: !second,
                      });
                    }}>
                    {this.state.secondBlur ? (
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
                {this.state.checkBoolean !== '' &&
                  this.state.checkBoolean == false && (
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
                {this.state.checkBoolean == true && (
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
              chkPW(this.state.password) &&
              this.state.password == this.state.checkPassword
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={async () => {
              // api 확인용

              if (
                chkPW(this.state.password) &&
                this.state.password == this.state.checkPassword
              ) {
                console.log('비밀번호 api 접근');
                await this.pwReSettingApi(this.state.password);
              } else if (this.state.password !== this.state.checkPassword) {
                console.log('비밀번호 api 노접근');
                this.setState({
                  checkBoolean: false,
                });
              }
              if ((await this.state.ret_val) === 0) {
                console.log('비밀번호 api 성공');
                this.setModalVisible(true);
                this.props.navigation.navigate('SettingsPersonal');
              }

              //본부장님 테스트용
              // if (
              //   chkPW(this.state.password) &&
              //   this.state.password == this.state.checkPassword
              // ) {
              //   this.setModalVisible(true);
              //   this.props.navigation.navigate('SettingsPersonal');
              // } else if (this.state.password !== this.state.checkPassword) {
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
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('settingsPersonalResetPassword11')}
            confirm={t('settingsPersonalResetPassword12')}
            handleNextPage={this.handleNextPage}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(SettingsPersonalResetPassword),
  SettingsPersonalResetPassword,
);
