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
import ResetStyle from '../../style/ResetStyle.js';

export default class ResetEmail extends Component {
  state = {
    email: this.props.route.params?.email,
    emailCode: '',
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
  render() {
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
            <TouchableHighlight
              style={[ResetStyle.textInputTextButton, {top: '45%'}]}>
              <Image
                style={ResetStyle.smallImg}
                source={require('../../imgs/drawable-hdpi/icon_time.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight style={ResetStyle.textInputRe}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {textAlign: 'left', marginTop: 10},
                ]}>
                재전송
              </Text>
            </TouchableHighlight>
          </View>

          <TouchableHighlight
            // style={[styles.button, {backgroundColor: '#4696ff'}]}
            style={
              this.state.emailCode.length == 6
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={() => {
              if (this.state.emailCode.length == 6) {
                this.props.navigation.navigate('ResetPassword');
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
