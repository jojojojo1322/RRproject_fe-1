import React from 'react';
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
  FlatList,
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
// import {FlatList} from 'react-native-gesture-handler';
const masterKey = 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG';
const TestArray = [
  {
    status: 'success',
    msg: 'success',
    transactions: [
      {
        index: 9,
        timestamp: '2021-01-14T08:19:03',
        status: 'account_update',
        txid: '60680a1b1b937ebb25cb7ff1688eb78f2b18f476',
        block: 3237857,
        content: {},
      },
      {
        index: 8,
        timestamp: '2021-01-08T07:14:33',
        status: 'transfer',
        txid: '6c43ed025d8ef7310e5f7d1f2911c52a3d458653',
        block: 3063768,
        content: {
          amount: '20.000000 TNC',
          memo: 'hihi',
          from: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 6,
        timestamp: '2021-01-08T07:12:30',
        status: 'transfer',
        txid: 'bf8ac5fab8a2a92cad677b185c62f8cde6946a65',
        block: 3063727,
        content: {
          amount: '20.000000 TNC',
          memo: 'hihi',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 7,
        timestamp: '2021-01-08T07:12:30',
        status: 'transfer',
        txid: '3de3230b23fa6204eebc76e35bcdfc5da544fc3a',
        block: 3063727,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 5,
        timestamp: '2021-01-06T02:45:15',
        status: 'transfer',
        txid: 'ca5aa1360ef19ed17701156acef9b63e1615d73a',
        block: 3000782,
        content: {
          amount: '10.000000 TNC',
          memo: 'dd6a0a9c',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 4,
        timestamp: '2021-01-06T01:58:54',
        status: 'transfer',
        txid: '8513defd96790ab73dc7b554d45650a30ce2ff8c',
        block: 2999855,
        content: {
          amount: '10.000000 TNC',
          memo: '5f71e322',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 3,
        timestamp: '2020-12-23T07:28:39',
        status: 'transfer',
        txid: '08495f573edf828ae9fa299329452dba8d47f8e8',
        block: 2603250,
        content: {
          amount: '5.000000 TNC',
          memo: '75fd0c65',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 2,
        timestamp: '2020-12-22T07:52:42',
        status: 'transfer',
        txid: '51a7b5377a1d1242245c47855b9fa978c3ac85ab',
        block: 2574931,
        content: {
          amount: '10.000000 TNC',
          memo: 'dbef4623',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 1,
        timestamp: '2020-12-17T05:44:12',
        status: 'transfer',
        txid: 'e3567886ee5366d37a5e245c46f2c7325e002a24',
        block: 2428361,
        content: {
          amount: '1.000000 TNC',
          memo: 'hihi',
          from: 'RR7vE29zqS6Aing1SfsR57NQQqbsgkn7nRmRRpf8K6mj1WysndES',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 0,
        timestamp: '2020-12-10T02:30:57',
        status: 'account_create',
        txid: 'fcbb09a40167052992615f85b4ffb64ab034d79b',
        block: 2222896,
        content: {},
      },
    ],
  },
];
const TestArrayFix = TestArray[0].transactions;
const Item = (data) => (
  <TouchableOpacity
    // key={index}
    style={[WalletStyle.transactionItemStyle, {marginHorizontal: '5%'}]}
    onPress={() => {
      data.navigation.navigate('WalletDetail', {
        data: data,
      });
    }}>
    <View style={[WalletStyle.transactionItemInner]}>
      <Text
        style={[
          ResetStyle.fontRegularE,
          ResetStyle.fontB,
          {fontWeight: '500'},
          data.content.to &&
            data.content.to !== masterKey && {color: '#ff9100'},
        ]}>
        {data.status}
      </Text>
      <Text
        style={[
          ResetStyle.fontRegularE,
          ResetStyle.fontB,
          {fontWeight: '500'},
          data.content.to &&
            data.content.to !== masterKey && {color: '#ff9100'},
        ]}>
        {data.content.to &&
          `${data.content.to !== masterKey ? '-' : '+'} ${data.content.amount}`}
        {/* {`${data.content.length}`} */}
      </Text>
    </View>

    <View style={[WalletStyle.transactionItemInnerBottom]}>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontDG, {fontWeight: '500'}]}>
        {/* {data.content.to && data.content.to.length <= 10
          ? data.content.to
          : data.content.to.slice(0, 10) + '..'} */}
        {data.content.to &&
          (data.content.to.length <= 10
            ? data.content.to
            : data.content.to.slice(0, 10) + '...')}
      </Text>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontDG, {fontWeight: '500'}]}>
        {data.timestamp.replace('T', ' ')}
      </Text>
    </View>
  </TouchableOpacity>
);

const WalletMain = (props) => {
  const renderItem = ({item}) => (
    <Item
      navigation={props.navigation}
      status={item.status}
      statusDetail={item.statusDetail}
      TNC={item.TNC}
      DATE={item.DATE}
      object={item.object}
      index={item.index}
      timestamp={item.timestamp}
      status={item.status}
      txid={item.txid}
      block={item.block}
      content={item.content}
    />
  );
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
              props.navigation.openDrawer();
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
                props.navigation.navigate('WalletSend');
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
                props.navigation.navigate('WalletReceive');
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
        {/* <ScrollView style={[WalletStyle.transactionsScroll]}>
            {TransactionArr}
          </ScrollView> */}
        <FlatList
          data={TestArrayFix}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            // flexDirection: 'column-reverse',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default WalletMain;
