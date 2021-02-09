import React, {useState, Component} from 'react';
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
import {DefineCountryList} from '../../defined/DefineCountryList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import Reset from '../../resetPassword/Reset';
import {useTranslation} from 'react-i18next';

const window = Dimensions.get('window');
// let DATA = DefineCountryList;

const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
  console.log('props.searchTextprops.searchText', props.searchText);
  console.log('props.searchTextprops.searchText', props.list);
  if (props.searchText !== '') {
    DATA = props.list.filter(
      (data) =>
        data.nativeName
          .toLowerCase()
          .indexOf(props.searchText.toLowerCase()) !== -1,
    );
  } else {
    DATA = props.list;
  }

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  // CheckedArrObject = new SelectedCheckboxes();
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
}) => {
  let CheckedArrObject = new SelectedCheckboxes();
  // console.log(CheckedArrObject.fetchArray().length);

  const [searchText, setSearchText] = useState('');
  const [checkedArray, setCheckedArray] = useState([]);
  const {t, i18n} = useTranslation();

  const handleCheckedArray = async (Array) => {
    let _checkedArray = checkedArray;
    await setCheckedArray(_checkedArray.concat(Array));
    console.log('PlusArrayLATE', _checkedArray);
  };

  const handleUnCheckedArray = async (value) => {
    let _checkedArray = checkedArray;
    _checkedArray.splice(
      _checkedArray.findIndex((y) => y.value == value),
      1,
    ),
      await setCheckedArray(_checkedArray);
    console.log('MinusArrayLATE', _checkedArray);
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
                style={[ModalStyle.listModalCloseButton]}
                source={require('../../../imgs/drawable-xxxhdpi/delete_icon.png')}
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
                source={require('../../../imgs/icon_search.png')}
              />
            </TouchableOpacity>
          </View>
          {/* <View
              style={{paddingLeft: '10%', paddingRight: '10%', height: '70%'}}> */}
          <CountryList
            setLanguage={setLanguage}
            CheckedArrObject={CheckedArrObject}
            searchText={searchText}
            // 체크박스 유지 배열
            checkedArray={checkedArray}
            // 체크박스 add / minus
            handleCheckedArray={handleCheckedArray}
            handleUnCheckedArray={handleUnCheckedArray}
            list={list}
          />
          {/* </View> */}
          <TouchableOpacity
            style={[
              ResetStyle.button,

              // {backgroundColor: '#c6c9cf', marginTop: 15},
              checkedArray == '' && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              if (checkedArray !== '') {
                console.log('AKKKKAKAKAKAKAKAKAK');
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

// class ListCheckLangModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalVisible: false,
//       searchText: '',
//       checkedArray: [],
//     };
//   }
//   handleCheckedArray = async (Array) => {
//     let checkedArray = this.state.checkedArray;
//     await this.setState({
//       checkedArray: checkedArray.concat(Array),
//     });
//     console.log('PlusArrayLATE', this.state.checkedArray);
//   };

//   handleUnCheckedArray = async (value) => {
//     let checkedArray = this.state.checkedArray;
//     checkedArray.splice(
//       checkedArray.findIndex((y) => y.value == value),
//       1,
//     ),
//       await this.setState({
//         checkedArray: checkedArray,
//       });
//     console.log('MinusArrayLATE', this.state.checkedArray);
//   };

//   componentDidUpdate(preProps, preState) {
//     if (preProps.modalVisible != this.props.modalVisible) {
//       this.setState({modalVisible: this.props.modalVisible});
//     }
//   }
//   handleInputChange = (searchText) => {
//     this.setState({
//       searchText: searchText,
//     });
//   };
//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//   };
//   render() {
//     let CheckedArrObject = new SelectedCheckboxes();
//     const {modalVisible} = this.state;
//     console.log(CheckedArrObject.fetchArray().length);
//     return (
//       <KeyboardAwareScrollView
//         enableOnAndroid={true}
//         contentContainerStyle={{flexGrow: 1}}>
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           // onRequestClose={() => {
//           //   Alert.alert('Modal has been closed.');
//           // }}
//         >
//           {/* modal background */}
//           <TouchableWithoutFeedback
//             activeOpacity={0.55}
//             onPress={() => {
//               this.setState({modalVisible: !modalVisible});
//               this.props.setModalVisible(!modalVisible);
//             }}>
//             <View style={[ModalStyle.modalCenteredView]}></View>
//           </TouchableWithoutFeedback>

//           {/* modal view */}
//           <View style={[ModalStyle.lcModal]}>
//             <View
//               style={[
//                 ModalStyle.lcModalBox,
//                 {
//                   marginTop: '3%',
//                   marginBottom: Platform.OS === 'ios' ? '5%' : '4%',
//                 },
//               ]}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//                 <Text
//                   style={[
//                     ResetStyle.fontMediumK,
//                     ResetStyle.fontBlack,
//                     {fontWeight: '500'},
//                   ]}>
//                   사용가능언어 선택
//                 </Text>
//                 <Text style={[ResetStyle.fontLightK, ResetStyle.fontBlack]}>
//                   (다중 선택 가능)
//                 </Text>
//               </View>
//               <TouchableWithoutFeedback
//                 setModalVisible={this.props.modalVisible}
//                 modalVisible={this.props.modalVisible}
//                 onPress={() => {
//                   this.setState({modalVisible: !modalVisible});
//                   this.props.setModalVisible(!modalVisible);
//                 }}>
//                 <Image
//                   style={[ModalStyle.listModalCloseButton]}
//                   source={require('../../../imgs/drawable-xxxhdpi/delete_icon.png')}
//                 />
//               </TouchableWithoutFeedback>
//             </View>

//             <View style={[ModalStyle.lcModalInput]}>
//               <TextInput
//                 style={[
//                   ResetStyle.fontLightK,
//                   ResetStyle.fontBlack,
//                   {
//                     textAlign: 'left',
//                     width: '90%',
//                     paddingTop: '2%',
//                     paddingBottom: '2%',
//                   },
//                 ]}
//                 onChangeText={this.handleInputChange}
//                 placeholderTextColor="#a9a9a9"
//                 value={this.state.searchText}
//                 placeholder="search"
//               />
//               <TouchableOpacity>
//                 <Image
//                   style={[ModalStyle.listModalSearch]}
//                   source={require('../../../imgs/icon_search.png')}
//                 />
//               </TouchableOpacity>
//             </View>
//             {/* <View
//               style={{paddingLeft: '10%', paddingRight: '10%', height: '70%'}}> */}
//             <CountryList
//               setLanguage={this.props.setLanguage}
//               CheckedArrObject={CheckedArrObject}
//               searchText={this.state.searchText}
//               // 체크박스 유지 배열
//               checkedArray={this.state.checkedArray}
//               // 체크박스 add / minus
//               handleCheckedArray={this.handleCheckedArray}
//               handleUnCheckedArray={this.handleUnCheckedArray}
//               list={this.props.list}
//             />
//             {/* </View> */}
//             <TouchableOpacity
//               style={[
//                 ResetStyle.button,

//                 // {backgroundColor: '#c6c9cf', marginTop: 15},
//                 this.state.checkedArray == '' && {backgroundColor: '#e6e6e6'},
//               ]}
//               onPress={() => {
//                 if (this.state.checkedArray !== '') {
//                   console.log('AKKKKAKAKAKAKAKAKAK');
//                   this.props.setLanguage(this.state.checkedArray);
//                   this.setState({modalVisible: !modalVisible});
//                   this.props.setModalVisible(!modalVisible);
//                 }
//               }}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
//                 CONFIRM
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </KeyboardAwareScrollView>
//     );
//   }
// }
// export default ListCheckLangModal;
