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
import axios from 'axios';
import {server} from '../defined/server';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '../../style/ResetStyle.js';

export default class Reset extends Component {
  state = {
    email: '',
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleEmail = (e) => {
    this.setState({
      email: e,
    });
    // console.log(this.validate(this.state.email));
  };
  emailAuth = (email) => {
    console.log(server);
    axios
      .post(`${server}/email/auth`, {
        mailId: email,
      })
      .then(({data}) => {
        console.log(data);
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  // emailAuth = (email) => {
  //   fetch('http://3.34.5.60:8091/v1/api/email/auth', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //     }),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  render() {
    console.log(DeviceInfo.getUniqueId());
    // console.log(DeviceInfo.getDeviceToken());
    // console.log(DeviceInfo.getDeviceName());
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.Top}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
              비밀번호를 잊으셨나요?
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 20},
              ]}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text>
          </View>
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {textAlign: 'left'},
              ]}>
              이메일
            </Text>
            <View style={styles.third}>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {textAlign: 'left'},
                ]}
                placeholder="이메일 주소 입력"
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    email: '',
                  });
                }}>
                <Image
                  style={styles.thirdImag}
                  source={require('../../imgs/iconXGray.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
          <TouchableHighlight
            // style={[styles.button, {backgroundColor: '#4696ff'}]}
            style={
              this.validateEmail(this.state.email)
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={() => {
              if (this.validateEmail(this.state.email)) {
                this.emailAuth(this.state.email);
                this.props.navigation.push('ResetEmail', {
                  email: this.state.email,
                });
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
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#FFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    // alignItems: 'center',
  },
  Top: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 50,
  },
  TopText: {
    // color: '#4696ff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
  },
  TopText2: {
    // color: '#4696ff',
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '100',
    lineHeight: 25,
  },
  //   sec: {
  //     alignItems: 'center',
  //     marginBottom: 30,
  //   },
  secText: {
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 18,
    // marginBottom: 15,
  },
  third: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  thirdText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 25,
    // color: '#4696ff',
  },
  thirdImag: {
    // marginLeft: 225,
    // textAlign: 'center',
    // fontSize: 20,
    // fontWeight: '400',
    // lineHeight: 25,
    // color: '#4696ff',
  },
  fourth: {
    backgroundColor: '#f3f3f3',
    height: 64,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 7,
  },
  fourthText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#787878',
  },
  fifth: {
    alignItems: 'center',
    marginBottom: 100,
  },
  fifthText: {fontSize: 12, lineHeight: 17, color: '#a9a9a9'},
  gray: {},
  grayText: {},
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
