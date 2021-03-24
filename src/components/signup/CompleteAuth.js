import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import ResetStyle from '@style/ResetStyle.js';

const CompleteAuth = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

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
            style={[ResetStyle.fontBoldK, ResetStyle.fontB, {marginTop: '3%'}]}>
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
          onPress={() => navigation.navigate('Kyc')}>
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
};

export default CompleteAuth;
