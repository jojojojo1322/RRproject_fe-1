import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
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
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [userNo, setUserNo] = useState('');

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

  // ADVANCED form
  [
    {
      content: 'string',
      kycLevel: 'string',
      kycOption: 0,
      kycQuestion: 0,
      languageCode: 'string',
      userNo: 'string',
    },
  ];

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
        setQuestionLength(response.data.data.length);
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
        setUserNo(await AsyncStorage.getItem('userNo'));
        setDeviceLanguage(await AsyncStorage.getItem('deviceLanguage'));
        console.log('getAdvancedKycOptionListApi THEN>>', response);
      })
      .catch((e) => {
        console.log('getAdvancedKycOptionListApi Error>>', e);
      });
  };
  useEffect(async () => {
    getAdvancedKycQuestionListApi();
    getAdvancedKycOptionListApi();
    // setUserNo(await AsyncStorage.getItem('userNo'));
    // setDeviceLanguage(await AsyncStorage.get('deviceLanguage'));
  }, []);

  useEffect(() => {
    setCheckId(true);
  }, [checkId]);

  //이전 페이지 버튼 클릭시
  const handlerPrev = (e) => {
    e.preventDefault();
    const _nowIndex = nowIndex;
    if (_nowIndex != 0) {
      setNowIndex(_nowIndex - 1);
      setCheckId('');
    } else if (_nowIndex == 0) {
      props.navigation.goBack();
    }
  };
  //다음 버튼 클릭시
  const handlerNext = (e) => {
    e.preventDefault();
    const _nowIndex = nowIndex;
    if (_nowIndex != questionLength - 1) {
      setNowIndex(_nowIndex + 1);
      setCheckId('');
    }
    if (_nowIndex === questionLength - 1) {
      console.log('checkedArray', checkedArray);
      // props.navigation.navigate('ProfileComplete');
    }
  };
  //roundCheckBox 값
  const handleQuestion = async (question, answer, status, typeName) => {
    // radiobutton, checkbox
    console.log({
      question: question,
      answer: answer,
      status: status,
      typeName: typeName,
    });
    let _checkedArray = checkedArray;
    // if (typeName === 'radiobutton') {
    if (status === 'PLUS') {
      // var ARR = _checkedArray.concat({
      //   key: question,
      //   question: question,
      //   answer: answer,
      // });
      var ARR = _checkedArray.concat({
        // key: question,
        // question: question,
        // answer: answer,

        content: '',
        kycLevel: String(props.route.params?.KycLevel),
        kycOption: String(answer),
        kycQuestion: String(question),
        languageCode: deviceLanguage,
        userNo: String(userNo),
      });
      setCheckedArray(ARR);
    } else if (status === 'MINUS') {
      _checkedArray.splice(
        _checkedArray.findIndex(
          (y) => y.kycQuestion === question && y.kycOption === answer,
        ),
        1,
      ),
        setCheckedArray(_checkedArray);
    }
    // }
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
              keyValue={Number(item.questionNumber)}
              label={item.optionContent}
              value={item.optionNumber}
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
              onClick={() => {
                setIsChecked(!isChecked);
                setCheckId(item.optionNumber);
              }}
              isChecked={isChecked && checkId == 1}
              checkedObjArr={CheckedArrObject}
              handleQuestion={handleQuestion}
              checkedArray={checkedArray}
              // 단일 - 다중 선택지
              typeName={item.typeName}
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
              keyValue={Number(item.questionNumber)}
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
                setIsChecked(!isChecked);
                setCheckId(item.optionNumber);
              }}
              isChecked={isChecked && checkId == 1}
              checkedObjArr={CheckedArrObject}
              handleQuestion={handleQuestion}
              checkedArray={checkedArray}
              // 단일 - 다중 선택지
              typeName={item.typeName}
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
                //해당 질문
                questionNumber={data.questionNumber}
                //해당 질문의 단일/다중선택
                typeName={data.typeName}
                optionContent={item.optionContent}
                optionNumber={item.optionNumber}
                kycQuestion={item.kycQuestion}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={kycOption}
          />
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
