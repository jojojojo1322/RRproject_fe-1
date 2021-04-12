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
} from 'react-native';

import {server} from '@context/server';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import ProfileStyle from '@style/ProfileStyle.js';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const ProfileCompleteDetail = (props) => {
  const {t, i18n} = useTranslation();
  const [question, setQuestion] = useState([]);
  const [question1, setQuestion1] = useState([]);
  const [question2, setQuestion2] = useState([]);
  const [question3, setQuestion3] = useState([]);
  const [question4, setQuestion4] = useState([]);
  const [question5, setQuestion5] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const {language, user} = useSelector(({language, auth}) => ({
    language: language.language,
    user: auth.user,
  }));

  const getCompleteKycApi = async () => {
    await axios
      .get(
        `${server}/kyc/${user.userNo}/${props.route.params?.KycLevel}/${language}`,
        // `${server}/user/user?userNo=210127104026300`,
      )
      .then(async (response) => {
        console.log('ProfileCompleteDetail THEN', response.data.data);
        setQuestion(response.data.data);
        setQuestion1(
          response.data.data.filter((data) => data.kycQuestion === '1'),
        );
        setQuestion2(
          response.data.data.filter((data) => data.kycQuestion === '2'),
        );
        setQuestion3(
          response.data.data.filter((data) => data.kycQuestion === '3'),
        );
        setQuestion4(
          response.data.data.filter((data) => data.kycQuestion === '4'),
        );
        setQuestion5(
          response.data.data.filter((data) => data.kycQuestion === '5'),
        );
      })
      .catch((e) => {
        console.log('ProfileCompleteDetail ERROR', e);
      });
  };

  useEffect(() => {
    getCompleteKycApi();
  }, []);

  const renderItem = () => {};
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
        <ScrollView>
          {/* Level List Item */}
          {question.map((data, index) => {
            let Arr = [];
            let i = 0;
            for (d in data) {
              ++i;
              // console.log('a', Object.keys(d).length);
              Arr.push(
                <View
                  style={[
                    ProfileStyle.kycAllLevelListItem,
                    {
                      borderBottomWidth: i != Object.keys(data).length ? 1 : 0,
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
                      ]}>
                      {data}
                    </Text>
                  </View>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 15, marginTop: 3},
                    ]}>
                    {data[d]}
                  </Text>
                </View>,
              );
            }
            return (
              <View>
                <View style={[ProfileStyle.kycAllLevelTitle]}>
                  <Text style={[ResetStyle.fontRegularK, {fontWeight: '500'}]}>
                    {t('profileCompleteDetailList1', {kycLevel: index + 1})}
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
            props.navigation.navigate('ProfileIncompleteDetail', {
              KycLevel: props.route.params?.KycLevel,
            });
          }}>
          <Text style={[ResetStyle.buttonTexts, {fontSize: 20}]}>
            {t('profileCompleteDetailListNextButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCompleteDetail;
