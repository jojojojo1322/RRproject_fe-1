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

export default class walletPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>지갑 비밀번호</Text>
        <Text>지갑 전송 시 사용할 6자리 비밀번호를 입력해 주세요.</Text>
        <Text>HI</Text>
        <Text>HI</Text>
        <Text>HI</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  title: {
    marginTop: '20%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
  },
  sub: {
    textAlign: 'center',
    color: '#888',
    lineHeight: 25,
    fontSize: 18,
  },
  loginBox: {
    width: '100%',
    alignItems: 'center',
  },
  loginInput: {
    width: '90%',
    height: 56,
    borderWidth: 1,
    borderColor: '#164895',
    borderRadius: 50,
    paddingLeft: 31,
    fontSize: 16,
    letterSpacing: 0.9,
    marginBottom: '5%',
    // color: '#999999'
  },
  loginButton: {
    width: '90%',
    height: 56,
    borderRadius: 30,
    backgroundColor: '#164895',
    color: '#FFF',
    marginBottom: '5%',
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 56,
    fontWeight: '500',
    letterSpacing: 0.9,
  },
  fotgotPasswordBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#164895',
  },
  fotgotPassword: {
    fontSize: 14,
    lineHeight: 20,
    color: '#164895',
  },
  bottomTextBox: {
    width: '100%',
    marginBottom: '8%',
    padding: '5%',
  },
  bottomSignupBox: {
    marginTop: '20%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonBoxText: {
    color: '#164895',
    fontWeight: '200',
    color: '#49658f',
  },
  buttonBoxSignupText: {
    color: '#164895',
    fontWeight: '500',
    color: '#49658f',
  },
  bottomTextInner: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 12,
    color: '#49658f',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  closeButton: {
    width: '90%',
    backgroundColor: '#F194FF',
    elevation: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
  },
});
