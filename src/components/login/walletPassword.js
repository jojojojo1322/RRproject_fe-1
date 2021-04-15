import React, {Component, useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ProgressModal from '@factory/modal/ProgressModal';
import ResetStyle from '@style/ResetStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import AuthStyle from '@style/AuthStyle';

import {useTranslation} from 'react-i18next';

const WalletPassword = ({route, navigation}) => {
  const [passArr, setPassArr] = useState([]);
  const [rePassArr, setRePassArr] = useState([]);
  const [pass, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setMoㄴdal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletCheck, setWalletCheck] = useState('');
  const [transCheck, setTransCheck] = useState('');

  const {t} = useTranslation();

  const walletPasswordApi = async (walletPw) => {
    setModal4Visible(true);
    await axios
      .post(`${server}/wallet`, {
        email: route.params?.email,
        walletPw: walletPw,
      })
      .then(async (response) => {
        setWalletCheck(response.data.status);
        setModal4Visible(false);
      })
      .catch((e) => {
        setModal4Visible(false);
      });
  };
  useEffect(() => {
    walletKeyApi();
  }, []);

  const walletKeyApi = async () => {
    await axios
      .get(`${server}/wallet/${route.params?.email}`)
      .then(async (response) => {
        setWalletAddress(response.data.name);
      })
      .catch((e) => {});
  };

  const walletTransApi = async () => {
    await axios
      .put(`${server}/wallet`, {
        email: route.params?.email,
        walletAddress: walletAddress,
        walletPw: String(pass),
      })
      .then((response) => {
        setTransCheck(response.data.status);
      })
      .catch((e) => {});
  };

  const handlePass = async (value, e) => {
    let _passArr = passArr.slice();

    let test = '';
    if (_passArr.length <= 4) {
      setPassArr(_passArr.concat({id: _passArr.length, value}));
    } else if ((_passArr.length = 5)) {
      setPassArr(_passArr.concat({id: _passArr.length, value}));

      //first pass
      if (pass == '') {
        _passArr.map((data) => {
          test += data.value;
        });
        test += value;
        setPass(test);
      } else if (pass != '') {
        _passArr.map((data) => {
          test += data.value;
        });
        test += value;

        if (test != pass) {
          // 1차 2차비밀번호 틀릴시 모달
          setModalVisible(true);
        } else if (test == pass) {
          //지갑 생성
          walletPasswordApi(pass);

          if (walletCheck == 'success') {
            //지갑 생성 성공시
            walletKeyApi();
            if (walletAddress !== '') {
              // 지갑 생성 성공시 모달
              setModal2Visible(true);
            } else if (walletAddress !== '') {
            }
          } else if (walletCheck == 'fail') {
            //지갑 생성 실패시
            setModal3Visible(true);
          }
        }
      }
      setPassArr([]);
    }
  };

  const handlePassErase = (e) => {
    let _passArr = passArr.slice();
    let _rePassArr = rePassArr.slice();
    if (_passArr.length != 0) {
      setPassArr(_passArr.filter((data) => data.id != passArr.length - 1));
    }
  };

  const handleNextPage = async () => {
    walletTransApi();
    navigation.navigate('WalletMasterKey', {
      walletAddress: walletAddress,
    });
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        <View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            {t('WalletPasswordTitle')}
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {pass == '' ? t('WalletPassword1') : t('WalletPassword2')}
          </Text>
          <View style={styles.passGrayAll}>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[0] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[0] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[1] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[1] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[2] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[2] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[3] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[3] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[4] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[4] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[5] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[5] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.keyboard}>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('1');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('2');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('3');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('4');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('5');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('6');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('7');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('8');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
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
              handlePass('0');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePassErase();
            }}>
            <Image
              style={styles.keyboardCancelButton}
              source={require('@images/iconDelete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('WalletPassword3')}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('WalletPassword4')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('WalletPassword5')}
        confirm={t('WalletPassword6')}
        handleNextPage={handleNextPage}
      />
      <ProgressModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  passGrayAll: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  passGrayText: {
    fontSize: 30,
    marginTop: 10,
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
  keyboardCancelButtonDetail: {
    flex: 1,
    height: 80,
    borderWidth: 0.4,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  keyboardCancelButton: {
    width: '40%',
    height: '30%',
    resizeMode: 'contain',
  },
});
export default WalletPassword;
