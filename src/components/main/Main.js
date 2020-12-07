import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ResetStyle from '../../style/ResetStyle.js';

const Tab = createMaterialTopTabNavigator();

function Terms() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#FFF',
      }}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Conditions() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#FFF',
      }}>
      <ScrollView style={{width: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          2
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

class TermsConditions extends Component {
  state = {};

  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: '#fff',
            paddingTop: '15%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '5%',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/main_r_logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/menu_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {fontSize: 20, fontWeight: '400'},
            activeTintColor: '#4696ff',
            inactiveTintColor: '#787878',
            indicatorStyle: {borderColor: '#4696ff', borderWidth: 1.5},
          }}>
          <Tab.Screen name="이용약관" component={Terms} />
          <Tab.Screen name="개인정보처리방침" component={Conditions} />
        </Tab.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 50,
    backgroundColor: '#0b95c9',
    padding: 15,
  },
  buttonTexts: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default TermsConditions;
