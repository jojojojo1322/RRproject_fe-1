import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {scrollInterpolator2, animatedStyles2} from '../../animations';
import Carousel from '@defined/snapCarousel/snapCarousel';
import BottomModal from '@factory/modal/BottomModal';
import ProgressModal from '@factory/modal/ProgressModal';
import {getExpiredSurveyList} from '@module/survey';
import ResetStyle from '@style/ResetStyle';
import MainStyle from '@style/MainStyle';
import {useNavigation} from '@react-navigation/native';

const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
const ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 2.2);
const Expired = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user, language, expiredSurveyList} = useSelector(
    ({auth, language, survey}) => ({
      user: auth.user,
      language: language.language,
      expiredSurveyList: survey.expiredSurveyList,
    }),
  );

  const [index, setIndex] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const renderItem = ({item}) => {
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
            source={require('@images/noDataIcon.png')}
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
                width: '100%',
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
                  width: '90%',
                }}
              />
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <View style={MainStyle.itemBoxBottomTextView}>
                    <Image
                      style={{
                        width: Platform.OS === 'ios' ? 18 : 15,
                        height: Platform.OS === 'ios' ? 18 : 15,
                        resizeMode: 'contain',
                      }}
                      source={require('@images/userIcon.png')}
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
                      source={require('@images/clockIcon.png')}
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
          </View>
        </View>
      );
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    if (user.userNo !== '' && language) {
      dispatch(
        getExpiredSurveyList({
          surveyStatus: 'expired',
          language: language,
          userNo: user.userNo,
        }),
      );
    }
  }, [user, language]);

  useEffect(() => {
    console.log('expiredSurveyList');
    console.log(expiredSurveyList.filter((item) => item.categoryImg === null));
  }, [expiredSurveyList]);

  return (
    <>
      <Carousel
        data={
          // DATA.filter((item) => item.status == 'expired').length == 0
          //   ? [{status: 'zero'}]
          //   : DATA.filter((item) => item.status == 'expired')
          expiredSurveyList.length == 0 ? [{status: 'zero'}] : expiredSurveyList
        }
        renderItem={renderItem}
        sliderHeight={Platform.OS === 'ios' ? 500 : 450}
        itemHeight={
          Platform.OS === 'android'
            ? ITEM_HEIGHT_ANDROID
            : Dimensions.get('window').height < 750
            ? ITEM_HEIGHT_IOS_UNDER700
            : ITEM_HEIGHT
        }
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
            expiredSurveyList.length == 0
              ? '100%'
              : String(expiredSurveyList.length * 95 + '%'),
          // borderWidth: 3,
          // borderColor: '#00f',
          paddingTop:
            Platform.OS === 'android'
              ? '3%'
              : Dimensions.get('window').height < 750
              ? '3%'
              : 0, // tab navigator와의 간격
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
};

export default Expired;
