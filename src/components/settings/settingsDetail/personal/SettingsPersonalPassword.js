import React, {Component, useEffect, useState} from 'react';
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
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '@style/ResetStyle.js';
import BottomModal from '@factory/modal/BottomModal';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import {useSelector} from 'react-redux';

const SettingsPersonalPassword = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

  const {t} = useTranslation();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const loginApi = async () => {
    console.log({
      deviceKey: DeviceInfo.getUniqueId(),
      email: user.mailId,
      password: password,
    });
    axios
      .post(`${server}/user/login`, {
        deviceKey: DeviceInfo.getUniqueId(),
        email: user.mailId,
        password: password,
      })
      .then((response) => {
        console.log('loginApi THEN>>', response);
        userInfoApi();
      })
      .catch((e) => {
        console.log('loginApi ERROR>>', e);
        setModalVisible(true);
      });
  };
  const userInfoApi = async () => {
    axios
      .get(`${server}/user?userNo=${user.userNo}`)
      .then((response) => {
        console.log('userInfoApi THEN>>', response);
        navigation.navigate('SettingsPersonal', {
          userInfo: response.data,
        });
      })
      .catch((e) => {
        console.log('userInfoApi ERROR>>', e);
      });
  };
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        {/* topBackButton */}
        <View>
          <View style={[ResetStyle.topBackButton]}>
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
                source={require('@images/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('settingsPersonalPasswordTitle')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: '10%'}}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
              {t('settingsPersonalPassword1')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 20},
              ]}>
              {t('settingsPersonalPassword2')}
            </Text>
          </View>
          <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonalPassword3')}
            </Text>
            <TextInput
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                ResetStyle.textInputText,
              ]}
              placeholder={t('settingsPersonalPassword4')}
              placeholderTextColor="#a9a9a9"
              value={password}
              secureTextEntry={true}
              onChangeText={(e) => {
                setPassword(e);
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
              : [
                  ResetStyle.button,
                  password === '' && {backgroundColor: '#e6e6e6'},
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
            if (password !== '') {
              loginApi();
            }

            // 테스트용
            // this.passwordApi(this.state.email);
            // this.props.navigation.navigate('SettingsPersonal', {
            //   email: this.state.email,
            //   authKey: this.state.authKey,
            //   userNo: this.state.userNo,
            // });
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settingsPersonalPasswordNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settingsPersonalPassword5')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPersonalPassword;
