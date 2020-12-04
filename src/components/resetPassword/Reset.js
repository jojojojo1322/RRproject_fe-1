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
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontDG,
                {marginTop: '10%'},
              ]}>
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
          <View style={[ResetStyle.textInputStyle, {marginBottom: '50%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              이메일
            </Text>
            <TextInput
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
              ]}
              placeholder="이메일 주소 입력"
              placeholderTextColor="#a9a9a9"
              value={this.state.email}
              onChangeText={this.handleEmail}
            />
            <TouchableHighlight
              style={ResetStyle.textInputTextButton}
              onPress={() => {
                this.setState({
                  email: '',
                });
              }}>
              <Image
                style={ResetStyle.smallImg}
                source={require('../../imgs/iconXGray.png')}
              />
            </TouchableHighlight>
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
