import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // initial2
  initial2ScrollContainer: {
    marginTop: 100,
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial2Image: {
    resizeMode: 'contain',
    width: 100,
    height: 90,
    alignSelf: 'center',
  },
  initial2TextTitle: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 32,
    color: '#4696ff',
    fontWeight: 'bold',
  },
  initial2InfoText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#222222',
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '300',
  },
  initial2NormalDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#4696ff',
    marginHorizontal: 6,
  },
  initial2IndicatorContainer: {
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
  loginTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: '#4696ff',
  },
  loginSub: {
    textAlign: 'center',
    color: '#a9a9a9',
    lineHeight: 25,
    fontSize: 18,
  },
  loginBox: {
    width: '100%',
    alignItems: 'center',
  },
  loginFotgotPassword: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4696ff',
  },
  loginMiddleBorder: {
    height: 0,
    width: '100%',
    borderBottomColor: '#787878',
    borderBottomWidth: 0.5,
  },
  loginAccountText: {
    color: '#a9a9a9',
    fontWeight: '300',
    fontSize: 17,
  },

  loginSignupText: {
    fontWeight: '600',
    color: '#4696ff',
    fontSize: 18,
  },

  loginBottomTextBox: {
    width: '100%',
    padding: '5%',
    alignItems: 'center',
  },

  loginBottomText: {
    width: '100%',
    marginTop: 10,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '400',
    color: '#4696ff',
  },
});
