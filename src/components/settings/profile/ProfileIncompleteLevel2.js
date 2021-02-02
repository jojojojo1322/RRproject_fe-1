import React, {Component, useState} from 'react';
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
  FlatList,
} from 'react-native';

import PropTypes from 'prop-types';
import ResetStyle from '../../../style/ResetStyle.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectedCheckboxes, RoundCheckbox} from '../../factory/Roundcheck';
import ResearchStyle from '../../../style/ResearchStyle.js';
import ProfileStyle from '../../../style/ProfileStyle.js';

const ProfileIncompleteLevel2 = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const Item = ({title}) => {
    return (
      <TouchableOpacity>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[ResetStyle.container]}>
      <View
        style={[ResetStyle.containerInner, {marginLeft: 0, marginRight: 0}]}>
        {/* Top */}
        <View style={{flexDirection: 'column'}}>
          {/* Top Title */}
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontBlack,
              ResearchStyle.researchTitle,
            ]}>
            Level 2 KYC
          </Text>

          {/* 상단 체크박스 */}
          <View style={[ProfileStyle.incompleteTopView]}></View>
        </View>

        {/* Research Form */}
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
        />

        {/* Bottom Button */}
        <View style={[ResearchStyle.researchBottomButton]}>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {backgroundColor: '#e6e6e6', width: '49%'},
            ]}
            // style={
            //   this.state.nowIndex == 0
            //     ? [
            //         ResetStyle.button,
            //         {width: '49%', backgroundColor: '#e6e6e6'},
            //       ]
            //     : [ResetStyle.button, {width: '49%'}]
            // }
            activeOpacity={0.75}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {/* {this.state.nowIndex == 0 ? '취소' : '이전'} */}
              취소
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ResetStyle.button,
              {
                width: '49%',
                backgroundColor: '#4696ff',
              },
            ]}
            activeOpacity={0.75}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {/* {this.state.nowIndex == this.state.questionLength - 1
                ? '제출'
                : '다음'} */}
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileIncompleteLevel2;
