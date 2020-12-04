import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';

export default class KycFirst extends Component {
  render() {
    return (
      <View style={{marginBottom: 150}}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {textAlign: 'left', marginBottom: 10},
          ]}>
          성별 선택
        </Text>
        <View style={[styles.genderAll, {marginBottom: 50}]}>
          <TouchableHighlight
            style={
              this.props.gender == 'male'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleGender('male');
            }}>
            <Text
              style={
                this.props.gender == 'mail'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              남성
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.props.gender == 'female'
                ? styles.clickAreaChoice
                : styles.clickArea
            }
            onPress={() => {
              this.props.handleGender('female');
            }}>
            <Text
              style={
                this.props.gender == 'femail'
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
              }>
              여성
            </Text>
          </TouchableHighlight>
        </View>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {textAlign: 'left', marginBottom: 10},
          ]}>
          결혼 여부 선택
        </Text>
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
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
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
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
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
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
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
                  ? [ResetStyle.fontRegularK, ResetStyle.fontWhite]
                  : [ResetStyle.fontRegularK, ResetStyle.fontDG]
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