import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WalletSendModal from '../../factory/modal/WalletSendModal';
import BottomModal from '../../factory/modal/BottomModal';

// 3자리수 콤마(,)
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

export default function MainTest({navigation}) {
  const [total, setTotal] = useState(1000000);
  const [calculator, setCalulator] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    handleOver();
  });

  const setTenth = () => {
    setCalulator('tenth');
    setValue(total / 10);
  };

  const setQuarter = () => {
    setCalulator('quarter');
    setValue(total / 4);
  };

  const setHalf = () => {
    setCalulator('half');
    setValue(total / 2);
  };

  const setMax = () => {
    setCalulator('max');
    setValue(total / 1);
  };

  const setConfirm = () => {
    navigation.navigate('WalletConfirmPassword');
    // navigation.navigate('WalletSendSuccess');
  };

  const handleAddress = (e) => {
    setAddress(e);
  };

  const handleMemo = (e) => {
    setMemo(e);
  };

  const handleOver = () => {
    if (value > total) {
      setModal2Visible(true);
      setValue(0);
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
              {numberWithCommas(total)} TNC
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
                        width: '90%',
                        // borderWidth: 1,
                      },
                    ]}
                    placeholder={`보낼 주소 입력`}
                    placeholderTextColor="#a9a9a9"
                    // autoCapitalize={'none'}
                    onChangeText={handleAddress}
                    value={address}
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
                  onChangeText={setValue}
                  // value={value === 0 ? null : numberWithCommas(value)}
                  value={value === 0 ? null : value.toString()}
                />
                <TouchableOpacity
                  onPress={() => {
                    setValue(0);
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
                    setCalulator('tenth');
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
                    setCalulator('quarter');
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
                    setCalulator('half');
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
                    setCalulator('max');
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
                      width: '90%',
                    },
                  ]}
                  placeholder={`메모 입력`}
                  placeholderTextColor="#a9a9a9"
                  autoCapitalize={'none'}
                  onChangeText={handleMemo}
                  value={memo}
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
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontWhite]}>
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
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={'보낼 수량은 총액보다 클 수 없습니다.'}
      />
    </SafeAreaView>
  );
}
