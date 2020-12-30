import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';

export default class WalletSendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    // this.setModalVisible = this.setModalVisible.bind(this);
  }
  // this.setModalVisible = this.setModalVisible.bind(this);
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
            // style={styles.centeredView}
            activeOpacity={0.55}
            onPress={() => {
              this.setState({modalVisible: !modalVisible});
              this.props.setModalVisible(!modalVisible);
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
                ResetStyle.fontMediumK,
                ResetStyle.fontBlack,
                {fontSize: 18, marginTop: '7%'},
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
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }}>
                {/* <Text style={styles.KycCloseButtonText2}>x</Text> */}
                <Image
                  source={require('../../../imgs/drawable-xxxhdpi/delete_icon.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View>
              <View style={[ModalStyle.walletMain]}>
                <Text style={[ModalStyle.walletDetailTitle]}>받는 주소</Text>
                <Text style={[ModalStyle.walletDetailsub]}>
                  0x6565232c6565ed6565659desds6565c565c565c565c565c5
                </Text>
              </View>
              <View style={[ModalStyle.walletMain]}>
                <Text style={[ModalStyle.walletDetailTitle]}>보낼 수량</Text>
                <Text style={[ModalStyle.walletDetailsub]}>1,000,000 TNC</Text>
              </View>
              <View style={[ModalStyle.walletMain]}>
                <Text style={[ModalStyle.walletDetailTitle]}>Memo</Text>
                <Text style={[ModalStyle.walletDetailsub]}>10월의 수익</Text>
              </View>
            </View>
            <TouchableOpacity
              style={ResetStyle.button}
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
                this.props.confirm();
              }}>
              <Text style={ResetStyle.buttonTexts}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
