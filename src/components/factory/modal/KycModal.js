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
import ResetStyle from '../../../style/ResetStyle';

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
            <View style={styles.centeredView}></View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.modalView}>
          <View style={styles.KycModalTopView}>
            <Text style={styles.KycModalTopText}>KYC LEVEL이란?</Text>
            <TouchableWithoutFeedback
              style={styles.KycModalView2bottom2Button}
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
              }}>
              <Image
                style={styles.closeButton}
                source={require('../../../imgs/drawable-hdpi/icon_close.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.KycModalView}>
            <Text style={styles.KycModalText}>
              리얼리서치 설문조사에 참여할 수 있는 LEVEL 을 의미합니다.
            </Text>
            <Text style={styles.KycModalText}>
              LEVEL이 높아질수록 설문조사 참여가능 수와 보상이 높아집니다.
            </Text>
            <Text style={styles.KycModalText}>
              해당 KYC 정보는 참여 조건을 확인하고 결과 리포트에 반영될 뿐
              회원님을 구별할 수 있는 정보는 저장하지 않습니다.
            </Text>
            <Text style={styles.KycModalText}>
              리얼리서치는 회원님의 KYC 정보를 블록체인에 저장하여 개인 정보를
              안전하게 지켜드립니다.
            </Text>
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
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
    position: 'absolute',
    top: '25%',
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
  KycModalTopView: {
    width: '100%',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: '5%',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    paddingLeft: 20,
    paddingRight: 20,
  },
  KycModalView: {
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
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
  KycModalTopText: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  KycModalText: {
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: '5%',
  },
});
export default KycModal;
