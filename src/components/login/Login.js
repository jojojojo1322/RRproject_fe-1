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
  YellowBox,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// deviceKey: DeviceInfo.getUniqueId()
import {server} from '../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextConfirmModal from '../factory/modal/TextConfirmModal';
import WalletPassword from './WalletPassword';
import WalletMasterKey from './WalletMasterKey';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import BottomModal from '../factory/modal/BottomModal';
import ProgressModal from '../factory/modal/ProgressModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

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

class Login extends Component {
  state = {
    ID: '',
    passWord: '',
    modalVisible: false,
    modal2Visible: false,
    modal3Visible: false,
    modal4Visible: false,
    modal5Visible: false,
    modal6Visible: false,
    selectedId: null,
    text: '',
    loginCheck: false,
    hasWallet: '',
    errorMsg: '',

    deviceCheck: 1,
  };
  componentDidMount() {
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state.',
    ]);
    YellowBox.ignoreWarnings(['Can']);
  }
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
  setModal5Visible = (visible) => {
    this.setState({modal5Visible: visible});
  };
  setModal6Visible = (visible) => {
    this.setState({modal6Visible: visible});
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
  handleWalletNextPage = () => {
    this.props.navigation.navigate('WalletPassword', {email: this.state.ID});
  };
  handleKycNextPage = () => {
    this.props.navigation.navigate('Kyc');
  };
  loginApi = async (id, pass) => {
    // this.setModal5Visible(true);
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

        ///로그인 실험
        this.props.route.params?.loginSuccess(response.data.userNo);

        this.props.route.params?.loginSuccessAuth(response.data.userNo);
        let LOCK = await AsyncStorage.getItem('lock');
        console.log('LOCK>>>', LOCK);

        if (LOCK === null) {
          await AsyncStorage.setItem('lock', 'x,');
        }
        // console.log('LOCK', LOCK.slice(0, 1));
        // console.log('LOCK', LOCK.slice(0, 1));

        await AsyncStorage.setItem(
          'authToken',
          response.headers.authorization.slice(7, undefined),
        );
        await AsyncStorage.setItem('userNo', response.data.userNo);
        await AsyncStorage.setItem('email', this.state.ID);

        this.setState({
          loginCheck: response.data.status,
          hasWallet: response.data.hasWallet,
        });

        // return response.data.status;
      })
      .catch(async (error) => {
        console.log('loginApi ERROR >>', error.response.data);
        this.setState({
          loginCheck: error.response.data.status,
          hasWallet: error.response.data.hasWallet,
          errorMsg: error.response.data.msg,
        });
        console.log(
          'statestate',
          this.state.loginCheck,
          '--------',
          this.state.hasWallet,
          '--------',
          this.state.errorMsg,
        );
        if (error.response.data.msg === 'KycLevel1 Not Saved') {
          console.log('진입');
          await AsyncStorage.setItem('userNo', error.response.data.userNo);
        }
      });
    // this.setModal5Visible(false);
  };

  /////
  deviceKeyCheckApi = () => {
    console.log('deviceKeyCheckApi DEVICE KEY>>', DeviceInfo.getUniqueId());
    axios
      .get(
        `${server}/user/register/device-key?reqDeviceKey=${DeviceInfo.getUniqueId()}`,
      )
      .then((response) => {
        console.log('deviceKeyCheckApi THEN>>', response);

        this.setState({
          deviceCheck: response.data.ret_val,
        });
      })
      .catch((e) => {
        console.log('deviceKeyCheckApi ERROR>>', e);
        console.log('deviceKeyCheckApi ERROR>>', e.response);
      });
  };

  // useEffect(() => {
  //   if (deviceCheck === 0) {
  //     props.navigation.navigate('SignUp');
  //   } else if (deviceCheck !== 0 && deviceCheck !== 1) {
  //     setModal2Visible(true);
  //   }
  // }, [deviceCheck]);
  componentDidUpdate = (preProps, preState) => {
    if (preState.deviceCheck !== this.state.deviceCheck) {
      if (this.state.deviceCheck === 0) {
        this.setState({
          deviceCheck: 1,
        });
        this.props.navigation.navigate('SignUp');
      } else if (this.state.deviceCheck !== 0 && this.state.deviceCheck !== 1) {
        this.setModal6Visible(true);
      }
    }
  };
  /////
  render() {
    const {t} = this.props;
    console.log('DeviceInfo 키>>', DeviceInfo.getUniqueId());
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <View
              style={[
                {
                  marginTop: Platform.OS === 'ios' ? '25%' : '22%',
                  marginBottom: Platform.OS === 'ios' ? '8%' : '5%',
                },
              ]}>
              <Text
                style={[
                  ResetStyle.fontBoldE,
                  ResetStyle.fontB,
                  {textAlign: 'center', fontWeight: '600'},
                ]}>
                {t('LoginTitle')}
              </Text>

              <View>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {textAlign: 'center', marginTop: '1%'},
                  ]}>
                  {t('Login1')}
                </Text>
              </View>
            </View>

            <View style={[AuthStyle.loginBox]}>
              <TextInput
                style={[
                  ResetStyle.buttonWhite,
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {
                    marginBottom: '3%',
                    marginTop: Platform.OS === 'ios' ? '6%' : '5%',
                    textAlign: 'left',
                  },
                ]}
                placeholder={t('Login2')}
                placeholderTextColor="#a9a9a9"
                value={this.state.ID}
                autoCapitalize={'none'}
                // onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.handleID(text)}></TextInput>
              <TextInput
                style={[
                  ResetStyle.buttonWhite,
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {
                    marginBottom: Platform.OS === 'ios' ? '14%' : '8%',
                    textAlign: 'left',
                  },
                ]}
                placeholder={t('Login3')}
                placeholderTextColor="#a9a9a9"
                secureTextEntry={true}
                value={this.state.passWord}
                // onBlur={ () => this.onBlur() }
                onChangeText={(text) => this.handlePassword(text)}></TextInput>
              <TouchableOpacity
                style={ResetStyle.button}
                activeOpacity={0.75}
                onPress={async () => {
                  // api용;
                  this.setState({
                    hasWallet: '',
                  });
                  await this.loginApi(this.state.ID, this.state.passWord);
                  console.log('this.state.loginCheck', this.state.loginCheck);

                  if (this.state.loginCheck) {
                    if (this.state.hasWallet === -1) {
                      // this.setModal5Visible(false);
                      console.log('aaa');
                      this.setModalVisible(true);
                    } else {
                      this.props.navigation.navigate('Main');
                    }
                  } else {
                    if (this.state.errorMsg === 'KycLevel1 Not Saved') {
                      this.setModal3Visible(true);
                    } else if (this.state.errorMsg === 'DeviceKey Not Equal') {
                      this.setModal4Visible(true);
                    } else {
                      this.setModal2Visible(true);
                    }
                  }

                  //본부장님 테스트용
                  // // this.props.navigation.navigate('WalletPassword');
                  // this.props.route.params?.loginSuccess(
                  //   '5fd188217878d135df02c1bd',
                  // ),
                  //   await AsyncStorage.setItem(
                  //     'userNo',
                  //     '5fd188217878d135df02c1bd',
                  //   );
                }}>
                <Text
                  style={[
                    ResetStyle.fontMediumK,
                    ResetStyle.fontWhite,
                    {fontWeight: '600'},
                  ]}>
                  {t('Login4')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  this.props.navigation.navigate('Reset');
                }}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontB,
                    {marginTop: '6%', marginBottom: '3%'},
                  ]}>
                  {t('Login5')}
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
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginBottom: '3%'},
              ]}>
              {t('Login6')}
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                // this.props.navigation.navigate('SignUp');
                this.deviceKeyCheckApi();
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '400'},
                ]}>
                {t('Login7')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[AuthStyle.loginBottomTextBox, {marginTop: '5%'}]}>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontB]}>
              {t('Login8')}
            </Text>
          </View>
        </View>
        <TextConfirmModal
          modalVisible={this.state.modal3Visible}
          setModalVisible={this.setModal3Visible}
          text={t('Login9')}
          confirm={t('Login10')}
          handleNextPage={this.handleKycNextPage}
        />
        <TextConfirmModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={t('Login11')}
          confirm={t('Login12')}
          handleNextPage={this.handleWalletNextPage}
        />
        <BottomModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={t('Login13')}
        />
        <BottomModal
          modalVisible={this.state.modal4Visible}
          setModalVisible={this.setModal4Visible}
          text={t('Login14')}
        />
        <ProgressModal
          modalVisible={this.state.modal5Visible}
          setModalVisible={this.setModal5Visible}
        />
        <BottomModal
          modalVisible={this.state.modal6Visible}
          setModalVisible={this.setModal6Visible}
          text={t('login15')}
        />
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(Login), Login);
