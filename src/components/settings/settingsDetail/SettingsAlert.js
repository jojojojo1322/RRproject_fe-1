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
import email from 'react-native-email';

// import NotiService from './NotiService';

function handleEmail(status) {
  const to = ['rrmaster@gmail.com']; // string or array of email addresses
  email(to, {
    // Optional additional arguments
    // cc: ['bazzy@moo.com', 'doooo@daaa.com'],
    // string or array of email addresses
    // bcc: 'mee@mee.com',
    // string or array of email addresses
    subject: 'Real Research Support',
    body:
      '리얼 리서치는 회원님들의 원활한 이용을 위해 영어, 러시아어, 한국어 총 3개 언어를 지원하고 있습니다. 도움이 필요하시면 언제든 문의해주십시오.',
  }).catch(console.error);
}

const SettingsAlert = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);

  const [DATA] = useState([
    {
      id: '1',
      title: 'Research 알림',
    },
    {
      id: '2',
      title: '리워드 지급 알림',
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
              알림 설정
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
        <TouchableOpacity>
          <Text>123456</Text>
          <Button title="Send Mail" onPress={handleEmail} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsAlert;
