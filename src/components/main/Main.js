import React, {Component, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import ResetStyle from '../../style/ResetStyle.js';
import MainStyle from '../../style/MainStyle.js';
import {ProgressCircle} from 'react-native-svg-charts';

import MainAlert from '../main/MainAlert';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from '../defined/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 215;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const PullToRefreshDist = 150;

export const MainTest = ({navigation}) => {
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ongoing', title: 'ONGOING'},
    {key: 'completed', title: 'COMPLETED'},
    {key: 'upcoming', title: 'UPCOMING'},
    {key: 'expired', title: 'EXPIRED'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const [tab1Data] = useState([
    {
      id: '1',
      img: require('../../imgs/drawable-xxxhdpi/survey_img_1.png'),
      status: 'ongoing',
      division: 'E-commerce',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '안드로이드 S20 만족도 조사',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '2',
      img: null,
      status: 'upcoming',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '부동산,\n이게 어떻게 된 일일까요?',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '0',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '3',
      img: null,
      status: 'upcoming',
      division: 'Any Category2',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '결혼, 출산, 그리고 육아',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '0',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '4',
      img: require('../../imgs/drawable-xxxhdpi/survey_img_2.png'),
      status: 'expired',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '2020년 크리스마스,\n어떻게 보내실 건가요?',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '5',
      img: null,
      status: 'ongoing',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '부동산,\n이게 어떻게 된 일일까요?',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '6',
      img: null,
      status: 'ongoing',
      division: 'Any Category2',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '결혼, 출산, 그리고 육아',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '7',
      img: require('../../imgs/drawable-xxxhdpi/survey_img_2.png'),
      status: 'ongoing',
      division: 'Any Category1',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '2020년 크리스마스,\n어떻게 보내실 건가요?',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
    {
      id: '8',
      img: null,
      status: 'expired',
      division: 'Any Category2',
      dateStart: '2020.12.03',
      dateEnd: '2020.12.31',
      title: '결혼, 출산, 그리고 육아',
      participant: 'S20 사용자',
      participantCount: '20000',
      participantCompleteCount: '12375',
      tnc: '10',
      purpose: '다음 제품 출시를 위하여',
      host: 'Samsung',
    },
  ]);

  /**
   * ref
   */
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  // for capturing header scroll on Android
  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderEnd: (evt, gestureState) => {
        handlePanReleaseOrEnd(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        const curListRef = listRefArr.current.find(
          (ref) => ref.key === routes[_tabIndex.current].key,
        );
        const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
        if (curListRef.value) {
          // scroll up
          if (headerScrollOffset > 0) {
            curListRef.value.scrollToOffset({
              offset: headerScrollOffset,
              animated: false,
            });
            // start pull down
          } else {
            if (Platform.OS === 'ios') {
              curListRef.value.scrollToOffset({
                offset: headerScrollOffset / 3,
                animated: false,
              });
            } else if (Platform.OS === 'android') {
              if (!refreshStatusRef.current) {
                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
              }
            }
          }
        }
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const startRefreshAction = () => {
    if (Platform.OS === 'ios') {
      listRefArr.current.forEach((listRef) => {
        listRef.value.scrollToOffset({
          offset: -50,
          animated: true,
        });
      });
      refresh().finally(() => {
        syncScrollOffset();
        // do not bounce back if user scroll to another position
        if (scrollY._value < 0) {
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      });
    } else if (Platform.OS === 'android') {
      Animated.timing(headerMoveScrollY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
      refresh().finally(() => {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handlePanReleaseOrEnd = (evt, gestureState) => {
    // console.log('handlePanReleaseOrEnd', scrollY._value);
    syncScrollOffset();
    headerScrollY.setValue(scrollY._value);
    if (Platform.OS === 'ios') {
      if (scrollY._value < 0) {
        if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
          startRefreshAction();
        } else {
          // should bounce back
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      } else {
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      }
    } else if (Platform.OS === 'android') {
      if (
        headerMoveScrollY._value < 0 &&
        headerMoveScrollY._value / 1.5 < -PullToRefreshDist
      ) {
        startRefreshAction();
      } else {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
    // console.log('onMomentumScrollEnd');
  };

  const onScrollEndDrag = (e) => {
    syncScrollOffset();

    const offsetY = e.nativeEvent.contentOffset.y;
    // console.log('onScrollEndDrag', offsetY);
    // iOS only
    if (Platform.OS === 'ios') {
      if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
        startRefreshAction();
      }
    }

    // check pull to refresh
  };

  const refresh = async () => {
    console.log('-- start refresh');
    refreshStatusRef.current = true;
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    }).then((value) => {
      console.log('-- refresh done!');
      refreshStatusRef.current = false;
    });
  };

  /**
   * render Helper
   */
  const renderHeader = (navigation) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
      // extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[MainStyle.mainHeader, {transform: [{translateY: y}]}]}>
        <View style={[MainStyle.mainHeaderView]}>
          <View style={[MainStyle.mainHeaderViewInner]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontG,
                {fontWeight: '500'},
              ]}>
              MY TNC
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumE,
                ResetStyle.fontB,
                {fontWeight: '600'},
              ]}>
              10,000
            </Text>
          </View>

          <View style={[MainStyle.mainHeaderViewInner]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontG,
                {fontWeight: '500'},
              ]}>
              HIT
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumE,
                ResetStyle.fontB,
                {fontWeight: '600'},
              ]}>
              10
            </Text>
          </View>

          <View style={[MainStyle.progressCircleView]}>
            {/* progress 최대 수치 1 */}
            <ProgressCircle
              style={[MainStyle.progressCircle]}
              progress={0.086}
              progressColor={'#0080ff'}
              strokeWidth={Platform.OS === 'ios' ? 2.5 : 2}
            />

            <View style={[MainStyle.progressCircleInner]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {fontWeight: '500', marginRight: 5},
                ]}>
                LEVEL
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/main_questionmark_icon.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>2</Text>
          </View>
        </View>
        <View style={[MainStyle.speechBubbleView]}>
          <View style={[MainStyle.speechBubble]}>
            <View style={[MainStyle.speechBubbleTriangle]}></View>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontWhite,
                {textAlign: 'center', fontWeight: '500'},
              ]}>
              KYC LEVEL을{'\n'}업데이트해보세요!
            </Text>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontWhite,
                {textAlign: 'center', marginTop: 5},
              ]}>
              (HIGHEST LEVEL 23)
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const rednerTab1Item = ({item, index, onPress}) => {
    // console.log('>>>>>>ASDSDAsdasdas>>>>>>>', item.status);
    if (item.status === 'zero') {
      return (
        <TouchableOpacity
          style={[
            MainStyle.itemBox,
            {borderWidth: 0, backgroundColor: 'transparent'},
          ]}>
          <Image
            style={{alignSelf: 'center'}}
            source={require('../../imgs/drawable-xxxhdpi/no_data_icon.png')}
          />
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontG]}>
            No data!
          </Text>
        </TouchableOpacity>
      );
    } else if (item.status !== 'zero') {
      return (
        <TouchableOpacity
          style={[MainStyle.itemBox]}
          onPress={() => {
            item.status === 'expired'
              ? navigation.navigate('MainDetailExpired')
              : item.status === 'upcoming'
              ? navigation.navigate('MainDetail')
              : navigation.navigate('MainDetail');
            // navigation.navigate('MainDetail');
          }}>
          <View
            opacity={item.status === 'expired' ? 0.5 : 1.0}
            style={{
              flex: 1,
            }}>
            <View style={[MainStyle.itemBoxInner]}>
              <View style={{position: 'relative'}}>
                <View
                  style={[
                    MainStyle.itemDivisionColor,
                    {
                      backgroundColor:
                        item.division === 'E-commerce'
                          ? '#ffedc2'
                          : item.division === 'Any Category1'
                          ? '#b7fcff'
                          : '#ffdfdf',
                    },
                  ]}></View>
                <Text style={[ResetStyle.fontRegularE, ResetStyle.fontBlack]}>
                  {item.division}
                </Text>
              </View>
            </View>
            <View style={MainStyle.itemTitleView}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left'},
                ]}>
                {item.title}
              </Text>
            </View>
            {item.img === null ? (
              <View style={MainStyle.itemImagenullView}>
                <View style={MainStyle.itemImagenullViewInner}>
                  <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
                    + {item.tnc}
                  </Text>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontB,
                      {marginLeft: 5, paddingBottom: 5},
                    ]}>
                    TNC
                  </Text>
                </View>
              </View>
            ) : (
              <View style={MainStyle.itemImageView}>
                <View style={MainStyle.itemImageViewInner}>
                  <Image
                    source={item.img}
                    style={MainStyle.itemImageViewImage}
                  />
                  <Image
                    source={require('../../imgs/survey_img_gradient.png')}
                    style={MainStyle.itemImageViewImage}
                  />
                </View>
                <View style={MainStyle.itemImageTncView}>
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
              </View>
            )}
            <View style={MainStyle.itemBoxBottom}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
                  참여자
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {marginLeft: 10},
                  ]}>
                  {item.participant}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
                  참여자수
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {marginLeft: 10},
                  ]}>
                  {item.participantCount}명
                </Text>
              </View>
            </View>
            <View style={MainStyle.itemBoxBottomTextView}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
                목적
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginLeft: 10, textAlign: 'left', width: '90%'},
                ]}>
                {item.purpose}
              </Text>
            </View>
            <View style={MainStyle.itemBoxBottomTextView}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
                기한
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginLeft: 10},
                ]}>
                {item.dateStart} ~ {item.dateEnd}
              </Text>
            </View>
            <View style={MainStyle.itemBoxBottomTextView}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
                주최
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginLeft: 10},
                ]}>
                {item.host}
              </Text>
            </View>
            <View style={MainStyle.itemBoxBottomBarChartView}>
              <View
                style={{
                  ...MainStyle.itemBoxBottomBarChartPercent,
                  width:
                    item.status === 'upcoming'
                      ? 0
                      : item.status === 'ongoing'
                      ? '65%'
                      : '65%',
                }}></View>
            </View>
            <View style={MainStyle.participantCountView}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {fontWeight: '500'},
                ]}>
                {item.participantCompleteCount} / {item.participantCount}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderLabel = ({route, focused}) => {
    return (
      <Text style={[MainStyle.mainLabel, {opacity: focused ? 1 : 0.5}]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'ongoing':
        numCols = 1;
        data =
          tab1Data.filter((item) => item.status == 'ongoing').length == 0
            ? [{status: 'zero'}]
            : tab1Data.filter((item) => item.status == 'ongoing');
        renderItem = rednerTab1Item;
        break;
      case 'completed':
        numCols = 1;
        data =
          tab1Data.filter((item) => item.status == 'completed').length == 0
            ? [{status: 'zero'}]
            : tab1Data.filter((item) => item.status == 'completed');
        renderItem = rednerTab1Item;
        break;
      case 'upcoming':
        numCols = 1;
        data =
          tab1Data.filter((item) => item.status == 'upcoming').length == 0
            ? [{status: 'zero'}]
            : tab1Data.filter((item) => item.status == 'upcoming');
        renderItem = rednerTab1Item;
        break;
      case 'expired':
        numCols = 1;
        data =
          tab1Data.filter((item) => item.status == 'expired').length == 0
            ? [{status: 'zero'}]
            : tab1Data.filter((item) => item.status == 'expired');
        renderItem = rednerTab1Item;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        scrollToOverflowEnabled={true}
        // scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: scrollY}},
                  },
                ],
                {useNativeDriver: true},
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      // extrapolate: 'clamp',
      extrapolateRight: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>
        <TabBar
          {...props}
          onTabPress={({route, preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={[MainStyle.mainTab, {height: TabBarHeight}]}
          renderLabel={renderLabel}
          indicatorStyle={MainStyle.mainIndicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={(id) => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: windowWidth,
        }}
      />
    );
  };

  const renderCustomRefresh = () => {
    // headerMoveScrollY
    return Platform.select({
      ios: (
        <AnimatedIndicator
          style={{
            top: -50,
            position: 'absolute',
            alignSelf: 'center',
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [120, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
          animating
        />
      ),
      android: (
        <Animated.View
          style={{
            transform: [
              {
                translateY: headerMoveScrollY.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [150, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
            backgroundColor: '#f9f9f9',
            height: 38,
            width: 38,
            borderRadius: 19,
            borderWidth: 2,
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            top: -50,
            position: 'absolute',
          }}>
          <ActivityIndicator animating />
        </Animated.View>
      ),
    });
  };

  return (
    <View style={MainStyle.mainContainer}>
      <View style={[MainStyle.topLogoView]}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/main_r_logo.png')}
            />
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {marginLeft: 10},
              ]}>
              Real Research
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../imgs/drawable-xxxhdpi/menu_icon.png')}
          />
        </TouchableOpacity>
      </View>
      {renderTabView()}
      {renderHeader(navigation)}
      {renderCustomRefresh()}
    </View>
  );
};

class Main extends Component {
  // state = {};

  render() {
    return (
      <Drawer.Navigator
        initialRouteName="설문조사"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerPosition="right"
        drawerStyle={{
          width: '80%',
          backgroundColor: '#FFF',
        }}>
        <Drawer.Screen name="설문조사" component={MainTest} />
        <Drawer.Screen name="설문조사 의뢰하기" component={MainTest} />
        <Drawer.Screen name="미디어" component={MainTest} />
        <Drawer.Screen name="알림" component={MainAlert} />
        <Drawer.Screen name="설정" component={MainTest} />
        <Drawer.Screen name="초대코드" component={MainTest} />
      </Drawer.Navigator>
    );
  }
}

export default Main;
