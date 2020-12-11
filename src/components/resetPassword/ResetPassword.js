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

export default class ResetPassword extends Component {
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
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity>
              <View style={[ResetStyle.textInputStyle]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    ResetStyle.textInputTitle,
                  ]}>
                  비밀번호
                </Text>
                <TextInput
                  placeholder="아래 조합으로 입력"
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
                      source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    {!chkPWRow(this.state.password) ? (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                      />
                    )}
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        {marginLeft: 5},
                      ]}>
                      영문
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    {!chkPWNumber(this.state.password) ? (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                      />
                    )}
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        {marginLeft: 5},
                      ]}>
                      숫자
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    {!chkPWHigh(this.state.password) ? (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                      />
                    )}
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        {marginLeft: 5},
                      ]}>
                      대문자
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    {!chkPWCharacter(this.state.password) ? (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                      />
                    )}
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        {marginLeft: 5},
                      ]}>
                      특수문자
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    {this.state.password.length < 8 ? (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.xsmallImg}
                        source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                      />
                    )}
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        {marginLeft: 5},
                      ]}>
                      8자리 이상
                    </Text>
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
                  비밀번호 확인
                </Text>
                <TextInput
                  secureTextEntry={this.state.secondBlur}
                  placeholder="비밀번호 다시 입력"
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
                    source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
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
                      source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                    />
                  ) : (
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
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
                      source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
                    />

                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontR,
                        {marginLeft: 5},
                      ]}>
                      비밀번호가 일치하지 않습니다.
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
              true
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={async () => {
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
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              확인
            </Text>
          </TouchableOpacity>
          <TextConfirmModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={`비밀번호가 변경되었습니다`}
            confirm={`확인`}
            handleNextPage={this.handleNextPage}
          />
        </View>
      </SafeAreaView>
    );
  }
}
