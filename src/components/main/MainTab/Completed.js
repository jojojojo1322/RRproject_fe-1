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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {scrollInterpolator2, animatedStyles2} from '../../animations';
import Carousel from '@defined/snapCarousel/snapCarousel';
import BottomModal from '@factory/modal/BottomModal';
import ProgressModal from '@factory/modal/ProgressModal';
import {getCompletedSurveyList} from '@module/survey';
import ResetStyle from '@style/ResetStyle';
import MainStyle from '@style/MainStyle';

let SLIDER_HEIGHT = Dimensions.get('window').height;
let ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
let ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 1.6);
const Completed = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user, language, completedSurveyList} = useSelector(
    ({auth, language, survey}) => ({
      user: auth.user,
      language: language.language,
      completedSurveyList: survey.completedSurveyList,
    }),
  );

  const [index, setIndex] = useState(0);
  const [modal2Visible, setModal2Visible] = useState(false);

  const renderItem = ({item}) => {
    let today = moment().tz('Asia/Seoul');

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
        <View style={[MainStyle.itemBox, Platform.OS !== 'ios' && {flex: 1}]}>
          <View
            opacity={1.0}
            style={{
              flex: 1,
            }}>
            {item.categoryImg && (
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
            )}
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
                      {day >= 0 && hour >= 0 && min >= 0 && sec >= 0
                        ? `${day - 1}${t('days')} ${hour}${t(
                            'hours',
                          )} ${min}${t('minutes')} ${sec}${t('seconds')}`
                        : `0${t('days')} 0${t('hours')} 0${t('minutes')} 0${t(
                            'seconds',
                          )}`}
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
                    navigation.navigate('MainDetailCompleted', {
                      legacySurveyId: item.legacySurveyId,
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
    if (SLIDER_HEIGHT === 0) {
      SLIDER_HEIGHT = Dimensions.get('window').height;
      ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
      ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 1.6);
    }
  }, [SLIDER_HEIGHT]);

  useEffect(() => {
    if (user.userNo !== '') {
      dispatch(getCompletedSurveyList(user.userNo));
    }
  }, [user]);

  return (
    <View style={{flex: 1}}>
      {SLIDER_HEIGHT > 0 && (
        <Carousel
          data={
            completedSurveyList.length == 0
              ? [{status: 'zero'}]
              : completedSurveyList
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
          containerCustomStyle={{
            flex: 1,
            backgroundColor: '#fff',
          }}
          slideStyle={{
            width: '100%',
            marginTop: 0,
            paddingTop: 0,
          }}
          contentContainerCustomStyle={{
            height:
              completedSurveyList.length == 0
                ? '100%'
                : String(completedSurveyList.length * 95 + '%'),
            paddingTop:
              Platform.OS === 'android'
                ? '3%'
                : Dimensions.get('window').height < 750
                ? '3%'
                : 0, // tab navigator?????? ??????
          }}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          scrollInterpolator={scrollInterpolator2}
          slideInterpolatedStyle={animatedStyles2}
          vertical={true}
          layout={'stack'}
          layoutCardOffset={0}
        />
      )}

      <ProgressModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
      />
    </View>
  );
};

export default Completed;
