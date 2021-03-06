import {StyleSheet, Platform, Dimensions} from 'react-native';

export default StyleSheet.create({
  // reset
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginBottom: Platform.OS === 'ios' ? 0 : '5%',
    backgroundColor: '#fff',
  },

  topBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
    paddingBottom: Platform.OS === 'ios' ? '6%' : '2%',
  },

  // button
  button: {
    width: '100%',
    backgroundColor: '#4696ff',
    alignItems: 'center',
    borderRadius: 50,
    padding: Platform.OS === 'ios' ? '5%' : '4%',
  },
  buttonWhite: {
    width: '100%',
    borderColor: '#4696ff',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    padding: Platform.OS === 'ios' ? '5%' : '4%',
  },
  buttonSmall: {
    width: '32%',
    backgroundColor: '#4696ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: Platform.OS === 'ios' ? '3.5%' : '3%',
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // textInputStyle
  textInputStyle: {
    position: 'relative',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  textInputTitle: {
    textAlign: 'left',
  },
  textInputText: {
    textAlign: 'left',
    paddingTop: '6%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  textInputBottomBox: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  textInputAlert: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  textInputRe: {
    alignSelf: 'flex-end',
  },
  textInputTextButton: {
    position: 'absolute',
    top: '60%',
    right: 0,
  },

  //small img
  mediumImg: {
    width: Platform.OS === 'ios' ? 25 : 20,
    height: Platform.OS === 'ios' ? 25 : 20,
  },
  smallImg: {
    width: 18,
    height: 18,
  },
  xsmallImg: {
    width: 15,
    height: 15,
  },

  // font

  // english
  fontBoldE: {
    fontSize: Platform.OS === 'ios' ? 34 : 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  fontMediumE: {
    fontSize: Platform.OS === 'ios' ? 26 : 23,
    fontWeight: '600',
    letterSpacing: -1,
    textAlign: 'center',
  },
  fontRegularE: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontLightE: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontWeight: '300',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // korean
  fontBoldK: {
    fontSize:
      Platform.OS === 'android'
        ? 26
        : Dimensions.get('window').height < 750
        ? 26
        : 33,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  fontMediumK: {
    fontSize:
      Platform.OS === 'android'
        ? 20
        : Dimensions.get('window').height < 750
        ? 20
        : 22,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontRegularK: {
    fontSize:
      Platform.OS === 'android'
        ? 16
        : Dimensions.get('window').height < 750
        ? 17
        : 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontLightK: {
    fontSize:
      Platform.OS === 'android'
        ? 14
        : Dimensions.get('window').height < 750
        ? 14
        : 16,
    fontWeight: '300',
    textAlign: 'center',
  },

  // color
  fontG: {
    color: '#a9a9a9',
  },
  fontDG: {
    color: '#6f6f6f',
  },
  fontB: {
    color: '#4696ff',
  },
  fontBlack: {
    color: '#000',
  },
  fontWhite: {
    color: '#FFF',
  },
  fontR: {
    color: '#F00',
  },

  // Top Hamburger Image
  topHamburgerImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  // Circle X Button
  circleXButton: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
