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

class TextConfirmModal extends Component {
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
  };
  render() {
    const {modalVisible} = this.state;
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
              this.props.handleNextPage();
            }}>
            <View style={[ModalStyle.modalCenteredView]}></View>
          </TouchableWithoutFeedback>

          {/* modal view */}
          <View style={[ModalStyle.tccModal]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {padding: 40},
              ]}>
              {this.props.text}
            </Text>
            <TouchableOpacity
              style={[ModalStyle.tcModalButton, {backgroundColor: '#fff'}]}
              // onPress={() => {
              //   this.setmodalVisible(!modalVisible).bind(this);
              // }}>
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
                this.props.handleNextPage();
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {padding: 20},
                ]}>
                {this.props.confirm}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default TextConfirmModal;
