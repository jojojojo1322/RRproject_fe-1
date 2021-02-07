import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
  Platform,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const SettingsAlert = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [DATA] = useState([
    {
      id: '1',
      title: t('settingsLanguage1'),
    },
    {
      id: '2',
      title: t('settingsLanguage2'),
    },
    {
      id: '3',
      title: t('settingsLanguage3'),
    },
    {
      id: '4',
      title: t('settingsLanguage4'),
    },
    {
      id: '5',
      title: t('settingsLanguage5'),
    },
  ]);

  const Item = ({title, id, onPress}) => {
    CheckedArrObject = new SelectedCheckboxes();
    return (
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
        onPress={() => {}}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
          ]}>
          {title}
        </Text>
        <RoundCheckbox
          size={25}
          keyValue={Number(id)}
          checked={false}
          checkedObjArr={CheckedArrObject}
        />
      </TouchableOpacity>
    );
  };

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
              {t('settingsLanguageTitle')}
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

export default SettingsAlert;
