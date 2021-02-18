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
import {server} from '../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '../../../style/ResetStyle.js';
import BottomModal from '../../factory/modal/BottomModal';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class SettingsWalletMasterKey extends Component {
  state = {
    email: '',
    authKey: '',
    ret_val: '',
    userNo: '',
    modalVisible: false,
    masterKey: '',
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
  handleMasterKey = (e) => {
    this.setState({
      masterKey: e,
    });
  };
  passwordApi = (email) => {
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
  passwordUserCheckApi = async (email) => {
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
  render() {
    const {t} = this.props;
    console.log(DeviceInfo.getUniqueId());
    console.log('authKey', this.state.authKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          {/* topBackButton */}
          <View style={[ResetStyle.topBackButton]}>
            <TouchableOpacity
              style={{
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../imgs/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('settingsWalletMasterKeyTitle')}
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: '10%'}}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
                {t('settingsWalletMasterKey1')}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {marginTop: 20},
                ]}>
                {t('settingsWalletMasterKey2')}
              </Text>
            </View>
            <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('settingsWalletMasterKey3')}
              </Text>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  ResetStyle.textInputText,
                ]}
                placeholder={t('settingsWalletMasterKey4')}
                placeholderTextColor="#a9a9a9"
                value={this.state.masterKey}
                onChangeText={this.handleMasterKey}
              />
              <TouchableOpacity
                style={ResetStyle.textInputTextButton}
                onPress={() => {
                  this.setState({
                    masterKey: '',
                  });
                }}>
                <Image
                  style={ResetStyle.smallImg}
                  source={require('../../../imgs/iconX.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={
              this.validateEmail(this.state.email)
                ? [ResetStyle.button]
                : [
                    ResetStyle.button,
                    this.state.masterKey === '' && {backgroundColor: '#e6e6e6'},
                  ]
            }
            onPress={async () => {
              // api 용
              // if (this.validateEmail(this.state.email)) {
              //   await this.passwordUserCheckApi(this.state.email);
              //   if (this.state.ret_val == '-2') {
              //     this.passwordApi(this.state.email);
              //     this.props.navigation.push('ResetEmail', {
              //       email: this.state.email,
              //       authKey: this.state.authKey,
              //       userNo: this.state.userNo,
              //     });
              //   } else if (this.state.ret_val == '0') {
              //     this.setModalVisible(true);
              //   }
              //   // this.passwordApi(this.state.email);
              //   // // const asy = 'aaaaaaa';
              //   // // await AsyncStorage.setItem('authKey', asy);
              //   // // console.log(await AsyncStorage.getItem('authKey'));
              // }

              // 테스트용
              // this.passwordApi(this.state.email);
              if (
                this.state.masterKey ===
                (await AsyncStorage.getItem('masterKey'))
              ) {
                this.props.navigation.navigate('SettingsWalletPassword', {
                  email: this.state.email,
                  authKey: this.state.authKey,
                  userNo: this.state.userNo,
                });
              } else {
                this.setModalVisible(true);
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('settingsWalletMasterKeyNextButton')}
            </Text>
          </TouchableOpacity>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('settingsWalletMasterKey5')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(SettingsWalletMasterKey),
  SettingsWalletMasterKey,
);
