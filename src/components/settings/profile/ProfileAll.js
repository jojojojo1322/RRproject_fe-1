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

const kycArr = [
  {
    나이: '25',
    성별: 'female',
    결혼유무: 'single',
    국적: 'Korea',
    거주국가: 'Korea',
    거주도시: 'Seoul',
    언어: 'korean',
  },
  {
    현고용상태: '정규직',
    연소득: '5천만원 이하',
    소유부동산: '보유하고 있지 않음',
    총자산: '5천만원 이하',
    투자분야: '답변안함',
  },
];
export default class ProfileAll extends Component {
  render() {
    return (
      <SafeAreaView style={MainStyle.mainFlatlistView}>
        <View
          style={{
            backgroundColor: '#f9f9f9',
            // marginTop: StatusBar.currentHeight || 0,
            flex: 1,
          }}>
          <ScrollView style={{padding: '5%', marginTop: 12}}>
            {kycArr.map((data, index) => {
              let Arr = [];
              let i = 0;
              for (d in data) {
                ++i;
                console.log('asdasd', i == Object.keys(data).length);
                // console.log('a', Object.keys(d).length);
                Arr.push(
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      borderBottomColor: '#dedede',
                      borderBottomWidth: i != Object.keys(data).length ? 1 : 0,
                      width: '100%',
                      paddingTop: 15,
                      paddingBottom: 15,
                    }}>
                    <Text
                      style={[
                        ResetStyle.fontRegularK,
                        ResetStyle.fontB,
                        {width: '30%', textAlign: 'left'},
                      ]}>
                      {d}
                    </Text>
                    <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                      {data[d]}
                    </Text>
                  </View>,
                );
              }
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 30,
                      marginTop: 50,
                    }}>
                    <Text
                      style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                      KYC LEVEL {index + 1}
                    </Text>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                        // source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_completed_icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {Arr}
                  <View
                    style={{
                      width: '100%',
                      marginTop: 30,
                      borderWidth: 1,
                      borderColor: '#dedede',
                    }}></View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
