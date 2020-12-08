import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RoundCheckbox, SelectedCheckboxes} from '../Roundcheck';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProgressCircle} from 'react-native-svg-charts';
import ResetStyle from '../../style/ResetStyle.js';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const DATA = [
  {
    id: '1',
    img: require('../../imgs/drawable-xxxhdpi/survey_img_1.png'),
    status: 'ongoing',
    division: 'E-commerce',
    dateStart: '2020.12.03',
    dateEnd: '2020.12.31',
    title: '안드로이드 S20 만족도 조사',
    participant: 'S20 사용자',
    participantCount: '20000',
    participantCompleteCount: '12375',
    tnc: '10',
    purpose: '다음 제품 출시를 위하여',
    host: 'Samsung',
  },
  {
    id: '2',
    img: null,
    status: 'ongoing',
    division: 'Any Category1',
    dateStart: '2020.12.03',
    dateEnd: '2020.12.31',
    title: '부동산,\n이게 어떻게 된 일일까요?',
    participant: 'S20 사용자',
    participantCount: '20000',
    participantCompleteCount: '12375',
    tnc: '10',
    purpose: '다음 제품 출시를 위하여',
    host: 'Samsung',
  },
  {
    id: '3',
    img: null,
    status: 'ongoing',
    division: 'Any Category2',
    dateStart: '2020.12.03',
    dateEnd: '2020.12.31',
    title: '결혼, 출산, 그리고 육아',
    participant: 'S20 사용자',
    participantCount: '20000',
    participantCompleteCount: '12375',
    tnc: '10',
    purpose: '다음 제품 출시를 위하여',
    host: 'Samsung',
  },
  {
    id: '4',
    img: require('../../imgs/drawable-xxxhdpi/survey_img_2.png'),
    status: 'ongoing',
    division: 'Any Category1',
    dateStart: '2020.12.03',
    dateEnd: '2020.12.31',
    title: '2020년 크리스마스,\n어떻게 보내실 건가요?',
    participant: 'S20 사용자',
    participantCount: '20000',
    participantCompleteCount: '12375',
    tnc: '10',
    purpose: '다음 제품 출시를 위하여',
    host: 'Samsung',
  },
];

data = DATA.filter((item) => item.status == 'ongoing').map(
  ({
    img,
    division,
    dateStart,
    dateEnd,
    title,
    participant,
    participantCount,
    participantCompleteCount,
    tnc,
    purpose,
    host,
  }) => ({
    img,
    division,
    dateStart,
    dateEnd,
    title,
    participant,
    participantCount,
    participantCompleteCount,
    tnc,
    purpose,
    host,
  }),
);
console.log(data);

const Item = ({
  addImg,
  status,
  division,
  dateStart,
  dateEnd,
  title,
  img,
  participant,
  participantCount,
  participantCompleteCount,
  tnc,
  purpose,
  host,
}) => (
  <View
    style={{
      width: '90%',
      alignSelf: 'center',
      marginTop: 15,
      borderRadius: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e8e8e8',
      paddingTop: '5%',
      paddingBottom: '5%',
    }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
      }}>
      <View style={{position: 'relative'}}>
        <View
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: 0,
            width: '100%',
            height: 10,
            backgroundColor: '#ffedc2',
            // backgroundColor: '#b7fcff',
            // backgroundColor: '#ffdfdf',
          }}></View>
        <Text style={[ResetStyle.fontRegularE, ResetStyle.fontBlack]}>
          {division}
        </Text>
      </View>

      <TouchableOpacity>
        <Image source={require('../../imgs/drawable-xxxhdpi/share_icon.png')} />
      </TouchableOpacity>
    </View>

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '3%',
        marginBottom: '4%',
      }}>
      <Text
        style={[
          ResetStyle.fontMediumK,
          ResetStyle.fontBlack,
          {textAlign: 'left'},
        ]}>
        {title}
      </Text>
    </View>

    {img === null ? (
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderTopWidth: 2,
          borderTopColor: '#dedede',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '4%',
          }}>
          <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>+ {tnc}</Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontB,
              {marginLeft: 5},
            ]}>
            TNC
          </Text>
        </View>
      </View>
    ) : (
      <View style={{width: '100%', height: 200, overflow: 'hidden'}}>
        <View style={{position: 'relative', width: '100%', height: '100%'}}>
          <Image
            source={img}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Image
            source={require('../../imgs/survey_img_gradient.png')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: '7%',
          }}>
          <Text style={[ResetStyle.fontBoldK, ResetStyle.fontWhite]}>
            + {tnc}
          </Text>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontWhite,
              {marginLeft: 5},
            ]}>
            TNC
          </Text>
        </View>
      </View>
    )}

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '4%',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
          참여자
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {marginLeft: 10},
          ]}>
          {participant}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>
          참여자수
        </Text>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontDG,
            {marginLeft: 10},
          ]}>
          {participantCount}명
        </Text>
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 2,
      }}>
      <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>목적</Text>
      <Text
        style={[
          ResetStyle.fontRegularK,
          ResetStyle.fontDG,
          {marginLeft: 10, textAlign: 'left', width: '90%'},
        ]}>
        {purpose}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 2,
      }}>
      <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>기한</Text>
      <Text
        style={[ResetStyle.fontRegularK, ResetStyle.fontDG, {marginLeft: 10}]}>
        {dateStart} ~ {dateEnd}
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: 2,
      }}>
      <Text style={[ResetStyle.fontRegularK, ResetStyle.fontBlack]}>주최</Text>
      <Text
        style={[ResetStyle.fontRegularK, ResetStyle.fontDG, {marginLeft: 10}]}>
        {host}
      </Text>
    </View>

    <View
      style={{
        position: 'relative',
        width: '90%',
        height: 3,
        alignSelf: 'center',
        marginTop: '5%',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#d7d7d7',
        }}></View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '65%',
          height: '100%',
          backgroundColor: '#0080ff',
        }}></View>
    </View>

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        marginTop: '2%',
      }}>
      <Text
        style={[ResetStyle.fontLightK, ResetStyle.fontB, {fontWeight: '500'}]}>
        {participantCompleteCount} / {participantCount}
      </Text>
    </View>
  </View>
);

function Ongoing() {
  const renderItem = ({item}) => (
    <Item
      division={item.division}
      img={item.img}
      title={item.title}
      dateStart={item.dateStart}
      dateEnd={item.dateEnd}
      participant={item.participant}
      participantCount={item.participantCount}
      participantCompleteCount={item.participantCompleteCount}
      tnc={item.tnc}
      purpose={item.purpose}
      host={item.host}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        overflow: 'scroll',
        backgroundColor: '#f9f9f9',
      }}>
      <ScrollView style={{width: '100%'}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Completed() {
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
      <View
        style={{
          backgroundColor: '#f9f9f9',
          marginTop: StatusBar.currentHeight || 0,
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#f9f9f9',
            paddingTop: '15%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '5%',
            paddingBottom: '10%',
          }}>
          <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../imgs/drawable-xxxhdpi/main_r_logo.png')}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontB,
                  {marginLeft: 10},
                ]}>
                Real Research
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../imgs/drawable-xxxhdpi/menu_icon.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '90%',
            height: '10%',
            backgroundColor: '#FFF',
            alignSelf: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#e8e8e8',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6%',
            paddingLeft: '5%',
            paddingRight: '13%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
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
            <Text style={[ResetStyle.fontRegularK, ResetStyle.fontG]}>HIT</Text>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontB,
                {fontWeight: '600'},
              ]}>
              10
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              top: '-45%',
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            {/* progress 최대 수치 1 */}
            <ProgressCircle
              style={{
                position: 'absolute',
                width: 120,
                height: 120,
                backgroundColor: '#FFF',
                borderRadius: 60,
              }}
              progress={0.7}
              progressColor={'#0080ff'}
              strokeWidth={4}
            />

            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#0080ff',
                paddingBottom: 5,
                marginTop: 10,
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

            <Text style={[ResetStyle.fontBoldK, ResetStyle.fontB]}>2</Text>
          </View>
        </View>

        <View
          style={{borderBottomWidth: 1, borderBottomColor: '#dedede'}}></View>

        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {fontSize: 16, fontWeight: '500', letterSpacing: -0.5},
            activeTintColor: '#222222',
            inactiveTintColor: '#a9a9a9',
            tabStyle: {
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 15,
              paddingBottom: 20,
            },
            indicatorStyle: {
              position: 'relative',
              top: '75%',
              left: '4%',
              borderColor: '#222222',
              borderWidth: 1.5,
              width: '5%',
            },
            style: {
              backgroundColor: '#f9f9f9',
            },
          }}>
          <Tab.Screen name="ONGOING" component={Ongoing} />
          <Tab.Screen name="COMPLETED" component={Completed} />
          <Tab.Screen name="UPCOMING" component={Terms2} />
          <Tab.Screen name="EXPIRED" component={Conditions2} />
        </Tab.Navigator>
      </View>
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
