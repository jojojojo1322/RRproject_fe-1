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

const SettingsWalletMasterKey = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [masterKey, setMasterKey] = useState('');
  const {t} = useTranslation();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const passwordApi = async (email) => {
    await emailReAuth({email})
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);

        setAuthKey(response.data.authKey);
        const authKey = response.data.authKey;
        await AsyncStorage.setItem('authKey', authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  const passwordUserCheckApi = async (email) => {
    await emailUserCheck({mailId: email})
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.data.userNo);

        setRet_val(response.data.ret_val);
        setUserNo(response.data.userNo);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  console.log(DeviceInfo.getUniqueId());
  console.log('authKey', this.state.authKey);

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton]}>
          <TouchableOpacity
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
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
              source={require('@images/backIcon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('settingsWalletMasterKeyTitle')}
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: '10%'}}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
              {t('settingsWalletMasterKey1')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 20},
              ]}>
              {t('settingsWalletMasterKey2')}
            </Text>
          </View>
          <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsWalletMasterKey3')}
            </Text>
            <TextInput
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
              ]}
              placeholder={t('settingsWalletMasterKey4')}
              placeholderTextColor="#a9a9a9"
              value={masterKey}
              onChangeText={(e) => {
                setMasterKey(e);
              }}
            />
            <TouchableOpacity
              style={ResetStyle.textInputTextButton}
              onPress={() => {
                setMasterKey('');
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
              : [
                  ResetStyle.button,
                  masterKey === '' && {backgroundColor: '#e6e6e6'},
                ]
          }
          onPress={async () => {
            // api 용
            // if (this.validateEmail(this.state.email)) {
            //   await this.passwordUserCheckApi(this.state.email);
            //   if (this.state.ret_val == '-2') {
            //     this.passwordApi(this.state.email);
            //     this.props.navigation.push('ResetEmail', {
            //       email: this.state.email,
            //       authKey: this.state.authKey,
            //       userNo: this.state.userNo,
            //     });
            //   } else if (this.state.ret_val == '0') {
            //     this.setModalVisible(true);
            //   }
            //   // this.passwordApi(this.state.email);
            //   // // const asy = 'aaaaaaa';
            //   // // await AsyncStorage.setItem('authKey', asy);
            //   // // console.log(await AsyncStorage.getItem('authKey'));
            // }

            // 테스트용
            // this.passwordApi(this.state.email);
            if (masterKey === (await AsyncStorage.getItem('masterKey'))) {
              navigation.navigate('SettingsWalletPassword', {
                email: email,
                authKey: authKey,
                userNo: userNo,
              });
            } else {
              setModalVisible(true);
            }
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settingsWalletMasterKeyNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={state.modalVisible}
          text={t('settingsWalletMasterKey5')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsWalletMasterKey;
