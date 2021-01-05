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
import {RoundCheckbox, SelectedCheckboxes} from '../factory/Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

import axios from 'axios';
import {server} from '../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import BottomModal from '../factory/modal/BottomModal';
import TextConfirmModal from '../factory/modal/TextConfirmModal';

class EmailAuthentication extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    email: this.props.route.params?.email,
    authKey: '',
    returnValue: '',
    returnApprove: '',
    isRunning: true,
    timeLeftNumber: 180,
    CountDownCheck: '',
    CountDownExpireCheck: false,
    modalVisible: false,
    modal2Visible: false,
    modal3Visible: false,
    modal4Visible: false,
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
  };
  setModal3Visible = (visible) => {
    this.setState({modal3Visible: visible});
  };
  setModal4Visible = (visible) => {
    this.setState({modal4Visible: visible});
  };
  handleNextPage = () => {
    console.log('success');
  };
  // setModal5Visible = (visible) => {
  //   this.setState({modal5Visible: visible});
  // };

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
        authKey: authKey.replace(/(\s*)/g, ''),
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
        email: email.replace(/(\s*)/g, ''),
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
    console.log('loginApi ID >>>>', id);
    console.log('loginApi pass >>>>', pass);
    await axios
      .post(`${server}/user/login`, {
        deviceKey: this.props.route.params?.deviceKey,
        email: id.replace(/(\s*)/g, ''),
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
  userEmailApprove = async () => {
    await axios
      .post(`${server}/util/email/auth/approve`, {
        authKey: this.state.passWord,
        mailId: this.props.route.params?.email,
      })
      .then((data) => {
        console.log('THENuserEmailApprove', data);
        console.log('THENuserEmailApprove', data.data.ret_val);
        this.setState({
          returnApprove: data.data.ret_val,
        });
      })
      .catch((error) => {
        console.log('ERRORuserEmailApprove', error);
      });
  };
  userRegistApi = async (osType) => {
    console.log(
      '-----------',
      this.props.route.params?.deviceKey,
      '-----------',
      this.props.route.params?.inviteCode,
      '-----------',
      this.props.route.params?.email,
      '-----------',
      osType,
      '-----------',
      this.props.route.params?.phoneNum,
      '-----------',
      this.props.route.params?.password,
    );
    await axios
      .post(`${server}/user/register`, {
        deviceKey: this.props.route.params?.deviceKey,
        inviteCode: this.props.route.params?.inviteCode,
        mailId: this.props.route.params?.email,
        osType: osType,
        phoneNum: this.props.route.params?.phoneNum,
        userPw: this.props.route.params?.password,
      })
      .then((data) => {
        console.log('thenuserRegistApi', data);
        console.log('thenuserRegistApi', data.data.ret_val);
        this.setState({
          returnValue: data.data.ret_val,
        });
      })
      .catch((error) => {
        console.log('ERRORuserRegistApi', error);
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
      if (
        this.state.CountDownExpireCheck == true &&
        this.state.returnApprove != '0'
      ) {
        if (this.state.authKey == '') {
          this.emailExpireApi(await AsyncStorage.getItem('authKey'));
        } else {
          this.emailExpireApi(this.state.authKey);
        }
      }
    }
  };
  render() {
    // console.log(
    //   this.props.route.params?.deviceKey,
    //   '---------',

    //   this.props.route.params?.inviteCode,
    //   '---------',

    //   this.props.route.params?.email,
    //   '---------',

    //   this.props.route.params?.phoneNum,
    //   '---------',
    //   this.props.route.params?.password,
    // );
    CheckedArrObject = new SelectedCheckboxes();
    console.log('DEVICE>>>>>', this.props.route.params?.deviceKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            {/* topBackButton */}
            <View>
              <View style={ResetStyle.topBackButton}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                  />
                  <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                    이메일 인증
                  </Text>
                </TouchableOpacity>
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
                <View
                  style={[
                    AuthStyle.emailAuthTextInputStyle,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '2%',
                      paddingTop: '3%',
                    },
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
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
                    {this.state.returnApprove == '0' && (
                      <Image
                        style={{marginLeft: '4%', marginBottom: '2%'}}
                        source={require('../../imgs/drawable-xxxhdpi/verification_code_check_icon.png')}
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={[ResetStyle.buttonSmall, {width: '26%'}]}
                    onPress={async () => {
                      await this.userEmailApprove();
                      console.log(
                        '인증하기버튼 클릭후 >>>>',
                        this.state.returnApprove,
                      );
                      if (this.state.returnApprove == '0') {
                        this.setModalVisible(true);
                      } else if (this.state.returnApprove != '0') {
                        this.setModal2Visible(true);
                      }
                    }}>
                    <Text style={[ResetStyle.fontLightK, ResetStyle.fontWhite]}>
                      인증하기
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* alert */}
                {/* {this.state.returnValue === -3 && (
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
                  )} */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '3%',
                  }}>
                  {/* <View style={[AuthStyle.emailAuthCountdownBox]}> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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
              this.state.returnApprove != '0' && {backgroundColor: '#e6e6e6'},
              // this.state.passWord.length < 6 && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={async () => {
              //api 잠시 끄기
              const os = Platform.OS;
              await this.userRegistApi('I');
              if (this.state.returnValue === 0) {
                this.loginApi(
                  this.props.route.params?.email,
                  this.props.route.params?.password,
                );
                this.props.navigation.navigate('CompleteAuth');
              }
              //본부장님 테스트용
              // if (this.state.returnApprove == 0) {
              //   this.props.navigation.navigate('CompleteAuth');
              // }
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
          <TextConfirmModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            handleNextPage={this.handleNextPage}
            text={`인증되었습니다.`}
            confirm={`확인`}
          />
          <BottomModal
            setModalVisible={this.setModal2Visible}
            modalVisible={this.state.modal2Visible}
            text={`잘못된 인증번호입니다.`}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default EmailAuthentication;
