import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {checkMultiple, PERMISSIONS} from 'react-native-permissions'; // permission 부르기
import SplashScreen from 'react-native-splash-screen'; // splash screen 불러오기
import RNExitApp from 'react-native-exit-app'; // app 종료
import ResetStyle from './style/ResetStyle';

const Splash = () => {
  const time = 2000;

  useEffect(() => {
    console.log('first');
    // native splash screen 감추기
    SplashScreen.hide();
    // permission 부르기
    handlePermission();
  }, []);

  const handlePermission = async () => {
    try {
      // device 확인
      const device =
        Platform.OS === 'ios' ? PERMISSIONS.IOS : PERMISSIONS.ANDROID;

      //if requestPermission(ios)
      requestPermission(device).then((res) => {
        console.log(res);

        const {DENIED, BLOCKED} = resultClassification(res);
        const notGrantedArr = [...DENIED, ...BLOCKED];

        const reQuestion = async () => {
          if (notGrantedArr.length === 0) {
          } else {
            await requestMultiple(notGrantedArr).then((res) => {
              const {DENIED, BLOCKED} = resultClassification(res);

              if (Platform.OS === 'ios') {
                // for ios
              } else {
                // for android
                if (DENIED.length > 0) {
                  RNExitApp.exitApp();
                } else if (BLOCKED.length > 0) {
                  openSettingAlert();
                } else {
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

  const resultClassification = (result) => {
    let notGrantedArr = {
      DENIED: [],
      BLOCKED: [],
    };

    Object.keys(result).forEach((key) => {
      if (result[key] === RESULTS.DENIED) {
        // denied 되었을 때
        notGrantedArr.DENIED.push(key);
      } else if (result[key] === RESULTS.BLOCKED) {
        // blocked 되었을 때
        notGrantedArr.BLOCKED.push(key);
      }
    });

    return notGrantedArr;
  };

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
          device.USE_BIOMETRIC,
          device.USE_FINGERPRINT,
          device.VIBRATE,
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

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
        source={require('./imgs/drawable-xxxhdpi/splash_logo.png')}
      />
      <Text
        style={[ResetStyle.fontRegularK, ResetStyle.fontB, {marginTop: '60%'}]}>
        블록체인 기반의 설문조사
      </Text>
    </View>
  );
};

export default Splash;
