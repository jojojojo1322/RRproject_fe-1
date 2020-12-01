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
import WalletPassword from './WalletPassword';
import WalletMasterKey from './WalletMasterKey';

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
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
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
        <SafeAreaView style={styles.container}>
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
      <View style={styles.container}>
        {/* <Button title="back" onPress={this.handleBack}></Button> */}
        <Text style={styles.title}>Real Research</Text>
        <Text style={styles.sub}>Hello there,{'\n'}Login to your account</Text>
        <View style={styles.loginBox}>
          <TextInput
            style={[styles.loginInput]}
            placeholder="Email Address"
            value={this.state.ID}
            // onBlur={ () => this.onBlur() }
            onChangeText={(text) => this.handleID(text)}></TextInput>
          <TextInput
            style={[styles.loginInput]}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.passWord}
            // onBlur={ () => this.onBlur() }
            onChangeText={(text) => this.handlePassword(text)}></TextInput>
          <View style={styles.container}>
            {/* <TextInput //use the color style to change the text color
           style={{height: 40,backgroundColor: 'white',width:300,color: 'red'}}
           onChangeText={(text) => this.setState({text})}
           value={this.state.text}
         /> */}
          </View>
          <TouchableHighlight
            style={styles.loginButton}
            activeOpacity={0.75}
            onPress={() => {
              // this.setModalVisible(true);
              // this.props.navigation.navigate('WalletPassword');
              this.props.navigation.navigate('WalletMasterKey');
            }}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
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
            style={styles.fotgotPasswordBox}
            activeOpacity={0.75}>
            <Text style={styles.fotgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView}
            onPress={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                현재 지갑이 생성되어 있지 않습니다{'\n'}지갑을 만들어주세요
              </Text>
            </View>
            <TouchableHighlight
              style={{...styles.closeButton, backgroundColor: '#164895'}}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <Text style={styles.closeButtonText}>확인</Text>
            </TouchableHighlight>
          </View>
        </Modal> */}
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

        <View style={styles.bottomTextBox}>
          <View style={styles.bottomSignupBox}>
            <Text style={styles.buttonBoxText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.buttonBoxSignupText}>Sign up here</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bottomTextInner}>
            POWERED BY REAL RESEARCH INC.
          </Text>
        </View>
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  title: {
    marginTop: '20%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
  },
  sub: {
    textAlign: 'center',
    color: '#888',
    lineHeight: 25,
    fontSize: 18,
  },
  loginBox: {
    width: '100%',
    alignItems: 'center',
  },
  loginInput: {
    width: '90%',
    height: 56,
    borderWidth: 1,
    borderColor: '#164895',
    borderRadius: 50,
    paddingLeft: 31,
    fontSize: 16,
    letterSpacing: 0.9,
    marginBottom: '5%',
    // color: '#999999'
  },
  loginButton: {
    width: '90%',
    height: 56,
    borderRadius: 30,
    backgroundColor: '#164895',
    color: '#FFF',
    marginBottom: '5%',
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 56,
    fontWeight: '500',
    letterSpacing: 0.9,
  },
  fotgotPasswordBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#164895',
  },
  fotgotPassword: {
    fontSize: 14,
    lineHeight: 20,
    color: '#164895',
  },
  bottomTextBox: {
    width: '100%',
    marginBottom: '8%',
    padding: '5%',
  },
  bottomSignupBox: {
    marginTop: '20%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonBoxText: {
    color: '#164895',
    fontWeight: '200',
    color: '#49658f',
  },
  buttonBoxSignupText: {
    color: '#164895',
    fontWeight: '500',
    color: '#49658f',
  },
  bottomTextInner: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 12,
    color: '#49658f',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
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
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  closeButton: {
    width: '90%',
    backgroundColor: '#F194FF',
    elevation: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
  },
});
export default Login;
