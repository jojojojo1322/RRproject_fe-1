import React, {Component} from 'react';
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
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import BottomModal from '../factory/modal/BottomModal';
import TextConfirmModal from '../factory/modal/TextConfirmModal';

export default class WalletPassword extends Component {
  state = {
    passArr: [],
    rePassArr: [],
    pass: '',
    modalVisible: false,
    modal2Visible: false,
  };
  handlePass = async (value, e) => {
    console.log(value);
    let passArr = this.state.passArr;
    let rePassArr = this.state.rePassArr;
    let test = '';
    if (passArr.length <= 4) {
      this.setState({
        passArr: passArr.concat({id: passArr.length, value}),
      });
    } else if ((passArr.length = 5)) {
      console.log('last');
      await this.setState({
        passArr: passArr.concat({id: passArr.length, value}),
      });

      //first pass
      if (this.state.pass == '') {
        await this.state.passArr.map((data) => {
          test += data.value;
        });
        await this.setState({
          pass: test,
        });
        console.log('test', test);
      } else if (this.state.pass != '') {
        await this.state.passArr.map((data) => {
          test += data.value;
        });
        // console.log('비교비교>>>>', test == this.state.pass);
        if (test != this.state.pass) {
          this.setModalVisible(true);
        } else if (test == this.state.pass) {
          this.setModal2Visible(true);
        }
      }

      this.setState({
        passArr: [],
      });
    }
    console.log('pass', this.state.pass);
  };
  handlePassErase = (e) => {
    let passArr = this.state.passArr;
    let rePassArr = this.state.rePassArr;
    if (passArr.length != 0) {
      this.setState({
        passArr: passArr.filter((data) => data.id != passArr.length - 1),
      });
    }
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
  };
  render() {
    const passArr = this.state.passArr;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.titleText}>지갑 비밀번호</Text>
          <Text style={styles.subText}>
            {this.state.pass == ''
              ? `지갑 전송 시 사용할 ${'\n'}6자리 비밀번호를 입력해 주세요`
              : `비밀번호 확인을 위해${'\n'}한번 더 입력해 주세요`}
          </Text>
          <View style={styles.passGrayAll}>
            <View style={[styles.passGray, {marginLeft: 0}]}>
              <Text style={styles.passGrayText}>
                {passArr[0] == undefined ? '' : '*'}
              </Text>
            </View>
            <View style={styles.passGray}>
              <Text style={styles.passGrayText}>
                {passArr[1] == undefined ? '' : '*'}
              </Text>
            </View>
            <View style={styles.passGray}>
              <Text style={styles.passGrayText}>
                {passArr[2] == undefined ? '' : '*'}
              </Text>
            </View>
            <View style={styles.passGray}>
              <Text style={styles.passGrayText}>
                {passArr[3] == undefined ? '' : '*'}
              </Text>
            </View>
            <View style={styles.passGray}>
              <Text style={styles.passGrayText}>
                {passArr[4] == undefined ? '' : '*'}
              </Text>
            </View>
            <View style={styles.passGray}>
              <Text style={styles.passGrayText}>
                {passArr[5] == undefined ? '' : '*'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.keyboard}>
          <View style={styles.keyboardView}>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '1')}>
              <Text style={styles.keyboardDetailText}>1</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '2')}>
              <Text style={styles.keyboardDetailText}>2</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '3')}>
              <Text style={styles.keyboardDetailText}>3</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.keyboardView}>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '4')}>
              <Text style={styles.keyboardDetailText}>4</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '5')}>
              <Text style={styles.keyboardDetailText}>5</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '6')}>
              <Text style={styles.keyboardDetailText}>6</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.keyboardView}>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '7')}>
              <Text style={styles.keyboardDetailText}>7</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '8')}>
              <Text style={styles.keyboardDetailText}>8</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '9')}>
              <Text style={styles.keyboardDetailText}>9</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.keyboardView}>
            <TouchableHighlight
              style={[styles.keyboardDetail, {backgroundColor: '#f5f5f6'}]}>
              <Text style={styles.keyboardDetailText}></Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardDetail}
              onPress={this.handlePass.bind(this, '0')}>
              <Text style={styles.keyboardDetailText}>0</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.keyboardCancelButtonDetail}
              onPress={this.handlePassErase}>
              <Image
                style={styles.keyboardCancelButton}
                source={require('../../imgs/drawable-mdpi/icon_w_delete.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <BottomModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          text={`비밀번호가 일치하지 않습니다.`}
        />
        <TextConfirmModal
          modalVisible={this.state.modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`비밀번호가 설정되었습니다.`}
          confirm={`확인`}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    width: '100%',
    height: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  container2: {
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 71,
    marginBottom: 30,
    fontSize: 27,
    fontWeight: '600',
    lineHeight: 36,
  },
  subText: {
    marginBottom: 58,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '200',
    lineHeight: 36,
  },
  passGrayAll: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passGray: {
    backgroundColor: '#dddddd',
    textAlign: 'center',
    flex: 1,
    marginLeft: '3%',
    // width: '14%',
    height: 53,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 20,
  },
  passGrayText: {
    fontSize: 30,
    marginTop: 10,
  },
  keyboard: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'stretch',
  },
  keyboardDetail: {
    flex: 1,
    height: 70,
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardDetailText: {
    fontSize: 26,
  },
  keyboardCancelButtonDetail: {
    flex: 1,
    height: 80,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#164895',
  },
  keyboardCancelButton: {
    // color: '#fff',
    resizeMode: 'center',
  },
});
