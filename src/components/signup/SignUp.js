import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, TouchableHighlight, SafeAreaView, Image} from 'react-native';
import ListModal from '../../components/factory/modal/ListModal';
import CountDown from '../../components/factory/CountDown';
class SignUp extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: ''
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  // only number
  handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      this.setState({
        phoneNum
      });
    }
  }
  
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
          <View style={styles.containerInner}>

            <View>
              <Text style={styles.headerText}>원활한 서비스 제공을 위해{'\n'}휴대폰 번호를 입력해주세요</Text>
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpBoxTitle}>휴대폰 번호</Text>

              <TouchableHighlight 
                onPress={() => {
                  this.setModalVisible(true);
                }}
                underlayColor={'transparent'}
              >
                <View style={[styles.textInputStyle2, {marginTop: 10}]}>
                  <Text>South Korea (+82)</Text>
                  <Image source={require('../../imgs/drawable-xhdpi/icon_sarr.png')} style={styles.sarrImg}/>
                </View>
              </TouchableHighlight>

              <ListModal
                modalVisible={this.state.modalVisible}
                setModalVisible={this.setModalVisible}
                text={`인증번호를 발송하였습니다.`}
              />

              <TextInput
                  placeholder="-없이 휴대폰 번호 입력"
                  keyboardType={'numeric'}
                  onChangeText={this.handleInputChange}
                  value={this.state.phoneNum}
                  style={[styles.textInputStyle, {marginTop: 10}]}>
              </TextInput>

              <TouchableHighlight
              onPress={() => {

              }}
              underlayColor={'#164895'}
              style={[styles.button, {marginTop: 25}]}
              >
                <Text style={styles.buttonTexts}>인증요청</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.signUpBox}>
              <Text style={styles.signUpBoxTitle}>인증 번호</Text>

              <View>
                <View style={[styles.textInputStyle2, {marginTop: 10}]}>
                  <TextInput
                      placeholder="인증번호 입력" 
                      value={this.state.passWord}
                      keyboardType={'numeric'}
                      secureTextEntry={true}
                      onChangeText={(text) => this.handlePassword(text)}
                      style={[styles.textInputStyle, {borderBottomWidth: 0, paddingTop: 0, paddingBottom: 0}]}
                      >
                  </TextInput>
                  <View style={[styles.textInputStyle2Inner, {position: 'absolute', right: 0, top: 15}]}>
                    <Image source={require('../../imgs/drawable-xhdpi/icon_time.png')} style={styles.timeImg}/>
                    {/* <Text style={{fontSize: 15, color: '#0b95c9', fontWeight: '500', marginLeft: 5}}>00:00</Text> */}
                    <CountDown />
                  </View>
                </View>

                <View style={[styles.textInputStyle3, {marginTop: 10}]}>
                  <Image source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')} style={styles.pointImg}/>
                  <Text style={{fontSize: 15, color: '#555555', marginLeft: 10}}>3분 이내에 인증번호를 입력해 주세요.</Text>
                </View>

                <View style={[styles.textInputStyle3, {marginTop: 10}]}>
                  <Image source={require('../../imgs/drawable-xhdpi/icon_w_point_1.png')} style={styles.pointImg}/>
                  <Text style={{fontSize: 15, color: '#555555', marginLeft: 10}}>입력시간 초과 시 ‘재요청’ 버튼을 눌려주세요.</Text>
                </View>

              </View>

            </View>

            <TouchableHighlight style={[styles.button, {backgroundColor:'#c6c9cf'}]}>
              <Text style={styles.buttonTexts}>다음</Text>
            </TouchableHighlight>

          </View>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff'
    },
    containerInner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: '5%',
      marginRight: '5%',
      backgroundColor: '#fff'
    },
    headerText: {
      fontSize: 16,
      color: '#164895',
      textAlign: 'center',
      fontWeight: '400',
      marginTop: 20,
      lineHeight: 24
    },
    signUpBox: {
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    signUpBoxTitle: {
      fontSize: 16,
      fontWeight: '600'
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
      backgroundColor: '#0b95c9',
      padding: 15
    },
    buttonTexts: {
      color: '#FFF',
      fontWeight: '600',
      textAlign: 'center',
      fontSize: 16
    },
    sarrImg: {
      width: 12,
      height: 12,
      resizeMode: 'contain'
    },
    timeImg: {
      width: 16,
      height: 16,
      resizeMode: 'contain'
    },
    pointImg: {
      width: 20,
      height: 20,
      resizeMode: 'contain'
    }
});

export default SignUp;