import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
  Platform,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../../../factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '../../../../style/ResetStyle.js';
import TextConfirmModal from '../../../factory/modal/TextConfirmModal';

const SettingsLock = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleNextPage = () => {
    navigation.navigate('SettingsLockPassword');
  };

  const [DATA] = useState([
    {
      id: '1',
      title: '사용 안함',
    },
    {
      id: '2',
      title: '비밀번호',
    },
    {
      id: '3',
      title: '패턴',
    },
    {
      id: '4',
      title: '지문 / Face ID',
    },
    {
      id: '5',
      title: '비밀번호 변경',
    },
  ]);

  const Item = ({title, id, onPress}) => {
    CheckedArrObject = new SelectedCheckboxes();
    if (id === '5') {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}
          onPress={() => {
            navigation.navigate('SettingsLockPassword');
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
            ]}>
            {title}
          </Text>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../../../imgs/drawable-xxxhdpi/icon_more_b.png')}
          />
        </TouchableOpacity>
      );
    } else if (id === '4') {
      return (
        <TouchableOpacity
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
            {title}
          </Text>
          <Switch
            trackColor={{false: '#e6e6e6', true: '#4696ff'}}
            thumbColor={'#FFF'}
            ios_backgroundColor="#e6e6e6"
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={() => {
              if (isEnabled === false) {
                setModalVisible(!modalVisible);
              }
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
            paddingLeft: '5%',
            paddingRight: '5%',
          }}
          onPress={() => {
            if (id === '3') {
              navigation.navigate('SettingsLockPattern');
            } else if (id === '2') {
              navigation.navigate('SettingsLockPassword');
            }
          }}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', paddingTop: '5.5%', paddingBottom: '5.5%'},
            ]}>
            {title}
          </Text>
          <RoundCheckbox
            size={25}
            keyValue={Number(id)}
            checked={false}
            checkedObjArr={CheckedArrObject}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({item}) => <Item title={item.title} id={item.id} />;
  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* topBackButton */}
        <View
          style={[
            ResetStyle.topBackButton,
            {marginLeft: '5%', marginRight: '5%'},
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
          </TouchableOpacity>
          <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
            잠금 설정
          </Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
      </View>
      <TextConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        text={`지금부터 휴대폰에 등록된 지문으로${'\n'} 
        잠금해제 할 수 있습니다.`}
        confirm={`확인`}
        handleNextPage={handleNextPage}
      />
    </SafeAreaView>
  );
};

export default SettingsLock;
