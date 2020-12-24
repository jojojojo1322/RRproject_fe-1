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
import {RoundCheckbox, SelectedCheckboxes} from '../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../style/ResetStyle.js';

const SettingsLock = ({navigation}) => {
  const [DATA] = useState([
    {
      id: '1',
      title: '사용 안함',
    },
    {
      id: '2',
      title: '비밀번호',
    },
    {
      id: '3',
      title: '패턴',
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
      <Image
        style={{width: 30, height: 30}}
        source={require('../../imgs/drawable-xxxhdpi/icon_more_b.png')}
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
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
          </TouchableOpacity>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
            잠금 설정
          </Text>
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

export default SettingsLock;
