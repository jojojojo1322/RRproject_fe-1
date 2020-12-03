import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ko from './language/ko';
import lang from './language/lang';
import en from './language/en';

const images = new Array('', '', '');
const window = Dimensions.get('window');

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
  }
  render() {
    const userLang = this.state.userLang;
    const windowWidth = this.state.dimensions.window.width;
    // console.log([ko]);
    // console.log([lang.ko.initial1]);
    // console.log([ko.initial1]);
    // console.log([en.initial1]);
    // console.log([lang]);
    // console.log('1', userLang);
    // console.log('2', {userLang});
    // console.log('3', [userLang]);
    // console.log('4', `${userLang}`);
    // console.log('>>>>', [`${lang}.${userLang}.${initial1}`]);
    // console.log('>>>>', [lang.{userLang}]);
    // const arr = lang + `.${userLang}`;
    // console.log('arr>>>>', arr);
    // console.log(userLang);
    // console.log({userLang});
    // console.log(`${userLang}`);
    // console.log('aaa>>>', arr.initial1);
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.scrollContainer}>
            <ScrollView
              horizontal={true}
              style={styles.scrollViewStyle}
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
                    style={(styles.imgBox, {width: windowWidth})}
                    key={imageIndex}>
                    <Image
                      source={
                        imageIndex == 0
                          ? require('../imgs/drawable-xhdpi/icon_intro_research.png')
                          : imageIndex == 1
                          ? require('../imgs/drawable-xhdpi/icon_intro_wallet.png')
                          : require('../imgs/drawable-xhdpi/icon_intro_reward.png')
                      }
                      style={styles.Image}
                    />
                    <Text style={styles.TextTitle}>
                      {imageIndex == 0
                        ? 'RESEARCH'
                        : imageIndex == 1
                        ? 'WALLET'
                        : 'REWARD'}
                    </Text>
                    <Text style={styles.infoText}>
                      {imageIndex == 0
                        ? [lang.en.initial1]
                        : imageIndex == 1
                        ? [lang.en.initial2]
                        : [lang.en.initial3]}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.indicatorContainer}>
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
                    style={[styles.normalDot, {backgroundColor}]}
                  />
                );
              })}
            </View>
          </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.75}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
              
              this.props.navigation.setOptions({ title: '휴대폰 인증' });
            }}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.75}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text style={[styles.buttonText, {color: '#4696ff'}]}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.75}
            onPress={() => {
              this.props.navigation.navigate('ResearchForm');
            }}>
            <Text style={[styles.buttonText, {color: '#4696ff'}]}>ResearchForm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.75}
            onPress={() => {
              this.props.navigation.navigate('Initial3');
            }}>
            <Text style={[styles.buttonText, {color: '#4696ff'}]}>Test page</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.75}
            onPress={() => {
              this.props.navigation.navigate('Kyc');
            }}>
            <Text style={[styles.buttonText, {color: '#4696ff'}]}>Kyc</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  Image: {
    resizeMode: 'contain',
    width: 100 ,
    height: 90,
    alignSelf: 'center',
  },
  scrollContainer: {
    marginTop: 100,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextTitle: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 32,
    color: '#4696ff',
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#222222',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '300',
  },
  normalDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4696ff',
    marginHorizontal: 6,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 56,
    borderRadius: 30,
    backgroundColor: '#4696ff',
    color: '#FFF',
    marginTop: 40,
  },
  buttonLogin: {
    width: '90%',
    height: 56,
    borderRadius: 30,
    // backgroundColor: '#4696ff',
    borderWidth: 1,
    borderColor: '#4696ff',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 56,
    fontWeight: '400'
  },
});

export default Initial2;
