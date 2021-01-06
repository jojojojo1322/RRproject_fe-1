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
import DeviceInfo from 'react-native-device-info';
import {server} from '../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextConfirmModal from '../factory/modal/TextConfirmModal';
import WalletPassword from './WalletPassword';
import WalletMasterKey from './WalletMasterKey';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import BottomModal from '../factory/modal/BottomModal';

// import RNPickerSelect from 'react-native-picker-select';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[AuthStyle.item, style]}>
    <Text style={AuthStyle.title}>{item.title}</Text>
  </TouchableOpacity>
);

export default class Login extends Component {
  state = {
    ID: '',
    passWord: '',
    modalVisible: false,
    modal2Visible: false,
    selectedId: null,
    text: '',
    loginCheck: false,
    hasWallet: '',
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleID = (text) => {
    this.setState({
      ID: text,
    });
  };
  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  handleLoginCheck = () => {
    // if(this.state.Id)
  };
  handleNextPage = () => {
    this.props.navigation.navigate('WalletPassword');
  };
  loginApi = async (id, pass) => {
    await axios
      .post(`${server}/user/login`, {
        email: id,
        password: pass,
        deviceKey: DeviceInfo.getUniqueId(),
      })
      .then(async (response) => {
        console.log('loginApithen', response);
        console.log('loginApithen', response.data.status);
        console.log('loginApithen', response.data.userNo);
        console.log(
          'then header>>>>' +
            response.headers.authorization.slice(7, undefined),
        );
        await AsyncStorage.setItem(
          'authToken',
          response.headers.authorization.slice(7, undefined),
        );
        await AsyncStorage.setItem('userNo', response.data.userNo);
        this.setState({
          loginCheck: response.data.status,
          hasWallet: response.data.hasWallet,
        });
        return response.data.status;
      })
      .catch((error) => {
        console.log('erro', error.response.data);
      });
  };
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <View style={[{marginTop: '25%', marginBottom: '8%'}]}>
              <Text
                style={[
                  ResetStyle.fontBoldE,
                  ResetStyle.fontB,
                  {textAlign: 'center', fontWeight: '600'},
                ]}>
                Real Research
              </Text>

              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularE,
                    ResetStyle.fontG,
                    {textAlign: 'center', marginTop: '1%'},
                  ]}>
                  Hello there, Login to your account
                </Text>
              </View>
            </View>

            <View style={[AuthStyle.loginBox]}>
              <TextInput
                style={[
                  ResetStyle.buttonWhite,
                  ResetStyle.fontLightE,
                  ResetStyle.fontG,
                  {marginBottom: '3%', marginTop: '6%', textAlign: 'left'},
                ]}
                placeholder="Email Address"
                placeholderTextColor="#a9a9a9"
                value={this.state.ID}
                autoCapitalize={'none'}
                // onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.handleID(text)}></TextInput>
              <TextInput
                style={[
                  ResetStyle.buttonWhite,
                  ResetStyle.fontLightE,
                  ResetStyle.fontG,
                  {marginBottom: '14%', textAlign: 'left'},
                ]}
                placeholder="Password"
                placeholderTextColor="#a9a9a9"
                secureTextEntry={true}
                value={this.state.passWord}
                // onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.handlePassword(text)}></TextInput>
              <TouchableOpacity
                style={ResetStyle.button}
                activeOpacity={0.75}
                onPress={async () => {
                  //api용
                  this.setState({
                    hasWallet: '',
                  });
                  await this.loginApi(this.state.ID, this.state.passWord);
                  console.log('this.state.loginCheck', this.state.loginCheck);

                  if (this.state.loginCheck) {
                    if (this.state.hasWallet === -1) {
                      console.log('aaa');
                      this.setModalVisible(true);
                    } else {
                      this.props.navigation.navigate('Main');
                    }
                  } else {
                    this.setModal2Visible(true);
                  }

                  //본부장님 테스트용
                  // this.props.navigation.navigate('WalletPassword');
                  // await AsyncStorage.setItem('userNo', '111');
                }}>
                <Text
                  style={[
                    ResetStyle.fontRegularE,
                    ResetStyle.fontWhite,
                    {fontSize: 24},
                  ]}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  this.props.navigation.navigate('Reset');
                }}>
                <Text
                  style={[
                    ResetStyle.fontRegularE,
                    ResetStyle.fontB,
                    {marginTop: '6%', marginBottom: '3%'},
                  ]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={[
                AuthStyle.loginMiddleBorder,
                {marginBottom: '6%', width: '112%', right: '6%'},
              ]}
            />

            <Text
              style={[
                ResetStyle.fontLightE,
                ResetStyle.fontG,
                {marginBottom: '3%'},
              ]}>
              Don't have an account?{' '}
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumE,
                  ResetStyle.fontB,
                  {fontWeight: '400'},
                ]}>
                SIGNUP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[AuthStyle.loginBottomTextBox, {marginTop: '5%'}]}>
            <Text style={[ResetStyle.fontRegularE, ResetStyle.fontB]}>
              Powered by Real Research Inc.
            </Text>
          </View>
        </View>
        <TextConfirmModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={`현재 지갑이 생성되어 있지 않습니다${'\n'}지갑을 만들어주세요`}
          confirm={`확인`}
          handleNextPage={this.handleNextPage}
        />
        <BottomModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`정보가 정확하지 않습니다`}
        />
      </SafeAreaView>
    );
  }
}
