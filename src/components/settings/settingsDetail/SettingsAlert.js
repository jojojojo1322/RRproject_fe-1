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
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const [DATA] = useState([
    {
      id: '1',
      title: t('settingsAlert1'),
    },
    {
      id: '2',
      title: t('settingsAlert2'),
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
        id === '1'
          ? navigation.navigate('Settings')
          : id === '2'
          ? navigation.dispatch('TermsConditions', {
              name: '이용약관',
            })
          : navigation.dispatch('TermsConditions', {
              name: '개인정보처리방침',
            });
      }}>
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontBlack,
          {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
        ]}>
        {title}
      </Text>
      <Switch
        trackColor={{false: '#e6e6e6', true: '#4696ff'}}
        thumbColor={'#FFF'}
        ios_backgroundColor="#e6e6e6"
        onValueChange={id === '1' ? toggleSwitch : toggleSwitch2}
        value={id === '1' ? isEnabled : isEnabled2}
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
              {t('settingsAlertTitle')}
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
