import React, {Component, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import {CommonActions, StackActions} from '@react-navigation/native';

import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const Settings = ({navigation}) => {
  const {t, i18n} = useTranslation();
  console.log('navigationnavigationnavigationnavigationnavigation', navigation);
  const [DATA] = useState([
    {
      id: '1',
      title: t('settings1'),
    },
    {
      id: '2',
      title: t('settings2'),
    },
    {
      id: '3',
      title: t('settings3'),
    },
    {
      id: '4',
      title: t('settings4'),
    },
    {
      id: '5',
      title: t('settings5'),
    },
    {
      id: '6',
      title: t('settings6'),
    },
    {
      id: '7',
      title: t('settings7'),
    },
  ]);

  const Item = ({title, id, onPress}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        paddingLeft: '5%',
        paddingRight: '5%',
      }}
      onPress={() => {
        if (id === '1') {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsPersonalPassword'));
        } else if (id === '2') {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsWallet'));
        } else if (id === '3') {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsLock'));
        } else if (id === '4') {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsAlert'));
        } else if (id === '5') {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsLanguage'));
        } else if (id === '6') {
          navigation.navigate('Settings');
          navigation.dispatch(
            StackActions.push('TermsConditions', {
              name: '이용약관',
            }),
          );
        } else if (id === '7') {
          navigation.navigate('Settings');
          navigation.dispatch(
            StackActions.push('TermsConditions', {
              name: '개인정보처리방침',
            }),
          );
        } else {
          navigation.navigate('Settings');
          navigation.dispatch(StackActions.push('SettingsLock'));
        }
      }}
      // onPress={() => {
      //   navigation.navigate('SettingsLock');
      //   navigation.dispatch(StackActions.push('SettingsLock'));
      // }}
    >
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontBlack,
          {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
        ]}>
        {title}
      </Text>
      <Image
        style={{width: 30, height: 30}}
        source={require('../../../imgs/drawable-xxxhdpi/icon_more_b.png')}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item title={item.title} id={item.id} />;
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View
          style={[
            ResetStyle.topBackButton,
            {marginLeft: '5%', marginRight: '5%'},
          ]}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('settingsTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
