'use strict';
import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default function MainTest({navigation}) {
  const [QRAdress, setQRAdress] = useState();
  const onSuccess = (e) => {
    console.log('console', e.data);
    setQRAdress(e.data);
    navigation.navigate('WalletSend', {
      qrcode: e.data,
    });
  };
  console.log('QRCODEEEEEEE', QRAdress);
  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[
          ResetStyle.containerInner,
          {
            marginHorizontal: 0,
            marginBottom: 0,
          },
        ]}>
        {/* Top */}

        <View style={[ResetStyle.topBackButton, {marginLeft: '5%'}]}>
          {/* topBackButton */}
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
            />
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              돌아가기
            </Text>
          </TouchableOpacity>
        </View>

        {/* QR Code Scanner */}
        <QRCodeScanner
          onRead={onSuccess}
          vibrate={false}
          // disableVibrationByUser={0}
          containerStyle={{
            width: '100%',
            height: '100%',
          }}
          cameraStyle={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

// export default class WalletSendQR extends Component {
//   onSuccess = (e) => {
//     console.log(e.data);
//     this.props.navigation.navigate('WalletSend');
//   };
//   render() {
//     return (
//       <SafeAreaView style={ResetStyle.container}>
//         <View
//           style={[
//             ResetStyle.containerInner,
//             {
//               marginHorizontal: 0,
//               marginBottom: 0,
//             },
//           ]}>
//           {/* Top */}
//           {/* topBackButton */}
//           <View style={[ResetStyle.topBackButton, {marginLeft: '5%'}]}>
//             <TouchableOpacity
//               style={{flexDirection: 'row', alignItems: 'center'}}
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <Image
//                 source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
//               />
//               <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
//                 돌아가기
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <QRCodeScanner
//             onRead={this.onSuccess}
//             // disableVibrationByUser={0}
//             containerStyle={{width: '100%', height: '100%'}}
//             cameraStyle={{width: '100%'}}
//           />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
