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

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';
import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileIncompleteDetail = (props) => {
  // CheckedArrObject = new SelectedCheckboxes();

  let CheckedArrObject = new SelectedCheckboxes();

  // 기존 포맷
  const [question, setQuestion] = useState([]);
  const [questionLength, setQuestionLength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [checkId, setCheckId] = useState('');
  const [nowIndex, setNowIndex] = useState(0);
  const [pickedElements, setPickedElements] = useState('');
  const [checkedArray, setCheckedArray] = useState([]);

  //kyc Api
  const [kycQuestion, setKycQuestion] = useState([]);
  const [kycOption, setKycOption] = useState([]);

  //해당 kyc질문 api
  const getAdvancedKycQuestionListApi = async () => {
    await axios
      .get(
        `${server}/kyc/question/${
          props.route.params?.KycLevel
        }/${await AsyncStorage.getItem('deviceLanguage')}`,
      )
      .then(async (response) => {
        setKycQuestion(response.data.data);
        console.log('getAdvancedKycQuestionListApi THEN>>', response);
      })
      .catch((e) => {
        console.log('getAdvancedKycQuestionListApi Error>>', e);
      });
  };
  //해당 kyc 각 질문당 문항 api
  const getAdvancedKycOptionListApi = async () => {
    await axios
      .get(
        `${server}/kyc/option/${
          props.route.params?.KycLevel
        }/${await AsyncStorage.getItem('deviceLanguage')}`,
      )
      .then(async (response) => {
        setKycOption(response.data.data);
        console.log('getAdvancedKycOptionListApi THEN>>', response);
      })
      .catch((e) => {
        console.log('getAdvancedKycOptionListApi Error>>', e);
      });
  };
  useEffect(() => {
    setQuestion([
      {
        id: 0,
        question:
          '첫번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
        questionDetail: [
          {
            id: 1,
            detail: '매우좋음',
          },
          {
            id: 2,
            detail: '좋음',
          },
          {
            id: 3,
            detail: '보통',
          },
          {
            id: 4,
            detail: '나쁨',
          },
          {
            id: 5,
            detail: '매우나쁨',
          },
        ],
        answer: '',
      },
      {
        id: 1,
        question:
          '두번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
        questionDetail: [
          {
            id: 1,
            detail: '매우좋음',
          },
          {
            id: 2,
            detail: '좋음',
          },
          {
            id: 3,
            detail: '보통',
          },
          {
            id: 4,
            detail: '나쁨',
          },
          {
            id: 5,
            detail: '매우나쁨',
          },
        ],
        answer: '',
      },
      {
        id: 2,
        question:
          '세번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
        questionDetail: [
          {
            id: 1,
            detail: '매우좋음',
          },
          {
            id: 2,
            detail: '좋음',
          },
          {
            id: 3,
            detail: '보통',
          },
          {
            id: 4,
            detail: '나쁨',
          },
          {
            id: 5,
            detail: '매우나쁨',
          },
        ],
        answer: '',
      },
      {
        id: 3,
        question:
          '세번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
        questionDetail: [
          {
            id: 1,
            detail: '매우좋음',
          },
          {
            id: 2,
            detail: '좋음',
          },
          {
            id: 3,
            detail: '보통',
          },
          {
            id: 4,
            detail: '나쁨',
          },
          {
            id: 5,
            detail: '매우나쁨',
          },
        ],
        answer: '',
      },
      {
        id: 4,
        question:
          '세번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
        questionDetail: [
          {
            id: 1,
            detail: '매우좋음',
          },
          {
            id: 2,
            detail: '좋음',
          },
          {
            id: 3,
            detail: '보통',
          },
          {
            id: 4,
            detail: '나쁨',
          },
          {
            id: 5,
            detail: '매우나쁨',
          },
        ],
        answer: '',
      },
    ]);
    setQuestionLength(5);
    getAdvancedKycQuestionListApi();
    getAdvancedKycOptionListApi();
  }, []);

  useEffect(() => {
    setCheckId(true);
  }, [checkId]);

  // const handleCheckedbox = (value, status) => {
  //   console.log(value, status);
  // };

  // const renderSelectedElements = () => {
  //   if (CheckedArrObject.fetchArray().length == 0) {
  //     Alert.alert('No Item Selected');
  //   } else {
  //     // setState(() => {
  //     //   return {
  //     //     pickedElements: CheckedArrObject.fetchArray()
  //     //       .map((res) => res.value)
  //     //       .join(),
  //     //   };
  //     // });
  //     setPickedElements(
  //       CheckedArrObject.fetchArray()
  //         .map((res) => res.value)
  //         .join(),
  //     );
  //   }
  // };

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

  const handleQuestion = async (question, answer, status) => {
    console.log(status, '----question----', question);
    console.log(status, '----answer----', answer);
    let _checkedArray = checkedArray;
    if (status === 'PLUS') {
      // await setState({
      //   checkedArray: checkedArray.concat({
      //     key: question,
      //     question: question,
      //     answer: answer,
      //   }),
      // });
      var ARR = _checkedArray.concat({
        key: question,
        question: question,
        answer: answer,
      });
      setCheckedArray(ARR);
    } else if (status === 'MINUS') {
      _checkedArray.splice(
        _checkedArray.findIndex(
          (y) => y.question === question && y.answer === answer,
        ),
        1,
      ),
        // await setState({
        //   checkedArray: checkedArray,
        // });
        setCheckedArray(_checkedArray);
    }
    console.log(checkedArray);
  };

  let researchArr = question;
  let Arr;
  let researchCheck = [];
  let researchList = [];
  let i = 0;

  kycQuestion.map(
    (data, index) =>
      (researchCheck = researchCheck.concat(
        <>
          {index <= [nowIndex] ? (
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_on.png')}
            />
          ) : (
            <Image
              source={require('../../../imgs/drawable-mdpi/icon_ktit_off.png')}
            />
          )}

          {kycQuestion.length - 1 !== index && (
            <View
              style={{
                width: 20,
                borderWidth: 0.5,
                borderColor: '#dddddd',
                marginRight: 4,
                marginLeft: 4,
              }}
            />
          )}
        </>,
      )),
  );
  const RenderItem = (item) => {
    console.log('item>>>>', item);
    console.log('item.questionNumber', item.questionNumber);
    console.log('item.kycQuestion', item.kycQuestion);

    if (item.questionNumber === item.kycQuestion) {
      if (item.optionNumber == 1) {
        return (
          <View
            style={[
              ResearchStyle.researchAnswerStyle,
              ResearchStyle.researchAnswerTopStyle,
            ]}
            key={item.optionNumber}>
            <View style={{width: '90%'}}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left'},
                ]}>
                {item.optionContent}
              </Text>
            </View>
            <RoundCheckbox
              size={30}
              keyValue={item.questionNumber}
              checked={
                checkedArray.findIndex(
                  (y) =>
                    y.question === item.questionNumber &&
                    y.answer === item.optionNumber,
                ) >= 0
                  ? true
                  : false
              }
              color="#164895"
              labelColor="#000000"
              label={item.optionContent}
              value={item.optionNumber}
              onClick={() => {
                // setState({
                //   isChecked: !isChecked,
                //   checkId: item.id,
                // });
                setIsChecked(!isChecked);
                setCheckId(item.optionNumber);
              }}
              isChecked={isChecked && checkId == 1}
              checkedObjArr={CheckedArrObject}
              handleQuestion={handleQuestion}
              checkedArray={checkedArray}
            />
          </View>
        );
      } else {
        return (
          <View
            style={ResearchStyle.researchAnswerStyle}
            key={item.optionNumber}>
            <View style={{width: '90%'}}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left'},
                ]}>
                {item.optionContent}
              </Text>
            </View>
            <RoundCheckbox
              size={30}
              keyValue={item.questionNumber}
              checked={
                checkedArray.findIndex(
                  (y) =>
                    y.question === item.questionNumber &&
                    y.answer === item.optionNumber,
                ) >= 0
                  ? true
                  : false
              }
              color="#164895"
              labelColor="#000000"
              label={item.optionContent}
              value={item.optionNumber}
              onClick={() => {
                // setState({
                //   isChecked: !isChecked,
                //   checkId: data.id,
                // });
                setIsChecked(!isChecked);
                setCheckId(item.optionNumber);
              }}
              isChecked={isChecked && checkId == 1}
              checkedObjArr={CheckedArrObject}
              handleQuestion={handleQuestion}
              checkedArray={checkedArray}
            />
          </View>
        );
      }
    } else {
      return (
        <View>
          <Text>햐</Text>
        </View>
      );
    }
  };
  kycQuestion.map(
    (data, index) =>
      (researchList = researchList.concat(
        <View style={[ResearchStyle.researchView]} key={index}>
          <View style={[ResearchStyle.researchQuestionLength]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResearchStyle.researchQuestion,
                {textAlign: 'center'},
              ]}>
              {data.questionContent}
            </Text>
          </View>
          <FlatList
            style={{maxHeight: '70%', height: '70%'}}
            data={kycOption.filter((d) => data.questionNumber == d.kycQuestion)}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
                questionNumber={data.questionNumber}
                optionContent={item.optionContent}
                optionNumber={item.optionNumber}
                kycQuestion={item.kycQuestion}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={kycOption}
          />
          {/* renderItem={({item}) => (
            <Item
              navigation={props.navigation}
              index={item.index}
              timestamp={item.timestamp}
              status={item.status}
              txid={item.txid}
              block={item.block}
              content={item.content}
              amount={item.content.amount}
              memo={item.content.memo}
              from={item.content.from}
              to={item.content.to}
              surveyName={item.content.surveyName}
            />
          )} */}
        </View>,
      )),
  );

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top */}
        <View
          style={{
            flexDirection: 'column',
            // justifyContent: 'flex-start',
            // borderWidth: 1,
          }}>
          {/* Top Title */}
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            Level {props.route.params?.KycLevel} KYC
          </Text>

          {/* 상단 체크박스 */}
          <View style={[ProfileStyle.incompleteTopView]}>{researchCheck}</View>

          {/* Research Form */}
          {researchList[nowIndex]}
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
            activeOpacity={0.75}
            onPress={handlerPrev}>
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
            activeOpacity={0.75}
            onPress={handlerNext}>
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
export default ProfileIncompleteDetail;
