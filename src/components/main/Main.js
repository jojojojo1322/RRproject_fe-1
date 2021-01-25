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
import axios from 'axios';
import {server} from '../defined/server';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ResetStyle from '../../style/ResetStyle';
import MainStyle from '../../style/MainStyle';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scrollInterpolator2, animatedStyles2} from '../animations';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

export default function MainTest({navigation}) {
  // 3자리수 콤마(,)
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const mainSurveyListAPI = async (surveyStatus, page) => {
    await axios
      .get(
        `${server}/survey/main/status/${surveyStatus}/${await AsyncStorage.getItem(
          'deviceLanguage',
        )}?CurrentPageNo=${page}`,
      )
      .then((response) => {
        console.log('mainSurveyListAPI SUCCESS', response.data);

        // var arr = response.data.filter((data) => {
        //   console.log(data.status);
        //   data.status === false;
        // });
        // setAlertDataNot(arr);
      })
      .catch((e) => {
        console.log('mainSurveyListAPI ERROR', e);
      });
  };
  const SLIDER_WIDTH = Dimensions.get('window').width;
  // const SLIDER_HEIGHT = Dimensions.get('window').height / 2.5;
  const SLIDER_HEIGHT = Dimensions.get('window').height / 2;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
  const ITEM_HEIGHT = Math.round(ITEM_WIDTH);

  const DATA = [
    {
      id: '1',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1018031032.png'),
      status: 'ongoing',
      division: 'E-commerce',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '안드로이드 S20 만족도 조사',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '2',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1687630222.png'),
      status: 'ongoing',
      division: 'COVID-19',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '코로나가 가져온\n배달 문화의 변화',
      participantCount: 20000,
      participantCompleteCount: 1370,
      tnc: 10,
      host: 'LG',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '3',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1675809577.png'),
      status: 'ongoing',
      division: 'Category',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '요즘 음악\n어디서 들어요?',
      participantCount: 20000,
      participantCompleteCount: 0,
      tnc: 10,
      host: 'Buyaladdin',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '4',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_609058097.png'),
      status: 'expired',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '2020년 크리스마스,\n어떻게 보내실 건가요?',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '5',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_609058097.png'),
      status: 'ongoing',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '설문조사 제목입\n니다. 설문조사 제목',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '6',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1687630222.png'),
      status: 'ongoing',
      division: 'Any Category2',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '코로나가 가져온\n배달 문화의 변화',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '7',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1018031032.png'),
      status: 'ongoing',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '2020년 크리스마스,\n어떻게 보내실 건가요?',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
    {
      id: '8',
      img: require('../../imgs/drawable-xxxhdpi/shutterstock_1018031032.png'),
      status: 'expired',
      division: 'Any Category2',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '결혼, 출산, 그리고 육아',
      participantCount: 20000,
      participantCompleteCount: 12375,
      tnc: 10,
      host: 'Samsung',
      content: '해당 서베이에 대한 간략 설명',
    },
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
  ];

  function renderItem({item}) {
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
            No data!
          </Text>
        </TouchableOpacity>
      );
    } else if (item.status !== 'zero') {
      return (
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
            // {marginBottom: item.id === item.length ? 200 : 0},
          ]}
          onPress={() => {
            item.status === 'expired'
              ? navigation.navigate('MainDetailExpired')
              : item.status === 'completed'
              ? navigation.navigate('MainDetailCompleted')
              : navigation.navigate('MainDetail');
            // navigation.navigate('MainDetail');
          }}>
          <View
            opacity={item.status === 'expired' ? 0.5 : 1.0}
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
              source={item.img}
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
                  {item.division} | {item.host}
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
                {item.title}
              </Text>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                {item.content}
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
                  + {item.tnc}
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontWhite,
                    {marginLeft: 5, paddingBottom: 5},
                  ]}>
                  TNC
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
                  {numberWithCommas(item.participantCompleteCount)} /{' '}
                  {numberWithCommas(item.participantCount)}
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
                  {item.dateStart}
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
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontWhite,
                  {fontWeight: '900', padding: 8},
                ]}>
                보기
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  }

  function Ongoing({navigation}) {
    const [index, setIndex] = useState(0);
    // const [loading, setLoading] = useState(false);
    // console.log(navigation);
    mainSurveyListAPI('ongoing', 1);
    return (
      <Carousel
        data={
          DATA.filter((item) => item.status == 'ongoing').length == 0
            ? [{status: 'zero'}]
            : DATA.filter((item) => item.status == 'ongoing')
        }
        renderItem={renderItem}
        sliderHeight={SLIDER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
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
        // navigation={navigation}
        // ListFooterComponent={loading && <ActivityIndicator />}
      />
    );
  }

  function Completed({navigation}) {
    const [index, setIndex] = useState(0);
    return (
      <Carousel
        data={
          DATA.filter((item) => item.status == 'completed').length == 0
            ? [{status: 'zero'}]
            : DATA.filter((item) => item.status == 'completed')
        }
        renderItem={renderItem}
        sliderHeight={SLIDER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
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
    const [index, setIndex] = useState(0);
    return (
      <Carousel
        data={
          DATA.filter((item) => item.status == 'expired').length == 0
            ? [{status: 'zero'}]
            : DATA.filter((item) => item.status == 'expired')
        }
        renderItem={renderItem}
        sliderHeight={SLIDER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
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
            onPress={async () => {
              try {
                console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
                await AsyncStorage.removeItem('userNo');
              } catch (e) {}
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
                Real Research
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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
              KYC 레벨
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '500'},
                ]}>
                LEVEL
              </Text>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '500', marginLeft: '3%', marginRight: '3%'},
                ]}>
                4
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/main_questionmark_icon.png')}
                />
              </TouchableOpacity>
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
              MY TNC
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {fontWeight: '500'},
              ]}>
              15
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="Ongoing"
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
          options={{tabBarLabel: '진행중'}}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          options={{tabBarLabel: '참여완료'}}
        />
        <Tab.Screen
          name="Expired"
          component={Expired}
          options={{tabBarLabel: '설문종료'}}
        />
      </Tab.Navigator>
    </View>
  );
}
