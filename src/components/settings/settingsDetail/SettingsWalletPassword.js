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
} from 'react-native';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ResetStyle from '@style/ResetStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStyle from '@style/AuthStyle';

import ProgressModal from '@factory/modal/ProgressModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class SettingsWalletPassword extends Component {
  state = {
    passArr: [],
    rePassArr: [],
    pass: '',
    modalVisible: false,
    modal2Visible: false,
    modal3Visible: false,
    modal4Visible: false,
    walletAddress: '',
    currentPw: '',
  };
  userInfoApi = async () => {
    await axios
      .get(
        `${server}/user?userNo=${await AsyncStorage.getItem('userNo')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('userInfoApi Then >>', response);
      })
      .catch((e) => {
        console.log('userInfoApi Error', e);
      });
  };
  walletPasswordTransApi = async (walletPw) => {
    console.log({
      currentPw: this.props.route.params?.currentPw,
      updatePw: walletPw,
    });
    this.setModal3Visible(true);
    await axios
      .put(`${server}/wallet/password`, {
        email: await AsyncStorage.getItem('email'),
        currentPw: this.props.route.params?.currentPw,
        updatePw: walletPw,
      })
      .then((response) => {
        console.log('walletPasswordTransApi THEN>>', response);
        if (response.data.status === 'success') {
          this.walletUserUpdateApi(walletPw);
        } else {
          this.props.navigation.replace('SettingsWallet');
        }
      })
      .catch((e) => {
        console.log('walletPasswordTransApi ERROR>>', e);
      });
    this.setModal3Visible(false);
  };
  walletUserUpdateApi = async (walletPw) => {
    // this.setModal3Visible(true);
    await axios
      .put(`${server}/wallet`, {
        email: await AsyncStorage.getItem('email'),
        walletAddress: await AsyncStorage.getItem('masterKey'),
        walletPw: walletPw,
      })
      .then((response) => {
        console.log('walletUserUpdateApi THEN>>', response);
        if (response.data.status === 'success') {
          this.setModal2Visible(true);
        } else {
          this.props.navigation.replace('SettingsWallet');
        }
      })
      .catch((e) => {
        console.log('walletUserUpdateApi ERROR>>', e);
      });
    this.setModal3Visible(false);
  };
  handlePass = async (value, e) => {
    console.log(value);
    let passArr = this.state.passArr;
    let rePassArr = this.state.rePassArr;
    let test = '';
    if (passArr.length <= 4) {
      this.setState({
        passArr: passArr.concat({id: passArr.length, value}),
      });
    } else if ((passArr.length = 5)) {
      console.log('last');
      await this.setState({
        passArr: passArr.concat({id: passArr.length, value}),
      });

      //first pass
      if (this.state.pass == '') {
        await this.state.passArr.map((data) => {
          test += data.value;
        });
        await this.setState({
          pass: test,
        });
        console.log('test', test);
      } else if (this.state.pass != '') {
        await this.state.passArr.map((data) => {
          test += data.value;
        });
        // console.log('비교비교>>>>', test == this.state.pass);
        if (test != this.state.pass) {
          this.setModalVisible(true);
        } else if (test == this.state.pass) {
          // console.log('1212');
          // await this.walletPasswordTransApi(this.state.pass);
          // console.log('3434');
          // console.log(this.state.walletAddress);
          // this.setModal2Visible(true);

          console.log('testtest', test);
          this.walletPasswordTransApi(test);
        }
      }

      this.setState({
        passArr: [],
      });
    }
    console.log('pass', this.state.pass);
  };
  handlePassErase = (e) => {
    let passArr = this.state.passArr;
    let rePassArr = this.state.rePassArr;
    if (passArr.length != 0) {
      this.setState({
        passArr: passArr.filter((data) => data.id != passArr.length - 1),
      });
    }
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
  };
  setModal3Visible = (visible) => {
    this.setState({modal3Visible: visible});
  };
  setModal4Visible = (visible) => {
    this.setState({modal4Visible: visible});
  };
  handleNextPage = async () => {
    // this.props.navigation.navigate('SettingsWallet', {
    //   walletAddress: this.state.walletAddress,
    // });
    this.props.navigation.replace('SettingsWallet');
  };

  componentDidMount() {
    this.userInfoApi();
  }
  render() {
    const {t} = this.props;
    const passArr = this.state.passArr;
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
                  this.props.navigation.goBack();
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
              {this.state.pass == ''
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
              onPress={this.handlePass.bind(this, '1')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '2')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '3')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyboardView}>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '4')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '5')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '6')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.keyboardView}>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '7')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '8')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '9')}>
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
              onPress={this.handlePass.bind(this, '0')}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyboardDetail}
              onPress={this.handlePassErase}>
              <Image
                style={styles.keyboardCancelButton}
                source={require('@images/iconDelete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <BottomModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={t('settingsWalletPassword4')}
        />
        <TextConfirmModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={t('settingsWalletPassword5')}
          confirm={t('settingsWalletPassword6')}
          handleNextPage={this.handleNextPage}
        />
        <TextConfirmModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={t('settingsWalletPassword7')}
          confirm={t('settingsWalletPassword6')}
          handleNextPage={this.handleNextPage}
        />
        <ProgressModal
          modalVisible={this.state.modal3Visible}
          setModalVisible={this.setModal3Visible}
        />
      </SafeAreaView>
    );
  }
}
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

export default hoistStatics(
  withTranslation()(SettingsWalletPassword),
  SettingsWalletPassword,
);
