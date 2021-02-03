import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';
import AuthStyle from '../../../style/AuthStyle.js';
import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileIncompleteLevel2 = (props) => {
  const QusetionData = [
    {
      question: 'Waht is your estimated annual revenue?',
      answers: [
        {
          id: 0,
          answer: 'Under $50,000',
        },
        {
          id: 1,
          answer: '$50,000 - $100,000',
        },
        {
          id: 2,
          answer: '$100,000- $249,000',
        },
        {
          id: 3,
          answer: '$250,000 - $499,999',
        },
        {
          id: 4,
          answer: '$500,000 - $999,999',
        },
        {
          id: 5,
          answer: '$1 million - $4.99 million',
        },
        {
          id: 6,
          answer: '$5 million or more',
        },
        {
          id: 7,
          answer: 'I don’t work / we don’t work',
        },
        {
          id: 8,
          answer: 'Prefer not to answer',
        },
      ],
    },
    {
      question: 'What is your current employment status?',
      answers: [
        {
          id: 0,
          answer: 'Employed full-time',
        },
        {
          id: 1,
          answer: 'Self-employed full-time',
        },
        {
          id: 2,
          answer: 'Active military',
        },
        {
          id: 3,
          answer: 'Temporarily unemployed',
        },
        {
          id: 4,
          answer: 'Retired',
        },
        {
          id: 5,
          answer: 'Disabled / Permanently unemployed',
        },
        {
          id: 6,
          answer: 'Employed part-time',
        },
        {
          id: 7,
          answer: 'Self-employed part-time',
        },
        {
          id: 8,
          answer: 'Inactive military / veteran',
        },
        {
          id: 9,
          answer: 'Full-time homemaker / family dependent',
        },
        {
          id: 10,
          answer: 'Student',
        },
        {
          id: 11,
          answer: 'Prefer not to answer',
        },
      ],
    },
    {
      question: 'Where do you invest your income?',
      answers: [
        {
          id: 0,
          answer: 'Real Estate',
        },
        {
          id: 1,
          answer: 'Stock Market Investment',
        },
        {
          id: 2,
          answer: 'Equity Mutual Funds',
        },
        {
          id: 3,
          answer: 'Cryptocurrencies',
        },
        {
          id: 4,
          answer: 'Gold',
        },
        {
          id: 5,
          answer: 'Savings Account (Time Deposit)',
        },
        {
          id: 6,
          answer: 'Business Capital Investment',
        },
        {
          id: 7,
          answer: 'Prefer not to answer',
        },
      ],
    },
    {
      question: 'Roughly what is your net worth?',
      answers: [
        {
          id: 0,
          answer: 'Under $50,000',
        },
        {
          id: 1,
          answer: '$50,000 - $100,000',
        },
        {
          id: 2,
          answer: '$100,000- $249,000',
        },
        {
          id: 3,
          answer: '$250,000 - $499,999',
        },
        {
          id: 4,
          answer: '$500,000 - $999,999',
        },
        {
          id: 5,
          answer: '$1 million - $4.99 million',
        },
        {
          id: 6,
          answer: '$5 million - $9.99 million',
        },
        {
          id: 7,
          answer: '$100 million - $249.99 million',
        },
        {
          id: 8,
          answer: '$250 million - $499.99 million',
        },
        {
          id: 9,
          answer: '$500 million - $999.99 million',
        },
        {
          id: 10,
          answer: '$1 billion or more',
        },
        {
          id: 11,
          answer: 'Prefer not to answer',
        },
      ],
    },
    {
      question: 'Do you own one or more properties?',
      answers: [
        {
          id: 0,
          answer: 'Yes, I own one house',
        },
        {
          id: 1,
          answer: 'Yes, I own two houses or more',
        },
        {
          id: 2,
          answer: 'Yes, I own multiple properties',
        },
        {
          id: 3,
          answer: 'No',
        },
        {
          id: 4,
          answer: 'Prefer not to answer',
        },
      ],
    },
  ];

  // KYC Level 2 Answers
  const [annualRevenue, setAnnualRevenue] = useState(0);
  const [employmentStatus, setEmploymentStatus] = useState(0);
  const [investIn, setInvestIn] = useState(0);
  const [netWorth, setNetWorth] = useState(0);
  const [ownProperties, setOwnProperties] = useState(0);

  // Tools for this page
  const [checkId, setCheckId] = useState('');
  const [nowIndex, setNowIndex] = useState(0);
  const [questionLength, setQuestionLength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);
  const [topCheck, setTopCheck] = useState([]);

  useEffect(() => {
    setQuestionLength(5);
    // getKycLevel2();
    console.log(QusetionData[0].answers);
  }, []);

  const getKycLevel2 = async (
    annualRevenue,
    employmentStatus,
    investIn,
    netWorth,
    ownProperties,
  ) => {
    const userNo = await AsyncStorage.getItem('userNo');
    await axios
      .post(`${server}/kyc/2/`, {
        annualRevenue: annualRevenue,
        employmentStatus: employmentStatus,
        investIn: investIn,
        netWorth: netWorth,
        ownProperties: ownProperties,
        userNo: userNo,
      })
      .then(async (response) => {
        console.log('getKycLevel2 Then>>>', response);
      })
      .catch((e) => {
        console.log('getKycLevel2 Error>>', e);
      });
  };

  const handlerPrev = (e) => {
    e.preventDefault();
    const _nowIndex = nowIndex;
    if (_nowIndex != 0) {
      // setState({
      //   nowIndex: nowIndex - 1,
      //   checkId: '',
      // });
      setNowIndex(_nowIndex - 1);
      setCheckId('');
      // props.navigation.goBack();
    } else if (_nowIndex == 0) {
      props.navigation.goBack();
    }
  };

  const handlerNext = (e) => {
    e.preventDefault();
    const _nowIndex = nowIndex;
    if (_nowIndex != questionLength - 1) {
      // setState({
      //   nowIndex: nowIndex + 1,
      //   checkId: '',
      // });
      setNowIndex(_nowIndex + 1);
      setCheckId('');
    }
    if (_nowIndex === questionLength - 1) {
      props.navigation.navigate('ProfileComplete');
    }
  };

  const Item = (item) => {
    return (
      <View
        style={[
          ResearchStyle.researchAnswerStyle,
          ResearchStyle.researchAnswerTopStyle,
        ]}>
        <View style={{width: '90%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}></Text>
        </View>
        <RoundCheckbox
          size={30}
          // keyValue={item.questionNumber}
          // checked={
          //   checkedArray.findIndex(
          //     (y) =>
          //       y.question === item.questionNumber &&
          //       y.answer === item.optionNumber,
          //   ) >= 0
          //     ? true
          //     : false
          // }
          color="#164895"
          labelColor="#000000"
          // label={item.optionContent}
          // value={item.optionNumber}
          onClick={() => {
            // setState({
            //   isChecked: !isChecked,
            //   checkId: item.id,
            // });
            // setIsChecked(!isChecked);
            // setCheckId(item.optionNumber);
          }}
          // isChecked={isChecked && checkId == 1}
          // checkedObjArr={CheckedArrObject}
          // handleQuestion={handleQuestion}
          // checkedArray={checkedArray}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top */}
        <View
          style={{
            flexDirection: 'column',
          }}>
          {/* Top Title */}
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            Level 2 KYC
          </Text>

          {/* 상단 체크박스 */}
          <View style={[ProfileStyle.incompleteTopView]}>
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_on.png')}
            />
            <View
              style={{
                width: 20,
                borderWidth: 0.5,
                borderColor: '#dddddd',
                marginRight: 4,
                marginLeft: 4,
              }}
            />
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_off.png')}
            />
            <View
              style={{
                width: 20,
                borderWidth: 0.5,
                borderColor: '#dddddd',
                marginRight: 4,
                marginLeft: 4,
              }}
            />
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_off.png')}
            />
            <View
              style={{
                width: 20,
                borderWidth: 0.5,
                borderColor: '#dddddd',
                marginRight: 4,
                marginLeft: 4,
              }}
            />
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_off.png')}
            />
            <View
              style={{
                width: 20,
                borderWidth: 0.5,
                borderColor: '#dddddd',
                marginRight: 4,
                marginLeft: 4,
              }}
            />
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_off.png')}
            />
          </View>

          {/* Research Form */}
          <View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResearchStyle.researchQuestion,
                {textAlign: 'center'},
              ]}>
              {QusetionData[0].question}
            </Text>
          </View>
          <FlatList
            style={{maxHeight: '70%', height: '50%'}}
            data={QusetionData[0].answers}
            renderItem={({item}) => <Item />}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Bottom Button */}
        <View style={[ResearchStyle.researchBottomButton]}>
          <TouchableOpacity
            style={
              nowIndex == 0
                ? [
                    ResetStyle.button,
                    {width: '49%', backgroundColor: '#e6e6e6'},
                  ]
                : [ResetStyle.button, {width: '49%'}]
            }
            activeOpacity={0.75}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {nowIndex == 0 ? '취소' : '이전'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                width: '49%',
                backgroundColor: '#4696ff',
              },
            ]}
            activeOpacity={0.75}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {nowIndex == questionLength - 1 ? '제출' : '다음'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileIncompleteLevel2;
