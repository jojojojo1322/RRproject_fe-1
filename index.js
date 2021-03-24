/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import App from './src/App';
import Wrapper from './src/Wrapper';
// import Splash from './src/Splash';

import {name as appName} from './app.json';

// function HeadlessCheck({isHeadless}) {
//   //   if (isHeadless) {
//   //     // App has been launched in the background by iOS, ignore
//   //     return null;
//   //   }

//   return App;
// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);
AppRegistry.registerComponent(appName, () => Wrapper);
