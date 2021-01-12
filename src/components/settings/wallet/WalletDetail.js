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
import WalletStyle from '../../../style/WalletStyle.js';

class List extends Component {
  render() {
    return (
      <View style={[WalletStyle.listView]}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            {textAlign: 'left', marginBottom: '2%'},
          ]}>
          {this.props.title}
        </Text>
        <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
          {this.props.sub}
        </Text>
      </View>
    );
  }
}

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

export default class WalletDetail extends Component {
  render() {
    return (
      <SafeAreaView style={[ResetStyle.container]}>
        <View style={[ResetStyle.containerInner, {marginHorizontal: 0}]}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton, {marginHorizontal: '5%'}]}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                this.props.navigation.goBack();
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
            <List title="블록번호" sub={dealDetail.block} />
            {/* 총액 */}
            <List title="총액" sub={dealDetail.total} />
            {/* 상태 */}
            <List title="상태" sub={dealDetail.status} />
            {/* 상세내용 */}
            <List title="상세내용" sub={dealDetail.object} />
            {/* 보낸사람 */}
            <List title="보낸사람" sub={dealDetail.sender} />
            {/* 받은사람 */}
            <List title="받은사람" sub={dealDetail.recipient} />
            {/* 메모 */}
            <List title="메모" sub={dealDetail.memo} />
            {/* 거래일시 */}
            <List title="거래일시" sub={dealDetail.DATE} />
            {/* TXID */}
            <List title="TXID" sub={dealDetail.TXID} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
