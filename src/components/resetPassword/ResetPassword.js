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
  TouchableHighlight,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';

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

  render() {
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View style={{marginTop: '10%'}}>
            <TouchableHighlight>
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
                <TouchableHighlight
                  style={[ResetStyle.textInputTextButton, {top: '45%'}]}>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>

            {/* 비밀번호 확인 */}
            <TouchableHighlight>
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
                <TouchableHighlight style={[ResetStyle.textInputTextButton]}>
                  <Image
                    style={ResetStyle.smallImg}
                    source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
          </View>
          {/* 비밀번호 */}

          {/* 확인버튼 */}
          <TouchableHighlight
            // style={[styles.button, {backgroundColor: '#4696ff'}]}
            style={
              true
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={() => {
              if (true) {
                this.props.navigation.navigate('ResetPassword');
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              다음
            </Text>
          </TouchableHighlight>
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
