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
  FlatList,
} from 'react-native';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';
// import {FlatList} from 'react-native-gesture-handler';

const kycArr = [
  {
    employmentStatus: 'What is your current employment status?',
    annualRevenue: 'Waht is your estimated annual revenue?',
    ownProperties: 'Do you own one or more properties?',
    netWorth: 'Roughly what is your net worth?',
    investIn: 'Where do you invest your income?',
  },
];
const kycQuestion = [
  {
    category: 'employmentStatus',
    question: 'What is your current employment status?',
    answers: [
      'Employed full-time',

      'Self-employed full-time',

      'Active military',

      'Temporarily unemployed',

      'Retired',

      'Disabled / Permanently unemployed',

      'Employed part-time',

      'Self-employed part-time',

      'Inactive military / veteran',

      'Full-time homemaker / family dependent',

      'Student',

      'Prefer not to answer',
    ],
  },
  {
    category: 'annualRevenue',
    question: 'Waht is your estimated annual revenue?',
    answers: [
      'Under $50,000',

      '$50,000 - $100,000',

      '$100,000- $249,000',

      '$250,000 - $499,999',

      '$500,000 - $999,999',

      '$1 million - $4.99 million',

      '$5 million or more',

      'I don’t work / we don’t work',

      'Prefer not to answer',
    ],
  },
  {
    category: 'ownProperties',
    question: 'Do you own one or more properties?',
    answers: [
      'Yes, I own one house',

      'Yes, I own two houses or more',

      'Yes, I own multiple properties',

      'No',

      'Prefer not to answer',
    ],
  },
  {
    category: 'netWorth',
    question: 'Roughly what is your net worth?',
    answers: [
      'Under $50,000',

      '$50,000 - $100,000',

      '$100,000- $249,000',

      '$250,000 - $499,999',

      '$500,000 - $999,999',

      '$1 million - $4.99 million',

      '$5 million - $9.99 million',

      '$100 million - $249.99 million',

      '$250 million - $499.99 million',

      '$500 million - $999.99 million',

      '$1 billion or more',

      'Prefer not to answer',
    ],
  },
  {
    category: 'investIn',
    question: 'Where do you invest your income?',
    answers: [
      'Real Estate',

      'Stock Market Investment',

      'Equity Mutual Funds',

      'Cryptocurrencies',

      'Gold',

      'Savings Account (Time Deposit)',

      'Business Capital Investment',

      'Prefer not to answer',
    ],
  },
];

const ProfileCompleteLevel2 = (props) => {
  const [question, setQuestion] = useState([]);

  const getCompleteKycApi = async () => {
    await axios
      .get(`${server}/kyc/2/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion(response.data.data);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);

  const RenderItem = (item) => {
    // console.log(item.answers);
    let answerNo = 0;
    item.category === 'employmentStatus' &&
      (answerNo = question.employmentStatus);
    item.category === 'annualRevenue' && (answerNo = question.annualRevenue);
    item.category === 'ownProperties' && (answerNo = question.ownProperties);
    item.category === 'netWorth' && (answerNo = question.netWorth);
    item.category === 'investIn' && (answerNo = question.investIn);

    return (
      <View
        style={[
          ProfileStyle.kycAllLevelListItem,
          {
            borderBottomWidth: 1,
            // borderBottomWidth: i != Object.keys(data).length ? 1 : 0,
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
              {width: '90%', textAlign: 'left'},
            ]}>
            {`${item.question}${'\n'}`}
          </Text>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {marginLeft: 15, marginTop: 3, width: '90%', textAlign: 'left'},
          ]}>
          {item.answers[answerNo]}
        </Text>
      </View>
    );
  };

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
        {/* <ScrollView> */}
        {/* Level List Item */}
        {/* {question.map((data, index) => {
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
                    <View
                      style={{
                        backgroundColor: '#4696ff',
                        width: 6,
                        height: 6,
                        borderRadius: 50,
                        marginTop: 5,
                        marginRight: 5,
                        marginLeft: 5,
                      }}
                    />
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
          })} */}
        {/* </ScrollView> */}
        <View>
          <View style={[ProfileStyle.kycAllLevelTitle]}>
            <Text style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
              KYC LEVEL {props.route.params?.KycLevel}
            </Text>
          </View>
          <FlatList
            style={{height: '80%'}}
            data={kycQuestion}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
                //해당 질문
                question={item.question}
                category={item.category}
                answers={item.answers}
                //해당 질문의 단일/다중선택
                // typeName={data.typeName}
                // optionNumber={item.optionNumber}
                // kycQuestion={item.kycQuestion}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={question}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* <FlatList
            style={{maxHeight: '70%', height: '70%'}}
            data={kycQuestion[nowIndex].answers}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
                //해당 질문
                question={data.question}
                questionNumber={nowIndex}
                //해당 질문의 단일/다중선택
                // typeName={data.typeName}
                id={item.id}
                answer={item.answer}
                // optionNumber={item.optionNumber}
                // kycQuestion={item.kycQuestion}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={nowIndex}
          /> */}
        <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            navigation.navigate('ProfileIncompleteDetail', {
              KycLevel: props.route.params?.KycLevel,
            });
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            정보 수정하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCompleteLevel2;
