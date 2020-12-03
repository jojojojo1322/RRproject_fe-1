import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class TextConfirmCancelModal extends Component {
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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex: 1, position: 'relative'}}>
          {/* modal background */}
          <TouchableWithoutFeedback
            // style={styles.centeredView}
            activeOpacity={0.55}
            onPress={() => {
              this.setState({modalVisible: !modalVisible});
              this.props.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView2}></View>
          </TouchableWithoutFeedback>

          {/* modal view */}
          <View style={styles.modalView2}>
            <Text style={styles.modalText2}>정말 로그아웃 하시겠습니까?</Text>
            <View style={styles.modalView2bottom2Button}>
              <TouchableOpacity
                style={styles.modalView2bottom2Button1}
                onPress={() => {
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.closeButtonText2}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalView2bottom2Button2}
                onPress={() => {
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.closeButtonText2}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  centeredView2: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView2: {
    flex: 1,
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView2: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText2: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: '5%',
    marginBottom: '5%',
  },
  closeButton2: {
    width: '90%',
    backgroundColor: '#F194FF',
    elevation: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  closeButtonText2: {
    color: '#4696ff',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
  },
  modalView2bottom2Button: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  modalView2bottom2Button1: {
    width: '50%',
    borderBottomLeftRadius: 5,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.3,
    borderTopColor: '#707070',
    borderRightWidth: 0.3,
    borderRightColor: '#707070',
  },
  modalView2bottom2Button2: {
    width: '50%',
    borderBottomRightRadius: 5,
    backgroundColor: '#ffffff',
    borderTopWidth: 0.3,
    borderTopColor: '#707070',
  },
});
export default TextConfirmCancelModal;
