import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, TouchableHighlight, SafeAreaView, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';

class TermsConditions extends Component {
  state = {
  };
  
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
          <View style={styles.containerInner}>

            <View>
              <View style={[styles.viewBox, {justifyContent: 'flex-start', paddingTop: 20, paddingBottom: 10}]}>
                <RoundCheckbox
                  size={25}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  // borderColor=""
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                <Text style={[styles.textStyle, {marginLeft: 10}]}>서비스 이용약관 관련 전체동의</Text>
              </View>
              <View style={[styles.viewBox, {padding: 17, backgroundColor: '#eeeeee', marginTop: 10, borderRadius: 5}]}>
                <View style={styles.viewBox}>
                <RoundCheckbox
                  size={20}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                  <TouchableWithoutFeedback>
                    <Text style={[styles.textStyle, {marginLeft: 10}]}>이용약관 동의(필수)</Text>
                  </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback>
                  <Image source={require('../../imgs/drawable-xhdpi/icon_sarr.png')}></Image>
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.viewBox, {padding: 17, backgroundColor: '#eeeeee', marginTop: 10, borderRadius: 5}]}>
                <View style={styles.viewBox}>
                <RoundCheckbox
                  size={20}
                  // keyValue={Number(item.id)}
                  checked={false}
                  color="#164895"
                  labelColor="#000000"
                  checkedObjArr={CheckedArrObject}
                />
                  <TouchableWithoutFeedback>
                    <Text style={[styles.textStyle, {marginLeft: 10}]}>개인정보처리방침 동의(필수)</Text>
                  </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback>
                  <Image source={require('../../imgs/drawable-xhdpi/icon_sarr.png')}></Image>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <TouchableHighlight
            style={[styles.button, {backgroundColor:'#c6c9cf'}]}
            onPress={() => {
              this.props.navigation.navigate('AgreementTermsConditions');
            }}
            >
              <Text style={styles.buttonTexts}>다음</Text>
            </TouchableHighlight>

          </View>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff'
    },
    containerInner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: '5%',
      marginRight: '5%',
      backgroundColor: '#fff'
    },
    button: {
      width: '100%',
      borderRadius: 50,
      backgroundColor: '#0b95c9',
      padding: 15
    },
    buttonTexts: {
      color: '#FFF',
      fontWeight: '600',
      textAlign: 'center',
      fontSize: 16
    },
});

export default TermsConditions;