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
// import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'react-native-check-box';
import PropTypes from 'prop-types';
import ResetStyle from '../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';

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

class RoundCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      checked: null,
    };
  }

  componentDidMount() {
    if (this.props.checked) {
      this.setState({checked: true}, () => {
        this.props.checkedObjArr.addItem({
          key: this.props.keyValue,
          value: this.props.value,
          label: this.props.label,
        });
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  stateSwitcher(key, label, value) {
    this.setState({checked: !this.state.checked}, () => {
      if (this.state.checked) {
        this.props.checkedObjArr.addItem({
          key: key,
          value: value,
          label: label,
        });
      } else {
        this.props.checkedObjArr.fetchArray().splice(
          this.props.checkedObjArr.fetchArray().findIndex((y) => y.key == key),
          1,
        );
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.stateSwitcher.bind(
          this,
          this.props.keyValue,
          this.props.label,
          this.props.value,
        )}
        underlayColor="transparent"
        style={{marginVertical: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 1.5,
              borderRadius: 50,
              width: this.props.size,
              height: this.props.size,
              backgroundColor: this.props.color,
            }}>
            {this.state.checked ? (
              <View style={styles.selectedUI}>
                <Image
                  source={require('../../imgs/roundcheck.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            ) : (
              <View style={styles.uncheckedCheckbox} />
            )}
          </View>
          <Text style={[styles.checkboxLabel, {color: this.props.labelColor}]}>
            {this.props.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
    checkedArray: '',
  };

  // constructor() {
  //   super();
  //   CheckedArrObject = new SelectedCheckboxes();
  //   this.state = { pickedElements: '' }
  // }

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
    }
  };

  componentDidMount() {
    this.setState({
      question: [
        {
          id: 0,
          question:
            '첫번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
          answer: '',
        },
        {
          id: 1,
          question:
            '두번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
          answer: '',
        },
        {
          id: 2,
          question:
            '세번째 설문조사 질문입니다. 이 질문에 대해서 어떻게 생각하시나요?',
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
  handleCheckedArray = async (Array) => {
    console.log('PLUS', Array);
    let checkedArray = this.state.checkedArray;
    await this.setState({
      checkedArray: checkedArray.concat(Array),
    });
    console.log('PlusArrayLATE', this.state.checkedArray);
  };

  handleUnCheckedArray = async (key) => {
    console.log('MINUS', key);
    let checkedArray = this.state.checkedArray;
    checkedArray.splice(
      checkedArray.findIndex((y) => y.key == key),
      1,
    ),
      await this.setState({
        checkedArray: checkedArray,
      });
    console.log('MinusArrayLATE', this.state.checkedArray);
  };

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
              <View style={styles.checkListFirst}>
                <Text style={styles.checkListText}>매우 나쁨</Text>
                <RoundCheckbox
                  size={25}
                  keyValue={1}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  label="매우 나쁨"
                  value="매우 나쁨"
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 1,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 1}
                  checkedObjArr={CheckedArrObject}
                />
                {/* <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 1,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 1}
                /> */}
              </View>

              <View style={styles.checkList}>
                <Text style={styles.checkListText}>적당히 나쁨</Text>
                <RoundCheckbox
                  size={25}
                  keyValue={1}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  label="적당히 나쁨"
                  value="적당히 나쁨"
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 2,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 2}
                  checkedObjArr={CheckedArrObject}
                />
                {/* <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 2,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 2}
                /> */}
              </View>

              <View style={styles.checkList}>
                <Text style={styles.checkListText}>보통</Text>
                <RoundCheckbox
                  size={25}
                  keyValue={1}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  label="보통"
                  value="보통"
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 3,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 3}
                  checkedObjArr={CheckedArrObject}
                />
                {/* <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 3,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 3}
                /> */}
              </View>

              <View style={styles.checkList}>
                <Text style={styles.checkListText}>적당히 좋음</Text>
                <RoundCheckbox
                  size={25}
                  keyValue={1}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  label="적당히 좋음"
                  value="적당히 좋음"
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 4,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 4}
                  checkedObjArr={CheckedArrObject}
                />
                {/* <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 4,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 4}
                /> */}
              </View>

              <View style={styles.checkList}>
                <Text style={styles.checkListText}>매우 좋음</Text>
                <RoundCheckbox
                  size={25}
                  keyValue={1}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  label="매우 좋음"
                  value="매우 좋음"
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 5,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 5}
                  checkedObjArr={CheckedArrObject}
                />
                {/* <CheckBox
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                      checkId: 5,
                    });
                  }}
                  isChecked={this.state.isChecked && this.state.checkId == 5}
                /> */}
              </View>
            </ScrollView>
          </View>,
        )),
    );
    console.log('Length', this.state.questionLength);
    console.log('nowIndex', this.state.nowIndex);
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
  value: PropTypes.string,
  checked: PropTypes.bool,
  labelColor: PropTypes.string,
  checkedObjArr: PropTypes.object.isRequired,
};

RoundCheckbox.defaultProps = {
  size: 30,
  checked: false,
  value: 'Default',
  label: 'Default',
  color: '#164895',
  labelColor: '000000',
};

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
