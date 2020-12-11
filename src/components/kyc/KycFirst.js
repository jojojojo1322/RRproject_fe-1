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
            ResetStyle.fontDG,
            {textAlign: 'left', marginBottom: '3%'},
          ]}>
          성별 선택
        </Text>
        <View style={[AuthStyle.kycBox]}>
          <TouchableOpacity
            style={
              this.props.gender == 'male'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleGender('male');
            }}>
            <Text
              style={
                this.props.gender == 'male'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              남성
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.gender == 'female'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleGender('female');
            }}>
            <Text
              style={
                this.props.gender == 'female'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              여성
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {textAlign: 'left', marginTop: '15%', marginBottom: '3%'},
          ]}>
          결혼 여부 선택
        </Text>
        <View style={[AuthStyle.kycBox]}>
          <TouchableOpacity
            style={
              this.props.maritalStatus == 'single'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('single');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'single'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              미혼
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.maritalStatus == 'marriage'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('marriage');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'marriage'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              결혼
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[AuthStyle.KycBox, {marginTop: '3%', marginBottom: '3%'}]}>
          <TouchableOpacity
            style={
              this.props.maritalStatus == 'liveTogether'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('liveTogether');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'liveTogether'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              동거
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.props.maritalStatus == 'divorce'
                ? [AuthStyle.kycButton, {backgroundColor: '#4696ff'}]
                : AuthStyle.kycButton
            }
            onPress={() => {
              this.props.handleMarital('divorce');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'divorce'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              이혼
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clickArea: {
    backgroundColor: '#eeeeee',
    height: 50,
    width: '48%',
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  clickAreaChoice: {
    backgroundColor: '#4696ff',
    height: 50,
    width: '48%',
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  clickAreaTextChoice: {
    fontSize: 15,
    lineHeight: 22,
    color: '#ffffff',
  },
});
