var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import React, {useState, useEffect, useRef} from 'react';
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
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import ResetStyle from '../../style/ResetStyle.js';
import MainStyle from '../../style/MainStyle.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const {height: wHeight} = Dimensions.get('window');
const height = wHeight;

const VegaScrollItem = ({y, index, distanceBetweenItem, item}) => {
  const [cardHeight, setCardHeight] = useState(0);
  const position = Animated.subtract(index * cardHeight, y);
  const isDisappearing = -cardHeight;
  const isTop = 0;
  const isBottom = height - cardHeight;
  const isAppearing = height;
  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * cardHeight],
      outputRange: [0, -index * cardHeight],
      extrapolateRight: 'clamp',
    }),
  );
  const scale = position.interpolate({
    // inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    inputRange: [-500, -50, 0, 50],
    outputRange: [0.85, 1, 1, 1],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    // inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    inputRange: [-500, -50, 0, 50],
    outputRange: [0.5, 1, 1, 1],
  });
  const onSwipeUp = (gestureState) => {};
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      config={config}
      style={{
        flex: 1,
      }}>
      <Animated.View
        style={{
          width: '90%',
          marginVertical: distanceBetweenItem,
          alignSelf: 'center',
          opacity,
          transform: [{translateY}, {scale}],
        }}
        key={index}>
        <View
          onLayout={(event) => {
            var {height} = event.nativeEvent.layout;
            setCardHeight(height + distanceBetweenItem * 2);
          }}>
          {item}
        </View>
      </Animated.View>
    </GestureRecognizer>
  );
};
const VegaScrollList = (props) => {
  const [myText, setMyText] = useState("I'm ready to get swiped!");
  const [gestureName, setGestureName] = useState('none');
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  const onSwipeUp = (gestureState) => {
    setMyText('You swiped up!');
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const {data, renderItem, distanceBetweenItem: distance} = props,
    otherProps = __rest(props, ['data', 'renderItem', 'distanceBetweenItem']);
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });
  let distanceBetweenItem = distance || 8;
  return React.createElement(
    Animated.FlatList,
    Object.assign(
      {
        scrollEventThrottle: 16,
        bounces: false,
        data: data,
        style: {marginTop: '14%'},
        renderItem: (data) => {
          let item = renderItem(data);
          const {index} = data;
          return React.createElement(
            VegaScrollItem,
            Object.assign({}, {index, y, item, distanceBetweenItem}),
          );
        },
      },
      {onScroll},
      otherProps,
    ),
  );
};

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = Platform.OS === 'ios' ? 70 : 50;
const HeaderHeight = Platform.OS === 'ios' ? 110 : 230;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const PullToRefreshDist = 150;

// 3자리수 콤마(,)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const Main = ({navigation}) => {
  /**
   * stats
   */
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ongoing', title: '진행중'},
    {key: 'completed', title: '참여완료'},
    // {key: 'upcoming', title: 'UPCOMING'},
    {key: 'expired', title: '설문종료'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [tab1Data] = useState([
    {
      id: '1',
      img: require('@images/shutterstock_1018031032.png'),
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
      img: require('@images/shutterstock_1687630222.png'),
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
      img: require('@images/shutterstock_1675809577.png'),
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
      img: require('@images/shutterstock_609058097.png'),
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
      img: require('@images/shutterstock_609058097.png'),
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
      img: require('@images/shutterstock_1687630222.png'),
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
      img: require('@images/shutterstock_1018031032.png'),
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
      img: require('@images/shutterstock_1018031032.png'),
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

  const startRefreshAction = async () => {
    console.log('rererefresh', await AsyncStorage.getItem('userNo'));
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
            source={require('@images/noDataIcon.png')}
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
                height: '110%',
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
                }}></View>
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
                  {numberWithCommas(item.participantCompleteCount)} /{' '}
                  {numberWithCommas(item.participantCount)}
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
      <VegaScrollList
        // style={{marginTop: 50}}
        distanceBetweenItem={12}
        data={data}
        renderItem={renderItem}
        // showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props) => {
    console.log('props', props.navigationState.index);
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          // transform: [{translateY: y}],
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
          indicatorStyle={[
            MainStyle.mainIndicator,
            props.navigationState.index == '1' && {left: '8%'},
            props.navigationState.index == '2' && {left: '8%'},
            // props.navigationState.index == '3' && {left: '5%'},
          ]}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: '5%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={async () => {
              try {
                console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
                await AsyncStorage.removeItem('userNo');
                console.log('USerNONONO', await AsyncStorage.getItem('userNo'));
              } catch (e) {}
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
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
                Real Research
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(navigation.openDrawer);
              navigation.openDrawer();
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
            backgroundColor: '#fff',
            width: '95%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 75,
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
                <Image source={require('@images/mainQuestionmarkIcon.png')} />
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
      {renderTabView()}
      {/* {renderHeader(navigation)} */}
      {renderCustomRefresh()}
    </View>
  );
};

export default Main;
