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
import ProfileStyle from '../../../style/ProfileStyle.js';

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
      <SafeAreaView style={[ResetStyle.container]}>
        <View style={[ResetStyle.containerInner]}>
          {/* topBackButton */}
          <View style={ResetStyle.topBackButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}></Text>
          </View>

          {/* Level List */}
          <ScrollView>
            {/* Level List Item */}
            {kycArr.map((data, index) => {
              let Arr = [];
              let i = 0;
              for (d in data) {
                ++i;
                console.log('asdasd', i == Object.keys(data).length);
                // console.log('a', Object.keys(d).length);
                Arr.push(
                  <View
                    style={[
                      ProfileStyle.kycAllLevelListItem,
                      {
                        borderBottomWidth:
                          i != Object.keys(data).length ? 1 : 0,
                      },
                    ]}>
                    <Text
                      style={[
                        ResetStyle.fontRegularK,
                        ResetStyle.fontB,
                        {width: '30%', textAlign: 'left', fontWeight: '500'},
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
                  <View style={[ProfileStyle.kycAllLevelTitle]}>
                    <Text
                      style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                      KYC LEVEL {index + 1}
                    </Text>
                    <TouchableOpacity>
                      <Image
                        style={[ProfileStyle.kycAllLevelImg]}
                        source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                        // source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_completed_icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {Arr}
                  <View style={[ProfileStyle.kycAllBorder]} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
