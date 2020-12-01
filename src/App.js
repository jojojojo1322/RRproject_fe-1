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

import SignUp from './components/signup/SignUp';
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
          <Stack.Screen
            name="Initial2"
            component={Initial2}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'none',
                shadowColor: 'none',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
              },
              headerTintColor: '#000',
            }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="WalletPassword" component={WalletPassword} />
          <Stack.Screen name="WalletMasterKey" component={WalletMasterKey} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'none',
                shadowColor: 'none',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
              },
              headerTintColor: '#000',
              // headerLeft: () => (
              //   <TouchableHighlight activeOpacity={0.75} onPress={() => {
              //     this.props.navigation.goBack();
              //   }}
              //   >
              //     <View>
              //       <Image />
              //       <Text>이메일 인증</Text>
              //     </View>
              //   </TouchableHighlight>
              // ),
              // headerRight: () => (
              //   <TouchableHighlight activeOpacity={0.75} onPress={() => {
              //     this.props.navigation.goBack();
              //   }}
              //   >
              //     <View>
              //       <Image />
              //       <Text>이메일 인증</Text>
              //     </View>
              //   </TouchableHighlight>
              // ),
            }}
          />
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

// import React, {Component} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
// import Loading from './components/Loading';
// import Initial2 from './components/Initial2';
// import Initial3 from './components/Initial3';
// import Login from './components/login/Login';
// import SignUp from './components/signup/SignUp';
// import ResearchForm from './components/research/ResearchForm';
// import {TouchableHighlight} from 'react-native-gesture-handler';

// const Stack = createStackNavigator();
// class App extends Component {
//   state = {
//     isLoading: true,
//   };
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Initial2">
//           <Stack.Screen
//             name="Initial2"
//             component={Initial2}
//             options={{
//               title: '',
//               headerStyle: {
//                 backgroundColor: 'none',
//                 shadowColor: 'none',
//                 shadowOffset: {width: 0, height: 0},
//                 shadowOpacity: 0,
//                 shadowRadius: 0,
//                 elevation: 0,
//               },
//               headerTintColor: '#000',
//             }}
//           />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{
//               title: '',
//               headerStyle: {
//                 backgroundColor: 'none',
//                 shadowColor: 'none',
//                 shadowOffset: {width: 0, height: 0},
//                 shadowOpacity: 0,
//                 shadowRadius: 0,
//                 elevation: 0,
//               },
//               headerTintColor: '#000',
//               // headerLeft: () => (
//               //   <TouchableHighlight activeOpacity={0.75} onPress={() => {
//               //     this.props.navigation.goBack();
//               //   }}
//               //   >
//               //     <View>
//               //       <Image />
//               //       <Text>이메일 인증</Text>
//               //     </View>
//               //   </TouchableHighlight>
//               // ),
//               // headerRight: () => (
//               //   <TouchableHighlight activeOpacity={0.75} onPress={() => {
//               //     this.props.navigation.goBack();
//               //   }}
//               //   >
//               //     <View>
//               //       <Image />
//               //       <Text>이메일 인증</Text>
//               //     </View>
//               //   </TouchableHighlight>
//               // ),
//             }}
//           />
//           <Stack.Screen name="ResearchForm" component={ResearchForm} />
//           <Stack.Screen name="Initial3" component={Initial3} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;