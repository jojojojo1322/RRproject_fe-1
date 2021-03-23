import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import ListModal from '@factory/modal/ListModal';
import ListCheckLangModal from '@factory/modal/ListCheckLangModal';
import ListRoundCheckModal from '@factory/modal/ListRoundCheckModal';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';
import {server} from '../defined/server';
import axios from 'axios';

import {CountryListApi} from '../defined/DefineCountryList';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class kycThird extends Component {
  state = {
    country: '',
    countryCd: this.props.Kcountry,
    language: this.props.Klanguage,
    languageCd: this.props.KlanguageCd,
    residenceCity: this.props.KresidenceCity,
    residenceCountry: this.props.KresidenceCountry,
    residenceCountryCd: '',
    countryModal: false,
    languageModal: false,
    residenceCountryModal: false,
    residenceCityModal: false,

    originalLang: this.props.KoriginalLan,

    countryData: [],
    cityData: [],
    languageData: [],
  };

  componentDidMount() {
    this.countryDataApi();
    // this.cityDataApi();
    this.languageDataApi();
  }
  componentDidUpdate = (preProps, preState) => {
    if (
      preProps.Kcountry !== this.props.Kcountry &&
      this.props.KoriginalLan != ''
    ) {
      this.setState({
        countryCd: this.props.Kcountry,
        language: this.props.Klanguage,
        languageCd: this.props.KlanguageCd,
        residenceCity: this.props.KresidenceCity,
        residenceCountry: this.props.KresidenceCountry,
        originalLang: this.props.KoriginalLan,
      });
      this.countryDataApi();
    }

    if (
      preProps.Kcountry === this.props.Kcountry &&
      preState.residenceCountryCd !== this.state.residenceCountryCd
    ) {
      this.cityDataApi();
      // this.setState({
      //   residenceCity: '',
      // });
    }
    // }
  };
  cityDataApi = async () => {
    await axios
      .get(
        `${server}/util/global/cities?countryCode=${this.state.residenceCountryCd}`,
      )
      .then(async (response) => {
        console.log('countryListList', response);
        // setCountry(response.data);
        this.setState({
          cityData: response.data,
        });
        // return await response;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  countryDataApi = async () => {
    await axios
      .get(`${server}/util/global/country`)
      .then(async (response) => {
        // console.log('countryListList', response);
        // setCountry(response.data);
        this.setState({
          countryData: response.data,
        });
        console.log(
          'countryDataApi',
          response.data.filter(
            (data) => data.fullName === this.state.residenceCountry,
          ),
        );
        if (
          response.data.filter(
            (data) => data.countryCode === this.state.countryCd,
          ).length === 1
        ) {
          this.setState({
            country: response.data.filter(
              (data) => data.countryCode === this.state.countryCd,
            )[0].fullName,
            residenceCountryCd: response.data.filter(
              (data) => data.fullName === this.state.residenceCountry,
            )[0].countryCode,
          });
          this.props.setCountry(
            response.data.filter(
              (data) => data.countryCode === this.state.countryCd,
            )[0].fullName,
            this.state.countryCd,
          );
        }
        // return await response;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  languageDataApi = async () => {
    await axios
      .get(`${server}/util/global/languages`)
      .then(async (response) => {
        // console.log('countryListList', response);
        // setCountry(response.data);
        this.setState({
          languageData: response.data,
        });
        // return await response;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };

  handleModalBoolean = (value, boolean) => {
    this.setState({
      [value]: boolean,
    });
  };

  setCountryModal = (visible) => {
    this.setState({countryModal: visible});
  };
  setLanguageModal = (visible) => {
    this.setState({languageModal: visible});
  };
  setResidenceCountryModal = (visible) => {
    this.setState({residenceCountryModal: visible});
  };
  setResidenceCityModal = (visible) => {
    this.setState({residenceCityModal: visible});
  };

  setCountry = (country, cd, phone) => {
    this.setState({country: country, countryCd: cd});
    this.props.setCountry(country, cd);
  };
  setLanguage = (vis) => {
    let visible = vis;
    // visible = visible.filter((item, index) => visible.indexOf(item) === index);
    visible = visible.filter((item, i) => {
      return (
        visible.findIndex((item2, j) => {
          return item.value === item2.value;
        }) === i
      );
    });
    this.setState({originalLang: visible});
    //표시용 언어 이름
    let Lang = '';
    let HighLang = '';
    //api용 언어 코드
    let LangCode = '';
    let HighLangCode = '';

    // 언어 배열에 추가
    if (visible) {
      visible.map((data, index) => {
        visible.length == index + 1
          ? (Lang += `${data.label}`)
          : (Lang += `${data.label},`);
      });
      visible.map((data, index) => {
        visible.length == index + 1
          ? (HighLang += `${data.label}`)
          : (HighLang += `${data.label},`);
      });

      visible.map((data, index) => {
        visible.length == index + 1
          ? (LangCode += `${data.value}`)
          : (LangCode += `${data.value},`);
      });
      visible.map((data, index) => {
        visible.length == index + 1
          ? (HighLangCode += `${data.value}`)
          : (HighLangCode += `${data.value},`);
      });
    }
    this.setState({language: Lang});
    // this.props.setLanguage(HighLang);
    console.log({Lang: Lang, HighLangCode: HighLangCode});
    this.props.setLanguage(Lang, HighLangCode);
  };
  setResidenceCountry = (residenceCountry, residenceCountryCd) => {
    this.setState({
      residenceCountry: residenceCountry,
      residenceCountryCd: residenceCountryCd,
    });
    this.props.setResidenceCountry(residenceCountry, residenceCountryCd);
  };
  setResidenceCity = (visible) => {
    console.log(visible);
    this.setState({residenceCity: visible});
    this.props.setResidenceCity(visible);
  };

  handleBirth = (e) => {
    console.log(e);
    this.props.handleBirth(e);
  };
  render() {
    const {t} = this.props;
    console.log({
      countryCd: this.props.Kcountry,
      language: this.props.Klanguage,
      languageCd: this.props.KlanguageCd,
      originalLang: this.props.KoriginalLan,
      residenceCity: this.props.KresidenceCity,
      residenceCountry: this.props.KresidenceCountry,
    });
    // console.log('this.state.cityData');
    // console.log(this.state.cityData);
    return (
      <View>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}>
            {t('kycThird1')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setCountryModal(!this.state.countryModal);
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              // placeholder={'선택해 주세요.'}
              // // keyboardType={'numeric'}
              // onChangeText={this.handleBirth}
              // value={
              //   this.state.country == ''
              //     ? ''
              //     : `${this.state.country} (${this.state.countryCd})`
              // }
              // editable={false}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                this.state.countryCd !== '' && ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.countryCd == ''
                ? t('kycThird2')
                : `${this.state.country} (${this.state.countryCd})`}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 30 : 25,
                height: Platform.OS === 'ios' ? 30 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/icon_search.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 국적 */}
        <ListModal
          modalVisible={this.state.countryModal}
          setModalVisible={this.setCountryModal}
          setCountry={this.setCountry}
          titleText={t('kycThird3')}
          list={this.state.countryData}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}>
            {t('kycThird4')}
            <Text style={{fontWeight: '300'}}>{t('kycThird5')}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setLanguageModal(true);
            // this.setState({
            //   language: '',
            // });
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                this.state.language !== '' && ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.language == ''
                ? t('kycThird6')
                : this.state.language.length >= 20
                ? this.state.language.slice(0, 20) + '...'
                : this.state.language}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 30 : 25,
                height: Platform.OS === 'ios' ? 30 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/icon_search.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 사용가능언어 */}
        <ListCheckLangModal
          modalVisible={this.state.languageModal}
          setModalVisible={this.setLanguageModal}
          setLanguage={this.setLanguage}
          list={this.state.languageData}
          originalLang={this.state.originalLang}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}>
            {t('kycThird7')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setResidenceCountryModal(!this.state.residenceCountryModal);
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                this.state.residenceCountry !== '' && ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.residenceCountry == ''
                ? t('kycThird8')
                : `${this.state.residenceCountry} (${this.state.residenceCountryCd})`}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 30 : 25,
                height: Platform.OS === 'ios' ? 30 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/icon_search.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 거주국가선택 */}

        <ListModal
          modalVisible={this.state.residenceCountryModal}
          setModalVisible={this.setResidenceCountryModal}
          setCountry={this.setResidenceCountry}
          titleText={t('kycThird9')}
          list={this.state.countryData}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}>
            {t('kycThird10')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setResidenceCityModal(!this.state.setResidenceCityModal);
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                this.state.residenceCity !== '' && ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.residenceCity == ''
                ? t('kycThird11')
                : this.state.residenceCity}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 30 : 25,
                height: Platform.OS === 'ios' ? 30 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/icon_search.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 거주도시 선택 */}
        <ListModal
          modalVisible={this.state.residenceCityModal}
          setModalVisible={this.setResidenceCityModal}
          setCountry={this.setResidenceCity}
          setLanguage={this.setLanguage}
          titleText={t('kycThird12')}
          list={this.state.cityData}
        />
      </View>
    );
  }
}

export default hoistStatics(withTranslation()(kycThird), kycThird);
