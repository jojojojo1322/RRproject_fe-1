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
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  topLogoTouchView: {
    padding: 5,
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
    paddingTop: Platform.OS === 'ios' ? '4.5%' : '4%',
    paddingBottom: Platform.OS === 'ios' ? '4.5%' : '4%',
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
    width: Platform.OS === 'ios' ? 30 : 25,
    height: Platform.OS === 'ios' ? 30 : 25,
    resizeMode: 'contain',
  },
  kycLevelborder: {
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
  },

  // KYC All

  // KYC Level List Item
  kycAllLevelListItem: {
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // textAlign: 'left',
    borderBottomColor: '#dedede',
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? '4.5%' : '4%',
    paddingBottom: Platform.OS === 'ios' ? '4.5%' : '4%',
    // borderWidth: 1,
  },
  kycLevelCircle: {
    backgroundColor: '#4696ff',
    width: 6,
    height: 6,
    borderRadius: 50,
    marginTop: '2.5%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  kycAllLevelTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? '5%' : '3%',
  },
  kycAllLevelImg: {
    width: Platform.OS === 'ios' ? 25 : 25,
    height: Platform.OS === 'ios' ? 25 : 25,
    resizeMode: 'contain',
  },
  kycAllBorder: {
    width: '100%',
    marginTop: '5%',
    marginBottom: '7%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dedede',
  },

  // ProfileComplete

  // Top
  profileCompleteTopView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50%',
  },
  profileTopImg: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },

  // Bottom Button
  profileBottomButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  // ProfileIncompleteDetail

  // Top
  incompleteTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
    marginTop: 40,
  },
});
