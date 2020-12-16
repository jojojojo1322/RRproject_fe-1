import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet, ScrollView} from 'react-native';

import Loading from './components/Loading';
import Initial2 from './components/Initial2';
import Initial3 from './components/Initial3';

import Login from './components/login/Login';
import WalletPassword from './components/login/WalletPassword';
import WalletMasterKey from './components/login/WalletMasterKey';

import Kyc from './components/kyc/Kyc';

import Main from './components/main/Main';
import MainDetail from './components/main/MainDetail';
import MainDetailExpired from './components/main/MainDetailExpired';
import MainVideo from './components/main/MainVideo';

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
import ProfileCompleteDetail from './components/settings/profile/ProfileCompleteDetail';
import ProfileIncompleteDetail from './components/settings/profile/ProfileIncompleteDetail';
import ProfileComplete from './components/settings/profile/ProfileComplete';

const Stack = createStackNavigator();

class App extends Component {
  state = {
    isLoading: true,
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Initial2">
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
      </NavigationContainer>
    );
  }
}

export default App;
