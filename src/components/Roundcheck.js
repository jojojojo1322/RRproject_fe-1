import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
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
      <TouchableHighlight
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
                  source={require('../imgs/roundcheck.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            ) : (
              <View style={styles.uncheckedCheckbox}>
                <Image
                  source={require('../imgs/roundcheck_gray.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            )}
          </View>
          {/* <Text style={[styles.checkboxLabel, {color: this.props.labelColor}]}>
            {this.props.label}
          </Text> */}
        </View>
      </TouchableHighlight>
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
  borderColor: '#4696ff',
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
    borderRadius: 50,
    backgroundColor: '#164895',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  checkboxTickImg: {
    width: '75%',
    height: '75%',
    // tintColor: '#ffffff',
    resizeMode: 'contain',
  },

  uncheckedCheckbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // backgroundColor: '#FFF',
  },

  checkboxLabel: {
    display: 'none',
    fontSize: 18,
    paddingLeft: 15,
  },
});
