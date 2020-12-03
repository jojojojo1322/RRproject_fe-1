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
    borderRadius: 50,
    backgroundColor: '#0b95c9',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
