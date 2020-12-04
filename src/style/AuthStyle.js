import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // initial2
  initial2ScrollContainer: {
    marginTop: Platform.OS === 'ios' ? '20%' : '15%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial2Image: {
    resizeMode: 'contain',
    width: '50%',
    height: '10%',
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

  //signup personal
  signupInputImageAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
});
