import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// function padTime(time) {
//   return time.toString().padStart(2, '0');
// }

const padTime = (time) => {
  return time.toString().padStart(2, '0');
};

export default class CountDown extends Component {
  // state={

  // }

  render() {
    const minutes = padTime(Math.floor(this.props.timeLeftNumber / 60));
    const seconds = padTime(this.props.timeLeftNumber - minutes * 60);
    const intervalRef = React.useRef(null);
    return (
      <View>
        <Text>
          {minutes}:{seconds}
        </Text>
      </View>
    );
  }
}
