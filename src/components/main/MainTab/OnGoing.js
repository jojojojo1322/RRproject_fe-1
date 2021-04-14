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
import {getOngoingSurveyList} from '@module/survey';
import ResetStyle from '@style/ResetStyle';
import MainStyle from '@style/MainStyle';
import {useNavigation} from '@react-navigation/native';

const TimeBlock = ({originEndTime}) => {
  const {t} = useTranslation();
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const time = setInterval(function () {
      const today = moment().tz('Asia/Seoul');
      const endTime = moment(originEndTime).tz('Asia/Seoul');
      var gap = endTime.diff(today);

      setDay(Math.ceil(gap / (1000 * 60 * 60 * 24)));
      setHour(Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMin(Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60)));
      setSec(Math.ceil((gap % (1000 * 60)) / 1000));
    }, 1000);

    return () => {
      clearInterval(time);
    };
  }, []);

  return (
    <Text
      style={[
        ResetStyle.fontRegularK,
        ResetStyle.fontWhite,
        {marginLeft: '5%'},
      ]}>
      {/* {item.endTime} */}
      {`${day - 1}${t('days')} ${hour}${t('hours')} ${min}${t(
        'minutes',
      )} ${sec}${t('seconds')}`}
    </Text>
  );
};

let SLIDER_HEIGHT = Dimensions.get('window').height;
let ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
let ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 1.6);
let ITEM_HEIGHT_IOS_UNDER700 = Math.round(SLIDER_HEIGHT / 2.3);
const OnGoing = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user, language, ongoingSurveyList} = useSelector(
    ({auth, language, survey}) => ({
      user: auth.user,
      language: language.language,
      ongoingSurveyList: survey.ongoingSurveyList,
    }),
  );

  const [index, setIndex] = useState(0);
  const [kycUpdateCheck, setKycUpdateCheck] = useState(1);
  // //Kyc 72시간 경고 모달
  const [modalVisible, setModalVisible] = useState(false);
  // progress
  const [modal2Visible, setModal2Visible] = useState(false);

  const renderItem = ({item}) => {
    let ret = 1;

    const goToDetail = () => {
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
    };

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
            Platform.OS !== 'ios' && {flex: 1},
            // {marginBottom: item.id === item.length ? 200 : 0},
          ]}>
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
                <View>
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
                    <TimeBlock originEndTime={item.endTime} />
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: Platform.OS === 'ios' ? 80 : 70,
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    borderRadius: 50,
                  }}
                  onPress={() => goToDetail()}>
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

  const surveyDetailApi = (legacySurveyId) => {
    dispatch(
      getSurveyDetail({
        language,
        legacySurveyId,
        userNo: user.userNo,
      }),
    );

    //setKycUpdateCheck(response.data.response.ret_val);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    if (SLIDER_HEIGHT === 0) {
      SLIDER_HEIGHT = Dimensions.get('window').height;
      ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
      ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 1.6);
      ITEM_HEIGHT_IOS_UNDER700 = Math.round(SLIDER_HEIGHT / 2.3);
    }
  }, [SLIDER_HEIGHT]);

  useEffect(() => {
    if (user.userNo !== '' && language) {
      dispatch(
        getOngoingSurveyList({
          surveyStatus: 'ongoing',
          language: language,
          userNo: user.userNo,
        }),
      );
    }
  }, [user, language]);

  return (
    <View style={{flex: 1}}>
      {SLIDER_HEIGHT > 0 && (
        <Carousel
          data={
            ongoingSurveyList.length == 0
              ? [{status: 'zero'}]
              : ongoingSurveyList
          }
          renderItem={renderItem}
          sliderHeight={Platform.OS === 'ios' ? 500 : 500}
          itemHeight={
            Platform.OS === 'android'
              ? ITEM_HEIGHT_ANDROID
              : Dimensions.get('window').height < 750
              ? ITEM_HEIGHT_IOS_UNDER700
              : ITEM_HEIGHT
          }
          containerCustomStyle={{
            flex: 1,
            backgroundColor: '#fff',
          }}
          slideStyle={{
            width: '100%',
            paddingTop: 0,
          }}
          contentContainerCustomStyle={{
            height:
              ongoingSurveyList.length == 0
                ? '100%'
                : String(ongoingSurveyList.length * 95 + '%'),
            paddingTop:
              Platform.OS === 'android'
                ? '3%'
                : Dimensions.get('window').height < 750
                ? '3%'
                : 0, // tab navigator와의 간격
          }}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          scrollInterpolator={scrollInterpolator2}
          slideInterpolatedStyle={animatedStyles2}
          vertical={true}
          layout={'stack'}
        />
      )}
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('main10')}
      />
      <ProgressModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
    </View>
  );
};

export default OnGoing;
