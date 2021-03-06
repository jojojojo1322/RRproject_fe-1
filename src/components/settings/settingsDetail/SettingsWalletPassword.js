import React, {Component, useState, useEffect} from 'react';
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
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ResetStyle from '@style/ResetStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import AuthStyle from '@style/AuthStyle';

import ProgressModal from '@factory/modal/ProgressModal';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import {getUserInfo} from '@repository/authRepository';
import {
  walletPasswordTrans,
  walletUserUpdate,
} from '@repository/walletRepository';

const SettingsWalletPassword = ({route, navigation}) => {
  const [passArr, setPassArr] = useState([]);
  const [rePassArr, setRePassArr] = useState([]);
  const [pass, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [currentPw, setCurrentPw] = useState('');

  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

  const {t} = useTranslation();

  const userInfoApi = async ({navigation, route}) => {
    await getUserInfo({userNo: user.userNo})
      // userNo=210127104026300
      .then(async (response) => {
        console.log('userInfoApi Then >>', response);
      })
      .catch((e) => {
        console.log('userInfoApi Error', e);
      });
  };

  const walletPasswordTransApi = async (walletPw) => {
    console.log({
      currentPw: route.params?.currentPw,
      updatePw: walletPw,
    });
    setModal3Visible(true);
    await walletPasswordTrans({
      email: user.mailId,
      currentPw: route.params?.currentPw,
      updatePw: walletPw,
    })
      .then((response) => {
        console.log('walletPasswordTransApi THEN>>', response);
        if (response.data.status === 'success') {
          walletUserUpdateApi(walletPw);
        } else {
          navigation.replace('SettingsWallet');
        }
      })
      .catch((e) => {
        console.log('walletPasswordTransApi ERROR>>', e);
      });
    setModal3Visible(false);
  };

  const walletUserUpdateApi = async (walletPw) => {
    // this.setModal3Visible(true);
    await walletUserUpdate({
      email: user.mailId,
      walletAddress: await AsyncStorage.getItem('masterKey'),
      walletPw: walletPw,
    })
      .then((response) => {
        console.log('walletUserUpdateApi THEN>>', response);
        if (response.data.status === 'success') {
          setModal2Visible(true);
        } else {
          navigation.replace('SettingsWallet');
        }
      })
      .catch((e) => {
        console.log('walletUserUpdateApi ERROR>>', e);
      });
    setModal3Visible(false);
  };

  const handlePass = async (value, e) => {
    console.log(value);
    let _passArr = passArr.slice();
    let _rePassArr = rePassArr.slice();
    let test = '';
    if (passArr.length <= 4) {
      // this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });
      // console.log(_passArr);
      setPassArr(_passArr.concat({id: _passArr.length, value}));
    } else if ((_passArr.length = 5)) {
      console.log('last');
      // await this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });
      setPassArr(_passArr.concat({id: _passArr.length, value}));

      //first pass
      if (pass == '') {
        await _passArr.map((data) => {
          test += data.value;
        });
        setPass(test);
        console.log('test', test);
      } else if (pass != '') {
        await passArr.map((data) => {
          test += data.value;
        });
        // console.log('????????????>>>>', test == this.state.pass);
        if (test != pass) {
          setModalVisible(true);
        } else if (test == pass) {
          // console.log('1212');
          // await this.walletPasswordTransApi(this.state.pass);
          // console.log('3434');
          // console.log(this.state.walletAddress);
          // this.setModal2Visible(true);

          console.log('testtest', test);
          walletPasswordTransApi(test);
        }
      }
      setPassArr([]);
    }
    console.log('pass', pass);
  };

  const handlePassErase = () => {
    let _passArr = passArr.slice();
    let _rePassArr = rePassArr.slice();

    if (_passArr.length != 0) {
      setPassArr(_passArr.filter((data) => data.id != _passArr.length - 1));
    }
  };
  const handleNextPage = async () => {
    // this.props.navigation.navigate('SettingsWallet', {
    //   walletAddress: this.state.walletAddress,
    // });
    navigation.replace('SettingsWallet');
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        <View>
          {/* topBackButton */}
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
                source={require('@images/backIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            {t('settingsWalletPassword1')}
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {pass == ''
              ? t('settingsWalletPassword2')
              : t('settingsWalletPassword3')}
          </Text>
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
                {marginLeft: '3%'},
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
                {marginLeft: '3%'},
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
                {marginLeft: '3%'},
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
                {marginLeft: '3%'},
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
                {marginLeft: '3%'},
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
            // onPress={this.handlePass.bind(this, '1')}
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
        text={t('settingsWalletPassword4')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('settingsWalletPassword5')}
        confirm={t('settingsWalletPassword6')}
        handleNextPage={handleNextPage}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('settingsWalletPassword7')}
        confirm={t('settingsWalletPassword6')}
        handleNextPage={handleNextPage}
      />
      <ProgressModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  passGray: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    // flex: 1,
    marginLeft: '3%',
    width: '14%',
    height: 50,
    // height: 30,
    // width: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 20,
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

export default SettingsWalletPassword;
