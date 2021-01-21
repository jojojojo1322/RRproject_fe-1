import React, {Component, useEffect, useState} from 'react';
import Orientation from 'react-native-orientation-locker';

import firebase from '@react-native-firebase/app';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from './components/defined/CustomDrawerContent';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from './components/Loading';
import Initial2 from './components/Initial2';
import Initial3 from './components/Initial3';

import Login from './components/login/Login';
import WalletPassword from './components/login/WalletPassword';
import WalletMasterKey from './components/login/WalletMasterKey';

import Kyc from './components/kyc/Kyc';

import Main from './components/main/Main';
import MainDetail from './components/main/MainDetail';
import MainDetailCompleted from './components/main/MainDetailCompleted';
import MainDetailExpired from './components/main/MainDetailExpired';
import MainVideo from './components/main/MainVideo';
// import MainVideoTest from './components/main/MainVideoTest';

import Media from './Media';
import RequestResearch from './RequestResearch';

import SignUp from './components/signup/SignUp';
import AgreementTermsConditions from './components/signup/AgreementTermsConditions';
import TermsConditions from './components/signup/TermsConditions';
import SignUpPersonal from './components/signup/SignUpPersonal';
import EmailAuthentication from './components/signup/EmailAuthentication';
import CompleteAuth from './components/signup/CompleteAuth';

import ResearchForm from './components/research/ResearchForm';
import Reset from './components/resetPassword/Reset';
import ResetEmail from './components/resetPassword/ResetEmail';
import ResetPassword from './components/resetPassword/ResetPassword';

import ProfileMain from './components/settings/profile/ProfileMain';
import ProfileAll from './components/settings/profile/ProfileAll';
import ProfileComplete from './components/settings/profile/ProfileComplete';
import ProfileCompleteDetail from './components/settings/profile/ProfileCompleteDetail';
import ProfileIncompleteDetail from './components/settings/profile/ProfileIncompleteDetail';

import WalletMain from './components/settings/wallet/WalletMain';
import WalletDetail from './components/settings/wallet/WalletDetail';
import WalletSend from './components/settings/wallet/WalletSend';
import WalletSendQR from './components/settings/wallet/WalletSendQR';
import WalletSendSuccess from './components/settings/wallet/WalletSendSuccess';
import WalletReceive from './components/settings/wallet/WalletReceive';
import WalletConfirmPassword from './components/settings/wallet/WalletConfirmPassword';
import MainAlert from './components/main/MainAlert';

import Settings from './components/settings/settingsDetail/Settings';

import SettingsAlert from './components/settings/settingsDetail/SettingsAlert';

import SettingsWallet from './components/settings/settingsDetail/SettingsWallet';
import SettingsWalletMasterKey from './components/settings/settingsDetail/SettingsWalletMasterKey';
import SettingsWalletPassword from './components/settings/settingsDetail/SettingsWalletPassword';
import SettingsLanguage from './components/settings/settingsDetail/SettingsLanguage';
import SettingsLock from './components/settings/settingsDetail/lock/SettingsLock';
import SettingsLockPattern from './components/settings/settingsDetail/lock/SettingsLockPattern';
import SettingsLockPassword from './components/settings/settingsDetail/lock/SettingsLockPassword';

import SettingsPersonal from './components/settings/settingsDetail/personal/SettingsPersonal';
import SettingsPersonalPassword from './components/settings/settingsDetail/personal/SettingsPersonalPassword';
import SettingsPersonalPasswordChange from './components/settings/settingsDetail/personal/SettingsPersonalPasswordChange';
import SettingsPersonalEmail from './components/settings/settingsDetail/personal/SettingsPersonalEmail';
import SettingsPersonalResetPassword from './components/settings/settingsDetail/personal/SettingsPersonalResetPassword';
import SettingsPersonalPhone from './components/settings/settingsDetail/personal/SettingsPersonalPhone';
import SettingsPersonalMasterPhone from './components/settings/settingsDetail/personal/SettingsPersonalMasterPhone';
import SettingsPersonalMasterKey from './components/settings/settingsDetail/personal/SettingsPersonalMasterKey';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export class AppAuthStack extends Component {
  state = {
    isLoading: true,
    isLogin: false,
  };
  // componentDidMount = async () => {
  //   const login = await AsyncStorage.getItem('userNo');
  //   console.log('loginConsole', login);
  //   if (login !== null) {
  //     console.log('loginSuccess');
  //     this.setState({
  //       isLogin: true,
  //     });
  //   }
  // };
  render() {
    // console.log('appppappppapppapp');
    // console.log(this.state.isLogin);
    // console.log('appppappppapppapp');
    return (
      <Stack.Navigator initialRouteName="Initial2">
        {/* // initialRouteName="Main"> */}
        <Stack.Screen
          name="Initial2"
          component={Initial2}
          options={{
            headerShown: false,
            // title: this.props.route.params?.step,
            // title: route.params?.name,
            // title: '',
            // headerStyle: {
            //   backgroundColor: '#FFF',
            //   shadowColor: 'none',
            //   shadowOffset: {width: 0, height: 0},
            //   shadowOpacity: 0,
            //   shadowRadius: 0,
            //   elevation: 0,
            // },
            // headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletPassword"
          component={WalletPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletMasterKey"
          component={WalletMasterKey}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Kyc"
          component={Kyc}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetEmail"
          component={ResetEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            // headerLeft: () => (
            //   <TouchableOpacity activeOpacity={0.75} onPress={() => {
            //     this.props.navigation.goBack();
            //   }}
            //   >
            //     <View>
            //       <Image />
            //       <Text>이메일 인증</Text>
            //     </View>
            //   </TouchableOpacity>
            // ),
            // headerRight: () => (
            //   <TouchableOpacity activeOpacity={0.75} onPress={() => {
            //     this.props.navigation.goBack();
            //   }}
            //   >
            //     <View>
            //       <Image />
            //       <Text>이메일 인증</Text>
            //     </View>
            //   </TouchableOpacity>
            // ),
          }}
        />
        <Stack.Screen
          name="AgreementTermsConditions"
          component={AgreementTermsConditions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpPersonal"
          component={SignUpPersonal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailAuthentication"
          component={EmailAuthentication}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CompleteAuth"
          component={CompleteAuth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResearchForm"
          component={ResearchForm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Initial3"
          component={Initial3}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetail"
          component={MainDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetailCompleted"
          component={MainDetailCompleted}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainDetailExpired"
          component={MainDetailExpired}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileMain"
          component={ProfileMain}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileAll"
          component={ProfileAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileCompleteDetail"
          component={ProfileCompleteDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileIncompleteDetail"
          component={ProfileIncompleteDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileComplete"
          component={ProfileComplete}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
export class AppMainStack extends Component {
  state = {
    isLoading: true,
    isLogin: false,
  };
  // componentDidMount = async () => {
  //   const login = await AsyncStorage.getItem('userNo');
  //   console.log('loginConsole', login);
  //   if (login !== null) {
  //     console.log('loginSuccess');
  //     this.setState({
  //       isLogin: true,
  //     });
  //   }
  // };
  render() {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Initial2"
          component={Initial2}
          options={{
            headerShown: false,
            // title: this.props.route.params?.step,
            // title: route.params?.name,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletPassword"
          component={WalletPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletMasterKey"
          component={WalletMasterKey}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Kyc"
          component={Kyc}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetEmail"
          component={ResetEmail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            // headerLeft: () => (
            //   <TouchableOpacity activeOpacity={0.75} onPress={() => {
            //     this.props.navigation.goBack();
            //   }}
            //   >
            //     <View>
            //       <Image />
            //       <Text>이메일 인증</Text>
            //     </View>
            //   </TouchableOpacity>
            // ),
            // headerRight: () => (
            //   <TouchableOpacity activeOpacity={0.75} onPress={() => {
            //     this.props.navigation.goBack();
            //   }}
            //   >
            //     <View>
            //       <Image />
            //       <Text>이메일 인증</Text>
            //     </View>
            //   </TouchableOpacity>
            // ),
          }}
        />

        <Stack.Screen
          name="AgreementTermsConditions"
          component={AgreementTermsConditions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpPersonal"
          component={SignUpPersonal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailAuthentication"
          component={EmailAuthentication}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CompleteAuth"
          component={CompleteAuth}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ResearchForm"
          component={ResearchForm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Initial3"
          component={Initial3}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MainDetail"
          component={MainDetail}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MainDetailCompleted"
          component={MainDetailCompleted}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MainDetailExpired"
          component={MainDetailExpired}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MainVideo"
          component={MainVideo}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ProfileMain"
          component={ProfileMain}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileAll"
          component={ProfileAll}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileCompleteDetail"
          component={ProfileCompleteDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileIncompleteDetail"
          component={ProfileIncompleteDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileComplete"
          component={ProfileComplete}
          options={{
            headerShown: false,
          }}
        />

        {/* Wallet */}
        <Stack.Screen
          name="WalletMain"
          component={WalletMain}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletDetail"
          component={WalletDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletSend"
          component={WalletSend}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletConfirmPassword"
          component={WalletConfirmPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletReceive"
          component={WalletReceive}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletSendSuccess"
          component={WalletSendSuccess}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsLock"
          component={SettingsLock}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsWallet"
          component={SettingsWallet}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsWalletMasterKey"
          component={SettingsWalletMasterKey}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsWalletPassword"
          component={SettingsWalletPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsLockPassword"
          component={SettingsLockPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsLockPattern"
          component={SettingsLockPattern}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonal"
          component={SettingsPersonal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalPassword"
          component={SettingsPersonalPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalPasswordChange"
          component={SettingsPersonalPasswordChange}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalEmail"
          component={SettingsPersonalEmail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalResetPassword"
          component={SettingsPersonalResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalPhone"
          component={SettingsPersonalPhone}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalMasterPhone"
          component={SettingsPersonalMasterPhone}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsPersonalMasterKey"
          component={SettingsPersonalMasterKey}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsAlert"
          component={SettingsAlert}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SettingsLanguage"
          component={SettingsLanguage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Media"
          component={Media}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RequestResearch"
          component={RequestResearch}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletSendQR"
          component={WalletSendQR}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainAlert"
          component={MainAlert}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
const test = async () => {
  // return typeof (await AsyncStorage.getItem('userNo')) == String
  try {
    // const result = typeof (await AsyncStorage.getItem('userNo'));
    // if (result == 'string') {
    const result = await AsyncStorage.getItem('userNo');
    if (result === null) {
      return result;
    } else {
      return result;
    }
  } catch (e) {
    return e;
  }
};

// const getAllRedis = async (key) => {
//   let obj = [];

//   await client.hgetall(key, (err, object) => {
//     console.log(object);
//     _.map(object, (ob)=>{
//       obj.push(JSON.parse(ob));
//     })
//     return obj;
//     // res.send(obj);
// });
// }

const App = () => {
  const [login, setLogin] = useState(null);
  const test = async () => {
    // return typeof (await AsyncStorage.getItem('userNo')) == String
    try {
      // const result = typeof (await AsyncStorage.getItem('userNo'));
      // if (result == 'string') {
      const result = await AsyncStorage.getItem('userNo');
      if (result === null) {
        setLogin(result);
      } else {
        setLogin(result);
      }
    } catch (e) {
      return e;
    }
  };
  useEffect(() => {
    test();
    Orientation.lockToPortrait();
    SplashScreen.hide();
    firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          firebase
            .messaging()
            .getToken()
            .then((token) => {
              console.log('LOG: ', token);
            });
          // user has permissions
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              alert('User Now Has Permission');
            })
            .catch((error) => {
              alert('Error', error);
              // User has rejected permissions
            });
        }
      });
  }, []);
  if (login !== null) {
    return (
      <NavigationContainer>
        {/* <Main /> */}
        <Drawer.Navigator
          initialRouteName="초기"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerPosition="right"
          drawerStyle={{
            width: '80%',
            backgroundColor: '#FFF',
          }}
          drawerContentOptions={{
            itemStyle: {
              marginVertical: 1,
              margin: 0,
            },
          }}>
          {/* <Drawer.Screen name="설문조사" component={Main} />
          <Drawer.Screen name="설문조사 의뢰하기" component={RequestResearch} />
          <Drawer.Screen name="미디어" component={Media} />
          <Drawer.Screen name="알림" component={MainAlert} />
          <Drawer.Screen name="설정" component={Settings} />
          <Drawer.Screen name="초대코드" component={Main} /> */}
          <Drawer.Screen
            name="초기"
            component={AppMainStack}
            options={() => ({
              drawerLabel: () => null,
              title: undefined,
              drawerIcon: () => null,
            })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {/* <Main /> */}
        <AppAuthStack />
      </NavigationContainer>
    );
  }
};
export default App;
