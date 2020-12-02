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

class AudienceModal extends Component {
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

          {/* modal view */}
          <View style={styles.AudienceAllView}>
            <View style={styles.AudienceTop}>
              <Text style={styles.AudienceTopLeft}>Audience</Text>
              <TouchableHighlight
                style={styles.AudienceTopRight}
                onPress={() => {
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }}>
                {/* <Text style={styles.KycCloseButtonText2}>x</Text> */}
                <Image
                  style={styles.AudienceTopRight}
                  source={require('../../../imgs/drawable-hdpi/icon_close.png')}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.AudienceTop2}>참여가능 LEVEL : Level 2</Text>

            {/* 나이 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>나이</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>25</Text>
              </View>
            </View>
            {/* 성별 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>성별</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>여성</Text>
              </View>
            </View>
            {/* 결혼유무 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>결혼유무</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>미혼</Text>
              </View>
            </View>
            {/* 국적 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>국적</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>한국</Text>
              </View>
            </View>
            {/* 거주국가 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>거주국가</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>한국</Text>
              </View>
            </View>
            {/* 거주도시 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>거주도시</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>서울</Text>
              </View>
            </View>
            {/* 언어 */}
            <View style={styles.AudienceDetailLast}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>언어</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>한국어</Text>
              </View>
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
  AudienceAllView: {
    position: 'absolute',
    top: '17.5%',
    left: '5%',
    width: '90%',
    backgroundColor: 'white',
    paddingTop: 23,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    // padding: 30,
    // alignItems: 'center',
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
    // flex: 5,
    flexDirection: 'row',
  },
  AudienceTopLeft: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  AudienceTopRight: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
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
    // flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  AudienceDetailLast: {
    // flex: 1,
    flexDirection: 'row',
    // paddingBottom: 10,
  },

  AudienceDetailLeft: {
    width: '30%',
    backgroundColor: '#1e4683',
    borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  AudienceDetailRight: {
    // backgroundColor: '#1e4683',
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4696ff',
    // borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  AudienceDetailLeftText: {
    // position: 'absolute',
    // width: '30%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 15,
    textAlign: 'center',
    // paddingBottom: 10,
    // paddingLeft: 36,
    // paddingRight: 36,
  },
  AudienceDetailRightText: {
    fontSize: 15,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 20,
    // paddingRight: 195,
  },
});
export default AudienceModal;
