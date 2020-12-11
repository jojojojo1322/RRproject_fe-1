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
