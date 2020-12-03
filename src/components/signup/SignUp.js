import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ListModal from '../../components/factory/modal/ListModal';
import CountDown from '../../components/factory/CountDown';
import ResetStyle from '../../style/ResetStyle.js';

class SignUp extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: '',
    country: '',
    countryCd: '',
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
  setCountry = (a, b) => {
    console.log('a>>', a);
    console.log('b>>', b);
    this.setState({
      country: a,
      countryCd: b,
    });
  };
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <Text style={[styles.headerText, {marginTop: 50}]}>
              원활한 서비스 제공을 위해{'\n'}휴대폰 번호를 입력해주세요
            </Text>
          </View>

          <View style={styles.signUpBox}>
            <Text style={styles.signUpBoxTitle}>휴대폰 번호</Text>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
              underlayColor={'transparent'}>
              <View style={[styles.textInputStyle2, {marginTop: 10}]}>
                <Text>
                  {this.state.country == ''
                    ? '초기나라설정'
                    : `${this.state.country} (${this.state.countryCd})`}
                </Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </View>
            </TouchableHighlight>

            <ListModal
              modalVisible={this.state.modalVisible}
              setModalVisible={this.setModalVisible}
              setCountry={this.setCountry}
              text={`인증번호를 발송하였습니다.`}
            />

            <TextInput
              placeholder="-없이 휴대폰 번호 입력"
              keyboardType={'numeric'}
              returnKeyType={'done'}
              onChangeText={this.handleInputChange}
              value={this.state.phoneNum}
              style={[styles.textInputStyle, {marginTop: 10}]}></TextInput>

            <TouchableWithoutFeedback
              onPress={() => {}}
              underlayColor={'#164895'}
              style={[ResetStyle.button, {marginTop: 25}]}>
              <Text style={ResetStyle.buttonTexts}>인증요청</Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.signUpBox}>
            <Text style={styles.signUpBoxTitle}>인증 번호</Text>

            <View>
              <View style={[styles.textInputStyle2, {marginTop: 10}]}>
                <TextInput
                  placeholder="인증번호 입력"
                  value={this.state.passWord}
                  keyboardType={'numeric'}
                  returnKeyType={'done'}
                  secureTextEntry={true}
                  onChangeText={(text) => this.handlePassword(text)}
                  style={[
                    styles.textInputStyle,
                    {borderBottomWidth: 0, paddingTop: 0, paddingBottom: 0},
                  ]}></TextInput>
                <View
                  style={[
                    styles.textInputStyle2Inner,
                    {
                      position: 'absolute',
                      right: 0,
                      top: 15,
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

              <View style={[styles.textInputStyle3, {marginTop: 10}]}>
                <Image
                  source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')}
                  style={styles.pointImg}
                />
                <Text style={{fontSize: 15, color: '#555555', marginLeft: 10}}>
                  3분 이내에 인증번호를 입력해 주세요.
                </Text>
              </View>

              <View style={[styles.textInputStyle3, {marginTop: 10}]}>
                <Image
                  source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')}
                  style={styles.pointImg}
                />
                <Text style={{fontSize: 15, color: '#555555', marginLeft: 10}}>
                  입력시간 초과 시 ‘재요청’ 버튼을 눌려주세요.
                </Text>
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback
            style={[ResetStyle.button, {backgroundColor: '#e6e6e6'}]}
            onPress={() => {
              this.props.navigation.navigate('AgreementTermsConditions');
              this.props.navigation.setOptions({title: '약관동의'});
            }}>
            <Text style={ResetStyle.buttonTexts}>다음</Text>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
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

export default SignUp;
