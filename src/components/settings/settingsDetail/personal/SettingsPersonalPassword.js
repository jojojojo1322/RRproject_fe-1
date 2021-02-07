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
import {server} from '../../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import ResetStyle from '../../../../style/ResetStyle.js';
import BottomModal from '../../../factory/modal/BottomModal';
import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class SettingsPersonalPassword extends Component {
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
  handlePassword = (e) => {
    this.setState({
      email: e,
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
          <View>
            <View style={[ResetStyle.topBackButton]}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Image
                  source={require('../../../../imgs/drawable-xxxhdpi/back_icon.png')}
                />
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  {t('settingsPersonalPasswordTitle')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: '10%'}}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
                {t('settingsPersonalPassword1')}
              </Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  {marginTop: 20},
                ]}>
                {t('settingsPersonalPassword2')}
              </Text>
            </View>
            <View style={[ResetStyle.textInputStyle, {marginTop: '15%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                {t('settingsPersonalPassword3')}
              </Text>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontG,
                  ResetStyle.textInputText,
                ]}
                placeholder={t('settingsPersonalPassword4')}
                placeholderTextColor="#a9a9a9"
                value={this.state.email}
                onChangeText={this.handlePassword}
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
                  source={require('../../../../imgs/iconXGray.png')}
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
              this.passwordApi(this.state.email);
              this.props.navigation.navigate('SettingsPersonal', {
                email: this.state.email,
                authKey: this.state.authKey,
                userNo: this.state.userNo,
              });
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('settingsPersonalPasswordNextButton')}
            </Text>
          </TouchableOpacity>
          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={t('settingsPersonalPassword5')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(SettingsPersonalPassword),
  SettingsPersonalPassword,
);
