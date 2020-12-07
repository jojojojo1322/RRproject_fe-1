import React, {Component} from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import axios from 'axios';
import {server} from '../defined/server';

import TextConfirmModal from '../factory/modal/TextConfirmModal';

function chkPW(password) {
  var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var regHigh = /^(?=.*?[A-Z])/;
  var regRow = /^(?=.*?[a-z])/;
  var regNumber = /^(?=.*?[0-9])/;
  var regCharacters = /^(?=.*?[~!@#$%^&*()_+|<>?:{}])/;
  var pw = password;

  // if (false === regHigh.test(pw)) {
  //   console.log('대문자');
  // } else if (false === regRow.test(pw)) {
  //   console.log('소문자');
  // } else if (false === regNumber.test(pw)) {
  //   console.log('숫자');
  // } else if (false === regCharacters.test(pw)) {
  //   console.log('특수문자');
  // } else {
  //   console.log('통과');
  // }
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
                  secureTextEntry={true}
                  onChangeText={this.handlePassword}
                  value={this.state.password}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    ResetStyle.textInputText,
                  ]}></TextInput>
                {/* <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                  /> */}
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
                <TouchableOpacity
                  style={[ResetStyle.textInputTextButton, {top: '45%'}]}>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                  />
                </TouchableOpacity>
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
                  // secureTextEntry={true}
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
                <TouchableOpacity style={[ResetStyle.textInputTextButton]}>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
              await this.pwReSettingApi(this.state.password);
              if ((await this.state.ret_val) === 0) {
                this.setModalVisible(true);
                this.props.navigation.navigate('Login');
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              다음
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

const styles = StyleSheet.create({
  firstPass: {marginTop: 40},
  secondPass: {marginBottom: 300},
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#0b95c9',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  InputImageAll: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    // alignContent: 'stretch',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  InputImage: {
    // position: 'absolute',
    // alignItems: 'center',2
  },
  textInputStyle: {
    // position: 'relative',
    // width: '100%',
    fontSize: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#c6c9cf',
    padding: 15,
    marginTop: 100,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
