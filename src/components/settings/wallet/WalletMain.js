import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  BackHandler,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import ResetStyle from '@style/ResetStyle.js';
import WalletStyle from '@style/WalletStyle.js';
import ProgressModal from '@factory/modal/ProgressModal.js';
import {getTNCInfo, getTNCHistory} from '@module/tnc';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

const WalletMain = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const URL = 'https://aladdin25.com/';

  const [masterKey, setMasterKey] = useState('');
  const [modalVisible, setModalVisible] = useState(null);
  const [walletHistoryData, setWalletHistoryData] = useState([]);
  const [total, setTotal] = useState(0);

  const {user, tncInfo, tncHistory, infoLoading, historyLoading} = useSelector(
    ({auth, tnc, loading}) => ({
      user: auth.user,
      tncInfo: tnc.tncInfo,
      tncHistory: tnc.tncHistory,
      infoLoading: loading['tnc/GET_TNC_INFO'],
      historyLoading: loading['tnc/GET_TNC_HISTORY'],
    }),
  );

  const onInitialize = () => {
    setModalVisible(true);
    dispatch(getTNCInfo(user.mailId));
    dispatch(
      getTNCHistory({
        email: user.mailId,
        from: -1,
        limit: 3000,
      }),
    );
  };

  useEffect(() => {
    onInitialize();
  }, []);

  useEffect(() => {
    if (tncInfo) {
      setTotal(Number(tncInfo.balance.toString().replace(' TNC', '')));
      setMasterKey(tncInfo.name);
    }
  }, [tncInfo]);

  useEffect(() => {
    if (tncHistory) {
      setWalletHistoryData(tncHistory.transactions);
    }
  }, [tncHistory]);

  useEffect(() => {
    console.log(modalVisible, infoLoading, historyLoading);
    if (modalVisible && !infoLoading && !historyLoading) {
      setModalVisible(false);
    }
  }, [modalVisible, infoLoading, historyLoading]);

  useFocusEffect(
    useCallback(() => {
      const handleBackButtonClick = () => {
        navigation.replace('Main');
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            handleBackButtonClick,
          );
        }
      };
    }, []),
  );

  const Item = (data) => (
    <TouchableOpacity
      // key={index}
      style={[WalletStyle.transactionItemStyle, {marginHorizontal: '5%'}]}
      onPress={() => {
        data.navigation.navigate('WalletDetail', {
          data: data,
        });
      }}>
      <View style={[WalletStyle.transactionItemInner]}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontB,
            {fontWeight: '500'},
            data.to && data.to !== masterKey && {color: '#ff9100'},
          ]}>
          {data.status}
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontB,
            {fontWeight: '500'},
            data.to && data.to !== masterKey && {color: '#ff9100'},
          ]}>
          {data.to && `${data.to !== masterKey ? '-' : '+'} ${data.amount}`}
        </Text>
      </View>

      <View style={[WalletStyle.transactionItemInnerBottom]}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {fontWeight: '500'},
          ]}>
          {/* {data.content.to && data.content.to.length <= 10
          ? data.content.to
          : data.content.to.slice(0, 10) + '..'} */}
          {data.surveyName && data.surveyName}
          {!data.surveyName &&
            data.to &&
            (data.to.length <= 10 ? data.to : data.to.slice(0, 10) + '...')}
        </Text>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {fontWeight: '500'},
          ]}>
          {data.timestamp.replace('T', ' ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top*/}

        <View style={[WalletStyle.MainTopView]}>
          {/* Top Logo */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main');
            }}>
            <View style={[WalletStyle.TopLogoView]}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 25 : 20,
                  height: Platform.OS === 'ios' ? 25 : 20,
                  resizeMode: 'contain',
                }}
                source={require('@images/rrLogoB.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {marginLeft: 10},
                ]}>
                {t('walletMainTitle')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Hamburger Button */}
          <TouchableOpacity
            style={{
              paddingHorizontal: 5,
              paddingVertical: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 25 : 20,
                height: Platform.OS === 'ios' ? 25 : 20,
                resizeMode: 'contain',
              }}
              source={require('@images/menuIcon.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: '10%'}}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(URL);
            }}
            style={{width: '100%', height: '100%'}}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={require('@images/ad_aladdinexchange.png')}
            />
          </TouchableOpacity>
        </View>
        {/* //Top End */}

        {/* My TNC */}
        <View style={[WalletStyle.myTncView]}>
          {/* Title & Refresh */}
          <View style={[WalletStyle.myTncTitleView]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontWhite,
                {fontWeight: '500'},
              ]}>
              {t('walletMain1')}
            </Text>
            <TouchableOpacity onPress={() => onInitialize()}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 30 : 25,
                  height: Platform.OS === 'ios' ? 30 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/walletRefreshIcon.png')}
              />
            </TouchableOpacity>
          </View>

          {/* My TNC Amount */}
          <View style={[WalletStyle.myTncAmountView]}>
            <Text
              style={[
                ResetStyle.fontLightK,
                ResetStyle.fontWhite,
                {fontWeight: '500', marginBottom: '1%'},
              ]}>
              {t('walletMain2')}
            </Text>
            <Text
              style={[
                ResetStyle.fontBoldE,
                ResetStyle.fontWhite,
                {fontWeight: '500'},
              ]}>
              {numberWithCommas(total)}
            </Text>
          </View>

          {/* My TNC Button */}
          <View style={[WalletStyle.myTncButtonView]}>
            {/* Send Button */}
            <TouchableOpacity
              style={[ResetStyle.buttonSmall, WalletStyle.myTncButton]}
              onPress={() => {
                navigation.navigate('WalletSend', {
                  qrcode: 'e.data',
                  currentTnc: total,
                });
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontB]}>
                {t('walletMain3')}
              </Text>
            </TouchableOpacity>

            {/* Receive Button */}
            <TouchableOpacity
              style={[
                ResetStyle.buttonSmall,
                WalletStyle.myTncButton,
                {
                  backgroundColor: '#4696ff',
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              ]}
              onPress={() => {
                navigation.navigate('WalletReceive');
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontWhite]}>
                {t('walletMain4')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* My TNC End */}

        <Text
          style={[
            ResetStyle.fontBlack,
            ResetStyle.fontRegularK,
            WalletStyle.transactionsStyle,
          ]}>
          {t('walletMain5')}
        </Text>
        <FlatList
          bounces={false}
          data={walletHistoryData}
          renderItem={({item}) => (
            <Item
              navigation={navigation}
              index={item.index}
              timestamp={item.timestamp}
              status={item.status}
              txid={item.txid}
              block={item.block}
              content={item.content}
              amount={item.content.amount}
              memo={item.content.memo}
              from={item.content.from}
              to={item.content.to}
              surveyName={item.content.surveyName}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
        />
      </View>
      <ProgressModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default WalletMain;
