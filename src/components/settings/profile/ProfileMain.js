import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
} from 'react-native';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FlatList} from 'react-native-gesture-handler';
import BottomModal from '../../factory/modal/BottomModal';
import TextConfirmCancelModal from '../../factory/modal/TextConfirmCancelModal';

import {useTranslation} from 'react-i18next';
// import {CustomDrawerContent} from '../../defined/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const ProfileMain = ({navigation}) => {
  const DATA = [
    {level: 1},
    {level: 2},
    {level: 3},
    {level: 4},
    {level: 5},
    {level: 6},
    {level: 7},
    {level: 8},
    {level: 9},
    {level: 10},
    {level: 11},
    {level: 12},
    {level: 13},
    {level: 14},
    {level: 15},
    {level: 16},
    {level: 17},
    {level: 18},
    {level: 19},
    {level: 20},
    {level: 21},
    {level: 22},
    {level: 23},
  ];
  const [mailId, setMailId] = useState('');
  const [kycLevel, setKycLevel] = useState(0);
  const [kycLevelNumber, setKycLevelNumber] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const {t, i18n} = useTranslation();

  const userApi = async () => {
    await axios
      .get(
        `${server}/user?userNo=${await AsyncStorage.getItem('userNo')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('userApi >>>>', response);
        setKycLevel(response.data.userLevel);
        setKycLevelNumber(parseInt(response.data.userLevel));
        setMailId(response.data.mailId);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  const Item = ({status, level, index, kycLevel}) => {
    return (
      <TouchableOpacity
        style={[
          ProfileStyle.kycTouchable,
          {borderBottomWidth: 0.8, borderColor: '#dedede'},
        ]}
        key={index}
        onPress={() => {
          // 이미 완료한 kyc - 수정 로직
          if (Number(level) <= Number(kycLevel)) {
            if (Number(level) === 1) {
              navigation.navigate('ProfileCompleteLevel1', {
                KycLevel: level,
              });
            } else if (Number(level) === 2) {
              navigation.navigate('ProfileCompleteLevel2', {
                KycLevel: level,
              });
            } else {
              navigation.navigate('ProfileCompleteDetail', {
                KycLevel: level,
              });
            }
            // 현재 해야할 kyc 정상적인 클릭 (LEVEL 2 분기)
          } else if (Number(level) === Number(kycLevel) + 1) {
            // level 2 분기
            if (Number(level) === 2) {
              navigation.navigate('ProfileIncompleteLevel2', {
                KycLevel: level,
              });
            } else {
              navigation.navigate('ProfileIncompleteDetail', {
                KycLevel: level,
              });
            }
            // 아직 달성되지 않은 kyc레벨 선택시
          } else {
            setModalVisible(!modalVisible);
          }
        }}>
        <Text
          style={[
            ResetStyle.fontLightE,
            Number(level) <= Number(kycLevel) + 1
              ? ResetStyle.fontBlack
              : ResetStyle.fontG,
            ProfileStyle.kycLevelText,
          ]}>
          {t('profileMain1')}
          {level}
        </Text>
        <View style={[ProfileStyle.kycLevelCheckboxView]}>
          <Text
            style={[
              ResetStyle.fontLightE,
              // status === true || DATA[index + 1].status == true
              Number(level) <= Number(kycLevel) + 1
                ? ResetStyle.fontBlack
                : ResetStyle.fontG,
              ProfileStyle.kycLevelText2,
            ]}>
            {level <= kycLevel ? t('profileMain2') : t('profileMain3')}
          </Text>
          <Image
            style={[ProfileStyle.kycLevelCheckboxImg]}
            source={
              level <= kycLevel
                ? require('../../../imgs/drawable-xxxhdpi/icon_b_check_2_off_s.png')
                : require('../../../imgs/drawable-xxxhdpi/icon_w_check_2_off_s.png')
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleBackButtonClick = () => {
    navigation.replace('Main');
    return true;
  };
  useEffect(() => {
    console.log('실행');
    userApi();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  });

  useEffect(() => {
    console.log('[]실행');
    userApi();
  }, []);

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={[ProfileStyle.kycContainerInner]}>
        {/* Top */}
        <View style={[ProfileStyle.topView]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main');
            }}>
            <View style={[ProfileStyle.topLogoTouchView]}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/main_r_logo.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {marginLeft: 10},
                ]}>
                {t('profileMain4')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <Image
              style={[ResetStyle.topHamburgerImg]}
              source={require('../../../imgs/drawable-xxxhdpi/menu_2_icon.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Personal Level & email */}
        <View style={[ProfileStyle.personalBackground]}>
          <Text
            style={[
              ResetStyle.fontRegularE,
              ResetStyle.fontWhite,
              {fontWeight: '700', textAlign: 'left'},
            ]}>
            {t('profileMain5')}
            {kycLevel}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularE,
              ResetStyle.fontWhite,
              {textAlign: 'left'},
            ]}>
            {mailId}
          </Text>
        </View>

        {/* KYC Level title & all */}
        <View style={[ProfileStyle.kycLevelTitleView]}>
          <Text
            style={[
              ResetStyle.fontMediumE,
              {fontWeight: '300', letterSpacing: 0.5},
            ]}>
            {t('profileMain6')}
          </Text>
          <TouchableOpacity
            style={[ResetStyle.buttonSmall, ProfileStyle.kycLevelAll]}
            onPress={() => {
              navigation.navigate('ProfileAll', {
                KycLevel: kycLevel,
              });
            }}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontWhite,
                {fontWeight: '500'},
              ]}>
              {t('profileMain7')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginHorizontal: '5%'}}
          data={DATA}
          renderItem={({item}) => (
            <Item status={item.status} level={item.level} kycLevel={kycLevel} />
          )}
          keyExtractor={(item) => item.id}
          inverted={true}
        />
        <BottomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // text={`KYC LEVEL ${Number(kycLevel) + 1}을 먼저 완료해주세요.`}
          text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileMain;

// KYC ''LEVEL을 먼저 완료해주세요
