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
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';

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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            this.setState({modalVisible: !modalVisible});
            this.props.setModalVisible(!modalVisible);
            console.log('aaaa');
          }}>
          <View style={styles.modalFooterBg}>
            <View style={styles.modalFooter}>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
    width: '90%',
    height: '65%',
    backgroundColor: 'white',
    padding: 20,
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
  centeredView: {
    flex: 1,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInputBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#4696ff',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  modalText: {
    fontSize: 20,
    lineHeight: 24,
  },
  closeButton: {
    width: 20,
    height: 20,
  },
  searchInputText: {
    fontSize: 15,
  },
  countryList: {
    width: '100%',
    height: '70%',
    overflow: 'scroll',
    flexDirection: 'column',
    marginTop: 10,
  },
  item: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listImg: {
    width: 25,
    height: 16,
  },

  modalFooterBg: {
    flex: 1,
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
    paddingBottom: '5%',
  },
  modalFooter: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  modalFooterText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },

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
  modalView2bottom2Button: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalView2bottom2Button1: {
    width: '50%',
    borderBottomLeftRadius: 5,
    backgroundColor: '#c6c9cf',
  },
  modalView2bottom2Button2: {
    width: '50%',
    borderBottomRightRadius: 5,
    backgroundColor: '#164895',
  },
  KycModalTopView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'baseline',
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#4696ff',
  },
  KycModalView2bottom2Button1: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'grey',
  },
  KycModalView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 5,
  },
  KycModalTopText2: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  KycModalText2: {
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 20,
    marginTop: '1%',
    marginBottom: '5%',
  },
  KycCloseButtonText2: {
    elevation: 4,
    fontSize: 50,
  },
  AudienceAllView: {
    width: '90%',

    backgroundColor: 'white',
    paddingTop: 23,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AudienceTop: {
    flexDirection: 'row',
  },
  AudienceTopLeft: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  AudienceTopRight: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'grey',
  },
  AudienceTop2: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f5f5f5',
    marginTop: 21,
    marginBottom: 19,
    paddingTop: 16,
    paddingBottom: 16,
  },
  AudienceDetail: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  AudienceDetailLast: {
    flexDirection: 'row',
  },

  AudienceDetailLeft: {
    width: '30%',
    backgroundColor: '#1e4683',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  AudienceDetailRight: {
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4696ff',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  AudienceDetailLeftText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 15,
    textAlign: 'center',
  },
  AudienceDetailRightText: {
    fontSize: 15,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 20,
  },
});
export default BottomModal;
