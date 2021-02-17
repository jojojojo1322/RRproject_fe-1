import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import axios from 'axios';
import {server} from '../defined/server';
import {ScrollView} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle.js';
import ResearchStyle from '../../style/ResearchStyle.js';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const Item = (data) => (
  <TouchableOpacity
    onPress={() => {
      console.log('data', data.id);
      data.status === false && data.alertCheckApi(data.id);
      data.category === 'SURVEY'
        ? data.navigation.navigate('Main')
        : data.navigation.navigate('WalletMain');
    }}
    style={{
      borderTopWidth: 1,
      borderTopColor: '#dddddd',
      paddingTop: '5%',
      paddingBottom: '5%',
      marginLeft: '5%',
      marginRight: '5%',
    }}>
    <Text
      style={[
        ResetStyle.fontMediumK,
        ResetStyle.fontBlack,
        {textAlign: 'left', fontWeight: '500'},
      ]}>
      {data.title}
    </Text>
    <Text
      style={[
        ResetStyle.fontRegularK,
        ResetStyle.fontBlack,
        {textAlign: 'left', marginTop: '2%', marginBottom: '2%'},
      ]}>
      {data.body}
    </Text>
    <Text
      style={[ResetStyle.fontLightK, ResetStyle.fontG, {textAlign: 'left'}]}>
      {data.createTime}
    </Text>
    {data.status === false ? (
      <View
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: '#FF9100',
        }}></View>
    ) : null}
  </TouchableOpacity>
);

const MainAlert = (props) => {
  const {t, i18n} = useTranslation();
  const [alertData, setAlertData] = useState(props.route.params?.alertData);

  useEffect(() => {
    // console.log('MAINALERT', props.route.params?.alertData);
    console.log('MAINALERT', alertData);
  }, []);

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      body={item.body}
      createTime={item.createTime}
      status={item.status}
      id={item.id}
      category={item.category}
      navigation={props.navigation}
      alertCheckApi={props.route.params?.alertCheckApi}
    />
  );
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View style={{marginLeft: '5%', marginRight: '5%'}}>
          <View style={ResetStyle.topBackButton}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../imgs/backIcon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('mainAlertTitle')}
            </Text>
          </View>
        </View>
        <FlatList
          data={alertData}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            // Number(item.level);
            index.toString()
          }
          contentContainerStyle={{
            justifyContent: 'flex-start',
            flexDirection: 'column-reverse',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainAlert;
