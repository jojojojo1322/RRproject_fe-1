import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  Platform,
  YellowBox,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';
import DeviceInfo from 'react-native-device-info';

import {server} from '@context/server';
import axios from 'axios';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import BottomModal from '@factory/modal/BottomModal';

const images = new Array('', '', '');
const Initial2 = (props) => {
  const {t} = useTranslation();

  const scrollX = new Animated.Value(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [modal2Visible, setModal2Visible] = useState(false);
  const [deviceCheck, setDeviceCheck] = useState(1);

  const onDimensionsChange = ({window}) => {
    setDimensions({window});
  };

  useEffect(() => {
    console.log('DeviceKey: ', DeviceInfo.getUniqueId());

    Dimensions.addEventListener('change', onDimensionsChange);
    YellowBox.ignoreWarnings(['Can']);
    return () => {
      Dimensions.removeEventListener('change', onDimensionsChange);
    };
  }, []);

  const deviceKeyCheckApi = () => {
    axios
      .get(
        `${server}/user/register/device-key?reqDeviceKey=${DeviceInfo.getUniqueId()}`,
      )
      .then((response) => {
        console.log('deviceKeyCheckApi[then]: ', response);
        setDeviceCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('deviceKeyCheckApi[error]: ', e);
      });
  };

  useEffect(() => {
    if (deviceCheck === 0) {
      console.log('DeviceCheck PASS');
      setDeviceCheck(1);
      props.navigation.navigate('SignUp');
    } else if (deviceCheck !== 0 && deviceCheck !== 1) {
      console.log('DeviceCheck FAIL');
      setModal2Visible(true);
    }
  }, [deviceCheck]);

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
          {images.map((_, imageIndex) => {
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
                    style={{
                      width: Platform.OS === 'ios' ? 200 : 180,
                      height: Platform.OS === 'ios' ? 200 : 180,
                      resizeMode: 'contain',
                    }}
                    source={
                      imageIndex == 0
                        ? require('@images/iconIntroResearch.png')
                        : imageIndex == 1
                        ? require('@images/iconIntroWallet.png')
                        : require('@images/iconIntroReward.png')
                    }
                    style={AuthStyle.initial2Image}
                  />
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
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {textAlign: 'center', marginTop: '4%', lineHeight: 26},
                    ]}>
                    {imageIndex == 0
                      ? t('intro1')
                      : imageIndex == 1
                      ? t('intro2')
                      : t('intro3')}
                  </Text>
                </View>

                {imageIndex === 2 ? (
                  <Animated.View
                    style={{opacity, marginLeft: '5%', marginRight: '5%'}}>
                    <TouchableOpacity
                      style={[ResetStyle.button, {marginTop: 30}]}
                      activeOpacity={0.75}
                      onPress={() => deviceKeyCheckApi()}>
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
                        props.navigation.navigate(
                          'SettingsPersonalPasswordChange',
                        );
                      }}>
                      <Text
                        style={[
                          ResetStyle.fontMediumK,
                          ResetStyle.fontB,
                          {fontWeight: '600'},
                        ]}>
                        SettingsPersonalPasswordChange
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
        <BottomModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          text={`해당 핸드폰으로 등록된 계정이 있습니다.`}
        />
      </View>
    </SafeAreaView>
  );
};

export default Initial2;
