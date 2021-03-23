import React, {useState, useEffect} from 'react';
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
import ResetStyle from '@style/ResetStyle.js';
import WalletStyle from '@style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {server} from '../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressModal from '@factory/modal/ProgressModal.js';
import {useTranslation} from 'react-i18next';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

const WalletMain = (props) => {
  const {t, i18n} = useTranslation();
  const URL = 'https://aladdin25.com/';

  const [masterKey, setMasterKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const TestArrayFix = TestArray[0].transactions;
  const [walletHistoryData, setWalletHistoryData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Async Test 용 dummy email 저장
    // AsyncStorage.setItem('email', 'a@c.com', () => {
    //   console.log('유저 닉네임 저장 완료');
    // });
    console.log(
      'props.route.params?.currentTnc',
      props.route.params?.currentTnc,
    );
    console.log(
      'props.route.params?.currentTnc',
      props.route.params?.currentTnc,
    );
    console.log(
      'props.route.params?.currentTnc',
      props.route.params?.currentTnc,
    );
    console.log(
      'props.route.params?.currentTnc',
      props.route.params?.currentTnc,
    );
    if (props.route.params?.currentTnc) {
      setTotal(props.route.params?.currentTnc);
    }
    getWalletApi();
    postWalletHistoryApi();
  }, []);

  // Api for Total Valance
  const getWalletApi = async () => {
    setModalVisible(true);
    await axios
      .get(`${server}/wallet/${await AsyncStorage.getItem('email')}`)
      .then((response) => {
        setWalletData(response.data);
        setTotal(Number(response.data.balance.replace(' TNC', '')));
        console.log('wallet Data>>>>>', walletData);
        setMasterKey(response.data.name);
      })
      .catch((e) => {
        console.log('error', e);
      });
    setModalVisible(false);
  };

  // Api for Wallet history
  const postWalletHistoryApi = async (email, from, limit) => {
    setModalVisible(true);
    await axios
      .post(`${server}/wallet/history`, {
        email: await AsyncStorage.getItem('email'),
        from: -1,
        limit: 3000,
      })
      .then((response) => {
        console.log('wallet history >>>>>>', response.data.transactions);
        setWalletHistoryData(response.data.transactions);
        console.log('wallet history data >>>>>', walletHistoryData);
      })
      .catch((e) => {
        console.log('error', e);
      });
    setModalVisible(false);
  };

  const handleRefresh = () => {
    // setRefreshing(!refreshing);
  };

  const handleBackButtonClick = () => {
    props.navigation.replace('Main');
    return true;
  };

  useEffect(() => {
    console.log('실행');
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, []);

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
              props.navigation.navigate('Main');
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
              props.navigation.openDrawer();
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
            <TouchableOpacity
              onPress={() => {
                getWalletApi();
                postWalletHistoryApi();
              }}>
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
                props.navigation.navigate('WalletSend', {
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
                props.navigation.navigate('WalletReceive');
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
          data={walletHistoryData}
          renderItem={({item}) => (
            <Item
              navigation={props.navigation}
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
          keyExtractor={(item, index) =>
            // Number(item.level);
            index.toString()
          }
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          // refreshControl={refreshing}
          // onRefresh={handleRefresh}
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
