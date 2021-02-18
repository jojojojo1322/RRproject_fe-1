import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../../../style/ResetStyle';
import AuthStyle from '../../../../style/AuthStyle.js';

import Clipboard from '@react-native-community/clipboard';
import BottomModal from '../../../factory/modal/BottomModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class WalletMasterKey extends Component {
  state = {
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  copyToClipboard = (value) => {
    Clipboard.setString(value);
  };
  render() {
    const {t} = this.props;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.navigate('SettingsPersonal');
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../../imgs/backIcon.png')}
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
              source={require('../../../../imgs/iconNoticeCheck.png')}
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
                this.setModalVisible(true);
                this.copyToClipboard(this.props.route.params?.walletAddress);
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontDG,
                  {paddingTop: 20, paddingBottom: 20},
                ]}>
                {this.props.route.params?.walletAddress}
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
            this.props.navigation.navigate('SettingsPersonal');
          }}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
            {t('settingsPersonalMasterKeyNextButton')}
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
          text={t('settingsPersonalMasterKey5')}
        />
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(WalletMasterKey),
  WalletMasterKey,
);
