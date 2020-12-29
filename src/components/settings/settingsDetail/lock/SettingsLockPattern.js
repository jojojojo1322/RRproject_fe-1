import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../../../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../../style/ResetStyle.js';
import TextConfirmModal from '../../../factory/modal/TextConfirmModal';

import PasswordGesture from 'react-native-gesture-password';

var Password1 = '123';

export class LockPattern extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Please input your password.',
      status: 'normal',
    };
  }

  onEnd(password) {
    if (password == Password1) {
      this.setState({
        status: 'right',
        message: 'Password is right, success.',
      });

      // your codes to close this view
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.',
      });
    }
  }

  onStart() {
    this.setState({
      status: 'normal',
      message: 'Please input your password.',
    });
  }

  onReset() {
    this.setState({
      status: 'normal',
      message: 'Please input your password (again).',
    });
  }

  render() {
    return (
      <PasswordGesture
        ref="pg"
        status={this.state.status}
        message={this.state.message}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
        innerCircle={true}
        outerCircle={true}
      />
    );
  }
}

const SettingsLockPattern = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleNextPage = () => {
    navigation.navigate('SettingsLockPassword');
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={[ResetStyle.containerInner]}>
        {/* topBackButton */}
        <View style={[ResetStyle.topBackButton]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <LockPattern />
      </View>
      <TextConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text={`패턴 설정이 완료되었습니다.`}
        confirm={`확인`}
        handleNextPage={handleNextPage}
      />
    </SafeAreaView>
  );
};

export default SettingsLockPattern;
