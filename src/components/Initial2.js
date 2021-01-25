import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
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

const images = new Array('', '', '');
const window = Dimensions.get('window');
// const Wrapper = styled.View`
//   // flex : 1
//   height: Dimenssion.get('screen') .height;
// `;

class Initial2 extends Component {
  scrollX = new Animated.Value(0);
  state = {
    number: 1,
  };
  state = {
    dimensions: {
      window,
    },
    userLang: 'ko',
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleLoginRoute = (e) => {
    console.log('/ >> /login');
    this.props.history.push('/login');
  };

  onDimensionsChange = ({window}) => {
    this.setState({dimensions: {window}});
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onDimensionsChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onDimensionsChange);
    // Dimenssion.get('screen').height;
  }
  render() {
    console.log('>>>>', getPermission);
    ///

    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    console.log('platformOS>>>>>>>>>>', deviceLanguage); //en_US

    ////
    const userLang = this.state.userLang;
    const windowWidth = this.state.dimensions.window.width;
    const windowHeight = this.state.dimensions.window.height;
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
            style={AuthStyle.initial2scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.scrollX,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={
                    (AuthStyle.initial2ImgBox,
                    {width: windowWidth, height: windowHeight})
                  }
                  key={imageIndex}>
                  <Image
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
                      ? lang()[0].en.initial1
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
              );
            })}
          </ScrollView>
          <View
            style={[
              AuthStyle.initial2IndicatorContainer,
              {marginBottom: '8%'},
            ]}>
            {images.map((image, imageIndex) => {
              const backgroundColor = this.scrollX.interpolate({
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

        <View style={ResetStyle.containerInner}>
          <View
            style={[
              AuthStyle.initial2IndicatorContainer,
              {marginBottom: '8%'},
            ]}>
            {images.map((image, imageIndex) => {
              const opacity = this.scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={(AuthStyle.initial2ButtonBox, {opacity})}>
                  {imageIndex === 2 ? (
                    <View
                      style={{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                      }}>
                      <TouchableOpacity
                        style={[ResetStyle.button, {marginTop: 30}]}
                        activeOpacity={0.75}
                        onPress={() => {
                          this.props.navigation.navigate('SignUp');

                          this.props.navigation.setOptions({
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
                          this.props.navigation.navigate('Login');
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
                    </View>
                  ) : null}
                </Animated.View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Initial2;
