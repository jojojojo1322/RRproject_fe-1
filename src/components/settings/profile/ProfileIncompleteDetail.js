import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  YellowBox,
  Platform,
} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {SelectedCheckboxes, RoundCheckbox} from '@factory/Roundcheck';
import ResearchStyle from '@style/ResearchStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';

import {server} from '@context/server';
import axios from 'axios';

import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import {useTranslation} from 'react-i18next';
import {
  getAdvancedKycInfo,
  getAdvancedKycOption,
  getAdvancedKycQuestion,
  updateAdvancedKyc,
} from '@repository/kycRepository';

const ProfileIncompleteDetail = (props) => {
  const {t, i18n} = useTranslation();
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
  const [nextCheck, setNextCheck] = useState(false);
  //kyc Api
  const [kycQuestion, setKycQuestion] = useState([]);
  const [kycOption, setKycOption] = useState([]);
  const [successCheck, setSuccessCheck] = useState(0);

  const [updateCheck, setUpdateCheck] = useState(false);
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const {user, language} = useSelector(({auth, language}) => ({
    user: auth.user,
    language: language.language,
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

  //해당 kyc질문 get check
  const getAdvancedKyGetApi = async () => {
    await getAdvancedKycInfo({
      userNo: user.userNo,
      KycLevel: props.route.params?.KycLevel,
      language: language,
    })
      .then(async (response) => {
        if (response.data.data != '') {
          console.log('getAdvancedKyGetApi THEN', response.data.data);
          console.log('update logic>>>>>>>>>>>');
          console.log(
            response.data.data.findIndex((data) => data.kycQuestion === '2'),
          );
          let ARR = [
            response.data.data[
              response.data.data.findIndex((data) => data.kycQuestion === '1')
            ],
            response.data.data[
              response.data.data.findIndex((data) => data.kycQuestion === '2')
            ],
            response.data.data[
              response.data.data.findIndex((data) => data.kycQuestion === '3')
            ],
            response.data.data[
              response.data.data.findIndex((data) => data.kycQuestion === '4')
            ],
            response.data.data[
              response.data.data.findIndex((data) => data.kycQuestion === '5')
            ],
          ];
          ARR.map((data) => {
            delete data.id;
            delete data.questionContent;
            delete data.createdTime;
            delete data.updatedTime;
          });

          console.log(ARR);
          // let Arr1 =
          setCheckedArray(ARR);
          setUpdateCheck(true);
        }
      })
      .catch((e) => {
        console.log('getAdvancedKyGetApi Error>>', e);
      });
  };
  //해당 kyc질문 api
  const getAdvancedKycQuestionListApi = async () => {
    await getAdvancedKycQuestion({
      KycLevel: props.route.params?.KycLevel,
      language: language,
    })
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
    await getAdvancedKycOption(
      `${server}/kyc/option/${props.route.params?.KycLevel}/${language}`,
    )
      .then(async (response) => {
        setKycOption(response.data.data);
        setUserNo(user.userNo);
        setDeviceLanguage(language);
        console.log('getAdvancedKycOptionListApi THEN>>', response);
      })
      .catch((e) => {
        console.log('getAdvancedKycOptionListApi Error>>', e);
      });
  };

  //해당 Kyc Level create
  const createAdvancedKycApi = async () => {
    console.log('createAdvancedKycApi');
    await axios
      .post(`${server}/kyc`, checkedArray)
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
    console.log('updateAdvancedKycApi');
    await axios
      .patch(
        `${server}/kyc/${props.route.params?.KycLevel}/${user.userNo}`,
        checkedArray,
      )
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

  //이전 페이지 버튼 클릭시
  const handlerPrev = (e) => {
    const _nowIndex = nowIndex;
    if (_nowIndex != 0) {
      setNowIndex(_nowIndex - 1);
      setCheckId('');
    } else if (_nowIndex == 0) {
      props.navigation.replace('ProfileMain');
    }
  };

  //다음 버튼 클릭시
  const handlerNext = async (e) => {
    // setNextCheck(false);
    const _nowIndex = nowIndex;

    if (_nowIndex !== questionLength - 1) {
      // if(kycQuestion[_nowIndex].questionRequiredYN === 'TRUE'){
      //   setNowIndex(_nowIndex + 1);
      //   setCheckId('');
      // } else {
      //   setNowIndex(_nowIndex + 1);
      //   setCheckId('');
      // }

      setNowIndex(_nowIndex + 1);
      setCheckId('');
    }
    if (_nowIndex === questionLength - 1) {
      console.log('checkedArray', checkedArray);
      if (updateCheck === false) {
        await createAdvancedKycApi();
        if (successCheck === 0) {
          props.navigation.navigate('ProfileComplete', {
            KycLevel: props.route.params?.KycLevel,
            updateCheck: updateCheck,
          });
        } else {
        }
      } else {
        await updateAdvancedKycApi();
        if (successCheck === 0) {
          props.navigation.navigate('ProfileComplete', {
            KycLevel: props.route.params?.KycLevel,
            updateCheck: updateCheck,
          });
        } else {
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
    if (typeName === 'radiobutton') {
      ///// -- 배열 값 추가 삭제 --- ////
      if (status === 'PLUS') {
        var ARR = _checkedArray.concat({
          content: '',
          kycLevel: String(props.route.params?.KycLevel),
          kycOption: String(answer),
          kycQuestion: String(question),
          languageCode: deviceLanguage,
          userNo: String(userNo),
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
        setCheckedArray(_checkedArray);
        setNextCheck(
          _checkedArray.findIndex(
            (y) => String(y.kycQuestion) === String(nowIndex + 1),
          ) >= 0 ||
            // 아니면 questionRequiredYN -> FALSE 일경우
            (kycQuestion[nowIndex] &&
              kycQuestion[nowIndex].questionRequiredYN === 'FALSE'),
        );
      }
      ///// -- 배열 값 추가 삭제 --- ////
    } else if (typeName === 'checkbox') {
      /// 배열에 같은 kycQuestion 있으면 그 배열의 kycOption에 쉼표로 값 추가 / 쉼표 포함 값제거

      // findIndex -> 값이 없다면 -1, 있다면 인덱스 넘버
      //다중선택시 같은 질문 배열있나 체크
      if (
        _checkedArray.findIndex(
          (data) => String(data.kycQuestion) === String(question),
        ) !== -1
      ) {
        // 같은 값이 존재한다면
        if (status === 'PLUS') {
          let fixAnswer =
            _checkedArray[
              _checkedArray.findIndex(
                (data) => String(data.kycQuestion) === String(question),
              )
            ].kycOption;

          fixAnswer = `${String(fixAnswer)},${answer}`;

          // console.log(
          //   'filter return value',
          //   _checkedArray[
          //     _checkedArray.findIndex(
          //       (data) => String(data.kycQuestion) === String(question),
          //     )
          //   ].kycOption,
          // );

          _checkedArray[
            _checkedArray.findIndex(
              (data) => String(data.kycQuestion) === String(question),
            )
          ].kycOption = fixAnswer;
          setCheckedArray(_checkedArray);
        } else if (status === 'MINUS') {
          let fixAnswer =
            _checkedArray[
              _checkedArray.findIndex(
                (data) => String(data.kycQuestion) === String(question),
              )
            ].kycOption;
          console.log('원래 들어있는 값 체크', fixAnswer);
          console.log('마이너스 값', answer);
          console.log('마이너스 인덱스 값 체크', fixAnswer.indexOf(answer));

          let splitArray = fixAnswer.split(',');
          console.log('splitArray', splitArray);
          splitArray.map((data, index) => {
            console.log('data', data);
            console.log('answer', answer);
            console.log('index', index);
            console.log('result', data === answer);
            if (data === answer) {
              splitArray.splice(index, 1);
              // console.log('들어옴??', splitArray.splice(index, 1));
            }
          });
          console.log('splitArray', splitArray);
          if (splitArray.length !== 0) {
            splitArray.map((data, index) => {
              if (index === 0) {
                console.log('data', data, index);
                fixAnswer = data;
              } else {
                console.log('data', data, index);
                fixAnswer += `,${data}`;
              }
            });
            console.log('마이너스 인덱스 값으로 slice', fixAnswer);

            console.log('바뀐 값 들어있는 값 체크', fixAnswer);
            _checkedArray[
              _checkedArray.findIndex(
                (data) => String(data.kycQuestion) === String(question),
              )
            ].kycOption = fixAnswer;
          } else {
            console.log('한개밖에 없었음');
            _checkedArray.splice(
              _checkedArray.findIndex((y) => y.kycQuestion == question),
              1,
            );
          }

          console.log('fixAnswerfixAnswer', fixAnswer);

          setCheckedArray(_checkedArray);
          setNextCheck(
            _checkedArray.findIndex(
              (y) => String(y.kycQuestion) === String(nowIndex + 1),
            ) >= 0 ||
              // 아니면 questionRequiredYN -> FALSE 일경우
              (kycQuestion[nowIndex] &&
                kycQuestion[nowIndex].questionRequiredYN === 'FALSE'),
          );
        }
      } else {
        if (status === 'PLUS') {
          var ARR = _checkedArray.concat({
            content: '',
            kycLevel: String(props.route.params?.KycLevel),
            kycOption: String(answer),
            kycQuestion: String(question),
            languageCode: deviceLanguage,
            userNo: String(userNo),
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
          setCheckedArray(_checkedArray);
          setNextCheck(
            _checkedArray.findIndex(
              (y) => String(y.kycQuestion) === String(nowIndex + 1),
            ) >= 0 ||
              // 아니면 questionRequiredYN -> FALSE 일경우
              (kycQuestion[nowIndex] &&
                kycQuestion[nowIndex].questionRequiredYN === 'FALSE'),
          );
        }
      }
      ///// -- 배열 값 추가 삭제 --- ////
    }
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
            key={item.optionNumber.toString()}
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
              size={25}
              keyValue={Number(item.questionNumber)}
              label={item.optionContent}
              value={item.optionNumber}
              checked={
                checkedArray.findIndex(
                  (y) => y.kycQuestion === item.questionNumber,
                ) >= 0 &&
                checkedArray[
                  checkedArray.findIndex(
                    (y) => y.kycQuestion === item.questionNumber,
                  )
                ].kycOption
                  .split(',')
                  .includes(item.optionNumber)
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
              setModalVisible={setModalVisible}
              nowIndex={nowIndex}
            />
          </View>
        );
      } else {
        return (
          <View
            style={ResearchStyle.researchAnswerStyle}
            key={item.optionNumber.toString()}>
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
              size={25}
              keyValue={Number(item.questionNumber)}
              checked={
                checkedArray.findIndex(
                  (y) => y.kycQuestion === item.questionNumber,
                ) >= 0 &&
                checkedArray[
                  checkedArray.findIndex(
                    (y) => y.kycQuestion === item.questionNumber,
                  )
                ].kycOption
                  .split(',')
                  .includes(item.optionNumber)
                  ? true
                  : false
              }
              color="#164895"
              labelColor="#000000"
              label={item.optionContent}
              value={item.optionNumber}
              onClick={() => {
                console.log('eeeee', e);
                setIsChecked(!isChecked);
                setCheckId(item.optionNumber);
              }}
              isChecked={isChecked && checkId == 1}
              checkedObjArr={CheckedArrObject}
              handleQuestion={handleQuestion}
              checkedArray={checkedArray}
              // 단일 - 다중 선택지
              typeName={item.typeName}
              // 3개이상 선택지 금지
              setModalVisible={setModalVisible}
              nowIndex={nowIndex}
            />
          </View>
        );
      }
    } else {
      return (
        <View>
          <Text></Text>
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
              {data.questionContent}
            </Text>
          </View>
          <FlatList
            bounces={false}
            style={{
              marginTop: '10%',
              height: '70%',
            }}
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
            keyExtractor={(item, index) =>
              // Number(item.level);
              index.toString()
            }
            extraData={kycOption}
          />
        </View>,
      )),
  );

  useEffect(() => {
    getAdvancedKycQuestionListApi();
    getAdvancedKycOptionListApi();
    getAdvancedKyGetApi();
    YellowBox.ignoreWarnings([
      'Each child in a list should have a unique "key" prop.',
    ]);
  }, []);

  useEffect(() => {
    setCheckId(true);
  }, [checkId]);

  // nowIndex 변화 체크
  useEffect(() => {
    setNextCheck(
      checkedArray.findIndex(
        (y) => String(y.kycQuestion) === String(nowIndex + 1),
      ) >= 0 ||
        // 아니면 questionRequiredYN -> FALSE 일경우
        (kycQuestion[nowIndex] &&
          kycQuestion[nowIndex].questionRequiredYN === 'FALSE'),
    );
  }, [nowIndex]);

  useEffect(() => {
    // 해당 index kyc질문에 대한 대답이 배열에 들어가있는지 체크

    setNextCheck(
      checkedArray.findIndex(
        (y) => Number(y.kycQuestion) === Number(nowIndex + 1),
      ) >= 0 ||
        // 아니면 questionRequiredYN -> FALSE 일경우
        (kycQuestion[nowIndex] &&
          kycQuestion[nowIndex].questionRequiredYN === 'FALSE'),
    );
  }, [checkedArray]);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top */}
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            paddingBottom: Platform.OS === 'ios' ? 0 : '15%',
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
            {t('profileIncompleteDetailTitle', {
              kycLevel: props.route.params?.KycLevel,
            })}
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
              {nowIndex == 0
                ? t('profileIncompleteDetail1')
                : t('profileIncompleteDetail2')}
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
                ? t('profileIncompleteDetail3')
                : t('profileIncompleteDetail4')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('profileIncompleteDetail5')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('profileIncompleteDetail6')}
        confirm={confirm}
      />
    </SafeAreaView>
  );
};
export default ProfileIncompleteDetail;
