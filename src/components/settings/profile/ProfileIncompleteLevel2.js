import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '@factory/Roundcheck';
import ResearchStyle from '@style/ResearchStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';
import AuthStyle from '@style/AuthStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import {useSelector} from 'react-redux';

import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import {useTranslation} from 'react-i18next';

import {
  kycLevel2,
  kycLevel2Create,
  kycLevel2Update,
} from '@repository/kycRepository';

const ProfileIncompleteLevel2 = (props) => {
  const {t, i18n} = useTranslation();
  const kycQuestion = [
    {
      question: t('profileAllQuestion2_1'),
      answers: [
        {
          id: 0,
          answer: t('profileAllQuestion2_1_Answer1'),
        },
        {
          id: 1,
          answer: t('profileAllQuestion2_1_Answer2'),
        },
        {
          id: 2,
          answer: t('profileAllQuestion2_1_Answer3'),
        },
        {
          id: 3,
          answer: t('profileAllQuestion2_1_Answer4'),
        },
        {
          id: 4,
          answer: t('profileAllQuestion2_1_Answer5'),
        },
        {
          id: 5,
          answer: t('profileAllQuestion2_1_Answer6'),
        },
        {
          id: 6,
          answer: t('profileAllQuestion2_1_Answer7'),
        },
        {
          id: 7,
          answer: t('profileAllQuestion2_1_Answer8'),
        },
        {
          id: 8,
          answer: t('profileAllQuestion2_1_Answer9'),
        },
        {
          id: 9,
          answer: t('profileAllQuestion2_1_Answer10'),
        },
        {
          id: 10,
          answer: t('profileAllQuestion2_1_Answer11'),
        },
        {
          id: 11,
          answer: t('profileAllQuestion2_1_Answer12'),
        },
      ],
    },
    {
      question: t('profileAllQuestion2_2'),
      answers: [
        {
          id: 0,
          answer: t('profileAllQuestion2_2_Answer1'),
        },
        {
          id: 1,
          answer: t('profileAllQuestion2_2_Answer2'),
        },
        {
          id: 2,
          answer: t('profileAllQuestion2_2_Answer3'),
        },
        {
          id: 3,
          answer: t('profileAllQuestion2_2_Answer4'),
        },
        {
          id: 4,
          answer: t('profileAllQuestion2_2_Answer5'),
        },
        {
          id: 5,
          answer: t('profileAllQuestion2_2_Answer6'),
        },
        {
          id: 6,
          answer: t('profileAllQuestion2_2_Answer7'),
        },
        {
          id: 7,
          answer: t('profileAllQuestion2_2_Answer8'),
        },
        {
          id: 8,
          answer: t('profileAllQuestion2_2_Answer9'),
        },
      ],
    },
    {
      question: t('profileAllQuestion2_3'),
      answers: [
        {
          id: 0,
          answer: t('profileAllQuestion2_3_Answer1'),
        },
        {
          id: 1,
          answer: t('profileAllQuestion2_3_Answer2'),
        },
        {
          id: 2,
          answer: t('profileAllQuestion2_3_Answer3'),
        },
        {
          id: 3,
          answer: t('profileAllQuestion2_3_Answer4'),
        },
        {
          id: 4,
          answer: t('profileAllQuestion2_3_Answer5'),
        },
      ],
    },
    {
      question: t('profileAllQuestion2_4'),
      answers: [
        {
          id: 0,
          answer: t('profileAllQuestion2_4_Answer1'),
        },
        {
          id: 1,
          answer: t('profileAllQuestion2_4_Answer2'),
        },
        {
          id: 2,
          answer: t('profileAllQuestion2_4_Answer3'),
        },
        {
          id: 3,
          answer: t('profileAllQuestion2_4_Answer4'),
        },
        {
          id: 4,
          answer: t('profileAllQuestion2_4_Answer5'),
        },
        {
          id: 5,
          answer: t('profileAllQuestion2_4_Answer6'),
        },
        {
          id: 6,
          answer: t('profileAllQuestion2_4_Answer7'),
        },
        {
          id: 7,
          answer: t('profileAllQuestion2_4_Answer8'),
        },
        {
          id: 8,
          answer: t('profileAllQuestion2_4_Answer9'),
        },
        {
          id: 9,
          answer: t('profileAllQuestion2_4_Answer10'),
        },
        {
          id: 10,
          answer: t('profileAllQuestion2_4_Answer11'),
        },
        {
          id: 11,
          answer: t('profileAllQuestion2_4_Answer12'),
        },
      ],
    },
    {
      question: t('profileAllQuestion2_5'),
      answers: [
        {
          id: 0,
          answer: t('profileAllQuestion2_5_Answer1'),
        },
        {
          id: 1,
          answer: t('profileAllQuestion2_5_Answer2'),
        },
        {
          id: 2,
          answer: t('profileAllQuestion2_5_Answer3'),
        },
        {
          id: 3,
          answer: t('profileAllQuestion2_5_Answer4'),
        },
        {
          id: 4,
          answer: t('profileAllQuestion2_5_Answer5'),
        },
        {
          id: 5,
          answer: t('profileAllQuestion2_5_Answer6'),
        },
        {
          id: 6,
          answer: t('profileAllQuestion2_5_Answer7'),
        },
        {
          id: 7,
          answer: t('profileAllQuestion2_5_Answer8'),
        },
      ],
    },
  ];

  let CheckedArrObject = new SelectedCheckboxes();
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [userNo, setUserNo] = useState('');

  // ?????? ??????
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

  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

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
    await kycLevel2({userNo: user.userNo})
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

  //?????? Kyc Level create
  const createAdvancedKycApi = async () => {
    console.log({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
    });
    await kycLevel2Create({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
      userNo: user.userNo,
    })
      .then(async (response) => {
        console.log('createAdvancedKycApi THEN>>', response);
        setSuccessCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log('createAdvancedKycApi Error>>', e);
      });
  };
  //?????? Kyc Level update
  const updateAdvancedKycApi = async () => {
    console.log({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
    });
    await kycLevel2Update({
      employmentStatus: checkedArray[0].kycOption,
      annualRevenue: checkedArray[1].kycOption,
      ownProperties: checkedArray[2].kycOption,
      netWorth: checkedArray[3].kycOption,
      investIn: checkedArray[4].kycOption,
      userNo: user.userNo,
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

  // nowIndex ?????? ??????
  useEffect(() => {
    console.log('nowIndex ?????? ??????');
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
    console.log('checkedArray ???????????? ??????');
    console.log('checkedArray ???????????? ?????? checkArray', checkedArray);

    // ?????? index kyc????????? ?????? ????????? ????????? ?????????????????? ??????
    setNextCheck(
      checkedArray.findIndex(
        (y) => String(y.kycQuestion) === String(nowIndex),
      ) >= 0,
    );
    console.log('checkedArray ???????????? ??????222');
  }, [checkedArray]);

  //?????? ????????? ?????? ?????????
  const handlerPrev = (e) => {
    e.preventDefault();
    const _nowIndex = nowIndex;
    if (_nowIndex != 0) {
      setNowIndex(_nowIndex - 1);
      setCheckId('');
    } else if (_nowIndex == 0) {
      props.navigation.replace('ProfileMain');
    }
  };

  //?????? ?????? ?????????
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
            updateCheck: updateCheck,
          });
        } else if (successCheck === -1) {
          setModal2Visible(!modal2Visible);
        }
      } else {
        updateAdvancedKycApi();
        if (successCheck === 0) {
          props.navigation.navigate('ProfileComplete', {
            KycLevel: props.route.params?.KycLevel,
            updateCheck: updateCheck,
          });
        } else if (successCheck === -1) {
          setModal2Visible(!modal2Visible);
        }
      }
    }
  };
  //roundCheckBox ???
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
              style={{
                width: Platform.OS === 'ios' ? 40 : 35,
                height: Platform.OS === 'ios' ? 40 : 35,
                resizeMode: 'contain',
              }}
              source={require('@images/kycCheckedIcon.png')}
            />
          ) : (
            <Image
              style={{
                width: Platform.OS === 'ios' ? 40 : 35,
                height: Platform.OS === 'ios' ? 40 : 35,
                resizeMode: 'contain',
              }}
              source={require('@images/kycUncheckIcon.png')}
            />
          )}

          {kycQuestion.length - 1 !== index && (
            <View
              key={index.toString()}
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
          key={item.id.toString()}>
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
            size={25}
            // keyValue={item.questionNumber}
            keyValue={nowIndex}
            label={item.answer}
            value={item.id.toString()}
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
            // ?????? - ?????? ?????????
            typeName={'radiobutton'}
          />
        </View>
      );
    } else {
      return (
        <View
          style={ResearchStyle.researchAnswerStyle}
          key={item.id.toString()}>
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
            size={25}
            keyValue={nowIndex}
            label={item.answer}
            value={item.id.toString()}
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
            // ?????? - ?????? ?????????
            typeName={'radiobutton'}
            // 3????????? ????????? ??????
            setModalVisible={setModalVisible}
          />
        </View>
      );
    }
  };
  kycQuestion.map(
    (data, index) =>
      (researchList = researchList.concat(
        <View style={[ResearchStyle.researchView]} key={index.toString()}>
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
            bounces={false}
            style={{marginTop: '10%', height: '70%'}}
            data={kycQuestion[nowIndex].answers}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
                //?????? ??????
                question={data.question}
                questionNumber={nowIndex}
                //?????? ????????? ??????/????????????
                // typeName={data.typeName}
                id={item.id}
                answer={item.answer}
                // optionNumber={item.optionNumber}
                // kycQuestion={item.kycQuestion}
              />
            )}
            keyExtractor={(item, index) =>
              // Number(item.level);
              index.toString()
            }
            extraData={nowIndex}
          />
        </View>,
      )),
  );
  return (
    <SafeAreaView style={[ResetStyle.container]} key={'1'}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top */}
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            paddingBottom: Platform.OS === 'ios' ? 0 : '15%',
            // justifyContent: 'flex-start',
          }}>
          {/* Top Title */}
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            {t('profileIncompleteDetailLevel2_Title', {
              kycLevel: props.route.params?.KycLevel,
            })}
          </Text>

          {/* ?????? ???????????? */}
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
              {nowIndex == 0
                ? t('profileIncompleteDetailLevel2_1')
                : t('profileIncompleteDetailLevel2_2')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                width: '49%',
                backgroundColor: '#e6e6e6',
              },
              // ?????? index kyc????????? ?????? ????????? ????????? ?????????????????? ??????
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
              {nowIndex == questionLength - 1
                ? t('profileIncompleteDetailLevel2_3')
                : t('profileIncompleteDetailLevel2_4')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('profileIncompleteDetailLevel2_5')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('profileIncompleteDetailLevel2_6')}
        confirm={confirm}
      />
    </SafeAreaView>
  );
};

export default ProfileIncompleteLevel2;
