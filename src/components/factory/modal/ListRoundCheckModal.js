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
import {RoundCheckbox, SelectedCheckboxes} from '@factory/Roundcheck';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ResetStyle from '@style/ResetStyle';
import ModalStyle from '@style/ModalStyle';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
const window = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '2',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '3',
    img: require('@images/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '4',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '5',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '6',
    img: require('@images/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '7',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '8',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '9',
    img: require('@images/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '10',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '11',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '12',
    img: require('@images/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '13',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '14',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '15',
    img: require('@images/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
  {
    id: '16',
    img: require('@images/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '17',
    img: require('@images/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
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
        setResidenceCity={props.setResidenceCity}
      />
    );
  };

  return (
    <>
      <FlatList
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

const Item = ({item, onPress, style, setResidenceCity}) => {
  CheckedArrObject = new SelectedCheckboxes();
  let checkPick = false;
  return (
    <TouchableOpacity
      onPress={() => {
        setResidenceCity(item.title);
        checkpick = true;
      }}>
      <View style={[ModalStyle.lrcItemView]}>
        <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
          {item.title}
        </Text>
        <RoundCheckbox
          size={25}
          keyValue={Number(item.id)}
          checked={checkPick}
          color="#164895"
          labelColor="#000000"
          checkedObjArr={CheckedArrObject}
        />
      </View>
    </TouchableOpacity>
  );
};

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
    const {t} = this.props;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{flexGrow: 1}}>
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
              activeOpacity={0.55}
              onPress={() => {
                this.setState({modalVisible: !modalVisible});
                this.props.setModalVisible(!modalVisible);
              }}>
              <View style={[ModalStyle.modalCenteredView]}></View>
            </TouchableWithoutFeedback>
          </View>

          {/* <ModalCountry
          data={this.state}
          setModalVisible={this.props.setModalVisible}
        /> */}

          {/* modal view */}
          <View style={[ModalStyle.lrcModal]}>
            <View style={[ModalStyle.lrcmodalTop]}>
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('kycThird10')}
              </Text>
              <TouchableWithoutFeedback
                setModalVisible={this.props.setModalVisible}
                modalVisible={this.props.modalVisible}
                onPress={() => {
                  this.props.setModalVisible(!modalVisible);
                }}>
                <Image
                  style={[ModalStyle.listModalCloseButton]}
                  source={require('@images/icon_close.png')}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={[ModalStyle.lrcModalInput]}>
              <TextInput
                style={[ResetStyle.fontLightK, ResetStyle.fontG, {padding: 10}]}
                placeholderTextColor="#a9a9a9"
                placeholder="search"></TextInput>
              <TouchableOpacity>
                <Image
                  style={[
                    ModalStyle.listModalSearch,
                    {marginTop: 7, marginRight: '2%'},
                  ]}
                  source={require('@images/icon_search.png')}
                />
              </TouchableOpacity>
            </View>

            <CountryList setResidenceCity={this.props.setResidenceCity} />
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}

export default hoistStatics(
  withTranslation()(ListRoundCheckModal),
  ListRoundCheckModal,
);
