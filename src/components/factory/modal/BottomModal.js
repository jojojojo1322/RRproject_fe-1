import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ResetStyle from '@style/ResetStyle';
import ModalStyle from '@style/ModalStyle';
import {useTranslation} from 'react-i18next';

const BottomModal = ({modalVisible, setModalVisible, text}) => {
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback
        activeOpacity={0.55}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[ModalStyle.bottomModalBG]}>
          <View style={[ModalStyle.bottomModal]}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
              {text}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  ) : null;
};
export default BottomModal;
