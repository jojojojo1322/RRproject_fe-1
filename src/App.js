import React, {Component, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from './components/defined/CustomDrawerContent';
import {StyleSheet, ScrollView} from 'react-native';

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
import WalletReceive from './components/settings/wallet/WalletReceive';
import MainAlert from './components/main/MainAlert';
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
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletPassword"
          component={WalletPassword}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletMasterKey"
          component={WalletMasterKey}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Kyc"
          component={Kyc}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen name="ResetEmail" component={ResetEmail} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#FFF',
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
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="SignUpPersonal"
          component={SignUpPersonal}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="EmailAuthentication"
          component={EmailAuthentication}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="CompleteAuth"
          component={CompleteAuth}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ResearchForm"
          component={ResearchForm}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Initial3"
          component={Initial3}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="MainDetail"
          component={MainDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="MainDetailCompleted"
          component={MainDetailCompleted}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="MainDetailExpired"
          component={MainDetailExpired}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="MainVideo"
          component={MainVideo}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileMain"
          component={ProfileMain}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileAll"
          component={ProfileAll}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileCompleteDetail"
          component={ProfileCompleteDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileIncompleteDetail"
          component={ProfileIncompleteDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileComplete"
          component={ProfileComplete}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
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
    // console.log('appppappppapppapp');
    // console.log(this.state.isLogin);
    // console.log('appppappppapppapp');
    return (
      <Stack.Navigator
        // initialRouteName={this.state.isLogin ? 'Main' : 'Initial2'}>
        initialRouteName="Main">
        <Stack.Screen
          name="Initial2"
          component={Initial2}
          options={{
            headerShown: false,
            // title: this.props.route.params?.step,
            // title: route.params?.name,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletPassword"
          component={WalletPassword}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletMasterKey"
          component={WalletMasterKey}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="Kyc"
          component={Kyc}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="Reset"
          component={Reset}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen name="ResetEmail" component={ResetEmail} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#FFF',
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
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="SignUpPersonal"
          component={SignUpPersonal}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="EmailAuthentication"
          component={EmailAuthentication}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="CompleteAuth"
          component={CompleteAuth}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="ResearchForm"
          component={ResearchForm}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="Initial3"
          component={Initial3}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="MainDetail"
          component={MainDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="MainDetailCompleted"
          component={MainDetailCompleted}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="MainDetailExpired"
          component={MainDetailExpired}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="MainVideo"
          component={MainVideo}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        {/* <Stack.Screen
          name="MainVideoTest"
          component={MainVideoTest}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        /> */}

        <Stack.Screen
          name="ProfileMain"
          component={ProfileMain}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileAll"
          component={ProfileAll}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileCompleteDetail"
          component={ProfileCompleteDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileIncompleteDetail"
          component={ProfileIncompleteDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="ProfileComplete"
          component={ProfileComplete}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />

        {/* Wallet */}
        <Stack.Screen
          name="WalletMain"
          component={WalletMain}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletDetail"
          component={WalletDetail}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletSend"
          component={WalletSend}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
          }}
        />
        <Stack.Screen
          name="WalletReceive"
          component={WalletReceive}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#FFF',
              shadowColor: 'none',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            },
            headerTintColor: '#000',
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
      console.log('nullFalse');
      console.log(result);
      return result;
    } else {
      console.log('nullTrue');
      console.log(result);
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
  }, []);
  console.log('~~~~~~~', login);
  if (login !== null) {
    console.log('notNULNULMNUL');
    return (
      <NavigationContainer>
        {/* <Main /> */}
        <Drawer.Navigator
          initialRouteName="설문조사"
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
          <Drawer.Screen name="초기" component={AppMainStack} />
          <Drawer.Screen name="설문조사" component={Main} />
          <Drawer.Screen name="설문조사 의뢰하기" component={Main} />
          <Drawer.Screen name="미디어" component={Main} />
          <Drawer.Screen name="알림" component={MainAlert} />
          <Drawer.Screen name="설정" component={ProfileMain} />
          <Drawer.Screen name="초대코드" component={Main} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    console.log('NULBUBUBUBUBUBUBU');
    return (
      <NavigationContainer>
        {/* <Main /> */}
        <AppAuthStack />
      </NavigationContainer>
    );
  }
};
export default App;
