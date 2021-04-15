import React, {useState, useEffect} from 'react';
import {Text, View, Image, Dimensions, Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import 'moment-timezone';

import ResetStyle from '@style/ResetStyle';
import MainStyle from '@style/MainStyle';
import {server} from '@context/server';

import BottomModal from '@factory/modal/BottomModal';
import OnGoing from './MainTab/OnGoing';
import Completed from './MainTab/Completed';
import Expired from './MainTab/Expired';

const Tab = createMaterialTopTabNavigator();

const Main = ({navigation}) => {
  const {t} = useTranslation();

  const [currentTnc, setCurrentTnc] = useState(0);

  //Kyc 72시간 경고 모달
  const [modalVisible, setModalVisible] = useState(false);

  const {user, tncInfo} = useSelector(({auth, tnc}) => ({
    user: auth.user,
    tncInfo: tnc.tncInfo,
  }));

  useEffect(() => {
    if (tncInfo && tncInfo?.balance) {
      setCurrentTnc(tncInfo.balance.split('.')[0]);
    }
  }, [tncInfo]);

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
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
                await AsyncStorage.removeItem('deviceKey');
                console.log('>>> LOGOUT <<<');
              } catch (e) {}
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
              {t('mainLogo')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 5,
              paddingVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
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
              navigation.navigate('ProfileMain');
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: '18%',
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
                {user.userLevel}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WalletMain');
            }}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: '22%',
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
              Platform.OS === 'android'
                ? 50
                : Dimensions.get('window').height < 750
                ? 50
                : 80,
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
        <Tab.Screen name={t('main7')} component={OnGoing} />
        <Tab.Screen name={t('main8')} component={Completed} />
        <Tab.Screen name={t('main9')} component={Expired} />
      </Tab.Navigator>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('main10')}
      />
    </View>
  );
};

export default Main;
