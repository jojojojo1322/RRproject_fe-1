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
    padding: 15,
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
});
