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
        if (this.props.handleQuestion) {
          const index = this.props.checkedArray.findIndex(
            (y) => y.question === key,
          );
          //다중선택 금지 처리
          if (index >= 0) {
            this.props.handleQuestion(
              key,
              this.props.checkedArray[index].answer,
              'MINUS',
            );
          }
          this.props.handleQuestion(key, value, 'PLUS');
        } else if (this.props.handleCheckedbox) {
          this.props.handleCheckedbox(value, 'PLUS');
        } else if (this.props.handleCheckedArray) {
          this.props.handleCheckedArray(this.props.checkedObjArr.fetchArray());
        }
        // this.props.handleCheckedArray(this.props.checkedObjArr.fetchArray());
        // console.log(this.props.checkedObjArr.fetchArray());
        // console.log(this.props.checkedObjArr.fetchArray().length);
      } else {
        // this.props.handleUnCheckedArray(key);

        if (this.props.handleQuestion) {
          this.props.handleQuestion(key, value, 'MINUS');
        } else if (this.props.handleCheckedbox) {
          this.props.handleCheckedbox(value, 'MINUS');
        } else if (this.props.handleUnCheckedArray) {
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
              // padding: 1.5,
              borderRadius: 50,
              width: this.props.size,
              height: this.props.size,
              borderWidth: this.props.borderWidth,
              borderColor: this.props.borderColor,
              // backgroundColor: this.props.color,
            }}>
            {this.state.checked ? (
              <View style={styles.selectedUI}>
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
  keyValue: PropTypes.number.isRequired,
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
    borderWidth: 1,
    borderColor: '#2B97FB',
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
