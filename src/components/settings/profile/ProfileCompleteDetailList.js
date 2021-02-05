import React, {Component, useEffect, useState} from 'react';

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

const ProfileCompleteDetail = (props) => {
  const [question, setQuestion] = useState([]);
  const [question1, setQuestion1] = useState([]);
  const [question2, setQuestion2] = useState([]);
  const [question3, setQuestion3] = useState([]);
  const [question4, setQuestion4] = useState([]);
  const [question5, setQuestion5] = useState([]);
  const getCompleteKycApi = async () => {
    await axios
      .get(
        `${server}/kyc/${await AsyncStorage.getItem('userNo')}/${
          props.route.params?.KycLevel
        }/${await AsyncStorage.getItem('deviceLanguage')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion(response.data.data);
        setQuestion1(
          response.data.data.filter((data) => data.kycQuestion === '1'),
        );
        setQuestion2(
          response.data.data.filter((data) => data.kycQuestion === '2'),
        );
        setQuestion3(
          response.data.data.filter((data) => data.kycQuestion === '3'),
        );
        setQuestion4(
          response.data.data.filter((data) => data.kycQuestion === '4'),
        );
        setQuestion5(
          response.data.data.filter((data) => data.kycQuestion === '5'),
        );
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);
  const renderItem = () => {};
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
          {question.map((data, index) => {
            let Arr = [];
            let i = 0;
            for (d in data) {
              ++i;
              // console.log('a', Object.keys(d).length);
              Arr.push(
                <View
                  style={[
                    ProfileStyle.kycAllLevelListItem,
                    {
                      borderBottomWidth: i != Object.keys(data).length ? 1 : 0,
                      alignItems: 'flex-start',
                    },
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[ProfileStyle.kycLevelCircle]} />
                    <Text
                      style={[
                        ResetStyle.fontRegularK,
                        ResetStyle.fontB,
                        // {width: '30%', textAlign: 'left'},
                      ]}>
                      {data}
                    </Text>
                  </View>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 15, marginTop: 3},
                    ]}>
                    {data[d]}
                  </Text>
                </View>,
              );
            }
            return (
              <View>
                <View style={[ProfileStyle.kycAllLevelTitle]}>
                  <Text style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                    KYC LEVEL {index + 1}
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

export default ProfileCompleteDetail;
