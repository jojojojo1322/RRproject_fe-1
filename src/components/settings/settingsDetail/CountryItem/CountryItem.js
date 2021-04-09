import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native';
import {useTranslation} from 'react-i18next';

import ResetStyle from '@style/ResetStyle.js';
import {setLangauge} from '@module/language';

const CountryItem = ({name, code}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const {language} = useSelector(({language}) => ({
    language: language.language,
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(setLangauge({language: code}));
        i18n.changeLanguage(code);
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#dddddd',
          paddingLeft: '5%',
          paddingRight: '5%',
        }}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
          ]}>
          {name}
        </Text>
        {language === code ? (
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('@images/iconCheckedS.png')}
          />
        ) : (
          <Image
            style={{width: 30, height: 30, resizeMode: 'contain'}}
            source={require('@images/iconUncheckedS.png')}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CountryItem;
