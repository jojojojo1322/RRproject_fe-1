import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../factory/Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
    emailCheck: '',
    password: '',
    checkPassword: '',
    checkBoolean: '',
    inviteCode: '',
    passwordBlur: true,
    checkPasswordBlur: true,
    checkEmail: '',
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
  emailCheckApi = async (email) => {
    console.log('email', email);
    await axios
      .post(`${server}/user/duplicate/mailid`, {
        mailId: email,
      })
      .then((data) => {
        console.log('then', data);
        console.log('then', data.data.ret_val);
        this.setState({checkEmail: data.data.ret_val});
      })
      .catch((error) => {
        console.log('error>>>>>>>>>>>>>>>>', error);
      });
  };
  emailAuthApi = async (email) => {
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
  render() {
    CheckedArrObject = new SelectedCheckboxes();

    return (
      <SafeAreaView style={ResetStyle.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={[ResetStyle.containerInner]}>
            {/* topBackButton */}
            <View>
              <View style={[ResetStyle.topBackButton, {paddingBottom: '2%'}]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                  />
                </TouchableOpacity>
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  회원정보 입력
                </Text>
              </View>
            </View>
            {/* 이메일 */}
            <View>
              {/* <View> */}
              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {textAlign: 'left'},
                  ]}>
                  이메일
                </Text>
              </View>

              <TouchableOpacity>
                <View style={AuthStyle.signupInputImageAll}>
                  <TextInput
                    placeholder="이메일 주소 입력"
                    placeholderTextColor="#a9a9a9"
                    onBlur={() => {
                      console.log('>>>>>>>>>>>>>>>>>>>>aaa>>>>>>>>');
                      this.emailCheckApi(this.state.email);
                    }}
                    // keyboardType={'numeric'}
                    onChangeText={this.handleEmail}
                    value={this.state.email}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontG,
                      {
                        textAlign: 'left',
                        paddingTop: '6%',
                        paddingBottom: '3%',
                      },
                    ]}></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        email: '',
                      });
                    }}>
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/drawable-xhdpi/icon_x_gray.png')}
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
                {this.state.checkEmail !== 0 && this.state.checkEmail != '' && (
                  // this.state.checkEmail !== '' &&

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
                      이미 사용 중인 이메일입니다.
                    </Text>
                  </>
                )}
                {this.state.checkEmail === 0 && (
                  <>
                    <Image
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/drawable-xhdpi/icon_m_check.png')}
                    />
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontB,
                        {marginLeft: 5},
                      ]}>
                      등록 가능한 이메일 입니다.
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* 비밀번호 */}
            <View>
              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {textAlign: 'left'},
                  ]}>
                  비밀번호
                </Text>
              </View>

              <TouchableOpacity>
                <View style={AuthStyle.signupInputImageAll}>
                  <TextInput
                    placeholder="아래 조합으로 입력"
                    placeholderTextColor="#a9a9a9"
                    secureTextEntry={this.state.passwordBlur}
                    // keyboardType={'numeric'}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontG,
                      {
                        textAlign: 'left',
                        paddingTop: '6%',
                        paddingBottom: '3%',
                      },
                    ]}></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        passwordBlur: !this.state.passwordBlur,
                      });
                    }}>
                    {this.state.passwordBlur ? (
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
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '3%',
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
                <View style={[AuthStyle.signupCheckView]}>
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
                <View style={[AuthStyle.signupCheckView]}>
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
                <View style={[AuthStyle.signupCheckView]}>
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
                <View style={[AuthStyle.signupCheckView]}>
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

            {/* 비밀번호 확인 */}
            <View>
              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {textAlign: 'left'},
                  ]}>
                  비밀번호 확인
                </Text>
              </View>

              <TouchableOpacity>
                <View style={AuthStyle.signupInputImageAll}>
                  <TextInput
                    placeholder="비밀번호 다시 입력"
                    placeholderTextColor="#a9a9a9"
                    secureTextEntry={this.state.checkPasswordBlur}
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
                      {
                        textAlign: 'left',
                        paddingTop: '6%',
                        paddingBottom: '3%',
                      },
                    ]}></TextInput>
                  {/* <Image
                    style={ResetStyle.smallImg}
                    source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                  /> */}
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        checkPasswordBlur: !this.state.checkPasswordBlur,
                      });
                    }}>
                    {this.state.checkPasswordBlur ? (
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

              {/* alert */}
              <View style={[AuthStyle.signupCheckView]}>
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
                {this.state.checkBoolean == true && (
                  <>
                    <Image
                      style={ResetStyle.smallImg}
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
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
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
                    value={this.state.inviteCode}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontG,
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
                      style={ResetStyle.smallImg}
                      source={require('../../imgs/drawable-xhdpi/icon_x_gray.png')}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              // style={[ResetStyle.button, {backgroundColor: '#e6e6e6'}]}
              style={[
                ResetStyle.button,
                this.state.checkBoolean != true &&
                  this.state.checkEmail !== 0 && {backgroundColor: '#e6e6e6'},
              ]}
              onPress={() => {
                console.log('nextBoolean', this.state.checkBoolean);
                console.log('nextsadasdasd', this.state.checkEmail);
                console.log(Platform.OS);
                if (
                  this.state.checkBoolean == true &&
                  this.state.checkEmail === 0
                ) {
                  this.emailAuthApi(this.state.email);
                  console.log('aaaa');
                  this.props.navigation.navigate('EmailAuthentication', {
                    email: this.state.email,
                    password: this.state.password,
                    deviceKey: this.props.route.params?.deviceKey,
                    phoneNum: this.props.route.params?.phoneNum,
                    inviteCode: this.state.inviteCode,
                  });
                  this.props.navigation.setOptions({title: '약관동의'});
                }
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                다음
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default SignUpPersonal;
