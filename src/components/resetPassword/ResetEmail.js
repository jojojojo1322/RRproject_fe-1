import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import axios from 'axios';
import {server} from '@context/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '@factory/modal/BottomModal';
import CountDown from '@factory/CountDown';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class ResetEmail extends Component {
  state = {
    email: this.props.route.params?.email,
    emailCode: '',
    authKey: this.props.route.params?.authKey,
    modalVisible: false,
    modal2Visible: false,
    modal3Visible: false,
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
  setModal3Visible = (visible) => {
    this.setState({
      modal3Visible: visible,
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
    const {t} = this.props;
    console.log(this.props.route.params?.userNo);
    console.log(this.props.route.params?.authKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <View style={ResetStyle.topBackButton}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 22,
                    height: Platform.OS === 'ios' ? 28 : 22,
                    resizeMode: 'contain',
                  }}
                  source={require('@images/backIcon.png')}
                />
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  {t('resetEmailTitle')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: '20%'},
              ]}>
              {`${this.state.email}`}
              {t('resetEmail1')}
            </Text>
            {/* <Text style={styles.TopText2}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text> */}
            <View style={[ResetStyle.textInputStyle, {marginTop: '20%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('resetEmail2')}
              </Text>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  ResetStyle.textInputText,
                ]}
                placeholder={t('resetEmail3')}
                placeholderTextColor="#a9a9a9"
                value={this.state.emailCode}
                returnKeyType={'done'}
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
                  source={require('@images/iconTime.png')}
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
                  this.setModal3Visible(true);
                  this.handleReCountDown();
                  this.emailReAuthApi(this.state.email);
                }}>
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontB,
                    {textAlign: 'left', marginTop: 10},
                  ]}>
                  {t('resetEmail4')}
                </Text>
              </TouchableOpacity>
            </View>
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
              {t('resetEmailNextButton')}
            </Text>
          </TouchableOpacity>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('resetEmail5')}
          />
          <BottomModal
            setModalVisible={this.setModal2Visible}
            modalVisible={this.state.modal2Visible}
            text={t('resetEmail6')}
          />
          <BottomModal
            setModalVisible={this.setModal3Visible}
            modalVisible={this.state.modal3Visible}
            text={t('signUpModal2')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(ResetEmail), ResetEmail);
