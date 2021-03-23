import React, {Component} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
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

export class Checkbox extends Component {
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
        this.props.handleCheckedArray(this.props.checkedObjArr.fetchArray());
      } else {
        this.props.handleUnCheckedArray(key);
        // this.props.handleUnCheckedArray(this.props.checkedObjArr.fetchArray());
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
        underlayColor="transparent">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              // padding: 1,
              width: this.props.size,
              height: this.props.size,
              borderWidth: this.props.borderWidth,
              borderColor: this.props.borderColor,
              // backgroundColor: this.props.color
            }}>
            {this.state.checked ? (
              <View style={styles.selectedUI}>
                <Image
                  source={require('@images/roundcheck.png')}
                  style={styles.checkboxTickImg}
                />
              </View>
            ) : (
              <View style={styles.uncheckedCheckbox} />
            )}
          </View>
          {/* <Text style={[styles.checkboxLabel, { color: this.props.labelColor }]}>
            {this.props.label}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  }
}

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
  size: 32,
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
    backgroundColor: '#164895',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  checkboxTickImg: {
    width: '85%',
    height: '85%',
    // tintColor: '#ffffff',
    resizeMode: 'contain',
  },

  uncheckedCheckbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  checkboxLabel: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
