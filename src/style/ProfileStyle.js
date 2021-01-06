import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Settings KYC style

  // layout
  kycContainerInner: {
    flex: 1,
  },

  // Top
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
  },
  topLogoTouchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Personal Level & email
  personalBackground: {
    backgroundColor: '#2d91ff',
    padding: '5%',
  },

  // KYC Level title & all
  kycLevelTitleView: {
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kycLevelAll: {
    width: '20%',
    alignItems: 'center',
    padding: '1%',
  },

  // KYC Level list
  kycScrollView: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: Platform.OS === 'ios' ? 0 : '5%',
  },

  // KYC Level Item
  kycTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? '4.5%' : '3%',
    paddingBottom: Platform.OS === 'ios' ? '4.5%' : '3%',
  },
  kycLevelText: {
    fontWeight: '400',
    paddingLeft: '2%',
    letterSpacing: -0.2,
  },
  kycLevelCheckboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '2%',
  },
  kycLevelText2: {
    fontWeight: '400',
    paddingRight: '3%',
  },
  kycLevelCheckboxImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  kycLevelborder: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1.5,
  },

  // KYC All

  // KYC Level List Item
  kycAllLevelListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: '#dedede',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  kycAllLevelTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  kycAllLevelImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  kycAllBorder: {
    width: '100%',
    marginTop: '5%',
    marginBottom: '7%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dedede',
  },
});
