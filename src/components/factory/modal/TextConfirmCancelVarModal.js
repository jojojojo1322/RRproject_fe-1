import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {useTranslation} from 'react-i18next';

// 왼쪽 버튼 text-> cancel onPress-> cancelHandle
// 오른쪽 버튼 text-> confirm onPress-> confirmHandle

const TextConfirmCancelVarModal = ({
  modalVisible,
  setModalVisible,
  text,
  confirm,
  confirmHandle,
  cancel,
  cancelHandle,
  kycLevel,
  levelCheck,
}) => {
  const {t, i18n} = useTranslation();
  console.log('modal KYC', kycLevel);
  console.log('levelCheck', levelCheck);
  return modalVisible ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible === true && kycLevel === levelCheck ? true : false}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      // }}
    >
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          // style={styles.centeredView}
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={[ModalStyle.tccModal]}>
          <Text
            style={[ResetStyle.fontRegularK, ResetStyle.fontDG, {padding: 40}]}>
            {text}
          </Text>
          <View style={[ModalStyle.tccModalBottom]}>
            <TouchableOpacity
              style={[
                ModalStyle.tccModalBottomButton,
                {borderRightWidth: 0.3, borderRightColor: '#707070'},
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                cancelHandle();
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {padding: 20},
                ]}>
                {cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ModalStyle.tccModalBottomButton,
                {borderBottomRightRadius: 5},
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                confirmHandle(kycLevel);
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
      </View>
    </Modal>
  ) : null;
};

export default TextConfirmCancelVarModal;
