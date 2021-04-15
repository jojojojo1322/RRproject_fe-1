import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Platform,
  BackHandler,
} from 'react-native';

import {server} from '@context/server';
import axios from 'axios';
import ResetStyle from '@style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '@factory/Roundcheck';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ResearchStyle from '@style/ResearchStyle.js';
import {useTranslation} from 'react-i18next';

import ProgressModal from '@factory/modal/ProgressModal';
import {useSelector} from 'react-redux';

import {
  sendSurveyAnswer,
  getSurveyOption,
  getSurveyQuestion,
} from '@repository/surveyRepository';

import {walletReward} from '@repository/tncRepository';

const ResearchForm = (props) => {
  const {t, i18n} = useTranslation();

  const [question, setQuestion] = useState([]);
  const [questionLength, setQuestionLength] = useState(0);

  //survey
  const [survey, setSurvey] = useState([]);
  const [surveyOption, setSurveyOption] = useState([]);
  const [surveyLength, setSurveyLength] = useState(0);
  const [nowIndex, setNowIndex] = useState(0);

  const [isChecked, setIsChecked] = useState(false);
  const [checkId, setCheckId] = useState('');
  const [pickedElements, setPickedElements] = useState('');

  // 체크박스 배열
  const [checkedArray, setCheckedArray] = useState([]);
  // 체크 여부 확인 후 버튼 활성회
  const [nextCheck, setNextCheck] = useState(false);

  // default userNo, deviceLanguage, legacySurveyId
  const [userNo, setUserNo] = useState('');
  const [deviceLanguage, setDeviceLanguage] = useState('');
  const [legacySurveyId, setLegacySurveyId] = useState('');

  const [insertSuccess, setInsertSuccess] = useState(1);

  //설문조사 최초페이지 이전버튼 클릭시 설문 아웃 경고 모달
  const [modalVisible, setModalVisible] = useState(false);

  //설문조사 마지막부분 post날렸을시 에러 처리 모달
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  //progress
  const [modal4Visible, setModal4Visible] = useState(false);
  // 이미 보상이 지급된 경우 모달
  const [modal5Visible, setModal5Visible] = useState(false);

  const {language, user} = useSelector(({language, auth}) => ({
    language: language.language,
    user: auth.user,
  }));

  let CheckedArrObject = new SelectedCheckboxes();

  // survey insert
  const postSurveyAnswerApi = async () => {
    await sendSurveyAnswer({checkedArray})
      .then((response) => {
        const ret = response.data.ret_val;
        setInsertSuccess(ret);
      })
      .catch((e) => {
        if (
          e.response.data.message === '해당 설문의 참여인원이 초과하였습니다.'
        ) {
          setModal2Visible(true);
        } else if (
          e.response.data.message === '해당 설문에 이미 참여 하셨습니다.'
        ) {
          setModal3Visible(true);
        }
      });
  };
  // survey Reward Api
  const postSurveyRewardApi = async () => {
    setModal4Visible(true);
    await walletReward({
      language: language,
      receiver: user.userNo,
      surveyId: props.route.params?.surveyId,
    })
      .then(async (response) => {
        if (response.data.status === 'success') {
          props.navigation.navigate('MainVideoComplete');
        } else if (response.data.status === 'fail') {
          setModal5Visible(true);
        }
        setModal4Visible(false);
      })
      .catch((e) => {
        setModal4Visible(false);
      });
  };
  // survey question get
  const getSurveyQuestionApi = async () => {
    await getSurveyQuestion({
      language: language,
      legacySurveyId: props.route.params?.legacySurveyId,
    })
      .then(async (response) => {
        setSurvey(response.data.resQuestionBySurveyIdInfo);
        setSurveyLength(response.data.resQuestionBySurveyIdInfo.length);
        setLegacySurveyId(props.route.params?.legacySurveyId);
        setDeviceLanguage(language);
        setUserNo(user.userNo);

        response.data.resQuestionBySurveyIdInfo.map((data, index) => {
          getSurveyOptionApi(data.questionNum);
        });
      })
      .catch((e) => {});
  };
  let surveyOptionArr = [];

  const getSurveyOptionApi = async (questionNum) => {
    await getSurveyOption({
      language: language,
      legacySurveyId: props.route.params?.legacySurveyId,
      questionNum: questionNum,
    })
      .then((response) => {
        surveyOptionArr = surveyOptionArr.concat(response.data);

        setSurveyOption(surveyOptionArr);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (insertSuccess === 0) {
      if (props.route.params?.advertiseUrl === null) {
        postSurveyRewardApi();
      } else {
        props.navigation.replace('MainVideo', {
          legacySurveyId: legacySurveyId,
          surveyArray: checkedArray,
          surveyId: props.route.params?.surveyId,
          sponsorUserNo: props.route.params?.sponsorUserNo,
          advertiseUrl: props.route.params?.advertiseUrl,
        });
      }
    }
  }, [insertSuccess]);
  const confirmHandle = () => {
    props.navigation.goBack();
  };
  const cancelHandle = () => {
    console.log('취소');
  };

  const [index, setIndex] = useState(nowIndex);

  useEffect(() => {
    setIndex(nowIndex);
  }, [nowIndex]);

  // 이전 버튼
  const handlerPrev = async (e) => {
    if (index != 0) {
      setNowIndex(index - 1);
      setCheckId('');
      await setNextCheck(
        checkedArray.findIndex(
          (y) => Number(y.surveyQuestionNum) === Number(index),
        ) !== -1,
      );
    } else if (index == 0) {
      setModalVisible(true);
    }
  };
  // 다음버튼
  const handlerNext = async (e) => {
    const _nowIndex = nowIndex;
    if (_nowIndex != surveyLength - 1) {
      setNowIndex(_nowIndex + 1);
      setCheckId('');
      await setNextCheck(
        checkedArray.findIndex(
          (y) => Number(y.surveyQuestionNum) === Number(_nowIndex) + 2,
        ) !== -1,
      );
    }
    if (_nowIndex === surveyLength - 1) {
      // progressive 시작
      postSurveyAnswerApi();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        handlerPrev();
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onAndroidBackPress,
          );
        }
      };
    }, [index]),
  );

  useEffect(() => {
    getSurveyQuestionApi();
  }, []);

  const survey_handleQuestion = async (
    question,
    answer,
    status,
    optionId,
    surveyId,
    surveyQuestionId,
  ) => {
    let _checkedArray = checkedArray;
    if (status === 'PLUS') {
      _checkedArray = _checkedArray.concat({
        languageCode: deviceLanguage,
        legacySurveyId: legacySurveyId,
        surveyId: surveyId,
        surveyOptionId: optionId,
        surveyOptionNum: answer,
        surveyQuestionId: surveyQuestionId,
        surveyQuestionNum: question,
        userNo: userNo,
      });
      await setCheckedArray(_checkedArray);
    } else if (status === 'MINUS') {
      _checkedArray.splice(
        _checkedArray.findIndex(
          (y) =>
            y.surveyQuestionNum === question && y.surveyOptionNum === answer,
        ),
        1,
      );
      await setCheckedArray(_checkedArray);
    }
    await setNextCheck(
      _checkedArray.findIndex((y) => y.surveyQuestionNum === question) !== -1,
    );
  };

  let researchArr = question;
  let Arr;
  let researchList = [];
  let i = 0;

  const confirm2Handle = () => {
    props.navigation.navigate('Main');
  };
  const RenderItem = (item) => {
    const surveyQuestion = survey.filter(
      (data, index) => data.questionNum == item.questionNum,
    )[0];

    if (item.optionNumber == 1) {
      return (
        <View
          style={[
            ResearchStyle.researchAnswerStyle,
            ResearchStyle.researchAnswerTopStyle,
          ]}
          key={item.id}>
          <View style={{width: '85%'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left', fontWeight: '300'},
              ]}>
              {item.optionContent}
            </Text>
          </View>
          <RoundCheckbox
            size={25}
            keyValue={item.questionNum}
            checked={
              checkedArray.findIndex(
                (y) =>
                  y.surveyQuestionNum === item.questionNum &&
                  y.surveyOptionNum === item.optionNumber,
              ) >= 0
                ? true
                : false
            }
            color="#164895"
            labelColor="#000000"
            label={item.id}
            value={item.optionNumber}
            onClick={() => {
              setIsChecked(!isChecked);
              setCheckId(item.id);
            }}
            isChecked={isChecked && checkId == 1}
            checkedObjArr={CheckedArrObject}
            survey_handleQuestion={survey_handleQuestion}
            checkedArray={checkedArray}
            surveyId={surveyQuestion.surveyId}
            surveyQuestionId={surveyQuestion.id}
          />
        </View>
      );
    } else {
      return (
        <View style={ResearchStyle.researchAnswerStyle} key={item.id}>
          <View style={{width: '85%'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left', fontWeight: '300'},
              ]}>
              {item.optionContent}
            </Text>
          </View>
          <RoundCheckbox
            size={25}
            keyValue={item.questionNum}
            checked={
              checkedArray.findIndex(
                (y) =>
                  y.surveyQuestionNum === item.questionNum &&
                  y.surveyOptionNum === item.optionNumber,
              ) >= 0
                ? true
                : false
            }
            color="#164895"
            labelColor="#000000"
            label={item.id}
            value={item.optionNumber}
            onClick={() => {
              setIsChecked(!isChecked);
              setCheckId(item.id);
            }}
            isChecked={isChecked && checkId == 1}
            checkedObjArr={CheckedArrObject}
            survey_handleQuestion={survey_handleQuestion}
            checkedArray={checkedArray}
            surveyId={surveyQuestion.surveyId}
            surveyQuestionId={surveyQuestion.id}
          />
        </View>
      );
    }
  };

  survey.map(
    (data, index) =>
      (researchList = researchList.concat(
        // <View style={[ResearchStyle.researchView]} key={index}>
        <>
          <View
            style={[ResearchStyle.researchQuestionLength, {marginBottom: 30}]}>
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {fontWeight: '400'},
              ]}>
              {data.questionNum}/{surveyLength}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                ResearchStyle.researchQuestion,
              ]}>
              {data.questionName}
            </Text>
          </View>
          {/* </View>, */}
        </>,
      )),
  );

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        <View style={{flex: 1}}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            {props.route.params?.surveyName}
          </Text>

          <View
            style={[
              ResearchStyle.researchView,
              {
                marginTop: '10%',
                paddingBottom: Platform.OS === 'ios' ? 0 : '10%',
              },
            ]}>
            {/* 상단 인덱스 / 질문 내용 start */}
            {researchList[nowIndex]}
            {/* 상단 인덱스 / 질문 내용 end */}
            {/* 해당 질문 option detail start */}
            <FlatList
              bounces={false}
              style={{
                height: '70%',
              }}
              data={surveyOption.filter(
                (d) => String(d.questionNum) === String(nowIndex + 1),
              )}
              renderItem={({item}) => (
                <RenderItem
                  id={item.id}
                  questionNum={item.questionNum}
                  surveyQuestionId={item.surveyQuestionId}
                  optionNumber={item.optionNumber}
                  optionContent={item.optionContent}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              extraData={surveyOption}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            {/* 해당 질문 option detail end */}
          </View>
        </View>
        <View style={ResearchStyle.researchBottomButton}>
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
              {nowIndex == 0 ? t('researchForm1') : t('researchForm2')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {width: '49%', backgroundColor: '#4696ff'},
              nextCheck === false && {backgroundColor: '#e6e6e6'},
            ]}
            activeOpacity={0.75}
            onPress={nextCheck === true ? handlerNext : null}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {nowIndex == questionLength - 1
                ? t('researchForm3')
                : t('researchForm4')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 설문을 종료하시겠습니까? */}
        <TextConfirmCancelModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          text={t('researchForm5')}
          confirm={t('confirm')}
          confirmHandle={confirmHandle}
          cancel={t('cancel')}
          cancelHandle={cancelHandle}
        />
        {/* '해당 설문의 참여인원이 초과하였습니다.' */}
        <TextConfirmModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          text={t('researchForm6')}
          confirm={t('confirm')}
          handleNextPage={confirm2Handle}
        />
        {/* '해당 설문에 이미 참여 하셨습니다.' */}
        <TextConfirmModal
          modalVisible={modal3Visible}
          setModalVisible={setModal3Visible}
          text={t('researchForm7')}
          confirm={t('confirm')}
          handleNextPage={confirm2Handle}
        />
        <ProgressModal
          modalVisible={modal4Visible}
          setModalVisible={setModal4Visible}
        />
        {/* '이미 해당 설문의 보상을 지급하였습니다.' */}
        <TextConfirmModal
          modalVisible={modal5Visible}
          setModalVisible={setModal5Visible}
          text={t('researchForm8')}
          confirm={t('confirm')}
          handleNextPage={confirm2Handle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResearchForm;
