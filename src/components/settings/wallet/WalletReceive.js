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
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';

export default class WalletReceive extends Component {
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          <Text>da</Text>
          <Text>da</Text>
        </View>
      </SafeAreaView>
    );
  }
}
