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

class EmailAuthentication extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    email: this.props.route.params?.email,
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
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

  render() {
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {marginTop: 50},
              ]}>
              {this.state.email} 으로{'\n'}6자리 인증 코드를 발송했습니다
            </Text>
          </View>

          <View style={styles.signUpBox}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {textAlign: 'left'},
              ]}>
              인증 번호
            </Text>

            <View>
              <View style={[styles.textInputStyle2, {marginTop: 10}]}>
                <TextInput
                  placeholder="인증번호 입력"
                  value={this.state.passWord}
                  keyboardType={'numeric'}
                  secureTextEntry={true}
                  onChangeText={(text) => this.handlePassword(text)}
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {textAlign: 'left'},
                  ]}></TextInput>
                <View
                  style={[
                    styles.textInputStyle2Inner,
                    {
                      position: 'absolute',
                      right: 0,
                      top: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}>
                  <Image
                    source={require('../../imgs/drawable-xhdpi/icon_time.png')}
                    style={styles.timeImg}
                  />
                  {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}
                  <CountDown />
                </View>
              </View>

              {/* alert */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 19, height: 19}}
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
            style={[ResetStyle.button, {backgroundColor: '#e6e6e6'}]}
            onPress={() => {
              this.props.navigation.navigate('CompleteAuth');
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
  // container: {
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: '#fff',
  // },
  // containerInner: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   marginLeft: '5%',
  //   marginRight: '5%',
  //   backgroundColor: '#fff',
  // },
  // button: {
  //   width: '100%',
  //   borderRadius: 50,
  //   backgroundColor: '#0b95c9',
  //   padding: 15,
  // },
  // buttonTexts: {
  //   color: '#FFF',
  //   fontWeight: '600',
  //   textAlign: 'center',
  //   fontSize: 16,
  // },
  headerText: {
    fontSize: 16,
    // color: '#164895',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 20,
    lineHeight: 24,
  },
  signUpBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  signUpBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  textInputStyle: {
    position: 'relative',
    width: '100%',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2Inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle3: {
    flexDirection: 'row',
    fontSize: 15,
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#4696ff',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  sarrImg: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  timeImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  pointImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default EmailAuthentication;
