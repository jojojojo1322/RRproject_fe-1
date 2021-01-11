import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Settings Wallet style

  // WalletMain.js
  MainTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
  },

  TopLogoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // My TNC
  myTncView: {
    width: '100%',
    padding: '5%',
    paddingTop: Platform.OS === 'ios' ? '5%' : '4%',
    paddingBottom: Platform.OS === 'ios' ? '5%' : '4%',
    backgroundColor: '#4696ff',
  },

  myTncTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  myTncAmountView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: '2%',
  },

  myTncButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? '6%' : '4%',
  },

  myTncButton: {
    backgroundColor: '#fff',
    width: '49%',
  },

  transactionsStyle: {
    textAlign: 'left',
    fontWeight: '500',
    padding: '5%',
    paddingTop: Platform.OS === 'ios' ? '5%' : '4%',
    paddingBottom: Platform.OS === 'ios' ? '5%' : '4%',
  },

  transactionsScroll: {
    padding: '5%',
    paddingTop: 0,
  },

  // Transactions Item Style

  transactionItemStyle: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    marginTop: Platform.OS === 'ios' ? '4%' : '3%',
  },
  transactionItemInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionItemInnerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1%',
    marginBottom: Platform.OS === 'ios' ? '4%' : '3%',
  },

  // WalletSend.js

  // Top

  // Body
  sendBodyView: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  sendContentTitle: {
    textAlign: 'left',
    marginBottom: Platform.OS === 'ios' ? '4%' : '3%',
  },
  sendContentInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendContentInnerTextView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? '2%' : 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  sendContentInnerText: {
    textAlign: 'left',
    width: '90%',
  },
  sendContentInnerXButton: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },

  // Total Amount
  sendTotalAmountView: {
    flexDirection: 'column',
  },

  sendPercentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? '4%' : '3%',
  },

  sendPercentTouchable: {
    width: '24%',
    padding: Platform.OS === 'ios' ? '4%' : '3%',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },

  // WalletDetail
  listView: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingTop: '8%',
    paddingBottom: '5%',
  },
});
