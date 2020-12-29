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
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';

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
    this.props.navigation.navigate('WalletSendSuccess');
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
        <View style={[ResetStyle.containerInner]}>
          {/* 상단 화면 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
              paddingBottom: Platform.OS === 'ios' ? '4%' : '2%',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                style={{marginTop: '2%'}}
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, {fontWeight: '500'}]}>
                보내기
              </Text>
            </TouchableOpacity>
          </View>
          {/* 중단 화면 */}
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={[ResetStyle.fontLightK]}>Total Balance</Text>
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {fontWeight: '500'},
              ]}>
              1,000,000 TNC
            </Text>
          </View>

          <View>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '4%'},
                ]}>
                주소
              </Text>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    width: '85%',
                    // marginRight: '5%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: '2%',
                    borderBottomColor: '#dedede',
                    borderBottomWidth: 2,
                  }}>
                  <TextInput
                    style={[
                      ResetStyle.fontRegularK,
                      {
                        textAlign: 'left',
                      },
                    ]}
                    placeholder={`보낼 주소 입력`}
                  />
                  <TouchableOpacity>
                    <Image
                      source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require('../../../imgs/drawable-xxxhdpi/tnc_send_qr_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginTop: '10%', marginBottom: '4%'},
                ]}>
                총액
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '2%',
                  borderBottomColor: '#dedede',
                  borderBottomWidth: 2,
                }}>
                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    {
                      textAlign: 'left',
                    },
                  ]}
                  placeholder={`보낼 수량 입력`}
                />
                <TouchableOpacity>
                  <Image
                    source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      backgroundColor: '#f9f9f9',
                      alignItems: 'center',
                      width: '23%',
                      padding: Platform.OS === 'ios' ? '4%' : '4%',
                    },
                    this.state.tenth === true && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    this.handlePer('tenth');
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontG,
                      this.state.tenth === true && ResetStyle.fontWhite,
                    ]}>
                    10%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      backgroundColor: '#f9f9f9',
                      alignItems: 'center',
                      width: '23%',
                      padding: Platform.OS === 'ios' ? '4%' : '4%',
                    },
                    this.state.quarter === true && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    this.handlePer('quarter');
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontG,
                      this.state.quarter === true && ResetStyle.fontWhite,
                    ]}>
                    25%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      backgroundColor: '#f9f9f9',
                      alignItems: 'center',
                      width: '23%',
                      padding: Platform.OS === 'ios' ? '4%' : '4%',
                    },
                    this.state.half === true && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    this.handlePer('half');
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontG,
                      this.state.half === true && ResetStyle.fontWhite,
                    ]}>
                    50%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      borderRadius: 5,
                      backgroundColor: '#f9f9f9',
                      alignItems: 'center',
                      width: '23%',
                      padding: Platform.OS === 'ios' ? '4%' : '4%',
                    },
                    this.state.max === true && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    this.handlePer('max');
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontG,
                      this.state.max === true && ResetStyle.fontWhite,
                    ]}>
                    MAX
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginTop: '10%', marginBottom: '4%'},
                ]}>
                메모
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '2%',
                  borderBottomColor: '#dedede',
                  borderBottomWidth: 2,
                }}>
                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    {
                      textAlign: 'left',
                    },
                  ]}
                  placeholder={`메모 입력`}
                />
                <TouchableOpacity>
                  <Image
                    source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[ResetStyle.button]}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={[ResetStyle.buttonTexts]}>보내기</Text>
          </TouchableOpacity>
        </View>
        <WalletSendModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          confirm={this.setConfirm}
        />
      </SafeAreaView>
    );
  }
}
