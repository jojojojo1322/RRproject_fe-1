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
  Platform,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import Reset from '../resetPassword/Reset.js';

import AudienceModal from '../factory/modal/AudienceModal';

export default class MainDetailCompleted extends Component {
  state = {
    modalVisible: false,
    detailVisible: false,
  };
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };
  setDetailVisible = (visible) => {
    this.setState({
      detailVisible: visible,
    });
  };
  render() {
    return (
      <SafeAreaView style={[ResetStyle.container]}>
        <ScrollView style={{paddingLeft: '5%', paddingRight: '5%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
              paddingBottom: Platform.OS === 'ios' ? '6%' : '2%',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                E-commerce
              </Text>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                {' '}
                |{' '}
              </Text>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
                Samsung
              </Text>
            </View>

            {/* <TouchableOpacity>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/survey_detail_share_icon.png')}
              />
            </TouchableOpacity> */}
          </View>

          <View style={{marginBottom: 30}}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontBlack,
                {textAlign: 'left', marginTop: 10},
              ]}>
              설문조사 제목입니다 설문조사 제목입니다 설문조사 제목입니다
              설문조사 제목입니다 설문조사 제목입니다
            </Text>
          </View>
          <View
            style={{
              //   flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>+10</Text>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {padding: 5},
                ]}>
                TNC
              </Text>
            </View>
            <TouchableOpacity
              style={[ResetStyle.buttonSmall]}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                Audience
              </Text>
            </TouchableOpacity>
            <AudienceModal
              setModalVisible={this.setModalVisible}
              modalVisible={this.state.modalVisible}
              level={`2`}
              age={`25`}
              gender={`여성`}
              maritalStatus={`미혼`}
              nationality={`한국`}
              country={`한국`}
              countryCity={`서울`}
              language={`한국어`}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#dedede',
              marginBottom: 30,
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
              position: 'relative',
              width: '100%',
              height: 3,
              alignSelf: 'center',
              marginTop: '3%',
              marginBottom: '2%',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#d7d7d7',
              }}></View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '65%',
                height: '100%',
                backgroundColor: '#0080ff',
              }}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontB]}>
              12375 / 20000
            </Text>
            <Text style={[ResetStyle.fontLightK, ResetStyle.fontDG]}>
              VIEW 20000
            </Text>
          </View>
          {this.state.detailVisible === false ? (
            <View style={{marginTop: Platform.OS === 'ios' ? '25%' : '15%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontB,
                    {marginRight: '2%', paddingBottom: '1.5%'},
                  ]}>
                  응답자수
                </Text>
                <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>
                  12375
                </Text>
              </View>

              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {lineHeight: 28, marginTop: '3%'},
                ]}>
                해당 설문조사 결과는{'\n'}설문조사 주최자만 보실 수 있습니다
              </Text>
            </View>
          ) : (
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {
                  textAlign: 'left',
                  lineHeight: 28,
                  marginTop: 20,
                  marginBottom: 30,
                },
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
          )}
        </ScrollView>
        {this.state.detailVisible === true ? null : (
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                marginBottom: Platform.OS === 'ios' ? 0 : '5%',
                width: '90%',
                alignSelf: 'center',
              },
            ]}
            onPress={() => {
              this.setDetailVisible(true);
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {
                  fontWeight: '600',
                },
              ]}>
              설문조사 상세보기
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}
