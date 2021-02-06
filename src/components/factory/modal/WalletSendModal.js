import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';

const WalletSendModal = ({
  modalVisible,
  setModalVisible,
  confirm,
  address,
  amount,
  calculatedValue,
  memo,
  valuePlusTen,
}) => {
  // const walletSendApi = async (amount, email, memo, password, to, type) => {
  //   await axios
  //     .post(`${server}/wallet/trans`, {
  //       amount : value,
  //       email : await AsyncStorage.getItem('email'),
  //       memo : memo,
  //       password : null,
  //       to : address,
  //       type : ""
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log('error', e);
  //     });
  // };

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
          // style={styles.centeredView}
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={[ModalStyle.walletAllView]}>
          {/* <View
            //   style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            //   style={{flex: 1}}>
            > */}
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {marginTop: Platform.OS === 'ios' ? '7%' : '3%'},
            ]}>
            송금 하시겠습니까?
          </Text>
          <View
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                style={[ResetStyle.mediumImg]}
                source={require('../../../imgs/drawable-xxxhdpi/delete_icon.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <View style={[ModalStyle.walletMain]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', fontWeight: '500'},
                ]}>
                받는 주소
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', marginTop: '2%'},
                ]}>
                {address === 'e.data' ? null : address}
              </Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', fontWeight: '500'},
                ]}>
                보낼 수량
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {
                    textAlign: 'left',
                    marginTop: Platform.OS === 'ios' ? '2%' : '1%',
                  },
                ]}>
                {parseFloat(amount)} TNC
              </Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', fontWeight: '500'},
                ]}>
                송금 수수료
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {
                    textAlign: 'left',
                    marginTop: Platform.OS === 'ios' ? '2%' : '1%',
                  },
                ]}>
                10 TNC
              </Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', fontWeight: '500'},
                ]}>
                송금 후 잔액
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {
                    textAlign: 'left',
                    marginTop: Platform.OS === 'ios' ? '2%' : '1%',
                  },
                ]}>
                {parseFloat(calculatedValue.toFixed(6))} TNC
              </Text>
            </View>
            <View style={[ModalStyle.walletMain]}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {textAlign: 'left', fontWeight: '500'},
                ]}>
                Memo
              </Text>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontBlack,
                  {
                    textAlign: 'left',
                    marginTop: Platform.OS === 'ios' ? '2%' : '1%',
                  },
                ]}>
                {memo}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[ResetStyle.button, {marginBottom: '5%'}]}
            onPress={() => {
              setModalVisible(!modalVisible);
              confirm();
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : null;
};
export default WalletSendModal;
