import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import axios from 'axios';
import {server} from '../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '../factory/modal/BottomModal';
import CountDown from '../../components/factory/CountDown';

export default class ResetEmail extends Component {
  state = {
    email: this.props.route.params?.email,
    emailCode: '',
    authKey: this.props.route.params?.authKey,
    modalVisible: false,
    modal2Visible: false,
    isRunning: true,
    timeLeftNumber: 180,
    CountDownCheck: '',
    CountDownExpireCheck: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  setModal2Visible = (visible) => {
    this.setState({
      modal2Visible: visible,
    });
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleEmail = (e) => {
    this.setState({
      emailCode: e,
    });
    // console.log(this.validate(this.state.email));
  };
  emailReAuthApi = (email) => {
    axios
      .post(`${server}/util/email/pw-auth`, {
        email,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);
        this.setState({
          authKey: response.data.authKey,
        });
        const authKey = response.data.authKey;
        await AsyncStorage.setItem('authKey', authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };

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

  render() {
    console.log(this.props.route.params?.userNo);
    console.log(this.props.route.params?.authKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              {marginTop: '20%'},
            ]}>{`${
            this.state.email
          }으로 ${'\n'}6자리 인증 코드를 발송했습니다.`}</Text>
          {/* <Text style={styles.TopText2}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text> */}
          <View style={[ResetStyle.textInputStyle, {marginBottom: '50%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              인증번호
            </Text>
            <TextInput
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
              ]}
              placeholder="6자리 인증번호 입력"
              placeholderTextColor="#a9a9a9"
              value={this.state.emailCode}
              onChangeText={this.handleEmail}
              keyboardType="number-pad"
            />
            <View
              style={[
                ResetStyle.textInputTextButton,
                {flexDirection: 'row', top: '45%'},
              ]}>
              <Image
                style={[ResetStyle.smallImg, {marginRight: 8}]}
                source={require('../../imgs/drawable-hdpi/icon_time.png')}
              />
              <CountDown
                standard={this.state.isRunning}
                timeLeftNumber={this.state.timeLeftNumber}
                handleReCountDown={this.handleReCountDown}
                handleCountDownCheck={this.handleCountDownCheck}
                CountDownCheck={this.state.CountDownCheck}
                CountDownExpireCheck={this.state.CountDownExpireCheck}
                handleCountDownExpireCheck={this.handleCountDownExpireCheck}
              />
            </View>
            <TouchableOpacity
              style={ResetStyle.textInputRe}
              onPress={() => {
                this.handleReCountDown();
                this.emailReAuthApi(this.state.email);
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {textAlign: 'left', marginTop: 10},
                ]}>
                재전송
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={
              this.state.emailCode.length == 6
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={async () => {
              if (this.state.emailCode.length == 6) {
                if (
                  this.state.emailCode ==
                    (await AsyncStorage.getItem('authKey')) &&
                  this.state.CountDownExpireCheck == false
                ) {
                  this.props.navigation.navigate('ResetPassword', {
                    email: this.props.route.params?.email,
                    userNo: this.props.route.params?.userNo,
                  });
                } else if (this.state.CountDownExpireCheck == true) {
                } else {
                  console.log('ssssssssssssss');
                  this.setModalVisible(true);
                }
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              다음
            </Text>
          </TouchableOpacity>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={`인증번호가 틀렸습니다`}
          />
          <BottomModal
            setModalVisible={this.setModal2Visible}
            modalVisible={this.state.modal2Visible}
            text={`만료된 인증번호입니다`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
