import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import BottomModal from '../../factory/modal/BottomModal';
import ProgressModal from '../../factory/modal/ProgressModal.js';

import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';
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
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [masterKey, setMasterKey] = useState('');

  useEffect(() => {
    // AsyncStorage.setItem('email', 'a@c.com', () => {
    //   console.log('유저 닉네임 저장 완료');
    // });
    getWalletAddressApi();
    setMasterKey(walletData.name);
    console.log(walletData.status);
  }, []);

  // const getWalletAddressApi = async (email) => {
  const getWalletAddressApi = async () => {
    setModal4Visible(true);
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        console.log('getWalletAddressApi>>>>>', response.data);
        setWalletData(response.data);
        console.log('walletData>>>>>', walletData);
        setMasterKey(response.data.name);
        if (response.data.status === 'fail') {
          setModal3Visible(!modal3Visible);
        }
      })
      .catch((e) => {
        console.log('error', e);
        setModal3Visible(!modal3Visible);
      });
    setModal4Visible(false);
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
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
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
          {masterKey === null ? null : (
            <QRCode
              value={masterKey}
              size={700}
              bgColor="#000"
              fgColor="#FFF"
            />
          )}
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
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('walletReceive4')}
      />
      <ProgressModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
      />
    </SafeAreaView>
  );
};

export default WalletReceive;
