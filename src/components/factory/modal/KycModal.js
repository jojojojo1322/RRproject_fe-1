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

class KycModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    // this.setModalVisible = this.setModalVisible.bind(this);
  }
  //   state = {
  //     modalVisible: this.props.modalVisible,
  //   };
  componentDidUpdate(preProps, preState) {
    if (preProps.modalVisible != this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
    console.log('MODAL>>> ', visible);
  };
  render() {
    const {modalVisible} = this.state;
    console.log(modalVisible);
    return (
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
              this.setState({modalVisible: !modalVisible});
              this.props.setModalVisible(!modalVisible);
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
              KYC LEVEL이란?
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
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
                리얼리서치 설문조사에 참여할 수 있는 LEVEL 을 의미합니다.
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
                LEVEL이 높아질수록 설문조사 참여가능 수와 보상이 높아집니다.
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
                해당 KYC 정보는 참여 조건을 확인하고 결과 리포트에 반영될 뿐
                회원님을 구별할 수 있는 정보는 저장하지 않습니다.
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
                리얼리서치는 회원님의 KYC 정보를 블록체인에 저장하여 개인 정보를
                안전하게 지켜드립니다.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default KycModal;
