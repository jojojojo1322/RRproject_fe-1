import React, {Component} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle.js';
import ResearchStyle from '../../style/ResearchStyle.js';

const data = [
  {
    id: '1',
    status: false,
    category: 'survey',
    title: '설문조사 제목 1',
    contents: '새로운 설문조사 등록되었습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '2',
    status: false,
    category: 'wallet',
    title: '설문조사 제목 2',
    contents: '설문조사 참여로 10 TNC 지급되었습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '3',
    status: false,
    category: 'wallet',
    title: 'SEND',
    contents: '지갑에서 10,000 TNC를 송금하였습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '4',
    status: false,
    category: 'wallet',
    title: '설문조사 제목 3',
    contents: '설문조사 참여로 10 TNC 지급되었습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '5',
    status: true,
    category: 'wallet',
    title: 'SEND',
    contents: '지갑에서 10,000 TNC를 송금하였습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '6',
    status: true,
    category: 'survey',
    title: '설문조사 제목 4',
    contents: '새로운 설문조사 등록되었습니다.',
    date: '2020-10-30 12:30',
  },
  {
    id: '7',
    status: true,
    category: 'wallet',
    title: '설문조사 제목 5',
    contents: '설문조사 참여로 10 TNC 지급되었습니다.',
    date: '2020-10-30 12:30',
  },
];

const Item = (data, navigation) => (
  <TouchableOpacity
    onPress={() => {
      data.category === 'survey'
        ? navigation.navigate('Main')
        : navigation.navigate('MainDetail');
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
      {data.contents}
    </Text>
    <Text
      style={[ResetStyle.fontLightK, ResetStyle.fontG, {textAlign: 'left'}]}>
      {data.date}
    </Text>
    {data.status === true ? (
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

export const MainAlert = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      contents={item.contents}
      date={item.date}
      status={item.status}
      navigation={navigation}
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
                navigation.goBack();
              }}>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              알림
            </Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
