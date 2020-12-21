import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Research Form
  researchTitle: {
    fontWeight: '500',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
  researchBottomButton: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  researchAnswerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4%',
  },
  researchAnswerTopStyle: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  researchScrollView: {
    flexDirection: 'column',
    maxHeight: '80%',
  },
  researchQuestion: {
    fontWeight: '500',
    textAlign: 'left',
    marginTop: '6%',
    marginBottom: '8%',
    lineHeight: 25,
  },
  researchQuestionLength: {
    flexDirection: 'column',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  researchView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
