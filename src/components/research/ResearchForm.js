import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../factory/Roundcheck';

class ResearchForm extends Component {
  // CheckedArrObject = new SelectedCheckboxes();

  constructor() {
    super();
    CheckedArrObject = new SelectedCheckboxes();
    // this.state = { pickedElements: '' }
  }
  state = {
    question: [],
    questionLength: 0,
    isChecked: false,
    checkId: '',
    nowIndex: 0,
    pickedElements: '',
    checkedArray: [],
  };

  handleCheckedbox = (value, status) => {
    console.log(value, status);
  };

  renderSelectedElements = () => {
    if (CheckedArrObject.fetchArray().length == 0) {
      Alert.alert('No Item Selected');
    } else {
      this.setState(() => {
        return {
          pickedElements: CheckedArrObject.fetchArray()
            .map((res) => res.value)
            .join(),
        };
      });
    }
  };

  handlerPrev = (e) => {
    e.preventDefault();
    const nowIndex = this.state.nowIndex;
    if (nowIndex != 0) {
      this.setState({
        nowIndex: nowIndex - 1,
        checkId: '',
      });
      // this.props.navigation.goBack();
    } else if (nowIndex == 0) {
      this.props.navigation.goBack();
    }
  };
  handlerNext = (e) => {
    e.preventDefault();
    const nowIndex = this.state.nowIndex;
    if (nowIndex != this.state.questionLength - 1) {
      this.setState({
        nowIndex: nowIndex + 1,
        checkId: '',
      });
      // this.props.navigation.push('ResearchForm');
    }
  };

  componentDidMount() {
    this.setState({
      question: [
        {
          id: 0,
          question:
            '첫번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
          questionDetail: [
            {
              id: 1,
              detail: '매우좋음',
            },
            {
              id: 2,
              detail: '좋음',
            },
            {
              id: 3,
              detail: '보통',
            },
            {
              id: 4,
              detail: '나쁨',
            },
            {
              id: 5,
              detail: '매우나쁨',
            },
          ],
          answer: '',
        },
        {
          id: 1,
          question:
            '두번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
          questionDetail: [
            {
              id: 1,
              detail: '매우좋음',
            },
            {
              id: 2,
              detail: '좋음',
            },
            {
              id: 3,
              detail: '보통',
            },
            {
              id: 4,
              detail: '나쁨',
            },
            {
              id: 5,
              detail: '매우나쁨',
            },
          ],
          answer: '',
        },
        {
          id: 2,
          question:
            '세번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
          questionDetail: [
            {
              id: 1,
              detail: '매우좋음',
            },
            {
              id: 2,
              detail: '좋음',
            },
            {
              id: 3,
              detail: '보통',
            },
            {
              id: 4,
              detail: '나쁨',
            },
            {
              id: 5,
              detail: '매우나쁨',
            },
          ],
          answer: '',
        },
      ],
      questionLength: 3,
    });
  }
  componentDidUpdate(preProps, preState) {
    if (preState.checkId != this.state.checkId) {
      this.setState({
        isChecked: true,
      });
    }
  }
  handleQuestion = async (question, answer, status) => {
    console.log(status, '----question----', question);
    console.log(status, '----answer----', answer);
    let checkedArray = this.state.checkedArray;
    if (status === 'PLUS') {
      await this.setState({
        checkedArray: checkedArray.concat({
          key: question,
          question: question,
          answer: answer,
        }),
      });
    } else if (status === 'MINUS') {
      checkedArray.splice(
        checkedArray.findIndex(
          (y) => y.question === question && y.answer === answer,
        ),
        1,
      ),
        await this.setState({
          checkedArray: checkedArray,
        });
    }
    console.log(this.state.checkedArray);
  };

  // handleUnCheckedArray = async (key) => {
  //   console.log('MINUS', key);
  //   let checkedArray = this.state.checkedArray;
  //   checkedArray.splice(
  //     checkedArray.findIndex((y) => y.key == key),
  //     1,
  //   ),
  //     await this.setState({
  //       checkedArray: checkedArray,
  //     });
  //   console.log('MinusArrayLATE', this.state.checkedArray);
  // };

  render() {
    let researchArr = this.state.question;
    let Arr;
    let researchList = [];
    let i = 0;
    researchArr.map(
      (data, index) =>
        (researchList = researchList.concat(
          <View style={styles.container} key={index}>
            <View style={styles.researchSubBox}>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontB,
                  {fontWeight: '400', marginTop: '9%'},
                ]}>
                {data.id + 1}/{this.state.questionLength}
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {
                    fontWeight: '500',
                    textAlign: 'left',
                    marginTop: '6%',
                    marginBottom: '8%',
                    lineHeight: 25,
                  },
                ]}>
                {data.question}
              </Text>
            </View>

            <ScrollView>
              {data.questionDetail.map((detail, index) => {
                if (detail.id == 1) {
                  return (
                    <View style={styles.checkListFirst} key={index}>
                      <Text style={styles.checkListText}>{detail.detail}</Text>
                      <RoundCheckbox
                        size={25}
                        keyValue={data.id}
                        checked={
                          this.state.checkedArray.findIndex(
                            (y) =>
                              y.question === data.id && y.answer === detail.id,
                          ) >= 0
                            ? true
                            : false
                        }
                        color="#164895"
                        labelColor="#000000"
                        label={detail.detail}
                        value={detail.id}
                        onClick={() => {
                          this.setState({
                            isChecked: !this.state.isChecked,
                            checkId: detail.id,
                          });
                        }}
                        isChecked={
                          this.state.isChecked && this.state.checkId == 1
                        }
                        checkedObjArr={CheckedArrObject}
                        handleQuestion={this.handleQuestion}
                        checkedArray={this.state.checkedArray}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.checkList} key={index}>
                      <Text style={styles.checkListText}>{detail.detail}</Text>
                      <RoundCheckbox
                        size={25}
                        keyValue={data.id}
                        checked={
                          this.state.checkedArray.findIndex(
                            (y) =>
                              y.question === data.id && y.answer === detail.id,
                          ) >= 0
                            ? true
                            : false
                        }
                        color="#164895"
                        labelColor="#000000"
                        label={detail.detail}
                        value={detail.id}
                        onClick={() => {
                          this.setState({
                            isChecked: !this.state.isChecked,
                            checkId: data.id,
                          });
                        }}
                        isChecked={
                          this.state.isChecked && this.state.checkId == 1
                        }
                        checkedObjArr={CheckedArrObject}
                        handleQuestion={this.handleQuestion}
                        checkedArray={this.state.checkedArray}
                      />
                    </View>
                  );
                }
              })}
            </ScrollView>
          </View>,
        )),
    );

    return (
      <SafeAreaView style={styles.container}>
        <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
          설문조사 제목
        </Text>

        {researchList[this.state.nowIndex]}

        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={
              this.state.nowIndex == 0
                ? [
                    ResetStyle.button,
                    {width: '49%', backgroundColor: '#e6e6e6'},
                  ]
                : [ResetStyle.button, {width: '49%'}]
            }
            activeOpacity={0.75}
            onPress={this.handlerPrev}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {this.state.nowIndex == 0 ? '취소' : '이전'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {width: '49%', backgroundColor: '#4696ff'},
            ]}
            activeOpacity={0.75}
            onPress={this.handlerNext}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {this.state.nowIndex == this.state.questionLength - 1
                ? '제출'
                : '다음'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

RoundCheckbox.propTypes = {
  keyValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  checked: PropTypes.bool,
  labelColor: PropTypes.string,
  checkedObjArr: PropTypes.object.isRequired,
};

// RoundCheckbox.defaultProps = {
//   size: 30,
//   checked: false,
//   value: 'Default',
//   label: 'Default',
//   color: '#164895',
//   labelColor: '000000',
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  researchTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginTop: '10%',
  },
  researchSubBox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  researchSubNumber: {
    marginTop: '10%',
    fontSize: 27,
    lineHeight: 36,
    fontWeight: '500',
    color: '#164895',
  },
  researchSubText: {
    marginTop: '10%',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
    color: '#333',
    marginBottom: '10%',
  },
  buttonBox: {
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'space-between',
    marginBottom: '8%',
  },
  button: {
    width: '48%',
    height: 56,
    borderRadius: 30,
    backgroundColor: '#164895',
    justifyContent: 'center',
    color: '#FFF',
  },
  buttonCancel: {
    width: '48%',
    height: 56,
    borderRadius: 30,
    backgroundColor: '#c6c9cf',
    justifyContent: 'center',
    color: '#FFF',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    // alignSelf: 'center',
    fontSize: 17,
    // lineHeight: 56,
    fontWeight: '500',
    letterSpacing: 0.9,
  },
  checkList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'center',
    padding: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomWidth: 1,
    borderColor: '#dedede',
  },
  checkListFirst: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#dedede',
  },
  checkListText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    alignSelf: 'stretch',
  },

  selectedUI: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxTickImg: {
    width: '75%',
    height: '75%',
    tintColor: '#ffffff',
    resizeMode: 'contain',
  },

  uncheckedCheckbox: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },

  checkboxLabel: {
    display: 'none',
    fontSize: 18,
    paddingLeft: 15,
  },
});

export default ResearchForm;
