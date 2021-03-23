import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {server} from '../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '../../style/ResetStyle.js';
import BottomModal from '../factory/modal/BottomModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class Reset extends Component {
  state = {
    email: '',
    authKey: '',
    ret_val: '',
    userNo: '',
    modalVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleEmail = (e) => {
    this.setState({
      email: e,
    });
  };
  emailReAuthApi = (email) => {
    axios
      .post(`${server}/util/email/pw-auth`, {
        email,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.authKey);
        this.setState({
          authKey: response.data.authKey,
        });
        const authKey = response.data.authKey;
        await AsyncStorage.setItem('authKey', authKey);
        console.log('Async!~!~!~!~', await AsyncStorage.getItem('authKey'));
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };
  emailUserCheckApi = async (email) => {
    await axios
      .post(`${server}/user/duplicate/mailid`, {
        mailId: email,
      })
      .then(async (response) => {
        console.log('then', response);
        console.log('then', response.data);
        console.log('then', response.data.userNo);
        this.setState({
          ret_val: response.data.ret_val,
          userNo: response.data.userNo,
        });
      })
      .catch((e) => {
        console.log('error', e);
      });
  };
  // emailReAuthApi = (email) => {
  //   fetch('http://3.34.5.60:8091/v1/api/email/auth', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //     }),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  render() {
    const {t} = this.props;
    console.log(DeviceInfo.getUniqueId());
    console.log('authKey', this.state.authKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            <View style={[ResetStyle.topBackButton]}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 22,
                    height: Platform.OS === 'ios' ? 28 : 22,
                    resizeMode: 'contain',
                  }}
                  source={require('@images/backIcon.png')}
                />
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  {t('resetTitle')}
                  {t('signUpNextButton')}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontBlack,
                {
                  marginTop: '17%',
                  fontWeight: '700',
                  fontSize: 33,
                },
              ]}>
              {t('reset1')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {marginTop: '5%'},
              ]}>
              {t('reset2')}
            </Text>
            <View
              style={[
                ResetStyle.textInputStyle,
                {marginTop: '20%', marginBottom: '0%'},
              ]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  ResetStyle.textInputTitle,
                ]}>
                {t('reset3')}
              </Text>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  ResetStyle.textInputText,
                ]}
                placeholder={t('reset4')}
                placeholderTextColor="#a9a9a9"
                autoCapitalize={'none'}
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              <TouchableOpacity
                style={ResetStyle.textInputTextButton}
                onPress={() => {
                  this.setState({
                    email: '',
                  });
                }}>
                <Image
                  style={ResetStyle.smallImg}
                  source={require('@images/iconX.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={
              this.validateEmail(this.state.email)
                ? [ResetStyle.button]
                : [ResetStyle.button, {backgroundColor: '#e6e6e6'}]
            }
            onPress={async () => {
              // api 용
              if (this.validateEmail(this.state.email)) {
                await this.emailUserCheckApi(this.state.email);
                if (this.state.ret_val == '-2') {
                  this.emailReAuthApi(this.state.email);
                  this.props.navigation.push('ResetEmail', {
                    email: this.state.email,
                    authKey: this.state.authKey,
                    userNo: this.state.userNo,
                  });
                } else if (this.state.ret_val == '0') {
                  this.setModalVisible(true);
                }
                // this.emailReAuthApi(this.state.email);
                // // const asy = 'aaaaaaa';
                // // await AsyncStorage.setItem('authKey', asy);
                // // console.log(await AsyncStorage.getItem('authKey'));
              }

              // 본부장님 테스트용
              // this.emailReAuthApi(this.state.email);
              // this.props.navigation.push('ResetEmail', {
              //   email: this.state.email,
              //   authKey: this.state.authKey,
              //   userNo: this.state.userNo,
              // });
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('resetNextButton')}
            </Text>
          </TouchableOpacity>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('reset5')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(Reset), Reset);
