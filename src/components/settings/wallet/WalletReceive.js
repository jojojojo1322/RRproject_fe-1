import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import Clipboard from '@react-native-community/clipboard';
import BottomModal from '../../factory/modal/BottomModal';
import ResetStyle from '../../../style/ResetStyle.js';
import AuthStyle from '../../../style/AuthStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode2';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const masterKey = 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG';
const dealDetail = {
  block: '1035613',
  total: '2',
  status: 'Receive',
  object: '회원가입',
  sender: '0x6565232c6565ed6565659desds6565c58s6565c58',
  recipient: '0x6565232c6565ed6565659desds6565c58s6565c58',
  memo: 'Test',
  DATE: '2020-10-30 20:16:21',
  TXID: '0x6565232c6565ed6565659desds6565c58c7',
};
export default class WalletReceive extends Component {
  state = {
    modalVisible: false,
    modal2Visible: false,
    text: '123asdfadswfgweg534sg2',
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
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
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                받기
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[ResetStyle.fontMediumK, {marginBottom: '10%'}]}>
              My Address
            </Text>
            {/* <View style={{borderWidth: 1}}> */}
            <QRCode
              value={masterKey}
              size={500}
              bgColor="#000"
              fgColor="white"
            />
            {/* </View> */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '10%',
                marginBottom: '10%',
              }}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                주소 공유하기
              </Text>
              <Image
                style={{width: 30, height: 25, marginLeft: '2%'}}
                source={require('../../../imgs/drawable-xxxhdpi/share_icon.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={AuthStyle.walletCopy}
              onPress={() => {
                this.setModal2Visible(true);
                this.copyToClipboard(masterKey);
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
              클릭하면 복사됩니다.
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
                this.props.navigation.navigate('WalletMain');
                // this.props.navigation.setOptions({ title: '약관동의' });
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                확인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={`공유되었습니다.`}
        />
        <BottomModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`복사되었습니다.`}
        />
      </SafeAreaView>
    );
  }
}
