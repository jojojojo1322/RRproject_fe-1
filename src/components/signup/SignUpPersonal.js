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
import {Keyboard} from 'react-native';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

//이메일 유효성 체크
function CheckEmail(str) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (!reg_email.test(str)) {
    return false;
  } else {
    return true;
  }
}

//비밀번호 유효성 체크
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
    passwordBlur: true,
    checkPasswordBlur: true,
    checkEmail: '',
    checkEmailValidation: true,
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
    const {t} = this.props;

    return (
      <SafeAreaView style={ResetStyle.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[ResetStyle.containerInner]}>
            {/* topBackButton */}
            <View>
              <View style={[ResetStyle.topBackButton, {paddingBottom: '2%'}]}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                  />
                  <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                    {t('signUpPersonalTitle')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* 이메일 */}
            <View>
              {/* <View> */}
              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {textAlign: 'left'},
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
                      console.log(this.state.email.trim());
                      console.log('>>>>>>>>>>>>>>>>>>>>aaa>>>>>>>>');
                      this.setState({
                        checkEmailValidation: true,
                      });
                      if (CheckEmail(this.state.email.trim())) {
                        this.emailCheckApi(this.state.email.trim());
                      } else {
                        await this.setState({
                          checkEmailValidation: false,
                        });
                        console.log('유효성 에러');
                        console.log(this.state.checkEmailValidation);
                        console.log('유효성 에러');
                      }
                    }}
                    // keyboardType={'numeric'}
                    onChangeText={this.handleEmail}
                    value={this.state.email}
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
                      this.setState({
                        email: '',
                      });
                    }}>
                    <Image
                      style={ResetStyle.mediumImg}
                      source={require('../../imgs/drawable-xxxhdpi/icon_x.png')}
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
                {this.state.checkEmail !== 0 &&
                  this.state.checkEmail != '' &&
                  this.state.checkEmailValidation === true && (
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
                        {t('signUpPersonal13')}
                      </Text>
                    </>
                  )}
                {this.state.checkEmailValidation === false && (
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
                      {t('signUpPersonal14')}
                    </Text>
                  </>
                )}
                {this.state.checkEmail === 0 &&
                  this.state.checkEmailValidation === true && (
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
                    {textAlign: 'left'},
                  ]}>
                  {t('signUpPersonal3')}
                </Text>
              </View>

              <TouchableOpacity>
                <View style={AuthStyle.signupInputImageAll}>
                  <TextInput
                    placeholder={t('signUpPersonal4')}
                    placeholderTextColor="#a9a9a9"
                    secureTextEntry={this.state.passwordBlur}
                    // keyboardType={'numeric'}
                    onChangeText={this.handlePassword}
                    value={this.state.password}
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
                    onSubmitEditing={() => Keyboard.dismiss()}
                    textContentType={'oneTimeCode'}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        passwordBlur: !this.state.passwordBlur,
                      });
                    }}>
                    {this.state.passwordBlur ? (
                      <Image
                        style={ResetStyle.mediumImg}
                        source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.mediumImg}
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
                    {t('signUpPersonal5')}
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
                    {t('signUpPersonal6')}
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
                    {t('signUpPersonal7')}
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
                    {t('signUpPersonal8')}
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
                    {t('signUpPersonal9')}
                  </Text>
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
                    {textAlign: 'left'},
                  ]}>
                  {t('signUpPersonal10')}
                </Text>
              </View>

              <TouchableOpacity>
                <View style={AuthStyle.signupInputImageAll}>
                  <TextInput
                    placeholder={t('signUpPersonal12')}
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
                      ResetStyle.fontBlack,
                      {
                        textAlign: 'left',
                        paddingTop: '6%',
                        paddingBottom: '3%',
                        width: '90%',
                      },
                    ]}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    textContentType={'oneTimeCode'}
                  />
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
                        style={ResetStyle.mediumImg}
                        source={require('../../imgs/drawable-xhdpi/ico_blind_d.png')}
                      />
                    ) : (
                      <Image
                        style={ResetStyle.mediumImg}
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
                        {t('signUpPersonal16')}
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
                    value={this.state.inviteCode}
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
                      source={require('../../imgs/drawable-xxxhdpi/icon_x.png')}
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
                (this.state.checkBoolean !== true ||
                  this.state.checkEmail !== 0) && {backgroundColor: '#e6e6e6'},
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
                    email: this.state.email.trim(),
                    password: this.state.password,
                    deviceKey: this.props.route.params?.deviceKey,
                    phoneNum: this.props.route.params?.phoneNum,
                    inviteCode: this.state.inviteCode,
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
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(SignUpPersonal), SignUpPersonal);
