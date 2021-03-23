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
import {useTranslation} from 'react-i18next';

const Media = ({navigation}) => {
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <StatusBar barStyle="dark-content" />
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View style={{marginLeft: '5%', marginRight: '5%'}}>
          <View style={ResetStyle.topBackButton}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('mediaTitle')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <WebView source={{uri: 'https://media.realresearcher.com'}} />
        {/* <WebView source={{uri: 'https://sponsor.realresearcher.com'}} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Media;
