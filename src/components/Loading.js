import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
// import {render} from 'react-dom';

export default class Loading extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../imgs/loading.png')}
        style={{width: '100%', height: '100%'}}></ImageBackground>
    );
  }
}
