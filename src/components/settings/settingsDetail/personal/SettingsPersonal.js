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
import ResetStyle from '../../../../style/ResetStyle';
import BottomModal from '../../../factory/modal/BottomModal';

export default class SettingsPersonal extends Component {
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
    console.log(DeviceInfo.getUniqueId());
    console.log('authKey', this.state.authKey);
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            {/* topBackButton */}
            <View style={[ResetStyle.topBackButton]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Settings');
                }}>
                <Image
                  source={require('../../../../imgs/drawable-xxxhdpi/back_icon.png')}
                />
              </TouchableOpacity>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                개인정보설정
              </Text>
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
                이메일 (아이디)
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#e6e6e6',
                }}>
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                  aabbcc123@tnc.com
                </Text>
              </View>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {textAlign: 'left', marginTop: '2%'},
                ]}>
                ※ 아이디는 수정이 불가능합니다
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
                비밀번호
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
                  onPress={async () => {
                    this.props.navigation.push(
                      'SettingsPersonalPasswordChange',
                      {
                        email: this.state.email,
                        authKey: this.state.authKey,
                        userNo: this.state.userNo,
                      },
                    );
                  }}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
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
                휴대폰 번호
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
                <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                  01012345678
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    this.props.navigation.push('SettingsPersonalPhone', {
                      email: this.state.email,
                      authKey: this.state.authKey,
                      userNo: this.state.userNo,
                    });
                  }}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../../../../imgs/drawable-xxxhdpi/kyc_edit_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Personal Setting - Master Key */}
            <View style={[ResetStyle.textInputStyle, {marginTop: '8%'}]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  ResetStyle.textInputTitle,
                ]}>
                Master Key
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  this.props.navigation.push('SettingsPersonalMasterPhone', {
                    email: this.state.email,
                    authKey: this.state.authKey,
                    userNo: this.state.userNo,
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
                    마스터키는 꼭 저장해 주세요
                  </Text>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../../../../imgs/drawable-xxxhdpi/icon_more_b.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <BottomModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text={`비밀번호가 일치하지 않습니다.`}
          />
        </View>
      </SafeAreaView>
    );
  }
}
