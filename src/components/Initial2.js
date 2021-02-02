import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  NativeModules,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {lang} from './defined/lang';
import ResetStyle from '../style/ResetStyle.js';
import AuthStyle from '../style/AuthStyle.js';
import getPermission from '../components/defined/getPermission';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources: {
//       en: {
//         translation: {
//           'Welcome to React': 'Welcome to React and react-i18next',
//         },
//       },
//       ko: {
//         translation: {
//           'Welcome to React': '안녕하세요',
//         },
//       },
//     },
//     lng: 'en',
//     fallbackLng: 'en',

//     interpolation: {
//       escapeValue: false,
//     },
//   });

const images = new Array('', '', '');
const window = Dimensions.get('window');
// const Wrapper = styled.View`
//   // flex : 1
//   height: Dimenssion.get('screen') .height;
// `;

const Initial2 = (props) => {
  const scrollX = new Animated.Value(0);
  const [number, setNumber] = useState(1);
  const [dimensions, setDimensions] = useState({window});
  const [userLang, setUserLang] = useState('ko');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const {t, i18n} = useTranslation();
  // state = {
  //   number: 1,
  // };
  // state = {
  //   dimensions: {
  //     window,
  //   },
  //   userLang: 'ko',
  // };

  // const setModalVisible = (visible) => {
  //   setState({modalVisible: visible});
  // };
  const handleBack = () => {
    props.history.goBack();
  };
  const handleLoginRoute = (e) => {
    console.log('/ >> /login');
    props.history.push('/login');
  };

  const onDimensionsChange = ({window}) => {
    // setState({dimensions: {window}});
    setDimensions({window});
  };

  // const componentDidMount() {
  //   Dimensions.addEventListener('change', onDimensionsChange);
  // }
  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionsChange);
    };
  }, []);

  // const componentWillUnmount() {
  //   Dimensions.removeEventListener('change', onDimensionsChange);
  //   // Dimenssion.get('screen').height;
  // }
  console.log('>>>>', getPermission);

  ///

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  console.log('platformOS>>>>>>>>>>', deviceLanguage); //en_US

  ////
  const windowWidth = dimensions.window.width;
  const windowHeight = dimensions.window.height;
  const llang = lang;
  console.log('windowHeight', windowHeight);
  return (
    <SafeAreaView
      style={[
        ResetStyle.container,
        // {height: windowHeight - useHeaderHeight()} -
        //   (StatusBar.currentHeight || 0),
      ]}>
      <View style={AuthStyle.initial2ScrollContainer}>
        <ScrollView
          horizontal={true}
          style={{}}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={1}>
          {images.map((image, imageIndex) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });
            return (
              <View
                style={{
                  width: windowWidth,
                  height: windowHeight,
                }}
                key={imageIndex}>
                <View>
                  <Image
                    // style={{width: 200, height: 200, resizeMode: 'contain'}}
                    source={
                      imageIndex == 0
                        ? require('../imgs/drawable-xhdpi/icon_intro_research.png')
                        : imageIndex == 1
                        ? require('../imgs/drawable-xhdpi/icon_intro_wallet.png')
                        : require('../imgs/drawable-xhdpi/icon_intro_reward.png')
                    }
                    style={AuthStyle.initial2Image}
                  />
                  {/* <Text style={[AuthStyle.initial2TextTitle]}> */}
                  <Text
                    style={[
                      ResetStyle.fontBoldK,
                      ResetStyle.fontB,
                      {textAlign: 'center', marginTop: '8%'},
                    ]}>
                    {imageIndex == 0
                      ? 'RESEARCH'
                      : imageIndex == 1
                      ? 'WALLET'
                      : 'REWARD'}
                  </Text>
                  <Text
                    style={[
                      ResetStyle.fontLightE,
                      ResetStyle.fontDG,
                      {textAlign: 'center', marginTop: '4%', lineHeight: 26},
                    ]}>
                    {imageIndex == 0
                      ? // ? lang()[0].en.initial1
                        t('Welcome to React')
                      : imageIndex == 1
                      ? lang()[0].en.initial2
                      : lang()[0].en.initial3}

                    {/* {
                      lang(223, <Text style={{color: 'red'}}>asd</Text>)[0].ko
                        .KycComplete[1]
                    }
                    {
                      lang(223, <Text style={{color: 'red'}}>asd</Text>)[0].ko
                        .KycComplete[2]
                    } */}
                  </Text>
                </View>

                {imageIndex === 2 ? (
                  <Animated.View
                    style={{opacity, marginLeft: '5%', marginRight: '5%'}}>
                    <TouchableOpacity
                      style={[ResetStyle.button, {marginTop: 30}]}
                      activeOpacity={0.75}
                      onPress={() => {
                        props.navigation.navigate('SignUp');
                        props.navigation.setOptions({
                          title: '휴대폰 인증',
                        });
                      }}>
                      <Text
                        style={[
                          ResetStyle.fontMediumK,
                          ResetStyle.fontWhite,
                          {fontWeight: '600'},
                        ]}>
                        SIGN UP
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[ResetStyle.buttonWhite, {marginTop: 10}]}
                      activeOpacity={0.75}
                      onPress={() => {
                        props.navigation.navigate('Login');
                      }}>
                      <Text
                        style={[
                          ResetStyle.fontMediumK,
                          ResetStyle.fontB,
                          {fontWeight: '600'},
                        ]}>
                        LOGIN
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[ResetStyle.buttonWhite, {marginTop: 10}]}
                      activeOpacity={0.75}
                      onPress={() => {
                        props.navigation.navigate('SignUpPersonal');
                      }}>
                      <Text
                        style={[
                          ResetStyle.fontMediumK,
                          ResetStyle.fontB,
                          {fontWeight: '600'},
                        ]}>
                        SignUpPersonal
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>

        <View
          style={[AuthStyle.initial2IndicatorContainer, {marginBottom: '8%'}]}>
          {images.map((image, imageIndex) => {
            const backgroundColor = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: ['#e7e8e9', '#4696ff', '#e7e8e9'],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[AuthStyle.initial2NormalDot, {backgroundColor}]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Initial2;
