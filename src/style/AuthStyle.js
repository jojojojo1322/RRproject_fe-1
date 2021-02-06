import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // initial2

  initial2ScrollContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? '40%' : '35%',
  },
  initial2Image: {
    resizeMode: 'contain',
    width: '50%',
    height: '25%',
    alignSelf: 'center',
  },
  initial2NormalDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4696ff',
    marginHorizontal: 6,
  },
  initial2IndicatorContainer: {
    position: 'absolute',
    bottom: '38%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial2ButtonBox: {
    width: '100%',
    alignItems: 'center',
  },

  // login

  loginContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  loginBox: {
    width: '100%',
    alignItems: 'center',
  },
  loginMiddleBorder: {
    width: '100%',
    borderBottomColor: '#787878',
    borderBottomWidth: 0.5,
  },
  loginBottomTextBox: {
    width: '100%',
    padding: '5%',
    alignItems: 'center',
  },

  // AgreementTermsConditions

  agreementViewBox: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // TermsConditions

  termsConditionsContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'scroll',
    backgroundColor: '#FFF',
  },

  // EmailAuthentication

  emailAuthTextInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  emailAuthCountdownBox: {
    position: 'absolute',
    right: 0,
    top: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailAuthAlertView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    justifyContent: 'space-between',
  },

  // SignupPersonal

  signupInputImageAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  signupCheckView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  // ResetPassword
  resetPasswordView1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetPasswordView2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  // WalletMasterKey
  walletCopy: {
    backgroundColor: '#f3f3f3',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },

  // Kyc
  topCheckbutton: {
    height: Platform.OS === 'ios' ? 55 : 45,
    width: Platform.OS === 'ios' ? 55 : 45,
    resizeMode: 'contain',
  },

  // KycFirst
  kycBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kycButton: {
    backgroundColor: '#eeeeee',
    width: '48%',
    borderRadius: 12,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: '5%',
  },

  // KycThird
  kycInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    alignItems: 'center',
  },
});
