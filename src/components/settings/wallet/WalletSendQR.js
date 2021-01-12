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
        <View style={[ResetStyle.containerInner, {marginHorizontal: 0}]}>
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
          {/* Top */}
          <QRCodeScanner
            onRead={this.onSuccess}
            disableVibrationByUser={false}
            containerStyle={{width: '100%'}}
            cameraStyle={{width: '100%'}}
          />
        </View>
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
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
