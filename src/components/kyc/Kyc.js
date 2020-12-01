import React, {useState, Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import KycFirst from './KycFirst';
import KycSecond from './KycSecond';
import {Keyboard} from './KycSecond';

export default class Kyc extends Component {
  state = {
    gender: '',
    maritalStatus: '',
    step: this.props.route.params?.step,
    birth: '',
  };
  handleBirth = (value) => {
    console.log(value);
    this.setState({
      birth: value,
    });
    console.log('aaaaaaa');
  };

  handleGender = (value) => {
    console.log(value);
    this.setState({
      gender: value,
    });
  };
  handleMarital = (value) => {
    console.log(value);
    this.setState({
      maritalStatus: value,
    });
  };
  componentDidUpdate(preProps, preState) {
    // console.log('upda', this.props.route.params);
    // console.log('prePropsupda', preProps.route.params);
    // if (preProps.route.params != this.props.route.params) {
    //   console.log('updateeeeeee');
    // }
  }
  render() {
    // const {navigation} = this.props;
    // const itemId = navigation.getParam('step');
    console.log('na>>>>', this.props.route.params?.step);
    console.log('na>>>>', this.state.step);
    console.log('gender>>', this.state.gender);
    console.log('maritalStatus>>', this.state.maritalStatus);
    // console.log(itemId);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.topAll}>
            <Text style={styles.topText}>KYC 정보입력</Text>
          </View>

          <View style={styles.ktitAll}>
            <Image
              style={{marginRight: 4}}
              source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
            />
            <View style={styles.ktilMiddle}></View>
            {this.state.step == undefined ? (
              <Image
                style={{marginRight: 4, marginLeft: 4}}
                source={require('../../imgs/drawable-mdpi/icon_ktit_off.png')}
              />
            ) : (
              <Image
                style={{marginRight: 4, marginLeft: 4}}
                source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
              />
            )}
            <View style={styles.ktilMiddle}></View>
            {this.state.step == 2 || this.state.step == undefined ? (
              <Image
                style={{marginRight: 4, marginLeft: 4}}
                source={require('../../imgs/drawable-mdpi/icon_ktit_off.png')}
              />
            ) : (
              <Image
                style={{marginRight: 4, marginLeft: 4}}
                source={require('../../imgs/drawable-mdpi/icon_ktit_on.png')}
              />
            )}
          </View>

          {this.state.step == undefined && (
            <KycFirst
              handleMarital={this.handleMarital}
              handleGender={this.handleGender}
              maritalStatus={this.state.maritalStatus}
              gender={this.state.gender}
            />
          )}
          {this.state.step == 2 && (
            <KycSecond
              birth={this.state.birth}
              handleBirth={this.handleBirth}
            />
          )}
          <View style={styles.bottomButtonAll}>
            <TouchableHighlight
              style={
                this.state.gender != '' && this.state.maritalStatus != ''
                  ? styles.buttonChoice
                  : styles.button
              }
              onPress={() =>
                this.props.navigation.push('Kyc', {
                  step: this.state.step == undefined ? 2 : 3,
                })
              }>
              <Text style={styles.buttonTexts}>다음</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    width: '100%',
    height: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  container2: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    // alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  ktitAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
    marginBottom: '-60%',
  },
  ktilMiddle: {
    width: 20,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#dddddd',
  },
  topAll: {
    marginTop: 16,
    marginBottom: '-70%',
  },
  topText: {
    fontSize: 23,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  bottomButtonAll: {
    // position: 'absolute',
    // bottom: 20,
    // alignContent: '',
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#c6c9cf',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonChoice: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#164895',
    padding: 15,
  },
});
