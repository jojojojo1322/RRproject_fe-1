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

export const MainAlert = (props) => {
  const [alertData, setAlertData] = useState(props.route.params?.alertData);
  useEffect(() => {
    // console.log('MAINALERT', props.route.params?.alertData);
    console.log('MAINALERT', alertData);
  }, []);
  // useEffect(()=>{
  //   axios
  //   .post(`${server}/kyc`, {
  //       birthday: birthday,
  //       countryCd: countryCd,
  //       countryCity: countryCity,
  //       countryResidence: countryResidence,
  //       gender: gender,
  //       languageCd: languageCd,
  //       marriageStatus: marriageStatus,
  //       userNo: userNo,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data.ret_val);
  //       this.setState({
  //         returnValue: response.data.ret_val,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // },[])

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
                source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              알림
            </Text>
          </View>
        </View>
        <FlatList
          data={alertData}
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
