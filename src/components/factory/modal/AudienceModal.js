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

// 사용 props

// setModalVisible={this.setModalVisible}
// modalVisible={this.state.modalVisible}
// level={`2`}
// age={`25`}
// gender={`여성`}
// maritalStatus={`미혼`}
// nationality={`한국`}
// country={`한국`}
// countryCity={`서울`}
// language={`한국어`}

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
            <View style={styles.centeredView}></View>
          </TouchableWithoutFeedback>

          {/* modal view */}
          <View style={styles.AudienceAllView}>
            <View style={styles.AudienceTop}>
              <Text style={styles.AudienceTopLeft}>Audience</Text>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
            <View style={[styles.AudienceTop2]}>
              <Text style={[styles.AudienceTop2Text]}>참여가능 LEVEL : </Text>
              <Text style={[styles.AudienceTop2Text2]}>{this.props.level}</Text>
            </View>
            {/* 나이 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>나이</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.age}
                </Text>
              </View>
            </View>
            {/* 성별 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>성별</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.gender}
                </Text>
              </View>
            </View>
            {/* 결혼유무 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>결혼유무</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.maritalStatus}
                </Text>
              </View>
            </View>
            {/* 국적 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>국적</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.nationality}
                </Text>
              </View>
            </View>
            {/* 거주국가 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>거주국가</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.country}
                </Text>
              </View>
            </View>
            {/* 거주도시 */}
            <View style={styles.AudienceDetail}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>거주도시</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.countryCity}
                </Text>
              </View>
            </View>
            {/* 언어 */}
            <View style={styles.AudienceDetailLast}>
              <View style={styles.AudienceDetailLeft}>
                <Text style={styles.AudienceDetailLeftText}>언어</Text>
              </View>
              <View style={styles.AudienceDetailRight}>
                <Text style={styles.AudienceDetailRightText}>
                  {this.props.language}
                </Text>
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
    // backgroundColor: '#f5f5f5',
    marginTop: 21,
    marginBottom: 19,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  AudienceTop2Text: {
    fontSize: 23,
    fontWeight: '600',
  },
  AudienceTop2Text2: {
    fontSize: 23,
    fontWeight: '600',
    color: '#2d91ff',
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
    backgroundColor: '#f9f9f9',
    // alignItems: 'baseline',
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  AudienceDetailRight: {
    backgroundColor: '#f9f9f9',
    width: '70%',

    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#f9f9f9',
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  AudienceDetailLeftText: {
    // position: 'absolute',
    // width: '30%',
    marginLeft: 25,
    color: '#2d91ff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 15,
    // textAlign: '',
    // paddingBottom: 10,
    // paddingLeft: 36,
    // paddingRight: 36,
  },
  AudienceDetailRightText: {
    fontSize: 20,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 20,
    // paddingRight: 195,
  },
});
export default AudienceModal;
