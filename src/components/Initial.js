import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  NativeModules,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

import {server} from '@context/server';
import getPermission from '@defined/getPermission';
import BottomModal from '@factory/modal/BottomModal';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';

const images = new Array('', '', '');
const window = Dimensions.get('window');

const Initial = () => {
  const {t} = useTranslation();

  const scrollX = new Animated.Value(0);
  const [number, setNumber] = useState(1);
  const [dimensions, setDimensions] = useState({window});
  const [userLang, setUserLang] = useState('ko');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [deviceCheck, setDeviceCheck] = useState(1);

  const handleBack = () => {
    props.history.goBack();
  };
  const handleLoginRoute = (e) => {
    props.history.push('/login');
  };

  const onDimensionsChange = ({window}) => {
    setDimensions({window});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionsChange);
    };
  }, []);

  const deviceKeyCheckApi = () => {
    console.log('deviceKeyCheckApi DEVICE KEY>>', DeviceInfo.getUniqueId());
    axios
      .get(
        `${server}/user/register/device-key?reqDeviceKey=${DeviceInfo.getUniqueId()}`,
      )
      .then((response) => {
        console.log('deviceKeyCheckApi THEN>>', response);
        setDeviceCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('deviceKeyCheckApi ERROR>>', e);
      });
  };

  useEffect(() => {
    console.log('initial 2 진입');
    if (deviceCheck === 0) {
      setDeviceCheck(1);
      props.navigation.navigate('SignUp');
    } else if (deviceCheck !== 0 && deviceCheck !== 1) {
      setModal2Visible(true);
    }
  }, [deviceCheck]);

  console.log('>>>>', getPermission);
  console.log(
    '// deviceKey: DeviceInfo.getUniqueId()',
    DeviceInfo.getUniqueId(),
  );
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

  return (
    <ScrollView
      horizontal={true}
      style={{borderWidth: 3, width: '100%', height: '100%'}}
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
                style={{
                  width: Platform.OS === 'ios' ? 200 : 180,
                  height: 200,
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
                  ResetStyle.fontLightK,
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
                  onPress={() => {
                    // deviceKey: DeviceInfo.getUniqueId()
                    // props.navigation.navigate('SignUp');
                    deviceKeyCheckApi();
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
                {/* <TouchableOpacity
              style={[ResetStyle.buttonWhite, {marginTop: 10}]}
              activeOpacity={0.75}
              onPress={() => {
                props.navigation.navigate('KycThird');
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '600'},
                ]}>
                KycThird
              </Text>
            </TouchableOpacity> */}
              </Animated.View>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Initial;
