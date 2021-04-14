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

import {useSelector} from 'react-redux';

const SettingsPersonalPasswordChange = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

  const {t} = useTranslation();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const emailReAuthApi = (email) => {
    axios
      .post(`${server}/util/email/pw-auth`, {
        email,
      })
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
  const emailUserCheckApi = async (email) => {
    return await axios
      .post(`${server}/user/duplicate/mailid`, {
        mailId: email,
      })
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
        {/* topBackButton */}
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
              {t('settinsPersonalPasswordChangeTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '10%'},
            ]}>
            {t('settinsPersonalPasswordChange1')}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              {marginTop: 20},
            ]}>
            {t('settinsPersonalPasswordChange2')}
          </Text>
        </View>
        <View style={[ResetStyle.textInputStyle, {marginBottom: '50%'}]}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              ResetStyle.textInputTitle,
            ]}>
            {t('settinsPersonalPasswordChange3')}
          </Text>
          <TextInput
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              ResetStyle.textInputText,
            ]}
            placeholder={t('settinsPersonalPasswordChange4')}
            placeholderTextColor="#a9a9a9"
            value={email}
            onChangeText={(e) => {
              setEmail(e);
            }}
            autoCapitalize={'none'}
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
        <TouchableOpacity
          style={
            validateEmail(email)
              ? [ResetStyle.button]
              : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
          }
          onPress={async () => {
            if (validateEmail(email)) {
              emailUserCheckApi(email).then(async (res) => {
                if (res == '-2') {
                  if (email === user.mailId) {
                    console.log('본인 이메일임');
                    emailReAuthApi(email);
                    navigation.push('SettingsPersonalEmail', {
                      email: email,
                      authKey: authKey,
                      userNo: userNo,
                    });
                  } else {
                    console.log('본인 이메일이 아님');
                    setModal2Visible(true);
                  }
                } else if (this.state.ret_val == '0') {
                  setModalVisible(true);
                }
              });
            }
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settinsPersonalPasswordChangeNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settinsPersonalPasswordChange5')}
        />
        <BottomModal
          setModalVisible={setModal2Visible}
          modalVisible={modal2Visible}
          text={`본인 이메일을 작성하여 주십시오.`}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPersonalPasswordChange;
