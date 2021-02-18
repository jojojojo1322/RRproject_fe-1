import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WalletSendModal from '../../factory/modal/WalletSendModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModal from '../../factory/modal/BottomModal';
import axios from 'axios';
import {server} from '../../defined/server';
import {useTranslation, initReactI18next, useSSR} from 'react-i18next';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

export default function WalletSend({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);
  const [modal6Visible, setModal6Visible] = useState(false);
  const [modal7Visible, setModal7Visible] = useState(false);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState('');
  const [valuePlusTen, setValuePlusTen] = useState(0);
  // const [fixValue, setFixValue] = useState(0);
  const [calculator, setCalulator] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [type, setType] = useState('SEND');
  const [transfee, setTransfee] = useState(transactionfee);
  const [walletData, setWalletData] = useState([]);
  const [calculatedValue, setCalculatedValue] = useState(total);

  const {t, i18n} = useTranslation();

  const transactionfee = t('walletSend15');

  const onlyDecimalsix = (num) => {
    // 소숫점 여섯자리 체크 --> 앞자리에 컴마가 붙을경우 작동안함 -> 검사하는동안 컴마 제거
    // 가끔 초기화가 안되고 넘어가면 7자리만 체크를 하기 때문에 인식을 못함 -> num 타입 string 처리
    // 6자리 넘어가면 초기화 대신 마지막 값 제거
    var decimalSix = /^\d*[.]\d{7}$/;
    var decimalSeven = /^\d*[.]\d{8}$/;
    var decimalEight = /^\d*[.]\d{9}$/;

    console.log('소숫점 유형 검사', typeof num);

    let fixNum = String(num).replace(/,/g, '');

    // let fixNum = num;
    if (decimalSix.test(fixNum)) {
      setModal3Visible(!modalVisible);
      setValue(num.slice(0, num.length - 1));

      // await setValue('');
    }
    if (decimalSeven.test(fixNum)) {
      setModal3Visible(!modalVisible);
      setValue(num.slice(0, num.length - 2));
    }
    if (decimalEight.test(fixNum)) {
      setModal3Visible(!modalVisible);
      setValue(num.slice(0, num.length - 3));
    }
  };

  // Calculator
  useEffect(() => {
    const fixValue = Number(String(value).replace(/,/g, ''));
    handleCalculatorOver(fixValue);
    handleUnderTen(value);

    //qrcode없을 시 지워짐
    // setAddress(qrcode);
    // console.log('aaaaaaaa', value);
  }, [value]);

  useEffect(() => {
    onlyDecimalsix(value);
  });

  const {qrcode} = route ? route.params : '';

  useEffect(() => {
    setAddress(qrcode);
    console.log('qrcode check >>>>>', qrcode);
  }, [qrcode]);

  // Wallet Api 활성화
  useEffect(() => {
    if (route.params?.currentTnc) {
      setTotal(route.params?.currentTnc);
    }
    walletDataApi();
  }, []);

  // 송금 후 잔액 계산 불러오기
  useEffect(() => {
    totalCalculator();
    console.log('check for calculated value >>>', calculatedValue);
  }, [calculatedValue]);

  // caculator
  useEffect(() => {
    console.log('check for calculated value >>>', calculator);
  }, [calculator]);

  useEffect(() => {
    valuePlusTenCalculator(value);
  }, [value]);

  // 송금 후 잔액 계산용
  const totalCalculator = () => {
    setCalculatedValue(total - value - 10);
  };

  // Call wallet Data Api
  const walletDataApi = async () => {
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        // 보유한 Total value TNC
        setTotal(Number(response.data.balance.replace(' TNC', '')));
        // setTotal(Number(1000.123412));
        console.log('how much balance', total);
        // Wallet Data 전체 값
        setWalletData(response.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  useEffect(() => {
    console.log('calculator value check >>>>>>>>>>>>>>>>>>>>>>>>', calculator);
  }, [calculator]);

  // Calculator
  const setTenth = () => {
    var calculated = parseFloat((Number(total) / 10).toFixed(6));

    setCalulator('tenth');
    setValue(String(calculated));
    console.log('set tenth value >>>>', value);
  };

  const setQuarter = () => {
    var calculated = parseFloat((Number(total) / 4).toFixed(6));

    setCalulator('quarter');
    setValue(String(calculated));

    console.log('set tenth value >>>>', value);
  };

  const setHalf = () => {
    var calculated = parseFloat((Number(total) / 2).toFixed(6));

    setCalulator('half');
    setValue(String(calculated));

    console.log('set tenth value >>>>', value);
  };

  const setMax = () => {
    var calculated = parseFloat(((Number(total) - 10) / 1).toFixed(6));

    setCalulator('max');
    setValue(String(calculated));

    console.log('set tenth value >>>>', value);
  };

  const valuePlusTenCalculator = (e) => {
    setValuePlusTen(Number(e) + 10);
  };

  // textInput event 안에 들어가는 값
  const inputValueHandle = (e) => {
    // 컴마가 붙어있을 경우 3자리 컴마 함수 에러 -> 컴마 제거를 한 후 다시 3자리 컴마함수 씌우기
    let ret = e.replace(/,/g, '');

    // '.'를 입력했을 경우 체크
    let match = ret.match(/\./g);

    // '.' 처음 입력시 함수 진입
    if (ret.charAt(ret.length - 1) === '.') {
      // 처음 . 입력시 3자리함수 씌운 뒤 . 붙이기 / 3자리 컴마를 안할시 '.' 입력하면 , 사라짐 (ex 123123.)
      if (match !== null && match.length === 1) {
        ret = numberWithCommas(ret).replace(/(^0+)/, '');
        ret = ret + '.';
      } else {
        ret = numberWithCommas(ret).replace(/(^0+)/, '');
      }
    } else {
      ret = numberWithCommas(ret).replace(/(^0+)/, '');
    }
    setValue(ret);
    setCalulator('');
    handleCalculatorOver(ret);
  };
  useEffect(() => {
    const Fvalue = value;
    setValue(Fvalue);
  }, [value]);

  // 각 계산기 값에 따라 보여지는 값 함수
  const handleCalculatorOver = (fixValue) => {
    console.log('fixvalue >>>>>>>>>>>>>>>>>>>>>', fixValue);
    if (calculator === 'max' && fixValue + 10 === total) {
      setModal4Visible(!modal4Visible); // 수수료를 제외한 총액이 표시됩니다.
    } else if (
      (calculator === 'max' && fixValue > total - 10) ||
      (total !== 0 && fixValue > total - 10)
    ) {
      setModal2Visible(!modal2Visible); // 수수료를 제외한 총액보다 클 수 없습니다.
      setValue(0);
    }
    console.log('fixvalue last >>>>>>>>>>>>>>>>>>>>>', fixValue);
  };

  const handleAddress = (e) => {
    setAddress(e);
  };

  const handleMemo = (e) => {
    setMemo(e);
  };

  // wallet send modal 하단 전송 누를 시 동작
  const setConfirm = async () => {
    navigation.navigate('WalletConfirmPassword', {
      amount: value,
      email: await AsyncStorage.getItem('email'),
      memo: memo,
      to: address,
      type: type,
      balance: calculatedValue,
      valuePlusTen: valuePlusTen,
    });
  };

  // 하단 보내기 버튼 누를 시 동작
  const handleConfirm = () => {
    if (address !== 'e.data' && value !== 0 && value > 10) {
      setModalVisible(!modalVisible);
    } else if (value !== 0 && value <= 10) {
      setModal6Visible(!modal6Visible);
    } else {
      setModal5Visible(!modal5Visible);
    }
  };

  // 총액 하단 경고문구
  const handleUnderTen = (value) => {
    if (Number(String(value).replace(/,/g, '')) === 0) {
      setTransfee(t('walletSend15'));
    } else if (Number(String(value).replace(/,/g, '')) < 10) {
      setTransfee(t('walletSend16'));
    } else {
      setTransfee(t('walletSend15'));
    }
  };

  // TNC Check
  console.log('total check >>>>>', total);
  console.log('value check >>>>>', value);
  console.log('wallet data check >>>>>', walletData);
  console.log('calculatedValue check >>>>>', calculatedValue);

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
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 25,
                  height: Platform.OS === 'ios' ? 28 : 25,
                  resizeMode: 'contain',
                }}
                source={require('../../../imgs/backIcon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                {t('walletSendTitle')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={[WalletStyle.sendBodyView]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontBlack,
                {fontWeight: '400'},
              ]}>
              {t('walletSend1')}
            </Text>
            <Text
              style={[
                ResetStyle.fontBoldK,
                ResetStyle.fontB,
                {fontWeight: '500', marginTop: '2%'},
              ]}>
              {parseFloat(total)} {t('walletSend2')}
            </Text>
          </View>

          {/* Address */}
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={[ResetStyle.fontRegularK, WalletStyle.sendContentTitle]}>
                {t('walletSend3')}
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
                    placeholder={t('walletSend4')}
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
                      source={require('../../../imgs/iconX.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('WalletSendQR');
                  }}>
                  <Image
                    style={[WalletStyle.sendContentInnerXButton]}
                    source={require('../../../imgs/tncSendQrIcon.png')}
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
                {t('walletSend5')}
              </Text>
              <View style={[WalletStyle.sendContentInnerTextView]}>
                {/* 금액 */}

                <TextInput
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontBlack,
                    {
                      textAlign: 'left',
                      width: '90%',
                    },
                  ]}
                  placeholder={t('walletSend6')}
                  placeholderTextColor="#a9a9a9"
                  autoCapitalize={'none'}
                  keyboardType={'numeric'}
                  onChangeText={(e) => {
                    // 값 검사 및 3자리 컴마 등 함수화
                    inputValueHandle(e);
                    // setValue(e);
                    // setCalulator('');
                    // handleCalculatorOver();
                  }}
                  onEndEditing={() => {}}
                  // value={value === 0 ? null : String(value)}
                  value={value === 0 ? null : value}
                />
                <TouchableOpacity
                  onPress={() => {
                    setValue(0);
                    setCalulator('');
                  }}>
                  <Image
                    style={[ResetStyle.circleXButton]}
                    source={require('../../../imgs/iconX.png')}
                  />
                </TouchableOpacity>
              </View>

              {/* Percent View */}
              <View style={[WalletStyle.sendPercentView]}>
                {/* 10% button */}
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

                {/* 25% button */}
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

                {/* 50% button */}
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

                {/* Max button */}
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: '2%',
                }}>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('../../../imgs/iconNoticeCheck.png')}
                />
                <Text
                  style={[
                    ResetStyle.fontLightK,
                    ResetStyle.fontDG,
                    {
                      textAlign: 'left',
                      marginLeft: '2%',
                      color: transfee === transactionfee ? '#787878' : '#f00',
                    },
                  ]}>
                  {transfee}
                </Text>
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
                {t('walletSend7')}
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
                  placeholder={t('walletSend8')}
                  placeholderTextColor="#a9a9a9"
                  autoCapitalize={'none'}
                  onChangeText={handleMemo}
                  // value={memo}
                  value={memo}
                  maxLength={15}
                />
                <TouchableOpacity
                  onPress={() => {
                    setMemo('');
                  }}>
                  <Image
                    style={[ResetStyle.circleXButton]}
                    source={require('../../../imgs/iconX.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Button */}
          <TouchableOpacity
            style={[ResetStyle.button]}
            onPress={() => {
              handleConfirm();
              totalCalculator();
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('walletSend9')}
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
        calculatedValue={calculatedValue}
        amount={value}
        memo={memo}
        valuePlusTen={valuePlusTen}
      />
      <BottomModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        text={t('walletSend10')}
      />
      <BottomModal
        modalVisible={modal3Visible}
        setModalVisible={setModal3Visible}
        text={t('walletSend11')}
      />
      <BottomModal
        modalVisible={modal4Visible}
        setModalVisible={setModal4Visible}
        text={t('walletSend12')}
      />
      <BottomModal
        modalVisible={modal5Visible}
        setModalVisible={setModal5Visible}
        text={t('walletSend13')}
      />
      <BottomModal
        modalVisible={modal6Visible}
        setModalVisible={setModal6Visible}
        text={t('walletSend14')}
      />
    </SafeAreaView>
  );
}
