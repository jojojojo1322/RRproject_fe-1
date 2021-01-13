import React, {Component, useState} from 'react';
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

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5%',
          paddingBottom: Platform.OS === 'ios' ? '12%' : '8%',
        }}>
        <TouchableOpacity>
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
            tnctnctnc123@gmail.com
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
          progress={0.086}
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
            KYC LEVEL
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
          2
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
              레벨업하러 가기
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
          <Text style={[ResetStyle.fontMediumE, ResetStyle.fontB]}>0</Text>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontB,
              {fontWeight: '500', marginLeft: 5, paddingBottom: 2},
            ]}>
            TNC
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
            내지갑열기
          </Text>
        </TouchableOpacity>
      </View>
      {/* //TopMenu */}

      {/* Menu */}
      <View style={{flexDirection: 'column', width: '100%'}}>
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
            설문조사
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
            설문조사 의뢰하기
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
            미디어
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MainAlert');
          }}
          style={MainStyle.drawerItem}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.drawerItemText,
            ]}>
            알림
          </Text>
          <TouchableOpacity style={[MainStyle.drawerItemAlert]}>
            <Text style={[MainStyle.drawerItemAlertText]}>5</Text>
          </TouchableOpacity>
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
            설정
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
            초대코드
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
}
