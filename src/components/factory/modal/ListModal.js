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
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../../Roundcheck';

const window = Dimensions.get('window');

let DATA = [
  {
    id: '1',
    img: require('../../../imgs/drawable-xhdpi/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '2',
    img: require('../../../imgs/drawable-xhdpi/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '3',
    img: require('../../../imgs/drawable-xhdpi/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '4',
    img: require('../../../imgs/drawable-xhdpi/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '5',
    img: require('../../../imgs/drawable-xhdpi/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '6',
    img: require('../../../imgs/drawable-xhdpi/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '7',
    img: require('../../../imgs/drawable-xhdpi/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '8',
    img: require('../../../imgs/drawable-xhdpi/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '9',
    img: require('../../../imgs/drawable-xhdpi/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '10',
    img: require('../../../imgs/drawable-xhdpi/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '11',
    img: require('../../../imgs/drawable-xhdpi/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '12',
    img: require('../../../imgs/drawable-xhdpi/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '13',
    img: require('../../../imgs/drawable-xhdpi/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '14',
    img: require('../../../imgs/drawable-xhdpi/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '15',
    img: require('../../../imgs/drawable-xhdpi/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
];
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
    DATA = DATA.filter((data) => data.title == props.searchText);
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
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.cd}>{item.cd}</Text>
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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
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
              <Text style={styles.modalText}>국적선택</Text>
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
                style={styles.searchInputText}
                onChangeText={this.handleInputChange}
                value={this.state.searchText}
                placeholder="search"></TextInput>
              <TouchableHighlight style={styles.closeButton}>
                <Image
                  style={styles.closeButton}
                  source={require('../../../imgs/icon_search.png')}
                />
              </TouchableHighlight>
            </View>

            <CountryList
              handlePick={this.handlePick}
              searchText={this.state.searchText}
            />
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
  title: {
    fontSize: 16,
  },
  listImg: {
    width: 25,
    height: 16,
  },
});
export default ListModal;
