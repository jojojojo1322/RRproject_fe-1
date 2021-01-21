'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  AppRegistry,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WalletSendModal from '../../factory/modal/WalletSendModal';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

export default class WalletSendQR extends Component {
  onSuccess = (e) => {
    console.log(e.data);
    this.props.navigation.navigate('WalletSend');
  };
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View
          style={[
            ResetStyle.containerInner,
            {
              marginHorizontal: 0,
              marginBottom: 0,
            },
          ]}>
          {/* Top */}
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton, {marginLeft: '5%'}]}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                돌아가기
              </Text>
            </TouchableOpacity>
          </View>
          <QRCodeScanner
            onRead={this.onSuccess}
            // disableVibrationByUser={0}
            containerStyle={{width: '100%', height: '100%'}}
            cameraStyle={{width: '100%'}}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
