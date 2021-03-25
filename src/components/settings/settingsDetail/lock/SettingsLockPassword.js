import React, {Component, useEffect, useState} from 'react';
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
} from 'react-native';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ResetStyle from '@style/ResetStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStyle from '@style/AuthStyle';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

const WalletPassword = ({navigation}) => {
  const [passArr, setPassArr] = useState([]);
  const [rePassArr, setRePassArr] = useState([]);
  const [pass, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const {t} = useTranslation();

  const walletPasswordApi = async (walletPw) => {
    await axios
      .post(`${server}/wallet`, {
        userNo: await AsyncStorage.getItem('userNo'),
        walletPw: walletPw,
      })
      .then((response) => {
        console.log(response);

        setWalletAddress(response.data.walletAddress);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleNextPage = async () => {
    navigation.navigate('WalletMasterKey', {
      walletAddress: this.state.walletAddress,
    });
  };
  const handlePass = async (value, e) => {
    console.log(value);
    let passArr = passArr.slice();
    let rePassArr = rePassArr.slice();
    let test = '';
    if (passArr.length <= 4) {
      // this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });

      setPassArr(passArr.concat({id: passArr.length, value}));
    } else if ((passArr.length = 5)) {
      console.log('last');
      // await this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });
      setPassArr(passArr.concat({id: passArr.length, value}));

      //first pass
      if (pass == '') {
        await passArr.map((data) => {
          test += data.value;
        });

        setPass(test);
      } else if (pass != '') {
        await passArr.map((data) => {
          test += data.value;
        });
        // console.log('비교비교>>>>', test == this.state.pass);
        if (test != pass) {
          setModalVisible(true);
        } else if (test == pass) {
          console.log('1212');
          await walletPasswordApi(pass);
          console.log('3434');

          setModal2Visible(true);
        }
      }

      // this.setState({
      //   passArr: [],
      // });
      setPassArr([]);
    }
    console.log('pass', pass);
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        <View>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/backIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            {t('settingsLockPasswordTitle')}
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {pass == ''
              ? t('settingsLockPassword1')
              : t('settingsLockPassword2')}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[0] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[0] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                passArr[1] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[1] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                passArr[2] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[2] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
            <View
              style={[
                styles.passGray,
                {marginLeft: '3%'},
                passArr[3] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[3] != undefined && (
                <View
                  style={[
                    AuthStyle.initial2NormalDot,
                    {backgroundColor: '#FFF'},
                  ]}></View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.keyboard}>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('1');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('2');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('3');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('4');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('5');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('6');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('7');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('8');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('9');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardView}>
          <TouchableOpacity
            style={[styles.keyboardDetail, {backgroundColor: '#f5f5f6'}]}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePass('0');
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.keyboardDetail}
            onPress={() => {
              handlePassErase();
            }}>
            <Image
              style={styles.keyboardCancelButton}
              source={require('@images/iconDelete.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text={t('settingsLockPassword3')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('settingsLockPassword4')}
        confirm={t('settingsLockPassword5')}
        handleNextPage={handleNextPage}
      />
    </SafeAreaView>
  );
};

// class WalletPassword extends Component {
//   state = {
//     passArr: [],
//     rePassArr: [],
//     pass: '',
//     modalVisible: false,
//     modal2Visible: false,
//     walletAddress: '',
//   };
//   walletPasswordApi = async (walletPw) => {
//     await axios
//       .post(`${server}/wallet`, {
//         userNo: await AsyncStorage.getItem('userNo'),
//         walletPw: walletPw,
//       })
//       .then((response) => {
//         console.log(response);
//         this.setState({
//           walletAddress: response.data.walletAddress,
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };
//   handlePass = async (value, e) => {
//     console.log(value);
//     let passArr = this.state.passArr;
//     let rePassArr = this.state.rePassArr;
//     let test = '';
//     if (passArr.length <= 4) {
//       this.setState({
//         passArr: passArr.concat({id: passArr.length, value}),
//       });
//     } else if ((passArr.length = 5)) {
//       console.log('last');
//       await this.setState({
//         passArr: passArr.concat({id: passArr.length, value}),
//       });

//       //first pass
//       if (this.state.pass == '') {
//         await this.state.passArr.map((data) => {
//           test += data.value;
//         });
//         await this.setState({
//           pass: test,
//         });
//         console.log('test', test);
//       } else if (this.state.pass != '') {
//         await this.state.passArr.map((data) => {
//           test += data.value;
//         });
//         // console.log('비교비교>>>>', test == this.state.pass);
//         if (test != this.state.pass) {
//           this.setModalVisible(true);
//         } else if (test == this.state.pass) {
//           console.log('1212');
//           await this.walletPasswordApi(this.state.pass);
//           console.log('3434');
//           console.log(this.state.walletAddress);
//           this.setModal2Visible(true);
//         }
//       }

//       this.setState({
//         passArr: [],
//       });
//     }
//     console.log('pass', this.state.pass);
//   };
//   handlePassErase = (e) => {
//     let passArr = this.state.passArr;
//     let rePassArr = this.state.rePassArr;
//     if (passArr.length != 0) {
//       this.setState({
//         passArr: passArr.filter((data) => data.id != passArr.length - 1),
//       });
//     }
//   };
//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//   };
//   setModal2Visible = (visible) => {
//     this.setState({modal2Visible: visible});
//   };
//   handleNextPage = async () => {
//     this.props.navigation.navigate('WalletMasterKey', {
//       walletAddress: this.state.walletAddress,
//     });
//   };

//   render() {
//     const {t} = this.props;
//     const passArr = this.state.passArr;
//     return (
//       <SafeAreaView style={[ResetStyle.container]}>
//         <View style={ResetStyle.containerInner}>
//           <View>
//             {/* topBackButton */}
//             <View style={[ResetStyle.topBackButton]}>
//               <TouchableOpacity
//                 style={{
//                   padding: 5,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexDirection: 'row',
//                 }}
//                 onPress={() => {
//                   this.props.navigation.goBack();
//                 }}>
//                 <Image
//                   style={{
//                     width: Platform.OS === 'ios' ? 28 : 25,
//                     height: Platform.OS === 'ios' ? 28 : 25,
//                     resizeMode: 'contain',
//                   }}
//                   source={require('@images/backIcon.png')}
//                 />
//               </TouchableOpacity>
//             </View>
//             <Text
//               style={[
//                 ResetStyle.fontBoldK,
//                 ResetStyle.fontDG,
//                 {marginTop: '20%'},
//               ]}>
//               {t('settingsLockPasswordTitle')}
//             </Text>
//             <Text
//               style={[
//                 ResetStyle.fontMediumK,
//                 ResetStyle.fontG,
//                 {marginTop: '10%', marginBottom: '20%'},
//               ]}>
//               {this.state.pass == ''
//                 ? t('settingsLockPassword1')
//                 : t('settingsLockPassword2')}
//             </Text>
//             <View
//               style={{
//                 width: '100%',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//               }}>
//               <View
//                 style={[
//                   styles.passGray,
//                   {marginLeft: 0},
//                   passArr[0] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[0] != undefined && (
//                   <View
//                     style={[
//                       AuthStyle.initial2NormalDot,
//                       {backgroundColor: '#FFF'},
//                     ]}></View>
//                 )}
//               </View>
//               <View
//                 style={[
//                   styles.passGray,
//                   {marginLeft: '3%'},
//                   passArr[1] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[1] != undefined && (
//                   <View
//                     style={[
//                       AuthStyle.initial2NormalDot,
//                       {backgroundColor: '#FFF'},
//                     ]}></View>
//                 )}
//               </View>
//               <View
//                 style={[
//                   styles.passGray,
//                   {marginLeft: '3%'},
//                   passArr[2] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[2] != undefined && (
//                   <View
//                     style={[
//                       AuthStyle.initial2NormalDot,
//                       {backgroundColor: '#FFF'},
//                     ]}></View>
//                 )}
//               </View>
//               <View
//                 style={[
//                   styles.passGray,
//                   {marginLeft: '3%'},
//                   passArr[3] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[3] != undefined && (
//                   <View
//                     style={[
//                       AuthStyle.initial2NormalDot,
//                       {backgroundColor: '#FFF'},
//                     ]}></View>
//                 )}
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.keyboard}>
//           <View style={styles.keyboardView}>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '1')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '2')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>2</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '3')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>3</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.keyboardView}>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '4')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>4</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '5')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>5</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '6')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>6</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.keyboardView}>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '7')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>7</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '8')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>8</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '9')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>9</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.keyboardView}>
//             <TouchableOpacity
//               style={[styles.keyboardDetail, {backgroundColor: '#f5f5f6'}]}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}></Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePass.bind(this, '0')}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>0</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.keyboardDetail}
//               onPress={this.handlePassErase}>
//               <Image
//                 style={styles.keyboardCancelButton}
//                 source={require('@images/iconDelete.png')}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <BottomModal
//           modalVisible={this.state.modalVisible}
//           setModalVisible={this.setModalVisible}
//           text={t('settingsLockPassword3')}
//         />
//         <TextConfirmModal
//           modalVisible={this.state.modal2Visible}
//           setModalVisible={this.setModal2Visible}
//           text={t('settingsLockPassword4')}
//           confirm={t('settingsLockPassword5')}
//           handleNextPage={this.handleNextPage}
//         />
//       </SafeAreaView>
//     );
//   }
// }
const styles = StyleSheet.create({
  passGray: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    // flex: 1,
    marginLeft: '3%',
    width: '14%',
    height: 50,
    // height: 30,
    // width: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: 20,
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
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardCancelButton: {
    width: '40%',
    height: '30%',
    resizeMode: 'contain',
    // color: '#fff',
  },
});

// export default hoistStatics(withTranslation()(WalletPassword), WalletPassword);
export default WalletPassword;
