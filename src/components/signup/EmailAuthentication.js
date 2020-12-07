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
import CountDown from '../../components/factory/CountDown';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';

import axios from 'axios';
import {server} from '../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EmailAuthentication extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    email: this.props.route.params?.email,
    returnValue: '',
    isRunning: false,
    timeLeftNumber: 180,
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
  loginApi = async (id, pass) => {
    await axios
      .post(`${server}/user/login`, {
        email: id,
        password: pass,
      })
      .then(async (response) => {
        console.log('then', response.data.status);
        console.log('then', response.data.userNo);
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
        console.log('erro', error);
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
        console.log('then', data);
        console.log('then', data.data.ret_val);
        this.setState({
          returnValue: data.data.ret_val,
        });
      })
      .catch((error) => {
        console.log('error', error);
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
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {marginTop: '30%'},
              ]}>
              {this.state.email} 으로{'\n'}6자리 인증 코드를 발송했습니다
            </Text>
          </View>

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
              <View style={[styles.textInputStyle2]}>
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
                    startTimer={this.startTimer}
                    resetTimer={this.resetTimer}
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
                <TouchableWithoutFeedback>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontB,
                      {marginLeft: 5},
                    ]}>
                    재전송
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback
            style={[
              ResetStyle.button,
              this.state.passWord.length < 6 && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              const os = Platform.OS;
              this.userRegistApi(this.state.passWord, 'I');
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
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle2: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingTop: '4%',
    paddingBottom: '2%',
  },
});

export default EmailAuthentication;
