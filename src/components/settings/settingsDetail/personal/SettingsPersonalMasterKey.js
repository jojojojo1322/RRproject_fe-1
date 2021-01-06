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

export default class WalletMasterKey extends Component {
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
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                this.props.navigation.navigate('SettingsPersonal');
              }}>
              <Image
                source={require('../../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                Master Key
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
              Master Key 저장하기
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: 10, marginBottom: 20, lineHeight: 25},
              ]}>
              Master Key는 추후에 지갑 비밀번호 분실 시{'\n'}비밀번호 재설정에
              꼭 필요한 Key입니다.
            </Text>
            <Image
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
                marginBottom: 20,
              }}
              source={require('../../../../imgs/drawable-mdpi/icon_masterkey.png')}
            />
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {lineHeight: 28, fontWeight: '600'},
              ]}>
              Master Key 분실 시 찾을 방법이 없으니{'\n'}꼭 다른 곳에 저장해
              두세요!
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
              클릭하면 복사됩니다.
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
            확인
          </Text>
        </TouchableOpacity>
        <BottomModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
          text={`복사되었습니다.`}
        />
      </SafeAreaView>
    );
  }
}