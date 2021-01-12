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

export default class WalletSend extends Component {
  state = {
    tenth: false,
    quarter: false,
    half: false,
    max: false,
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  setConfirm = () => {
    this.props.navigation.navigate('WalletConfirmPassword');
    // this.props.navigation.navigate('WalletSendSuccess');
  };
  handlePer = (value) => {
    if (value === 'tenth') {
      this.setState({
        tenth: !this.state.tenth,
        quarter: false,
        half: false,
        max: false,
      });
    } else if (value === 'quarter') {
      this.setState({
        tenth: false,
        quarter: !this.state.quarter,
        half: false,
        max: false,
      });
    } else if (value === 'half') {
      this.setState({
        tenth: false,
        quarter: false,
        half: !this.state.half,
        max: false,
      });
    } else if (value === 'max') {
      this.setState({
        tenth: false,
        quarter: false,
        half: false,
        max: !this.state.max,
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[ResetStyle.containerInner]}>
            {/* Top */}
            {/* topBackButton */}
            <View style={ResetStyle.topBackButton}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
                />
              </TouchableOpacity>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                보내기
              </Text>
            </View>

            {/* Body */}
            <View style={[WalletStyle.sendBodyView]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {fontWeight: '400'},
                ]}>
                Total Balance
              </Text>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontB,
                  {fontWeight: '500', marginTop: '2%'},
                ]}>
                1,000,000 TNC
              </Text>
            </View>

            {/* Address */}
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    WalletStyle.sendContentTitle,
                  ]}>
                  주소
                </Text>
                <View style={[WalletStyle.sendContentInnerView]}>
                  <View
                    style={[
                      WalletStyle.sendContentInnerTextView,
                      {width: '85%'},
                    ]}>
                    <TextInput
                      style={[
                        ResetStyle.fontRegularK,
                        WalletStyle.sendContentInnerText,
                      ]}
                      placeholder={`보낼 주소 입력`}
                    />
                    <TouchableOpacity>
                      <Image
                        style={[ResetStyle.circleXButton]}
                        source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('WalletSendQR');
                    }}>
                    <Image
                      style={[WalletStyle.sendContentInnerXButton]}
                      source={require('../../../imgs/drawable-xxxhdpi/tnc_send_qr_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Total Amount */}
              <View style={[WalletStyle.sendTotalAmountView]}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    WalletStyle.sendContentTitle,
                    {
                      marginTop: Platform.OS === 'ios' ? '10%' : '5%',
                    },
                  ]}>
                  총액
                </Text>
                <View style={[WalletStyle.sendContentInnerTextView]}>
                  <TextInput
                    style={[
                      ResetStyle.fontRegularK,
                      WalletStyle.sendContentInnerText,
                    ]}
                    placeholder={`보낼 수량 입력`}
                  />
                  <TouchableOpacity>
                    <Image
                      style={[ResetStyle.circleXButton]}
                      source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                    />
                  </TouchableOpacity>
                </View>

                {/* Percent View */}
                <View style={[WalletStyle.sendPercentView]}>
                  <TouchableOpacity
                    style={[
                      WalletStyle.sendPercentTouchable,
                      this.state.tenth === true && {backgroundColor: '#2d91ff'},
                    ]}
                    onPress={() => {
                      this.handlePer('tenth');
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        this.state.tenth === true && ResetStyle.fontWhite,
                      ]}>
                      10%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      WalletStyle.sendPercentTouchable,
                      this.state.quarter === true && {
                        backgroundColor: '#2d91ff',
                      },
                    ]}
                    onPress={() => {
                      this.handlePer('quarter');
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        this.state.quarter === true && ResetStyle.fontWhite,
                      ]}>
                      25%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      WalletStyle.sendPercentTouchable,
                      this.state.half === true && {backgroundColor: '#2d91ff'},
                    ]}
                    onPress={() => {
                      this.handlePer('half');
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        this.state.half === true && ResetStyle.fontWhite,
                      ]}>
                      50%
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      WalletStyle.sendPercentTouchable,
                      this.state.max === true && {backgroundColor: '#2d91ff'},
                    ]}
                    onPress={() => {
                      this.handlePer('max');
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightK,
                        ResetStyle.fontG,
                        this.state.max === true && ResetStyle.fontWhite,
                      ]}>
                      MAX
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Comment */}
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    WalletStyle.sendContentTitle,
                    {
                      marginTop: Platform.OS === 'ios' ? '10%' : '5%',
                    },
                  ]}>
                  메모
                </Text>
                <View style={[WalletStyle.sendContentInnerTextView]}>
                  <TextInput
                    style={[
                      ResetStyle.fontRegularK,
                      WalletStyle.sendContentInnerText,
                    ]}
                    placeholder={`메모 입력`}
                  />
                  <TouchableOpacity>
                    <Image
                      style={[ResetStyle.circleXButton]}
                      source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Button */}
            <TouchableOpacity
              style={[ResetStyle.button]}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
                보내기
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {/* Modal */}
        <WalletSendModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          confirm={this.setConfirm}
        />
      </SafeAreaView>
    );
  }
}
