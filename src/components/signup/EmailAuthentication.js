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
                  secureTextEntry={true}
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
                    style={ResetStyle.xsmallImg}
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
                  marginTop: '3%',
                  justifyContent: 'space-between',
                }}>
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
  textInputStyle2: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingTop: '4%',
    paddingBottom: '2%',
  },
});

export default EmailAuthentication;
