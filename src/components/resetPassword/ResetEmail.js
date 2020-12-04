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
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '../factory/modal/BottomModal';

export default class ResetEmail extends Component {
  state = {
    email: this.props.route.params?.email,
    emailCode: '',
    authKey: this.props.route.params?.authKey,
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.Top}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 20},
              ]}>{`${
              this.state.email
            }으로 ${'\n'}6자리 인증 코드를 발송했습니다.`}</Text>
            {/* <Text style={styles.TopText2}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text> */}
          </View>
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {textAlign: 'left'},
              ]}>
              인증번호
            </Text>
            <View style={styles.third}>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {textAlign: 'left', paddingTop: 20, paddingBottom: 10},
                ]}
                placeholder="6자리 인증번호 입력"
                value={this.state.emailCode}
                onChangeText={this.handleEmail}
                keyboardType="number-pad"
              />
              <TouchableHighlight>
                <Image
                  style={styles.thirdImag}
                  source={require('../../imgs/drawable-hdpi/icon_time.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight style={styles.reSend}>
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
            onPress={async () => {
              if (this.state.emailCode.length == 6) {
                if (
                  this.state.emailCode ==
                  (await AsyncStorage.getItem('authKey'))
                ) {
                  this.props.navigation.navigate('ResetPassword', {
                    email: this.props.route.param?.email,
                  });
                } else {
                  console.log('ssssssssssssss');
                  this.setModalVisible(true);
                }
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              다음
            </Text>
          </TouchableHighlight>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={`인증번호가 틀렸습니다`}
          />
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
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 50,
  },
  TopText: {
    // color: '#4696ff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
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
    // marginBottom: 300,
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
  reSend: {
    alignItems: 'flex-end',
    marginBottom: 300,
  },
  reSendText: {
    fontSize: 15,
    color: '#4696ff',
    lineHeight: 20,
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
