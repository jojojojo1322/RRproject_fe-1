import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  Platform,
  YellowBox,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ResetStyle from '@style/ResetStyle';
import MainStyle from '@style/MainStyle';
import Carousel from '@defined/snapCarousel/snapCarousel';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scrollInterpolator2, animatedStyles2} from '../animations';
import ProgressModal from '@factory/modal/ProgressModal';
import {server} from '@context/server';
import axios from 'axios';

import {withTranslation} from 'react-i18next';

import BottomModal from '@factory/modal/BottomModal';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import {useTranslation} from 'react-i18next';
import OnGoing from './MainTab/OnGoing';
import Completed from './MainTab/Completed';
import Expired from './MainTab/Expired';

const SLIDER_WIDTH = Dimensions.get('window').width;
// const SLIDER_HEIGHT = Dimensions.get('window').height / 2.5;
// const SLIDER_HEIGHT = Dimensions.get('window').height / 2;
// const SLIDER_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
// const ITEM_HEIGHT = Math.round(ITEM_WIDTH);
// const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT / 2.5);
// const ITEM_HEIGHT_ANDROID = Math.round(SLIDER_HEIGHT / 2.2);

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
    img: require('@images/shutterstock_1675809577.png'),
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
              source={require('@images/rrLogoW.png')}
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
              source={require('@images/menuIcon_w.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            width: '95%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: Platform.OS === 'ios' ? 75 : 65,
            borderRadius: 25,
          }}>
          <View
            style={{
              position: 'absolute',
              left: '50%',
              height: '70%',
              backgroundColor: '#e2e2e2',
              width: '0.4%',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileMain', {
                kycLevel: kycLevel,
              });
            }}
            style={{
              // borderWidth: 1,
              // borderColor: '#f00',
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: '18%',
              // width: '49.3%',
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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WalletMain', {
                currentTnc: nonFixTnc,
              });
            }}
            style={{
              // borderWidth: 1,
              // borderColor: '#f00',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: '22%',
              // width: '49.3%',
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
            paddingTop:
              Platform.OS === 'android'
                ? 0
                : Dimensions.get('window').height < 750
                ? 3
                : 12,
          },
          style: {
            backgroundColor: 'transparent',
            height:
              Platform.OS === 'Android'
                ? 50
                : Dimensions.get('window').height < 750
                ? 50
                : 80,
            // borderWidth: 1,
          },
          indicatorStyle: {
            width: '4%',
            height: 2,
            backgroundColor: '#222',
            left: '11%',
            bottom:
              Platform.OS === 'android'
                ? '15%'
                : Dimensions.get('window').height < 750
                ? '15%'
                : '25%',
          },
        }}>
        <Tab.Screen
          name={t('main7')}
          component={OnGoing}
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
