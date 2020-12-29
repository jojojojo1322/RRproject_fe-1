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
import BottomModal from '../../factory/modal/BottomModal';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';
import QRCode from 'react-native-qrcode2';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

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
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              받기
            </Text>
          </View>
          <TextInput
            onChangeText={(text) => this.setState({text: text})}
            value={this.state.text}
          />
          <QRCode
            value={this.state.text}
            size={500}
            bgColor="#000"
            fgColor="white"
          />
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
          modal2Visible={this.state.modal2Visible}
          setModal2Visible={this.setModal2Visible}
          text={`복사되었습니다.`}
        />
      </SafeAreaView>
    );
  }
}
