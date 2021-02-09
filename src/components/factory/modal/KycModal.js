import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {useTranslation} from 'react-i18next';

const KycModal = ({modalVisible, setModalVisible}) => {
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>
      </View>

      <View style={[ModalStyle.audienceAllView, {top: '25%'}]}>
        <View style={[ModalStyle.kycModal]}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              {fontWeight: '500'},
            ]}>
            {t('modalModalTitle')}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              source={require('../../../imgs/drawable-hdpi/icon_close.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={[ModalStyle.kycListView]}>
          <View style={[ModalStyle.kycList, {marginBottom: '5%'}]}>
            <View style={[ModalStyle.kycDot]}></View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('modalModal1')}
            </Text>
          </View>
          <View style={[ModalStyle.kycList, {marginBottom: '5%'}]}>
            <View style={[ModalStyle.kycDot]}></View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('modalModal2')}
            </Text>
          </View>
          <View style={[ModalStyle.kycList, {marginBottom: '5%'}]}>
            <View style={[ModalStyle.kycDot]}></View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('modalModal3')}
            </Text>
          </View>
          <View style={[ModalStyle.kycList]}>
            <View style={[ModalStyle.kycDot]}></View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              {t('modalModal4')}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default KycModal;
