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
  ActivityIndicator,
} from 'react-native';
import BottomModal from '@factory/modal/BottomModal';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import ProgressModal from '@factory/modal/ProgressModal';
import ResetStyle from '@style/ResetStyle.js';
import {server} from '@context/server';
import axios from 'axios';
import AuthStyle from '@style/AuthStyle';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

const WalletPassword = ({route, navigation}) => {
  const [passArr, setPassArr] = useState([]);
  const [rePassArr, setRePassArr] = useState([]);
  const [pass, setPass] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletCheck, setWalletCheck] = useState('');
  const [transCheck, setTransCheck] = useState('');
  const {t} = useTranslation();

  const walletPasswordApi = async (walletPw) => {
    setModal4Visible(true);
    await axios
      .post(`${server}/wallet`, {
        email: route.params?.email,
        walletPw: walletPw,
      })
      .then(async (response) => {
        console.log('walletPasswordApi 생성 then>>>', response);
        // await this.setState({
        //   walletCheck: response.data.status,
        // });
        setWalletCheck(response.data.status);
        setModal4Visible(false);
      })
      .catch((e) => {
        setModal4Visible(false);
        console.log('walletPasswordApi 생성 then>>>', e);
      });
  };
  useEffect(() => {
    walletKeyApi();
  }, []);

  const walletKeyApi = async () => {
    await axios
      .get(`${server}/wallet/${route.params?.email}`)
      .then(async (response) => {
        console.log('walletKeyApi 지갑주소 마스터키 then >> ', response);
        setWalletAddress(response.data.name);
      })
      .catch((e) => {
        console.log('walletKeyApi 지갑주소 마스터키 error >> ', e);
      });
  };

  const walletTransApi = async () => {
    console.log({
      email: route.params?.email,
      walletAddress: walletAddress,
      walletPw: pass,
    });
    await axios
      .put(`${server}/wallet`, {
        email: route.params?.email,
        walletAddress: walletAddress,
        walletPw: String(pass),
      })
      .then((response) => {
        console.log('월렛지갑주소 저장 then>>>>', response);
        // this.setState({
        //   transCheck: response.data.status,
        // });
        setTransCheck(response.data.status);
      })
      .catch((e) => {
        console.log('월렛지갑주소 저장 error>>>>', e);
      });
  };

  const handlePass = async (value, e) => {
    console.log(value);
    let _passArr = passArr.slice();
    let _rePassArr = rePassArr.slice();
    let test = '';
    if (_passArr.length <= 4) {
      // this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });
      setPassArr(_passArr.concat({id: _passArr.length, value}));
    } else if ((_passArr.length = 5)) {
      console.log('last');
      // await this.setState({
      //   passArr: passArr.concat({id: passArr.length, value}),
      // });
      setPassArr(_passArr.concat({id: _passArr.length, value}));

      //first pass
      if (pass == '') {
        _passArr.map((data) => {
          test += data.value;
        });

        setPass(test);
        console.log('test', test);
      } else if (pass != '') {
        _passArr.map((data) => {
          test += data.value;
        });
        // console.log('비교비교>>>>', test == this.state.pass);
        if (test != pass) {
          // 1차 2차비밀번호 틀릴시 모달
          setModalVisible(true);
        } else if (test == pass) {
          console.log('1212');
          //지갑 생성
          walletPasswordApi(pass);
          console.log('3434');
          console.log(walletCheck);

          if (walletCheck == 'success') {
            //지갑 생성 성공시
            walletKeyApi();
            if (walletAddress !== '') {
              // 지갑 생성 성공시 모달
              setModal2Visible(true);
            } else if (walletAddress !== '') {
            }
          } else if (walletCheck == 'fail') {
            //지갑 생성 실패시
            setModal3Visible(true);
          }
        }
      }
      setPassArr([]);
    }
    console.log('pass', pass);
  };

  const handlePassErase = (e) => {
    let _passArr = passArr.slice();
    let _rePassArr = rePassArr.slice();
    if (_passArr.length != 0) {
      setPassArr(_passArr.filter((data) => data.id != passArr.length - 1));
    }
  };

  const handleNextPage = async () => {
    walletTransApi();
    navigation.navigate('WalletMasterKey', {
      walletAddress: walletAddress,
    });
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View style={ResetStyle.containerInner}>
        <View>
          <Text
            style={[
              ResetStyle.fontBoldK,
              ResetStyle.fontDG,
              {marginTop: '20%'},
            ]}>
            {t('WalletPasswordTitle')}
          </Text>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontG,
              {marginTop: '10%', marginBottom: '20%'},
            ]}>
            {pass == '' ? t('WalletPassword1') : t('WalletPassword2')}
          </Text>
          <View style={styles.passGrayAll}>
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
                {marginLeft: 0},
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
                {marginLeft: 0},
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
                {marginLeft: 0},
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
            <View
              style={[
                styles.passGray,
                {marginLeft: 0},
                passArr[4] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[4] != undefined && (
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
                {marginLeft: 0},
                passArr[5] == undefined ? '' : {backgroundColor: '#4696ff'},
              ]}>
              {passArr[5] != undefined && (
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
        text={t('WalletPassword3')}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('WalletPassword4')}
      />
      <TextConfirmModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('WalletPassword5')}
        confirm={t('WalletPassword6')}
        handleNextPage={handleNextPage}
      />
      <ProgressModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
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
//     modal3Visible: false,
//     modal4Visible: false,
//     walletAddress: '',
//     walletCheck: '',
//     transCheck: '',
//   };
//   walletPasswordApi = async (walletPw) => {
//     this.setModal4Visible(true);
//     await axios
//       .post(`${server}/wallet`, {
//         email: this.props.route.params?.email,
//         walletPw: walletPw,
//       })
//       .then(async (response) => {
//         console.log('walletPasswordApi 생성 then>>>', response);
//         await this.setState({
//           walletCheck: response.data.status,
//         });
//         this.setModal4Visible(false);
//       })
//       .catch((e) => {
//         this.setModal4Visible(false);
//         console.log('walletPasswordApi 생성 then>>>', e);
//       });
//   };
//   componentDidMount() {
//     this.walletKeyApi();
//   }
//   walletKeyApi = async () => {
//     await axios
//       .get(`${server}/wallet/${this.props.route.params?.email}`)
//       .then(async (response) => {
//         console.log('walletKeyApi 지갑주소 마스터키 then >> ', response);
//         await this.setState({
//           walletAddress: response.data.name,
//         });
//       })
//       .catch((e) => {
//         console.log('walletKeyApi 지갑주소 마스터키 error >> ', e);
//       });
//   };
//   walletTransApi = async () => {
//     console.log({
//       email: this.props.route.params?.email,
//       walletAddress: this.state.walletAddress,
//       walletPw: this.state.pass,
//     });
//     await axios
//       .put(`${server}/wallet`, {
//         email: this.props.route.params?.email,
//         walletAddress: this.state.walletAddress,
//         walletPw: String(this.state.pass),
//       })
//       .then((response) => {
//         console.log('월렛지갑주소 저장 then>>>>', response);
//         this.setState({
//           transCheck: response.data.status,
//         });
//       })
//       .catch((e) => {
//         console.log('월렛지갑주소 저장 error>>>>', e);
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
//           // 1차 2차비밀번호 틀릴시 모달
//           this.setModalVisible(true);
//         } else if (test == this.state.pass) {
//           console.log('1212');
//           //지갑 생성
//           await this.walletPasswordApi(this.state.pass);
//           console.log('3434');
//           console.log(this.state.walletCheck);

//           if (this.state.walletCheck == 'success') {
//             //지갑 생성 성공시
//             this.walletKeyApi();
//             if (this.state.walletAddress !== '') {
//               // 지갑 생성 성공시 모달
//               this.setModal2Visible(true);
//             } else if (this.state.walletAddress !== '') {
//             }
//           } else if (this.state.walletCheck == 'fail') {
//             //지갑 생성 실패시
//             this.setModal3Visible(true);
//           }
//         }
//       }

//       this.setState({
//         passArr: [],
//       });
//     }
//     console.log('pass', this.state.pass);
//   };
//   handlePassErase = () => {
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
//   setModal3Visible = (visible) => {
//     this.setState({modal3Visible: visible});
//   };
//   setModal4Visible = (visible) => {
//     this.setState({modal4Visible: visible});
//   };
//   handleNextPage = async () => {
//     this.walletTransApi();
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
//             <Text
//               style={[
//                 ResetStyle.fontBoldK,
//                 ResetStyle.fontDG,
//                 {marginTop: '20%'},
//               ]}>
//               {t('WalletPasswordTitle')}
//             </Text>
//             <Text
//               style={[
//                 ResetStyle.fontMediumK,
//                 ResetStyle.fontG,
//                 {marginTop: '10%', marginBottom: '20%'},
//               ]}>
//               {this.state.pass == ''
//                 ? t('WalletPassword1')
//                 : t('WalletPassword2')}
//             </Text>
//             <View style={styles.passGrayAll}>
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
//                   {marginLeft: 0},
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
//                   {marginLeft: 0},
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
//                   {marginLeft: 0},
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
//               <View
//                 style={[
//                   styles.passGray,
//                   {marginLeft: 0},
//                   passArr[4] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[4] != undefined && (
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
//                   {marginLeft: 0},
//                   passArr[5] == undefined ? '' : {backgroundColor: '#4696ff'},
//                 ]}>
//                 {passArr[5] != undefined && (
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
//           text={t('WalletPassword3')}
//         />
//         <BottomModal
//           modalVisible={this.state.modal3Visible}
//           setModalVisible={this.setModal3Visible}
//           text={t('WalletPassword4')}
//         />
//         <TextConfirmModal
//           modalVisible={this.state.modal2Visible}
//           setModalVisible={this.setModal2Visible}
//           text={t('WalletPassword5')}
//           confirm={t('WalletPassword6')}
//           handleNextPage={this.handleNextPage}
//         />
//         <ProgressModal
//           modalVisible={this.state.modal4Visible}
//           setModalVisible={this.setModal4Visible}
//         />
//       </SafeAreaView>
//     );
//   }
// }
const styles = StyleSheet.create({
  passGrayAll: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardCancelButtonDetail: {
    flex: 1,
    height: 80,
    borderWidth: 0.4,
    // borderStyle: 'solid',
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
