import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import PropTypes, {func} from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WalletSendModal from '../../factory/modal/WalletSendModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '../../factory/modal/BottomModal';
import axios from 'axios';
import {server} from '../../defined/server';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

const masterKey = 'RR6f3TBp4ckUTuWVw9Wb6akW84HgJcGZJgwnN1WNnJDy9QEBitdG';

const dealDetail = {
  block: '1035613',
  total: '2',
  status: 'Receive',
  object: '회원가입',
  sender: '0x6565232c6565ed6565659desds6565c58s6565c58',
  recipient: '0x6565232c6565ed6565659desds6565c58s6565c58',
  memo: 'Test',
  DATE: '2020-10-30 20:16:21',
  TXID: '0x6565232c6565ed6565659desds6565c58c7',
};

export default function WalletSend({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState(0);
  const [calculator, setCalulator] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [walletData, setWalletData] = useState([]);
  const [transfee, setTransfee] = useState('전송 수수료 : 10 TNC');

  const onlyDecimalsix = (num) => {
    var decimalSix = /^\d*[.]\d{7}$/;
    if (decimalSix.test(num)) {
      setModal3Visible(!modalVisible);
      setValue(0);
      return false;
    }
  };

  const {qrcode} = route ? route.params : '';
  console.log('qrcode check >>>>>', qrcode);

  // Calculator
  useEffect(() => {
    handleCalculatorOver(value);
    handleUnderTen(value);
    onlyDecimalsix(value);
    setAddress(qrcode);
    console.log(value);
  }, [value, qrcode]);

  // Wallet Api 활성화
  useEffect(() => {
    // Async Test 용 dummy email 저장
    AsyncStorage.setItem('email', 'a@c.com', () => {
      console.log('유저 닉네임 저장 완료');
    });
    walletDataApi();
  }, []);

  // Call wallet Data Api
  const walletDataApi = async () => {
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        // 보유한 Total value TNC
        setTotal(Number(response.data.balance.replace(' TNC', '')));
        // Wallet Data 전체 값
        setWalletData(response.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  // Total value TNC Check
  console.log('wallet data check >>>>>', walletData);
  console.log('total check >>>>>', total);
  console.log('value check >>>>>', value);

  const setTenth = () => {
    setCalulator('tenth');
    setValue(parseFloat((total / 10).toFixed(6)));
  };

  const setQuarter = () => {
    setCalulator('quarter');
    setValue(parseFloat((total / 4).toFixed(6)));
  };

  const setHalf = () => {
    setCalulator('half');
    setValue(parseFloat((total / 2).toFixed(6)));
  };

  const setMax = () => {
    setCalulator('max');
    setValue(parseFloat(((total - 10) / 1).toFixed(6)));
  };

  const setConfirm = () => {
    navigation.navigate('WalletConfirmPassword');
  };

  const handleAddress = (e) => {
    setAddress(e);
  };

  const handleMemo = (e) => {
    setMemo(e);
  };

  const handleCalculatorOver = () => {
    if (
      (calculator === 'tenth' && value > total / 10) ||
      (calculator === 'quarter' && value > total / 4) ||
      (calculator === 'half' && value > total / 2)
    ) {
      setCalulator('');
    } else if (
      (calculator === 'tenth' && value < total / 10) ||
      (calculator === 'quarter' && value < total / 4) ||
      (calculator === 'half' && value < total / 2)
    ) {
      setCalulator('');
    } else if (
      (calculator === 'max' && value > total - 10) ||
      value > total - 10
    ) {
      setCalulator('');
      setModal2Visible(true);
      setValue(0);
    } else if (calculator === 'max' && value + 10 === total) {
      setModal4Visible(true);
      setCalulator('max');
    }
  };

  const handleUnderTen = (value) => {
    if (value === 0) {
      setTransfee('전송 수수료 : 10 TNC');
    } else if (value < 10) {
      setTransfee('보내는 금액은 최소 10 TNC 이상이어야 합니다.');
    } else {
      setTransfee('전송 수수료 : 10 TNC');
    }
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[ResetStyle.containerInner]}>
          {/* Top */}
          {/* topBackButton */}
          <View style={ResetStyle.topBackButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              보내기
            </Text>
          </View>

          {/* Body */}
          <View style={[WalletStyle.sendBodyView]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontBlack,
                {fontWeight: '400'},
              ]}>
              Total Balance
            </Text>
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {fontWeight: '500', marginTop: '2%'},
              ]}>
              {parseFloat(total)} TNC
            </Text>
          </View>

          {/* Address */}
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[ResetStyle.fontRegularK, WalletStyle.sendContentTitle]}>
                주소
              </Text>
              <View style={[WalletStyle.sendContentInnerView]}>
                <View
                  style={[
                    WalletStyle.sendContentInnerTextView,
                    {width: '85%'},
                  ]}>
                  <TextInput
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontBlack,
                      {
                        textAlign: 'left',
                        width: '70%',
                      },
                    ]}
                    placeholder={`보낼 주소 입력`}
                    placeholderTextColor="#a9a9a9"
                    onChangeText={(e) => {
                      handleAddress(e);
                    }}
                    value={address === 'e.data' ? null : address}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setAddress('');
                    }}>
                    <Image
                      style={[ResetStyle.circleXButton]}
                      source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WalletSendQR');
                    // this.props.navigation.navigate('WalletSendQR');
                  }}>
                  <Image
                    style={[WalletStyle.sendContentInnerXButton]}
                    source={require('../../../imgs/drawable-xxxhdpi/tnc_send_qr_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Amount */}
            <View style={[WalletStyle.sendTotalAmountView]}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  WalletStyle.sendContentTitle,
                  {
                    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
                  },
                ]}>
                총액
              </Text>
              <View style={[WalletStyle.sendContentInnerTextView]}>
                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      width: '90%',
                    },
                  ]}
                  placeholder={`보낼 수량 입력`}
                  placeholderTextColor="#a9a9a9"
                  autoCapitalize={'none'}
                  keyboardType={'numeric'}
                  onChangeText={(e) => {
                    setValue(e);
                    setCalulator('');
                    handleCalculatorOver();
                  }}
                  value={
                    value === 0
                      ? null
                      : numberWithCommas(value).replace(/(^0+)/, '')
                  }
                />

                <TouchableOpacity
                  onPress={() => {
                    setValue(0);
                    setCalulator('');
                  }}>
                  <Image
                    style={[ResetStyle.circleXButton]}
                    source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                  />
                </TouchableOpacity>
              </View>

              {/* Percent View */}
              <View style={[WalletStyle.sendPercentView]}>
                <TouchableOpacity
                  style={[
                    WalletStyle.sendPercentTouchable,
                    calculator === 'tenth' && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    setTenth();
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      calculator === 'tenth' && ResetStyle.fontWhite,
                    ]}>
                    10%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    WalletStyle.sendPercentTouchable,
                    calculator === 'quarter' && {
                      backgroundColor: '#2d91ff',
                    },
                  ]}
                  onPress={() => {
                    setQuarter();
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      calculator === 'quarter' && ResetStyle.fontWhite,
                    ]}>
                    25%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    WalletStyle.sendPercentTouchable,
                    calculator === 'half' && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    setHalf();
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      calculator === 'half' && ResetStyle.fontWhite,
                    ]}>
                    50%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    WalletStyle.sendPercentTouchable,
                    calculator === 'max' && {backgroundColor: '#2d91ff'},
                  ]}
                  onPress={() => {
                    setMax();
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontLightK,
                      ResetStyle.fontG,
                      calculator === 'max' && ResetStyle.fontWhite,
                    ]}>
                    MAX
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontDG,
                  {
                    textAlign: 'left',
                    marginTop: '2%',
                    color:
                      transfee === '전송 수수료 : 10 TNC' ? '#000' : '#f00',
                  },
                ]}>
                {transfee}
              </Text>
            </View>

            {/* Comment */}
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  WalletStyle.sendContentTitle,
                  {
                    marginTop: Platform.OS === 'ios' ? '10%' : '5%',
                  },
                ]}>
                메모
              </Text>
              <View style={[WalletStyle.sendContentInnerTextView]}>
                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      width: '80%',
                    },
                  ]}
                  placeholder={`메모 입력(15자 내외)`}
                  placeholderTextColor="#a9a9a9"
                  autoCapitalize={'none'}
                  onChangeText={handleMemo}
                  value={memo}
                  maxLength={15}
                />
                <TouchableOpacity
                  onPress={() => {
                    setMemo('');
                  }}>
                  <Image
                    style={[ResetStyle.circleXButton]}
                    source={require('../../../imgs/drawable-xxxhdpi/icon_x.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Button */}
          <TouchableOpacity
            style={[ResetStyle.button]}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              보내기
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {/* Modal */}
      <WalletSendModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        confirm={setConfirm}
        address={address}
        amount={value}
        memo={memo}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={'수수료를 제외한 총액보다 클 수 없습니다.'}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={'소수점 여섯자리까지만 입력가능합니다.'}
      />
      <BottomModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
        text={'수수료를 제외한 총액이 표시됩니다.'}
      />
    </SafeAreaView>
  );
}
