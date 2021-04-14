import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import axios from 'axios';
import {server} from '@context/server';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {ProgressCircle} from 'react-native-svg-charts';
import ResetStyle from '@style/ResetStyle.js';
import MainStyle from '@style/MainStyle.js';

import email from 'react-native-email';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const CustomDrawerContent = (props) => {
  const {t} = useTranslation();
  const navigation = props.navigation;
  const [alertData, setAlertData] = useState([]);
  const [idData, setIdData] = useState(-99);
  const [total, setTotal] = useState(0);

  const [alertDataNot, setAlertDataNot] = useState(0);
  const [kycLevel, setKycLevel] = useState(0);

  const [_email, set_Email] = useState('');

  const {user, tncInfo} = useSelector(({auth, tnc}) => ({
    user: auth.user,
    tncInfo: tnc.tncInfo,
  }));

  const handleEmail = () => {
    const to = ['rrmaster@gmail.com']; // string or array of email addresses
    email(to, {
      subject: 'Real Research Support',
      body: t('customDrawerContentMail'),
    }).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (user) {
      set_Email(user.mailId);
      setKycLevel(user.userLevel);
    }
  }, [user]);

  useEffect(() => {
    if (tncInfo && tncInfo.balance) {
      setTotal(Number(tncInfo.balance.toString().replace(' TNC', '')));
    }
  }, [tncInfo]);

  useEffect(() => {
    alertDataApi();
  }, []);

  useEffect(() => {
    if (idData != -99) {
      if (idData == 0) {
        navigation.navigate('IdVerification');
      } else if (idData == 1) {
        navigation.navigate('IdVerificationInProgress');
      } else if (idData == 2) {
        navigation.navigate('IdVerificationComplete');
      } else if (idData == 3) {
        navigation.navigate('IdVerificationDecline');
      } else if (idData !== -99) {
        navigation.navigate('IdVerification');
      }
      setIdData(-99);
    }
  }, [idData]);

  const passportApi = async () => {
    await axios
      .get(`${server}/util/passport/status?userNo=${user.userNo}`)
      .then((response) => {
        console.log(response.data);
        setIdData(response.data.passPortStatus);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const alertDataApi = async () => {
    await axios
      .get(`${server}/noti/${user.userNo}`)
      .then((response) => {
        setAlertData(response.data);
        setAlertDataNot(response.data.filter((data) => data.status == false));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // alertCheck API
  const alertCheckApi = (id) => {
    axios
      .patch(`${server}/noti/${id}`)
      .then((response) => {
        alertDataApi();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <DrawerContentScrollView {...props} bounces={false}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5%',
          paddingHorizontal: Platform.OS === 'ios' ? '7%' : '5%',
          paddingtop: Platform.OS === 'ios' ? '5%' : '3%',
          paddingBottom: Platform.OS === 'ios' ? '12%' : '5%',
        }}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 25 : 20,
                height: Platform.OS === 'ios' ? 25 : 20,
                resizeMode: 'contain',
              }}
              source={require('@images/rrLogoB.png')}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity> */}
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
          {_email}
        </Text>
        {/* </TouchableOpacity> */}
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
        <TouchableOpacity onPress={() => navigation.navigate('ProfileMain')}>
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
                {fontWeight: '600', paddingTop: '0.8%'},
              ]}>
              {t('customDrawerContent2')}
            </Text>
            <Image
              style={{
                marginLeft: 5,
                width: Platform.OS === 'ios' ? 25 : 20,
                height: Platform.OS === 'ios' ? 25 : 20,
                resizeMode: 'contain',
              }}
              source={require('@images/menuKycMoreIcon.png')}
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
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: Platform.OS === 'ios' ? '7%' : '5%',
          marginVertical: Platform.OS === 'ios' ? '5%' : '3%',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'flex-end'}}
          onPress={() => {
            navigation.navigate('WalletMain', {
              currentTnc: total,
            });
          }}>
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
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '35%', backgroundColor: '#2d91ff', borderRadius: 50}}
          onPress={() =>
            navigation.navigate('WalletMain', {
              currentTnc: total,
            })
          }>
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
        {/* IdVerification */}
        <TouchableOpacity
          onPress={() => passportApi()}
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

        {/* Main */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Main', {
              check: 'aaa',
            })
          }
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

        {/* RequestResearch */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestResearch')}
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

        {/* Media */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Media');
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

        {/* MainAlert */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainAlert', {
              alertData: alertData,
              alertCheckApi: alertCheckApi,
            })
          }
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

        {/* Email form */}
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

        {/* Settings */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
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

        {/* Invitaion code */}
        <TouchableOpacity
          onPress={() => navigation.navigate('KycLevel1Box')}
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
