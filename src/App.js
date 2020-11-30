import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, ScrollView} from 'react-native';
import Loading from './components/Loading';
import Initial2 from './components/Initial2';
import Initial3 from './components/Initial3';
import Login from './components/login/Login';
import Signup from './components/Signup';
import ResearchForm from './components/research/ResearchForm';

const Stack = createStackNavigator();
class App extends Component {
  state = {
    isLoading: true,
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Initial2">
          <Stack.Screen name="Initial2" component={Initial2} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResearchForm" component={ResearchForm} />
          <Stack.Screen name="Initial3" component={Initial3} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
