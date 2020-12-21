import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';

const Tab = createMaterialTopTabNavigator();

function Terms() {
  return (
    <SafeAreaView style={AuthStyle.termsConditionsContainer}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          이용약관 노출 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한
          사항을 규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스
          이용자에게 공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시
          변경할 수 있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.
          {'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다. 이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.{'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.){'\n'}
          이용약관 노출 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한
          사항을 규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스
          이용자에게 공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시
          변경할 수 있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.
          {'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다. 이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.{'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.){'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Conditions() {
  return (
    <SafeAreaView style={AuthStyle.termsConditionsContainer}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          개인정보처리방침이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          개인정보처리방침에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다. 이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.){'\n'}
          개인정보처리방침이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          개인정보처리방침에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다. 이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에
          관한 조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의
          사항을 구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.) 이용약관이란 특정 서비스의 이용조건과 절차 등에 관한 사항을
          규정하고 이를 명시한 문서를 말한다. 이용약관은 서비스 이용자에게
          공시함으로써 효력이 발생하며, 영업상 중요 사유가 있을 시 변경할 수
          있다.
          {'\n'}
          {'\n'}
          이용약관에는 이용계약의 체결, 서비스 이용, 이용자의 의무 등에 관한
          조항을 상세히 명시해야 한다. 또 이용 요금 납부, 계약 해지 등의 사항을
          구체적으로 기재하도록 한다.
          {'\n'}
          {'\n'}그 밖에 면책조항을 기재하여 차후 발생할 수 있는 고객과의 갈등
          상황을 사전에 방지하도록 한다.{'\n'}
          [네이버 지식백과] 이용약관 [利用約款, access terms] (예스폼 서식사전,
          2013.){'\n'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

class TermsConditions extends Component {
  state = {};

  render() {
    console.log('apapapapapapapap', this.props.route.params?.name);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        {/* topBackButton */}
        <View style={{marginLeft: '5%', marginRight: '5%'}}>
          <View style={[ResetStyle.topBackButton, {paddingBottom: '2%'}]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
              />
            </TouchableOpacity>
            <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
              이용약관 및 개인정보처리방침
            </Text>
          </View>
        </View>
        <Tab.Navigator
          initialRouteName={this.props.route.params?.name}
          tabBarOptions={{
            labelStyle: {fontSize: 20, fontWeight: '400'},
            activeTintColor: '#4696ff',
            inactiveTintColor: '#787878',
            indicatorStyle: {borderColor: '#4696ff', borderWidth: 1.5},
          }}>
          <Tab.Screen name="이용약관" component={Terms} />
          <Tab.Screen name="개인정보처리방침" component={Conditions} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }
}

export default TermsConditions;
