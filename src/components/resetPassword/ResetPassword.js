import React, {Component} from 'react';

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
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';

export default class ResetPassword extends Component {
  state = {
    firstPassword: '',
    secondPassword: '',
    firstBlur: true,
    secondBlur: true,
  };
  handleFirst = (e) => {
    this.setState({
      firstPassword: e,
    });
  };
  handleSecond = (e) => {
    this.setState({
      secondPassword: e,
    });
  };

  render() {
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.firstPass}>
            {/* 비밀번호 */}
            <View>
              <Text style={styles.subText}>비밀번호</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  //   secureTextEntry={true}
                  placeholder="아래 조합으로 입력"
                  // keyboardType={'numeric'}
                  onChangeText={this.handleFirst}
                  value={this.state.firstPassword}
                  style={[styles.textInputStyle]}></TextInput>
                <Image
                  style={{width: 19, height: 19}}
                  source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                />
              </View>
            </TouchableHighlight>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <RoundCheckbox
                  size={15}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  영문
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <RoundCheckbox
                  size={15}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  숫자
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <RoundCheckbox
                  size={15}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  대문자
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <RoundCheckbox
                  size={15}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  특수문자
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <RoundCheckbox
                  size={15}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={{color: '#999999', fontSize: 12, marginLeft: 5}}>
                  8자리 이상
                </Text>
              </View>
            </View>
          </View>
          {/* 비밀번호 확인 */}
          <View style={styles.secondPass}>
            <View>
              <Text style={styles.subText}>비밀번호 확인</Text>
            </View>

            <TouchableHighlight>
              <View style={styles.InputImageAll}>
                <TextInput
                  //   secureTextEntry={true}
                  placeholder="비밀번호 다시 입력"
                  // keyboardType={'numeric'}
                  onChangeText={this.handleSecond}
                  value={this.state.secondPassword}
                  style={[styles.textInputStyle]}></TextInput>
                <Image
                  style={{width: 19, height: 19}}
                  source={require('../../imgs/drawable-xhdpi/ico_view_d.png')}
                />
              </View>
            </TouchableHighlight>

            {/* alert */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
              />
              <Text style={{color: '#F00', fontSize: 14, marginLeft: 10}}>
                비밀번호가 일치하지 않습니다.
              </Text>

              <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_m_check.png')}
              />
              <Text style={{color: '#0080ff', fontSize: 14, marginLeft: 10}}>
                비밀번호가 일치합니다.
              </Text>
            </View>
          </View>

          {/* 확인버튼 */}
          <TouchableHighlight
            // style={[styles.button, {backgroundColor: '#4696ff'}]}
            style={
              this.state.firstPassword.length == 6
                ? [styles.button, {backgroundColor: '#4696ff'}]
                : [styles.button]
            }
            onPress={() => {
              if (this.state.firstPassword.length == 6) {
                this.props.navigation.navigate('ResetPassword');
              }
            }}>
            <Text style={styles.buttonTexts}>다음</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#FFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    // alignItems: 'center',
  },
  firstPass: {marginTop: 40},
  secondPass: {marginBottom: 300},
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
  textInputStyle: {
    // position: 'relative',
    // width: '100%',
    fontSize: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#dddddd',
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#c6c9cf',
    padding: 15,
    marginTop: 100,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
