import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';

class BottomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
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
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            this.setState({modalVisible: !modalVisible});
            this.props.setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.bottomModalBG]}>
            <View style={[ModalStyle.bottomModal]}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                {this.props.text}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
export default BottomModal;
