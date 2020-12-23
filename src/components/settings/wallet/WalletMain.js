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
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';

const TestArray = [
  {
    id: 0,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 11323123123123,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사10',
  },
  {
    id: 1,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 11323123123123,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사8',
  },
  {
    id: 2,
    status: 'TRANSFER',
    statusDetail: 'SEND',
    TNC: 11323123123123,
    DATE: '2020-10-31 11:11:11',
    object: 'adad',
  },
  {
    id: 3,
    status: 'RECEIVE',
    statusDetail: null,
    TNC: 11323123123123,
    DATE: '2020-10-31 11:11:11',
    object: '설문조사10',
  },
  {
    id: 4,
    status: 'TRANSFER',
    statusDetail: 'RECEIVE',
    TNC: 11323123123123,
    DATE: '2020-10-31 11:11:11',
    object: 'acac',
  },
];

export default class WalletMain extends Component {
  render() {
    let TransactionArr = [];
    TestArray.map((data, index) => {
      TransactionArr = TransactionArr.concat(
        <View key={index}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[ResetStyle.fontRegularE, ResetStyle.fontB]}>
              {data.status}
            </Text>
            <Text style={[ResetStyle.fontRegularE, ResetStyle.fontB]}>
              {data.TNC} TNC
            </Text>
          </View>
          <View>
            <Text></Text>
            <Text></Text>
          </View>
        </View>,
      );
    });
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          <View
            style={{
              backgroundColor: '#f9f9f9',
              paddingTop: Platform.OS === 'ios' ? '15%' : '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '5%',
              paddingTop: '4%',
              //   paddingBottom: '10%',
            }}>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
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
            <TouchableOpacity
              onPress={() => {
                // console.log(this.props.navigation.openDrawer);
                // console.log(this.props.route.params?.openDrawer);
                this.props.navigation.openDrawer();
                // this.props.route.params?.openDrawer;
                // this.props.navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/menu_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'relative',
              left: '-6%',
              width: '112%',
              //   height: '100%',
              padding: '5%',
              backgroundColor: '#2d91ff',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[ResetStyle.fontLightE, {color: '#d2e7ff'}]}>
                Total Balance
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../../imgs/drawable-xxxhdpi/wallet_refresh_icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
                marginTop: '2%',
              }}>
              <Text style={[ResetStyle.fontLightE, ResetStyle.fontWhite]}>
                TNC
              </Text>
              <Text
                style={[
                  ResetStyle.fontBoldE,
                  ResetStyle.fontWhite,
                  {fontWeight: '400'},
                ]}>
                123,123,456,123
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '7%',
              }}>
              <TouchableOpacity
                style={[
                  ResetStyle.buttonSmall,
                  {
                    backgroundColor: '#fff',
                    width: '50%',
                    height: '100%',
                    borderColor: '#fff',
                    marginRight: 3,
                  },
                ]}>
                <Text
                  style={[
                    ResetStyle.buttonTexts,
                    {color: '#2d91ff', fontSize: 20, margin: 6},
                  ]}>
                  Send
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  ResetStyle.buttonSmall,
                  {
                    width: '50%',
                    height: '100%',
                    backgroundColor: '#2d91ff',
                    borderColor: '#fff',
                    borderWidth: 1,
                    marginLeft: 3,
                  },
                ]}>
                <Text
                  style={[ResetStyle.buttonTexts, {fontSize: 20, margin: 6}]}>
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[
              ResetStyle.fontBlack,
              ResetStyle.fontLightE,
              {
                textAlign: 'left',
                fontWeight: '500',
                marginTop: '9%',
                marginBottom: '9%',
              },
            ]}>
            Transactions
          </Text>
          <ScrollView>{TransactionArr}</ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
