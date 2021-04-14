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
import ResetStyle from '@style/ResetStyle';
import BottomModal from '@factory/modal/BottomModal';

import {useTranslation} from 'react-i18next';

const SettingsPersonal = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    setEmail(route.params?.userInfo.mailId);
    setPhoneNum(route.params?.userInfo.phoneNum);
    console.log(DeviceInfo.getUniqueId());
    console.log('authKey', authKey);
  }, []);
  // componentDidMount = () => {
  //   // console.log(this.props.route.params?.userInfo.mailId);
  //   this.setState({
  //     email: this.props.route.params?.userInfo.mailId,
  //     phoneNum: this.props.route.params?.userInfo.phoneNum,
  //   });
  // };
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        <View>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('Settings');
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
                {t('settingsPersonalTitle')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Personal Setting */}
          {/* Personal Setting - Email */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal1')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                {email}
              </Text>
            </View>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontB,
                {textAlign: 'left', marginTop: '2%'},
              ]}>
              {t('settingsPersonal2')}
            </Text>
          </View>

          {/* Personal Setting - Password */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal3')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {paddingTop: '3%'},
                ]}>
                ********
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SettingsPersonalPasswordChange', {
                    email: email,
                    authKey: authKey,
                    userNo: userNo,
                  });
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('@images/kycEditIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Personal Setting - Phone */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal4')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                {phoneNum}
              </Text>
            </View>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontB,
                {textAlign: 'left', marginTop: '2%'},
              ]}>
              {t('settingsPersonal8')}
            </Text>
          </View>

          {/* Personal Setting - Master Key */}
          {/* <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('settingsPersonal5')}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  this.props.navigation.push('SettingsPersonalMasterPhone', {
                    email: email,
                    authKey: authKey,
                    userNo: userNo,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6%',
                    paddingBottom: '3%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e6e6e6',
                  }}>
                  <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                    {t('settingsPersonal6')}
                  </Text>
                  <Image
                  style={{
          width: Platform.OS === 'ios' ? 30 : 25,
          height: Platform.OS === 'ios' ? 30 : 25,
          resizeMode: 'contain',
        }}
        source={require('@images/moreIcon.png')}
                  />
                </View>
              </TouchableOpacity>
            </View> */}
        </View>

        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settingsPersonal7')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsPersonal;
