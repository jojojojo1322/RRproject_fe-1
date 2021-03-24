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
import ResetStyle from '@style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import WalletStyle from '@style/WalletStyle.js';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

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
  const {t, i18n} = useTranslation();
  console.log('array length', props.route.params?.data.content.length);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner, {marginHorizontal: 0}]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton, {marginHorizontal: '5%'}]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('walletDetailTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: '5%'}}>
          {/* 블록번호 */}
          <List
            title={t('walletDetail1')}
            sub={props.route.params?.data.block}
          />
          {/* 총액 */}
          {props.route.params?.data.content.to && (
            <List
              title={t('walletDetail2')}
              sub={props.route.params?.data.content.amount}
            />
          )}
          {/* 상태 */}
          <List
            title={t('walletDetail4')}
            sub={props.route.params?.data.status}
          />
          {/* 상세내용 */}
          {props.route.params?.data.content.surveyName && (
            <List
              title={t('walletDetail5')}
              sub={props.route.params?.data.surveyName}
            />
          )}
          {/* 보낸사람 */}
          {props.route.params?.data.content.to && (
            <List
              title={t('walletDetail6')}
              sub={props.route.params?.data.content.from}
            />
          )}
          {/* 받은사람 */}
          {props.route.params?.data.content.to && (
            <List
              title={t('walletDetail7')}
              sub={props.route.params?.data.content.to}
            />
          )}
          {/* 메모 */}
          {props.route.params?.data.content.to && (
            <List
              title={t('walletDetail8')}
              sub={props.route.params?.data.content.memo}
            />
          )}
          {/* 거래일시 */}
          <List
            title={t('walletDetail9')}
            sub={(props.route.params?.data.timestamp).replace(/T/, ' ')}
          />
          {/* TXID */}
          <List
            title={t('walletDetail10')}
            sub={props.route.params?.data.txid}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WalletDetail;
