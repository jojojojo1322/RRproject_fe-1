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
import ResearchStyle from '../../style/ResearchStyle.js';

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
    if (nowIndex === this.state.questionLength - 1) {
      this.props.navigation.navigate('MainVideo');
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
  survey_handleQuestion = async (question, answer, status) => {
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

  render() {
    let researchArr = this.state.question;
    let Arr;
    let researchList = [];
    let i = 0;
    researchArr.map(
      (data, index) =>
        (researchList = researchList.concat(
          <View style={[ResearchStyle.researchView]} key={index}>
            <View style={ResearchStyle.researchQuestionLength}>
              <Text
                style={[
                  ResetStyle.fontBoldK,
                  ResetStyle.fontB,
                  {fontWeight: '400'},
                ]}>
                {data.id + 1}/{this.state.questionLength}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  ResearchStyle.researchQuestion,
                ]}>
                {data.question}
              </Text>
            </View>

            <ScrollView style={ResearchStyle.researchScrollView}>
              {data.questionDetail.map((detail, index) => {
                if (detail.id == 1) {
                  return (
                    <View
                      style={[
                        ResearchStyle.researchAnswerStyle,
                        ResearchStyle.researchAnswerTopStyle,
                      ]}
                      key={index}>
                      <Text
                        style={[
                          ResetStyle.fontRegularK,
                          ResetStyle.fontBlack,
                          {textAlign: 'left'},
                        ]}>
                        {detail.detail}
                      </Text>
                      <RoundCheckbox
                        size={30}
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
                        survey_handleQuestion={this.survey_handleQuestion}
                        checkedArray={this.state.checkedArray}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View style={ResearchStyle.researchAnswerStyle} key={index}>
                      <Text
                        style={[
                          ResetStyle.fontRegularK,
                          ResetStyle.fontBlack,
                          {textAlign: 'left'},
                        ]}>
                        {detail.detail}
                      </Text>
                      <RoundCheckbox
                        size={30}
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
                        survey_handleQuestion={this.survey_handleQuestion}
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
      <SafeAreaView style={ResetStyle.container}>
        <View
          style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            설문조사 제목
          </Text>

          {researchList[this.state.nowIndex]}

          <View style={ResearchStyle.researchBottomButton}>
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
        </View>
      </SafeAreaView>
    );
  }
}

export default ResearchForm;
