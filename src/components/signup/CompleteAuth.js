import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class CompleteAuth extends Component {
  state = {};

  render() {
    const {t} = this.props;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '25%',
            }}>
            <Image
              style={{width: '35%', height: '35%', resizeMode: 'contain'}}
              source={require('@images/iconLCheck.png')}
            />
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {marginTop: '3%'},
              ]}>
              {t('completeAuthTitle')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                {marginTop: '3%'},
              ]}>
              {t('completeAuth1')}
            </Text>
          </View>

          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#787878',
              marginBottom: '3%',
            }}
          />

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontDG,
                {lineHeight: 28, marginBottom: '10%'},
              ]}>
              {t('completeAuth2')}
            </Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {marginBottom: '10%'},
              ]}>
              {t('completeAuth3')}
            </Text>
          </View>

          <TouchableOpacity
            style={[ResetStyle.button, {backgroundColor: '#4696ff'}]}
            onPress={() => {
              this.props.navigation.navigate('Kyc');
              // this.props.navigation.setOptions({ title: '약관동의' });
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('completeAuthNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(withTranslation()(CompleteAuth), CompleteAuth);
