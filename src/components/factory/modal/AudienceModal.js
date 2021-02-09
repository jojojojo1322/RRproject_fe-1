import React, {Component} from 'react';
import {View, Text, Modal, Image, TouchableWithoutFeedback} from 'react-native';
import ResetStyle from '../../../style/ResetStyle';
import ModalStyle from '../../../style/ModalStyle';
import {useTranslation} from 'react-i18next';

const AudienceModal = ({
  modalVisible,
  setModalVisible,
  level,
  age,
  gender,
  maritalStatus,
  nationality,
  country,
  countryCity,
  language,
}) => {
  const {t, i18n} = useTranslation();
  return modalVisible ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      // }}
    >
      <View style={{flex: 1, position: 'relative'}}>
        {/* modal background */}
        <TouchableWithoutFeedback
          // style={styles.centeredView}
          activeOpacity={0.55}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={[ModalStyle.modalCenteredView]}></View>
        </TouchableWithoutFeedback>

        {/* modal view */}
        <View style={ModalStyle.audienceAllView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('audienceModalTitle')}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log('adadadadadadadadadad');
                setModalVisible(!modalVisible);
              }}>
              {/* <Text style={styles.KycCloseButtonText2}>x</Text> */}
              <Image
                source={require('../../../imgs/drawable-hdpi/icon_close.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[ModalStyle.audienceTop]}>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              {t('audienceModal1')}
            </Text>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontB]}>
              {level}
            </Text>
          </View>
          {/* 나이 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal2')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {age}
            </Text>
          </View>
          {/* 성별 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal3')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {gender}
            </Text>
          </View>
          {/* 결혼유무 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal4')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {maritalStatus}
            </Text>
          </View>
          {/* 국적 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal5')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {nationality}
            </Text>
          </View>
          {/* 거주국가 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal6')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {country}
            </Text>
          </View>
          {/* 거주도시 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal7')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {countryCity}
            </Text>
          </View>
          {/* 언어 */}
          <View style={[ModalStyle.audienceListStyle]}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontB,
                {width: '40%', textAlign: 'left', paddingLeft: '5%'},
              ]}>
              {t('audienceModal8')}
            </Text>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontBlack,
                {width: '60%', textAlign: 'left'},
              ]}>
              {language}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

export default AudienceModal;

// class AudienceModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalVisible: false,
//     };
//     // this.setModalVisible = this.setModalVisible.bind(this);
//   }
//   //   state = {
//   //     modalVisible: this.props.modalVisible,
//   //   };
//   componentDidUpdate(preProps, preState) {
//     if (preProps.modalVisible != this.props.modalVisible) {
//       this.setState({modalVisible: this.props.modalVisible});
//     }
//   }
//   setModalVisible = (visible) => {
//     this.setState({modalVisible: visible});
//     console.log('MODAL>>> ', visible);
//   };
//   render() {
//     // const {t} = this.props;
//     const {modalVisible} = this.state;
//     console.log(modalVisible);
//     return (
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         // onRequestClose={() => {
//         //   Alert.alert('Modal has been closed.');
//         // }}
//       >
//         <View style={{flex: 1, position: 'relative'}}>
//           {/* modal background */}
//           <TouchableWithoutFeedback
//             // style={styles.centeredView}
//             activeOpacity={0.55}
//             onPress={() => {
//               this.setState({modalVisible: !modalVisible});
//               this.props.setModalVisible(!modalVisible);
//             }}>
//             <View style={[ModalStyle.modalCenteredView]}></View>
//           </TouchableWithoutFeedback>

//           {/* modal view */}
//           <View style={ModalStyle.audienceAllView}>
//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
//                 Audience
//               </Text>
//               <TouchableWithoutFeedback
//                 onPress={() => {
//                   console.log('adadadadadadadadadad');
//                   this.setState({modalVisible: !modalVisible});
//                   this.props.setModalVisible(!modalVisible);
//                 }}>
//                 {/* <Text style={styles.KycCloseButtonText2}>x</Text> */}
//                 <Image
//                   source={require('../../../imgs/drawable-hdpi/icon_close.png')}
//                 />
//               </TouchableWithoutFeedback>
//             </View>
//             <View style={[ModalStyle.audienceTop]}>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
//                 참여가능 LEVEL :{' '}
//               </Text>
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontB]}>
//                 {this.props.level}
//               </Text>
//             </View>
//             {/* 나이 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 나이
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.age}
//               </Text>
//             </View>
//             {/* 성별 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 성별
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.gender}
//               </Text>
//             </View>
//             {/* 결혼유무 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 결혼유무
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.maritalStatus}
//               </Text>
//             </View>
//             {/* 국적 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 국적
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.nationality}
//               </Text>
//             </View>
//             {/* 거주국가 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 거주국가
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.country}
//               </Text>
//             </View>
//             {/* 거주도시 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 거주도시
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.countryCity}
//               </Text>
//             </View>
//             {/* 언어 */}
//             <View style={[ModalStyle.audienceListStyle]}>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontB,
//                   {width: '40%', textAlign: 'left', paddingLeft: '5%'},
//                 ]}>
//                 언어
//               </Text>
//               <Text
//                 style={[
//                   ResetStyle.fontRegularK,
//                   ResetStyle.fontBlack,
//                   {width: '60%', textAlign: 'left'},
//                 ]}>
//                 {this.props.language}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   }
// }

// export default AudienceModal;
