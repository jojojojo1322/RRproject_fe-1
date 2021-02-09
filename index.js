/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
// import Splash from './src/Splash';

import {name as appName} from './app.json';
import './src/components/defined/i18n';

// Register background handler
async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
}
requestUserPermission();
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
// function HeadlessCheck({isHeadless}) {
//   //   if (isHeadless) {
//   //     // App has been launched in the background by iOS, ignore
//   //     return null;
//   //   }

//   return App;
// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);
AppRegistry.registerComponent(appName, () => App);
