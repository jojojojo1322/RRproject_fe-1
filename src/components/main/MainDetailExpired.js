import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityBase,
  Platform,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import Reset from '../resetPassword/Reset.js';

import AudienceModal from '../factory/modal/AudienceModal';
import TextConfirmCancelModal from '../factory/modal/TextConfirmCancelModal';
import TextConfirmModal from '../factory/modal/TextConfirmModal';

import CarrierInfo from 'react-native-carrier-info';
import {useTranslation} from 'react-i18next';

import Moment from 'react-moment';

const MainDetailExpired = (props) => {
  const {t, i18n} = useTranslation();
  // audience detail modal
  const [modalVisible, setModalVisible] = useState(false);

  // audience check kyc warning 경고모달
  const [modal2Visible, setModal2Visible] = useState(false);
  // audience check 해당인원 x warning 경고모달
  const [modal3Visible, setModal3Visible] = useState(false);

  const [surveyDetail, setSurveyDetail] = useState([]);
  const [audience, setAudience] = useState([]);
  const [audienceLanguage, setAudienceLanguage] = useState('');
  const [audienceAge, setAudienceAge] = useState('');
  const [audienceCheck, setAudienceCheck] = useState(1);

  const [userNo, setUserNo] = useState('');
  // let audienceCheck = '';
  // const getSurveyDetailApi = () => {
  //   axios.get(`${server}/survey/detail`);
  // };
  const surveyDetailApi = async () => {
    await axios
      .get(
        `${server}/survey/detail?deviceLanguageCode=${await AsyncStorage.getItem(
          'deviceLanguage',
        )}&legacySurveyId=${
          props.route.params?.legacySurveyId
        }&userNo=${await AsyncStorage.getItem('userNo')}`,
      )
      .then(async (response) => {
        console.log(`surveyDetailApi Then >>`, response);
        setSurveyDetail(response.data.resSurvey);
        setUserNo(await AsyncStorage.getItem('userNo'));
      })
      .catch((e) => {
        console.log(`surveyDetailApi Error`, e);
      });
  };
  const AudienceCheckApi = async (surveyId) => {
    axios
      .post(`${server}/survey/audience`, {
        surveyId: String(surveyId),
        userNo: await AsyncStorage.getItem('userNo'),
      })
      .then(async (response) => {
        console.log(`AudienceCheckApi Then >>`, response);
        setAudienceCheck(response.data.ret_val);
      })
      .catch((e) => {
        console.log(`AudienceCheckApi Error`, e);
      });
  };
  const AudienceApi = async () => {
    await axios
      .get(
        `${server}/survey/audience/info?legacySurveyId=${props.route.params?.legacySurveyId}`,
      )
      .then(async (response) => {
        console.log(`AudienceApi Then >>`, response);
        setAudience(response.data);
        AudienceCheckApi(response.data.surveyId);
        if (response.data.language === 'all') {
          setAudienceLanguage('all');
        } else {
          let languageFix = '';
          let lan = response.data.language;
          lan.split(',').map((data) => {
            if (data === 'en') {
              if (languageFix.length === 0) {
                languageFix += 'English';
              } else {
                languageFix += ',English';
              }
            } else if (data === 'ko') {
              if (languageFix.length === 0) {
                languageFix += 'Korean';
              } else {
                languageFix += ',Korean';
              }
            } else if (data === 'es') {
              if (languageFix.length === 0) {
                languageFix += 'Spanish';
              } else {
                languageFix += ',Spanish';
              }
            } else if (data === 'ru') {
              if (languageFix.length === 0) {
                languageFix += 'Russian';
              } else {
                languageFix += ',Russian';
              }
            } else if (data === 'pt') {
              if (languageFix.length === 0) {
                languageFix += 'Portuguese';
              } else {
                languageFix += ',Portuguese';
              }
            }
          });

          setAudienceLanguage(languageFix);
        }
        let age = response.data.dateOfBirth;
        let ageFix = '';
        let ageMax = age.split(',')[0];
        let ageMin = age.split(',')[1];
        let ageMod = 0;
        if (ageMax <= ageMin) {
          let ageMode = ageMax;
          ageMax = ageMin;
          ageMin = ageMode;
        }

        ageFix += `${ageMin}-${ageMax}`;
        setAudienceAge(ageFix);
        console.log('response.data.dayOfBirth.split())= ', ageFix);
      })
      .catch((e) => {
        console.log(`AudienceApi Error`, e);
      });
  };
  useEffect(() => {
    // CarrierInfo.allowsVOIP()
    //   .then((result) => {
    //     console.log('CarrierInfo>>then>>>>', result);
    //   })
    //   .catch((e) => {
    //     console.log('error>>>>', e);
    //   });
    // CarrierInfo.carrierName()
    //   .then((result) => {
    //     console.log('CarrierName>>then>>>>', result);
    //   })
    //   .catch((e) => {
    //     console.log('error>>>>', e);
    //   });
    // ////유심 체크 (끼어져 있는 유심이 공유심인지는 체크 불가)
    // CarrierInfo.mobileNetworkCode()
    //   .then((result) => {
    //     console.log('mobileNetworkCode>>then>>>>', result);
    //   })
    //   .catch((e) => {
    //     console.log('error>>>>', e);
    //   });
    // CarrierInfo.mobileNetworkOperator()
    //   .then((result) => {
    //     console.log('mobileNetworkOperator>>then>>>>', result);
    //   })
    //   .catch((e) => {
    //     console.log('error>>>>', e);
    //   });
    surveyDetailApi();
    AudienceApi();
  }, []);
  const audienceCheckHandle = async () => {
    // AudienceCheckApi();
    console.log('audienceCheck', audienceCheck);
    if (audienceCheck === 0) {
      props.navigation.navigate('ResearchForm', {
        legacySurveyId: props.route.params?.legacySurveyId,
        // legacySurveyId: '5f91aad0ae28561b056e2f97',
        surveyName: surveyDetail.surveyName,
        sponsorName: surveyDetail.sponsorName,
      });
    }
  };
  // TextConfirmCancelModal handler
  const cancelHandle = () => {
    props.navigation.navigate('Main');
  };
  const confirmHandle = () => {
    props.navigation.navigate('ProfileMain');
  };
  console.log('surveyDetailsurveyDetailsurveyDetail', surveyDetail);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <ScrollView style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
            paddingBottom: Platform.OS === 'ios' ? '6%' : '2%',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
              {surveyDetail.categoryName}
            </Text>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}> | </Text>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
              {surveyDetail.sponsorName}
            </Text>
          </View>

          {/* <TouchableOpacity>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/survey_detail_share_icon.png')}
              />
            </TouchableOpacity> */}
        </View>

        <View style={{marginBottom: 30}}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              {textAlign: 'left', marginTop: 10},
            ]}>
            {surveyDetail.surveyName}
          </Text>
        </View>
        <View
          style={{
            //   flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
              +{surveyDetail.reward}
            </Text>
            <Text
              style={[ResetStyle.fontRegularK, ResetStyle.fontB, {padding: 5}]}>
              TNC
            </Text>
          </View>
          <TouchableOpacity
            style={[ResetStyle.buttonSmall]}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
              {t('')}
              Audience
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#dedede',
            marginBottom: 30,
          }}></View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left'},
          ]}>
          Ends In | 00일 00시간 00분 00초
        </Text>
        <View
          style={{
            position: 'relative',
            width: '100%',
            height: 3,
            alignSelf: 'center',
            marginTop: '3%',
            marginBottom: '2%',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#d7d7d7',
            }}></View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${
                (surveyDetail.participants / surveyDetail.particRestrictions) *
                100
              }%`,
              height: '100%',
              backgroundColor: '#0080ff',
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '2%',
          }}>
          <Text style={[ResetStyle.fontLightK, ResetStyle.fontB]}>
            {`${surveyDetail.participants} / ${
              surveyDetail.particRestrictions
            }${'\n'}`}
          </Text>
        </View>
        <View
          style={{
            position: 'relative',
            height: 260,
          }}>
          <Image
            style={{
              //   position: 'relative',
              left: '-6%',
              width: '112%',
              height: '100%',
              resizeMode: 'cover',
            }}
            source={{uri: surveyDetail.categoryImg}}
          />
        </View>

        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {
              textAlign: 'left',
              lineHeight: 28,
              marginTop: 20,
              marginBottom: 30,
            },
          ]}>
          {surveyDetail.instructions}
        </Text>

        <TouchableOpacity
          style={[
            ResetStyle.button,
            {
              marginBottom: Platform.OS === 'ios' ? 0 : '5%',
              backgroundColor: '#e6e6e6',
            },
          ]}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {
                fontWeight: '600',
              },
            ]}>
            EXPRIED
          </Text>
        </TouchableOpacity>

        <AudienceModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          level={audience.audienceLevel}
          age={audienceAge}
          gender={
            audience.gender === 'all'
              ? t('mainDetail3')
              : audience.gender === '0'
              ? t('mainDetail4')
              : audience.gender === '1'
              ? t('mainDetail5')
              : audience.gender === 'all'
              ? t('mainDetail6')
              : ''
          }
          maritalStatus={audience.relationShipStatus}
          nationality={audience.nationality}
          country={audience.residentCountry}
          countryCity={audience.residentCity}
          language={audienceLanguage}
        />
        <TextConfirmCancelModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          text={t('mainDetail7')}
          confirm={t('mainDetail8')}
          confirmHandle={confirmHandle}
          cancel={t('mainDetail9')}
          cancelHandle={cancelHandle}
        />
        <TextConfirmModal
          modalVisible={modal3Visible}
          setModalVisible={setModal3Visible}
          text={t('mainDetail10')}
          confirm={t('mainDetail11')}
          handleNextPage={cancelHandle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainDetailExpired;
