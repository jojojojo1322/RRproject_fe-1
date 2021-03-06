import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '@factory/Roundcheck';
import ResetStyle from '@style/ResetStyle';
import ModalStyle from '@style/ModalStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import getCountryImageName from '@lib/getCountryImageName';

const window = Dimensions.get('window');

const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  let [DATA, setDATA] = useState(props.DATA);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#efefef' : '#FFF';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
        handlePick={props.handlePick}
        searchText={props.searchText}
      />
    );
  };

  if (props.searchText != '') {
    DATA = DATA.filter((data) =>
      data.fullName
        ? data.fullName
            .toLowerCase()
            .indexOf(props.searchText.toLowerCase()) !== -1
        : data.cityName
            .toLowerCase()
            .indexOf(props.searchText.toLowerCase()) !== -1,
    );
  } else {
    DATA = DATA;
  }

  return (
    <>
      <FlatList
        bounces={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          // Number(item.level);
          index.toString()
        }
        extraData={selectedId}
        style={{width: '100%', marginTop: '5%'}}
      />
    </>
  );
};

const Item = ({item, onPress, style, handlePick}) => {
  CheckedArrObject = new SelectedCheckboxes();
  if (item.fullName) {
    return (
      <TouchableOpacity
        onPress={() => {
          handlePick(item.fullName, item.countryCode, item.countryPhone);
        }}
        style={[ModalStyle.listModalItem]}>
        <Image
          style={[ModalStyle.listModalImg, {marginTop: 2}]}
          source={getCountryImageName(item.countryCode)}
        />
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {width: '60%', textAlign: 'left', color: '#222222'},
          ]}>
          {`${item.fullName}(${item.countryCode})`}
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {width: '25%', textAlign: 'right', color: '#222222'},
          ]}>
          {`+${item.countryPhone}`}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        key={item.countryPhone}
        onPress={() => {
          handlePick(item.cityName);
        }}
        style={[ModalStyle.listModalItem]}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {width: '60%', textAlign: 'left', color: '#222222'},
          ]}>
          {`${item.cityName}`}
        </Text>
      </TouchableOpacity>
    );
  }
};

const ListModal = ({
  modalVisible,
  setModalVisible,
  setCountry,
  titleText,
  list,
}) => {
  const {t, i18n} = useTranslation();
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (searchText) => {
    setSearchText(searchText);
  };

  const handlePick = (country, cd, phone) => {
    setCountry(country, cd, phone);
    setModalVisible(!modalVisible);
  };

  return modalVisible ? (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
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
          <View style={[ModalStyle.listModal]}>
            <View style={[ModalStyle.listModalBox]}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontBlack,
                  {fontWeight: '500'},
                ]}>
                {titleText}
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
                  source={require('@images/deleteIcon.png')}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={[ModalStyle.listModalInputBox]}>
              <TextInput
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontBlack,
                  {
                    padding: 10,
                    width: '100%',
                    textAlign: 'left',
                  },
                ]}
                onChangeText={handleInputChange}
                value={searchText}
                placeholder="search"
                placeholderTextColor="#a9a9a9"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '3%',
                  top: Platform.OS === 'ios' ? '28%' : '25%',
                }}>
                <Image
                  style={[ModalStyle.listModalSearch]}
                  source={require('@images/icon_search.png')}
                />
              </TouchableOpacity>
            </View>
            <CountryList
              handlePick={handlePick}
              searchText={searchText}
              DATA={list}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  ) : null;
};

export default ListModal;
