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
        <View style={styles.container}>
          <View>
            <Text>지갑 생성 완료{'\n'}Master Key 저장하기</Text>
          </View>
          <View>
            <Text>
              Master Key는 추후에 지갑 비밀번호 분실 시{'\n'}비밀번호 재설정에
              꼭 필요한 Key입니다.
            </Text>
          </View>
          <View>
            <Text>
              Master Key 분실 시 찾을 방법이 없으니{'\n'}꼭 다른 곳에 저장해
              두세요!
            </Text>
          </View>
          <View>
            <Text>0x6565232c6565ed6565659desds6565c5 65c565c5</Text>
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
    alignItems: 'center',
  },
});
