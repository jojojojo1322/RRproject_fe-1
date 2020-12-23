import React, {useState, Component} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import TextConfirmModal from '../factory/modal/TextConfirmModal';

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

export default class Kyc extends Component {
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
    country: '',
    countryCd: '',
    countryCity: '',
    countryResidence: '',
    countryResidenceCd: '',

    languageCd: '',
    modalVisible: false,
    returnValue: '',
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  handleNextPage = () => {
    this.props.navigation.navigate('Initial2');
  };

  setCountry = (country, cd) => {
    this.setState({country: country, countryCd: cd});
  };
  setLanguage = (visible) => {
    console.log('Language', visible);
    this.setState({languageCd: visible});
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

  KycInsertApi = async (
    birthday,
    countryCd,
    countryCity,
    countryResidence,
    gender,
    languageCd,
    marriageStatus,
  ) => {
    const userNo = await AsyncStorage.getItem('userNo');
    console.log('userNo', userNo);
    await axios
      .post(`${server}/kyc`, {
        birthday: birthday,
        countryCd: countryCd,
        countryCity: countryCity,
        countryResidence: countryResidence,
        gender: gender,
        languageCd: languageCd,
        marriageStatus: marriageStatus,
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
  }
  render() {
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
            <Text style={[ResetStyle.fontMediumK, {marginBottom: '5%'}]}>
              KYC 정보입력
            </Text>

            <View style={styles.ktitAll}>
              <Image
                style={{marginRight: 4}}
                source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
              />
              <View style={styles.ktilMiddle}></View>
              {this.state.step == undefined ? (
                <Image
                  style={{marginRight: 4, marginLeft: 4}}
                  source={require('../../imgs/drawable-mdpi/icon_ktit_off.png')}
                />
              ) : (
                <Image
                  style={{marginRight: 4, marginLeft: 4}}
                  source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
                />
              )}
              <View style={styles.ktilMiddle}></View>
              {this.state.step == 2 || this.state.step == undefined ? (
                <Image
                  style={{marginRight: 4, marginLeft: 4}}
                  source={require('../../imgs/drawable-mdpi/icon_ktit_off.png')}
                />
              ) : (
                <Image
                  style={{marginRight: 4, marginLeft: 4}}
                  source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
                />
              )}
            </View>
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
            />
          )}
          <View style={styles.bottomButtonAll}>
            <TouchableOpacity
              style={
                this.state.step == undefined &&
                this.state.maritalStatus != '' &&
                this.state.gender != ''
                  ? ResetStyle.button
                  : this.state.step == 2 && isBirthday(this.state.birth)
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
                  isBirthday(this.state.birth) &&
                    this.props.navigation.push('Kyc', {
                      step: this.state.step == undefined ? 2 : 3,
                      gender: this.state.gender,
                      maritalStatus: this.state.maritalStatus,
                      birth: this.state.birth,
                    });
                } else if (this.state.step == 3) {
                  //api 용
                  // if (
                  //   this.state.countryCd !== '' &&
                  //   this.state.languageCd !== '' &&
                  //   this.state.countryResidence !== '' &&
                  //   this.state.countryCity !== ''
                  // ) {
                  //   await this.KycInsertApi(
                  //     this.state.birth,
                  //     this.state.countryCd,
                  //     this.state.countryCity,
                  //     this.state.countryResidence,
                  //     this.state.gender,
                  //     this.state.languageCd,
                  //     // 'KOR',
                  //     this.state.maritalStatus,
                  //   );
                  // }
                  // if (this.state.returnValue == '0') {
                  //   await this.setModalVisible(true);
                  // }
                  //본부장님 테스트용
                  if (
                    this.state.countryCd !== '' &&
                    this.state.languageCd !== '' &&
                    this.state.countryResidence !== '' &&
                    this.state.countryCity !== ''
                  ) {
                    await this.setModalVisible(true);
                  }
                }
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                {this.state.step == 3 ? '확인' : '다음'}
              </Text>
            </TouchableOpacity>
          </View>
          <TextConfirmModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={`KYC 인증이 완료되었습니다.${'\n'}로그인하여 주시기 바랍니다.`}
            confirm={`확인`}
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
    borderColor: '#dddddd',
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
