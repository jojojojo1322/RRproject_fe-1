import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';

export default class MainDetail extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          //   justifyContent: 'center',
          //   overflow: 'scroll',
          backgroundColor: '#FFF',
          //   marginTop: Constants.statusBarHeight,
        }}>
        <ScrollView style={{width: '100%', height: '100%'}}>
          <View style={{marginRight: '5%', marginLeft: '5%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[ResetStyle.fontG]}>E-commerce | Samsung</Text>
              <TouchableOpacity>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/survey_detail_share_icon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 30}}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                설문조사 제목 설문조사 제목 설문조사 제목 설문조사 제목 설문조사
                제목
              </Text>
            </View>
            <View
              style={{
                //   flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontB]}>
                  +10
                </Text>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontB,
                    {padding: 5},
                  ]}>
                  TNC
                </Text>
              </View>
              <TouchableOpacity style={[ResetStyle.buttonSmall]}>
                <Text style={[ResetStyle.buttonTexts]}>Audience</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                marginBottom: 35,
              }}></View>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {textAlign: 'left'},
              ]}>
              Ends In | 251d 22h 13m 2s
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <Text style={[ResetStyle.fontB]}>12375 / 20000</Text>
              <Text style={[ResetStyle.fontDG]}>VIEW 20000</Text>
            </View>
            <View style={{position: 'relative', height: '40%'}}>
              <Image
                style={{
                  //   position: 'relative',
                  left: '-6%',
                  width: '112%',
                  height: '100%',
                }}
                source={require('../../imgs/shutterstock_736958713.jpg')}
              />
            </View>

            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontDG,
                {marginTop: 200},
              ]}>
              설문조사 상세 내용이 노출됩니다. 리얼리서치
              대박날거에요.파이팅입니다. 모두들 아자아자 와우 호우 요우. 예아~~
              대박대박대박 재밌는 설문조사 리얼리서치가 되어요. 설문조사 상세
              내용이 노출됩니다. 리얼리서치 대박날거에요. 파이팅입니다. 모두들
              아자아자 와우 호우 요우. 예아~~ 대박대박대박 재밌는 설문조사
              리얼리서치가 되어요. 설문조사 상세 내용이 노출됩니다. 리얼리서치
              대박날거에요.파이팅입니다. 모두들 아자아자 와우 호우 요우. 예아~~
              대박대박대박 재밌는 설문조사 리얼리서치가 되어요.
            </Text>

            <TouchableOpacity style={[ResetStyle.button]}>
              <Text style={[ResetStyle.buttonTexts]}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
