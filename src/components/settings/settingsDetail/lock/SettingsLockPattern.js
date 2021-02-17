import React, {Component, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../../style/ResetStyle.js';
import TextConfirmModal from '../../../factory/modal/TextConfirmModal';

// import PasswordGesture from 'react-native-gesture-password';
import GesturePassword from '../../../defined/pattern/GesturePassword';

import {useTranslation} from 'react-i18next';

//
var Password1 = '123';

const LockPattern = () => {
  const [message, setMessage] = useState('잠금해제 패턴을 입력해 주세요.');
  const [status, setStatus] = useState('normal');

  const onEnd = (password) => {
    if (password == Password1) {
      setStatus('right');
      setMessage('패턴이 일치합니다.');
    } else {
      setStatus('wrong');
      setMessage('패턴이 틀렸습니다.');
    }
  };

  const onStart = () => {
    setStatus('normal');
    setMessage('잠금해제 패턴을 입력해 주세요.');
  };

  const onReset = () => {
    setStatus('normal');
    setMessage('확인을 위해 한번 더 입력해 주세요.');
  };

  return (
    <GesturePassword
      // ref="pg"
      status={status}
      message={message}
      onStart={() => onStart()}
      onEnd={(password) => onEnd(password)}
      normalColor={'#4696ff'}
      rightColor={'#4696ff'}
      wrongColor={'#f00'}
      innerCircle={true}
      outerCircle={false}
    />
  );
};

const SettingsLockPattern = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleNextPage = () => {
    navigation.navigate('SettingsLockPassword');
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={[ResetStyle.containerInner]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('../../../../imgs/backIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={[ResetStyle.fontBoldK, ResetStyle.fontBlack]}>패턴</Text>
        <LockPattern />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {width: '49%', backgroundColor: '#e6e6e6'},
            ]}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('settingsLockPattern2')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ResetStyle.button, {width: '49%'}]}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('settingsLockPatternNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text={t('settingsLockPattern3')}
        confirm={t('settingsLockPattern4')}
        handleNextPage={handleNextPage}
      />
    </SafeAreaView>
  );
};

export default SettingsLockPattern;
