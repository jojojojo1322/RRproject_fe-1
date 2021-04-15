import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';

import ResetStyle from '@style/ResetStyle.js';
import DatePickerModal from '@factory/modal/DatePickerModal';

const KycSecond = (props) => {
  const {t} = useTranslation();

  const [_date, _setDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{marginBottom: '40%'}}>
      <View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {textAlign: 'left'},
          ]}>
          {t('kycSecond1')}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {
                textAlign: 'left',
                paddingTop: '6%',
                paddingBottom: '3%',
                color: props.birth === undefined ? '#a9a9a9' : '#222222',
              },
            ]}>
            {props.birth !== undefined ? props.birth : t('kycSecond2')}
          </Text>
        </TouchableOpacity>
      </View>
      <DatePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        _date={_date}
        _setDate={_setDate}
        handleBirth={props.handleBirth}
      />
    </View>
  );
};

export default KycSecond;
