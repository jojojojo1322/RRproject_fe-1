import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import BottomModal from '../../factory/modal/BottomModal';
import ResetStyle from '../../../style/ResetStyle.js';
import AuthStyle from '../../../style/AuthStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from '../../defined/QR/QRCode';
import axios from 'axios';
import {server} from '../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationHelpersContext} from '@react-navigation/native';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const WalletReceive = (props) => {
  const {t, i18n} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [masterKey, setMasterKey] = useState('');

  useEffect(() => {
    // AsyncStorage.setItem('email', 'a@c.com', () => {
    //   console.log('유저 닉네임 저장 완료');
    // });
    getWalletAddressApi();
    setMasterKey(walletData.name);
  }, []);

  // const getWalletAddressApi = async (email) => {
  const getWalletAddressApi = async () => {
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        console.log('getWalletAddressApi>>>>>', response.data);
        setWalletData(response.data);
        console.log('walletData>>>>>', walletData);
        setMasterKey(response.data.name);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  console.log('walletData', walletData);

  const copyToClipboard = (value) => {
    Clipboard.setString(value);
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={[ResetStyle.containerInner]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('walletReceiveTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[ResetStyle.fontMediumK, {marginBottom: '10%'}]}>
            {t('walletReceive1')}
          </Text>
          <QRCode value={masterKey} size={700} bgColor="#000" fgColor="white" />
        </View>

        <View>
          <TouchableOpacity
            style={AuthStyle.walletCopy}
            onPress={() => {
              setModal2Visible(!modal2Visible);
              copyToClipboard(masterKey);
            }}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontDG,
                {paddingTop: 20, paddingBottom: 20},
              ]}>
              {masterKey}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontG,
              {marginTop: 10, marginBottom: 70},
            ]}>
            {t('walletReceive2')}
          </Text>
        </View>
        {/* Bottom Button */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              // {backgroundColor: '#4696ff', width: '49%', marginLeft: '1%'},
            ]}
            onPress={() => {
              props.navigation.navigate('WalletMain');
              // props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('walletReceiveNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={`공유되었습니다.`}
      /> */}
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('walletReceive3')}
      />
    </SafeAreaView>
  );
};

export default WalletReceive;
