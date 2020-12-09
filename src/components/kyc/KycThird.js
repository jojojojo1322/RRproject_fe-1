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
  TouchableWithoutFeedback,
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
          <View style={styles.InputImageAll}>
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
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 국적 */}
        <ListModal
          modalVisible={this.state.countryModal}
          setModalVisible={this.setCountryModal}
          setCountry={this.setCountry}
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
          <View style={styles.InputImageAll}>
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
              style={styles.InputImage}
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
          <View style={styles.InputImageAll}>
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
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableOpacity>

        {/* 거주국가선택 */}

        <ListModal
          modalVisible={this.state.residenceCountryModal}
          setModalVisible={this.setResidenceCountryModal}
          setCountry={this.setResidenceCountry}
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
          <View style={styles.InputImageAll}>
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
              style={styles.InputImage}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    marginTop: 71,
    marginBottom: 30,
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 36,
  },
  subText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
  },

  InputImageAll: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
    // alignContent: 'stretch',
    // borderBottomWidth: 1,
    // borderBottomColor: '#4696ff',
  },
  InputImage: {
    // position: 'absolute',
    // alignItems: 'center',2
  },
  passGrayAll: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passGray: {
    backgroundColor: '#4696ff',
    textAlign: 'center',
    flex: 1,
    marginLeft: '3%',
    // width: '14%',
    height: 53,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 20,
  },
  passGrayText: {
    fontSize: 30,
    marginTop: 10,
  },
  keyboard: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
  },
  keyboardDetail: {
    flex: 1,
    height: 70,
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#4696ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardDetailText: {
    fontSize: 26,
  },
  keyboardCancelButtonDetail: {
    flex: 1,
    height: 80,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#4696ff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#164895',
  },
  keyboardCancelButton: {
    // color: '#fff',
    resizeMode: 'center',
  },
  textInputStyle: {
    // position: 'relative',
    // width: '100%',
    fontSize: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#4696ff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4696ff',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2Inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle3: {
    flexDirection: 'row',
    fontSize: 15,
  },
});
