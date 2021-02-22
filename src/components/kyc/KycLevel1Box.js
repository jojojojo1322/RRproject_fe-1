import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import KycFirst from './KycFirst';
import KycSecond from './KycSecond';
import KycThird from './KycThird';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import TextConfirmModal from '../factory/modal/TextConfirmModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

function isBirthday(dateStr) {
  if (dateStr === undefined) {
    return false;
  } else {
    var year = Number(dateStr.substr(0, 4));
    // 입력한 값의 0~4자리까지 (연)
    var month = Number(dateStr.substr(4, 2));
    // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
    var day = Number(dateStr.substr(6, 2));
    // 입력한 값 6번째 자리부터 2자리 숫자 (일)
    var today = new Date();
    // 날짜 변수 선언
    var yearNow = today.getFullYear();
    // 올해 연도 가져옴
    if (dateStr.length <= 8) {
      // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
      if (1900 > year || year > yearNow) {
        return false;
      } else if (month < 1 || month > 12) {
        return false;
      } else if (day < 1 || day > 31) {
        return false;
      } else if (
        (month == 4 || month == 6 || month == 9 || month == 11) &&
        day == 31
      ) {
        return false;
      } else if (month == 2) {
        var isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if (day > 29 || (day == 29 && !isleap)) {
          return false;
        } else {
          return true;
        }
        //end of if (day>29 || (day==29 && !isleap))
      } else {
        return true;
      } //end of if
    } else {
      //1.입력된 생년월일이 8자 초과할때 : auth:false
      return false;
    }
  }
}

class KycLevel1Box extends Component {
  state = {
    gender:
      this.props.route.params?.gender == undefined
        ? ''
        : this.props.route.params?.gender,
    maritalStatus:
      this.props.route.params?.maritalStatus == undefined
        ? ''
        : this.props.route.params?.maritalStatus,
    step: this.props.route.params?.step,
    birth: this.props.route.params?.birth,
    // birth: '',
    country: '',
    countryCd: '',
    countryCity: '',
    countryResidence: '',
    countryResidenceCd: '',

    languageCd: '',
    language: '',
    originalLan: [],
    modalVisible: false,
    modal1Visible: false,
    returnValue: '',

    updateCheck: false,
    updateUserData: [],
  };

  kycGetApi = async () => {
    await axios
      .get(`${server}/kyc/1/${await AsyncStorage.getItem('userNo')}`)
      .then((response) => {
        console.log('kycGetApi THEN>>', response.data);
        console.log(response.data.ret_val);
        if (response.data.response.ret_val === 0) {
          this.setState({
            updateUserData: response.data.data,
          });
        } else {
          // this.setState({
          //   updateUserData: [
          //     {
          //       gender: '',
          //       relationShipStatus: '',
          //       dateOfBirth: '',
          //       nationality: '',
          //       nationalityCode: '',
          //       languageNativeName: '',
          //       language: '',
          //       residentCountry: '',
          //       residentCountryCode: '',
          //       residentCity: '',
          //     },
          //   ],
          // });
        }
      })
      .catch((e) => {
        console.log('kycGetApi ERROR>>', e);
      });
  };

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  setModal1Visible = (visible) => {
    this.setState({
      modal1Visible: visible,
    });
  };
  handleNextPage = () => {
    if (this.state.updateCheck === false) {
      this.props.navigation.navigate('Login');
    } else if (this.state.updateCheck === true) {
      this.props.navigation.navigate('ProfileMain');
    }
  };

  setCountry = (country, cd, phone) => {
    this.setState({country: country, countryCd: cd});
  };
  setLanguage = (lang, langCd) => {
    console.log('Language', lang);
    this.setState({languageCd: langCd, language: lang});
  };
  setResidenceCountry = (countryResidence, countryResidenceCd) => {
    this.setState({
      countryResidence: countryResidence,
      countryResidenceCd: countryResidenceCd,
    });
  };
  setResidenceCity = (visible) => {
    console.log(visible);
    this.setState({countryCity: visible});
  };
  KycUpdateApi = async (
    birthday,
    country,
    countryCd,
    countryCity,
    countryResidence,
    countryResidenceCd,
    gender,
    language,
    languageCd,
    marriageStatus,
  ) => {
    const userNo = await AsyncStorage.getItem('userNo');
    console.log({
      dateOfBirth: birthday,
      gender: gender,
      language: language,
      languageCd: languageCd,

      nationality: country,
      nationalityCode: countryCd,
      relationShipStatus: marriageStatus,
      residentCity: countryCity,
      residentCountry: countryResidence,
      residentCountryCode: countryResidenceCd,
    });
    await axios
      .patch(`${server}/kyc/1/${userNo}`, {
        dateOfBirth: birthday,
        gender: gender,
        language: languageCd,
        languageNativeName: language,
        nationality: country,
        nationalityCode: countryCd,
        relationShipStatus: marriageStatus,
        residentCity: countryCity,
        residentCountry: countryResidence,
        residentCountryCode: countryResidenceCd,
      })
      .then((response) => {
        console.log('KycUpdateApi THEN>>>>', response);
        console.log(response.data.ret_val);
        this.setState({
          returnValue: response.data.ret_val,
        });
      })
      .catch((e) => {
        console.log('KycUpdateApi Error>>>>', e);
      });
  };
  KycInsertApi = async (
    birthday,
    country,
    countryCd,
    countryCity,
    countryResidence,
    countryResidenceCd,
    gender,
    language,
    languageCd,
    marriageStatus,
  ) => {
    const userNo = await AsyncStorage.getItem('userNo');
    console.log('userNo', userNo);
    console.log({
      dateOfBirth: birthday,
      gender: gender,
      language: language,
      language: languageCd,

      nationality: country,
      nationalityCode: countryCd,
      relationShipStatus: marriageStatus,
      residentCity: countryCity,
      residentCountry: countryResidence,
      residentCountryCode: countryResidenceCd,

      userNo: userNo,
    });
    await axios
      .post(`${server}/kyc/1`, {
        dateOfBirth: birthday,
        gender: gender,
        language: languageCd,
        languageNativeName: language,
        nationality: country,
        nationalityCode: countryCd,
        relationShipStatus: marriageStatus,
        residentCity: countryCity,
        residentCountry: countryResidence,
        residentCountryCode: countryResidenceCd,

        userNo: userNo,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.ret_val);
        this.setState({
          returnValue: response.data.ret_val,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleBirth = (value) => {
    console.log(value);
    this.setState({
      birth: value,
    });
    console.log('aaaaaaa');
  };

  handleGender = (value) => {
    console.log(value);
    this.setState({
      gender: value,
    });
  };
  handleMarital = (value) => {
    console.log(value);
    this.setState({
      maritalStatus: value,
    });
  };
  componentDidUpdate(preProps, preState) {
    if (preState.languageCd !== this.state.languageCd) {
      console.log('trans~~~~~~~~~');
    }
    if (preState.updateCheck !== this.state.updateCheck) {
      console.log('updateChecksdfk;anvk;abdjnsvk;djnsv');
    }
    if (this.props.route.params?.question !== undefined) {
      if (this.state.updateCheck === false) {
        const {updateUserData} = this.state;
        console.log('updateUSUSUSUSUSUSU', updateUserData);
        this.setState({
          updateCheck: true,
          gender: updateUserData.gender,
          maritalStatus: updateUserData.relationShipStatus,
          birth: updateUserData.dateOfBirth,
          nationality: updateUserData.nationality,
          countryCd: updateUserData.nationalityCode,
          language: updateUserData.languageNativeName,
          languageCd: updateUserData.language,
          countryResidence: updateUserData.residentCountry,
          countryResidenceCd: updateUserData.residentCountryCode,
          countryCity: updateUserData.residentCity,
        });
      }
    }
    console.log('this.state.birth', this.state.birth);
    if (this.state.step === 2 && this.state.birth === undefined) {
      const {updateUserData} = this.state;
      this.setState({
        birth: updateUserData.dateOfBirth,
      });
    }
    if (
      this.state.step === 3 &&
      this.state.country === '' &&
      this.state.countryCity === '' &&
      this.state.countryResidence === ''
    ) {
      const {updateUserData} = this.state;
      let fixLan = [];
      if (updateUserData.language) {
        let lanCd = updateUserData.language.split(',');
        let lan = updateUserData.languageNativeName.split(',');

        // {key: 1, value: "ab", label: "Аҧсуа"}

        lanCd.map((data, index) => {
          lan.map((data2, index2) => {
            if (index === index2) {
              fixLan = fixLan.concat({key: 1, value: data, label: data2});
            }
          });
        });
      }
      this.setState({
        updateCheck: true,
        nationality: updateUserData.nationality,
        countryCd: updateUserData.nationalityCode,

        language: updateUserData.languageNativeName,
        languageCd: updateUserData.language,
        originalLan: fixLan,
        countryResidence: updateUserData.residentCountry,
        countryResidenceCd: updateUserData.residentCountryCode,
        countryCity: updateUserData.residentCity,
      });
    }
    if (preProps.route.params?.question !== this.props.route.params?.question) {
      console.log(
        'questionasldknjsavkjanbdfvkljbnvlkjednvquestionasldknjsavkjanbdfvkljbnvlkjednvquestionasldknjsavkjanbdfvkljbnvlkjednv;jcnvs;kLDcnv',
      );
    }

    console.log({
      birth: this.state.birth,
      country: this.state.country,
      countryCd: this.state.countryCd,
      countryCity: this.state.countryCity,
      countryResidence: this.state.countryResidence,
      countryResidenceCd: this.state.countryResidenceCd,
      gender: this.state.gender,
      languageCd: this.state.languageCd,
      maritalStatus: this.state.maritalStatus,
    });
  }
  componentDidMount() {
    this.kycGetApi();
  }

  render() {
    const {t} = this.props;
    // const {navigation} = this.props;
    // const itemId = navigation.getParam('step');
    console.log('na>>>>', this.props.route.params?.step);
    console.log('na>>>>', this.state.step);
    console.log('gender>>', this.state.gender);
    console.log('maritalStatus>>', this.state.maritalStatus);
    console.log('birth>>', this.state.birth);
    // console.log(itemId);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View style={styles.topAll}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                {
                  fontSize: 25,
                  fontWeight: '400',
                  marginBottom: Platform.OS === 'ios' ? '13%' : '9%',
                },
              ]}>
              {t('kyc1')}
            </Text>

            <View
              style={[
                styles.ktitAll,
                {marginBottom: Platform.OS === 'ios' ? '19%' : '10%'},
              ]}>
              <Image
                style={[
                  AuthStyle.topCheckbutton,
                  {
                    marginRight: 4,
                  },
                ]}
                source={require('../../imgs/kycCheckedIcon.png')}
              />
              <View style={styles.ktilMiddle}></View>
              {this.state.step == undefined ? (
                <Image
                  style={[
                    AuthStyle.topCheckbutton,
                    {
                      marginRight: 4,
                      marginLeft: 4,
                    },
                  ]}
                  source={require('../../imgs/kycUncheckIcon.png')}
                />
              ) : (
                <Image
                  style={[
                    AuthStyle.topCheckbutton,
                    {
                      marginRight: 4,
                      marginLeft: 4,
                    },
                  ]}
                  source={require('../../imgs/kycCheckedIcon.png')}
                />
              )}
              <View style={styles.ktilMiddle}></View>
              {this.state.step == 2 || this.state.step == undefined ? (
                <Image
                  style={[
                    AuthStyle.topCheckbutton,
                    {
                      marginRight: 4,
                      marginLeft: 4,
                    },
                  ]}
                  source={require('../../imgs/kycUncheckIcon.png')}
                />
              ) : (
                <Image
                  style={[
                    AuthStyle.topCheckbutton,
                    {
                      marginRight: 4,
                      marginLeft: 4,
                    },
                  ]}
                  source={require('../../imgs/kycCheckedIcon.png')}
                />
              )}
            </View>
            {this.state.step == undefined && (
              <KycFirst
                handleMarital={this.handleMarital}
                handleGender={this.handleGender}
                maritalStatus={this.state.maritalStatus}
                gender={this.state.gender}
              />
            )}
            {this.state.step == 2 && (
              <KycSecond
                birth={this.state.birth}
                handleBirth={this.handleBirth}
              />
            )}
            {this.state.step == 3 && (
              <KycThird
                birth={this.state.birth}
                handleBirth={this.handleBirth}
                setCountry={this.setCountry}
                setLanguage={this.setLanguage}
                setResidenceCountry={this.setResidenceCountry}
                setResidenceCity={this.setResidenceCity}
                Kcountry={this.state.countryCd}
                Klanguage={this.state.language}
                KlanguageCd={this.state.languageCd}
                KresidenceCountry={this.state.countryResidence}
                KresidenceCity={this.state.countryCity}
                KoriginalLan={this.state.originalLan}
              />
              // updateCheck: true,
              // gender: response.data.data.gender,
              // maritalStatus: response.data.data.relationShipStatus,
              // birth: response.data.data.dateOfBirth,
              // nationality: response.data.data.nationality,
              // countryCd: response.data.data.nationalityCode,
              // languageCd: response.data.data.language,
              // countryResidence: response.data.data.residentCountry,
              // countryResidenceCd: response.data.data.residentCountryCode,
              // countryCity: response.data.data.residentCity,
            )}
          </View>

          <View style={styles.bottomButtonAll}>
            <TouchableOpacity
              style={
                this.state.step == undefined &&
                this.state.maritalStatus != '' &&
                this.state.gender != ''
                  ? ResetStyle.button
                  : this.state.step == 2 &&
                    this.state.birth !== undefined &&
                    isBirthday(this.state.birth.replace(/\-/g, ''))
                  ? ResetStyle.button
                  : this.state.step == 3 &&
                    this.state.countryCd !== '' &&
                    this.state.languageCd !== '' &&
                    this.state.countryResidence !== '' &&
                    this.state.countryCity !== ''
                  ? ResetStyle.button
                  : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
                // this.state.gender != '' && this.state.maritalStatus != ''
                //   ? styles.buttonChoice
                //   : styles.button
              }
              onPress={async () => {
                if (this.state.step == undefined) {
                  this.state.gender != '' &&
                    this.state.maritalStatus != '' &&
                    this.props.navigation.push('Kyc', {
                      step: this.state.step == undefined ? 2 : 3,
                      gender: this.state.gender,
                      maritalStatus: this.state.maritalStatus,
                    });
                } else if (this.state.step == 2) {
                  console.log(this.state.birth.replace(/\-/g, ''));
                  isBirthday(this.state.birth.replace(/\-/g, '')) &&
                    this.props.navigation.push('Kyc', {
                      step: this.state.step == undefined ? 2 : 3,
                      gender: this.state.gender,
                      maritalStatus: this.state.maritalStatus,
                      birth: this.state.birth,
                    });
                } else if (this.state.step == 3) {
                  //api 용
                  if (
                    this.state.countryCd !== '' &&
                    this.state.languageCd !== '' &&
                    this.state.countryResidence !== '' &&
                    this.state.countryCity !== ''
                  ) {
                    console.log(
                      'this.state.updateCheck',
                      this.state.updateCheck,
                    );
                    if (this.state.updateCheck === true) {
                      await this.KycUpdateApi(
                        this.state.birth,
                        this.state.country,
                        this.state.countryCd,
                        this.state.countryCity,
                        this.state.countryResidence,
                        this.state.countryResidenceCd,
                        this.state.gender,
                        this.state.language,
                        this.state.languageCd,
                        this.state.maritalStatus,
                      );
                      console.log('triue진입');
                      console.log({
                        birth: this.state.birth,
                        country: this.state.country,
                        countryCd: this.state.countryCd,
                        countryCity: this.state.countryCity,
                        countryResidence: this.state.countryResidence,
                        countryResidenceCd: this.state.countryResidenceCd,
                        gender: this.state.gender,
                        languageCd: this.state.languageCd,
                        maritalStatus: this.state.maritalStatus,
                      });
                      if (this.state.returnValue == '0') {
                        await this.setModal1Visible(true);
                      }
                    } else if (this.state.updateCheck === false) {
                      await this.KycInsertApi(
                        this.state.birth,
                        this.state.country,
                        this.state.countryCd,
                        this.state.countryCity,
                        this.state.countryResidence,
                        this.state.countryResidenceCd,
                        this.state.gender,
                        this.state.language,
                        this.state.languageCd,
                        this.state.maritalStatus,
                      );
                      if (this.state.returnValue == '0') {
                        await this.setModalVisible(true);
                      }
                    }
                  }
                  //본부장님 테스트용
                  // if (
                  //   this.state.countryCd !== '' &&
                  //   this.state.languageCd !== '' &&
                  //   this.state.countryResidence !== '' &&
                  //   this.state.countryCity !== ''
                  // ) {
                  //   await this.setModalVisible(true);
                  // }
                }
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                {this.state.step == 3 ? t('kyc2') : t('kyc3')}
              </Text>
            </TouchableOpacity>
          </View>
          <TextConfirmModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('kyc4')}
            confirm={t('kyc5')}
            handleNextPage={this.handleNextPage}
          />
          <TextConfirmModal
            setModalVisible={this.setModal1Visible}
            modalVisible={this.state.modal1Visible}
            text={t('kyc6')}
            confirm={t('kyc7')}
            handleNextPage={this.handleNextPage}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ktitAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  ktilMiddle: {
    width: 20,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#a9a9a9',
  },
  topAll: {
    marginTop: 16,
  },
  topText: {
    fontSize: 23,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default hoistStatics(withTranslation()(KycLevel1Box), KycLevel1Box);
