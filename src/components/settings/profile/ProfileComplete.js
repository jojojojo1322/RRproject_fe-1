import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';

import {server} from '../../defined/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../style/ResetStyle.js';
import MainStyle from '../../../style/MainStyle.js';
import {lang} from '../../defined/lang';

export default class ProfileComplete extends Component {
  render() {
    const level = 2;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '60%',
            }}>
            <Image
              style={{width: '35%', height: '35%', resizeMode: 'contain'}}
              source={require('../../../imgs/drawable-xhdpi/icon_l_check.png')}
            />
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {marginTop: '3%'},
              ]}>
              KYC 인증완료
            </Text>
            <View>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {marginTop: '3%'},
                ]}>
                {
                  lang(2, <Text style={{color: '#2d91ff'}}>10 TNC</Text>)[0].ko
                    .KycComplete[1]
                }
                {
                  lang(2, <Text style={{color: '#2d91ff'}}>10 TNC</Text>)[0].ko
                    .KycComplete[2]
                }
                {
                  lang(2, <Text style={{color: '#2d91ff'}}>10 TNC</Text>)[0].ko
                    .KycComplete[3]
                }
                {
                  lang(2, <Text style={{color: '#2d91ff'}}>10 TNC</Text>)[0].ko
                    .KycComplete[4]
                }
                {/* {`KYC Level 2 완료 보상으로`
                ${(<Text>ㅁㄴㅇㅁㄴㅇ</Text>)}
                를 전송하였습니다.`} */}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: '20%'}}>
            <TouchableOpacity
              style={[
                ResetStyle.buttonWhite,
                {backgroundColor: '#ffffff', width: '49%', marginRight: '1%'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('ProfileMain');
                // this.props.navigation.setOptions({ title: '약관동의' });
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '600'},
                ]}>
                지갑 확인하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ResetStyle.button,
                {backgroundColor: '#4696ff', width: '49%', marginLeft: '1%'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('ProfileMain');
                // this.props.navigation.setOptions({ title: '약관동의' });
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontWhite,
                  {fontWeight: '600'},
                ]}>
                Profile 이동
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
