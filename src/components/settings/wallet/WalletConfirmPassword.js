import React, {useEffect, useState, useRef} from 'react';
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
import ProgressModal from '../../factory/modal/ProgressModal';
import ResetStyle from '../../../style/ResetStyle.js';
import AuthStyle from '../../../style/AuthStyle';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const WalletConfirmPassword = ({navigation, route}) => {
  const {t, i18n} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [Jpassword, setJpassword] = useState([]);
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [statusCheck, setStatusCheck] = useState('');

  const {amount} = route ? route.params : '';
  const {email} = route ? route.params : '';
  const {memo} = route ? route.params : '';
  const {to} = route ? route.params : '';
  const {type} = route ? route.params : '';
  const {balance} = route ? route.params : '';
  const {valuePlusTen} = route ? route.params : '';
  // console.log('amount check >>>>>', amount);
  // console.log('email check >>>>>', email);
  // console.log('memo check >>>>>', memo);
  // console.log('to check >>>>>', to);
  // console.log('type check >>>>>', type);
  // console.log('balance check >>>>>', balance);
  // console.log('valuePlusTen check >>>>>', valuePlusTen);

  // wallet password Api 부르기

  const walletPasswordApi = async (password) => {
    setModal4Visible(true);
    console.log('check passed password', password);
    await axios
      .post(`${server}/wallet/trans`, {
        amount: valuePlusTen,
        email: email,
        memo: memo,
        password: password,
        to: to,
        type: type,
      })
      .then(async (response) => {
        console.log('wallet send response check  >>>>>', response);
        // await setStatusCheck(response.data.status);
        if (response.data.status == 'success') {
          //TNC 전송 성공시
          handleNextPage();
        } else if (response.data.status == 'fail') {
          //TNC 전송 실패시 (전송이 실패하였습니다.)
          navigation.navigate('WalletSend');
        }
      })
      .catch((e) => {
        // setModal2Visible(!modal2Visible);
        navigation.navigate('WalletSend');
        console.log(e);
      });
    setModal4Visible(false);
  };

  // function preModal3 (value){

  //   const prevModal3Ref = useRef();
  //   useEffect(() => {
  //     prevModal3Ref.current = value;
  //   });
  //   return prevModal3Ref.current
  // }

  // useEffect(() => {
  //   if (prevModal3Ref.current === true && modal3Visible === false) {
  //     navigation.navigate('WalletSend');
  //   }
  // }, [modal3Visible]);

  useEffect(() => {
    console.log('Jpassword??', Jpassword);
    console.log('Jpassword??', Jpassword.length);
  }, [Jpassword]);

  const handlePass = async (value, e) => {
    console.log('handlePass', value);
    let passArr = Jpassword;
    let test = '';
    if (passArr.length <= 4) {
      setJpassword(passArr.concat({id: passArr.length, value}));
    } else if ((passArr.length = 5)) {
      console.log('last');
      setJpassword(passArr.concat({id: passArr.length, value}));
      passArr = passArr.concat({id: passArr.length, value});

      //first pass
      passArr.map((data) => {
        test += data.value;
      });

      setPassword(test);
      console.log('마지막 비밀번호 체크 TEST', test);
      console.log('마지막 비밀번호 체크 ARR', passArr);
      // test <<<<<<<<<< 완성 6자리

      await walletPasswordApi(test);
    }
    console.log('test', test);
  };

  const handlePassErase = (e) => {
    ////////////////////
    let passArr = Jpassword;

    if (passArr.length !== 0) {
      setJpassword(passArr.filter((data) => data.id != passArr.length - 1));
    }
  };

  const handleNextPage = async () => {
    navigation.navigate('WalletSendSuccess', {
      amount: amount,
      email: email,
      memo: memo,
      to: to,
      balance: balance,
    });
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        {/* topBackButton */}
        <View>
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../imgs/backIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            {t('walletConfirmPasswordTitle')}
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {t('walletConfirmPassword1')}
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
                Jpassword.length >= 1 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 1 ? (
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
                Jpassword.length >= 2 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 2 ? (
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
                Jpassword.length >= 3 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 3 ? (
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
                Jpassword.length >= 4 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 4 ? (
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
                Jpassword.length >= 5 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 5 ? (
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
                Jpassword.length >= 6 ? {backgroundColor: '#4696ff'} : '',
              ]}>
              {Jpassword.length >= 6 ? (
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
              // setButtonNumber('1');
              // handlePassNumber();
              handlePass('1');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('2');
              // handlePassNumber();
              handlePass('2');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('3');
              // handlePassNumber();
              handlePass('3');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('4');
              // handlePassNumber();
              handlePass('4');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('5');
              // handlePassNumber();
              handlePass('5');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('6');
              // handlePassNumber();
              handlePass('6');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('7');
              // handlePassNumber();
              handlePass('7');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('8');
              // handlePassNumber();
              handlePass('8');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              // setButtonNumber('9');
              // handlePassNumber();
              handlePass('9');
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
              // setButtonNumber('0');
              // handlePassNumber();
              handlePass('0');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={handlePassErase}>
            <Image
              style={styles.keyboardCancelButton}
              source={require('../../../imgs/iconDelete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('walletConfirmPassword2')}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('walletConfirmPassword3')}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('walletConfirmPassword4')}
      />
      <ProgressModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
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
  },
});

export default WalletConfirmPassword;
