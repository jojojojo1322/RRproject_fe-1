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

import BottomModal from '../../factory/modal/BottomModal';
import TextConfirmModal from '../../factory/modal/TextConfirmModal';

const ProfileIncompleteLevel2 = (props) => {
  const kycQuestion = [
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
  ];

  let CheckedArrObject = new SelectedCheckboxes();
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [userNo, setUserNo] = useState('');

  // 기존 포맷
  const [question, setQuestion] = useState([]);
  const [questionLength, setQuestionLength] = useState(5);
  const [isChecked, setIsChecked] = useState(false);
  const [checkId, setCheckId] = useState('');
  const [nowIndex, setNowIndex] = useState(0);
  const [pickedElements, setPickedElements] = useState('');
  const [checkedArray, setCheckedArray] = useState([]);
  const [nextCheck, setNextCheck] = useState(false);
  //kyc Api
  // const [kycQuestion, setKycQuestion] = useState([]);
  const [kycOption, setKycOption] = useState([]);
  const [successCheck, setSuccessCheck] = useState(0);
  const [updateCheck, setUpdateCheck] = useState(false);

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  // ADVANCED form
  // [
  //   {
  //     content: 'string',
  //     kycLevel: 'string',
  //     kycOption: 0,
  //     kycQuestion: 0,
  //     languageCode: 'string',
  //     userNo: 'string',
  //   },
  // ]

  // KYC level 2 get
  const getAdvancedKycApi = async () => {
    await axios
      .get(`${server}/kyc/2/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log('getAdvancedKycApi THEN>>', response);
        if (response.data.response.ret_val === 0) {
          setUpdateCheck(true);
          const Arr = [
            {kycQuestion: '0', kycOption: response.data.data.employmentStatus},
            {kycQuestion: '1', kycOption: response.data.data.annualRevenue},
            {kycQuestion: '2', kycOption: response.data.data.ownProperties},
            {kycQuestion: '3', kycOption: response.data.data.netWorth},
            {kycQuestion: '4', kycOption: response.data.data.investIn},
          ];
          setCheckedArray(Arr);
        }
        // setSuccessCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('getAdvancedKycApi Error>>', e);
      });
  };

  //해당 Kyc Level create
  const createAdvancedKycApi = async () => {
    console.log({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
    });
    await axios
      .post(`${server}/kyc/2`, {
        employmentStatus: checkedArray[0].kycOption,
        annualRevenue: checkedArray[1].kycOption,
        ownProperties: checkedArray[2].kycOption,
        netWorth: checkedArray[3].kycOption,
        investIn: checkedArray[4].kycOption,
        userNo: await AsyncStorage.getItem('userNo'),
      })
      .then(async (response) => {
        console.log('createAdvancedKycApi THEN>>', response);
        setSuccessCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('createAdvancedKycApi Error>>', e);
      });
  };
  //해당 Kyc Level update
  const updateAdvancedKycApi = async () => {
    console.log({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
    });
    await axios
      .patch(`${server}/kyc/2/${await AsyncStorage.getItem('userNo')}`, {
        employmentStatus: checkedArray[0].kycOption,
        annualRevenue: checkedArray[1].kycOption,
        ownProperties: checkedArray[2].kycOption,
        netWorth: checkedArray[3].kycOption,
        investIn: checkedArray[4].kycOption,
        userNo: await AsyncStorage.getItem('userNo'),
      })
      .then(async (response) => {
        console.log('updateAdvancedKycApi THEN>>', response);
        setSuccessCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('updateAdvancedKycApi Error>>', e);
      });
  };

  const confirm = () => {
    props.navigation.navigate('ProfileMain');
  };

  useEffect(() => {
    getAdvancedKycApi();
  }, []);
  useEffect(() => {
    setCheckId(true);
  }, [checkId]);

  // nowIndex 변화 체크
  useEffect(() => {
    console.log('nowIndex 변화 체크');
    setNextCheck(
      checkedArray.findIndex(
        (y) => String(y.kycQuestion) === String(nowIndex),
      ) >= 0,
    );
  }, [nowIndex]);

  useEffect(() => {
    console.log(
      'setNextCheck>>>>>>>',
      checkedArray.findIndex(
        (y) => String(y.kycQuestion) === String(nowIndex),
      ) >= 0,
    );
    console.log('checkedArray 상태변화 체크');
    console.log('checkedArray 상태변화 체크 checkArray', checkedArray);

    // 해당 index kyc질문에 대한 대답이 배열에 들어가있는지 체크
    setNextCheck(
      checkedArray.findIndex(
        (y) => String(y.kycQuestion) === String(nowIndex),
      ) >= 0,
    );
    console.log('checkedArray 상태변화 체크222');
  }, [checkedArray]);

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
  const handlerNext = async (e) => {
    e.preventDefault();
    // setNextCheck(false);
    const _nowIndex = nowIndex;

    if (_nowIndex !== questionLength - 1) {
      setNowIndex(_nowIndex + 1);
      setCheckId('');
    }
    if (_nowIndex === questionLength - 1) {
      console.log('checkedArray', checkedArray);
      if (updateCheck === false) {
        createAdvancedKycApi();
        if (successCheck === 0) {
          props.navigation.navigate('ProfileComplete', {
            KycLevel: props.route.params?.KycLevel,
          });
        } else if (successCheck === -1) {
          setModal2Visible(!modal2Visible);
        }
      } else {
        updateAdvancedKycApi();
        if (successCheck === 0) {
          props.navigation.navigate('ProfileComplete', {
            KycLevel: props.route.params?.KycLevel,
          });
        } else if (successCheck === -1) {
          setModal2Visible(!modal2Visible);
        }
      }
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
      var ARR = _checkedArray.concat({
        kycOption: String(answer),
        kycQuestion: String(question),
      });
      setCheckedArray(ARR);
    } else if (status === 'MINUS') {
      console.log(
        _checkedArray.splice(
          _checkedArray.findIndex(
            (y) => y.kycQuestion == question && y.kycOption == answer,
          ),
          1,
        ),
      );
      // _checkedArray.splice(
      //   _checkedArray.findIndex(
      //     (y) => y.kycQuestion == question && y.kycOption == answer,
      //   ),
      //   1,
      // );
      setCheckedArray(_checkedArray);

      // setNextCheck(
      //   _checkedArray.findIndex(
      //     (y) => String(y.kycQuestion) === String(nowIndex),
      //   ) >= 0,
      // );
      setNextCheck(
        _checkedArray.findIndex(
          (y) => String(y.kycQuestion) === String(nowIndex),
        ) >= 0,
      );
    }
    // }
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
    if (item.id == 0) {
      return (
        <View
          style={[
            ResearchStyle.researchAnswerStyle,
            ResearchStyle.researchAnswerTopStyle,
          ]}
          key={item.id}>
          <View style={{width: '90%'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {item.answer}
            </Text>
          </View>
          <RoundCheckbox
            size={30}
            // keyValue={item.questionNumber}
            keyValue={nowIndex}
            label={item.answer}
            value={item.id}
            checked={
              checkedArray.findIndex(
                (y) =>
                  y.kycQuestion == item.questionNumber &&
                  y.kycOption == item.id,
              ) >= 0
                ? true
                : false
            }
            color="#164895"
            labelColor="#000000"
            onClick={() => {
              setIsChecked(!isChecked);
              setCheckId(item.id);
            }}
            isChecked={isChecked && checkId == 1}
            checkedObjArr={CheckedArrObject}
            handleQuestion={handleQuestion}
            checkedArray={checkedArray}
            // 단일 - 다중 선택지
            typeName={'radiobutton'}
          />
        </View>
      );
    } else {
      return (
        <View style={ResearchStyle.researchAnswerStyle} key={item.id}>
          <View style={{width: '90%'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {item.answer}
            </Text>
          </View>
          <RoundCheckbox
            size={30}
            keyValue={nowIndex}
            label={item.answer}
            value={item.id}
            checked={
              checkedArray.findIndex(
                (y) =>
                  y.kycQuestion == item.questionNumber &&
                  y.kycOption == item.id,
              ) >= 0
                ? true
                : false
            }
            color="#164895"
            labelColor="#000000"
            onClick={() => {
              setIsChecked(!isChecked);
              setCheckId(item.id);
            }}
            isChecked={isChecked && checkId == 1}
            checkedObjArr={CheckedArrObject}
            handleQuestion={handleQuestion}
            checkedArray={checkedArray}
            // 단일 - 다중 선택지
            typeName={'radiobutton'}
            // 3개이상 선택지 금지
            setModalVisible={setModalVisible}
          />
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
              {data.question}
            </Text>
          </View>
          <FlatList
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
                backgroundColor: '#e6e6e6',
              },
              // 해당 index kyc질문에 대한 대답이 배열에 들어가있는지 체크
              // checkedArray.findIndex(
              //   (y) => String(y.kycQuestion) === String(nowIndex),
              // ) >= 0 && {
              //   backgroundColor: '#4696ff',
              // },
              nextCheck && {
                backgroundColor: '#4696ff',
              },
            ]}
            activeOpacity={0.75}
            onPress={nextCheck ? handlerNext : null}>
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
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={`선택 가능한 답변 개수를 초과했습니다.`}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={`이미 등록 완료되었습니다.`}
        confirm={confirm}
      />
    </SafeAreaView>
  );
};

export default ProfileIncompleteLevel2;
