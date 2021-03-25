import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {server} from '@context/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '@style/ResetStyle';
import BottomModal from '@factory/modal/BottomModal';

import {useTranslation} from 'react-i18next';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
// const {t} = useTranslation();

const SettingsPersonal = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [ret_val, setRet_val] = useState('');
  const [userNo, setUserNo] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handlePassword = (e) => {
    this.setState({
      email: e,
    });
  };

  const passwordApi = (email) => {
    axios
      .post(`${server}/util/email/pw-auth`, {
        email,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);

        setAuthKey(response.data.authKey);
        const authKey = response.data.authKey;
        await AsyncStorage.setItem('authKey', authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };

  const passwordUserCheckApi = async (email) => {
    await axios
      .post(`${server}/user/duplicate/mailid`, {
        mailId: email,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.data.userNo);

        setRet_val(response.data.ret_val);
        setUserNo(response.data.userNo);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  useEffect(() => {
    setEmail(route.params?.userInfo.mailId);
    setPhoneNum(route.params?.userInfo.phoneNum);
    console.log(DeviceInfo.getUniqueId());
    console.log('authKey', authKey);
  }, []);
  // componentDidMount = () => {
  //   // console.log(this.props.route.params?.userInfo.mailId);
  //   this.setState({
  //     email: this.props.route.params?.userInfo.mailId,
  //     phoneNum: this.props.route.params?.userInfo.phoneNum,
  //   });
  // };
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        <View>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('settingsPersonalTitle')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Personal Setting */}
          {/* Personal Setting - Email */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal1')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                {email}
              </Text>
            </View>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontB,
                {textAlign: 'left', marginTop: '2%'},
              ]}>
              {t('settingsPersonal2')}
            </Text>
          </View>

          {/* Personal Setting - Password */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal3')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {paddingTop: '3%'},
                ]}>
                ********
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('SettingsPersonalPasswordChange', {
                    email: email,
                    authKey: authKey,
                    userNo: userNo,
                  });
                }}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('@images/kycEditIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Personal Setting - Phone */}
          <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                ResetStyle.textInputTitle,
              ]}>
              {t('settingsPersonal4')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6%',
                paddingBottom: '3%',
                borderBottomWidth: 1,
                borderBottomColor: '#e6e6e6',
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
                {phoneNum}
              </Text>
            </View>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontB,
                {textAlign: 'left', marginTop: '2%'},
              ]}>
              {t('settingsPersonal8')}
            </Text>
          </View>

          {/* Personal Setting - Master Key */}
          {/* <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('settingsPersonal5')}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  this.props.navigation.push('SettingsPersonalMasterPhone', {
                    email: email,
                    authKey: authKey,
                    userNo: userNo,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6%',
                    paddingBottom: '3%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e6e6e6',
                  }}>
                  <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                    {t('settingsPersonal6')}
                  </Text>
                  <Image
                  style={{
          width: Platform.OS === 'ios' ? 30 : 25,
          height: Platform.OS === 'ios' ? 30 : 25,
          resizeMode: 'contain',
        }}
        source={require('@images/moreIcon.png')}
                  />
                </View>
              </TouchableOpacity>
            </View> */}
        </View>

        <BottomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          text={t('settingsPersonal7')}
        />
      </View>
    </SafeAreaView>
  );
};

// class SettingsPersonal extends Component {
//   state = {
//     email: '',
//     authKey: '',
//     ret_val: '',
//     userNo: '',
//     phoneNum: '',
//     modalVisible: false,
//   };
//   setModalVisible = (visible) => {
//     this.setState({
//       modalVisible: visible,
//     });
//   };
//   validateEmail = (email) => {
//     var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   };
//   handlePassword = (e) => {
//     this.setState({
//       email: e,
//     });
//   };

//   passwordApi = (email) => {
//     axios
//       .post(`${server}/util/email/pw-auth`, {
//         email,
//       })
//       .then(async (response) => {
//         console.log('then', response);
//         console.log('then', response.data);
//         console.log('then', response.authKey);
//         this.setState({
//           authKey: response.data.authKey,
//         });
//         const authKey = response.data.authKey;
//         await AsyncStorage.setItem('authKey', authKey);
//         console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
//       })
//       .catch(({e}) => {
//         console.log('error', e);
//       });
//   };

//   passwordUserCheckApi = async (email) => {
//     await axios
//       .post(`${server}/user/duplicate/mailid`, {
//         mailId: email,
//       })
//       .then(async (response) => {
//         console.log('then', response);
//         console.log('then', response.data);
//         console.log('then', response.data.userNo);
//         this.setState({
//           ret_val: response.data.ret_val,
//           userNo: response.data.userNo,
//         });
//       })
//       .catch((e) => {
//         console.log('error', e);
//       });
//   };

//   componentDidMount = () => {
//     // console.log(this.props.route.params?.userInfo.mailId);
//     this.setState({
//       email: this.props.route.params?.userInfo.mailId,
//       phoneNum: this.props.route.params?.userInfo.phoneNum,
//     });
//   };

//   render() {
//     console.log(this.props.route.params?.userInfo);
//     const {t} = this.props;
//     console.log(DeviceInfo.getUniqueId());
//     console.log('authKey', this.state.authKey);
//     return (
//       <SafeAreaView style={ResetStyle.container}>
//         <View style={ResetStyle.containerInner}>
//           <View>
//             {/* topBackButton */}
//             <View style={[ResetStyle.topBackButton]}>
//               <TouchableOpacity
//                 style={{flexDirection: 'row', alignItems: 'center'}}
//                 onPress={() => {
//                   this.props.navigation.navigate('Settings');
//                 }}>
//                 <Image
//                   style={{
//                     width: Platform.OS === 'ios' ? 28 : 25,
//                     height: Platform.OS === 'ios' ? 28 : 25,
//                     resizeMode: 'contain',
//                   }}
//                   source={require('@images/backIcon.png')}
//                 />
//                 <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
//                   {t('settingsPersonalTitle')}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Personal Setting */}
//             {/* Personal Setting - Email */}
//             <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontDG,
//                   ResetStyle.textInputTitle,
//                 ]}>
//                 {t('settingsPersonal1')}
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   paddingTop: '6%',
//                   paddingBottom: '3%',
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#e6e6e6',
//                 }}>
//                 <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
//                   {this.state.email}
//                 </Text>
//               </View>
//               <Text
//                 style={[
//                   ResetStyle.fontLightK,
//                   ResetStyle.fontB,
//                   {textAlign: 'left', marginTop: '2%'},
//                 ]}>
//                 {t('settingsPersonal2')}
//               </Text>
//             </View>

//             {/* Personal Setting - Password */}
//             <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontDG,
//                   ResetStyle.textInputTitle,
//                 ]}>
//                 {t('settingsPersonal3')}
//               </Text>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   paddingTop: '6%',
//                   paddingBottom: '3%',
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#e6e6e6',
//                 }}>
//                 <Text
//                   style={[
//                     ResetStyle.fontRegularK,
//                     ResetStyle.fontG,
//                     {paddingTop: '3%'},
//                   ]}>
//                   ********
//                 </Text>
//                 <TouchableOpacity
//                   onPress={async () => {
//                     this.props.navigation.push(
//                       'SettingsPersonalPasswordChange',
//                       {
//                         email: this.state.email,
//                         authKey: this.state.authKey,
//                         userNo: this.state.userNo,
//                       },
//                     );
//                   }}>
//                   <Image
//                     style={{width: 25, height: 25}}
//                     source={require('@images/kycEditIcon.png')}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Personal Setting - Phone */}
//             <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontDG,
//                   ResetStyle.textInputTitle,
//                 ]}>
//                 {t('settingsPersonal4')}
//               </Text>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   paddingTop: '6%',
//                   paddingBottom: '3%',
//                   borderBottomWidth: 1,
//                   borderBottomColor: '#e6e6e6',
//                 }}>
//                 <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
//                   {this.state.phoneNum}
//                 </Text>
//               </View>
//               <Text
//                 style={[
//                   ResetStyle.fontLightK,
//                   ResetStyle.fontB,
//                   {textAlign: 'left', marginTop: '2%'},
//                 ]}>
//                 {t('settingsPersonal8')}
//               </Text>
//             </View>

//             {/* Personal Setting - Master Key */}
//             {/* <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontDG,
//                   ResetStyle.textInputTitle,
//                 ]}>
//                 {t('settingsPersonal5')}
//               </Text>
//               <TouchableOpacity
//                 onPress={async () => {
//                   this.props.navigation.push('SettingsPersonalMasterPhone', {
//                     email: this.state.email,
//                     authKey: this.state.authKey,
//                     userNo: this.state.userNo,
//                   });
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     paddingTop: '6%',
//                     paddingBottom: '3%',
//                     borderBottomWidth: 1,
//                     borderBottomColor: '#e6e6e6',
//                   }}>
//                   <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
//                     {t('settingsPersonal6')}
//                   </Text>
//                   <Image
//                   style={{
//           width: Platform.OS === 'ios' ? 30 : 25,
//           height: Platform.OS === 'ios' ? 30 : 25,
//           resizeMode: 'contain',
//         }}
//         source={require('@images/moreIcon.png')}
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View> */}
//           </View>

//           <BottomModal
//             setModalVisible={this.setModalVisible}
//             modalVisible={this.state.modalVisible}
//             text={t('settingsPersonal7')}
//           />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// export default hoistStatics(
//   withTranslation()(SettingsPersonal),
//   SettingsPersonal,
// );

export default SettingsPersonal;
