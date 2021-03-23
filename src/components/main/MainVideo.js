import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import MainStyle from '@style/MainStyle.js';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ProgressModal from '@factory/modal/ProgressModal';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {useTranslation} from 'react-i18next';
import {server} from '../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainVideo = ({navigation, route}) => {
  // Research Form 에서 넘어온 데이터
  const {legacySurveyId} = route ? route.params : '';
  const {surveyArray} = route ? route.params : '';
  const {surveyId} = route ? route.params : '';

  console.log('param data check >>>>>', legacySurveyId, surveyArray, surveyId);
  const {t, i18n} = useTranslation();
  const [screenState, setScreenState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);
  const [advertisementData, setAdvertisementData] = useState([]);
  const [overTen, setOverTen] = useState(false);
  const [videoUri, setVideoUri] = useState(
    'https://real-research-resources.s3.ap-northeast-2.amazonaws.com/static/survey/advertisement/video/advertisement_210125050404494_202101281114.mp4',
  );
  const [masterKey, setMasterKey] = useState('');
  const [userId, setUserId] = useState('');
  const sponsorUserNo = '5f9677c880c3164b4b1cc398';

  let {fullScreen} = screenState;

  useEffect(() => {
    let {fullScreen, potraitMode} = screenState;
    !fullScreen && !potraitMode ? Orientation.lockToPortrait() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.fullScreen]);

  // fullscreen state change
  const changeState = (values) => {
    setScreenState((prevState) => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  useEffect(() => {
    getVideoApi();
    handleMasterKey();
  }, []);

  // Call for Master Key
  const handleMasterKey = async () => {
    setMasterKey(AsyncStorage.getItem('masterKey'));
  };

  useEffect(() => {
    console.log('first videouri check', videoUri);
    console.log('why change??', overTen);
  }, [videoUri]);

  // Video Api
  const getVideoApi = async () => {
    setModalVisible(true);
    axios
      .get(`${server}/survey/advertisement?SponsorUserNo=${sponsorUserNo}`)
      .then((response) => {
        console.log('reponse Info >>>>', response.data.advertisementInfo);
        setAdvertisementData(response.data.advertisementInfo);
      })
      .catch((e) => {
        console.log('error', e);
      });
    setModalVisible(false);
  };

  // Reward Api
  const postRewardApi = async () => {
    // setModal3Visible(true);
    console.log('reward 호출');
    setModalVisible(true);
    axios
      .post(`${server}/wallet/trans/reward`, {
        language: await AsyncStorage.getItem('deviceLanguage'),
        receiver: await AsyncStorage.getItem('userNo'),
        surveyId: surveyId,
      })
      .then((response) => {
        console.log('postRewardApi >>>>>>>>', response);
        if (response.data.status == 'success') {
          setModalVisible(false);
          navigation.navigate('MainVideoComplete');
        } else if (response.data.status == 'fail') {
          if (response.data.msg === 'survey already participated.') {
            setModalVisible(false);
            setModal4Visible(!modal4Visible);
          } else {
            setModalVisible(false);
            setModal5Visible(!modal5Visible);
          }
        }
      })
      .catch((e) => {
        setModalVisible(false);
        console.log('error', e);
      });
    // setModal3Visible(false);
  };

  const handleNextPageAlready = () => {
    navigation.navigate('Main');
  };

  const handleNextPageFail = () => {
    navigation.navigate('Main');
  };

  // 비디오 현재 시간 catch 해서 10넘으면 overTen true값 반환
  const checkCurrentTime = (value) => {
    // console.log(value.currentTime);
    if (value.currentTime < 10.25 && value.currentTime > 10) {
      setOverTen(!overTen);
    }
  };

  const Item = ({
    videoUri,
    videoTitle,
    videoSub,
    videoDate,
    videoThumbnail,
    adType,
    onPress,
  }) =>
    adType === 'video' ? (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '90%',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: 15,
        }}>
        <View style={{width: '45%', height: '15%', marginRight: '5%'}}>
          <Image
            style={{width: '100%', height: 105}}
            source={{uri: videoThumbnail}}
          />
          <TouchableOpacity
            style={{position: 'absolute', top: '190%', left: '38%'}}
            // onPress={onPress}
          >
            <Image
              style={{
                width: Platform.OS === 'ios' ? 50 : 45,
                height: Platform.OS === 'ios' ? 50 : 45,
                resizeMode: 'contain',
              }}
              source={require('@images/adPlayIconM.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', marginBottom: 2},
            ]}>
            {videoTitle.slice(0, 30)}
          </Text>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontDG,
              {textAlign: 'left', marginBottom: 2},
            ]}>
            {videoSub.slice(0, 20)}
          </Text>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontG,
              {textAlign: 'left'},
            ]}>
            {videoDate.slice(0, 11)}
          </Text>
        </View>
      </TouchableOpacity>
    ) : null;

  const VideoList = ({navigation}) => {
    // console.log(navigation);
    const renderItem = ({item}) => (
      <Item
        videoUri={item.advertiseUrl}
        videoTitle={item.advertiseTitle}
        videoSub={item.advertiseTitle}
        videoDate={item.createTime}
        videoThumbnail={item.advertiseThumbnail}
        adType={item.advertiseType}
        onPress={() => {
          setVideoUri(item.advertiseUrl);
          setOverTen(false);
        }}
      />
    );

    return (
      <SafeAreaView
        style={[MainStyle.mainFlatlistView, {backgroundColor: '#fff'}]}>
        {/* <ScrollView style={{width: '100%'}}> */}
        <FlatList
          data={advertisementData}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            // Number(item.level);
            index.toString()
          }
        />
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        supportedOrientations={['portrait', 'landscape']}
        onLayout={(event) => {
          const {layout} = event.nativeEvent;
          changeState({
            Width_Layout: layout.width,
            Height_Layout: layout.height,
          });
        }}
        style={[
          ResetStyle.container,
          {
            backgroundColor: '#fff',
            paddingTop:
              screenState.fullScreen === true
                ? 0
                : Platform.OS === 'ios'
                ? '12%'
                : 0,
          },
        ]}>
        {screenState.fullScreen === true ? (
          <StatusBar hidden={true} />
        ) : (
          <StatusBar hidden={false} />
        )}
        <View
          style={{
            width: fullScreen === true ? screenState.Width_Layout : '100%',
            height: fullScreen === true ? screenState.Height_Layout : '27%',
            marginBottom: Platform.OS === 'ios' ? '5%' : 0,
          }}>
          <VideoPlayer
            source={{uri: videoUri}}
            // ref={(ref) => {
            //   player = ref;
            // }}
            rate={1.0}
            volume={0.0}
            isMuted={true}
            resizeMode="contain"
            shouldPlay
            // isLooping
            // onBuffer={onBuffer}
            // onError={videoError}
            toggleResizeModeOnFullscreen={false}
            style={{width: '100%', height: '100%'}}
            fullscreenOrientation={'landscape'}
            onEnterFullscreen={() => {
              changeState({fullScreen: !fullScreen});
              Orientation.unlockAllOrientations();
              // console.log(fullScreen);
            }}
            onExitFullscreen={() => {
              changeState({fullScreen: fullScreen});
              Orientation.lockToPortrait();
              // console.log(fullScreen);
            }}
            onProgress={checkCurrentTime}
            disablePlayPause
            disableSeekbar
            disableBack
          />
          {overTen === true && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: '7%',
                right: '4%',
                paddingHorizontal: '4.5%',
                paddingVertical: '2.5%',
                backgroundColor: '#fff',
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                postRewardApi();
              }}>
              <Text style={(ResetStyle.fontRegularK, ResetStyle.fontBlack)}>
                {t('mainVideo1')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <VideoList />
        {/* {screenState.fullScreen === true ? null : <VideoKYC />} */}
        {screenState.fullScreen === true ? null : (
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                position: 'absolute',
                bottom: '5%',
                left: '5%',
                width: '90%',
                alignSelf: 'center',
                backgroundColor: overTen === true ? '#4696ff' : '#e6e6e6',
              },
            ]}
            activeOpacity={0.75}
            onPress={() => {
              if (overTen === false) {
                setModal2Visible(!modal2Visible);
              } else if (overTen === true) {
                postRewardApi();
              }
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('mainVideo2')}
            </Text>
          </TouchableOpacity>
        )}
        <ProgressModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <BottomModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          text={t('mainVideo3')}
        />
        <ProgressModal
          modalVisible={modal3Visible}
          setModalVisible={setModal3Visible}
        />
        <TextConfirmModal
          setModalVisible={setModal4Visible}
          modalVisible={modal4Visible}
          text={t('mainVideo4')}
          confirm={t('mainVideo5')}
          handleNextPage={handleNextPageAlready}
        />
        <TextConfirmModal
          setModalVisible={setModal5Visible}
          modalVisible={modal5Visible}
          text={t('mainVideo6')}
          confirm={t('mainVideo7')}
          handleNextPage={handleNextPageFail}
        />
      </View>
    </View>
  );
};

export default MainVideo;
