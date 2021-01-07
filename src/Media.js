import React, {Component} from 'react';
import {
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

export const Media = ({navigation}) => {
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
                source={require('./imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}></Text>
          </View>
        </View>
        <WebView source={{uri: 'https://media.realresearcher.com'}} />
        {/* <WebView source={{uri: 'https://sponsor.realresearcher.com'}} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Media;