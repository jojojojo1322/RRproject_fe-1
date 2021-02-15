import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetStyle from '../../style/ResetStyle';
import MainStyle from '../../style/MainStyle';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scrollInterpolator2, animatedStyles2} from '../animations';
import {server} from '../defined/server';
import axios from 'axios';

import {withTranslation} from 'react-i18next';

import BottomModal from '../factory/modal/BottomModal';
import Moment from 'react-moment';

import {useTranslation} from 'react-i18next';

// const SLIDER_WIDTH = Dimensions.get('window').width;
// // const SLIDER_HEIGHT = Dimensions.get('window').height / 2.5;
// const SLIDER_HEIGHT = Dimensions.get('window').height / 2;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
// const ITEM_HEIGHT = Math.round(ITEM_WIDTH);

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
    img: require('../../imgs/drawable-xxxhdpi/shutterstock_1675809577.png'),
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

function Ongoing({navigation}) {
  console.log('Ongoing 호출');

  const [index, setIndex] = useState(0);
  const [ongoingData, setOngoingData] = useState([]);
  const [kycUpdateCheck, setKycUpdateCheck] = useState(1);
  // //Kyc 72시간 경고 모달
  const [modalVisible, setModalVisible] = useState(false);

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
    // console.log(item);
    // const surveyDetailApi = async (legacySurveyId) => {
    //   await axios
    //     .get(
    //       `${server}/survey/detail?deviceLanguageCode=${await AsyncStorage.getItem(
    //         'deviceLanguage',
    //       )}&legacySurveyId=${legacySurveyId}&userNo=${await AsyncStorage.getItem(
    //         'userNo',
    //       )}`,
    //     )
    //     .then(async (response) => {
    //       console.log(`surveyDetailApi Then >>`, response);

    //       ret = response.data.response.ret_val;
    //       return ret;
    //     })
    //     .catch((e) => {
    //       console.log(`surveyDetailApi Error`, e);
    //     });
    //   return ret;
    // };
    // surveyDetailApi(item.legacySurveyId);
    // // console.log(async () => {
    //   await ret;
    // });
    // 210202131311227
    // 5f91aad0ae28561b056e2f97
    // "http://52.78.181.176:8091/v1/api/survey/detail?deviceLanguageCode=ko&legacySurveyId=5fd8b08d0afe882b01307818&userNo=210202131311227"
    // console.log('renderItem item', require("'" + item.categoryImg + "'"));
    // 5f91aad0ae28561b056e2f97
    // 5fd8b08d0afe882b01307818
    var today = new Date().getTime();
    var dday = new Date(item.endTime).getTime();
    var gap = dday - today;
    var day = Math.ceil(gap / (1000 * 60 * 60 * 24));
    var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((gap % (1000 * 60)) / 1000);
    if (item.status === 'zero') {
      return (
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent', marginTop: '20%'},
          ]}>
          <Image
            style={{alignSelf: 'center', width: 80, height: 80}}
            source={require('../../imgs/drawable-xxxhdpi/no_data_icon.png')}
          />
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '5%'},
            ]}>
            {t('main1')}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
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
                    {marginTop: '25%'},
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
                  {textAlign: 'left', marginBottom: '4%'},
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
                  width: '185%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/user_icon.png')}
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
                  source={require('../../imgs/drawable-xxxhdpi/clock_icon.png')}
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
                    <>
                      <Moment
                        element={Text}
                        interval={100}
                        date={item.endTime}
                        durationFromNow
                        format="D일 hh시간 mm분 ss초"
                      />

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
                width: 80,
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: 50,
              }}
              onPress={() => {
                item.surveyStatus === 'expired'
                  ? navigation.navigate('MainDetailExpired', {
                      // legacySurveyId: item.legacySurveyId,
                      legacySurveyId: '5fd8b08d0afe882b01307818',
                      surveyName: item.surveyName,
                    })
                  : item.surveyStatus === 'completed'
                  ? navigation.navigate('MainDetailCompleted', {
                      // legacySurveyId: item.legacySurveyId,
                      legacySurveyId: '5fd8b08d0afe882b01307818',
                      surveyName: item.surveyName,
                    })
                  : navigation.navigate('MainDetail', {
                      // legacySurveyId: item.legacySurveyId,
                      legacySurveyId: '5fd8b08d0afe882b01307818',
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
        </TouchableOpacity>
      );
    }
  };

  const surveyApi = async (surveyStatus) => {
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
  };
  useState(() => {
    surveyApi('ongoing');
  }, []);

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
        sliderHeight={500}
        itemHeight={420}
        containerCustomStyle={{
          flex: 1,
          backgroundColor: '#fff',
        }}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        scrollInterpolator={scrollInterpolator2}
        slideInterpolatedStyle={animatedStyles2}
        useScrollView={true}
        vertical={true}
        layout={'stack'}
        layoutCardOffset={0}
        // ListFooterComponent={loading && <ActivityIndicator />}
      />
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={`kyc 업데이트 후 72시간전 입니다.`}
      />
    </>
  );
}

function Completed({navigation}) {
  console.log('Completed 호출');
  const [index, setIndex] = useState(0);
  const [completeData, setCompleteData] = useState([]);
  const {t, i18n} = useTranslation();
  const completeSurveyApi = async () => {
    await axios
      .get(`${server}/survey/main/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(`completeSurveyApi Then >>`, response.data);
        setCompleteData(response.data);
      })
      .catch((e) => {
        console.log(`completeSurveyApi Error`, e);
      });
  };
  useEffect(() => {
    completeSurveyApi();
  }, []);

  const renderItem = ({item}) => {
    console.log('completecompletecompletecompletecompletecomplete', item);
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
            source={require('../../imgs/drawable-xxxhdpi/no_data_icon.png')}
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
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
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
                    {marginTop: '25%'},
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
                  {textAlign: 'left', marginBottom: '4%'},
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
                  width: '185%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/user_icon.png')}
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
                  source={require('../../imgs/drawable-xxxhdpi/clock_icon.png')}
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
                    <Moment
                      element={Text}
                      interval={100}
                      date={item.endTime}
                      format="D일 hh시간 mm분 ss초"
                      durationFromNow
                    />
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
                width: 80,
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
        </TouchableOpacity>
      );
    }
  };

  return (
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
      sliderHeight={500}
      itemHeight={420}
      containerCustomStyle={{flex: 1, backgroundColor: '#fff'}}
      inactiveSlideShift={0}
      onSnapToItem={(index) => setIndex(index)}
      scrollInterpolator={scrollInterpolator2}
      slideInterpolatedStyle={animatedStyles2}
      useScrollView={true}
      vertical={true}
      layout={'stack'}
      layoutCardOffset={0}
    />
  );
}

function Expired({navigation}) {
  console.log('Expired 호출');

  const [index, setIndex] = useState(0);
  const [expiredData, setExpiredData] = useState([]);
  // const [loading, setLoading] = useState(false);
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
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent', marginTop: '20%'},
          ]}>
          <Image
            style={{alignSelf: 'center', width: 80, height: 80}}
            source={require('../../imgs/drawable-xxxhdpi/no_data_icon.png')}
          />
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '5%'},
            ]}>
            {t('main1')}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
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
              : Number(kycUpdateTimeCheck) <= -72
              ? navigation.navigate('MainDetail', {
                  legacySurveyId: item.legacySurveyId,
                  // legacySurveyId: '5f91aad0ae28561b056e2f97',
                  surveyName: item.surveyName,
                })
              : setModalVisible(true);
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
                    {marginTop: '25%'},
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
                  {textAlign: 'left', marginBottom: '4%'},
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
                  width: '185%',
                }}
              />
              <View style={MainStyle.itemBoxBottomTextView}>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/user_icon.png')}
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
                  source={require('../../imgs/drawable-xxxhdpi/clock_icon.png')}
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
                  0일 0시간 0분 0초
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
                width: 80,
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
        </TouchableOpacity>
      );
    }
  };

  const surveyApi = async (surveyStatus) => {
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
  };
  useState(() => {
    surveyApi('expired');
  }, []);
  return (
    <Carousel
      data={
        // DATA.filter((item) => item.status == 'expired').length == 0
        //   ? [{status: 'zero'}]
        //   : DATA.filter((item) => item.status == 'expired')
        expiredData.length == 0 ? [{status: 'zero'}] : expiredData
      }
      renderItem={renderItem}
      sliderHeight={500}
      itemHeight={420}
      containerCustomStyle={{flex: 1, backgroundColor: '#fff'}}
      inactiveSlideShift={0}
      onSnapToItem={(index) => setIndex(index)}
      scrollInterpolator={scrollInterpolator2}
      slideInterpolatedStyle={animatedStyles2}
      useScrollView={true}
      vertical={true}
      layout={'stack'}
      layoutCardOffset={0}
    />
  );
}

const Tab = createMaterialTopTabNavigator();
// export default function MainTest({navigation}) {
function Main({navigation, t, i18n}) {
  const [currentTnc, setCurrentTnc] = useState(0);
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
  const userInfoApi = async () => {
    await axios
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

        var today = new Date().getTime();
        console.log('new Date()', new Date().getTime());
        console.log('new Date()', new Date().toString());
        console.log('today', today);
        var dday = new Date(
          response.data.kycUpdated.replace(' ', 'T'),
        ).getTime();
        console.log('response.data.kycUpdated', response.data.kycUpdated);
        console.log('dday', dday);
        var gap = dday - today;
        console.log('gap', gap);
        // var hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var hour = (gap / 1000 / 60 / 60).toFixed(0);
        console.log('업데이트 시간 비교', hour);

        console.log(<Moment element={Text}>{response.data.kycUpdated}</Moment>);
        console.log(<Moment date={response.data.kycUpdated} durationFromNow />);
        setKycUpdateTimeCheck(hour);
        // return await response;
      })
      .catch((e) => {
        console.log('userInfoApi Error', e);
      });
  };
  useEffect(() => {
    userInfoApi();
    TncGetApi();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[MainStyle.topLogoView]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: Platform.OS === 'ios' ? '5%' : '4%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            // onPress={async () => {
            //   try {
            //     console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
            //     await AsyncStorage.removeItem('userNo');
            //     console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
            //   } catch (e) {}
            // }}
            onPress={() => {
              navigation.navigate('Kyc');
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/rr_logo.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontWhite,
                  {marginLeft: '5%', fontWeight: '600'},
                ]}>
                {t('mainLogo')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(navigation.openDrawer);
              navigation.openDrawer();
            }}>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/menu_icon.png')}
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
              navigation.navigate('ProfileMain');
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '49.3%',
            }}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
              {t('main4')}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WalletMain');
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
        initialRouteName="Ongoing"
        lazy={false}
        tabBarOptions={{
          activeTintColor: '#222',
          inactiveTintColor: '#a9a9a9',
          labelStyle: {fontSize: Platform.OS === 'ios' ? 18 : 15},
          style: {backgroundColor: 'transparent', height: 50},
          indicatorStyle: {
            width: '4%',
            height: 2,
            backgroundColor: '#222',
            left: '11%',
            bottom: '15%',
          },
        }}>
        <Tab.Screen
          name="Ongoing"
          component={Ongoing}
          options={{tabBarLabel: t('main7')}}
          initialParams={{
            setModalVisible: setModalVisible,
          }}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          options={{tabBarLabel: t('main8')}}
        />
        <Tab.Screen
          name="Expired"
          component={Expired}
          options={{tabBarLabel: t('main9')}}
        />
      </Tab.Navigator>

      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={`kyc 업데이트 후 72시간전 입니다.`}
      />
    </View>
  );
}

export default withTranslation()(Main);
