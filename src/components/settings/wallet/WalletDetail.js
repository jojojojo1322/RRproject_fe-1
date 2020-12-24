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
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
              paddingBottom: Platform.OS === 'ios' ? '6%' : '2%',
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
                전송내역 상세
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '8%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                블록번호
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.block}
              </Text>
            </View>
            {/* 총액 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                총액
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.total} TNC
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                상태
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.status}
              </Text>
            </View>

            {/* 상세내용 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                상세내용
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.object}
              </Text>
            </View>
            {/* 보낸사람 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                보낸사람
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.sender}
              </Text>
            </View>
            {/* 받은사람 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                받은사람
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.recipient}
              </Text>
            </View>
            {/* 메모 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                메모
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.memo}
              </Text>
            </View>
            {/* 거래일시 */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                거래일시
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.DATE}
              </Text>
            </View>
            {/* TXID */}
            <View
              style={{
                borderBottomColor: '#dedede',
                borderBottomWidth: 1,
                paddingTop: '5%',
                paddingBottom: '5%',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  {textAlign: 'left', marginBottom: '2%'},
                ]}>
                TXID
              </Text>
              <Text style={[ResetStyle.fontRegularK, {textAlign: 'left'}]}>
                {dealDetail.TXID}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
