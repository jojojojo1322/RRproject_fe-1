import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import axios from 'axios';
import {server} from '@context/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '@factory/modal/BottomModal';
import CountDown from '@factory/CountDown';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

const SettingsPersonalEmail = ({navigation, route}) => {
  const [email, setEmail] = useState(route.params?.email);
  const [emailCode, setEmailCode] = useState('');
  const [authKey, setAuthKey] = useState(route.params?.authKey);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [timeLeftNumber, setTimeLeftNumber] = useState(180);
  const [CountDownCheck, setCountDownCheck] = useState('');
  const [CountDownExpireCheck, setCountDownExpireCheck] = useState(false);
  const {t} = useTranslation();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleEmail = (e) => {
    this.setState({
      emailCode: e,
    });
    // console.log(this.validate(this.state.email));
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
  const handleCountDown = () => {
    setIsRunning(!isRunning);
    setCountDownExpireCheck(false);
  };

  const handleReCountDown = async () => {
    setIsRunning(true);
    setIsRunning(false);
    setTimeLeftNumber(180);
    setCountDownExpireCheck(false);

    // this.setState({
    //   isRunning: true,
    //   timeLeftNumber: 180,
    // });
  };
  const handleCountDownCheck = (value) => {
    setCountDownCheck(value);
  };

  const handleCountDownExpireCheck = () => {
    console.log(
      'handleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheckhandleCountDownExpireCheck',
    );
    // this.setState({
    //   CountDownExpireCheck: true,
    // });
    setCountDownExpireCheck(true);
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
              {t('settingsPersonalEmailTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontG,
            {marginTop: '20%'},
          ]}>
          {/* {email} */}
          {`${email} `}
          {t('settingsPersonalEmail1')}
        </Text>
        {/* <Text style={styles.TopText2}>
              비밀번호 재설정을 위해{'\n'}아이디(이메일)을 입력해 주세요.
            </Text> */}
        <View style={[ResetStyle.textInputStyle, {marginBottom: '50%'}]}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              ResetStyle.textInputTitle,
            ]}>
            {t('settingsPersonalEmail2')}
          </Text>
          <TextInput
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              ResetStyle.textInputText,
            ]}
            placeholder={t('settingsPersonalEmail3')}
            placeholderTextColor="#a9a9a9"
            value={emailCode}
            returnKeyType={'done'}
            onChangeText={(e) => {
              setEmailCode(e);
            }}
            keyboardType="number-pad"
          />
          <View
            style={[
              ResetStyle.textInputTextButton,
              {flexDirection: 'row', top: '45%'},
            ]}>
            <Image
              style={[ResetStyle.smallImg, {marginRight: 8}]}
              source={require('@images/iconTime.png')}
            />
            <CountDown
              standard={isRunning}
              timeLeftNumber={timeLeftNumber}
              handleReCountDown={handleReCountDown}
              handleCountDownCheck={handleCountDownCheck}
              CountDownCheck={CountDownCheck}
              CountDownExpireCheck={CountDownExpireCheck}
              handleCountDownExpireCheck={handleCountDownExpireCheck}
            />
          </View>
          <TouchableOpacity
            style={ResetStyle.textInputRe}
            onPress={() => {
              setModal3Visible(true);
              handleReCountDown();
              emailReAuthApi(email);
            }}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontB,
                {textAlign: 'left', marginTop: 10},
              ]}>
              {t('settingsPersonalEmail4')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={
            emailCode.length == 6
              ? [ResetStyle.button]
              : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
          }
          onPress={async () => {
            if (emailCode.length == 6) {
              if (
                emailCode == (await AsyncStorage.getItem('authKey')) &&
                CountDownExpireCheck == false
              ) {
                navigation.navigate('SettingsPersonalResetPassword', {
                  email: route.params?.email,
                  userNo: route.params?.userNo,
                });
              } else if (CountDownExpireCheck == true) {
              } else {
                console.log('ssssssssssssss');
                setModalVisible(true);
              }
            }
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settingsPersonalEmailNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settingsPersonalEmail5')}
        />
        <BottomModal
          setModalVisible={setModal2Visible}
          modalVisible={modal2Visible}
          text={t('settingsPersonalEmail6')}
        />
        <BottomModal
          setModalVisible={setModal3Visible}
          modalVisible={modal3Visible}
          text={t('signUpModal2')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPersonalEmail;
