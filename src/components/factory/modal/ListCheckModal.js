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
import {Checkbox, SelectedCheckboxes} from '../../Checkbox';
import {DefineCountryList} from '../../defined/DefineCountryList';

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
    <View style={styles.countryList}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
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
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={[styles.title, {width: '80%'}]}>{item.title}</Text>
      <Checkbox
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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        {/* modal background */}
        <TouchableWithoutFeedback
          // style={styles.centeredView}
          activeOpacity={0.55}
          onPress={() => {
            this.setState({modalVisible: !modalVisible});
            this.props.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={styles.modalView}>
          <View style={styles.modalBox}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalText}>사용가능언어 선택</Text>
              <Text style={[styles.modalText, {fontSize: 13, marginLeft: 5}]}>
                (다중 선택 가능)
              </Text>
            </View>
            <TouchableWithoutFeedback
              style={styles.closeButton}
              setModalVisible={this.props.modalVisible}
              modalVisible={this.props.modalVisible}
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
              }}>
              <Image
                style={styles.closeButton}
                source={require('../../../imgs/icon_close.png')}
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.modalInputBox}>
            <TextInput
              style={styles.searchInputText}
              onChangeText={this.handleInputChange}
              value={this.state.searchText}
              placeholder="search"></TextInput>
            <TouchableOpacity style={styles.closeButton}>
              <Image
                style={styles.closeButton}
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
              styles.button,

              // {backgroundColor: '#c6c9cf', marginTop: 15},
              this.state.checkedArray == '' && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              if (this.state.checkedArray !== '') {
                this.props.setLanguage(this.state.checkedArray);
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
              }
            }}>
            <Text style={[styles.buttonTexts]}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
    position: 'absolute',
    top: '17.5%',
    left: '5%',
    width: '90%',
    height: '65%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  TextSize: {
    fontSize: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  modalBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInputBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  modalText: {
    fontSize: 20,
    lineHeight: 24,
  },
  closeButton: {
    width: 20,
    height: 20,
  },
  searchInputText: {
    fontSize: 15,
  },
  countryList: {
    width: '100%',
    height: '70%',
    overflow: 'scroll',
    flexDirection: 'column',
    marginTop: 10,
  },
  item: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  listImg: {
    width: 25,
    height: 16,
  },

  modalFooterBg: {
    flex: 1,
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
    paddingBottom: '5%',
  },
  modalFooter: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 50,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  modalFooterText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },

  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText2: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  closeButton2: {
    width: '90%',
    backgroundColor: '#F194FF',
    elevation: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  closeButtonText2: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
  },
  modalView2bottom2Button: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  modalView2bottom2Button1: {
    width: '50%',
    borderBottomLeftRadius: 5,
    backgroundColor: '#c6c9cf',
  },
  modalView2bottom2Button2: {
    width: '50%',
    borderBottomRightRadius: 5,
    backgroundColor: '#164895',
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#4696ff',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
export default ListCheckModal;
