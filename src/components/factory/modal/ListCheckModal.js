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
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import {DefineCountryList} from '../../defined/DefineCountryList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import Reset from '../../resetPassword/Reset';

const window = Dimensions.get('window');
let DATA = DefineCountryList;

const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#FFF' : '#FFF';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
        CheckedArrObject={props.CheckedArrObject}
        handleCheckedArray={props.handleCheckedArray}
        handleUnCheckedArray={props.handleUnCheckedArray}
      />
    );
  };
  if (props.searchText != '') {
    DATA = DefineCountryList.filter(
      (data) =>
        data.title.toLowerCase().indexOf(props.searchText.toLowerCase()) !== -1,
    );

    // list.custName.toLowerCase().indexOf(searchName) > -1
  } else {
    DATA = DefineCountryList;
  }

  return (
    <>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={{width: '100%', marginTop: '5%', marginBottom: '5%'}}
      />
    </>
  );
};

const Item = ({
  item,
  onPress,
  style,
  CheckedArrObject,
  handleCheckedArray,
  handleUnCheckedArray,
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
          {item.title}
        </Text>
        <RoundCheckbox
          size={25}
          keyValue={item.id}
          checked={false}
          color="#164895"
          labelColor="#000000"
          label={item.title}
          value={item.cd}
          checkedObjArr={CheckedArrObject}
          handleCheckedArray={handleCheckedArray}
          handleUnCheckedArray={handleUnCheckedArray}
        />
      </View>
    </TouchableOpacity>
  );
};

class ListCheckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchText: '',
      checkedArray: [],
    };
  }
  handleCheckedArray = async (Array) => {
    let checkedArray = this.state.checkedArray;
    await this.setState({
      checkedArray: checkedArray.concat(Array),
    });
    console.log('PlusArrayLATE', this.state.checkedArray);
  };

  handleUnCheckedArray = async (key) => {
    let checkedArray = this.state.checkedArray;
    checkedArray.splice(
      checkedArray.findIndex((y) => y.key == key),
      1,
    ),
      await this.setState({
        checkedArray: checkedArray,
      });
    console.log('MinusArrayLATE', this.state.checkedArray);
  };

  componentDidUpdate(preProps, preState) {
    if (preProps.modalVisible != this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  }
  handleInputChange = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {
    let CheckedArrObject = new SelectedCheckboxes();
    const {modalVisible} = this.state;
    console.log(CheckedArrObject.fetchArray().length);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        // }}
      >
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          {/* modal background */}
          <TouchableWithoutFeedback
            activeOpacity={0.55}
            onPress={() => {
              this.setState({modalVisible: !modalVisible});
              this.props.setModalVisible(!modalVisible);
            }}>
            <View style={[ModalStyle.modalCenteredView]}></View>
          </TouchableWithoutFeedback>

          {/* modal view */}
          <View style={[ModalStyle.lcModal]}>
            <View style={[ModalStyle.lcModalBox]}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                  사용가능언어 선택
                </Text>
                <Text style={[ResetStyle.fontLightK, ResetStyle.fontBlack]}>
                  (다중 선택 가능)
                </Text>
              </View>
              <TouchableWithoutFeedback
                setModalVisible={this.props.modalVisible}
                modalVisible={this.props.modalVisible}
                onPress={() => {
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }}>
                <Image
                  style={[ModalStyle.listModalCloseButton]}
                  source={require('../../../imgs/icon_close.png')}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={[ModalStyle.lcModalInput]}>
              <TextInput
                style={[ResetStyle.fontLightK, ResetStyle.fontG]}
                onChangeText={this.handleInputChange}
                value={this.state.searchText}
                placeholder="search"></TextInput>
              <TouchableOpacity>
                <Image
                  style={[ModalStyle.listModalSearch]}
                  source={require('../../../imgs/icon_search.png')}
                />
              </TouchableOpacity>
            </View>

            <CountryList
              setLanguage={this.props.setLanguage}
              CheckedArrObject={CheckedArrObject}
              searchText={this.state.searchText}
              handleCheckedArray={this.handleCheckedArray}
              handleUnCheckedArray={this.handleUnCheckedArray}
            />

            <TouchableOpacity
              style={[
                ResetStyle.button,

                // {backgroundColor: '#c6c9cf', marginTop: 15},
                this.state.checkedArray == '' && {backgroundColor: '#e6e6e6'},
              ]}
              onPress={() => {
                if (this.state.checkedArray !== '') {
                  console.log('AKKKKAKAKAKAKAKAKAK');
                  this.props.setLanguage(this.state.checkedArray);
                  this.setState({modalVisible: !modalVisible});
                  this.props.setModalVisible(!modalVisible);
                }
              }}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}
export default ListCheckModal;
