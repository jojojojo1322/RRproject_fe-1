import React, {useState, Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

const ProgressModal = ({modalVisible = false, setModalVisible}) => {
  console.log('Progress >>> 호출');
  console.log('Progress >>> 호출', modalVisible);

  return modalVisible ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => null}>
    >
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
  ) : null;
};

export default ProgressModal;
