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
// import UpdateModal from '@factory/modal/UpdateModal';

import SplashScreen from 'react-native-splash-screen';
import ResetStyle from '@style/ResetStyle';
import ProgressBarExample from '@defined/ProgressBarExample';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {getUserInfo, signIn} from '@module/auth';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getTNCInfo} from '@module/tnc';
import {initializeResult} from '@module/auth';

const Splash = ({loading, setLoading}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
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
      '권한 거부와 다시 묻지 않음을 체크한 경우로 설정에서 권한을 허가해야합니다.',
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
  const [autologinId, setAutologinId] = useState(null);
  const [autologinPw, setAutologinPw] = useState(null);
  const [autologinKey, setAutologinKey] = useState(null);

  const {loginPayload, user} = useSelector(({auth}) => ({
    loginPayload: auth.loginPayload,
    user: auth.user,
  }));

  const loadInitialData = async () => {
    try {
      await AsyncStorage.getItem('email').then((res) => {
        if (res) {
          setAutologinId(res);
        }
      });
      await AsyncStorage.getItem('password').then((res) => {
        if (res) {
          setAutologinPw(res);
        }
      });
      await AsyncStorage.getItem('deviceKey').then((res) => {
        if (res) {
          setAutologinKey(res);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user.userNo !== '') {
      dispatch(getTNCInfo(user.mailId));
    }
  }, [user]);

  useEffect(() => {
    if (loginPayload) {
      if (loginPayload.status === true) {
        dispatch(getUserInfo({userNo: loginPayload.userNo}));
      } else if (loginPayload.status === false) {
        dispatch(initializeResult());
      }
    }
  }, [loginPayload]);

  useEffect(() => {
    if (autologinKey && autologinId && autologinPw) {
      dispatch(
        signIn({
          deviceKey: autologinKey,
          email: autologinId,
          password: autologinPw,
        }),
      );
    }
  }, [autologinKey, autologinId, autologinPw]);

  useEffect(() => {
    SplashScreen.hide();
    loadInitialData();
    setTimeout(() => {
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
        source={require('@images/splashLogo.png')}
      />
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontB,
          {marginTop: '60%', marginBottom: '20%'},
        ]}>
        {t('splash')}
      </Text>
      <ProgressBarExample />
    </View>
  );
};

export default Splash;
