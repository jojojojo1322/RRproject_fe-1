import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import ResetStyle from './style/ResetStyle';
import {useTranslation} from 'react-i18next';
import VideoPlayer from 'react-native-video-controls';

const TestPage = ({navigation}) => {
  const [videoUri, setVideoUri] = useState(
    'https://real-research-resources.s3.ap-northeast-2.amazonaws.com/static/survey/advertisement/video/advertisement_210125050404494_202101281114.mp4',
  );
  const [videoUri2, setVideoUri2] = useState(
    'https://www.youtube.com/watch?v=Kmiw4FYTg2U',
  );
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
                source={require('./imgs/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                TEST PAGE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', height: 400, borderWidth: 1}}></View>
      </View>
    </SafeAreaView>
  );
};

export default TestPage;
