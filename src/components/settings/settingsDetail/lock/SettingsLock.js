import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
  Platform,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../../../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import TextConfirmModal from '../../../factory/modal/TextConfirmModal';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import IOSTouchId from '../../../factory/tool/biometricLock/iosLock';
import AndroidTouchId from '../../../factory/tool/biometricLock/androidLock';
import TouchID from 'react-native-touch-id';
import PasscodeAuth from 'react-native-passcode-auth';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';
// var TouchID = require('react-native-touch-id');

const SettingsLock = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [biometryType, setBiometryType] = useState(null);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    TouchID.isSupported()
      .then((biometryType) => {
        setBiometryType(biometryType);
      })
      .catch((e) => {
        console.log('isSupported', e);
      });
  }, []);

  const handleNextPage = () => {
    navigation.navigate('SettingsLockPassword');
  };

  const [DATA] = useState([
    {
      id: '1',
      title: t('settingsLock1'),
    },
    {
      id: '2',
      title: t('settingsLock2'),
    },
    {
      id: '3',
      title: t('settingsLock3'),
    },
    {
      id: '4',
      title: t('settingsLock4'),
    },
    {
      id: '5',
      title: t('settingsLock5'),
    },
  ]);
  const handleFingerprintDismissed = () => {
    console.log(';;;;;;;;;;;;;;');
  };

  const optionalConfigObject = {
    // title: 'Authentication Required', // Android
    // imageColor: '#e00606', // Android
    // imageErrorColor: '#ff0000', // Android
    // sensorDescription: 'Touch sensor', // Android
    // sensorErrorDescription: 'Failed', // Android
    // cancelText: 'Cancel', // Android
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    // unifiedErrors: false, // use unified error messages (default false)
  };

  const _clickHandler = () => {
    TouchID.isSupported()
      .then(authenticate)
      .catch((error) => {
        console.log('TouchID not supported');
      });
  };

  const authenticate = () => {
    return TouchID.authenticate('PAPA', optionalConfigObject)
      .then((success) => {
        console.log('Authenticated Successfully');
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const passcodeAuth = () => {
    return PasscodeAuth.isSupported()
      .then(() => {
        return PasscodeAuth.authenticate();
      })
      .then((success) => {
        console.log('Authenticated Successfully');
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const Item = ({title, id, onPress}) => {
    CheckedArrObject = new SelectedCheckboxes();
    if (id === '5') {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}
          onPress={() => {
            navigation.navigate('SettingsLockPassword');
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
            ]}>
            {title}
          </Text>
          <Image
            style={{
              width: Platform.OS === 'ios' ? 30 : 25,
              height: Platform.OS === 'ios' ? 30 : 25,
              resizeMode: 'contain',
            }}
            source={require('@images/moreIcon.png')}
          />
        </TouchableOpacity>
      );
    } else if (id === '4') {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
            ]}>
            {title}
          </Text>
          <Switch
            trackColor={{false: '#e6e6e6', true: '#4696ff'}}
            thumbColor={'#FFF'}
            ios_backgroundColor="#e6e6e6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={() => {
              console.log(Platform.OS);
              // Platform.OS === 'ios' ? (
              //   <IOSTouchId handlePopupDismissed={handleFingerprintDismissed} />
              // ) : (
              // <AndroidTouchId
              //   handlePopupDismissed={handleFingerprintDismissed}
              // />;
              // );c
              console.log(biometryType);
              // _pressHandler();
              _clickHandler();
              console.log('2');
              // if (isEnabled === false) {
              //   setModalVisible(!modalVisible);
              // }
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}
          onPress={() => {
            if (id === '3') {
              navigation.navigate('SettingsLockPattern');
            } else if (id === '2') {
              navigation.navigate('SettingsLockPassword');
            }
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
            ]}>
            {title}
          </Text>
          <RoundCheckbox
            size={25}
            keyValue={Number(id)}
            checked={false}
            checkedObjArr={CheckedArrObject}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({item}) => <Item title={item.title} id={item.id} />;
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View
          style={[
            ResetStyle.topBackButton,
            {marginLeft: '5%', marginRight: '5%'},
          ]}>
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
              {t('settingsLockTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            // Number(item.level);
            index.toString()
          }
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
      </View>
      <TextConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text={t('settingsLock6')}
        confirm={t('settingsLock7')}
        handleNextPage={handleNextPage}
      />
    </SafeAreaView>
  );
};

export default SettingsLock;
