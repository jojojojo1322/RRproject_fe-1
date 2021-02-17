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
import {RoundCheckbox, SelectedCheckboxes} from '../factory/Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import axios from 'axios';
import {server} from '../defined/server';

import TextConfirmModal from '../factory/modal/TextConfirmModal';
import AuthStyle from '../../style/AuthStyle';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

function chkPW(password) {
  var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*()_+|<>?:{}]).{8,}$/;
  var regHigh = /^(?=.*?[A-Z])/;
  var regRow = /^(?=.*?[a-z])/;
  var regNumber = /^(?=.*?[0-9])/;
  var regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
  var pw = password;

  return reg.test(pw);
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

class ResetPassword extends Component {
  state = {
    password: '',
    checkPassword: '',
    checkBoolean: '',
    firstBlur: true,
    secondBlur: true,
    ret_val: '',
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
          <View>
            <View style={ResetStyle.topBackButton}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 22,
                    height: Platform.OS === 'ios' ? 28 : 22,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/backIcon.png')}
                />
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  {t('resetPasswordTitle')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View style={[ResetStyle.textInputStyle]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    ResetStyle.textInputTitle,
                  ]}>
                  {t('resetPassword1')}
                </Text>
                <TextInput
                  placeholder={t('resetPassword2')}
                  placeholderTextColor="#a9a9a9"
                  // keyboardType={'numeric'}
                  secureTextEntry={this.state.firstBlur}
                  onChangeText={this.handlePassword}
                  value={this.state.password}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    ResetStyle.textInputText,
                  ]}></TextInput>
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
                      source={require('../../imgs/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/icoViewD.png')}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={[
                    AuthStyle.resetPasswordView1,
                    // {flexDirection: 'row'},
                  ]}>
                  {/* /</View> */}
                  <View style={{flexDirection: 'row'}}>
                    {/* /?</View> */}
                    <View style={[AuthStyle.resetPasswordView2]}>
                      {!chkPWRow(this.state.password) ? (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconUncheckedS.png')}
                        />
                      ) : (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconCheckedS.png')}
                        />
                      )}
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontG,
                          {marginLeft: 5, marginLeft: '4%'},
                        ]}>
                        {t('resetPassword3')}
                      </Text>
                    </View>
                    <View style={[AuthStyle.resetPasswordView2]}>
                      {!chkPWNumber(this.state.password) ? (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconUncheckedS.png')}
                        />
                      ) : (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconCheckedS.png')}
                        />
                      )}
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontG,
                          {marginLeft: 5, marginLeft: '4%'},
                        ]}>
                        {t('resetPassword4')}
                      </Text>
                    </View>

                    <View style={[AuthStyle.resetPasswordView2]}>
                      {!chkPWHigh(this.state.password) ? (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconUncheckedS.png')}
                        />
                      ) : (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconCheckedS.png')}
                        />
                      )}
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontG,
                          {marginLeft: 5, marginLeft: '4%'},
                        ]}>
                        {t('resetPassword5')}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[AuthStyle.resetPasswordView2]}>
                      {!chkPWCharacter(this.state.password) ? (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconUncheckedS.png')}
                        />
                      ) : (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconCheckedS.png')}
                        />
                      )}
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontG,
                          {marginLeft: 5, marginLeft: '4%'},
                        ]}>
                        {t('resetPassword6')}
                      </Text>
                    </View>
                    <View style={[AuthStyle.resetPasswordView2]}>
                      {this.state.password.length < 8 ? (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconUncheckedS.png')}
                        />
                      ) : (
                        <Image
                          style={ResetStyle.xsmallImg}
                          source={require('../../imgs/iconCheckedS.png')}
                        />
                      )}
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontG,
                          {marginLeft: 5, marginLeft: '4%'},
                        ]}>
                        {t('resetPassword7')}
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
                  {t('resetPassword8')}
                </Text>
                <TextInput
                  secureTextEntry={this.state.secondBlur}
                  placeholder={t('resetPassword9')}
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
                    source={require('../../imgs/icoViewD.png')}
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
                      source={require('../../imgs/icoBlindD.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/icoViewD.png')}
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
                      source={require('../../imgs/iconXRed.png')}
                    />

                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontR,
                        {marginLeft: 5},
                      ]}>
                      {t('resetPassword10')}
                    </Text>
                  </>
                )}
            </View>
          </View>
          {/* 비밀번호 */}

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
                await this.pwReSettingApi(this.state.password);
              } else if (this.state.password !== this.state.checkPassword) {
                this.setState({
                  checkBoolean: false,
                });
              }
              if ((await this.state.ret_val) === 0) {
                this.setModalVisible(true);
                this.props.navigation.navigate('Login');
              }

              //본부장님 테스트용
              // if (
              //   chkPW(this.state.password) &&
              //   this.state.password == this.state.checkPassword
              // ) {
              //   this.setModalVisible(true);
              //   this.props.navigation.navigate('Login');
              // } else if (this.state.password !== this.state.checkPassword) {
              //   this.setState({
              //     checkBoolean: false,
              //   });
              // }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('resetPasswordNextButton')}
            </Text>
          </TouchableOpacity>
          <TextConfirmModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('resetPassword11')}
            confirm={t('resetPassword12')}
            handleNextPage={this.handleNextPage}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(ResetPassword), ResetPassword);
