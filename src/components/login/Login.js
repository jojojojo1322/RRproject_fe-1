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

import TextConfirmModal from '../factory/modal/TextConfirmModal';
import {server} from '../defined/server';
import axios from 'axios';
import WalletPassword from './WalletPassword';
import WalletMasterKey from './WalletMasterKey';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

// import RNPickerSelect from 'react-native-picker-select';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[AuthStyle.item, style]}>
    <Text style={AuthStyle.title}>{item.title}</Text>
  </TouchableOpacity>
);

class Login extends Component {
  state = {
    ID: '',
    passWord: '',
    modalVisible: false,
    selectedId: null,
    text: '',
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  handleID = (text) => {
    this.setState({
      ID: text,
    });
  };
  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  handleLoginCheck = () => {
    // if(this.state.Id)
  };
  loginApi = (id, pass) => {
    axios
      .post(`${server}/user/login`, {
        email: id,
        passowrd: pass,
      })
      .then(({data}) => {
        console.log('then', data);
      })
      .catch(({error}) => {
        console.log(error);
      });
  };
  render() {
    const {modalVisible} = this.state;

    const Select = () => {
      // const [selectedId, setSelectedId] = useState(null);

      const renderItem = ({item}) => {
        const backgroundColor =
          item.id === this.state.selectedId ? '#dedede' : '#FFF';

        return (
          <Item
            item={item}
            onPress={() => this.state.selectedId(item.id)}
            style={{backgroundColor}}
          />
        );
      };

      return (
        <SafeAreaView style={ResetStyle.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={this.state.selectedId}
          />
        </SafeAreaView>
      );
    };

    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          {/* <Button title="back" onPress={this.handleBack}></Button> */}

          <View>
            <View style={[{marginTop: 80}]}>
              <Text
                style={[
                  ResetStyle.fontBoldE,
                  ResetStyle.fontB,
                  {textAlign: 'center'},
                ]}>
                Real Research
              </Text>
            </View>

            <View>
              <Text
                style={[
                  ResetStyle.fontRegularE,
                  ResetStyle.fontG,
                  {textAlign: 'center', marginTop: 5},
                ]}>
                Hello there, Login to your account
              </Text>
            </View>
          </View>

          <View style={[AuthStyle.loginBox]}>
            <TextInput
              style={[
                ResetStyle.buttonWhite,
                ResetStyle.fontLightE,
                {marginBottom: 10, marginTop: 40, textAlign: 'left'},
              ]}
              placeholder="Email Address"
              value={this.state.ID}
              // onBlur={ () => this.onBlur() }
              onChangeText={(text) => this.handleID(text)}></TextInput>
            <TextInput
              style={[
                ResetStyle.buttonWhite,
                ResetStyle.fontLightE,
                {marginBottom: 20, textAlign: 'left'},
              ]}
              placeholder="Password"
              secureTextEntry={true}
              value={this.state.passWord}
              // onBlur={ () => this.onBlur() }
              onChangeText={(text) => this.handlePassword(text)}></TextInput>
            {/* <View style={AuthStyle.loginContainer}>
              <TextInput //use the color style to change the text color
           style={{height: 40,backgroundColor: 'white',width:300,color: 'red'}}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         />
            </View> */}
            <TouchableHighlight
              style={ResetStyle.button}
              activeOpacity={0.75}
              onPress={() => {
                // this.setModalVisible(true);
                console.log('id', this.state.ID);
                console.log('pass', this.state.passWord);
                this.loginApi(this.state.ID, this.state.passWord);
                this.props.navigation.navigate('WalletPassword');
                // this.props.navigation.navigate('WalletMasterKey');
              }}>
              <Text style={[ResetStyle.fontRegularE, ResetStyle.fontWhite]}>
                LOGIN
              </Text>
            </TouchableHighlight>
            {/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
          /> */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                this.props.navigation.navigate('Reset');
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularE,
                  ResetStyle.fontB,
                  {marginTop: 20, marginBottom: 30},
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View
              style={[
                AuthStyle.loginMiddleBorder,
                {marginTop: 30, marginBottom: 30},
              ]}
            />

            <Text
              style={[
                ResetStyle.fontLightE,
                ResetStyle.fontG,
                {marginBottom: 10},
              ]}>
              Don't have an account?{' '}
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <Text style={[ResetStyle.fontMediumE, ResetStyle.fontB]}>
                SIGNUP
              </Text>
            </TouchableOpacity>
          </View>

          <TextConfirmModal
            modalVisible={modalVisible}
            setModalVisible={this.setModalVisible}
            text={`현재 지갑이 생성되어 있지 않습니다${'\n'}지갑을 만들어주세요`}
            confirm={`확인`}
          />

          {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>국적선택</Text>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Image source={require('../imgs/icon_close.png')}></Image>
              </TouchableHighlight>
              <View>
                <TextInput
                  placeholder="Search"
                  secureTextEntry={true}
                  value={this.state.passWord}
                  onChangeText={(text) =>
                    this.handlePassword(text)
                  }></TextInput>
                <Image source={require('../imgs/icon_close.png')}></Image>
              </View>
            </View>

            <Select />
          </View>
        </Modal> */}

          <View style={[AuthStyle.loginBottomTextBox, {marginTop: 50}]}>
            <Text
              style={[
                ResetStyle.fontRegularE,
                ResetStyle.fontB,
                {marginTop: 20},
              ]}>
              Powered by Real Research Inc.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   width: '100%',
  //   height: '100%',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#FFF',
  // },
  // title: {
  //   // marginTop: '20%',
  // },
  // titleText: {
  //   textAlign: 'center',
  //   fontSize: 30,
  //   fontWeight: '500',
  //   color: '#4696ff',
  // },
  // sub: {
  //   // marginTop: '-10%',
  // },
  // subText: {
  //   textAlign: 'center',
  //   color: '#a9a9a9',
  //   lineHeight: 25,
  //   fontSize: 18,
  // },
  // loginBox: {
  //   // marginTop: '-40%',
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // loginInput: {
  //   width: '100%',
  //   height: 56,
  //   borderWidth: 1,
  //   borderColor: '#4696ff',
  //   borderRadius: 50,
  //   paddingLeft: 31,
  //   fontSize: 16,
  //   letterSpacing: 0.9,
  //   marginBottom: '5%',
  //   // color: '#999999'
  // },
  // fotgotPassword: {
  //   fontSize: 14,
  //   lineHeight: 20,
  //   color: '#4696ff',
  // },
  // middleBorder: {
  //   // marginBottom: '-30%',
  //   height: 0,
  //   width: '100%',
  //   // borderStyle: 'solid',
  //   borderBottomColor: '#787878',
  //   borderBottomWidth: 0.5,
  // },
  // bottomTextBox: {
  //   width: '100%',
  //   // marginBottom: '8%',
  //   padding: '5%',
  //   alignItems: 'center',
  // },
  // bottomSignupBox: {
  //   // marginTop: '20%',
  //   flexDirection: 'column',
  //   alignSelf: 'center',
  // },
  // buttonBoxText: {
  //   color: '#a9a9a9',
  //   fontWeight: '300',
  //   fontSize: 17,
  //   // color: '#49658f',
  // },
  // bottomSignup: {
  //   alignSelf: 'center',
  // },
  // buttonBoxSignupText: {
  //   fontWeight: '600',
  //   color: '#4696ff',
  //   fontSize: 18,
  // },
  // bottomTextInner: {
  //   marginTop: 10,
  //   textAlign: 'right',
  //   fontSize: 12,
  //   fontWeight: '400',
  //   color: '#4696ff',
  // },
});
export default Login;
