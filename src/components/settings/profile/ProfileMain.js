import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {CustomDrawerContent} from '../../defined/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const kycArr = [
  {
    id: 23,
    level: 23,
    status: null,
  },
  {
    id: 22,
    level: 22,
    status: null,
  },
  {
    id: 21,
    level: 21,
    status: null,
  },
  {
    id: 20,
    level: 20,
    status: null,
  },
  {
    id: 19,
    level: 19,
    status: null,
  },
  {
    id: 18,
    level: 18,
    status: null,
  },
  {
    id: 17,
    level: 17,
    status: null,
  },
  {
    id: 16,
    level: 16,
    status: null,
  },
  {
    id: 15,
    level: 15,
    status: null,
  },
  {
    id: 14,
    level: 14,
    status: null,
  },
  {
    id: 13,
    level: 13,
    status: null,
  },
  {
    id: 12,
    level: 12,
    status: null,
  },
  {
    id: 11,
    level: 11,
    status: null,
  },
  {
    id: 10,
    level: 10,
    status: null,
  },
  {
    id: 9,
    level: 9,
    status: null,
  },
  {
    id: 8,
    level: 8,
    status: null,
  },
  {
    id: 7,
    level: 7,
    status: null,
  },
  {
    id: 6,
    level: 6,
    status: null,
  },
  {
    id: 5,
    level: 5,
    status: null,
  },
  {
    id: 4,
    level: 4,
    status: null,
  },
  {
    id: 3,
    level: 3,
    status: null,
  },
  {
    id: 2,
    level: 2,
    status: true,
  },
  {
    id: 1,
    level: 1,
    status: true,
  },
];

export const ProfileMain = ({navigation}) => {
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={[PersonalStyle.kycContainerInner]}>
        {/* Top */}
        <View style={[PersonalStyle.topView]}>
          <TouchableOpacity>
            <View style={[PersonalStyle.topLogoTouchView]}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/main_r_logo.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {marginLeft: 10},
                ]}>
                Real Research
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
        <View style={[PersonalStyle.personalBackground]}>
          <Text
            style={[
              ResetStyle.fontRegularE,
              ResetStyle.fontWhite,
              {fontWeight: '700', textAlign: 'left'},
            ]}>
            LEVEL 2
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularE,
              ResetStyle.fontWhite,
              {textAlign: 'left'},
            ]}>
            tnctnctnc123@gmail.com
          </Text>
        </View>

        {/* KYC Level title & all */}
        <View style={[PersonalStyle.kycLevelTitleView]}>
          <Text
            style={[
              ResetStyle.fontMediumE,
              {fontWeight: '300', letterSpacing: 0.5},
            ]}>
            KYC LEVEL
          </Text>
          <TouchableOpacity
            style={[ResetStyle.buttonSmall, PersonalStyle.kycLevelAll]}
            onPress={() => {
              navigation.navigate('ProfileAll');
            }}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontWhite,
                {fontWeight: '500'},
              ]}>
              ALL
            </Text>
          </TouchableOpacity>
        </View>

        {/* KYC Level list */}
        <ScrollView style={[PersonalStyle.kycScrollView]}>
          {kycArr.map((data, index) => {
            return (
              <>
                <TouchableOpacity
                  style={[PersonalStyle.kycTouchable]}
                  key={index}
                  onPress={() => {
                    data.status === true
                      ? navigation.navigate('ProfileCompleteDetail')
                      : navigation.navigate('ProfileIncompleteDetail');
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightE,
                      data.status === true || kycArr[index + 1].status == true
                        ? ResetStyle.fontBlack
                        : ResetStyle.fontG,
                      PersonalStyle.kycLevelText,
                    ]}>
                    KYC LEVEL {data.level}
                  </Text>
                  <View style={[PersonalStyle.kycLevelCheckboxView]}>
                    <Text
                      style={[
                        ResetStyle.fontLightE,
                        data.status === true || kycArr[index + 1].status == true
                          ? ResetStyle.fontBlack
                          : ResetStyle.fontG,
                        PersonalStyle.kycLevelText2,
                      ]}>
                      {data.status == true ? `완료` : `시작`}
                    </Text>
                    <Image
                      style={[PersonalStyle.kycLevelCheckboxImg]}
                      source={
                        data.status == true
                          ? require('../../../imgs/drawable-xxxhdpi/icon_b_check_2_off_s.png')
                          : require('../../../imgs/drawable-xxxhdpi/icon_w_check_2_off_s.png')
                      }
                    />
                  </View>
                </TouchableOpacity>
                <View style={[PersonalStyle.kycLevelborder]} />
              </>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileMain;
