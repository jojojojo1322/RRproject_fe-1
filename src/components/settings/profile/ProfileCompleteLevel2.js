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
import TextConfirmCancelModal from '../../factory/modal/TextConfirmCancelModal';
import {useTranslation} from 'react-i18next';

const ProfileCompleteLevel2 = (props) => {
  const {t, i18n} = useTranslation();
  const [question, setQuestion] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const getCompleteKycApi = async () => {
    await axios
      .get(`${server}/kyc/2/${await AsyncStorage.getItem('userNo')}`)
      .then(async (response) => {
        console.log(response.data.data);
        setQuestion(response.data.data);
      })
      .catch((e) => {
        console.log('Error', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);
  const cancelHandle = () => {
    setModalVisible(false);
  };
  const confirmHandle = () => {
    props.navigation.navigate('ProfileIncompleteLevel2', {
      KycLevel: props.route.params?.KycLevel,
    });
  };
  const RenderItem = (item) => {
    // console.log(item.answers);
    let answerNo = 0;
    item.category === 'employmentStatus' &&
      (answerNo = question.employmentStatus);
    item.category === 'annualRevenue' && (answerNo = question.annualRevenue);
    item.category === 'ownProperties' && (answerNo = question.ownProperties);
    item.category === 'netWorth' && (answerNo = question.netWorth);
    item.category === 'investIn' && (answerNo = question.investIn);

    return (
      <View
        key={item.toString()}
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

        <View>
          <View style={[ProfileStyle.kycAllLevelTitle]}>
            <Text style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
              {t('profileCompleteLevel2Title', {
                kycLevel: props.route.params?.KycLevel,
              })}
            </Text>
          </View>
          <FlatList
            style={{height: '80%'}}
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
            keyExtractor={(item, index) =>
              // Number(item.level);
              index.toString()
            }
            extraData={question}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            // props.navigation.navigate('ProfileIncompleteLevel2', {
            //   KycLevel: props.route.params?.KycLevel,
            // });
            setModalVisible(true);
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            {t('profileCompleteLevel2_1')}
          </Text>
        </TouchableOpacity>
        <TextConfirmCancelModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          text={t('profileAll6')}
          cancel={t('researchForm1')}
          cancelHandle={cancelHandle}
          confirm={t('researchForm4')}
          confirmHandle={confirmHandle}
          // text={`KYC LEVEL ${Number(kycLevel) + 1}을 먼저 완료해주세요.`}
          // text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileCompleteLevel2;
