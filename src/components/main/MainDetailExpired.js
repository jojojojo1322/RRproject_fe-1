import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import MainStyle from '../../style/MainStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';

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
      <ScrollView>
        <View style={[MainStyle.mainDetailContainerInner]}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '15%',
              paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
              paddingBottom: Platform.OS === 'ios' ? '4%' : '2%',
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 22,
                height: Platform.OS === 'ios' ? 28 : 22,
                resizeMode: 'contain',
              }}
              source={require('../../imgs/backIcon.png')}
            />
          </TouchableOpacity>

          <View style={[MainStyle.mainDetailSurveyCategory]}>
            <View style={[MainStyle.mainDetailSurveyCategoryInner]}>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                {surveyDetail.categoryName}
              </Text>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                {' '}
                |{' '}
              </Text>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                {surveyDetail.sponsorName}
              </Text>
            </View>

            {/* <TouchableOpacity>
              <Image
                source={require('../../imgs/shareIcon.png')}
              />
            </TouchableOpacity> */}
          </View>

          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              MainStyle.mainDetailSurveyTitle,
            ]}>
            {surveyDetail.surveyName}
          </Text>
          <View style={[MainStyle.mainDetailTncAudienceView]}>
            <View style={[MainStyle.mainDetailTnc]}>
              <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
                +{surveyDetail.reward}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {padding: 5},
                ]}>
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
          <View style={[MainStyle.mainDetailGrayLine]} />
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              MainStyle.mainDetailEndsIn,
            ]}>
            Ends In | 00일 00시간 00분 00초
          </Text>
          <View style={[MainStyle.mainDetailProgressView]}>
            <View style={[MainStyle.mainDetailProgressBackBar]} />
            <View
              style={[
                MainStyle.mainDetailProgressFrontBar,
                {
                  width: `${
                    (surveyDetail.participants /
                      surveyDetail.particRestrictions) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
          <View style={[MainStyle.mainDetailParticipant]}>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontB]}>
              {`${surveyDetail.participants} / ${
                surveyDetail.particRestrictions
              }${'\n'}`}
            </Text>
          </View>
        </View>
        <Image
          style={[MainStyle.mainDetailImg]}
          source={{uri: surveyDetail.categoryImg}}
        />

        <View style={[MainStyle.mainDetailBottomView]}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              MainStyle.mainDetailSurveyInstruction,
            ]}>
            {surveyDetail.instructions}
          </Text>

          <TouchableOpacity
            style={[ResetStyle.button, MainStyle.mainDetailNextButton]}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainDetailExpired;
