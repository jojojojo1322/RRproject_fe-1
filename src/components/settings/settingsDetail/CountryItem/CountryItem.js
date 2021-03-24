import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
// import {useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native';
import {useTranslation} from 'react-i18next';
import ResetStyle from '@style/ResetStyle.js';
//import {useDispatch} from 'react-redux';

//import {setLangauge} from '@module/language';
//import getImageName from '@lib/getImageName';
// import {
//   ItemWrapper,
//   Flag,
//   Country,
//   IconWrapper,
//   CheckIcon,
// } from './CountryItem.style';

const CountryItem = ({name, code, select, setSelect}) => {
  const {t, i18n} = useTranslation();
  //const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelect(code);
        //dispatch(setLangauge({language: code}));
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
        {select === code ? (
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
