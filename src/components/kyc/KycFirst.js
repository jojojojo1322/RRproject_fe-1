import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle.js';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class KycFirst extends Component {
  render() {
    const {t} = this.props;
    return (
      <View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', marginBottom: '7%'},
          ]}>
          {t('kycFirst1')}
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
              {t('kycFirst2')}
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
              {t('kycFirst3')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', marginTop: '15%', marginBottom: '7%'},
          ]}>
          {t('kycFirst4')}
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
              {t('kycFirst5')}
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
              {t('kycFirst6')}
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
              {t('kycFirst7')}
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
              {t('kycFirst8')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default hoistStatics(withTranslation()(KycFirst), KycFirst);
