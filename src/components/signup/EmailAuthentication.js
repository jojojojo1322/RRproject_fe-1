import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import CountDown from '../../components/factory/CountDown';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

import axios from 'axios';
import {server} from '../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EmailAuthentication extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    email: this.props.route.params?.email,
    authKey: '',
    returnValue: '',
    isRunning: true,
    timeLeftNumber: 180,
    CountDownCheck: '',
    CountDownExpireCheck: false,
  };
  /* <CountDown
                standard={this.state.isRunning}
                timeLeftNumber={this.state.timeLeftNumber}
                CountDownCheck={this.state.CountDownCheck}
                CountDownExpireCheck={this.state.CountDownExpireCheck}
                handleCountDownExpireCheck={this.handleCountDownExpireCheck}
              /> */

  handleCountDown() {
    this.setState((state) => ({
      isRunning: !state.isRunning,
      CountDownExpireCheck: false,
    }));
  }

  handleReCountDown = async () => {
    await this.setState({
      isRunning: true,
      timeLeftNumber: 180,
      CountDownExpireCheck: false,
    });
    await this.setState({
      isRunning: false,
      timeLeftNumber: 180,
      CountDownExpireCheck: false,
    });
    // this.setState({
    //   isRunning: true,
    //   timeLeftNumber: 180,
    // });
  };
  handleCountDownCheck = (value) => {
    this.setState({
      CountDownCheck: value,
    });
  };
  handleCountDownExpireCheck = () => {
    console.log(
      'handleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheck',
    );
    this.setState({
      CountDownExpireCheck: true,
    });
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
      returnValue: '',
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
  emailExpireApi = async (authKey) => {
    console.log('expire', authKey);
    await axios
      .patch(`${server}/util/email/auth/expired`, {
        authKey: authKey,
      })
      .then((response) => {
        console.log('Expire', response);
      })
      .catch((e) => {
        console.log('Expire', e);
      });
  };
  emailAuthApi = async (email) => {
    console.log('email', email);
    await axios
      .post(`${server}/util/email/auth`, {
        email: email,
      })
      .then((data) => {
        console.log('then', data);
        console.log('then', data.data.ret_val);
        this.setState({
          authKey: data.data.authKey,
        });
        // this.setState({checkEmail: data.data.ret_val});
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  loginApi = async (id, pass) => {
    await axios
      .post(`${server}/user/login`, {
        email: id,
        password: pass,
      })
      .then(async (response) => {
        console.log('thenLogin', response.data.status);
        console.log('thenLogin', response.data.userNo);
        console.log(
          'then header>>>>' +
            response.headers.authorization.slice(7, undefined),
        );
        await AsyncStorage.setItem(
          'authToken',
          response.headers.authorization.slice(7, undefined),
        );
        await AsyncStorage.setItem('userNo', response.data.userNo);
        this.setState({
          loginCheck: response.data.status,
        });
        return response.data.status;
      })
      .catch((error) => {
        console.log('erroLOGIN', error);
      });
  };
  userRegistApi = async (maAuthKey, osType) => {
    await axios
      .post(`${server}/user/register`, {
        deviceKey: this.props.route.params?.deviceKey,
        inviteCode: this.props.route.params?.inviteCode,
        maAuthKey: maAuthKey,
        mailId: this.props.route.params?.email,
        osType: osType,
        phoneNum: this.props.route.params?.phoneNum,
        userPw: this.props.route.params?.password,
      })
      .then((data) => {
        console.log('thenRERE', data);
        console.log('thenRERE', data.data.ret_val);
        this.setState({
          returnValue: data.data.ret_val,
        });
      })
      .catch((error) => {
        console.log('errorRERE', error);
      });
  };

  startTimer = () => {
    intervalRef.current = setInterval(() => {
      this.setState((timeLeftNumber) => {
        if (timeLeftNumber >= 1) {
          return timeLeftNumber - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(180);
    // setIsRunning(false);
    this.setState((state) => ({
      isRunning: !state.isRunning,
    }));
  };
  componentDidUpdate = async (preProps, preState) => {
    if (preState.CountDownExpireCheck !== this.state.CountDownExpireCheck) {
      if (this.state.CountDownExpireCheck == true) {
        if (this.state.authKey == '') {
          this.emailExpireApi(await AsyncStorage.getItem('authKey'));
        } else {
          this.emailExpireApi(this.state.authKey);
        }
      }
    }
  };
  render() {
    console.log(
      this.props.route.params?.deviceKey,
      '---------',
      this.props.route.params?.inviteCode,
      '---------',

      this.props.route.params?.email,
      '---------',

      this.props.route.params?.phoneNum,
      '---------',
      this.props.route.params?.password,
    );
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            {/* topBackButton */}
            <View>
              <View style={ResetStyle.topBackButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                  />
                </TouchableOpacity>
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  약관동의
                </Text>
              </View>
            </View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {marginTop: '10%', marginBottom: '10%'},
              ]}>
              {this.state.email} 으로{'\n'}6자리 인증 코드를 발송했습니다
            </Text>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {textAlign: 'left'},
                ]}>
                인증 번호
              </Text>

              <View>
                <View style={[AuthStyle.emailAuthTextInputStyle2]}>
                  <TextInput
                    placeholder="인증번호 입력"
                    placeholderTextColor="#a9a9a9"
                    value={this.state.passWord}
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    // secureTextEntry={true}
                    onChangeText={(text) => this.handlePassword(text)}
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontG,
                      {textAlign: 'left'},
                    ]}></TextInput>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '60%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../imgs/drawable-xhdpi/icon_time.png')}
                      style={[ResetStyle.smallImg, {marginRight: 8}]}
                    />
                    {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}
                    <CountDown
                      standard={this.state.isRunning}
                      timeLeftNumber={this.state.timeLeftNumber}
                      handleReCountDown={this.handleReCountDown}
                      handleCountDownCheck={this.handleCountDownCheck}
                      CountDownCheck={this.state.CountDownCheck}
                      CountDownExpireCheck={this.state.CountDownExpireCheck}
                      handleCountDownExpireCheck={
                        this.handleCountDownExpireCheck
                      }
                    />
                  </View>
                </View>

                {/* alert */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '3%',
                    justifyContent: 'space-between',
                  }}>
                  {this.state.returnValue === -3 && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        인증번호가 올바르지 않습니다.
                      </Text>
                    </View>
                  )}
                  {this.state.returnValue === -1 && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        만료된 인증번호입니다.
                      </Text>
                    </View>
                  )}

                  {this.state.returnValue !== -3 && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={ResetStyle.smallImg}
                        // source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
                      />
                      <Text
                        style={[
                          ResetStyle.fontLightK,
                          ResetStyle.fontR,
                          {marginLeft: 5},
                        ]}></Text>
                    </View>
                  )}

                  {/* <View></View> */}
                  <TouchableOpacity
                    onPress={() => {
                      this.handleReCountDown();
                      this.emailAuthApi(this.state.email);
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontB,
                        {marginLeft: 5},
                      ]}>
                      재전송
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              ResetStyle.button,
              this.state.passWord.length < 6 && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={async () => {
              const os = Platform.OS;
              await this.userRegistApi(this.state.passWord, 'I');
              if (this.state.returnValue === 0) {
                this.loginApi(
                  this.props.route.params?.email,
                  this.props.route.params?.password,
                );
                this.props.navigation.navigate('CompleteAuth');
              }
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default EmailAuthentication;
