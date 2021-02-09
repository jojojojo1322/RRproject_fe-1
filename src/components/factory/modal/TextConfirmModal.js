import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {useTranslation} from 'react-i18next';
import {exp} from 'react-native/Libraries/Animated/src/Easing';

const TextConfirmModal = ({
  modalVisible,
  setModalVisible,
  text,
  confirm,
  handleNextPage,
}) => {
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      // }}
    >
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
            handleNextPage();
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={[ModalStyle.tccModal]}>
          <Text
            style={[ResetStyle.fontRegularK, ResetStyle.fontDG, {padding: 40}]}>
            {text}
          </Text>
          <TouchableOpacity
            style={[ModalStyle.tcModalButton, {backgroundColor: '#fff'}]}
            onPress={() => {
              setModalVisible(!modalVisible);
              handleNextPage();
            }}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {padding: 20},
              ]}>
              {confirm}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default TextConfirmModal;
