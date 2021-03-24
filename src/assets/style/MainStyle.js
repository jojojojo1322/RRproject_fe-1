import {Platform, Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Drawer
  drawerItem: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItemText: {
    textAlign: 'left',
    paddingLeft: Platform.OS === 'ios' ? '8%' : '7%',
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? '5%' : '4%',
  },
  drawerItemAlert: {
    width: 30,
    height: 30,
    backgroundColor: '#ff9100',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItemAlertText: {
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFF',
  },

  // Item
  itemBox: {
    width: '80%',
    height: Platform.OS === 'ios' ? '140%' : '140%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingBottom: '10%',
    overflow: 'hidden',
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '3%',
    marginBottom: '4%',
  },
  itemImagenullViewInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    alignSelf: 'center',
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
    alignItems: 'flex-end',
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

  // MainVideo
  mainFlatlistView: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'scroll',
    backgroundColor: '#f9f9f9',
  },

  //
  // Main
  //
  // header
  mainHeaderView: {
    width: '90%',
    height: Platform.OS === 'ios' ? '100%' : '80%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? '8%' : '9%',
    paddingLeft: '5%',
    paddingRight: '13%',
  },
  mainHeaderViewInner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressCircleView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '-50%' : '-100%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  progressCircle: {
    position: 'absolute',
    width: Platform.OS === 'ios' ? 113 : 110,
    height: Platform.OS === 'ios' ? 113 : 110,
    backgroundColor: '#FFF',
    borderRadius: 70,
  },
  progressCircleInner: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0080ff',
    paddingBottom: 5,
    marginTop: 10,
  },
  speechBubbleView: {
    width: '100%',
    height: Platform.OS === 'ios' ? '7%' : '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubble: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '-20%' : '-42%',
    width: '50%',
    backgroundColor: '#2d91ff',
    padding: '4%',
    borderRadius: 10,
  },
  speechBubbleTriangle: {
    position: 'absolute',
    top: '-13%',
    left: Platform.OS === 'ios' ? '39%' : '38%',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 55,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2d91ff',
  },
  topLogoView: {
    backgroundColor: '#4696ff',
    width: '100%',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // paddingLeft: '5%',
    // paddingRight: '5%',
    paddingTop:
      Platform.OS === 'android'
        ? '5%'
        : Dimensions.get('window').height < 750
        ? '8%'
        : '13%',
    paddingBottom: Platform.OS === 'ios' ? '3%' : '2%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  mainHeader: {
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'ios' ? '11%' : '13%',
    zIndex: -1,
  },
  mainLabel: {
    width: '100%',
    height: '100%',
    fontSize: Platform.OS === 'ios' ? 21 : 16,
    color: '#000',
    paddingTop: Platform.OS === 'ios' ? 15 : 5,
  },
  mainTab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#f9f9f9',
    // borderTopWidth: 1,
    // borderTopColor: '#dedede',
  },
  mainIndicator: {
    backgroundColor: '#000',
    width: '4.5%',
    height: 3,
    position: 'absolute',
    top: '80%',
    left: '10.5%',
  },

  // MainDetail
  mainDetailContainerInner: {
    paddingHorizontal: '5%',
  },
  mainDetailSurveyCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainDetailSurveyCategoryInner: {
    flexDirection: 'row',
  },
  mainDetailSurveyTitle: {
    textAlign: 'left',
    marginTop: Platform.OS === 'ios' ? '2%' : '2%',
    marginBottom: Platform.OS === 'ios' ? '6%' : '4%',
  },
  mainDetailTncAudienceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? '3%' : '3%',
  },
  mainDetailTnc: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mainDetailGrayLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    marginBottom: Platform.OS === 'ios' ? '7%' : '6%',
  },
  mainDetailEndsIn: {
    textAlign: 'left',
  },
  mainDetailProgressView: {
    position: 'relative',
    width: '100%',
    height: 3,
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '2%',
  },
  mainDetailProgressBackBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#d7d7d7',
  },
  mainDetailProgressFrontBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#0080ff',
  },
  mainDetailParticipant: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  mainDetailImg: {
    width: '100%',
    height: Platform.OS === 'ios' ? 260 : 240,
    resizeMode: 'cover',
  },
  mainDetailBottomView: {
    paddingHorizontal: '5%',
  },
  mainDetailSurveyInstruction: {
    textAlign: 'left',
    lineHeight: 28,
    marginTop: Platform.OS === 'ios' ? '3%' : '3%',
    marginBottom: Platform.OS === 'ios' ? '3%' : '3%',
  },
  mainDetailNextButton: {
    marginBottom: Platform.OS === 'ios' ? 0 : '5%',
  },
});
