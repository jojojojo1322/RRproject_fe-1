import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

class ProgressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.modalVisible != this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback activeOpacity={0.55}>
          <View
            style={{
              flex: 1,
              height: '60%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'hsla(0, 0%, 20%, 0.1)',
              paddingBottom: '5%',
            }}>
            <ActivityIndicator size="large" color="#4696ff" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
export default ProgressModal;
