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
} from 'react-native';

import {server} from '@context/server';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ProfileCompleteLevel1 = (props) => {
  const {t, i18n} = useTranslation();
  const [question, setQuestion] = useState([]);

  // 언어 api 배열
  const [lang, setLang] = useState([]);
  // 가져온 나열된 코드 -> 언어 native name으로 변환
  const [fixLang, setFixLang] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

  // const getLanguageApi = async () => {
  //   await axios
  //     .get(`${server}/util/global/languages`)
  //     .then(async (response) => {
  //       console.log('getLanguageApi THEN>>', response);
  //       setLang(response.data);
  //       getCompleteKycApi(response.data);
  //     })
  //     .catch((e) => {
  //       console.log('getLanguageApi ERROR>>', e);
  //     });
  // };

  const getCompleteKycApi = async (lang) => {
    await axios
      .get(`${server}/kyc/1/${user.userNo}`)
      .then(async (response) => {
        console.log('getCompleteKycApi THEN>>', response.data.data);
        // let fix = response.data.data;

        // let fixQ = fix.language.split(',');
        // let fixArr = '';

        // fixQ.map((data) => {
        //   lang.map((d) => {
        //     if (data === d.languageCode) {
        //       fixArr += `${d.nativeName},`;
        //     }
        //   });
        // });
        // fixArr = fixArr.substr(0, fixArr.length - 1);
        // setFixLang(fixArr);
        // fix.language = fixArr;

        setQuestion([response.data.data]);
      })
      .catch((e) => {
        console.log('getCompleteKycApi ERROR>>', e);
      });
  };

  useEffect(() => {
    // getLanguageApi();
    getCompleteKycApi();
  }, []);

  // useEffect(() => {
  //   // console.log('lang', lang);
  //   if (lang != '' && question != '') {
  //     console.log('lang', lang);
  //     console.log('question', question);
  //     let fixQ = question[0].language.split(',');
  //     let fixArr = '';
  //     console.log('fixQ', fixQ);
  //     fixQ.map((data) => {
  //       lang.map((d) => {
  //         console.log('data', data);
  //         console.log('d.languageCode', d.languageCode);
  //         if (data === d.languageCode) {
  //           fixArr += `${d.nativeName},`;
  //         }
  //       });
  //     });
  //     fixArr = fixArr.substr(0, fixArr.length - 1);
  //     setFixLang(fixArr);
  //     question[0].language = fixArr;
  //     console.log('fixArrfixArrfixArr', fixArr);

  //     // question;
  //   }
  // }, [lang, question]);

  const cancelHandle = () => {
    setModalVisible(false);
  };
  const confirmHandle = () => {
    props.navigation.navigate('Kyc', {
      KycLevel: props.route.params?.KycLevel,
      question: question,
    });
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
          {/* <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}></Text> */}
        </View>

        {/* Level List */}
        <ScrollView key={'1'}>
          {/* Level List Item */}
          {/* {Object.keys(question).map((data, index) => { */}
          {question.map((data, index) => {
            let Arr = [];
            let i = 0;
            for (const d in data) {
              ++i;
              // console.log('asdasd', i == Object.keys(data).length);
              // console.log('a', Object.keys(d).length);
              if (
                d !== 'userNo' &&
                d !== 'residentCountryCode' &&
                d !== 'nationalityCode' &&
                d !== 'language'
              ) {
                Arr.push(
                  <View
                    key={(index + i).toString()}
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
                            // marginBottom: '3%',
                          },
                        ]}>
                        {d}
                      </Text>
                    </View>
                    <Text
                      style={[
                        ResetStyle.fontRegularK,
                        ResetStyle.fontDG,
                        {
                          width: '100%',
                          textAlign: 'left',
                          marginLeft: '5%',
                          marginTop: '2%',
                        },
                      ]}>
                      {d === 'gender' && data[d] === '1' && '남자'}
                      {d === 'gender' && data[d] === '0' && '여자'}
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
                      {d !== 'relationShipStatus' && d !== 'gender' && data[d]}
                    </Text>
                  </View>,
                );
              }
            }
            return (
              <View key={'1'}>
                <View style={[ProfileStyle.kycAllLevelTitle]}>
                  <Text style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                    {/* KYC LEVEL {props.route.params?.KycLevel} */}
                    {t('profileCompleteLevel1Title', {
                      kycLevel: props.route.params?.KycLevel,
                    })}
                  </Text>
                </View>
                {Arr}
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={[ResetStyle.button]}
          onPress={() => {
            // props.navigation.navigate('Kyc', {
            //   KycLevel: props.route.params?.KycLevel,
            //   question: question,
            // });
            setModalVisible(true);
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            {t('profileCompleteLevel1_1')}
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

export default ProfileCompleteLevel1;
