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
  StatusBar,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProgressCircle} from 'react-native-svg-charts';
import ResetStyle from '../../style/ResetStyle.js';

const Tab = createMaterialTopTabNavigator();

class ProgressCircleR extends React.PureComponent {
  render() {
    return (
      <ProgressCircle
        style={{height: 130}}
        progress={0.3}
        progressColor={'#0080ff'}
      />
    );
  }
}

function Terms() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#f9f9f9',
      }}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          1
        </Text>
        <ProgressCircleR />
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
        backgroundColor: '#f9f9f9',
      }}>
      <ScrollView style={{width: '100%', height: '100%'}}>
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

function Terms2() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#f9f9f9',
      }}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          3
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Conditions2() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#f9f9f9',
      }}>
      <ScrollView style={{width: '100%', height: '200%'}}>
        <Text
          style={[
            ResetStyle.fontLightK,
            ResetStyle.fontDG,
            {textAlign: 'left', margin: '5%'},
          ]}>
          4
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

class TermsConditions extends Component {
  state = {};

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#f9f9f9',
          marginTop: StatusBar.currentHeight || 0,
        }}>
        <View
          style={{
            backgroundColor: '#f9f9f9',
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
        <View
          style={{
            position: 'relative',
            width: '90%',
            height: '26%',
            backgroundColor: '#FFF',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#e8e8e8',
            // flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '6%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '8%',
              paddingRight: '13%',
            }}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                MY TNC
              </Text>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '600'},
                ]}>
                10,000
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>
                HIT
              </Text>
              <Text
                style={[
                  ResetStyle.fontMediumK,
                  ResetStyle.fontB,
                  {fontWeight: '600'},
                ]}>
                10
              </Text>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              top: '-50%',
              alignSelf: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              width: 120,
              height: 120,
              borderRadius: 100,
              borderWidth: 2.5,
              borderColor: '#0080ff',
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#0080ff',
                paddingBottom: 5,
                marginTop: 30,
              }}>
              <Text
                style={[
                  ResetStyle.fontLightK,
                  ResetStyle.fontB,
                  {fontWeight: '500', marginRight: 5},
                ]}>
                LEVEL
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../imgs/drawable-xxxhdpi/main_questionmark_icon.png')}
                />
              </TouchableOpacity>
            </View>

            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>23</Text>
          </View>
        </View>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {fontSize: 16, fontWeight: '500', letterSpacing: -0.5},
            activeTintColor: '#222222',
            inactiveTintColor: '#a9a9a9',
            indicatorStyle: {borderColor: '#222222', borderWidth: 1.5},
            style: {
              backgroundColor: '#f9f9f9',
            },
          }}>
          <Tab.Screen name="ONGOING" component={Terms} />
          <Tab.Screen name="COMPLETED" component={Conditions} />
          <Tab.Screen name="UPCOMING" component={Terms2} />
          <Tab.Screen name="EXPIRED" component={Conditions2} />
        </Tab.Navigator>
      </SafeAreaView>
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
