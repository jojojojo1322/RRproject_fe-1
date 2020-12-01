import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, ScrollView} from 'react-native';

import Login from './Login';
import WalletPassword from './WalletPassword';

const LoginTab = createStackNavigator();
class LoginStack extends Component {
  render() {
    return (
      //   <NavigationContainer>
      //   <Stack.Navigator initialRouteName="Login">
      <LoginTab.Navigator>
        <LoginTab.Screen name="Login" component={Login} />
        <LoginTab.Screen name="WalletPassword" component={WalletPassword} />
      </LoginTab.Navigator>
      //   </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginStack;
