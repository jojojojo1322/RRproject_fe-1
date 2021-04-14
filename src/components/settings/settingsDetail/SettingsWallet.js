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
import {RoundCheckbox, SelectedCheckboxes} from '@factory/Roundcheck';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResetStyle from '@style/ResetStyle.js';
import TextConfirmModal from '@factory/modal/TextConfirmModal';
import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

const SettingsWallet = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleNextPage = () => {
    navigation.navigate('SettingsLockPassword');
  };

  const [DATA] = useState([
    {
      id: '1',
      title: t('settingsWallet1'),
    },
    // {
    //   id: '2',
    //   title: t('settingsWallet2'),
    // },
  ]);

  const Item = ({title, id, onPress}) => (
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
        if (id === '1') {
          // 비밀번호 변경
          // navigation.navigate('SettingsWalletPassword');
          navigation.navigate('SettingsWalletCurrentPassword');
        } else if (id === '2') {
          // 비밀번호 분실
          navigation.navigate('SettingsWalletMasterKey');
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
      <Image
        style={{
          width: Platform.OS === 'ios' ? 30 : 25,
          height: Platform.OS === 'ios' ? 30 : 25,
          resizeMode: 'contain',
        }}
        source={require('@images/moreIcon.png')}
      />
    </TouchableOpacity>
  );

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
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 28 : 25,
                height: Platform.OS === 'ios' ? 28 : 25,
                resizeMode: 'contain',
              }}
              source={require('@images/backIcon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('settingsWalletTitle')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            // Number(item.level);
            index.toString()
          }
          style={{borderTopWidth: 1, borderTopColor: '#dddddd'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsWallet;
