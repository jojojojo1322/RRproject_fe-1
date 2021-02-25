import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Platform,
  YellowBox,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle';
import MainStyle from '../../style/MainStyle';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scrollInterpolator2, animatedStyles2} from '../animations';
import ProgressModal from '../factory/modal/ProgressModal';
import {server} from '../defined/server';
import axios from 'axios';

import {withTranslation} from 'react-i18next';

import BottomModal from '../factory/modal/BottomModal';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import {useTranslation} from 'react-i18next';

const SLIDER_WIDTH = Dimensions.get('window').width;
// const SLIDER_HEIGHT = Dimensions.get('window').height / 2.5;
// const SLIDER_HEIGHT = Dimensions.get('window').height / 2;
const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
// const ITEM_HEIGHT = Math.round(ITEM_WIDTH);
const ITEM_HEIGHT = SLIDER_HEIGHT / 2.5;

console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 >>>>>>', SLIDER_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);
console.log('화면 높이 값 / 300 >>>>>>', ITEM_HEIGHT);

// const SLIDER_WIDTH = Dimensions.get('window').width;
// const SLIDER_HEIGHT = 500;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 5.7) / 4);

const currentTnc = '';
const kycLevel = '';
const kycUpdateTimeCheck = '';
const ongoingData = '';
const completeData = '';
const expiredData = '';

const DATA = [
  {
    id: '9',
    img: require('../../imgs/shutterstock_1675809577.png'),
    status: 'completed',
    division: 'Any Category2',
    dateStart: '2020.12.03',
    dateEnd: '2020.12.31',
    title: '요즘 음악\n어디서 들어요?',
    participantCount: 20000,
    participantCompleteCount: 12375,
    tnc: '10',
    host: 'Samsung',
    content: '해당 서베이에 대한 간략 설명',
  },
  // {id: "54"
  // ,legacySurveyId: "4cf355d2cc5e4fee"
  // ,categoryId: "1"
  // ,categoryImg: "https://real-research-resources.s3.ap-northeast-2.amazonaws.com/static/survey/category/CustomerSatisfaction.jpg"
  // ,surveyStatus: "ongoing"
  // ,categoryName: "Customer Satisfaction"
  // ,startTime: "2021-01-28 14:05:00"
  // ,endTime: "2021-01-28 14:10:00"
  // ,surveyName: "surveyname"
  // ,particRestrictions: 1000
  // ,participants: 0
  // ,reward: "10"
  // ,sponsorName: "sponsor"
  // ,instructions: "description"}
];

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
// const numberWithCommas = (x) => {
//   return x;
// };

// function Main({navigation, t, i18n}) {

// const [ongoingData, setOngoingData] = useState([]);
// const [completeData, setCompleteData] = useState([]);
// const [expiredData, setExpiredData] = useState([]);

// //Kyc 72시간 경고 모달
// const [modalVisible, setModalVisible] = useState(false);

// TNC 수량
const TncGetApi = async () => {
  await axios
    .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
    .then(async (response) => {
      console.log('TncGetApi Then >>', response);

      // TNC .뒤 문자열 제거 (ex 42.000000 TNC)
      setCurrentTnc(response.data.balance.split('.')[0]);
      setCurrentTnc(
        // numberWithCommas(parseFloat(response.data.balance.toFixed(6))),
        parseFloat(response.data.balance.toFixed(6)),
      );
      // setCountry(response.data);
      console.log(currentTnc);
      // return await response;
    })
    .catch(({e}) => {
      console.log('TncGetApi Error', e);
    });
};

function Ongoing({navigation, route}) {
  console.log('Ongoing 호출');

  const [index, setIndex] = useState(0);
  const [ongoingData, setOngoingData] = useState([]);
  const [kycUpdateCheck, setKycUpdateCheck] = useState(1);
  // //Kyc 72시간 경고 모달
  const [modalVisible, setModalVisible] = useState(false);
  // progress
  const [modal2Visible, setModal2Visible] = useState(false);

  // const [loading, setLoading] = useState(false);
  const {t, i18n} = useTranslation();

  const surveyDetailApi = async (legacySurveyId) => {
    await axios
      .get(
        `${server}/survey/detail?deviceLanguageCode=${await AsyncStorage.getItem(
          'deviceLanguage',
        )}&legacySurveyId=${legacySurveyId}&userNo=${await AsyncStorage.getItem(
          'userNo',
        )}`,
      )
      .then(async (response) => {
        console.log(`surveyDetailApi Then >>`, response);
        console.log(`surveyDetailApi Then >>`, response.data.response);
        setKycUpdateCheck(response.data.response.ret_val);
      })
      .catch((e) => {
        console.log(`surveyDetailApi Error`, e);
      });
  };
  const renderItem = ({item}) => {
    let ret = 1;

    const today = moment().tz('Asia/Seoul');
    const endTime = moment(item.endTime).tz('Asia/Seoul');

    var gap = endTime.diff(today);

    var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((gap % (1000 * 60)) / 1000);

    if (item.status === 'zero') {
      return (
        <View
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent', marginTop: '20%'},
          ]}>
          <Image
            style={{alignSelf: 'center', width: 80, height: 80}}
            source={require('../../imgs/noDataIcon.png')}
          />
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '5%'},
            ]}>
            {t('main1')}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            MainStyle.itemBox2,
            // {marginBottom: item.id === item.length ? 200 : 0},
          ]}
          onPress={() => {
            surveyDetailApi(item.legacySurveyId);
            console.log(
              'kycUpdateCheckkycUpdateCheckkycUpdateCheck',
              kycUpdateCheck,
            );
            console.log({
              legacySurveyId: item.legacySurveyId,

              surveyName: item.surveyName,
            });
            navigation.navigate('MainDetail', {
              legacySurveyId: item.legacySurveyId,
              // legacySurveyId: '5f91aad0ae28561b056e2f97',
              surveyName: item.surveyName,
            });
            // ret === -1
            //   ? setModalVisible(true)
            //   : navigation.navigate('MainDetail', {
            //       legacySurveyId: item.legacySurveyId,
            //       // legacySurveyId: '5f91aad0ae28561b056e2f97',
            //       surveyName: item.surveyName,
            //     });

            // : navigation.navigate('MainDetail', {
            //     legacySurveyId: item.legacySurveyId,
            //     // legacySurveyId: '5f91aad0ae28561b056e2f97',
            //     surveyName: item.surveyName,
            //   });
          }}>
          <View
            opacity={item.surveyStatus === 'expired' ? 0.5 : 1.0}
            style={{
              flex: 1,
            }}>
            <Image
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '115%',
              }}
              source={{uri: item.categoryImg}}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}></View>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.5)',
              ]}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
              }}></LinearGradient>
            <View style={[MainStyle.itemBoxInner]}>
              <View style={{position: 'relative'}}>
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontWhite,
                    {
                      marginTop: Platform.OS === 'ios' ? '30%' : '30%',
                    },
                  ]}>
                  {item.categoryName} | {item.sponsorName}
                </Text>
              </View>
            </View>
            <View style={MainStyle.itemTitleView}>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left', marginBottom: '5%'},
                ]}>
                {item.surveyName}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left'},
                ]}>
                {item.instructions && item.instructions.length >= 80
                  ? `${item.instructions.slice(0, 80)}...`
                  : item.instructions}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
              }}>
              <View style={MainStyle.itemImagenullViewInner}>
                <Text style={[ResetStyle.fontBoldK, ResetStyle.fontWhite]}>
                  + {item.reward}
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: 5, paddingBottom: 5},
                  ]}>
                  {t('main2')}
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: '#ffffff',
                  marginTop: '2%',
                  marginBottom: '2%',
                  width: '137%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/userIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {textAlign: 'left', marginLeft: '5%'},
                  ]}>
                  {numberWithCommas(item.participants)} /{' '}
                  {numberWithCommas(item.particRestrictions)}
                </Text>
              </View>

              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/clockIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: '5%'},
                  ]}>
                  {/* {item.endTime} */}
                  {/* {setInterval(function () {
                      var today = new Date().getTime();
                      var gap = dday - today;
                      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
                      var hour = Math.ceil(
                        (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );
                      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
                      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
  
                      return `${day - 1}일 ${hour}시간 ${min}분 ${sec}초`;
                    }, 1000)} */}
                  {`${day - 1}${t('days')} ${hour}${t('hours')} ${min}${t(
                    'minutes',
                  )} ${sec}${t('seconds')}`}
                  {
                    <>
                      {/* <Moment
                        element={Text}
                        interval={100}
                        date={item.endTime}
                        durationFromNow
                        format="D일 hh시간 mm분 ss초"
                      /> */}

                      {/* <Moment
                        element={Text}
                        interval={1000}
                        date={now}
                        duration={item.endTime}
                        format="D일 hh시간 mm분 ss초"
                      /> */}
                    </>
                  }
                  {/* {setInterval(() => {
                      var today = new Date().getTime();
                      var dday = new Date(item.endTime).getTime();
                      var gap = dday - today;
                      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
                      var hour = Math.ceil(
                        (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );
                      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
                      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
                      return day;
                    }, 1000)} */}
                  {/* {console.log('remainTime', remainTime)} */}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: '5%',
                width: Platform.OS === 'ios' ? 80 : 70,
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 50,
              }}
              onPress={() => {
                item.surveyStatus === 'expired'
                  ? navigation.navigate('MainDetailExpired', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5fd8b08d0afe882b01307818',
                      surveyName: item.surveyName,
                    })
                  : item.surveyStatus === 'completed'
                  ? navigation.navigate('MainDetailCompleted', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5fd8b08d0afe882b01307818',
                      surveyName: item.surveyName,
                    })
                  : navigation.navigate('MainDetail', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5fd8b08d0afe882b01307818',
                      surveyName: item.surveyName,
                    });
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '900', padding: 8},
                ]}>
                {t('main3')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const surveyApi = async (surveyStatus) => {
    // progress 호출
    // setModal2Visible(true);

    await axios
      .get(
        `${server}/survey/main/status/${surveyStatus}/${await AsyncStorage.getItem(
          'deviceLanguage',
        )}?CurrentPageNo=1&userNo=${await AsyncStorage.getItem('userNo')}`,
      )
      .then(async (response) => {
        // console.log(`surveyApi ${surveyStatus} Then >>`, response);
        if (surveyStatus === 'ongoing') {
          setOngoingData(response.data);
        } else if (surveyStatus === 'expired') {
          setExpiredData(response.data);
        }
      })
      .catch((e) => {
        console.log(`surveyApi ${surveyStatus} Error`, e);
      });
    // progress 끔
    // setModal2Visible(false);
  };
  //
  //
  //
  //
  //
  //
  useEffect(() => {
    surveyApi('ongoing');
  }, []);

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused === true) {
  //     surveyApi('ongoing');
  //   }
  // }, [isFocused]);
  // useEffect(() => {}, [modal2Visible]);

  return (
    <>
      <Carousel
        data={
          ongoingData.length == 0 ? [{status: 'zero'}] : ongoingData
          // DATA.filter((item) => item.status == 'ongoing').length == 0
          //   ? [{status: 'zero'}]
          //   : DATA.filter((item) => item.status == 'ongoing')
        }
        renderItem={renderItem}
        sliderHeight={Platform.OS === 'ios' ? 500 : 500}
        itemHeight={Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT}
        containerCustomStyle={{
          flex: 1,
          backgroundColor: '#fff',
          // borderWidth: 3,
          // borderColor: '#0f0',
        }}
        slideStyle={{
          width: '100%',
          // height: '2.8%',
          // borderWidth: 3,
          // borderColor: '#F00',
          paddingTop: 0,
        }}
        contentContainerCustomStyle={{
          height:
            ongoingData.length == 0
              ? '100%'
              : String(ongoingData.length * 95 + '%'),
          // borderWidth: 3,
          // borderColor: '#00f',
          paddingTop: Platform.OS === 'ios' ? 0 : '3%', // tab navigator와의 간격
        }}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator2}
        slideInterpolatedStyle={animatedStyles2}
        // useScrollView={true}
        vertical={true}
        layout={'stack'}
        // ListFooterComponent={loading && <ActivityIndicator />}
      />
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('main10')}
      />
      <ProgressModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
    </>
  );
}

function Completed({navigation}) {
  console.log('Completed 호출');
  const [index, setIndex] = useState(0);
  const [completeData, setCompleteData] = useState([]);
  const {t, i18n} = useTranslation();
  const [modal2Visible, setModal2Visible] = useState(false);
  const completeSurveyApi = async () => {
    // progress 호출
    setModal2Visible(true);
    axios
      .get(`${server}/survey/main/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(`completeSurveyApi Then >>`, response.data);
        setCompleteData(response.data);
      })
      .catch((e) => {
        console.log(`completeSurveyApi Error`, e);
      });
    // progress 끔
    setModal2Visible(false);
  };
  useEffect(() => {
    completeSurveyApi();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused === true) {
      completeSurveyApi();
    }
  }, [isFocused]);

  useEffect(() => {}, [modal2Visible]);

  const renderItem = ({item}) => {
    // console.log('renderItem item', require("'" + item.categoryImg + "'"));

    let today = moment().tz('Asia/Seoul');

    // setInterval(() => {
    //   today = moment().tz('Asia/Seoul');
    // }, 1000);

    const endTime = moment(item.endTime).tz('Asia/Seoul');
    var gap = endTime.diff(today);

    var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((gap % (1000 * 60)) / 1000);
    console.log('업데이트 시간 비교', hour);
    console.log({
      today: today,
      endTime: endTime,
      gap: gap,
      day: day,
      hour: hour,
      min: min,
      sec: sec,
    });

    if (item.status === 'zero') {
      return (
        <View
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent', marginTop: '20%'},
          ]}>
          <Image
            style={{alignSelf: 'center', width: 80, height: 80}}
            source={require('../../imgs/noDataIcon.png')}
          />
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '5%'},
            ]}>
            {t('main1')}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            MainStyle.itemBox,
            // {borderWidth: 1, borderColor: '#f00'},
            // {marginBottom: item.id === item.length ? 200 : 0},
          ]}
          onPress={() => {
            navigation.navigate('MainDetailCompleted', {
              legacySurveyId: item.legacySurveyId,
              // legacySurveyId: '5f91aad0ae28561b056e2f97',
              surveyName: item.surveyName,
            });
          }}>
          <View
            opacity={1.0}
            style={{
              flex: 1,
              // borderWidth: 3,
              // borderColor: '#0f0',
            }}>
            <Image
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '115%',
              }}
              source={{uri: item.categoryImg}}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}></View>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.5)',
              ]}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
              }}></LinearGradient>
            <View style={[MainStyle.itemBoxInner]}>
              <View
                style={{
                  position: 'relative',
                }}>
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontWhite,
                    {marginTop: Platform.OS === 'ios' ? '30%' : '30%'},
                  ]}>
                  {item.categoryName} | {item.sponsorName}
                </Text>
              </View>
            </View>
            <View style={MainStyle.itemTitleView}>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left', marginBottom: '5%'},
                ]}>
                {item.surveyName}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left'},
                ]}>
                {item.instructions && item.instructions.length >= 80
                  ? `${item.instructions.slice(0, 80)}...`
                  : item.instructions}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
              }}>
              <View style={MainStyle.itemImagenullViewInner}>
                <Text style={[ResetStyle.fontBoldK, ResetStyle.fontWhite]}>
                  + {item.reward}
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: 5, paddingBottom: 5},
                  ]}>
                  {t('main2')}
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: '#ffffff',
                  marginTop: '2%',
                  marginBottom: '2%',
                  width: '137%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/userIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {textAlign: 'left', marginLeft: '5%'},
                  ]}>
                  {numberWithCommas(item.participants)} /{' '}
                  {numberWithCommas(item.particRestrictions)}
                </Text>
              </View>

              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/clockIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: '5%'},
                  ]}>
                  {/* {item.endTime} */}
                  {/* {setInterval(function () {
                      var today = new Date().getTime();
                      var gap = dday - today;
                      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
                      var hour = Math.ceil(
                        (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );
                      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
                      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
  
                      return `${day - 1}일 ${hour}시간 ${min}분 ${sec}초`;
                    }, 1000)} */}
                  {day >= 0 && hour >= 0 && min >= 0 && sec >= 0
                    ? `${day - 1}${t('days')} ${hour}${t('hours')} ${min}${t(
                        'minutes',
                      )} ${sec}${t('seconds')}`
                    : `0${t('days')} 0${t('hours')} 0${t('minutes')} 0${t(
                        'seconds',
                      )}`}
                  {/* `0{t('days')} 0{t('hours')} 0{t('minutes')} 0{t('seconds')}` */}
                  {
                    // <Moment
                    //   element={Text}
                    //   interval={100}
                    //   date={item.endTime}
                    //   format="D일 hh시간 mm분 ss초"
                    //   durationFromNow
                    // />
                  }
                  {/* {setInterval(() => {
                      var today = new Date().getTime();
                      var dday = new Date(item.endTime).getTime();
                      var gap = dday - today;
                      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
                      var hour = Math.ceil(
                        (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );
                      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
                      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
                      return day;
                    }, 1000)} */}
                  {/* {console.log('remainTime', remainTime)} */}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: '5%',
                width: Platform.OS === 'ios' ? 80 : 70,
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 50,
              }}
              onPress={() => {
                navigation.navigate('MainDetailCompleted', {
                  legacySurveyId: item.legacySurveyId,
                  // legacySurveyId: '5f91aad0ae28561b056e2f97',
                  surveyName: item.surveyName,
                });
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '900', padding: 8},
                ]}>
                {t('main3')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <Carousel
        data={
          // DATA.filter((item) => item.status == 'completed').length == 0
          //   ? [{status: 'zero'}]
          //   : DATA.filter((item) => item.status == 'completed')
          completeData.length == 0 ? [{status: 'zero'}] : completeData
          // completeData
          // DATA.filter((item) => item.status == 'completed').length == 0
          //   ? [{status: 'zero'}]
          //   : DATA.filter((item) => item.status == 'completed')
        }
        renderItem={renderItem}
        sliderHeight={Platform.OS === 'ios' ? 500 : 450}
        itemHeight={Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT}
        containerCustomStyle={{
          flex: 1,
          backgroundColor: '#fff',
          // borderWidth: 3,
          // borderColor: '#0f0',
        }}
        // swipeThreshold={50}
        slideStyle={{
          width: '100%',
          // borderWidth: 3,
          // borderColor: '#F00',
          marginTop: 0,
          paddingTop: 0,
        }}
        contentContainerCustomStyle={{
          height:
            completeData.length == 0
              ? '100%'
              : String(completeData.length * 95 + '%'),
          // borderWidth: 3,
          // borderColor: '#00f',
          paddingTop: Platform.OS === 'ios' ? 0 : '3%', // tab navigator와의 간격
        }}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator2}
        slideInterpolatedStyle={animatedStyles2}
        // useScrollView={true}
        vertical={true}
        layout={'stack'}
        layoutCardOffset={0}
      />
      <ProgressModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
    </>
  );
}

function Expired({navigation}) {
  console.log('Expired 호출11');

  const [index, setIndex] = useState(0);
  const [expiredData, setExpiredData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const {t, i18n} = useTranslation();
  const renderItem = ({item}) => {
    // console.log(item);
    // console.log('renderItem item', require("'" + item.categoryImg + "'"));
    var today = new Date().getTime();
    var dday = new Date(item.endTime).getTime();
    var gap = dday - today;
    var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((gap % (1000 * 60)) / 1000);

    if (item.status === 'zero') {
      return (
        <View
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent', marginTop: '20%'},
          ]}>
          <Image
            style={{alignSelf: 'center', width: 80, height: 80}}
            source={require('../../imgs/noDataIcon.png')}
          />
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '5%'},
            ]}>
            {t('main1')}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            MainStyle.itemBox,

            // {marginBottom: item.id === item.length ? 200 : 0},
          ]}
          onPress={() => {
            item.surveyStatus === 'expired'
              ? navigation.navigate('MainDetailExpired', {
                  legacySurveyId: item.legacySurveyId,
                  // legacySurveyId: '5f91aad0ae28561b056e2f97',
                  surveyName: item.surveyName,
                })
              : item.surveyStatus === 'completed'
              ? navigation.navigate('MainDetailCompleted', {
                  legacySurveyId: item.legacySurveyId,
                  // legacySurveyId: '5f91aad0ae28561b056e2f97',
                  surveyName: item.surveyName,
                })
              : navigation.navigate('MainDetail', {
                  legacySurveyId: item.legacySurveyId,
                  // legacySurveyId: '5f91aad0ae28561b056e2f97',
                  surveyName: item.surveyName,
                });
          }}>
          <View
            opacity={item.surveyStatus === 'expired' ? 0.5 : 1.0}
            style={{
              flex: 1,
            }}>
            <Image
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '115%',
              }}
              source={{uri: item.categoryImg}}
            />
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}></View>
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0.5)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.5)',
              ]}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '120%',
              }}></LinearGradient>
            <View style={[MainStyle.itemBoxInner]}>
              <View style={{position: 'relative'}}>
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontWhite,
                    {marginTop: Platform.OS === 'ios' ? '30%' : '30%'},
                  ]}>
                  {item.categoryName} | {item.sponsorName}
                </Text>
              </View>
            </View>
            <View style={MainStyle.itemTitleView}>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left', marginBottom: '5%'},
                ]}>
                {item.surveyName}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontWhite,
                  {textAlign: 'left'},
                ]}>
                {item.instructions && item.instructions.length >= 80
                  ? `${item.instructions.slice(0, 80)}...`
                  : item.instructions}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: '5%',
              }}>
              <View style={MainStyle.itemImagenullViewInner}>
                <Text style={[ResetStyle.fontBoldK, ResetStyle.fontWhite]}>
                  + {item.reward}
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: 5, paddingBottom: 5},
                  ]}>
                  {t('main2')}
                </Text>
              </View>
              <View
                style={{
                  height: 0.5,
                  backgroundColor: '#ffffff',
                  marginTop: '2%',
                  marginBottom: '2%',
                  width: '137%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/userIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {textAlign: 'left', marginLeft: '5%'},
                  ]}>
                  {numberWithCommas(item.participants)} /{' '}
                  {numberWithCommas(item.particRestrictions)}
                </Text>
              </View>

              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 18 : 15,
                    height: Platform.OS === 'ios' ? 18 : 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../../imgs/clockIcon.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: '5%'},
                  ]}>
                  {/* {item.endTime} */}
                  {/* {setInterval(function () {
                      var today = new Date().getTime();
                      var gap = dday - today;
                      var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
                      var hour = Math.ceil(
                        (gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );
                      var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
                      var sec = Math.ceil((gap % (1000 * 60)) / 1000);
  
                      return `${day - 1}일 ${hour}시간 ${min}분 ${sec}초`;
                    }, 1000)} */}
                  {/* {`${day - 1}일 ${hour}시간 ${min}분 ${sec}초`} */}
                  {
                    // <Moment
                    //   element={Text}
                    //   interval={1000}
                    //   date={item.endTime}
                    //   format="D일 hh시간 mm분 ss초"
                    //   durationFromNow
                    // />
                  }
                  0{t('days')} 0{t('hours')} 0{t('minutes')} 0{t('seconds')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: '5%',
                width: Platform.OS === 'ios' ? 80 : 70,
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 50,
              }}
              onPress={() => {
                item.surveyStatus === 'expired'
                  ? navigation.navigate('MainDetailExpired', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5f91aad0ae28561b056e2f97',
                      surveyName: item.surveyName,
                    })
                  : item.surveyStatus === 'completed'
                  ? navigation.navigate('MainDetailCompleted', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5f91aad0ae28561b056e2f97',
                      surveyName: item.surveyName,
                    })
                  : navigation.navigate('MainDetail', {
                      legacySurveyId: item.legacySurveyId,
                      // legacySurveyId: '5f91aad0ae28561b056e2f97',
                      surveyName: item.surveyName,
                    });
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '900', padding: 8},
                ]}>
                {t('main3')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const surveyApi = async (surveyStatus) => {
    // progress 호출
    setModal2Visible(true);
    await axios
      .get(
        `${server}/survey/main/status/${surveyStatus}/${await AsyncStorage.getItem(
          'deviceLanguage',
        )}?CurrentPageNo=1&userNo=${await AsyncStorage.getItem('userNo')}`,
      )
      .then(async (response) => {
        console.log(`surveyApi ${surveyStatus} Then >>`, response);
        if (surveyStatus === 'ongoing') {
          setOngoingData(response.data);
        } else if (surveyStatus === 'expired') {
          setExpiredData(response.data);
        }
      })
      .catch((e) => {
        console.log(`surveyApi ${surveyStatus} Error`, e);
      });
    // progress 끔
    setModal2Visible(false);
  };
  useEffect(() => {
    surveyApi('expired');
  }, []);
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused === true) {
  //     surveyApi('ongoing');
  //   }
  // }, [isFocused]);
  return (
    <>
      <Carousel
        data={
          // DATA.filter((item) => item.status == 'expired').length == 0
          //   ? [{status: 'zero'}]
          //   : DATA.filter((item) => item.status == 'expired')
          expiredData.length == 0 ? [{status: 'zero'}] : expiredData
        }
        renderItem={renderItem}
        sliderHeight={Platform.OS === 'ios' ? 500 : 450}
        itemHeight={Platform.OS === 'ios' ? ITEM_HEIGHT : ITEM_HEIGHT}
        containerCustomStyle={{flex: 1, backgroundColor: '#fff'}}
        slideStyle={{
          width: '100%',
          // borderWidth: 3,
          // borderColor: '#F00',
          marginTop: 0,
          paddingTop: 0,
        }}
        contentContainerCustomStyle={{
          height:
            expiredData.length == 0
              ? '100%'
              : String(expiredData.length * 95 + '%'),
          // borderWidth: 3,
          // borderColor: '#00f',
          paddingTop: Platform.OS === 'ios' ? 0 : '3%', // tab navigator와의 간격
        }}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator2}
        slideInterpolatedStyle={animatedStyles2}
        // useScrollView={true}
        vertical={true}
        layout={'stack'}
        layoutCardOffset={0}
      />
      <ProgressModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
    </>
  );
}

const Tab = createMaterialTopTabNavigator();
// export default function MainTest({navigation}) {
function Main({navigation, t, i18n}) {
  const [currentTnc, setCurrentTnc] = useState(0);
  const [nonFixTnc, setNonFixTnc] = useState(0);
  const [kycLevel, setKycLevel] = useState(0);
  const [kycUpdateTimeCheck, setKycUpdateTimeCheck] = useState('');
  const [ongoingData, setOngoingData] = useState([]);
  const [completeData, setCompleteData] = useState([]);
  const [expiredData, setExpiredData] = useState([]);

  //Kyc 72시간 경고 모달
  const [modalVisible, setModalVisible] = useState(false);
  const surveyDetailApi = async (legacySurveyId) => {
    await axios
      .get(
        `${server}/survey/detail?deviceLanguageCode=${await AsyncStorage.getItem(
          'deviceLanguage',
        )}&legacySurveyId=${legacySurveyId}&userNo=${await AsyncStorage.getItem(
          'userNo',
        )}`,
      )
      .then(async (response) => {
        console.log(`surveyDetailApi Then >>`, response);
      })
      .catch((e) => {
        console.log(`surveyDetailApi Error`, e);
      });
  };
  const TncGetApi = async () => {
    axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then(async (response) => {
        console.log('TncGetApi Then >>', response);

        // TNC .뒤 문자열 제거 (ex 42.000000 TNC)
        setCurrentTnc(response.data.balance.split('.')[0]);
        // setCurrentTnc(parseFloat(response.data.balance.toFixed(6)));
        setNonFixTnc(Number(response.data.balance.replace(' TNC', '')));
        // setCountry(response.data);
        console.log(currentTnc);
        // return await response;
      })
      .catch(({e}) => {
        console.log('TncGetApi Error', e);
      });
  };
  const userInfoApi = async () => {
    axios
      .get(
        `${server}/user?userNo=${await AsyncStorage.getItem('userNo')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('userInfoApi Then >>', response);
        setKycLevel(response.data.userLevel);
        await AsyncStorage.setItem('masterKey', response.data.wallet);
        await AsyncStorage.setItem('inviteCode', response.data.inviteCode);
        // setCountry(response.data);

        // var today = new Date().getTime();
        // console.log('new Date()', new Date().getTime());
        // console.log('new Date()', new Date().toString());
        // console.log('today', today);
        // var dday = new Date(
        //   response.data.kycUpdated.replace(' ', 'T'),
        // ).getTime();
        // console.log('response.data.kycUpdated', response.data.kycUpdated);
        // console.log('dday', dday);
        // var gap = dday - today;
        // console.log('gap', gap);
        // // var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // var hour = (gap / 1000 / 60 / 60).toFixed(0);
        // console.log('업데이트 시간 비교', hour);
        // setKycUpdateTimeCheck(hour);
        // return await response;
      })
      .catch((e) => {
        console.log('userInfoApi Error', e);
      });
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused === true) {
      userInfoApi();
      TncGetApi();
    }
  }, [isFocused]);
  useEffect(() => {
    userInfoApi();
    TncGetApi();
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state.',
    ]);
    YellowBox.ignoreWarnings(['Bridge was already shutdown.']);
    YellowBox.ignoreWarnings(['Can']);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[MainStyle.topLogoView]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: Platform.OS === 'ios' ? '3%' : '3%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {/* 로고 클릭 */}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
            onPress={async () => {
              try {
                console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
                await AsyncStorage.removeItem('userNo');
                console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
              } catch (e) {}
            }}
            // onPress={() => {
            //   navigation.navigate('Kyc');
            // }}
          >
            <Image
              style={{
                width: Platform.OS === 'ios' ? 25 : 20,
                height: Platform.OS === 'ios' ? 25 : 20,
                resizeMode: 'contain',
              }}
              source={require('../../imgs/rrLogoW.png')}
            />
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontWhite,
                {marginLeft: '5%', fontWeight: '600'},
              ]}>
              {t('mainLogo')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 5,
              paddingVertical: 5,
              // width: Platform.OS === 'ios' ? 40 : 35,
              // height: Platform.OS === 'ios' ? 40 : 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              console.log(navigation.openDrawer);
              navigation.openDrawer({dddddd: 'dddddd'});
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 25 : 20,
                height: Platform.OS === 'ios' ? 25 : 20,
                resizeMode: 'contain',
              }}
              source={require('../../imgs/menuIcon_w.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            width: '95%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: Platform.OS === 'ios' ? 75 : 65,
            borderRadius: 25,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileMain', {
                kycLevel: kycLevel,
              });
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '49.3%',
            }}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
              {t('main4')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '500'},
                ]}>
                {t('main5')}
              </Text>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '500', marginLeft: '3%', marginRight: '3%'},
                ]}>
                {kycLevel}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: '70%',
              alignSelf: 'center',
              backgroundColor: '#e2e2e2',
              width: '0.4%',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WalletMain', {
                currentTnc: nonFixTnc,
              });
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '49.3%',
            }}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
              {t('main6')}
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {fontWeight: '500'},
              ]}>
              {currentTnc}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Tab.Navigator
        initialRouteName={t('main7')}
        lazy={false}
        tabBarOptions={{
          pressOpacity: 1,
          activeTintColor: '#222',
          inactiveTintColor: '#a9a9a9',
          labelStyle: {
            fontSize: Platform.OS === 'ios' ? 18 : 15,
            paddingTop: Platform.OS === 'ios' ? 12 : 0,
          },
          style: {
            backgroundColor: 'transparent',
            height: Platform.OS === 'ios' ? 80 : 50,
            // borderWidth: 1,
          },
          indicatorStyle: {
            width: '4%',
            height: 2,
            backgroundColor: '#222',
            left: '11%',
            bottom: Platform.OS === 'ios' ? '25%' : '15%',
          },
        }}>
        <Tab.Screen
          name={t('main7')}
          component={Ongoing}
          // options={{tabBarLabel: t('main7')}}
          initialParams={{
            setModalVisible: setModalVisible,
            isFocused: useIsFocused,
          }}
          options={{
            isFocused: isFocused,
          }}
        />
        <Tab.Screen
          name={t('main8')}
          component={Completed}
          // options={{tabBarLabel: t('main8')}}
        />
        <Tab.Screen
          name={t('main9')}
          component={Expired}
          // options={{tabBarLabel: t('main9')}}
        />
      </Tab.Navigator>

      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('main10')}
      />
    </View>
  );
}

export default withTranslation()(Main);
