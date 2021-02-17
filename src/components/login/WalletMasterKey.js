import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import Clipboard from '@react-native-community/clipboard';
import BottomModal from '../factory/modal/BottomModal';
import AuthStyle from '../../style/AuthStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class WalletMasterKey extends Component {
  state = {
    modalVisible: false,
  };
  componentDidMount = async () => {
    await AsyncStorage.setItem(
      'masterKey',
      this.props.route.params?.walletAddress,
    );
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
        <View style={[ResetStyle.containerInner, {justifyContent: 'center'}]}>
          <View style={{marginTop: '10%'}}>
            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
              {t('WalletMasterKeyTitle')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 10, marginBottom: 20, lineHeight: 25},
              ]}>
              {t('WalletMasterKey1')}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 80 : 70,
                height: Platform.OS === 'ios' ? 80 : 70,
                alignSelf: 'center',
                marginBottom: 20,
              }}
              source={require('../../imgs/iconNoticeCheckB.png')}
            />
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {lineHeight: 28, fontWeight: '600', marginBottom: '12%'},
              ]}>
              {t('WalletMasterKey2')}
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
                  {paddingTop: '8%', paddingBottom: '8%'},
                ]}>
                {this.props.route.params?.walletAddress}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontG,
                {marginTop: 10, marginBottom: '15%'},
              ]}>
              {t('WalletMasterKey3')}
            </Text>
          </View>

          <TouchableOpacity
            style={[ResetStyle.button, {backgroundColor: '#4696ff'}]}
            onPress={() => {
              this.props.navigation.navigate('Main');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('WalletMasterKey4')}
            </Text>
          </TouchableOpacity>
        </View>
        <BottomModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
          text={t('WalletMasterKey5')}
        />
      </SafeAreaView>
    );
  }
}
export default hoistStatics(
  withTranslation()(WalletMasterKey),
  WalletMasterKey,
);
