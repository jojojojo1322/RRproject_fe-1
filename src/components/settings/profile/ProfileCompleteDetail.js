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
        console.log('getCompleteKycApi THEN>>>', response.data.data);
        setQuestion(response.data.data);
        let ARR1 = response.data.data.filter(
          (data) => data.kycQuestion === '1',
        );
        let ARR2 = response.data.data.filter(
          (data) => data.kycQuestion === '2',
        );
        let ARR3 = response.data.data.filter(
          (data) => data.kycQuestion === '3',
        );
        let ARR4 = response.data.data.filter(
          (data) => data.kycQuestion === '4',
        );
        let ARR5 = response.data.data.filter(
          (data) => data.kycQuestion === '5',
        );
        console.log('ARR1', ARR1);
        console.log('ARR2', ARR2);
        console.log('ARR3', ARR3);
        console.log('ARR4', ARR4);
        console.log('ARR5', ARR5);
        let FixArr1 = {
          kycQuestion: [],
          kycOption: [],
          questionContent: [],
          optionContent: [],
        };

        let FixArr2 = {
          kycQuestion: [],
          kycOption: [],
          questionContent: [],
          optionContent: [],
        };

        let FixArr3 = {
          kycQuestion: [],
          kycOption: [],
          questionContent: [],
          optionContent: [],
        };

        let FixArr4 = {
          kycQuestion: [],
          kycOption: [],
          questionContent: [],
          optionContent: [],
        };
        let FixArr5 = {
          kycQuestion: [],
          kycOption: [],
          questionContent: [],
          optionContent: [],
        };

        ARR1.map((data) => {
          if (FixArr1.questionContent == '') {
            FixArr1.questionContent.push(data.questionContent);
            FixArr1.kycQuestion.push(data.kycQuestion);
          }
          FixArr1.optionContent.push(data.optionContent);
          FixArr1.kycOption.push(data.kycOption);
        });
        ARR2.map((data) => {
          if (FixArr2.questionContent == '') {
            FixArr2.questionContent.push(data.questionContent);
            FixArr2.kycQuestion.push(data.kycQuestion);
          }
          FixArr2.optionContent.push(data.optionContent);
          FixArr2.kycOption.push(data.kycOption);
        });
        ARR3.map((data) => {
          if (FixArr3.questionContent == '') {
            FixArr3.questionContent.push(data.questionContent);
            FixArr3.kycQuestion.push(data.kycQuestion);
          }
          FixArr3.optionContent.push(data.optionContent);
          FixArr3.kycOption.push(data.kycOption);
        });
        ARR4.map((data) => {
          if (FixArr4.questionContent == '') {
            FixArr4.questionContent.push(data.questionContent);
            FixArr4.kycQuestion.push(data.kycQuestion);
          }
          FixArr4.optionContent.push(data.optionContent);
          FixArr4.kycOption.push(data.kycOption);
        });
        ARR5.map((data) => {
          if (FixArr5.questionContent == '') {
            FixArr5.questionContent.push(data.questionContent);
            FixArr5.kycQuestion.push(data.kycQuestion);
          }
          FixArr5.optionContent.push(data.optionContent);
          FixArr5.kycOption.push(data.kycOption);
        });

        let AllARR = [];
        AllARR.push(FixArr1, FixArr2, FixArr3, FixArr4, FixArr5);

        setQuestion(AllARR);
      })
      .catch((e) => {
        console.log('getCompleteKycApi ERROR>>>', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);

  const RenderItem = (item) => {
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
              {width: '90%', textAlign: 'left'},
            ]}>
            {`${item.questionContent}${'\n'}`}
          </Text>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {marginLeft: 15, marginTop: 3, width: '90%', textAlign: 'left'},
          ]}>
          {Object.keys(item.optionContent).map((data) => {
            if (Number(data) + 1 == item.optionContent.length) {
              return `${Number(data) + 1}. ${item.optionContent[data]}`;
            }
            return `${Number(data) + 1}. ${item.optionContent[data]} ${'\n'}`;
          })}
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
            data={question}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
                //해당 질문
                kycQuestion={item.kycQuestion}
                questionContent={item.questionContent}
                kycOption={item.kycOption}
                optionContent={item.optionContent}
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
            props.navigation.navigate('ProfileIncompleteDetail', {
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

export default ProfileCompleteDetail;
