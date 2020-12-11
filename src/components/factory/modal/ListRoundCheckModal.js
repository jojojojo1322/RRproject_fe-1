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
import {RoundCheckbox, SelectedCheckboxes} from '../../factory/Roundcheck';
const window = Dimensions.get('window');

const DATA = [
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
];
const CountryList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#FFF' : '#FFF';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
        setResidenceCity={props.setResidenceCity}
      />
    );
  };

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

const Item = ({item, onPress, style, setResidenceCity}) => {
  CheckedArrObject = new SelectedCheckboxes();
  let checkPick = false;
  return (
    <TouchableOpacity
      onPress={() => {
        setResidenceCity(item.title);
        checkpick = true;
      }}
      style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
      {/* <Text style={styles.cd}>{item.cd}</Text> */}
      <RoundCheckbox
        size={25}
        keyValue={Number(item.id)}
        checked={checkPick}
        color="#164895"
        labelColor="#000000"
        label="Birds of Prey"
        value="birds_of_prey"
        checkedObjArr={CheckedArrObject}
      />
    </TouchableOpacity>
  );
};

// class ModalCountry extends Component {
//   render() {
//     return (
//       <>
//         <View style={styles.modalView}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalText}>거주도시 선택</Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               setModalVisible={this.props.setModalVisible}
//               modalVisible={this.props.modalVisible}
//               onPress={() => {
//                 this.props.setModalVisible(!modalVisible);
//               }}>
//               <Image
//                 style={styles.closeButton}
//                 source={require('../../../imgs/icon_close.png')}
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.modalInputBox}>
//             <TextInput
//               style={styles.searchInputText}
//               placeholder="search"></TextInput>
//             <TouchableOpacity style={styles.closeButton}>
//               <Image
//                 style={styles.closeButton}
//                 source={require('../../../imgs/icon_search.png')}
//               />
//             </TouchableOpacity>
//           </View>

//           <CountryList />
//         </View>
//       </>
//     );
//   }
// }

class ListRoundCheckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
        </View>

        {/* <ModalCountry
          data={this.state}
          setModalVisible={this.props.setModalVisible}
        /> */}

        {/* modal view */}
        <View style={styles.modalView}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>거주도시 선택</Text>
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
              placeholder="search"></TextInput>
            <TouchableOpacity style={styles.closeButton}>
              <Image
                style={styles.closeButton}
                source={require('../../../imgs/icon_search.png')}
              />
            </TouchableOpacity>
          </View>

          <CountryList setResidenceCity={this.props.setResidenceCity} />
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
  centeredView: {
    flex: 1,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
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
  KycModalTopView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'baseline',
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
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: '5%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#4696ff',
  },
  KycModalView2bottom2Button1: {
    position: 'absolute',
    right: 0,
  },
  KycModalView2: {
    width: '90%',
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 5,
  },
  KycModalTopText2: {
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: '5%',
    marginBottom: '5%',
  },
  KycModalText2: {
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 20,
    marginTop: '1%',
    marginBottom: '5%',
  },
  KycCloseButtonText2: {
    // color: '#FFF',
    // fontWeight: '500',
    // zIndex: 0,
    elevation: 4,
    // position: 'absolute',
    // top: 20,
    // right: 30,
    fontSize: 50,
    // textAlign: 'center',
    // padding: 17,
  },
  AudienceAllView: {
    width: '90%',

    backgroundColor: 'white',
    paddingTop: 23,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    // padding: 30,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AudienceTop: {
    // flex: 5,
    flexDirection: 'row',
  },
  AudienceTopLeft: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  AudienceTopRight: {
    // alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  AudienceTop2: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f5f5f5',
    marginTop: 21,
    marginBottom: 19,
    paddingTop: 16,
    paddingBottom: 16,
  },
  AudienceDetail: {
    // flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  AudienceDetailLast: {
    // flex: 1,
    flexDirection: 'row',
    // paddingBottom: 10,
  },

  AudienceDetailLeft: {
    width: '30%',
    backgroundColor: '#1e4683',
    borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
  },
  AudienceDetailRight: {
    // backgroundColor: '#1e4683',
    width: '70%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4696ff',
    // borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  AudienceDetailLeftText: {
    // position: 'absolute',
    // width: '30%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 15,
    textAlign: 'center',
    // paddingBottom: 10,
    // paddingLeft: 36,
    // paddingRight: 36,
  },
  AudienceDetailRightText: {
    fontSize: 15,
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 20,
    // paddingRight: 195,
  },
});
export default ListRoundCheckModal;
