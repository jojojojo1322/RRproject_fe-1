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
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.Top}>
            <Text style={styles.TopText}>비밀번호를 잊으셨나요?</Text>
            <Text style={styles.TopText2}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text>
          </View>
          <Text style={styles.secText}>이메일</Text>
          <View style={styles.third}>
            <TextInput
              style={styles.thirdText}
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
          <TouchableHighlight
            // style={[styles.button, {backgroundColor: '#4696ff'}]}
            style={
              this.validateEmail(this.state.email)
                ? [styles.button, {backgroundColor: '#4696ff'}]
                : [styles.button]
            }
            onPress={() => {
              if (this.validateEmail(this.state.email)) {
                this.props.navigation.push('ResetEmail', {
                  email: this.state.email,
                });
              }
            }}>
            <Text style={styles.buttonTexts}>다음</Text>
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
