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

export default class WalletMasterKey extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.Top}>
            <Text style={styles.TopText}>
              지갑 생성 완료{'\n'}Master Key 저장하기
            </Text>
          </View>
          <View style={styles.sec}>
            <Text style={styles.secText}>
              Master Key는 추후에 지갑 비밀번호 분실 시{'\n'}비밀번호 재설정에
              꼭 필요한 Key입니다.
            </Text>
          </View>
          <View style={styles.third}>
            <Text style={styles.thirdText}>
              Master Key 분실 시 찾을 방법이 없으니{'\n'}꼭 다른 곳에 저장해
              두세요!
            </Text>
          </View>
          <View>
            <Text>0x6565232c6565ed6565659desds6565c5 65c565c5</Text>
            <TouchableHighlight
              style={[styles.button, {backgroundColor: '#c6c9cf'}]}>
              <Text style={styles.buttonTexts}>다음</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
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
    // alignItems: 'center',
  },
  Top: {
    marginTop: 70,
    alignItems: 'center',
    marginBottom: 30,
  },
  TopText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
  },
  sec: {
    alignItems: 'center',
    marginBottom: 30,
  },
  secText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '100',
    lineHeight: 25,
  },
  third: {
    alignItems: 'center',
    marginBottom: 30,
  },
  thirdText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 25,
    color: '#0b95c9',
  },
  gray: {},
  grayText: {},
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#0b95c9',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
