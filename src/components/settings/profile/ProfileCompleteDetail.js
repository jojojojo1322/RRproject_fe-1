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
import {useSelector} from 'react-redux';

import {server} from '@context/server';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';
import {useTranslation} from 'react-i18next';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';
// import {FlatList} from 'react-native-gesture-handler';
import {getAdvancedKycInfo} from '@repository/kycRepository';

const ProfileCompleteDetail = (props) => {
  const {t, i18n} = useTranslation();
  const [question, setQuestion] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const {language, user} = useSelector(({auth, language}) => ({
    language: language.language,
    user: auth.user,
  }));

  const getCompleteKycApi = async () => {
    await getAdvancedKycInfo({
      userNo: user.userNo,
      KycLevel: props.route.params?.KycLevel,
      language: language,
    })
      .then(async (response) => {
        console.log('getCompleteKycApi THEN>>>', response.data.data);
        setQuestion(response.data.data);
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

        setQuestion(AllARR);
      })
      .catch((e) => {
        console.log('getCompleteKycApi ERROR>>>', e);
      });
  };
  const cancelHandle = () => {
    setModalVisible(false);
  };
  const confirmHandle = () => {
    props.navigation.navigate('ProfileIncompleteDetail', {
      KycLevel: props.route.params?.KycLevel,
    });
  };
  useEffect(() => {
    getCompleteKycApi();
  }, []);

  const RenderItem = (item) => {
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
              {t('profileCompleteDetailTitle', {
                kycLevel: props.route.params?.KycLevel,
              })}
            </Text>
          </View>
          <FlatList
            bounces={false}
            style={{height: '80%'}}
            data={question.length === 5 && question}
            renderItem={({item}) => (
              // renderItem(questionNumber=data.questionNumber)
              <RenderItem
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
            extraData={question}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            // props.navigation.navigate('ProfileIncompleteDetail', {
            //   KycLevel: props.route.params?.KycLevel,
            // });
            setModalVisible(true);
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            {t('profileCompleteDetail1')}
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
          // text={`KYC LEVEL ${Number(kycLevel) + 1}??? ?????? ??????????????????.`}
          // text={t('profileMain8', {kyclevel: Number(kycLevel) + 1})}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileCompleteDetail;
