import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../style/ResetStyle.js';
import WalletStyle from '../../style/WalletStyle.js';
import {TextInput} from 'react-native-gesture-handler';
import BottomModal from '../factory/modal/BottomModal';

import * as ImagePicker from 'react-native-image-picker';

import {useTranslation} from 'react-i18next';

// const ImgBox = ({response}) => {
//   return response === null ? (
//     <View
//       style={{
//         width: '100%',
//         height: 230,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 15,
//         borderColor: '#dedede',
//         borderWidth: 2,
//       }}>
//       <Image
//         style={{
//           width: 260,
//           height: 200,
//           resizeMode: 'contain',
//           // borderWidth: 1,
//         }}
//         source={require('../../imgs/passportIcon.png')}
//       />
//     </View>
//   ) : (
//     <Image
//       style={{
//         width: '100%',
//         height: 230,
//         borderRadius: 15,
//         borderColor: '#dedede',
//         borderWidth: 2,
//         resizeMode: 'cover',
//       }}
//       source={{uri: response.uri}}
//     />
//   );
// };

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
        source={require('../../imgs/check.png')}
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

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
          source={require('../../imgs/passportIcon.png')}
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
          source={require('../../imgs/passportIcon.png')}
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
          source={require('../../imgs/passportIcon.png')}
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
    } else {
      navigation.replace('IdVerificationInProgress');
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
              width: Platform.OS === 'ios' ? 28 : 25,
              height: Platform.OS === 'ios' ? 28 : 25,
              resizeMode: 'contain',
            }}
            source={require('../../imgs/backIcon.png')}
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
    </SafeAreaView>
  );
};

export default IdVerification;
