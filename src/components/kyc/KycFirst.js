import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

export default class KycFirst extends Component {
  render() {
    return (
      <View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', marginBottom: '7%'},
          ]}>
          성별 선택
        </Text>
        <View style={[AuthStyle.kycBox]}>
          <TouchableOpacity
            style={
              this.props.gender == '1'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleGender('1');
            }}>
            <Text
              style={
                this.props.gender == '1'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              남성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.gender == '0'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleGender('0');
            }}>
            <Text
              style={
                this.props.gender == '0'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              여성
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', marginTop: '15%', marginBottom: '7%'},
          ]}>
          결혼 여부 선택
        </Text>
        <View style={[AuthStyle.kycBox]}>
          <TouchableOpacity
            style={
              this.props.maritalStatus == '0'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('0');
            }}>
            <Text
              style={
                this.props.maritalStatus == '0'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              미혼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.maritalStatus == '2'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('2');
            }}>
            <Text
              style={
                this.props.maritalStatus == '2'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              결혼
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[AuthStyle.kycBox, {marginTop: '3%', marginBottom: '3%'}]}>
          <TouchableOpacity
            style={
              this.props.maritalStatus == '1'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('1');
            }}>
            <Text
              style={
                this.props.maritalStatus == '1'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              동거
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.maritalStatus == '3'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('3');
            }}>
            <Text
              style={
                this.props.maritalStatus == '3'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {fontWeight: '300'},
                    ]
              }>
              이혼
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
