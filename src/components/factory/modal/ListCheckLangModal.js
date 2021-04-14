import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
  TouchableOpacityBase,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../RoundcheckLang';
import {DefineCountryList} from '@defined/DefineCountryList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ResetStyle from '@style/ResetStyle';
import ModalStyle from '@style/ModalStyle';
import Reset from '../../resetPassword/Reset';
import {useTranslation} from 'react-i18next';

const window = Dimensions.get('window');

const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  let DATA = props.list;
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#FFF' : '#FFF';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
        checkedArray={props.checkedArray}
        CheckedArrObject={props.CheckedArrObject}
        handleCheckedArray={props.handleCheckedArray}
        handleUnCheckedArray={props.handleUnCheckedArray}
        searchText={props.searchText}
      />
    );
  };
  if (props.searchText !== '') {
    DATA = props.list.filter(
      (data) =>
        data.nativeName
          .toLowerCase()
          .indexOf(props.searchText.toLowerCase()) !== -1 ||
        data.englishName
          .toLowerCase()
          .indexOf(props.searchText.toLowerCase()) !== -1,
    );
  } else {
    DATA = props.list;
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
        style={{
          width: '100%',
          marginTop: '5%',
          marginBottom: '5%',
          paddingLeft: '1%',
          paddingRight: '1%',
        }}
      />
    </>
  );
};

const Item = ({
  item,
  onPress,
  style,
  checkedArray,
  CheckedArrObject,
  handleCheckedArray,
  handleUnCheckedArray,
  searchText,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[ModalStyle.lrcItemView]}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {width: '80%', textAlign: 'left'},
          ]}>
          {item.nativeName}
        </Text>
        <RoundCheckbox
          size={25}
          keyValue={1}
          checked={false}
          color="#164895"
          labelColor="#000000"
          label={item.nativeName}
          value={item.languageCode}
          checkedArray={checkedArray}
          checkedObjArr={CheckedArrObject}
          handleCheckedArray={handleCheckedArray}
          handleUnCheckedArray={handleUnCheckedArray}
          searchText={searchText}
        />
      </View>
    </TouchableOpacity>
  );
};

const ListCheckLangModal = ({
  modalVisible,
  setModalVisible,
  setLanguage,
  list,
  originalLang,
}) => {
  let CheckedArrObject = new SelectedCheckboxes();
  const [searchText, setSearchText] = useState('');
  const [checkedArray, setCheckedArray] = useState(originalLang);
  const {t, i18n} = useTranslation();
  useEffect(() => {
    if (modalVisible === true) {
      setCheckedArray(originalLang);
    }
  }, [modalVisible]);
  const handleCheckedArray = async (Array) => {
    let _checkedArray = checkedArray;
    if (
      _checkedArray.findIndex(
        (data) => data.value === Array[Array.length - 1].value,
      ) === -1
    ) {
      _checkedArray = _checkedArray.concat(Array);
      setCheckedArray(_checkedArray);
    } else {
    }
  };

  const handleUnCheckedArray = async (value) => {
    let _checkedArray = checkedArray;
    _checkedArray.splice(
      _checkedArray.findIndex((y) => y.value == value),
      1,
    );
    await setCheckedArray(_checkedArray);
  };

  const handleInputChange = (searchText) => {
    setSearchText(searchText);
  };

  return modalVisible ? (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        {/* modal background */}
        <TouchableWithoutFeedback
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={[ModalStyle.lcModal]}>
          <View
            style={[
              ModalStyle.lcModalBox,
              {
                marginTop: '3%',
                marginBottom: Platform.OS === 'ios' ? '5%' : '4%',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontBlack,
                  {fontWeight: '500'},
                ]}>
                {t('listCheckLangModal1')}
              </Text>
              <Text style={[ResetStyle.fontLightK, ResetStyle.fontBlack]}>
                {t('listCheckLangModal2')}
              </Text>
            </View>
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

          <View style={[ModalStyle.lcModalInput]}>
            <TextInput
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  width: '90%',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                },
              ]}
              onChangeText={handleInputChange}
              placeholderTextColor="#a9a9a9"
              value={searchText}
              placeholder="search"
            />
            <TouchableOpacity>
              <Image
                style={[ModalStyle.listModalSearch]}
                source={require('@images/icon_search.png')}
              />
            </TouchableOpacity>
          </View>
          <CountryList
            setLanguage={setLanguage}
            CheckedArrObject={CheckedArrObject}
            searchText={searchText}
            // 체크박스 유지 배열
            checkedArray={checkedArray != '' ? checkedArray : originalLang}
            // 체크박스 add / minus
            handleCheckedArray={handleCheckedArray}
            handleUnCheckedArray={handleUnCheckedArray}
            list={list}
          />
          <TouchableOpacity
            style={[
              ResetStyle.button,
              checkedArray == '' && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              if (checkedArray !== '') {
                setLanguage(checkedArray);
                setModalVisible(!modalVisible);
              }
            }}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
              {t('listCheckLangModalNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  ) : null;
};

export default ListCheckLangModal;
