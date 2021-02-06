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
  FlatList,
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import WalletStyle from '../../../style/WalletStyle.js';

const List = (data) => {
  return (
    <View style={[WalletStyle.listView]}>
      <Text
        style={[
          ResetStyle.fontRegularK,
          {textAlign: 'left', marginBottom: '2%'},
        ]}>
        {data.title}
      </Text>
      <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
        {data.sub}
      </Text>
    </View>
  );
};

const WalletDetail = (props) => {
  console.log('array length', props.route.params?.data.content.length);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner, {marginHorizontal: 0}]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton, {marginHorizontal: '5%'}]}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              전송내역 상세
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: '5%'}}>
          {/* 블록번호 */}
          <List title="블록번호" sub={props.route.params?.data.block} />
          {/* 총액 */}
          {props.route.params?.data.content.to && (
            <List title="총액" sub={props.route.params?.data.content.amount} />
          )}
          {/* 상태 */}
          <List title="상태" sub={props.route.params?.data.status} />
          {/* 상세내용 */}
          {props.route.params?.data.content.surveyName && (
            <List title="상세내용" sub={props.route.params?.data.surveyName} />
          )}
          {/* 보낸사람 */}
          {props.route.params?.data.content.to && (
            <List
              title="보낸사람"
              sub={props.route.params?.data.content.from}
            />
          )}
          {/* 받은사람 */}
          {props.route.params?.data.content.to && (
            <List title="받은사람" sub={props.route.params?.data.content.to} />
          )}
          {/* 메모 */}
          {props.route.params?.data.content.to && (
            <List title="메모" sub={props.route.params?.data.content.memo} />
          )}
          {/* 거래일시 */}
          <List
            title="거래일시"
            sub={(props.route.params?.data.timestamp).replace(/T/, ' ')}
          />
          {/* TXID */}
          <List title="TXID" sub={props.route.params?.data.txid} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WalletDetail;
