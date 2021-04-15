import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {server} from '@context/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '@style/ResetStyle.js';
import BottomModal from '@factory/modal/BottomModal';
import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import {emailReAuth, emailUserCheck} from '@repository/verifyRepository';

const Reset = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  console.log(DeviceInfo.getUniqueId());
  console.log('authKey', authKey);

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const emailReAuthApi = async (email) => {
    return await emailReAuth({email})
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);

        setAuthKey(response.data.authKey);
        const authKey = response.data.authKey;
        await AsyncStorage.setItem('authKey', authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
        // ret_val 0
        return response.data.ret_val;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  const emailUserCheckApi = async (email) => {
    return await emailUserCheck({mailId: email})
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.data.userNo);
        setRet_val(response.data.ret_val);
        setUserNo(response.data.userNo);
        return response.data.ret_val;
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        <View>
          <View style={[ResetStyle.topBackButton]}>
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
                {t('resetTitle')}
                {t('signUpNextButton')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              {
                marginTop: '17%',
                fontWeight: '700',
                fontSize: 33,
              },
            ]}>
            {t('reset1')}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {marginTop: '5%'},
            ]}>
            {t('reset2')}
          </Text>
          <View
            style={[
              ResetStyle.textInputStyle,
              {marginTop: '20%', marginBottom: '0%'},
            ]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResetStyle.textInputTitle,
              ]}>
              {t('reset3')}
            </Text>
            <TextInput
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResetStyle.textInputText,
              ]}
              placeholder={t('reset4')}
              placeholderTextColor="#a9a9a9"
              autoCapitalize={'none'}
              value={email}
              onChangeText={(e) => {
                setEmail(e);
              }}
            />
            <TouchableOpacity
              style={ResetStyle.textInputTextButton}
              onPress={() => {
                setEmail('');
              }}>
              <Image
                style={ResetStyle.smallImg}
                source={require('@images/iconX.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={
            validateEmail(email)
              ? [ResetStyle.button]
              : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
          }
          onPress={() => {
            // api 용
            if (validateEmail(email)) {
              emailUserCheckApi(email).then((res) => {
                console.log('res≥≥', res);
                if (res === -2) {
                  emailReAuthApi(email).then((res) => {
                    console.log('res≥≥', res);
                    if (res === 0) {
                      navigation.push('ResetEmail', {
                        email: email,
                        authKey: authKey,
                        userNo: userNo,
                      });
                    }
                  });
                } else if (res === 0) {
                  setModalVisible(true);
                }
              });
            }
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('resetNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('reset5')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Reset;
