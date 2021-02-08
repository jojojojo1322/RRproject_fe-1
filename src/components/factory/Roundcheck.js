import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export class SelectedCheckboxes {
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

export class RoundCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      checked: null,
    };
  }

  componentDidMount() {
    // let a = [];
    // a = this.props.checkedArray.filter(
    //   (data) => data.value == this.props.value,
    // );
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
    // if (this.props.typeName) {
    //   let a = [];
    //   a = this.props.checkedArray.filter(
    //     (data) =>
    //       data.kycOption == this.props.value &&
    //       data.kycQuestion == this.props.keyValue,
    //   );
    //   if (a.length !== 0) {
    //     console.log('다시체크됨다시체크됨다시체크됨다시체크됨다시체크됨');
    //     this.setState({checked: true}, () => {
    //       this.props.checkedObjArr.addItem({
    //         key: this.props.keyValue,
    //         value: this.props.value,
    //         label: this.props.label,
    //       });
    //     });
    //   } else {
    //     this.setState({
    //       checked: false,
    //     });
    //   }
    // }
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.checked != this.props.checked) {
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
        this.props.checkedObjArr.fetchArray().splice(
          this.props.checkedObjArr
            .fetchArray()
            .findIndex((y) => y.key == this.props.keyValue),
          1,
        );
      }
    }
    // if (preProps.checkedArray !== this.props.checkedArray) {
    //   console.log('---DidUpdate----');
    //   let a = [];
    //   a = this.props.checkedArray.filter(
    //     (data) =>
    //       data.kycOption == this.props.value &&
    //       data.kycQuestion == this.props.keyValue,
    //   );
    //   if (a.length !== 0) {
    //     console.log('다시체크됨다시체크됨다시체크됨다시체크됨다시체크됨');
    //     this.setState({checked: true}, () => {
    //       this.props.checkedObjArr.addItem({
    //         key: this.props.keyValue,
    //         value: this.props.value,
    //         label: this.props.label,
    //       });
    //     });
    //   } else {
    //     this.setState({
    //       checked: false,
    //     });
    //   }
    // }
  }
  stateSwitcher(key, label, value) {
    this.setState({checked: !this.state.checked}, () => {
      if (this.state.checked) {
        this.props.checkedObjArr.addItem({
          key: key,
          value: value,
          label: label,
        });
        if (label === 'all') {
          this.props.handleAll(true);
        }

        // kyc 선택문항 - survey
        if (this.props.handleQuestion) {
          const index = this.props.checkedArray.findIndex(
            (y) => String(y.kycQuestion) == String(key),
          );
          let multiCnt = 0;
          this.props.checkedArray.map((data, index) => {
            if (
              String(data.kycQuestion) == String(key)
              // String(data.kycOption).indexOf(value) !== -1
            ) {
              const num = data.kycOption.length;
              // multiCnt = data.kycOption.length;
              multiCnt = num;
            }
          });
          // if (
          //   this.props.checkedArray.findIndex(
          //     (data) => String(data.kycQuestion) === String(key),
          //   ) !== -1
          // ) {
          //   multiCnt = this.props.checkedArray[
          //     this.props.checkedArray.findIndex(
          //       (data) => String(data.kycQuestion) === String(key),
          //     )
          //   ].kycOption.length;
          // }
          console.log('array><>>>>>>>>>', this.props.checkedArray);
          //checkbox - 3개 초과 금지 처리 /
          if (this.props.typeName == 'checkbox') {
            console.log('multiCnt', multiCnt);
            if (multiCnt >= 5) {
              console.log('3개초과3개초과3개초과3개초과3개초과');
              // this.props.handleQuestion(
              //   key,
              //   value,
              //   'MINUS',
              //   this.props.typeName,
              // );
              this.props.setModalVisible(true);
              return false;
            }
            //roundbutton - 단일 선택
          } else if (this.props.typeName == 'radiobutton') {
            if (index >= 0) {
              this.props.handleQuestion(
                key,
                Number(this.props.checkedArray[index].kycOption),
                'MINUS',
                this.props.typeName,
              );
            }
          }
          this.props.handleQuestion(key, value, 'PLUS', this.props.typeName);
          //survey checkbox plus
        } else if (this.props.survey_handleQuestion) {
          const index = this.props.checkedArray.findIndex(
            (y) => String(y.surveyQuestionNum) == String(key),
          );

          if (index >= 0) {
            this.props.survey_handleQuestion(
              key,
              value,
              'MINUS',
              label,
              this.props.surveyId,
              this.props.surveyQuestionId,
            );
          }

          this.props.survey_handleQuestion(
            key,
            value,
            'PLUS',
            label,
            this.props.surveyId,
            this.props.surveyQuestionId,
          );
        } else if (this.props.handleCheckedbox) {
          this.props.handleCheckedbox(value, 'PLUS');
        } else if (this.props.handleCheckedArray) {
          // 사용가능 언어 추가
          this.props.handleCheckedArray(this.props.checkedObjArr.fetchArray());
        }
        // this.props.handleCheckedArray(this.props.checkedObjArr.fetchArray());
        // console.log(this.props.checkedObjArr.fetchArray());
        // console.log(this.props.checkedObjArr.fetchArray().length);
      } else {
        // this.props.handleUnCheckedArray(key);

        // kyc 선택문항 - survey
        if (this.props.handleQuestion) {
          this.props.handleQuestion(key, value, 'MINUS', this.props.typeName);
          //survey checkbox plus
        } else if (this.props.survey_handleQuestion) {
          this.props.survey_handleQuestion(
            key,
            value,
            'MINUS',
            label,
            this.props.surveyId,
            this.props.surveyQuestionId,
          );
        } else if (this.props.handleCheckedbox) {
          this.props.handleCheckedbox(value, 'MINUS');
        } else if (this.props.handleUnCheckedArray) {
          // 사용가능 언어 삭제
          this.props.handleUnCheckedArray(key);
        }

        this.props.checkedObjArr.fetchArray().splice(
          this.props.checkedObjArr.fetchArray().findIndex((y) => y.key == key),
          1,
        );
        if (label === 'all') {
          this.props.handleAll(false);
        }
      }
    });
  }
  render() {
    // let a = [];
    // a = this.props.checkedArray.filter(
    //   (data) => data.value == this.props.value,
    // );

    // // console.log(a);
    // if (a.length !== 0) {
    //   console.log('props.>>>>>', a);
    //   console.log('체크됨체크됨체크됨체크됨체크됨');
    // }
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
            style={[
              {
                // padding: 1.5,
                borderRadius: 50,
                width: this.props.size,
                height: this.props.size,
                borderWidth: this.props.borderWidth,
                borderColor: this.props.borderColor,
                // backgroundColor: this.props.color,
              },
              this.state.checked && {borderWidth: 0},
            ]}>
            {this.state.checked ? (
              <View style={[styles.selectedUI, {borderWidth: 0}]}>
                <Image
                  source={require('../../imgs/drawable-xhdpi/icon_w_check_2_on_m.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            ) : (
              <View style={styles.uncheckedCheckbox}>
                <Image
                  source={require('../../imgs/drawable-xhdpi/icon_w_check2_off_m.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            )}
          </View>
          {/* <Text style={[styles.checkboxLabel, {color: this.props.labelColor}]}>
            {this.props.label}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

RoundCheckbox.propTypes = {
  // keyValue: PropTypes.number.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
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
  borderWidth: 1,
  borderColor: '#787878',
  label: 'Default',
  color: '#164895',
  labelColor: '000000',
};

const styles = StyleSheet.create({
  CheckboxContainer: {
    flex: 1,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 25 : 0,
  },

  // showSelectedButton: {
  //   padding: 20,
  //   marginTop: 25,
  //   alignSelf: 'stretch',
  //   backgroundColor: '#5D52FF'
  // },

  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    alignSelf: 'stretch',
  },

  selectedUI: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#2B97FB',
    // borderWidth: 1,
    // borderColor: '#2B97FB',
  },

  checkboxTickImg: {
    width: '70%',
    height: '70%',
    // tintColor: '#ffffff',
    resizeMode: 'contain',
  },

  uncheckedCheckbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#666',
  },

  checkboxLabel: {
    display: 'none',
    fontSize: 18,
    paddingLeft: 15,
  },
});
