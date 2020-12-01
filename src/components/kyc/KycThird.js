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
  TouchableHighlight,
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

export default class kycThird extends Component {
  state = {
    country: '',
    language: '',
    residenceCountry: '',
    residenceCity: '',
    countryModal: false,
    languagModal: false,
    residenceCountryModal: false,
    residenceCityModal: false,
  };
  handleModalBoolean = (value, boolean) => {
    this.setState({
      [value]: boolean,
    });
  };
  handleBirth = (e) => {
    console.log(e);
    this.props.handleBirth(e);
  };
  render() {
    return (
      <View style={{marginBottom: 160, marginTop: 40}}>
        <View>
          <Text style={styles.subText}>국적 선택</Text>
        </View>

        <TouchableHighlight>
          <View style={styles.InputImageAll}>
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              // value={this.props.birth}
              style={[styles.textInputStyle]}></TextInput>
            <Image
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableHighlight>

        {/* 국적 */}
        <ListModal />

        <View style={{marginTop: 40}}>
          <Text style={styles.subText}>사용가능언어 선택 (다중 선택 가능)</Text>
        </View>

        <TouchableHighlight>
          <View style={styles.InputImageAll}>
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              // value={this.props.birth}
              style={[styles.textInputStyle]}></TextInput>
            <Image
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableHighlight>

        {/* 사용가능언어 */}
        <ListCheckModal />

        <View style={{marginTop: 40}}>
          <Text style={styles.subText}>거주국가 선택</Text>
        </View>
        <TouchableHighlight>
          <View style={styles.InputImageAll}>
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              // value={this.props.birth}
              style={[styles.textInputStyle]}></TextInput>
            <Image
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableHighlight>

        {/* 거주국가선택 */}
        <ListModal />

        <View style={{marginTop: 40}}>
          <Text style={styles.subText}>거주도시 선택</Text>
        </View>
        <TouchableHighlight>
          <View style={styles.InputImageAll}>
            <TextInput
              placeholder="선택해 주세요"
              // keyboardType={'numeric'}
              onChangeText={this.handleBirth}
              // value={this.props.birth}
              style={[styles.textInputStyle]}></TextInput>
            <Image
              style={styles.InputImage}
              source={require('../../imgs/drawable-mdpi/icon_srarch.png')}
            />
          </View>
        </TouchableHighlight>

        {/* 거주도시 선택 */}
        <ListRoundCheckModal />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    width: '100%',
    height: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  container2: {
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
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
    borderBottomColor: '#ddd',
    alignItems: 'center',
    // alignContent: 'stretch',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
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
    backgroundColor: '#dddddd',
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
    borderColor: '#dddddd',
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
    // borderColor: '#dddddd',
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
    // borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  textInputStyle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
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
