import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import MainStyle from '../../../style/MainStyle.js';
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
export default class ProfileMainDrawer extends Component {
  render() {
    return (
      <SafeAreaView style={MainStyle.mainFlatlistView}>
        <View
          style={{
            backgroundColor: '#f9f9f9',
            // marginTop: StatusBar.currentHeight || 0,
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: '#f9f9f9',
              paddingTop: Platform.OS === 'ios' ? '15%' : '5%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '5%',
              paddingTop: '4%',
              //   paddingBottom: '10%',
            }}>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
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
                console.log(this.props.navigation.openDrawer);
                // console.log(this.props.route.params?.openDrawer);
                // this.props.navigation.openDrawer();
                this.props.route.params?.openDrawer;
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/menu_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#2d91ff',
              padding: 20,
              paddingTop: 25,
              paddingBottom: 25,
            }}>
            <Text
              style={[
                ResetStyle.fontRegularE,
                ResetStyle.fontWhite,
                {fontWeight: '700'},
                {textAlign: 'left'},
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
          <ScrollView style={{padding: '5%', marginTop: 12}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <Text style={[ResetStyle.fontMediumE, {fontWeight: '400'}]}>
                KYC LEVEL
              </Text>
              <TouchableOpacity
                style={[
                  ResetStyle.buttonSmall,
                  {width: '20%', padding: 0, paddingTop: 3},
                ]}
                onPress={() => {
                  this.props.navigation.navigate('ProfileAll');
                }}>
                <Text
                  style={[
                    // ResetStyle.fontMediumE,
                    ResetStyle.buttonTexts,
                    ResetStyle.fontRegularE,
                    {fontWeight: '500'},
                  ]}>
                  ALL
                </Text>
              </TouchableOpacity>
            </View>
            {kycArr.map((data, index) => {
              return (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}
                    key={index}
                    onPress={() => {
                      data.status === true
                        ? this.props.navigation.navigate(
                            'ProfileCompleteDetail',
                          )
                        : // : this.props.navigation.navigate(
                          //     'ProfileIncompleteDetail',
                          //   );
                          this.props.navigation.navigate('ProfileComplete');
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontLightE,
                        data.status === true || kycArr[index + 1].status == true
                          ? ResetStyle.fontBlack
                          : ResetStyle.fontG,
                        {fontWeight: '500', paddingLeft: 10, marginBottom: 20},
                      ]}>
                      KYC LEVEL {data.level}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingRight: 10,
                      }}>
                      <Text
                        style={[
                          ResetStyle.fontLightE,
                          data.status === true ||
                          kycArr[index + 1].status == true
                            ? ResetStyle.fontBlack
                            : ResetStyle.fontG,
                          {fontWeight: '500', paddingRight: 10},
                        ]}>
                        {data.status == true ? `완료` : `시작`}
                      </Text>
                      <Image
                        source={
                          data.status == true
                            ? require('../../../imgs/drawable-hdpi/icon_s_check_on.png')
                            : require('../../../imgs/drawable-hdpi/icon_s_check_off.png')
                        }
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomColor: '#dedede',
                      borderBottomWidth: 1.5,
                    }}></View>
                </>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
