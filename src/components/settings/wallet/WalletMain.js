import React, {useState, useEffect} from 'react';
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
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {server} from '../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

const masterKey = 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG';
const TestArray = [
  {
    status: 'success',
    msg: 'success',
    transactions: [
      {
        index: 32,
        timestamp: '2021-01-21T03:52:03',
        status: 'transfer',
        txid: '7c8771748803b32188577dfc0920b9f0a22b466a',
        block: 3434117,
        content: {
          amount: '0.100000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 33,
        timestamp: '2021-01-21T03:52:03',
        status: 'transfer',
        txid: 'cc55677b6d29a1f8e09dbe88e941226f4c88c5d8',
        block: 3434117,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 30,
        timestamp: '2021-01-21T03:51:21',
        status: 'transfer',
        txid: '5a526b97955127e6d820b5e196b7840291cbd32d',
        block: 3434103,
        content: {
          amount: '0.100000 TNC',
          surveyName: '설문이름입니다.',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 31,
        timestamp: '2021-01-21T03:51:21',
        status: 'transfer',
        txid: '05fb1e5499216f42a80548480df613a43bf77483',
        block: 3434103,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 28,
        timestamp: '2021-01-20T07:07:06',
        status: 'transfer',
        txid: '6412e76f0f371c2a63e584d8c5ead39c89718fcd',
        block: 3409218,
        content: {
          amount: '0.100000 TNC',
          surveyName: '설문이름입니다.',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 29,
        timestamp: '2021-01-20T07:07:06',
        status: 'transfer',
        txid: 'fb4b2595d48464fe5981aa9f1da1272b5e9dd593',
        block: 3409218,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 26,
        timestamp: '2021-01-20T07:06:00',
        status: 'transfer',
        txid: 'd1655374ecddcca47b5f672540a97aa9267e9f90',
        block: 3409196,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 27,
        timestamp: '2021-01-20T07:06:00',
        status: 'transfer',
        txid: '8491ec95be460ce986a0b910d7f7aa947016bdc6',
        block: 3409196,
        content: {
          amount: '0.100000 TNC',
          surveyName: '설문이름입니다.',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 25,
        timestamp: '2021-01-20T07:05:42',
        status: 'transfer',
        txid: 'bf8d90259051682f1d5a4b45e9cebc72a911260c',
        block: 3409190,
        content: {
          amount: '95.000000 TNC',
          memo: 'ㅎㅇㅎㅇ',
          from: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 24,
        timestamp: '2021-01-20T07:04:06',
        status: 'transfer',
        txid: '6ad923a22fed418a6e8647445628e3202cbdb999',
        block: 3409158,
        content: {
          amount: '0.100000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 23,
        timestamp: '2021-01-20T07:03:42',
        status: 'transfer',
        txid: '4a00f6b6a584eb38e08eb25e068299350bd40ff2',
        block: 3409150,
        content: {
          amount: '0.100000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 22,
        timestamp: '2021-01-20T07:03:24',
        status: 'transfer',
        txid: '73685052792f5e2ae60af2189266f18aa1fc0841',
        block: 3409144,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 20,
        timestamp: '2021-01-20T06:41:09',
        status: 'transfer',
        txid: 'afeccea18c956c0e517702699046d84052063e40',
        block: 3408699,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 21,
        timestamp: '2021-01-20T06:41:09',
        status: 'transfer',
        txid: 'ffd96123f67bec3449874cf3cb02f5acbd110c13',
        block: 3408699,
        content: {
          amount: '0.100000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6w9AxaNWSZPZ4v2LcN7BK7aQB4gPVRWXmD1s7QDWzyv8xFf4sg',
        },
      },
      {
        index: 19,
        timestamp: '2021-01-20T06:39:15',
        status: 'transfer',
        txid: '9b0336d49643a9298357a3162e98168c05556298',
        block: 3408661,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 18,
        timestamp: '2021-01-20T05:39:06',
        status: 'transfer',
        txid: '4bf94a950e625976019f5e35163616388dea9b26',
        block: 3407458,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 17,
        timestamp: '2021-01-20T01:36:24',
        status: 'transfer',
        txid: '28b31a9b9d0d6b85b7ead405c39f83fbf5d2cb7b',
        block: 3402604,
        content: {
          amount: '10.000000 TNC',
          memo: 'd3780545',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 16,
        timestamp: '2021-01-20T01:35:39',
        status: 'transfer',
        txid: '0aa260b361eccaae02f56ffa47b9dc99bab2b5be',
        block: 3402589,
        content: {
          amount: '10.000000 TNC',
          memo: 'db000702',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 15,
        timestamp: '2021-01-20T01:34:33',
        status: 'transfer',
        txid: 'ca43ef43bf7b6b11f6dece9040d739442c6b44cd',
        block: 3402567,
        content: {
          amount: '10.000000 TNC',
          memo: 'db000703',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 14,
        timestamp: '2021-01-20T01:33:30',
        status: 'transfer',
        txid: 'e4a775c49a384d081cbbd45a3db5e9258617a59a',
        block: 3402546,
        content: {
          amount: '10.000000 TNC',
          memo: 'd615be0f',
          from: 'RR8JiLTW12TtTCqsV2TTJKJP23yAnEUuPESJB9t6aqQo2UfoM7gv',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 12,
        timestamp: '2021-01-19T08:44:42',
        status: 'transfer',
        txid: '34376e07cd5a14301005a4ea377332c26d938cb3',
        block: 3382370,
        content: {
          amount: '0.010000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 13,
        timestamp: '2021-01-19T08:44:42',
        status: 'transfer',
        txid: 'a4ed3248b03903e183c9a46860f574e641f860ff',
        block: 3382370,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
      {
        index: 10,
        timestamp: '2021-01-19T03:02:36',
        status: 'transfer',
        txid: 'efb5c58e831268e4f7a7982447c83e5b843062ad',
        block: 3375528,
        content: {
          amount: '0.010000 TNC',
          memo: 'test',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
        },
      },
      {
        index: 11,
        timestamp: '2021-01-19T03:02:36',
        status: 'transfer',
        txid: '4652bc871653b46c7c1a9a251fadcb190a85c366',
        block: 3375528,
        content: {
          amount: '10.000000 TNC',
          memo: 'Transaction Fee',
          from: 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG',
          to: 'RR6LPkBZHGTa1HjXhYmbxCYif4sfNJ9HVUEEPhk8L7vLXuSN1c8W',
        },
      },
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
        {data.content.surveyName && data.content.surveyName}
        {!data.content.surveyName &&
          data.content.to &&
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
  const [walletData, setWalletData] = useState([]);
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   await axios
  //     .post(`${server}/wallet/history`, {
  //       email: email,
  //       from: from,
  //       limit: limit
  //     })
  //     .then((response) => {
  //       setWalletData({

  //       });
  //     })
  //     .catch((e) => {
  //       console.log('error', e);
  //     });
  // }, []);

  useEffect(() => {
    AsyncStorage.setItem('email', 'a@c.com', () => {
      console.log('유저 닉네임 저장 완료');
    });
    getWalletApi();
  }, []);

  const getWalletApi = async () => {
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        console.log('walletData>>>>>', response.data);
        setWalletData(response.data);
        setTotal(Number(response.data.balance.replace(' TNC', '')));
        console.log(walletData);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

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
              {numberWithCommas(total)}
            </Text>
          </View>

          {/* My TNC Button */}
          <View style={[WalletStyle.myTncButtonView]}>
            {/* Send Button */}
            <TouchableOpacity
              style={[ResetStyle.buttonSmall, WalletStyle.myTncButton]}
              onPress={() => {
                props.navigation.navigate('WalletSend', {
                  qrcode: 'e.data',
                });
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
