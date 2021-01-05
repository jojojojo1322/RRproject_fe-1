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
} from 'react-native';
import ListModal from '../factory/modal/ListModal';
import ListCheckModal from '../factory/modal/ListCheckModal';
import ListRoundCheckModal from '../factory/modal/ListRoundCheckModal';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import {server} from '../defined/server';
import axios from 'axios';

import {CountryListApi} from '../defined/DefineCountryList';
export default class kycThird extends Component {
  state = {
    country: '',
    countryCd: '',
    language: '',
    residenceCountry: '',
    residenceCountryCd: '',
    residenceCity: '',
    countryModal: false,
    languageModal: false,
    residenceCountryModal: false,
    residenceCityModal: false,

    countryData: [],
    cityData: [],
    languageData: [],
  };

  componentDidMount() {
    this.countryDataApi();
    this.cityDataApi();
    this.languageDataApi();
  }
  cityDataApi = async () => {
    await axios
      .get(`${server}/util/global/cities`)
      .then(async (response) => {
        // console.log('countryListList', response);
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

  setCountry = (country, cd) => {
    this.setState({country: country, countryCd: cd});
    this.props.setCountry(country, cd);
  };
  setLanguage = (visible) => {
    let Lang = '';
    let HighLang = '';
    visible.map((data, index) => {
      visible.length == index + 1
        ? (Lang += `${data.label}`)
        : (Lang += `${data.label}, `);
    });
    visible.map((data, index) => {
      visible.length == index + 1
        ? (HighLang += `${data.label}`)
        : (HighLang += `${data.label},`);
    });
    this.setState({language: Lang});
    this.props.setLanguage(HighLang);
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
    // console.log('this.state.cityData');
    // console.log(this.state.cityData);
    return (
      <View>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              {textAlign: 'left'},
            ]}>
            국적 선택
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
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.country == ''
                ? '선택해 주세요.'
                : `${this.state.country} (${this.state.countryCd})`}
            </Text>
            <Image
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 국적 */}
        <ListModal
          modalVisible={this.state.countryModal}
          setModalVisible={this.setCountryModal}
          setCountry={this.setCountry}
          titleText={`국적선택`}
          list={this.state.countryData}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              {textAlign: 'left'},
            ]}>
            사용가능언어 선택 (다중 선택 가능)
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setLanguageModal(true);
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.language == ''
                ? '선택해 주세요.'
                : this.state.language.length >= 20
                ? this.state.language.slice(0, 20) + '...'
                : this.state.language}
            </Text>
            <Image
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 사용가능언어 */}
        <ListCheckModal
          modalVisible={this.state.languageModal}
          setModalVisible={this.setLanguageModal}
          setLanguage={this.setLanguage}
          list={this.state.languageData}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              {textAlign: 'left'},
            ]}>
            거주국가 선택
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
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.residenceCountry == ''
                ? '선택해 주세요.'
                : `${this.state.residenceCountry} (${this.state.residenceCountryCd})`}
            </Text>
            <Image
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 거주국가선택 */}

        <ListModal
          modalVisible={this.state.residenceCountryModal}
          setModalVisible={this.setResidenceCountryModal}
          setCountry={this.setResidenceCountry}
          titleText={`거주국가선택`}
          list={this.state.countryData}
        />

        <View style={{marginTop: Platform.OS === 'ios' ? '10%' : '8%'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              {textAlign: 'left'},
            ]}>
            거주도시 선택
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
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {this.state.residenceCity == ''
                ? '선택해 주세요.'
                : this.state.residenceCity}
            </Text>
            <Image
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 거주도시 선택 */}
        <ListModal
          modalVisible={this.state.residenceCityModal}
          setModalVisible={this.setResidenceCityModal}
          setCountry={this.setResidenceCity}
          setLanguage={this.setLanguage}
          titleText={`거주도시선택`}
          list={this.state.cityData}
        />
      </View>
    );
  }
}
