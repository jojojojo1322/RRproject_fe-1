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
import AuthStyle from '../../style/AuthStyle.js';
import Video from 'react-native-video';
import Clipboard from '@react-native-community/clipboard';
import BottomModal from '../factory/modal/BottomModal';
import {ProgressCircle} from 'react-native-svg-charts';

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

function VideoTXID(props) {
  copyToClipboard = (value) => {
    Clipboard.setString(value);
  };
  return (
    <SafeAreaView
      style={[MainStyle.mainFlatlistView, {backgroundColor: '#fff'}]}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../imgs/drawable-xxxhdpi/ad_wallet_icon.png')}
        />
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {marginTop: '5%', lineHeight: 25},
          ]}>
          설문조사를 완료해주셔서 감사합니다.{'\n'}
          블록체인 네트워크에서 확인 완료 후{'\n'}
          당신의 리워드 코인을 받으실 수 있습니다.
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          marginTop: '6%',
          marginBottom: '6%',
          borderBottomWidth: 1,
          borderBottomColor: '#dedede',
          alignSelf: 'center',
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginRight: '2%'}]}>
          TXID
        </Text>
        <Image
          source={require('../../imgs/drawable-xxxhdpi/txid_questionmark_icon.png')}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[
            AuthStyle.walletCopy,
            {
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
              marginBottom: '5%',
            },
          ]}
          onPress={() => {
            props.setModalVisible(true);
            console.log(props);
            copyToClipboard('123');
            // this.copyToClipboard(this.props.route.params?.walletAddress);
          }}>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontDG,
              {paddingTop: 20, paddingBottom: 20, textAlign: 'left'},
            ]}>
            {/* {this.props.route.params?.walletAddress} */}123
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontG,
            {marginTop: 10, marginBottom: 70},
          ]}>
          클릭하면 복사됩니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function VideoKYC({navigation}) {
  return (
    <SafeAreaView
      style={[MainStyle.mainFlatlistView, {backgroundColor: '#fff'}]}>
      <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
        안 하면 손해!
      </Text>
      <Text
        style={[
          ResetStyle.fontMediumK,
          ResetStyle.fontDG,
          {marginTop: '6%', marginBottom: '6%'},
        ]}>
        지금 당장 KYC LEVEL UP 하고{'\n'}더 많은 설문조사를 시작하세요!
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        {/* progress 최대 수치 1 */}
        <ProgressCircle
          style={{
            width: 160,
            height: 160,
            backgroundColor: '#FFF',
            borderRadius: 60,
          }}
          progress={0.086}
          progressColor={'#0080ff'}
          strokeWidth={3}
        />

        <View
          style={{
            position: 'absolute',
            top: 40,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: '#0080ff',
            paddingBottom: 5,
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontB,
              {fontWeight: '500', marginRight: 5},
            ]}>
            KYC LEVEL
          </Text>
        </View>
        <Text
          style={[
            ResetStyle.fontBoldE,
            ResetStyle.fontB,
            {fontSize: 40, marginTop: 5, position: 'absolute', top: 75},
          ]}>
          2
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default class MainVideo extends Component {
  state = {
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  // copyToClipboard = (value) => {
  //   Clipboard.setString(value);
  // };
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
        {/* <VideoList /> */}
        <VideoTXID
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
        />
        {/* <VideoKYC /> */}
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
        <BottomModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
          text={`복사되었습니다.`}
        />
      </SafeAreaView>
    );
  }
}
