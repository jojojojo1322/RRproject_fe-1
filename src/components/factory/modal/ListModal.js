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
import {RoundCheckbox, SelectedCheckboxes} from '../../factory/Roundcheck';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {DefineCountryList} from '../../defined/DefineCountryList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const window = Dimensions.get('window');

let DATA = DefineCountryList;

const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

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
        style={{width: '100%', marginTop: '5%'}}
      />
    </>
  );
};

const Item = ({item, onPress, style, handlePick}) => {
  CheckedArrObject = new SelectedCheckboxes();
  return (
    <TouchableOpacity
      onPress={() => {
        handlePick(item.title, item.cd);
      }}
      style={[ModalStyle.listModalItem]}>
      <Image
        style={[ModalStyle.listModalImg, {marginTop: 2}]}
        source={item.img}
      />
      <Text
        style={[ResetStyle.fontRegularK, ResetStyle.fontDG, {width: '70%'}]}>
        {item.title}
      </Text>
      <Text style={[ResetStyle.fontRegularK, ResetStyle.fontDG]}>
        {item.cd}
      </Text>
    </TouchableOpacity>
  );
};

class ListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchText: '',
      pick: '',
    };
    // this.setModalVisible = this.setModalVisible.bind(this);
  }
  //   state = {
  //     modalVisible: this.props.modalVisible,
  //   };
  componentDidUpdate(preProps, preState) {
    if (preProps.modalVisible != this.props.modalVisible) {
      this.setState({modalVisible: this.props.modalVisible});
    }
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  handleInputChange = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };
  handlePick = (country, cd) => {
    this.props.setCountry(country, cd);
    this.props.setModalVisible(!this.state.modalVisible);
  };

  render() {
    const {modalVisible} = this.state;
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
          <View style={{flex: 1, position: 'relative'}}>
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
            <View style={[ModalStyle.listModal]}>
              <View style={[ModalStyle.listModalBox]}>
                <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
                  {this.props.titleText}
                </Text>
                <TouchableWithoutFeedback
                  setModalVisible={this.props.setModalVisible}
                  modalVisible={this.props.modalVisible}
                  onPress={() => {
                    this.props.setModalVisible(!modalVisible);
                  }}>
                  <Image
                    style={[ModalStyle.listModalCloseButton]}
                    source={require('../../../imgs/icon_close.png')}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View style={[ModalStyle.listModalInputBox]}>
                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontG,
                    {padding: 10},
                  ]}
                  onChangeText={this.handleInputChange}
                  value={this.state.searchText}
                  placeholder="search"
                />
                <TouchableOpacity
                  style={{position: 'absolute', right: '3%', top: '22%'}}>
                  <Image
                    style={[ModalStyle.listModalSearch]}
                    source={require('../../../imgs/icon_search.png')}
                  />
                </TouchableOpacity>
              </View>
              <CountryList
                handlePick={this.handlePick}
                searchText={this.state.searchText}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}
export default ListModal;
