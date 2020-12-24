import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';

const dealDetail = {
  block: '1035613',
  total: '2',
  status: 'Receive',
  object: '회원가입',
  sender: '0x6565232c6565ed6565659desds6565c58s6565c58',
  recipient: '0x6565232c6565ed6565659desds6565c58s6565c58',
  memo: 'Test',
  DATE: '2020-10-30 20:16:21',
  TXID: '0x6565232c6565ed6565659desds6565c58c7',
};
export default class WalletSend extends Component {
  render() {
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={[ResetStyle.containerInner]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: Platform.OS === 'ios' ? '2%' : '5%',
              paddingBottom: Platform.OS === 'ios' ? '6%' : '2%',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                style={{marginTop: '2%'}}
                source={require('../../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
              <Text style={[ResetStyle.fontMediumK, {fontWeight: '500'}]}>
                보내기
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View>
              <Text>Total Balance</Text>
              <Text>1,000,000 TNC</Text>
            </View>

            <View>
              <Text>주소</Text>
              <View>
                <TextInput placeholder={`보낼 주소 입력`} />
                <TouchableOpacity>
                  <Image
                    source={require('../../../imgs/drawable-hdpi/icon_x.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../../imgs/drawable-hdpi/tnc_send_qr_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
