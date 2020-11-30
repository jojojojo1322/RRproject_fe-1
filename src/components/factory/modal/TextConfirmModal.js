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
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';

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
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText2}>{this.props.text}</Text>
          </View>
          <TouchableHighlight
            style={{...styles.closeButton2, backgroundColor: '#164895'}}
            // onPress={() => {
            //   this.setmodalVisible(!modalVisible).bind(this);
            // }}>
            onPress={() => {
              this.setState({modalVisible: !modalVisible});
              this.props.setModalVisible(!modalVisible);
            }}>
            <Text style={styles.closeButtonText2}>{this.props.confirm}</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText2: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
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
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
  },
});

export default TextConfirmModal;
