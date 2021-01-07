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
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';

const TestArray = [
  {
    id: 0,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사10',
  },
  {
    id: 1,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사8',
  },
  {
    id: 2,
    status: 'TRANSFER',
    statusDetail: 'SEND',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'adadasdsadasdasdasdasd',
  },
  {
    id: 3,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사10',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 10,
    DATE: '2020-10-31 11:11:11',
    object: 'acacasdasdasd',
  },
];

export default class WalletMain extends Component {
  render() {
    let TransactionArr = [];
    TestArray.map((data, index) => {
      TransactionArr = TransactionArr.concat(
        <TouchableOpacity
          key={index}
          style={[WalletStyle.transactionItemStyle]}
          onPress={() => {
            this.props.navigation.navigate('WalletDetail');
          }}>
          <View style={[WalletStyle.transactionItemInner]}>
            <Text
              style={[
                ResetStyle.fontRegularE,
                ResetStyle.fontB,
                {fontWeight: '500'},
                data.statusDetail == 'SEND' && {color: '#ff9100'},
              ]}>
              {data.status}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularE,
                ResetStyle.fontB,
                {fontWeight: '500'},
                data.statusDetail == 'SEND' && {color: '#ff9100'},
              ]}>
              {`${data.statusDetail == 'SEND' ? '-' : '+'} ${data.TNC} TNC`}
            </Text>
          </View>

          <View style={[WalletStyle.transactionItemInnerBottom]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontDG,
                {fontWeight: '500'},
              ]}>
              {data.object.length <= 10
                ? data.object
                : data.object.slice(0, 10) + '..'}
            </Text>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontDG,
                {fontWeight: '500'},
              ]}>
              {data.DATE}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    });
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View
          style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
          {/* Top*/}
          <View style={[WalletStyle.MainTopView]}>
            {/* Top Logo */}
            <TouchableOpacity>
              <View style={[WalletStyle.TopLogoView]}>
                <Image
                  source={require('../../../imgs/drawable-xxxhdpi/main_r_logo.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontB,
                    {marginLeft: 10},
                  ]}>
                  Real Research
                </Text>
              </View>
            </TouchableOpacity>

            {/* Hamburger Button */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Image
                style={[ResetStyle.topHamburgerImg]}
                source={require('../../../imgs/drawable-xxxhdpi/menu_2_icon.png')}
              />
            </TouchableOpacity>
          </View>
          {/* //Top End */}

          {/* My TNC */}
          <View style={[WalletStyle.myTncView]}>
            {/* Title & Refresh */}
            <View style={[WalletStyle.myTncTitleView]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '500'},
                ]}>
                Total Balance
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../../imgs/drawable-xxxhdpi/wallet_refresh_icon.png')}
                />
              </TouchableOpacity>
            </View>

            {/* My TNC Amount */}
            <View style={[WalletStyle.myTncAmountView]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '500', marginBottom: '1%'},
                ]}>
                {`TNC `}
              </Text>
              <Text
                style={[
                  ResetStyle.fontBoldE,
                  ResetStyle.fontWhite,
                  {fontWeight: '500'},
                ]}>
                123,123,456,123
              </Text>
            </View>

            {/* My TNC Button */}
            <View style={[WalletStyle.myTncButtonView]}>
              {/* Send Button */}
              <TouchableOpacity
                style={[ResetStyle.buttonSmall, WalletStyle.myTncButton]}
                onPress={() => {
                  this.props.navigation.navigate('WalletSend');
                }}>
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontB]}>
                  Send
                </Text>
              </TouchableOpacity>

              {/* Receive Button */}
              <TouchableOpacity
                style={[
                  ResetStyle.buttonSmall,
                  WalletStyle.myTncButton,
                  {
                    backgroundColor: '#4696ff',
                    borderColor: '#fff',
                    borderWidth: 1,
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('WalletReceive');
                }}>
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* My TNC End */}

          <Text
            style={[
              ResetStyle.fontBlack,
              ResetStyle.fontLightE,
              WalletStyle.transactionsStyle,
            ]}>
            Transactions
          </Text>
          <ScrollView style={[WalletStyle.transactionsScroll]}>
            {TransactionArr}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
