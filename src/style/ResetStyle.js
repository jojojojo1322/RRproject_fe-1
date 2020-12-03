import {StyleSheet} from 'react-native';

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
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#fff',
  },

  // button
  button: {
    width: '100%',
    backgroundColor: '#4696ff',
    alignItems: 'center',
    borderRadius: 50,
    padding: 19,
  },
  buttonWhite: {
    width: '100%',
    borderColor: '#4696ff',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // font

  // english
  fontBoldE: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  fontMediumE: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -1,
    textAlign: 'center',
  },
  fontRegularE: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontLightE: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // korean
  fontBoldK: {
    fontSize: 33,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  fontMediumK: {
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontRegularK: {
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
  },
  fontLightK: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  },

  // color
  fontG: {
    color: '#a9a9a9',
  },
  fontDG: {
    color: '#787878',
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
});
