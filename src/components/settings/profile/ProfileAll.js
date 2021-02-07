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
  FlatList,
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
const levelMap = [
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: '7'},
  {id: '8'},
  {id: '9'},
  {id: '10'},
  {id: '11'},
  {id: '12'},
  {id: '13'},
  {id: '14'},
  {id: '15'},
  {id: '16'},
  {id: '17'},
  {id: '18'},
  {id: '19'},
  {id: '20'},
  {id: '21'},
  {id: '22'},
  {id: '23'},
];
const kycQuestion2 = [
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
const ProfileAll = (props) => {
  const [question, setQuestion] = useState([]);
  const [question2, setQuestion2] = useState([]);
  const [questionDynamic, setQuestionDynamic] = useState([]);
  const [question3, setQuestion3] = useState([]);
  const [question4, setQuestion4] = useState([]);
  const [question5, setQuestion5] = useState([]);
  const [question6, setQuestion6] = useState([]);
  const [question7, setQuestion7] = useState([]);
  const [question8, setQuestion8] = useState([]);
  const [question9, setQuestion9] = useState([]);
  const [question10, setQuestion10] = useState([]);
  const [question11, setQuestion11] = useState([]);
  const [question12, setQuestion12] = useState([]);
  const [question13, setQuestion13] = useState([]);
  const [question14, setQuestion14] = useState([]);
  const [question15, setQuestion15] = useState([]);
  const [question16, setQuestion16] = useState([]);
  const [question17, setQuestion17] = useState([]);
  const [question18, setQuestion18] = useState([]);
  const [question19, setQuestion19] = useState([]);
  const [question20, setQuestion20] = useState([]);
  const [question21, setQuestion21] = useState([]);
  const [question22, setQuestion22] = useState([]);
  const [question23, setQuestion23] = useState([]);

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
    get2CompleteKycApi();
    getDynamicCompleteKycApi(3);
    getDynamicCompleteKycApi(4);
    getDynamicCompleteKycApi(5);
    getDynamicCompleteKycApi(6);
    getDynamicCompleteKycApi(7);
    getDynamicCompleteKycApi(8);
    getDynamicCompleteKycApi(9);
  }, []);

  const get2CompleteKycApi = async () => {
    await axios
      .get(`${server}/kyc/2/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion2(response.data.data);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  const getDynamicCompleteKycApi = async (KycLevel) => {
    await axios
      .get(
        `${server}/kyc/${await AsyncStorage.getItem(
          'userNo',
        )}/${KycLevel}/${await AsyncStorage.getItem('deviceLanguage')}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('getCompleteKycApi THEN>>>', response.data.data);
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
        // return AllARR;
        KycLevel == 3 && setQuestion3(AllARR);
        KycLevel == 4 && setQuestion4(AllARR);
        KycLevel == 5 && setQuestion5(AllARR);
        KycLevel == 6 && setQuestion6(AllARR);
        KycLevel == 7 && setQuestion7(AllARR);
        KycLevel == 8 && setQuestion8(AllARR);
        KycLevel == 9 && setQuestion9(AllARR);
        KycLevel == 10 && setQuestion10(AllARR);
        KycLevel == 11 && setQuestion11(AllARR);
        KycLevel == 12 && setQuestion12(AllARR);
        KycLevel == 13 && setQuestion13(AllARR);
        KycLevel == 14 && setQuestion14(AllARR);
        KycLevel == 15 && setQuestion15(AllARR);
        KycLevel == 16 && setQuestion16(AllARR);
        KycLevel == 17 && setQuestion17(AllARR);
        KycLevel == 18 && setQuestion18(AllARR);
        KycLevel == 19 && setQuestion19(AllARR);
        KycLevel == 20 && setQuestion20(AllARR);
        KycLevel == 21 && setQuestion21(AllARR);
        KycLevel == 22 && setQuestion22(AllARR);
        KycLevel == 23 && setQuestion23(AllARR);
      })
      .catch((e) => {
        console.log('getCompleteKycApi ERROR>>>', e);
      });
  };

  const RenderItem = (item) => {
    // console.log(item.answers);
    let answerNo = 0;
    item.category === 'employmentStatus' &&
      (answerNo = question2.employmentStatus);
    item.category === 'annualRevenue' && (answerNo = question2.annualRevenue);
    item.category === 'ownProperties' && (answerNo = question2.ownProperties);
    item.category === 'netWorth' && (answerNo = question2.netWorth);
    item.category === 'investIn' && (answerNo = question2.investIn);

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

  const RenderItemDynamic = (item) => {
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
            console.log('item.optionContent.length', item.optionContent.length);
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
        <View style={{flexDirection: 'row'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Level List Item */}
            {/* {Object.keys(question).map((data, index) => { */}
            {question.map((data, index) => {
              let Arr = [];
              let i = 0;
              for (const d in data) {
                ++i;

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
                      <View style={{flexDirection: 'row'}}>
                        <View style={[ProfileStyle.kycLevelCircle]} />
                        <Text
                          style={[
                            ResetStyle.fontRegularK,
                            ResetStyle.fontB,
                            {
                              width: '100%',
                              textAlign: 'left',

                              marginBottom: '3%',
                            },
                          ]}>
                          {d}
                        </Text>
                      </View>
                      <Text
                        style={[
                          ResetStyle.fontRegularK,
                          ResetStyle.fontDG,
                          {width: '100%', textAlign: 'left', marginLeft: '5%'},
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
                        {d !== 'relationShipStatus' &&
                          d !== 'gender' &&
                          data[d]}
                      </Text>
                    </View>,
                  );
                }
              }
              return (
                <View>
                  <View style={[ProfileStyle.kycAllLevelTitle]}>
                    <Text
                      style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                      KYC LEVEL 1
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Kyc', {
                          KycLevel: 1,
                          question: question,
                        });
                      }}>
                      <Image
                        style={[ProfileStyle.kycAllLevelImg]}
                        source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                        // source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_completed_icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {Arr}
                </View>
              );
            })}
            {/* level 2 start */}
            {props.route.params?.KycLevel > 2 && (
              <View>
                <View
                  style={[ProfileStyle.kycAllLevelTitle, {marginTop: '10%'}]}>
                  <Text style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                    KYC LEVEL 2
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ProfileIncompleteLevel2', {
                        KycLevel: 2,
                      });
                    }}>
                    <Image
                      style={[ProfileStyle.kycAllLevelImg]}
                      source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                      // source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_completed_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  // style={{height: '100%'}}
                  data={kycQuestion2}
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
                      // kycQuestion2={item.kycQuestion2}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  extraData={question2}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            {/* level 2 end */}
            {/* level Dynamic start */}
            {/* {props.route.params?.KycLevel > 2 && */}

            {levelMap.map((data, index) => {
              console.log(data.id);
              if (Number(data.id) <= Number(props.route.params?.KycLevel)) {
                console.log(question3);
                console.log(question4);

                return (
                  <View>
                    <View
                      style={[
                        ProfileStyle.kycAllLevelTitle,
                        {marginTop: '10%'},
                      ]}>
                      <Text
                        style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                        KYC LEVEL {data.id}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('ProfileIncompleteDetail', {
                            KycLevel: data.id,
                          });
                        }}>
                        <Image
                          style={[ProfileStyle.kycAllLevelImg]}
                          source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                          // source={require('../../../imgs/drawable-xxxhdpi/kyc_edit_completed_icon.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      style={{marginBottom: '10%'}}
                      // data={questionDynamic.length === 5 && questionDynamic}
                      data={
                        data.id == 3 && question3.length === 5
                          ? question3
                          : data.id == 4 && question3.length === 5
                          ? question4
                          : data.id == 5 && question3.length === 5
                          ? question5
                          : data.id == 6 && question3.length === 5
                          ? question6
                          : data.id == 7 && question3.length === 5
                          ? question7
                          : data.id == 8 && question3.length === 5
                          ? question8
                          : data.id == 9 && question3.length === 5
                          ? question9
                          : data.id == 10 && question3.length === 5
                          ? question10
                          : data.id == 11 && question3.length === 5
                          ? question11
                          : data.id == 12 && question3.length === 5
                          ? question12
                          : data.id == 13 && question3.length === 5
                          ? question13
                          : data.id == 14 && question3.length === 5
                          ? question14
                          : data.id == 15 && question3.length === 5
                          ? question15
                          : data.id == 16 && question3.length === 5
                          ? question16
                          : data.id == 17 && question3.length === 5
                          ? question17
                          : data.id == 18 && question3.length === 5
                          ? question18
                          : data.id == 19 && question3.length === 5
                          ? question19
                          : data.id == 20 && question3.length === 5
                          ? question20
                          : data.id == 21 && question3.length === 5
                          ? question21
                          : data.id == 22 && question3.length === 5
                          ? question22
                          : data.id == 23 && question3.length === 5
                          ? question23
                          : ''
                      }
                      renderItem={({item}) => (
                        // renderItem(questionNumber=data.questionNumber)
                        <RenderItemDynamic
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
                      extraData={questionDynamic}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                );
              } else {
                return false;
              }
            })}
            {/* {[...Array(props.route.params?.KycLevel - 2)].map((n, index) => {
              console.log(
                'props.route.params?.KycLevel',
                props.route.params?.KycLevel,
              );

              // getDynamicCompleteKycApi();
              // i++;
              return (
                <View>
                  <View style={[ProfileStyle.kycAllLevelTitle]}>
                    <Text
                      style={[ResetStyle.fontRegularE, {fontWeight: '500'}]}>
                      KYC LEVEL {props.route.params?.KycLevel}
                    </Text>
                  </View>
                  <FlatList
                    style={{height: '100%'}}
                    data={questionDynamic.length === 5 && questionDynamic}
                    renderItem={({item}) => (
                      // renderItem(questionNumber=data.questionNumber)
                      <RenderItemDynamic
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
                    extraData={questionDynamic}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              );
            })} */}

            {/* level Dynamic end */}
          </ScrollView>
        </View>
        {/* <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            props.navigation.navigate('Kyc', {
              KycLevel: props.route.params?.KycLevel,
              question: question,
            });
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            정보 수정하기
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileAll;
