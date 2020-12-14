import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Item
  itemBox: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  itemBoxInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  itemDivisionColor: {
    position: 'absolute',
    bottom: '-5%',
    left: 0,
    width: '100%',
    height: 10,
  },
  itemTitleView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '3%',
    marginBottom: '4%',
  },

  itemImagenullView: {
    width: '90%',
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#dedede',
  },
  itemImagenullViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
  },

  itemImageView: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  itemImageViewInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  itemImageViewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  itemImageTncView: {
    position: 'absolute',
    top: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '7%',
  },
  itemBoxBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '4%',
  },
  itemBoxBottomTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 2,
  },

  itemBoxBottomBarChartView: {
    position: 'relative',
    width: '90%',
    height: 3,
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: '#d7d7d7',
  },
  itemBoxBottomBarChartPercent: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#0080ff',
  },
  participantCountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '2%',
  },

  mainFlatlistView: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'scroll',
    backgroundColor: '#f9f9f9',
  },
});
