import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '@style/ResetStyle';
import AuthStyle from '@style/AuthStyle.js';

import Clipboard from '@react-native-community/clipboard';
import BottomModal from '@factory/modal/BottomModal';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

const WalletMasterKey = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

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
              navigation.navigate('SettingsPersonal');
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
              {t('settingsPersonalMasterKeyTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
            {t('settingsPersonalMasterKey1')}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              {marginTop: 10, marginBottom: 20, lineHeight: 25},
            ]}>
            {t('settingsPersonalMasterKey2')}
          </Text>
          <Image
            style={{
              width: 80,
              height: 80,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            source={require('@images/iconNoticeCheck.png')}
          />
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontB,
              {lineHeight: 28, fontWeight: '600'},
            ]}>
            {t('settingsPersonalMasterKey3')}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={AuthStyle.walletCopy}
            onPress={() => {
              setModalVisible(true);
              copyToClipboard(route.params?.walletAddress);
            }}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontDG,
                {paddingTop: 20, paddingBottom: 20},
              ]}>
              {route.params?.walletAddress}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontG,
              {marginTop: 10, marginBottom: 70},
            ]}>
            {t('settingsPersonalMasterKey4')}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          ResetStyle.button,
          {
            backgroundColor: '#4696ff',
            marginLeft: '5%',
            marginRight: '5%',
            width: '90%',
          },
        ]}
        onPress={() => {
          navigation.navigate('SettingsPersonal');
        }}>
        <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
          {t('settingsPersonalMasterKeyNextButton')}
        </Text>
      </TouchableOpacity>
      <BottomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text={t('settingsPersonalMasterKey5')}
      />
    </SafeAreaView>
  );
};

export default WalletMasterKey;
