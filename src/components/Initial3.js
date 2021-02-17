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
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';

import {
  RoundCheckbox,
  SelectedCheckboxes,
} from '../components/factory/Roundcheck';
import TextConfirmModal from './factory/modal/TextConfirmModal';
import TextConfirmCancelModal from './factory/modal/TextConfirmCancelModal';

import BottomModal from './factory/modal/BottomModal';
import KycModal from './factory/modal/KycModal';
import AudienceModal from './factory/modal/AudienceModal';
import ListModal from './factory/modal/ListModal';
import ListRoundCheckModal from './factory/modal/ListRoundCheckModal';
import ListCheckModal from './factory/modal/ListCheckModal';

const window = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    img: require('../imgs/flag_afghanistan.png'),
    title: 'Afghanistan(AF)',
    cd: '+93',
  },
  {
    id: '2',
    img: require('../imgs/flag_albania.png'),
    title: 'Albania',
    cd: '+355',
  },
  {
    id: '3',
    img: require('../imgs/flag_argentina.png'),
    title: 'Argentina',
    cd: '+54',
  },
];
const CountryList = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#efefef' : '#FFF';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <View style={styles.countryList}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          // Number(item.level);
          index.toString()
        }
        extraData={selectedId}
      />
    </View>
  );
};

const Item = ({item, onPress, style}) => {
  CheckedArrObject = new SelectedCheckboxes();
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image style={styles.listImg} source={item.img} />
      <Text style={styles.title}>{item.title}</Text>
      {/* <Text style={styles.cd}>{item.cd}</Text> */}
      <RoundCheckbox
        size={25}
        keyValue={Number(item.id)}
        checked={false}
        color="#164895"
        labelColor="#000000"
        label="Birds of Prey"
        value="birds_of_prey"
        checkedObjArr={CheckedArrObject}
      />
    </TouchableOpacity>
  );
};

class ModalCountry extends Component {
  render() {
    return (
      <>
        <View style={styles.modalView}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>국적선택</Text>
            <TouchableOpacity
              style={styles.closeButton}
              setModalVisible={this.setModalVisible}
              modalVisible={this.props.modalVisible}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                style={styles.closeButton}
                source={require('../imgs/icon_close.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.modalInputBox}>
            <TextInput
              style={styles.searchInputText}
              placeholderTextColor="#a9a9a9"
              placeholder="search"></TextInput>
            <TouchableOpacity style={styles.closeButton}>
              <Image
                style={styles.closeButton}
                source={require('../imgs/icon_search.png')}
              />
            </TouchableOpacity>
          </View>

          <CountryList />
        </View>
      </>
    );
  }
}

class Initial3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        window,
      },
      modalVisible: false,
      modal2Visible: false,
      modal3Visible: false,
      modal4Visible: false,
      modal5Visible: false,
      modal6Visible: false,
      modal7Visible: false,
      modal8Visible: false,
      modal9Visible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setModal8Visible = this.setModal8Visible.bind(this);
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  setModal2Visible = (visible) => {
    this.setState({modal2Visible: visible});
  };

  setModal3Visible = (visible) => {
    this.setState({modal3Visible: visible});
    console.log(visible);
  };

  setModal4Visible = (visible) => {
    this.setState({modal4Visible: visible});
  };
  setModal5Visible = (visible) => {
    this.setState({modal5Visible: visible});
  };
  setModal6Visible = (visible) => {
    this.setState({modal6Visible: visible});
  };
  setModal7Visible = (visible) => {
    this.setState({modal7Visible: visible});
  };
  setModal8Visible = (visible) => {
    this.setState({modal8Visible: visible});
  };
  setModal9Visible = (visible) => {
    this.setState({modal9Visible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    const {modal2Visible} = this.state;
    const {modal3Visible} = this.state;
    const {modal4Visible} = this.state;
    const {modal5Visible} = this.state;
    const {modal6Visible} = this.state;
    const {modal7Visible} = this.state;
    const {modal8Visible} = this.state;
    const {modal9Visible} = this.state;
    const windowWidth = this.state.dimensions.window.width;
    return (
      <View style={(styles.container, {marginTop: '40%'})}>
        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.TextSize}>국가 선택 모달</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal2Visible(true);
          }}>
          <Text style={styles.TextSize}>하단 알림 모달창</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal3Visible(true);
          }}>
          <Text style={styles.TextSize}>기본 텍스트 확인 모달창</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal4Visible(true);
          }}>
          <Text style={styles.TextSize}>기본 텍스트 확인 취소 모달창</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal5Visible(true);
          }}>
          <Text style={styles.TextSize}>KYC LEVEL 설명 모달창</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal6Visible(true);
          }}>
          <Text style={styles.TextSize}>거주도시</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal7Visible(true);
          }}>
          <Text style={styles.TextSize}>사용가능언어</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // activeOpacity={0.50}
          onPress={() => {
            this.setModal8Visible(true);
          }}>
          <Text style={styles.TextSize}>Audience</Text>
        </TouchableOpacity>

        <Text>{this.state.title}</Text>

        {/* 국적버튼 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            activeOpacity={0.55}
            onPress={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <ModalCountry
                data={this.state}
                setModalVisible={this.setModalVisible}></ModalCountry>
            </View>
          </TouchableOpacity>
        </Modal> */}
        <ListModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          text={`인증번호를 발송하였습니다.`}
        />

        {/* 하단 알림 모달 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal2Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            activeOpacity={0.55}
            onPress={() => {
              this.setModal2Visible(!modal2Visible);
            }}>
            <View style={styles.modalFooterBg}>
              <View style={styles.modalFooter}>
                <Text style={styles.modalFooterText}>
                  인증번호를 발송하였습니다.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}
        {/* <bottomModal
          modalVisible={modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`현재 지갑이 생성되어 있지 않습니다${'\n'}지갑을 만들어 주세요`}
        /> */}
        <BottomModal
          modalVisible={modal2Visible}
          setModalVisible={this.setModal2Visible}
          text={`인증번호를 발송하였습니다.`}
        />

        {/* 확인버튼 전용 모달창 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal3Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView2}
            onPress={() => {
              this.setModal3Visible(!modal3Visible);
            }}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText2}>
                현재 지갑이 생성되어 있지 않습니다{'\n'}지갑을 만들어주세요
              </Text>
            </View>
            <TouchableOpacity
              style={{...styles.closeButton2, backgroundColor: '#164895'}}
              onPress={() => {
                this.setModal3Visible(!modal3Visible);
              }}>
              <Text style={styles.closeButtonText2}>확인</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
        {/* <TextConfirmModal modalVisible={this.state.modal3Visible} /> */}
        <TextConfirmModal
          modalVisible={modal3Visible}
          setModalVisible={this.setModal3Visible}
          text={`현재 지갑이 생성되어 있지 않습니다${'\n'}지갑을 만들어 주세요`}
        />

        {/* 로그아웃 확인 취소 버튼
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal4Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView2}
            onPress={() => {
              this.setModal4Visible(!modal4Visible);
            }}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText2}>정말 로그아웃 하시겠습니까?</Text>
            </View>
            <View style={styles.modalView2bottom2Button}>
              <TouchableOpacity
                style={styles.modalView2bottom2Button1}
                onPress={() => {
                  this.setModal4Visible(!modal4Visible);
                }}>
                <Text style={styles.closeButtonText2}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalView2bottom2Button2}
                onPress={() => {
                  this.setModal4Visible(!modal4Visible);
                }}>
                <Text style={styles.closeButtonText2}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        <TextConfirmCancelModal
          modalVisible={modal4Visible}
          setModalVisible={this.setModal4Visible}
          text={`정말 로그아웃 하시겠습니까?`}
        />

        {/* KYC LEVEL 설명 모달창 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal5Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView2}
            onPress={() => {
              this.setModal5Visible(!modal5Visible);
            }}>
            <View style={styles.KycModalTopView2}>
              <Text style={styles.KycModalTopText2}>KYC LEVEL이란?</Text>
              <TouchableOpacity
                style={styles.KycModalView2bottom2Button1}
                onPress={() => {
                  this.setModal5Visible(!modal5Visible);
                }}>
                <Image
                  style={styles.closeButton}
                  source={require('../imgs/icon_close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.KycModalView2}>
              <Text style={styles.KycModalText2}>
                리얼리서치 설문조사에 참여할 수 있는 LEVEL 을 의미합니다.
              </Text>
              <Text style={styles.KycModalText2}>
                LEVEL이 높아질수록 설문조사 참여가능 수와 보상이 높아집니다.
              </Text>
              <Text style={styles.KycModalText2}>
                해당 KYC 정보는 참여 조건을 확인하고 결과 리포트에 반영될 뿐
                회원님을 구별할 수 있는 정보는 저장하지 않습니다.
              </Text>
              <Text style={styles.KycModalText2}>
                리얼리서치는 회원님의 KYC 정보를 블록체인에 저장하여 개인 정보를
                안전하게 지켜드립니다.
              </Text>
            </View>
          </View>
        </Modal> */}
        <KycModal
          modalVisible={modal5Visible}
          setModalVisible={this.setModal5Visible}
          text={`정말 로그아웃 하시겠습니까?`}
        />
        {/* 사용가능언어 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal6Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            activeOpacity={0.55}
            onPress={() => {
              this.setModal6Visible(!modal6Visible);
            }}>
            <View style={styles.centeredView}>
              <ModalCountry
                data={this.state}
                setModal6Visible={this.setModal6Visible}></ModalCountry>
            </View>
          </TouchableOpacity>
        </Modal> */}
        <ListRoundCheckModal
          modalVisible={modal6Visible}
          setModalVisible={this.setModal6Visible}
          text={`정말 로그아웃 하시겠습니까?`}
        />

        {/* 거주도시 선택 */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal7Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            activeOpacity={0.55}
            onPress={() => {
              this.setModal7Visible(!modal7Visible);
            }}>
            <View style={styles.centeredView}>
              <ModalCountry
                data={this.state}
                setModal7Visible={this.setModal7Visible}></ModalCountry>
            </View>
          </TouchableOpacity>
        </Modal> */}

        <ListCheckModal
          modalVisible={modal7Visible}
          setModalVisible={this.setModal7Visible}
          text={`정말 로그아웃 하시겠습니까?`}
        />
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal4Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView2}
            onPress={() => {
              this.setModal4Visible(!modal4Visible);
            }}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText2}>정말 로그아웃 하시겠습니까?</Text>
            </View>
            <View style={styles.modalView2bottom2Button}>
              <TouchableOpacity
                style={styles.modalView2bottom2Button1}
                onPress={() => {
                  this.setModal4Visible(!modal4Visible);
                }}>
                <Text style={styles.closeButtonText2}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalView2bottom2Button2}
                onPress={() => {
                  this.setModal4Visible(!modal4Visible);
                }}>
                <Text style={styles.closeButtonText2}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        {/* Audience */}
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={modal8Visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={styles.centeredView2}
            onPress={() => {
              this.setModal8Visible(!modal8Visible);
            }}>
            <View style={styles.AudienceAllView}>
              <View style={styles.AudienceTop}>
                <Text style={styles.AudienceTopLeft}>Audience</Text>
                <TouchableOpacity
                  style={styles.AudienceTopRight}
                  onPress={() => {
                    this.setmodal8Visible(!modal8Visible);
                  }}>
                  <Image
                    style={styles.AudienceTopRight}
                    source={require('../imgs/icon_close.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.AudienceTop2}>참여가능 LEVEL : Level 2</Text> */}

        {/* 나이 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>나이</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>25</Text>
                </View>
              </View> */}
        {/* 성별 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>성별</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>여성</Text>
                </View>
              </View> */}
        {/* 결혼유무 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>결혼유무</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>미혼</Text>
                </View>
              </View> */}
        {/* 국적 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>국적</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>한국</Text>
                </View>
              </View> */}
        {/* 거주국가 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>거주국가</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>한국</Text>
                </View>
              </View> */}
        {/* 거주도시 */}
        {/* <View style={styles.AudienceDetail}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>거주도시</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>서울</Text>
                </View>
              </View> */}
        {/* 언어 */}
        {/* <View style={styles.AudienceDetailLast}>
                <View style={styles.AudienceDetailLeft}>
                  <Text style={styles.AudienceDetailLeftText}>언어</Text>
                </View>
                <View style={styles.AudienceDetailRight}>
                  <Text style={styles.AudienceDetailRightText}>한국어</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
        <AudienceModal
          modalVisible={modal8Visible}
          setModalVisible={this.setModal8Visible}
          text={`정말 로그아웃 하시겠습니까?`}
          level={`2`}
          age={`25`}
          gender={`여성`}
          maritalStatus={`미혼`}
          nationality={`한국`}
          country={`한국`}
          countryCity={`서울`}
          language={`한국어`}
        />
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(0, 0%, 20%, 0.6)',
  },
  modalView: {
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
    borderColor: '#4696ff',
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
    backgroundColor: 'grey',
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
    backgroundColor: 'grey',
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

export default Initial3;
