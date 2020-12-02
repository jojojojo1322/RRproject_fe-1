import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, TouchableHighlight, SafeAreaView, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class CompleteAuth extends Component {
  state = {
  };
  
  render() {
    return (
      <SafeAreaView
        style={styles.container}>
          <View style={styles.containerInner}>

            <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 150}}>
              <Image style={{width: 92, height: 92}} source={require('../../imgs/drawable-xhdpi/icon_l_check.png')}/>
              <Text style={{fontSize: 22, fontWeight: '500', color: '#4696ff', marginTop: 17}}>회원가입 완료</Text>
              <Text style={{fontSize: 14, fontWeight: '300', color: '#a9a9a9', marginTop: 2}}>Real Research 회원가입이 완료되었습니다</Text>
            </View>

            <View style={{borderBottomWidth: 0.5, borderBottomColor: '#787878'}}/>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{fontSize: 14, fontWeight: '300', color: '#787878', marginTop: 2, textAlign: 'center', lineHeight: 20}}>다음 단계는 KYC인증 단계입니다{'\n'}
                KYC 인증을 등록하시면 설문조사 참여 가능합니다</Text>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#4696ff', marginTop: 25}}>지금 시작해보세요!</Text>
            </View>

            <TouchableWithoutFeedback
            style={[styles.button, {backgroundColor:'#4696ff', marginBottom: 150}]}
            onPress={() => {
              // this.props.navigation.navigate('AgreementTermsConditions');
              // this.props.navigation.setOptions({ title: '약관동의' });
            }}
            >
              <Text style={styles.buttonTexts}>시작하기</Text>
            </TouchableWithoutFeedback>

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

export default CompleteAuth;