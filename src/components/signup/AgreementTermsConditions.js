import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import {RoundCheckbox} from '../Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
// import {TextInput} from 'react-native-paper';

class SelectedCheckboxes {
  constructor() {
    selectedCheckboxes = [];
  }

  addItem(option) {
    selectedCheckboxes.push(option);
  }

  fetchArray() {
    return selectedCheckboxes;
  }
}

class AgreementTermsConditions extends Component {
  constructor() {
    super();
    CheckedArrObject = new SelectedCheckboxes();
  }
  state = {
    pickedElements: '',
    check: false,
    allCheck1: false,
    allCheck2: false,
    allCheck3: false,
  };
  renderSelectedElements = () => {
    if (CheckedArrObject.fetchArray().length == 0) {
      Alert.alert('No Item Selected');
    } else {
      this.setState({
        pickedElements: CheckedArrObject.fetchArray()
          .map((res) => res.value)
          .join(),
      });
    }
  };
  handleStatus = async () => {
    await this.setState({
      check: !this.state.check,
    });
  };
  handleAll = (value) => {
    this.setState({
      allCheck1: value,
      allCheck2: value,
      allCheck3: value,
    });
  };
  componentDidUpdate(preProps, preState) {
    if (
      preState.allCheck2 != this.state.allCheck2 ||
      preState.allCheck3 != this.state.allCheck3
    ) {
      console.log(this.state.allCheck2);
      if (this.state.allCheck2 == true && this.state.allCheck3 == true) {
        console.log('aa');
        this.setState({
          allCheck1: true,
        });
      }
    }
  }

  handleCheckedbox = () => {
    console.log('hey');
  };

  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <View
              style={[
                styles.viewBox,
                {
                  justifyContent: 'flex-start',
                  paddingTop: 20,
                  paddingBottom: 10,
                },
              ]}>
              <RoundCheckbox
                keyValue={1}
                size={25}
                // keyValue={Number(item.id)}
                keyValue={1}
                checked={this.state.allCheck1}
                color="#164895"
                // borderColor=""
                labelColor="#000000"
                value="1"
                label="all"
                checkedObjArr={CheckedArrObject}
                handleStatus={this.handleStatus}
                handleAll={this.handleAll}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginLeft: 10},
                ]}>
                서비스 이용약관 관련 전체동의
              </Text>
            </View>
            <View
              style={[
                styles.viewBox,
                {
                  padding: 17,
                  backgroundColor: '#f9f9f9',
                  marginTop: 10,
                  borderRadius: 5,
                },
              ]}>
              <View style={styles.viewBox}>
                <RoundCheckbox
                  size={20}
                  keyValue={2}
                  // keyValue={Number(item.id)}
                  checked={this.state.allCheck2}
                  color="#164895"
                  labelColor="#000000"
                  value="2"
                  label="2"
                  checkedObjArr={CheckedArrObject}
                  handleStatus={this.handleStatus}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('TermsConditions');
                    this.props.navigation.setOptions({
                      title: '이용약관 및 개인정보처리방침',
                    });
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 10},
                    ]}>
                    이용약관 동의(필수)
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('TermsConditions');
                  this.props.navigation.setOptions({
                    title: '이용약관 및 개인정보처리방침',
                  });
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={[
                styles.viewBox,
                {
                  padding: 17,
                  backgroundColor: '#f9f9f9',
                  marginTop: 10,
                  borderRadius: 5,
                },
              ]}>
              <View style={styles.viewBox}>
                <RoundCheckbox
                  size={20}
                  keyValue={3}
                  // keyValue={Number(item.id)}
                  checked={this.state.allCheck3}
                  color="#164895"
                  labelColor="#000000"
                  value="3"
                  label="3"
                  checkedObjArr={CheckedArrObject}
                  handleStatus={this.handleStatus}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('TermsConditions');
                    this.props.navigation.setOptions({
                      title: '이용약관 및 개인정보처리방침',
                    });
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 10},
                    ]}>
                    개인정보처리방침 동의(필수)
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('TermsConditions');
                  this.props.navigation.setOptions({
                    title: '이용약관 및 개인정보처리방침',
                  });
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <TouchableWithoutFeedback
            style={[
              ResetStyle.button,
              this.state.allCheck1 == false && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              if (this.state.allCheck1) {
                this.props.navigation.navigate('SignUpPersonal', {
                  deviceKey: this.props.route.params?.deviceKey,
                  phoneNum: this.props.route.params?.phoneNum,
                });
                this.props.navigation.setOptions({title: '회원정보 입력'});
              }
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              다음
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewBox: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 16,
    color: '#333333',
  },
});

export default AgreementTermsConditions;
