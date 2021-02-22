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

import AsyncStorage from '@react-native-async-storage/async-storage';
import {server} from '../defined/server';
import axios from 'axios';

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
        source={require('../../imgs/drawable-xxxhdpi/check.png')}
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

  let data = new FormData();
  let api = axios.create({
    baseURL: `${server}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: '*/*',
    },
    data: data._parts,
  });
  const passportUploadApi = async () => {
    await api
      .post('/util/passport')
      .then(async (response) => {
        console.log(`passportUploadApi Then >>`, JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(`passportUploadApi Error`, e);
      });
  };

  useEffect(() => {
    console.log('response>>>>>>>>>', response);
  }, [response]);

  useEffect(() => {
    console.log('response>>>>>>>>>', passportNo);
    console.log('firstName>>>>>>>>>', firstName);
    console.log('lastName>>>>>>>>>', lastName);
  }, [passportNo, lastName, firstName]);

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
      passportUploadApi();
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
            source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
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
          {response === null ? (
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
                source={require('../../imgs/drawable-xxxhdpi/passport_icon.png')}
              />
            </View>
          ) : (
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
          )}

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
                    maxWidth: 500,
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
        onPress={async () => {
          const userNo = await AsyncStorage.getItem('userNo');
          handleCheckValues();
          data.append('reqFile', {
            uri: response.uri.replace('file://', ''),
            type: response.type,
            name: response.fileName,
          });
          data.append(
            'reqPassPortInfo',
            JSON.stringify({
              userNo: userNo,
              passPortNumber: passportNo,
              englishFirstName: firstName,
              englishLastName: lastName,
            }),
          );
          console.log('data =>>>>>>>>>>', data._parts);
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
        text={'내용을 정확하게 입력해 주십시오.'}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={'여권 사진을 업로드해 주십시오.'}
      />
    </SafeAreaView>
  );
};

export default IdVerification;
