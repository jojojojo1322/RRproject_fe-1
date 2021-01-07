import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Settings Wallet style

  // Main
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
});
