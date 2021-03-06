import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {server} from '@context/server';
import ResetStyle from '@style/ResetStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';
import TextConfirmCancelVarModal from '@factory/modal/TextConfirmCancelVarModal';
import {
  kycLevel1,
  kycLevel2,
  getAdvancedKycInfo,
} from '@repository/kycRepository';

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

const ProfileAll = (props) => {
  const {t} = useTranslation();

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

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [kycLevel, setKycLevel] = useState(0);

  const {language, user} = useSelector(({language, auth}) => ({
    language: language.language,
    user: auth.user,
  }));

  const [levelCheck, setLevelCheck] = useState('');

  const kycQuestion2 = [
    {
      category: 'employmentStatus',
      question: t('profileAllQuestion2_1'),
      answers: [
        t('profileAllQuestion2_1_Answer1'),

        t('profileAllQuestion2_1_Answer2'),

        t('profileAllQuestion2_1_Answer3'),

        t('profileAllQuestion2_1_Answer4'),

        t('profileAllQuestion2_1_Answer5'),

        t('profileAllQuestion2_1_Answer6'),

        t('profileAllQuestion2_1_Answer7'),

        t('profileAllQuestion2_1_Answer8'),

        t('profileAllQuestion2_1_Answer9'),

        t('profileAllQuestion2_1_Answer10'),

        t('profileAllQuestion2_1_Answer11'),

        t('profileAllQuestion2_1_Answer12'),
      ],
    },
    {
      category: 'annualRevenue',
      question: t('profileAllQuestion2_2'),
      answers: [
        t('profileAllQuestion2_2_Answer1'),

        t('profileAllQuestion2_2_Answer2'),

        t('profileAllQuestion2_2_Answer3'),

        t('profileAllQuestion2_2_Answer4'),

        t('profileAllQuestion2_2_Answer5'),

        t('profileAllQuestion2_2_Answer6'),

        t('profileAllQuestion2_2_Answer7'),

        t('profileAllQuestion2_2_Answer8'),

        t('profileAllQuestion2_2_Answer9'),
      ],
    },
    {
      category: 'ownProperties',
      question: t('profileAllQuestion2_3'),
      answers: [
        t('profileAllQuestion2_3_Answer1'),

        t('profileAllQuestion2_3_Answer2'),

        t('profileAllQuestion2_3_Answer3'),

        t('profileAllQuestion2_3_Answer4'),

        t('profileAllQuestion2_3_Answer5'),
      ],
    },
    {
      category: 'netWorth',
      question: t('profileAllQuestion2_4'),
      answers: [
        t('profileAllQuestion2_4_Answer1'),

        t('profileAllQuestion2_4_Answer2'),

        t('profileAllQuestion2_4_Answer3'),

        t('profileAllQuestion2_4_Answer4'),

        t('profileAllQuestion2_4_Answer5'),

        t('profileAllQuestion2_4_Answer6'),

        t('profileAllQuestion2_4_Answer7'),

        t('profileAllQuestion2_4_Answer8'),

        t('profileAllQuestion2_4_Answer9'),

        t('profileAllQuestion2_4_Answer10'),

        t('profileAllQuestion2_4_Answer11'),

        t('profileAllQuestion2_4_Answer12'),
      ],
    },
    {
      category: 'investIn',
      question: t('profileAllQuestion2_5'),
      answers: [
        t('profileAllQuestion2_5_Answer1'),

        t('profileAllQuestion2_5_Answer2'),

        t('profileAllQuestion2_5_Answer3'),

        t('profileAllQuestion2_5_Answer4'),

        t('profileAllQuestion2_5_Answer5'),

        t('profileAllQuestion2_5_Answer6'),

        t('profileAllQuestion2_5_Answer7'),

        t('profileAllQuestion2_5_Answer8'),
      ],
    },
  ];

  const getCompleteKycApi = async (lang) => {
    await kycLevel1({userNo: user.userNo})
      .then(async (response) => {
        setQuestion([response.data.data]);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  const get2CompleteKycApi = async () => {
    await kycLevel2({userNo: user.userNo})
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion2(response.data.data);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  const getDynamicCompleteKycApi = async (KycLevel) => {
    await getAdvancedKycInfo({
      userNo: user.userNo,
      KycLevel: KycLevel,
      language: language,
    })
      .then(async (response) => {
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

  const cancelHandle = () => {
    setModalVisible(false);
  };

  const confirmHandle = () => {
    props.navigation.navigate('Kyc', {
      KycLevel: 1,
      question: question,
    });
  };

  const confirm2Handle = () => {
    props.navigation.navigate('ProfileIncompleteLevel2', {
      KycLevel: 2,
    });
  };

  const confirm3Handle = (level) => {
    props.navigation.navigate('ProfileIncompleteDetail', {
      KycLevel: level,
    });
  };

  useEffect(() => {
    if (user) {
      setKycLevel(user.userLevel);
    }
  }, [user]);

  useEffect(() => {
    getCompleteKycApi();

    if (kycLevel >= 2) {
      get2CompleteKycApi();
    }

    levelMap.map((data) => {
      if (Number(data.id) <= Number(kycLevel)) {
        getDynamicCompleteKycApi(data.id);
      }
    });
  }, [kycLevel]);

  const RenderItem = (item) => {
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
      <View style={[ResetStyle.containerInner, {justifyContent: 'flex-start'}]}>
        {/* topBackButton */}
        <View style={ResetStyle.topBackButton}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
            />
          </TouchableOpacity>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}></Text>
        </View>

        {/* Level List */}
        <View style={{flexDirection: 'row'}}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* Level List Item */}
            {/* {Object.keys(question).map((data, index) => { */}
            {question.map((data, index) => {
              let Arr = [];
              let i = 0;
              for (const d in data) {
                ++i;

                if (
                  d !== 'userNo' &&
                  d !== 'residentCountryCode' &&
                  d !== 'nationalityCode' &&
                  d !== 'language'
                ) {
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
                        {d === 'gender' && data[d] === '1' && t('profileAll1')}
                        {d === 'gender' && data[d] === '0' && t('profileAll2')}
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
                <View key={'1'}>
                  <View style={[ProfileStyle.kycAllLevelTitle]}>
                    <Text
                      style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                      {t('profileAll3')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // props.navigation.navigate('Kyc', {
                        //   KycLevel: 1,
                        //   question: question,
                        // });
                        setModalVisible(true);
                      }}>
                      <Image
                        style={[ProfileStyle.kycAllLevelImg]}
                        source={require('@images/kycEditIcon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {Arr}
                </View>
              );
            })}
            {/* level 2 start */}
            {kycLevel >= 2 && (
              <View>
                <View
                  style={[ProfileStyle.kycAllLevelTitle, {marginTop: '10%'}]}>
                  <Text style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                    {t('profileAll4')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate('ProfileIncompleteLevel2', {
                      //   KycLevel: 2,
                      // });
                      setModal2Visible(true);
                    }}>
                    <Image
                      style={[ProfileStyle.kycAllLevelImg]}
                      source={require('@images/kycEditIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  bounces={false}
                  // style={{height: '100%'}}
                  data={kycQuestion2}
                  renderItem={({item}) => (
                    // renderItem(questionNumber=data.questionNumber)
                    <RenderItem
                      //?????? ??????
                      question={item.question}
                      category={item.category}
                      answers={item.answers}

                      //?????? ????????? ??????/????????????
                      // typeName={data.typeName}
                      // optionNumber={item.optionNumber}
                      // kycQuestion2={item.kycQuestion2}
                    />
                  )}
                  keyExtractor={(item, index) =>
                    // Number(item.level);
                    index.toString()
                  }
                  extraData={question2}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            {/* level 2 end */}
            {/* level Dynamic start */}
            {/* {kycLevel > 2 && */}

            {levelMap.map((data, index) => {
              if (Number(data.id) <= Number(kycLevel)) {
                return (
                  <View key={index.toString()}>
                    <View
                      style={[
                        ProfileStyle.kycAllLevelTitle,
                        {marginTop: '10%'},
                      ]}>
                      <Text
                        style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                        {t('profileAll5')}
                        {data.id}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          // props.navigation.navigate('ProfileIncompleteDetail', {
                          //   KycLevel: data.id,
                          // });
                          setLevelCheck(data.id);
                          setModal3Visible(true);
                        }}>
                        <Image
                          style={[ProfileStyle.kycAllLevelImg]}
                          source={require('@images/kycEditIcon.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      bounces={false}
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
                          //?????? ??????
                          kycQuestion={item.kycQuestion}
                          questionContent={item.questionContent}
                          kycOption={item.kycOption}
                          optionContent={item.optionContent}
                          //?????? ????????? ??????/????????????
                          // typeName={data.typeName}
                          // optionNumber={item.optionNumber}
                          // kycQuestion={item.kycQuestion}
                        />
                      )}
                      keyExtractor={(item, index) =>
                        // Number(item.level);
                        index.toString()
                      }
                      extraData={questionDynamic}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                    />
                    <TextConfirmCancelVarModal
                      modalVisible={modal3Visible}
                      setModalVisible={setModal3Visible}
                      text={t('profileAll6')}
                      cancel={t('researchForm1')}
                      cancelHandle={cancelHandle}
                      confirm={t('researchForm4')}
                      confirmHandle={confirm3Handle}
                      kycLevel={data.id}
                      levelCheck={levelCheck}
                      // text={`KYC LEVEL ${Number(kycLevel) + 1}??? ?????? ??????????????????.`}
                      // text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
                    />
                  </View>
                );
              } else {
                return false;
              }
            })}
            {/* {[...Array(kycLevel - 2)].map((n, index) => {
              console.log(
                'kycLevel',
                kycLevel,
              );

              // getDynamicCompleteKycApi();
              // i++;
              return (
                <View>
                  <View style={[ProfileStyle.kycAllLevelTitle]}>
                    <Text
                      style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                      KYC LEVEL {kycLevel}
                    </Text>
                  </View>
                  <FlatList
                    style={{height: '100%'}}
                    data={questionDynamic.length === 5 && questionDynamic}
                    renderItem={({item}) => (
                      // renderItem(questionNumber=data.questionNumber)
                      <RenderItemDynamic
                        //?????? ??????
                        kycQuestion={item.kycQuestion}
                        questionContent={item.questionContent}
                        kycOption={item.kycOption}
                        optionContent={item.optionContent}
                        //?????? ????????? ??????/????????????
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
              KycLevel: kycLevel,
              question: question,
            });
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            ?????? ????????????
          </Text>
        </TouchableOpacity> */}
        <TextConfirmCancelModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          text={t('profileAll6')}
          cancel={t('researchForm1')}
          cancelHandle={cancelHandle}
          confirm={t('researchForm4')}
          confirmHandle={confirmHandle}
          // text={`KYC LEVEL ${Number(kycLevel) + 1}??? ?????? ??????????????????.`}
          // text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
        />
        <TextConfirmCancelModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          text={t('profileAll6')}
          cancel={t('researchForm1')}
          cancelHandle={cancelHandle}
          confirm={t('researchForm4')}
          confirmHandle={confirm2Handle}
          // text={`KYC LEVEL ${Number(kycLevel) + 1}??? ?????? ??????????????????.`}
          // text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileAll;
