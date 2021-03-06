import React, {Component} from 'react';
import {View, Text, Modal, Image, TouchableWithoutFeedback} from 'react-native';
import ResetStyle from '@style/ResetStyle';
import ModalStyle from '@style/ModalStyle';
import {useTranslation} from 'react-i18next';

const AudienceModal = ({
  modalVisible,
  setModalVisible,
  level,
  age,
  gender,
  maritalStatus,
  nationality,
  country,
  countryCity,
  language,
}) => {
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={ModalStyle.audienceAllView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('audienceModalTitle')}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 25 : 20,
                  height: Platform.OS === 'ios' ? 25 : 20,
                  resizeMode: 'contain',
                }}
                source={require('@images/icon_close.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[ModalStyle.audienceTop]}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('audienceModal1')}
            </Text>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontB]}>
              {level}
            </Text>
          </View>
          {/* ?????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal2')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {age}
            </Text>
          </View>
          {/* ?????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal3')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {gender}
            </Text>
          </View>
          {/* ???????????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal4')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {maritalStatus}
            </Text>
          </View>
          {/* ?????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal5')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {nationality}
            </Text>
          </View>
          {/* ???????????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal6')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {country}
            </Text>
          </View>
          {/* ???????????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal7')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {countryCity}
            </Text>
          </View>
          {/* ?????? */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal8')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '57%', textAlign: 'left', marginLeft: '3%'},
              ]}>
              {language}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default AudienceModal;
