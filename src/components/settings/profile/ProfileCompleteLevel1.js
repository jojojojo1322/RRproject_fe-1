import React, {Component, useState, useEffect} from 'react';

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
];
const ProfileCompleteLevel1 = (props) => {
  const [question, setQuestion] = useState([]);
  const getCompleteKycApi = async () => {
    await axios
      .get(`${server}/kyc/1/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion([response.data.data]);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={[ResetStyle.containerInner]}>
        {/* topBackButton */}
        <View style={ResetStyle.topBackButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
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
          {/* {Object.keys(question).map((data, index) => { */}
          {question.map((data, index) => {
            let Arr = [];
            let i = 0;
            for (const d in data) {
              ++i;
              console.log('asdasd', i == Object.keys(data).length);
              // console.log('a', Object.keys(d).length);
              if (d !== 'userNo') {
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
                        {width: '100%', textAlign: 'left', marginBottom: '3%'},
                      ]}>
                      {d}
                    </Text>
                    <Text
                      style={[
                        ResetStyle.fontRegularK,
                        ResetStyle.fontDG,
                        {width: '100%', textAlign: 'left'},
                      ]}>
                      {d === 'gender' && data[d] === '1' && '남자'}
                      {d === 'gender' && data[d] === '0' && '여자'}
                      {d === 'relationShipStatus' &&
                        data[d] === '0' &&
                        'Single'}
                      {d === 'relationShipStatus' &&
                        data[d] === '1' &&
                        'Domestic Partnership'}
                      {d === 'relationShipStatus' &&
                        data[d] === '2' &&
                        'Married'}
                      {d === 'relationShipStatus' &&
                        data[d] === '3' &&
                        'Divorced'}
                      {d !== 'relationShipStatus' && d !== 'gender' && data[d]}
                    </Text>
                  </View>,
                );
              }
            }
            return (
              <View>
                <View style={[ProfileStyle.kycAllLevelTitle]}>
                  <Text style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                    KYC LEVEL {props.route.params?.KycLevel}
                  </Text>
                </View>
                {Arr}
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            props.navigation.navigate('Kyc');
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            정보 수정하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCompleteLevel1;
