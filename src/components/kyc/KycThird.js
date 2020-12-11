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
            <TextInput
              placeholder={'선택해 주세요.'}
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              value={
                this.state.country == ''
                  ? ''
                  : `${this.state.country} (${this.state.countryCd})`
              }
              editable={false}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}></TextInput>
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
            this.setLanguageModal(!this.state.language);
          }}>
          <View style={AuthStyle.kycInput}>
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              value={this.state.language}
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}></TextInput>
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
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              value={
                this.state.residenceCountry == ''
                  ? ''
                  : `${this.state.residenceCountry} (${this.state.residenceCountryCd})`
              }
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}></TextInput>
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
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              value={
                this.state.residenceCity == '' ? '' : this.state.residenceCity
              }
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}></TextInput>
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
        />
      </View>
    );
  }
}
