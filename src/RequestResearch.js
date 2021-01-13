import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ResetStyle from './style/ResetStyle';
import {WebView} from 'react-native-webview';

export const RequestResearch = ({navigation}) => {
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View
          style={{
            marginLeft: '5%',
            marginRight: '5%',
          }}>
          <View style={ResetStyle.topBackButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('./imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              설문조사 의뢰하기
            </Text>
          </View>
        </View>
        {/* <WebView source={{uri: 'https://media.realresearcher.com'}} /> */}
        <WebView source={{uri: 'https://sponsor.realresearcher.com'}} />
      </View>
    </SafeAreaView>
  );
};

export default RequestResearch;
