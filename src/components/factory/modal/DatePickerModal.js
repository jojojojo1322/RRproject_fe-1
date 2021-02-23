import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import DatePicker from '../../factory/tool/DatePicker';
import {useTranslation} from 'react-i18next';

// Year-Month-Date
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const DatePickerModal = ({
  modalVisible,
  setModalVisible,
  _date,
  _setDate,
  handleBirth,
}) => {
  const [date, setDate] = useState('');
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View
          style={[
            ModalStyle.dataPickerModalView,
            {
              height: Platform.OS === 'ios' ? '45%' : '50%',
              justifyContent: 'space-between',
            },
          ]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
              {date ? formatDate(date) : 'Select date...'}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 30 : 20,
                  height: Platform.OS === 'ios' ? 30 : 20,
                  resizeMode: 'contain',
                }}
                source={require('../../../imgs/deleteIcon.png')}
              />
            </TouchableWithoutFeedback>
          </View>

          <DatePicker value={date} onChange={(value) => setDate(value)} />
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {backgroundColor: date ? '#4696ff' : '#e6e6e6'},
            ]}
            onPress={() => {
              handleBirth(formatDate(date));
              setModalVisible(!modalVisible);
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('datePickerModal1')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default DatePickerModal;
