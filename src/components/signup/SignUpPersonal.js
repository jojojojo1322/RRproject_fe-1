import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
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

class SignUpPersonal extends Component {
  state = {
    modalVisible: false,
    phoneNum: '',
    email: '',
    password: '',
    checkPassword: '',
    checkBoolean: '',
    inviteCode: '',
  };
  handleEmail = (e) => {
    this.setState({
      email: e,
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
  handleInviteCode = (e) => {
    this.setState({
      inviteCode: e,
    });
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  // only number
  handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      this.setState({
        phoneNum,
      });
    }
  };

  render() {
    CheckedArrObject = new SelectedCheckboxes();

    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          {/* 이메일 */}
          <View style={{marginTop: 80}}>
            <View>
              <Text style={styles.subText}>이메일</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  placeholder="이메일 주소 입력"
                  onBlur={() => {
                    console.log('>>>>>>>>>>>>>>>>>>>>aaa>>>>>>>>');
                  }}
                  // keyboardType={'numeric'}
                  onChangeText={this.handleEmail}
                  value={this.state.email}
                  style={[styles.textInputStyle]}></TextInput>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({
                      email: '',
                    });
                  }}>
                  <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/icon_x_gray.png')}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>

            {/* alert */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
              />
              <Text style={{color: '#F00', fontSize: 14, marginLeft: 10}}>
                이미 사용 중인 이메일입니다.
              </Text>

              <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_m_check.png')}
              />
              <Text style={{color: '#0080ff', fontSize: 14, marginLeft: 10}}>
                등록 가능한 이메일 입니다.
              </Text>
            </View>
          </View>

          {/* 비밀번호 */}
          <View>
            <View>
              <Text style={styles.subText}>비밀번호</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  placeholder="아래 조합으로 입력"
                  // keyboardType={'numeric'}
                  onChangeText={this.handlePassword}
                  value={this.state.password}
                  style={[styles.textInputStyle]}></TextInput>
                {/* <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                  /> */}
                <Image
                  style={{width: 19, height: 19}}
                  source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                />
              </View>
            </TouchableHighlight>

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
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                  />
                ) : (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                  />
                )}
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
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
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                  />
                ) : (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                  />
                )}
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
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
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                  />
                ) : (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                  />
                )}
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
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
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                  />
                ) : (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                  />
                )}
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
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
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_off.png')}
                  />
                ) : (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('../../imgs/drawable-xhdpi/icon_s_check_on.png')}
                  />
                )}
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  8자리 이상
                </Text>
              </View>
            </View>
          </View>

          {/* 비밀번호 확인 */}
          <View>
            <View>
              <Text style={styles.subText}>비밀번호 확인</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  placeholder="비밀번호 다시 입력"
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
                  style={[styles.textInputStyle]}></TextInput>
                {/* <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                  /> */}
                <Image
                  style={{width: 19, height: 19}}
                  source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                />
              </View>
            </TouchableHighlight>

            {/* alert */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              {this.state.checkBoolean !== '' &&
                this.state.checkBoolean == false && (
                  <>
                    <Image
                      style={{width: 19, height: 19}}
                      source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
                    />

                    <Text style={{color: '#F00', fontSize: 14, marginLeft: 10}}>
                      비밀번호가 일치하지 않습니다.
                    </Text>
                  </>
                )}
              {this.state.checkBoolean == true && (
                <>
                  <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/icon_m_check.png')}
                  />
                  <Text
                    style={{color: '#0080ff', fontSize: 14, marginLeft: 10}}>
                    비밀번호가 일치합니다.
                  </Text>
                </>
              )}
            </View>
          </View>

          {/* 초대코드 */}
          <View>
            <View>
              <Text style={styles.subText}>초대코드 (선택사항)</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  placeholder="비밀번호 다시 입력"
                  // keyboardType={'numeric'}
                  onChangeText={this.handleInviteCode}
                  value={this.state.inviteCode}
                  style={[styles.textInputStyle]}></TextInput>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({
                      inviteCode: '',
                    });
                  }}>
                  <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/icon_x_gray.png')}
                  />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>

            {/* alert */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
              />
              <Text style={{color: '#F00', fontSize: 14, marginLeft: 10}}>
                초대코드가 올바르지 않습니다.
              </Text>
            </View>
          </View>

          <TouchableWithoutFeedback
            style={[
              ResetStyle.button,
              {backgroundColor: '#e6e6e6', marginTop: 80},
            ]}
            onPress={() => {
              this.props.navigation.navigate('EmailAuthentication', {
                email: this.state.email,
              });
              this.props.navigation.setOptions({title: '약관동의'});
            }}>
            <Text style={ResetStyle.buttonTexts}>다음</Text>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  InputImageAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default SignUpPersonal;
