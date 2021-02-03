import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import BottomModal from '../../factory/modal/BottomModal';
import ResetStyle from '../../../style/ResetStyle.js';
import AuthStyle from '../../../style/AuthStyle';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletConfirmPassword = ({navigation, route}) => {
  const [buttonNumber, setButtonNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [Tpassword, setTPassword] = useState('');
  const [apassword, setAPassword] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');

  const {amount} = route ? route.params : '';
  const {email} = route ? route.params : '';
  const {memo} = route ? route.params : '';
  const {to} = route ? route.params : '';
  const {type} = route ? route.params : '';
  // console.log('amount check >>>>>', amount);
  // console.log('email check >>>>>', email);
  // console.log('memo check >>>>>', memo);
  // console.log('to check >>>>>', to);
  // console.log('type check >>>>>', type);

  // wallet password Api 부르기
  const walletPasswordApi = async (walletPw) => {
    await axios
      .post(`${server}/wallet`, {
        userNo: await AsyncStorage.getItem('userNo'),
        walletPw: walletPw,
      })
      .then((response) => {
        console.log(response);
        setWalletAddress(response.data.walletAddress);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePassNumber = (e) => {
    let password = '';
    overSix();
    if (buttonNumber === '1') {
      password = password + '1';
    } else if (buttonNumber === '2') {
      password = password + '2';
    } else if (buttonNumber === '3') {
      password = password + '3';
    } else if (buttonNumber === '4') {
      password = password + '4';
    } else if (buttonNumber === '5') {
      password = password + '5';
    } else if (buttonNumber === '6') {
      password = password + '6';
    } else if (buttonNumber === '7') {
      password = password + '7';
    } else if (buttonNumber === '8') {
      password = password + '8';
    } else if (buttonNumber === '9') {
      password = password + '9';
    } else if (buttonNumber === '0') {
      password = password + '0';
    }
  };

  const handlePassErase = (e) => {
    if (apassword.length !== 1) {
      console.log('zzzzzzzzzz');
      let fixArr = apassword;
      // Tpassword.slice(0, -1);
      // console.log('zzzzzzzzzz', Tpassword);
      fixArr = fixArr.filter((data, index) => index != apassword.length);
      setAPassword(fixArr);
      console.log(apassword);
    } else {
      Tpassword;
    }
  };

  // useEffect(() => {
  //   console.log('password check >>>>>', password);
  // }, [password]);
  // 비밀번호 배열 텍스트
  useEffect(() => {
    let password = Tpassword;
    let Arr = apassword;
    password = String(password) + buttonNumber;
    Arr = Arr.concat(buttonNumber);
    setAPassword(Arr);
    setTPassword(password);
    console.log('dummydummydummy', password);
    console.log('dummydummapasswordydummy', apassword);
    console.log('Tpassword.length', Tpassword.length);
  }, [buttonNumber]);

  useEffect(() => {});

  const overSix = () => {
    if (0 < Tpassword.length <= 6) {
    } else {
      setTPassword('');
    }
    console.log('oversix check', Tpassword.length);
  };

  const handleNextPage = async () => {
    navigation.navigate('WalletSendSuccess');
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        {/* topBackButton */}
        <View>
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            지갑 비밀번호
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {`비밀번호를 입력해주세요.`}
          </Text>

          {/* 5자리 비밀번호 칸 */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                apassword.length - 1 >= 1 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 1 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                apassword.length - 1 >= 2 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 2 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                apassword.length - 1 >= 3 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 3 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                apassword.length - 1 >= 4 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 4 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                apassword.length - 1 >= 5 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 5 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                apassword.length - 1 >= 6 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {apassword.length - 1 >= 6 ? (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.keyboard}>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('1');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('2');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('3');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('4');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('5');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('6');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('7');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('8');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('9');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={[styles.keyboardDetail, {backgroundColor: '#f5f5f6'}]}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              setButtonNumber('0');
              handlePassNumber();
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePassErase}>
            <Image
              style={styles.keyboardCancelButton}
              source={require('../../../imgs/drawable-mdpi/icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={`지갑 비밀번호가 일치하지 않습니다.`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  passGray: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    marginLeft: '3%',
    width: '14%',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboard: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
  },
  keyboardDetail: {
    flex: 1,
    height: 70,
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardCancelButton: {
    width: '40%',
    height: '30%',
    resizeMode: 'contain',
    // color: '#fff',
  },
});

export default WalletConfirmPassword;
