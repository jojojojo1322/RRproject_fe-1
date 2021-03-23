import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import WalletStyle from '@style/WalletStyle.js';
import {TextInput} from 'react-native-gesture-handler';
import BottomModal from '../factory/modal/BottomModal';
import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  openSettings,
  checkMultiple,
} from 'react-native-permissions';

import * as ImagePicker from 'react-native-image-picker';

import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {server} from '../defined/server';
import axios from 'axios';

// 한글 - 영어에 따라 바이트 계산 차별 - passport varchar 100
var getTextLength = function (str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)).length == 6) {
      len++;
    }
    len++;
  }
  return len;
};

const CheckList = ({text}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <Image
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
          marginRight: '5%',
        }}
        source={require('@images/check.png')}
      />
      <Text
        style={[
          ResetStyle.fontLightK,
          ResetStyle.fontBlack,
          {textAlign: 'left', width: '85%', marginTop: '1%'},
        ]}>
        {text}
      </Text>
    </View>
  );
};

const IdVerification = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [response, setResponse] = useState(null);
  const [passportNo, setPassportNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [successCheck, setSuccessCheck] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const requestPermission = async (device) => {
    try {
      if (Platform.OS === 'ios') {
        return await checkMultiple([device.CAMERA, device.PHOTO_LIBRARY]);
      } else if (Platform.OS === 'android') {
        return await checkMultiple([
          device.CAMERA,
          device.READ_EXTERNAL_STORAGE,
          device.WRITE_EXTERNAL_STORAGE,
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const SERVER_URL =
  //   process.env.REACT_APP_API_SERVER_URL || 'http://15.165.203.69:8081/api';
  // // process.env.REACT_APP_API_SERVER_URL || 'http://gobuyaladdin.com/api';
  // const api = (contentType = 'application/json') => {
  //   return axios.create({
  //     baseURL: SERVER_URL,
  //     headers: {
  //       'Content-Type': contentType,
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
  //       'Access-Control-Allow-Headers':
  //         'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
  //       'buyaladdin-access-token':
  //         '_wRKHTqzZCg45qdZwYqJFCR2pjtIwvelO7y5Jvwsw_w',
  //     },
  //     //쿠키 전송 관련 문제 발생 시 withCredentials옵션을 줘야합니다.
  //     //withCredentials: true,
  //   });
  // };

  // export default api;

  const instance = () => {
    return axios.create({
      baseURL: `http://52.78.181.176:8091/v1/api`,
      headers: {'Content-Type': 'multipart/form-data', Accept: '*/*'},

      // timeout: 1000,
    });
  };
  const passportApi = async () => {
    console.log('passportApi 진입 response>>', response);
    console.log('axios 서버 루트 체크>', `${server}/util/passport`);
    console.log('axios 서버 루트 체크>', {
      userNo: await AsyncStorage.getItem('userNo'),
      passPortNumber: passportNo,
      englishFirstName: firstName,
      englishLastName: lastName,
    });
    let formData = new FormData();
    // response
    formData.append('reqFile', {
      uri: response.uri.replace('file://', ''),
      type: response.type,
      name: response.fileName,
    });
    formData.append(
      'reqPassPortInfo',
      JSON.stringify({
        userNo: await AsyncStorage.getItem('userNo'),
        passPortNumber: passportNo,
        englishFirstName: firstName,
        englishLastName: lastName,
      }),
    );
    console.log('passportApi 진입 FORM response>>', formData);

    // axios
    //   .post(`${server}/util/passport`, {
    //     data: formData,
    //     // },
    //     // {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Accept: '*/*',
    //     },
    //     // },
    //     // {
    //     _lowerCaseResponseHeaders: {
    //       'access-control-allow-headers': 'x-auth-token, content-type',
    //       'access-control-allow-methods': 'POST, GET, PUT, OPTIONS, DELETE',
    //       'access-control-allow-origin': '*',
    //       'access-control-max-age': '3600',
    //       'content-type': 'multipart/form-data',
    //     },
    //   })
    //
    //

    // instance()
    //   .post('/util/passport', formData)
    //
    //
    //

    axios({
      method: 'post',
      url: `${server}/util/passport`,
      data: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   Accept: '*/*',
      // },
      // _lowerCaseResponseHeaders: {
      //   // 'access-control-allow-headers': 'x-auth-token, content-type',
      //   // 'access-control-allow-methods': 'POST, GET, PUT, OPTIONS, DELETE',
      //   // 'access-control-allow-origin': '*',
      //   // 'access-control-max-age': '3600',
      //   'content-type': 'multipart/form-data',
      // },
    })
      .then((response) => {
        console.log('passportApi THEN>>', response);
        console.log('passportApi THEN>>', response.data);
        console.log('passportApi THEN>>', response.data.result);
        setSuccessCheck(response.data.result);
      })
      .catch((e) => {
        console.log('passportApi ERROR>>', e);
        // console.error();
        // console.error(e);
        console.log('passportApi ERROR>>', e.response);
      });
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
    console.log('asdasdasdagshdgas>>>');
  };
  useEffect(() => {
    if (successCheck.indexOf('success') != -1) {
      navigation.replace('IdVerificationInProgress');
    }
  }, [successCheck]);

  const handlePermission = async () => {
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

  if (response === null) {
    ImgBox = (
      <View
        style={{
          width: '100%',
          height: 230,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          borderColor: '#dedede',
          borderWidth: 2,
        }}>
        <Image
          style={{
            width: 260,
            height: 200,
            resizeMode: 'contain',
            // borderWidth: 1,
          }}
          source={require('@images/passportIcon.png')}
        />
      </View>
    );
  } else if (response.didCancel === true) {
    ImgBox = (
      <View
        style={{
          width: '100%',
          height: 230,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          borderColor: '#dedede',
          borderWidth: 2,
        }}>
        <Image
          style={{
            width: 260,
            height: 200,
            resizeMode: 'contain',
            // borderWidth: 1,
          }}
          source={require('@images/passportIcon.png')}
        />
      </View>
    );
  } else if (response.uri !== false) {
    ImgBox = (
      <Image
        style={{
          width: '100%',
          height: 230,
          borderRadius: 15,
          borderColor: '#dedede',
          borderWidth: 2,
          resizeMode: 'cover',
        }}
        source={{uri: response.uri}}
      />
    );
  } else {
    ImgBox = (
      <View
        style={{
          width: '100%',
          height: 230,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          borderColor: '#dedede',
          borderWidth: 2,
        }}>
        <Image
          style={{
            width: 260,
            height: 200,
            resizeMode: 'contain',
            // borderWidth: 1,
          }}
          source={require('@images/passportIcon.png')}
        />
      </View>
    );
  }

  useEffect(() => {
    console.log('response>>>>>>>>>', response);
  }, [response]);

  const handlePassportChange = (value) => {
    setPassportNo(value);
  };

  const handleFirstChange = (value) => {
    setFirstName(value);
  };

  const handleLastChange = (value) => {
    setLastname(value);
  };

  const handleCheckValues = () => {
    if (passportNo === '') {
      setModalVisible(!modalVisible);
    } else if (firstName === '') {
      setModalVisible(!modalVisible);
    } else if (lastName === '') {
      setModalVisible(!modalVisible);
    } else if (response === null) {
      setModal2Visible(!modal2Visible);
    } else if (
      getTextLength(firstName) >= 100 ||
      getTextLength(lastName) >= 100 ||
      getTextLength(passportNo) >= 100
    ) {
      setModal3Visible(!modal2Visible);
    } else {
      console.log('passportNo', passportNo);
      console.log('passportNo', passportNo);
      console.log('firstName', firstName);
      console.log('firstName', firstName);
      console.log('lastName', lastName);
      console.log('lastName', lastName);
      console.log('Response', response);
      console.log('Response', response);
      passportApi();
      // navigation.replace('IdVerificationInProgress');
    }
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      {/* topBackButton */}
      <View style={[ResetStyle.topBackButton, {paddingHorizontal: '5%'}]}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{
              width: Platform.OS === 'ios' ? 28 : 22,
              height: Platform.OS === 'ios' ? 28 : 22,
              resizeMode: 'contain',
            }}
            source={require('@images/backIcon.png')}
          />
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
            {t('idVerificationTitle')}
          </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: '5%',
        }}>
        <View style={{flex: 1, paddingVertical: '5%', paddingBottom: '40%'}}>
          {/* body */}

          {/* ID Image */}
          {ImgBox}

          {/* image 하단 체크 리스트 */}
          <View
            style={{
              paddingHorizontal: '5%',
              width: '100%',
              height: '20%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginVertical: '5%',
            }}>
            <CheckList text={t('idVerification1')} />
            <CheckList text={t('idVerification2')} />
            <CheckList text={t('idVerification3')} />
          </View>

          {/* buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* take a photo button */}
            <TouchableOpacity
              style={[
                ResetStyle.buttonSmall,
                WalletStyle.myTncButton,
                {
                  backgroundColor: '#4696ff',
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                ImagePicker.launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (response) => {
                    // let data = response;
                    // data = data.uri.split('content://', 'file:///');
                    setResponse(response);
                  },
                );
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                {t('idVerification4')}
              </Text>
            </TouchableOpacity>

            {/* Receive Button */}
            <TouchableOpacity
              style={[
                ResetStyle.buttonSmall,
                WalletStyle.myTncButton,
                {
                  backgroundColor: '#4696ff',
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                ImagePicker.launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (response) => {
                    // let data = response;
                    // data = data.uri.split('content://', 'file:///');
                    setResponse(response);
                  },
                );
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                {t('idVerification5')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: '5%',
              width: '100%',
              height: '22%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: '5%',
              marginBottom: '15%',
            }}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('idVerification6')}
            </Text>
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#dedede',
                marginTop: '3%',
                marginBottom: '7%',
              }}>
              <TextInput
                placeholder={t('idVerification7')}
                placeholderTextColor="#a9a9a9"
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', paddingVertical: '2%'},
                ]}
                onChangeText={handlePassportChange}
                value={passportNo}
              />
            </View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('idVerification8')}
            </Text>
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#dedede',
                marginTop: '3%',
                marginBottom: '7%',
              }}>
              <TextInput
                placeholder={t('idVerification9')}
                placeholderTextColor="#a9a9a9"
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', paddingVertical: '2%'},
                ]}
                onChangeText={handleFirstChange}
                value={firstName}
              />
            </View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('idVerification10')}
            </Text>
            <View
              style={{
                borderBottomWidth: 1.5,
                borderBottomColor: '#dedede',
                marginTop: '3%',
                marginBottom: '7%',
              }}>
              <TextInput
                placeholder={t('idVerification11')}
                placeholderTextColor="#a9a9a9"
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', paddingVertical: '2%'},
                ]}
                onChangeText={handleLastChange}
                value={lastName}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* footer */}
      <TouchableOpacity
        style={[
          ResetStyle.button,
          {
            width: '90%',
            marginTop: 10,
            position: 'absolute',
            bottom: '5%',
            left: '5%',
          },
        ]}
        activeOpacity={0.75}
        onPress={() => {
          handleCheckValues();
        }}>
        <Text
          style={[
            ResetStyle.fontMediumK,
            ResetStyle.fontWhite,
            {fontWeight: '600'},
          ]}>
          {t('idVerificationNextButton')}
        </Text>
      </TouchableOpacity>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('idVerification12')}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('idVerification13')}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={'글자수 제한 초과했습니다. 다시 입력해주세요.'}
      />
    </SafeAreaView>
  );
};

export default IdVerification;
