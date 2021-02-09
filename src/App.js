import React, {Component, useEffect, useState} from 'react';
import Orientation from 'react-native-orientation-locker';
//언어추출
import {NativeModules, Platform} from 'react-native';
//파이어 베이스
import firebase from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import buildLink from './components/defined/DynamicLinksInvite';
import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './components/defined/CustomDrawerContent';
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
import MainVideoComplete from './components/main/MainVideoComplete';

import IdVerification from './components/idVerification/IdVerification';
import IdVerificationComplete from './components/idVerification/IdVerificationInProgress';
import IdVerificationInProgress from './components/idVerification/IdVerificationComplete';
import IdVerificationDecline from './components/idVerification/IdVerificationDecline';
import IdVerificationSorry from './components/idVerification/IdVerificationSorry';
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
import ProfileIncompleteLevel2 from './components/settings/profile/ProfileIncompleteLevel2';
import ProfileCompleteLevel1 from './components/settings/profile/ProfileCompleteLevel1';
import ProfileCompleteLevel2 from './components/settings/profile/ProfileCompleteLevel2';

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
import RNRestart from 'react-native-restart';
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export const AppMainStack = (props) => {
  const [login, setLogin] = useState(null);

  const test = async () => {
    try {
      const result = await AsyncStorage.getItem('userNo');

      console.log('login NEXT');
      setLogin(result);
    } catch (e) {
      return e;
    }
  };
  const loginSuccess = (userNo) => {
    setLogin(userNo);
  };

  useEffect(() => {
    test();
    console.log(props);
  }, []);
  console.log('this.props.route.params?.login>?>?>', login);
  return (
    // <Stack.Navigator initialRouteName="Main">
    <Stack.Navigator initialRouteName="Main">
      {/* {this.state.login === null ? (
          <Stack.Screen
            name="Main"
            component={Initial2}
            options={{
              headerShown: false,
              // title: this.props.route.params?.step,
              // title: route.params?.name,
            }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
        )} */}
      {login === null ? (
        <Stack.Screen
          name="Initial2"
          component={Initial2}
          options={{
            headerShown: false,

            // title: this.props.route.params?.step,
            // title: route.params?.name,
          }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      )}
      {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Initial2"
          component={Initial2}
          options={{
            headerShown: false,
            // title: this.props.route.params?.step,
            // title: route.params?.name,
          }}
        /> */}
      {/* {this.props.route.params?.login !== null ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={Initial2}
            options={{
              headerShown: false,
              // title: this.props.route.params?.step,
              // title: route.params?.name,
            }}
          />
        )} */}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
        initialParams={{
          loginSuccess: props.route.params?.loginSuccess,
          loginSuccessAuth: loginSuccess,
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
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Initial3"
        component={Initial3}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        /> */}

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
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="MainVideoComplete"
        component={MainVideoComplete}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="ProfileMain"
        component={ProfileMain}
        options={{
          headerShown: false,
          gestureEnabled: false,
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
        name="ProfileIncompleteLevel2"
        component={ProfileIncompleteLevel2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileCompleteLevel2"
        component={ProfileCompleteLevel2}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileCompleteLevel1"
        component={ProfileCompleteLevel1}
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
          gestureEnabled: false,
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
      <Stack.Screen
        name="IdVerification"
        component={IdVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdVerificationInProgress"
        component={IdVerificationInProgress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdVerificationComplete"
        component={IdVerificationComplete}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdVerificationDecline"
        component={IdVerificationDecline}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdVerificationSorry"
        component={IdVerificationSorry}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [login, setLogin] = useState(null);
  const test = async () => {
    try {
      const result = await AsyncStorage.getItem('userNo');
      if (result === null) {
        console.log('login PREVVV');
        setLogin(result);
      } else {
        console.log('login NEXT');
        setLogin(result);
      }
    } catch (e) {
      return e;
    }
  };
  // device Language AsyncStorage
  const deviceLanguageSet = async () => {
    var deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    if (deviceLanguage.slice(0, 2) == 'en') {
      deviceLanguage = deviceLanguage.slice(0, 2);
    } else if (deviceLanguage.slice(0, 2) == 'ko') {
      deviceLanguage = deviceLanguage.slice(0, 2);
    } else if (deviceLanguage.slice(0, 2) == 'es') {
      deviceLanguage = deviceLanguage.slice(0, 2);
    } else if (deviceLanguage.slice(0, 2) == 'pt') {
      deviceLanguage = deviceLanguage.slice(0, 2);
    } else if (deviceLanguage.slice(0, 2) == 'ru') {
      deviceLanguage = deviceLanguage.slice(0, 2);
    } else {
      deviceLanguage = 'en';
    }
    await AsyncStorage.setItem('deviceLanguage', deviceLanguage);
  };

  const loginSuccess = ({userNo}) => {
    setLogin(userNo);
    // RNRestart.Restart();
  };
  useEffect(() => {
    // console.log('device', deviceLanguageSet());
    deviceLanguageSet();
    test();
    Orientation.lockToPortrait();
    SplashScreen.hide();

    //파이어베이스 알림 권환획득 및 토큰 출력
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
            // 안됨
            .requestPermission()
            .then(() => {
              // alert('User Now Has Permission');
            })
            .catch((error) => {
              // alert('Error', error);
              // User has rejected permissions
            });
        }
      });

    //동적링크
    // dynamicLinks()
    //   .getInitialLink()
    //   .then((link) => {
    //     handleDynamicLink(link);
    //   });
    // const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    // return () => {
    //   linkingListener();
    // };
    console.log('link>>>>>>>>>>>', buildLink);
  }, []);

  useEffect(() => {
    test();
  }, [login]);
  // if (login !== null) {
  return (
    <NavigationContainer>
      {/* <Main /> */}
      <Drawer.Navigator
        // initialRouteName={AppAuthStack}
        // screenOptions={
        //   {
        //     // drawerLockMode: 'locked-open',
        //     // gestureEnabled: false,
        //     // swipeEnabled: false,
        //   }
        // }
        drawerContent={(props) => (
          <CustomDrawerContent {...props} login={login} />
        )}
        drawerPosition="right"
        drawerStyle={{
          width: '80%',
          backgroundColor: '#FFF',
        }}
        drawerContentOptions={{
          drawerLockMode: 'locked-close',
          itemStyle: {
            marginVertical: 1,
            margin: 0,
          },
        }}>
        {/* {login !== null ? ( */}
        <Drawer.Screen
          name="초기"
          component={AppMainStack}
          initialParams={{loginSuccess: loginSuccess}}
          options={() => ({
            drawerLabel: () => null,
            title: undefined,
            drawerIcon: () => null,
            // drawerLockMode: 'locked-opened',
            swipeEnabled: false,
            // gestureEnabled: false,
          })}
        />

        {/* <Drawer.Screen
          name="초기"
          // component={login !== null ? AppMainStack : AppAuthStack}
          component={
            login !== null ? AppMainStack : AppAuthStack
          }
          // options={() => ({
          //   drawerLabel: () => null,
          //   title: undefined,
          //   drawerIcon: () => null,
          // })}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
  // } else {
  //   return (
  //     <NavigationContainer>
  //       {/* <Main /> */}
  //       <AppAuthStack />
  //     </NavigationContainer>
  //   );
  // }
};
export default App;
