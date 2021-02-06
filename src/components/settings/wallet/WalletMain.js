import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  FlatList,
  Linking,
} from 'react-native';
import ResetStyle from '../../../style/ResetStyle.js';
import WalletStyle from '../../../style/WalletStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {server} from '../../defined/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 3자리수 콤마(,) + 소수점 이하는 콤마 안 생기게
function numberWithCommas(num) {
  var parts = num.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

const WalletMain = (props) => {
  const URL = 'https://aladdin25.com/';

  const [masterKey, setMasterKey] = useState('');
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
    getWalletApi();
    postWalletHistoryApi();
  }, []);

  // Api for Total Valance
  const getWalletApi = async () => {
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
  };

  // Api for Wallet history
  const postWalletHistoryApi = async (email, from, limit) => {
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
  };

  const handleRefresh = () => {
    // setRefreshing(!refreshing);
  };

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
            ResetStyle.fontRegularE,
            ResetStyle.fontB,
            {fontWeight: '500'},
            data.to && data.to !== masterKey && {color: '#ff9100'},
          ]}>
          {data.status}
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularE,
            ResetStyle.fontB,
            {fontWeight: '500'},
            data.to && data.to !== masterKey && {color: '#ff9100'},
          ]}>
          {data.to && `${data.to !== masterKey ? '-' : '+'} ${data.amount}`}
          {/* {`${data.content.length}`} */}
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
          <TouchableOpacity>
            <View style={[WalletStyle.TopLogoView]}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/main_r_logo.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {marginLeft: 10},
                ]}>
                Real Research
              </Text>
            </View>
          </TouchableOpacity>

          {/* Hamburger Button */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.openDrawer();
            }}>
            <Image
              style={[ResetStyle.topHamburgerImg]}
              source={require('../../../imgs/drawable-xxxhdpi/menu_2_icon.png')}
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
              source={require('../../../imgs/ad_aladdinexchange.png')}
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
              Total Balance
            </Text>
            <TouchableOpacity
              onPress={() => {
                getWalletApi();
                postWalletHistoryApi();
              }}>
              <Image
                source={require('../../../imgs/drawable-xxxhdpi/wallet_refresh_icon.png')}
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
              {`TNC `}
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
                });
              }}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontB]}>
                Send
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
                Receive
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* My TNC End */}

        <Text
          style={[
            ResetStyle.fontBlack,
            ResetStyle.fontLightE,
            WalletStyle.transactionsStyle,
          ]}>
          Transactions
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
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          // refreshControl={refreshing}
          // onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default WalletMain;
