import React, {Component, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {ProgressCircle} from 'react-native-svg-charts';
import ResetStyle from '../../style/ResetStyle.js';
import MainStyle from '../../style/MainStyle.js';

import email from 'react-native-email';
import {useTranslation} from 'react-i18next';

function handleEmail(status) {
  const to = ['rrmaster@gmail.com']; // string or array of email addresses
  email(to, {
    // Optional additional arguments
    // cc: ['bazzy@moo.com', 'doooo@daaa.com'],
    // string or array of email addresses
    // bcc: 'mee@mee.com',
    // string or array of email addresses
    subject: 'Real Research Support',
    // body: t('customDrawerContentMail'),
  }).catch(console.error);
}

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const {t, i18n} = useTranslation();
  const [alertData, setAlertData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [total, setTotal] = useState(0);

  const [alertDataNot, setAlertDataNot] = useState(0);
  const [kycLevel, setKycLevel] = useState(0);

  const [loginStatus, setLoginStatus] = useState(props.login);
  const [email, setEmail] = useState('');

  console.log('커스텀 propspropspropsprops', props);

  const emailAsyncSet = async () => {
    setEmail(await AsyncStorage.getItem('email'));
  };

  // useEffect(() => {
  //   alertDataApi();
  //   emailAsyncSet();
  // }, []);

  useEffect(() => {
    alertDataApi();
    emailAsyncSet();
    getWalletApi();
    userApi();
  }, [props.login]);

  console.log('CUSTON>>>>', props.login);
  // alert API
  const alertDataApi = async () => {
    await axios
      .get(`${server}/noti/${await AsyncStorage.getItem('userNo')}`)
      .then((response) => {
        console.log('notiGetTHEN', response.data);
        setAlertData(response.data);
        setAlertDataNot(response.data.filter((data) => data.status == false));
        // var arr = response.data.filter((data) => {
        //   console.log(data.status);
        //   data.status === false;
        // });
        // setAlertDataNot(arr);
      })
      .catch((e) => {
        console.log('notiGetError', e);
      });
  };

  // alertCheck API
  const alertCheckApi = (id) => {
    console.log(`${server}/noti/${id}`);
    console.log('pre>>>>>');
    axios
      .patch(`${server}/noti/${id}`)
      .then((response) => {
        console.log('notiCheckTHEN', response.data);
        alertDataApi();
      })
      .catch((e) => {
        console.log('notiCheckError', e);
      });
  };

  // drawer User API
  const getWalletApi = async () => {
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        setWalletData(response.data);
        setTotal(Number(response.data.balance.replace(' TNC', '')));
        console.log('drawer Data>>>>>', walletData);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  // User Api
  const userApi = async () => {
    await axios
      .get(
        `${server}/user?userNo=${await AsyncStorage.getItem('userNo')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('userApi >>>>', response);
        setKycLevel(response.data.userLevel);
        // setMailId(response.data.mailId);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5%',
          paddingtop: Platform.OS === 'ios' ? '5%' : '3%',
          paddingBottom: Platform.OS === 'ios' ? '12%' : '5%',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/main_r_logo.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              ResetStyle.fontLightK,
              {
                color: '#6f6f6f',
                textDecorationStyle: 'solid',
                textDecorationColor: '#787878',
                textDecorationLine: 'underline',
              },
            ]}>
            {email}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'relative',
          right: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        {/* progress 최대 수치 1 */}
        <ProgressCircle
          style={{
            position: 'absolute',
            top: 0,
            width: Platform.OS === 'ios' ? 130 : 120,
            height: Platform.OS === 'ios' ? 135 : 120,
            backgroundColor: '#FFF',
            borderRadius: 60,
          }}
          progress={kycLevel * 0.04347826}
          progressColor={'#0080ff'}
          strokeWidth={3}
        />

        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 35 : 30,
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: '#0080ff',
            paddingBottom: 5,
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontB,
              {fontWeight: '500', marginRight: 5},
            ]}>
            {t('customDrawerContent1')}
          </Text>
        </View>

        <Text
          style={[
            ResetStyle.fontBoldE,
            ResetStyle.fontB,
            {
              fontSize: 40,
              marginTop: 5,
              position: 'absolute',
              top: Platform.OS === 'ios' ? 60 : 50,
            },
          ]}>
          {kycLevel}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log(props.navigation.openDrawer);
            props.navigation.navigate('ProfileMain');
            // props.navigation.openDrawer;
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Platform.OS === 'ios' ? 140 : 130,
            }}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {fontWeight: '600'},
              ]}>
              {t('customDrawerContent2')}
            </Text>
            <Image
              style={{marginLeft: 5}}
              source={require('../../imgs/drawable-xxxhdpi/menu_kyc_more_icon.png')}
            />
          </View>
        </TouchableOpacity>
        {/* </DrawerItem> */}
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#dedede',
          marginTop: Platform.OS === 'ios' ? 40 : 25,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: Platform.OS === 'ios' ? '5%' : '5%',
          marginVertical: Platform.OS === 'ios' ? '5%' : '3%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontB]}>
            {total}
          </Text>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontB,
              {fontWeight: '500', marginLeft: 5, paddingBottom: 2},
            ]}>
            {t('customDrawerContent3')}
          </Text>
        </View>
        <TouchableOpacity
          style={{width: '35%', backgroundColor: '#2d91ff', borderRadius: 50}}
          onPress={() => {
            props.navigation.navigate('WalletMain');
          }}>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontWhite,
              {padding: '10%', textAlign: 'center', fontWeight: '500'},
            ]}>
            {t('customDrawerContent4')}
          </Text>
        </TouchableOpacity>
      </View>
      {/* //TopMenu */}

      {/* Menu */}
      <View style={{flexDirection: 'column', width: '100%'}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('IdVerification');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent5')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Main');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent6')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('RequestResearch');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent7')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Media');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent8')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MainAlert', {
              alertData: alertData,
              alertCheckApi: alertCheckApi,
            });
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent9')}
          </Text>
          {alertDataNot.length !== 0 && (
            <TouchableOpacity style={[MainStyle.drawerItemAlert]}>
              <Text style={[MainStyle.drawerItemAlertText]}>
                {alertDataNot.length}
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEmail} style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent10')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent11')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Main');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            {t('customDrawerContent12')}
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerItemList
        label="Research"
        itemStyle={{
          margin: 0,
          padding: 0,
        }}
        activeBackgroundColor={{
          backgroundColor: 'tranparent',
        }}
        itemsContainerStyle={{padding: 0, margin: 0}}
        labelStyle={[
          ResetStyle.fontRegularK,
          ResetStyle.fontBlack,
          {textAlign: 'left'},
        ]}
        {...props}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
