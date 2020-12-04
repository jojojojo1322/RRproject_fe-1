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
import ResetStyle from '../../style/ResetStyle.js';

export default class KycSecond extends Component {
  handleBirth = (e) => {
    console.log(e);
    this.props.handleBirth(e);
  };
  render() {
    return (
      <View style={{marginBottom: '40%'}}>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontDG,
              {textAlign: 'left'},
            ]}>
            생년월일 입력
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="생일을 입력해주세요.(ex.19920101)"
            keyboardType={'numeric'}
            returnKeyType={'done'}
            onChangeText={this.handleBirth}
            value={this.props.birth}
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontG,
              {
                textAlign: 'left',
                borderBottomWidth: 1,
                borderBottomColor: '#dddddd',
                paddingTop: '6%',
                paddingBottom: '3%',
              },
            ]}></TextInput>
        </View>
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
    // marginBottom: 58,
    // textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
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
    position: 'relative',
    width: '100%',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
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
