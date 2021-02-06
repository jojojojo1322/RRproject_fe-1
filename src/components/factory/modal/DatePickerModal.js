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
            ModalStyle.walletAllView,
            {height: Platform.OS === 'ios' ? '45%' : '55%'},
          ]}>
          <View
            style={{
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
                source={require('../../../imgs/drawable-xxxhdpi/delete_icon.png')}
              />
            </TouchableWithoutFeedback>
          </View>

          <DatePicker value={date} onChange={(value) => setDate(value)} />
          <TouchableOpacity
            style={ResetStyle.button}
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
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default DatePickerModal;
