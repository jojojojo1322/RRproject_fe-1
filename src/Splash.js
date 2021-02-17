import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Alert,
  Platform,
  Animated,
  Text,
  StyleSheet,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  openSettings,
  checkMultiple,
} from 'react-native-permissions';
import RNExitApp from 'react-native-exit-app';
import messaging from '@react-native-firebase/messaging';
// import Geolocation from 'react-native-geolocation-service';
// import UpdateModal from './components/factory/modal/UpdateModal';

import SplashScreen from 'react-native-splash-screen';
import ResetStyle from './style/ResetStyle';
import ProgressBarExample from './components/defined/ProgressBarExample';

const Splash = ({loading, setLoading}) => {
  // splash에서 보여질 gif유지 시간
  const time = 3000;

  const requestPermission = async (device) => {
    try {
      if (Platform.OS === 'ios') {
        return await checkMultiple([
          device.CAMERA,
          device.PHOTO_LIBRARY,
          device.FACE_ID,
        ]);
      } else if (Platform.OS === 'android') {
        return await checkMultiple([
          device.CAMERA,
          device.READ_EXTERNAL_STORAGE,
          device.WRITE_EXTERNAL_STORAGE,
          device.RECORD_AUDIO,
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFirebasePermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  };

  const resultClassification = (result) => {
    let notGrantedArr = {
      DENIED: [],
      BLOCKED: [],
    };

    Object.keys(result).forEach((key) => {
      if (result[key] === RESULTS.DENIED) {
        notGrantedArr.DENIED.push(key);
      } else if (result[key] === RESULTS.BLOCKED) {
        notGrantedArr.BLOCKED.push(key);
      }
    });

    return notGrantedArr;
  };

  const handlePermission = async () => {
    // if (Platform.OS === 'ios') {
    //   //  for ios
    //   console.log('ios true');
    //   setLoading(true);
    // } else {
    //   // for android
    //   console.log('android true');
    //   setLoading(true);
    // }

    try {
      const device =
        Platform.OS === 'ios' ? PERMISSIONS.IOS : PERMISSIONS.ANDROID;

      requestPermission(device).then((res) => {
        const {DENIED, BLOCKED} = resultClassification(res);
        const notGrantedArr = [...DENIED, ...BLOCKED];

        const reQuestion = async () => {
          if (notGrantedArr.length === 0) {
            setLoading(true);
          } else {
            await requestMultiple(notGrantedArr).then((res) => {
              console.log(res);
              const {DENIED, BLOCKED} = resultClassification(res);

              if (Platform.OS === 'ios') {
                //  for ios

                setLoading(true);
              } else {
                //for android
                if (DENIED.length > 0) {
                  RNExitApp.exitApp();
                } else if (BLOCKED.length > 0) {
                  openSettingAlert();
                } else {
                  setLoading(true);
                }
              }
            });
          }
        };
        reQuestion();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const openSettingAlert = () => {
    Alert.alert(
      'Real Research',
      "퍼미션 거부 + Don't ask again(다시 묻지 않음) 체크 박스를 설정한 경우로 설정에서 퍼미션 허가해야합니다.",
      [
        {
          text: 'Cancel',
          onPress: () => RNExitApp.exitApp(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => openSettings()},
      ],
      {cancelable: false},
    );
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();

      // 버전 확인
      // handleFirebasePermission();
      // requestUserPermission();
      handlePermission();

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });
    }, time);
  }, []);

  return (
    <View
      style={[
        ResetStyle.container,
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Image
        style={{
          width: 80,
          height: 100,
          resizeMode: 'contain',
          marginTop: '20%',
        }}
        source={require('./imgs/splashLogo.png')}
      />
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontB,
          {marginTop: '60%', marginBottom: '20%'},
        ]}>
        블록체인 기반의 설문조사
      </Text>
      <ProgressBarExample />
    </View>
  );
};

export default Splash;
