import React, {Component, useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

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
  BackHandler,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import WalletPassword from './WalletPassword';
import WalletMasterKey from './WalletMasterKey';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';
import BottomModal from '@factory/modal/BottomModal';
import ProgressModal from '@factory/modal/ProgressModal';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import {getUserInfo, signIn} from '@module/auth';

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

const Login = ({navigation, history}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [ID, setID] = useState('');
  const [passWord, setPassWord] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);
  const [modal6Visible, setModal6Visible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [text, setText] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);
  const [hasWallet, setHasWallet] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [deviceCheck, setDeviceCheck] = useState(1);

  const {loginPayload} = useSelector(({auth}) => ({
    loginPayload: auth.loginPayload,
  }));

  const handleBack = () => {
    history.goBack();
  };
  const handleWalletNextPage = () => {
    navigation.navigate('WalletPassword', {email: ID});
  };
  const handleKycNextPage = () => {
    navigation.navigate('Kyc');
  };

  // const loginApi = async (id, pass) => {
  //   return await axios
  //       // route.params?.loginSuccessAuth(response.data.userNo);
  //       // let LOCK = await AsyncStorage.getItem('lock');

  //       // if (LOCK === null) {
  //       //   await AsyncStorage.setItem('lock', 'x,');
  //       // }

  //       // await AsyncStorage.setItem(
  //       //   'authToken',
  //       //   response.headers.authorization.slice(7, undefined),
  //       // );
  //       setLoginCheck(response.data.status);
  //       setHasWallet(response.data.status);
  //       return response.data;
  //     })
  //     .catch(async (error) => {
  //       setLoginCheck(error.response.data.status);
  //       setHasWallet(error.response.data.hasWallet);
  //       setErrorMsg(error.response.data.msg);
  //       return error.response.data;
  //     });
  // };

  const deviceKeyCheckApi = () => {
    axios
      .get(
        `${server}/user/register/device-key?reqDeviceKey=${DeviceInfo.getUniqueId()}`,
      )
      .then((response) => {
        setDeviceCheck(response.data.ret_val);
      })
      .catch((e) => {});
  };

  const handleSignIn = () => {
    dispatch(
      signIn({
        deviceKey: DeviceInfo.getUniqueId(),
        email: ID,
        password: passWord,
      }),
    );
  };
  useEffect(() => {
    if (loginPayload) {
      if (loginPayload.status === true) {
        if (loginPayload.hasWallet === -1) {
          setModal5Visible(false);
          setModalVisible(true);
        } else {
          navigation.navigate('Main');
          AsyncStorage.setItem('email', ID);
          AsyncStorage.setItem('password', passWord);
          AsyncStorage.setItem('deviceKey', DeviceInfo.getUniqueId());
        }
        dispatch(getUserInfo({userNo: loginPayload.userNo}));
      } else if (loginPayload.status === false) {
        if (loginPayload.msg === 'KycLevel1 Not Saved') {
          setModal3Visible(true);
          AsyncStorage.setItem('userNo', loginPayload.userNo);
        } else if (loginPayload.msg === 'DeviceKey Not Equal') {
          setModal4Visible(true);
        } else if (loginPayload.msg === 'Password Not Equal') {
          setModal2Visible(true);
        } else if (loginPayload.msg === 'User Not Found') {
          setModal2Visible(true);
        }
      }
    }
  }, [loginPayload]);

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        navigation.goBack();
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onAndroidBackPress,
          );
        }
      };
    }, []),
  );

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
              value={ID}
              autoCapitalize={'none'}
              // onBlur={ () => this.onBlur() }
              onChangeText={(e) => setID(e)}></TextInput>
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
              value={passWord}
              // onBlur={ () => this.onBlur() }
              onChangeText={(e) => setPassWord(e)}></TextInput>
            <TouchableOpacity
              style={ResetStyle.button}
              activeOpacity={0.75}
              onPress={() => handleSignIn()}>
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
                navigation.navigate('Reset');
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
              deviceKeyCheckApi();
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
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('Login9')}
        confirm={t('Login10')}
        handleNextPage={handleKycNextPage}
      />
      <TextConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('Login11')}
        confirm={t('Login12')}
        handleNextPage={handleWalletNextPage}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('Login13')}
      />
      <BottomModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
        text={t('Login14')}
      />
      <ProgressModal
        modalVisible={modal5Visible}
        setModalVisible={setModal5Visible}
      />
      <BottomModal
        modalVisible={modal6Visible}
        setModalVisible={setModal6Visible}
        text={t('login15')}
      />
    </SafeAreaView>
  );
};

export default Login;
