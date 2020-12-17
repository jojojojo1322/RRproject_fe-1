import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import MainStyle from '../../style/MainStyle.js';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import Reset from '../resetPassword/Reset.js';

const data = [
  {
    id: '1',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 1 AD Title 1 AD Title 1 AD Title 1',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
  {
    id: '2',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 2 AD Title 2 AD Title 2 AD Title 2',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
  {
    id: '3',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 3 AD Title 3 AD Title 3 AD Title 3',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
  {
    id: '4',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 4 AD Title 4 AD Title 4 AD Title 4',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
  {
    id: '5',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 5 AD Title 5 AD Title 5 AD Title 5',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
  {
    id: '6',
    videoUri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    videoTitle: 'AD Title 6 AD Title 6 AD Title 6 AD Title 6',
    videoSub: 'AD sub title AD sub titleAD sub title',
    videoDate: '2020.12.03',
  },
];

const Item = ({videoUri, videoTitle, videoSub, videoDate, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '90%',
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 15,
    }}>
    <View style={{width: '45%', height: '15%', marginRight: '5%'}}>
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }} // Can be a URL or a local file.
        // ref={(ref) => {
        //   this.player = ref;
        // }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        // shouldPlay
        // isLooping
        paused={true}
        // onBuffer={this.onBuffer}
        // onError={this.videoError}
        style={{width: '100%', height: 105}}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: '190%', left: '38%'}}>
        <Image
          source={require('../../imgs/drawable-xxxhdpi/ad_play_icon_s.png')}
        />
      </TouchableOpacity>
    </View>

    <View style={{width: '50%'}}>
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontBlack,
          {textAlign: 'left', marginBottom: 2},
        ]}>
        {videoTitle}
      </Text>
      <Text
        style={[
          ResetStyle.fontLightK,
          ResetStyle.fontDG,
          {textAlign: 'left', marginBottom: 2},
        ]}>
        {videoSub}
      </Text>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontG, {textAlign: 'left'}]}>
        {videoDate}
      </Text>
    </View>
  </TouchableOpacity>
);

function VideoList({navigation}) {
  console.log(navigation);
  const renderItem = ({item}) => (
    <Item
      videoUri={item.videoUri}
      videoTitle={item.videoTitle}
      videoSub={item.videoSub}
      videoDate={item.videoDate}
      // onPress={() => {
      //   navigation.navigate('MainDetail');
      // }}
    />
  );

  return (
    <SafeAreaView
      style={[MainStyle.mainFlatlistView, {backgroundColor: '#fff'}]}>
      {/* <ScrollView style={{width: '100%'}}> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default class MainVideo extends Component {
  render() {
    return (
      <SafeAreaView style={[ResetStyle.container, {backgroundColor: '#fff'}]}>
        <View
          style={{
            width: '100%',
            height: '27%',
            marginBottom: '5%',
          }}>
          <Video
            source={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            ref={(ref) => {
              this.player = ref;
            }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            // onBuffer={this.onBuffer}
            // onError={this.videoError}
            style={{width: '100%', height: '100%'}}
            controls={true}
            fullscreenOrientation={'landscape'}
          />
        </View>
        <VideoList />
        <TouchableOpacity
          style={[
            ResetStyle.button,
            {
              position: 'absolute',
              bottom: '5%',
              left: '5%',
              width: '90%',
              alignSelf: 'center',
            },
          ]}
          activeOpacity={0.75}
          onPress={() => {
            this.props.navigation.navigate('MainTest');
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {fontWeight: '600'},
            ]}>
            리워드 받기
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
