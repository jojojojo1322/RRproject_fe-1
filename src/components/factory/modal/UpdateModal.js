import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {useTranslation} from 'react-i18next';

const UpdateModal = ({
  modalVisible,
  setModalVisible,
  text,
  confirm,
  handleUpdateStore,
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
        <View style={[ModalStyle.modalCenteredView]}></View>

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
              handleUpdateStore();
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

export default UpdateModal;
