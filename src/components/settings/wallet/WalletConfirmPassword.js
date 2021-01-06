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
import BottomModal from '../../factory/modal/BottomModal';
import TextConfirmModal from '../../factory/modal/TextConfirmModal';
import ResetStyle from '../../../style/ResetStyle.js';
import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStyle from '../../../style/AuthStyle';

export default class WalletConfirmPassword extends Component {
  state = {
    passArr: [],
    rePassArr: [],
    pass: '',
    modalVisible: false,
    modal2Visible: false,
    walletAddress: '',
  };
  walletPasswordApi = async (walletPw) => {
    await axios
      .post(`${server}/wallet`, {
        userNo: await AsyncStorage.getItem('userNo'),
        walletPw: walletPw,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          walletAddress: response.data.walletAddress,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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

      if (this.state.pass == '') {
        await this.state.passArr.map((data) => {
          test += data.value;
        });
        await this.setState({
          pass: test,
        });
        console.log('test', test);

        // console.log('비교비교>>>>', test == this.state.pass);
        if (this.state.pass !== '111111') {
          this.setModalVisible(true);
        } else if (this.state.pass === '111111') {
          // await this.walletPasswordApi(this.state.pass);
          console.log(this.state.walletAddress);
          this.handleNextPage();
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
  handleNextPage = async () => {
    this.props.navigation.navigate('WalletSendSuccess');
  };

  render() {
    const passArr = this.state.passArr;
    return (
      <SafeAreaView style={[ResetStyle.container]}>
        <View style={ResetStyle.containerInner}>
          <View>
            {/* topBackButton */}
            <View style={[ResetStyle.topBackButton]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
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
              {`지갑 전송 시 사용할${'\n'}6자리 비밀번호를 입력해주세요.`}
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
                source={require('../../../imgs/drawable-mdpi/icon_delete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <BottomModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={`지갑 비밀번호가 일치하지 않습니다.`}
        />
        <TextConfirmModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`비밀번호가 설정되었습니다.`}
          confirm={`확인`}
          handleNextPage={this.handleNextPage}
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