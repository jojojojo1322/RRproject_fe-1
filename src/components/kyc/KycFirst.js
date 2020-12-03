import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';

export default class KycFirst extends Component {
  render() {
    return (
      <View style={{marginBottom: 150}}>
        <Text style={styles.choiceText}>성별 선택</Text>
        <View style={[styles.genderAll, {marginBottom: 50}]}>
          <TouchableHighlight
            style={
              this.props.gender == 'mail'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleGender('mail');
            }}>
            <Text
              style={
                this.props.gender == 'mail'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              남성
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.props.gender == 'femail'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleGender('femail');
            }}>
            <Text
              style={
                this.props.gender == 'femail'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              여성
            </Text>
          </TouchableHighlight>
        </View>
        <Text style={styles.choiceText}>결혼 여부 선택</Text>
        <View style={styles.genderAll}>
          <TouchableHighlight
            style={
              this.props.maritalStatus == 'single'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleMarital('single');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'single'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              미혼
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.props.maritalStatus == 'marriage'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleMarital('marriage');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'marriage'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              결혼
            </Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.genderAll, {marginTop: 10, marginBottom: 10}]}>
          <TouchableHighlight
            style={
              this.props.maritalStatus == 'liveTogether'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleMarital('liveTogether');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'liveTogether'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              동거
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.props.maritalStatus == 'divorce'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleMarital('divorce');
            }}>
            <Text
              style={
                this.props.maritalStatus == 'divorce'
                  ? styles.clickAreaTextChoice
                  : styles.clickAreaText
              }>
              이혼
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  genderAll: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  choiceText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  clickArea: {
    backgroundColor: '#eeeeee',
    height: 50,
    width: '48%',
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  clickAreaText: {
    fontSize: 15,
    lineHeight: 22,
  },
  clickAreaChoice: {
    backgroundColor: '#4696ff',
    height: 50,
    width: '48%',
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  clickAreaTextChoice: {
    fontSize: 15,
    lineHeight: 22,
    color: '#ffffff',
  },
});
