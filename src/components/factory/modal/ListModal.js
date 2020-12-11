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
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import ResetStyle from '../../../style/ResetStyle';
import {DefineCountryList} from '../../defined/DefineCountryList';

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

const Item = ({item, onPress, style, handlePick}) => {
  CheckedArrObject = new SelectedCheckboxes();
  return (
    <TouchableOpacity
      onPress={() => {
        handlePick(item.title, item.cd);
      }}
      style={[styles.item, style]}>
      <Image style={styles.listImg} source={item.img} />
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
        <View style={{flex: 1, position: 'relative'}}>
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
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontDG]}>
                {this.props.titleText}
              </Text>
              <TouchableWithoutFeedback
                style={styles.closeButton}
                setModalVisible={this.props.setModalVisible}
                modalVisible={this.props.modalVisible}
                onPress={() => {
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
                style={{position: 'absolute', right: '5%', top: '35%'}}>
                <Image
                  style={styles.closeButton}
                  source={require('../../../imgs/icon_search.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: Platform.OS === 'ios' ? '98%' : '95%'}}>
              <CountryList
                handlePick={this.handlePick}
                searchText={this.state.searchText}
              />
            </View>
          </View>
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
    height: Platform.OS === 'ios' ? '65%' : '70%',
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
    marginTop: 20,
  },
  closeButton: {
    width: 20,
    height: 20,
  },
  countryList: {
    width: '100%',
    height: '80%',
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
  listImg: {
    width: 25,
    height: 16,
  },
});
export default ListModal;
