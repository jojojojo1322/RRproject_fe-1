import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, TouchableHighlight, SafeAreaView, Image} from 'react-native';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';

class EmailAuthentication extends Component {
  state = {
    passWord: '',
    modalVisible: false,
    phoneNum: ''
  };

  handlePassword = (text) => {
    this.setState({
      passWord: text,
    });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  // only number
  handleInputChange = (phoneNum) => {
    if (/^\d+$/.test(phoneNum) || phoneNum === '') {
      this.setState({
        phoneNum
      });
    }
  }
  
  render() {
    CheckedArrObject = new SelectedCheckboxes();
    return (
      <SafeAreaView
        style={styles.container}>
          <View style={styles.containerInner}>

          
            {/* 이메일 */}
            <View style={{marginTop: 40}}>

              <View>
                <Text style={styles.subText}>인증번호</Text>
              </View>

              <TouchableHighlight>
                <View style={styles.InputImageAll}>
                  <TextInput
                    placeholder="6자리 인증번호 입력"
                    // keyboardType={'numeric'}
                    onChangeText={this.handleBirth}
                    // value={this.props.birth}
                    style={[styles.textInputStyle]}></TextInput>
                  <Image
                    style={{width: 19, height: 19}}
                    source={require('../../imgs/drawable-xhdpi/icon_x_gray.png')}
                  />
                </View>
              </TouchableHighlight>

              {/* alert */}
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>

                <Image
                style={{width: 19, height: 19}}
                source={require('../../imgs/drawable-xhdpi/icon_x_red.png')}
                />
                <Text style={{color: '#F00', fontSize: 14, marginLeft: 10}}>인증번호가 올바르지 않습니다.</Text>
              
              </View>

            </View>

            <TouchableHighlight
            style={[styles.button, {backgroundColor:'#e6e6e6'}]}
            onPress={() => {
              // this.props.navigation.navigate('AgreementTermsConditions');
              // this.props.navigation.setOptions({ title: '약관동의' });
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
    InputImageAll: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      alignItems: 'center',
      // alignContent: 'stretch',
      // borderBottomWidth: 1,
      // borderBottomColor: '#ddd',
    },
    InputImage: {
      // position: 'absolute',
      // alignItems: 'center',2
    },
    textInputStyle: {
      // position: 'relative',
      // width: '100%',
      fontSize: 15,
      // borderBottomWidth: 1,
      // borderBottomColor: '#dddddd',
      paddingTop: 15,
      paddingBottom: 15,
    },
});

export default EmailAuthentication;