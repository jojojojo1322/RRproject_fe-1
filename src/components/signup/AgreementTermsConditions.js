import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RoundCheckbox} from '../factory/Roundcheck';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle';

import {withTranslation} from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

class SelectedCheckboxes {
  constructor() {
    selectedCheckboxes = [];
  }

  addItem(option) {
    selectedCheckboxes.push(option);
  }

  fetchArray() {
    return selectedCheckboxes;
  }
}

class AgreementTermsConditions extends Component {
  constructor() {
    super();
    CheckedArrObject = new SelectedCheckboxes();
  }
  state = {
    pickedElements: '',
    allCheck1: false,
    allCheck2: false,
    allCheck3: false,
  };
  renderSelectedElements = () => {
    if (CheckedArrObject.fetchArray().length == 0) {
      Alert.alert('No Item Selected');
    } else {
      this.setState({
        pickedElements: CheckedArrObject.fetchArray()
          .map((res) => res.value)
          .join(),
      });
    }
  };
  // handleStatus = async () => {
  //   await this.setState({
  //     check: !this.state.check,
  //   });
  // };
  handleAll = (value) => {
    this.setState({
      allCheck1: value,
      allCheck2: value,
      allCheck3: value,
    });
  };
  componentDidUpdate(preProps, preState) {
    if (
      preState.allCheck2 != this.state.allCheck2 ||
      preState.allCheck3 != this.state.allCheck3
    ) {
      console.log(this.state.allCheck2);
      if (this.state.allCheck2 == true && this.state.allCheck3 == true) {
        console.log('aa');
        this.setState({
          allCheck1: true,
        });
      } else if (
        (this.state.allCheck2 !== true || this.state.allCheck3 !== true) &&
        this.state.allCheck1 === true
      ) {
        this.setState({
          allCheck1: false,
        });
      }
    }
  }

  handleCheckedbox = (value, status) => {
    console.log('chchchchchch', value);
    if (status === 'PLUS') {
      if (value == 2) {
        this.setState({
          allCheck2: true,
        });
      } else if (value == 3) {
        this.setState({
          allCheck3: true,
        });
      }
    } else if (status === 'MINUS') {
      if (value == 2) {
        this.setState({
          allCheck2: false,
        });
      } else if (value == 3) {
        this.setState({
          allCheck3: false,
        });
      }
    }
  };

  render() {
    const {t} = this.props;
    return (
      <SafeAreaView style={ResetStyle.container}>
        <View style={ResetStyle.containerInner}>
          <View>
            {/* topBackButton */}
            <View>
              <View style={ResetStyle.topBackButton}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../imgs/drawable-xxxhdpi/back_icon.png')}
                  />
                  <Text style={[ResetStyle.fontMediumK, ResetStyle.fontBlack]}>
                    {t('agreementTermsConditionsTitle')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                AuthStyle.agreementViewBox,
                {
                  justifyContent: 'flex-start',
                  paddingTop: 20,
                  paddingBottom: 10,
                },
              ]}>
              <RoundCheckbox
                keyValue={1}
                size={25}
                // keyValue={Number(item.id)}
                keyValue={1}
                checked={this.state.allCheck1}
                color="#164895"
                // borderColor=""
                labelColor="#000000"
                value="1"
                label="all"
                checkedObjArr={CheckedArrObject}
                handleAll={this.handleAll}
                handleCheckedbox={this.handleCheckedbox}
              />
              <Text
                style={[
                  ResetStyle.fontRegularK,
                  ResetStyle.fontDG,
                  {marginLeft: 10},
                ]}>
                {t('agreementTermsConditions1')}
              </Text>
            </View>
            <View
              style={[
                AuthStyle.agreementViewBox,
                {
                  padding: 17,
                  backgroundColor: '#f9f9f9',
                  marginTop: 10,
                  borderRadius: 5,
                },
              ]}>
              <View style={AuthStyle.agreementViewBox}>
                <RoundCheckbox
                  size={20}
                  keyValue={2}
                  // keyValue={Number(item.id)}
                  checked={this.state.allCheck2}
                  color="#164895"
                  labelColor="#000000"
                  value="2"
                  label="2"
                  checkedObjArr={CheckedArrObject}
                  handleCheckedbox={this.handleCheckedbox}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('TermsConditions', {
                      name: t('termsConditions1'),
                    });
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 10},
                    ]}>
                    {t('agreementTermsConditions2')}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('TermsConditions', {
                    name: t('termsConditions1'),
                  });
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={[
                AuthStyle.agreementViewBox,
                {
                  padding: 17,
                  backgroundColor: '#f9f9f9',
                  marginTop: 10,
                  borderRadius: 5,
                },
              ]}>
              <View style={[AuthStyle.agreementViewBox]}>
                <RoundCheckbox
                  size={20}
                  keyValue={3}
                  checked={this.state.allCheck3}
                  color="#164895"
                  labelColor="#000000"
                  value="3"
                  label="3"
                  checkedObjArr={CheckedArrObject}
                  handleCheckedbox={this.handleCheckedbox}
                />
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('TermsConditions', {
                      name: t('termsConditions2'),
                    });
                  }}>
                  <Text
                    style={[
                      ResetStyle.fontRegularK,
                      ResetStyle.fontDG,
                      {marginLeft: 10},
                    ]}>
                    {t('agreementTermsConditions4')}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('TermsConditions', {
                    name: t('termsConditions2'),
                  });
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../imgs/drawable-xhdpi/icon_more_b.png')}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <TouchableOpacity
            style={[
              ResetStyle.button,
              this.state.allCheck1 == false && {backgroundColor: '#e6e6e6'},
            ]}
            onPress={() => {
              if (this.state.allCheck1) {
                this.props.navigation.navigate('SignUpPersonal', {
                  deviceKey: this.props.route.params?.deviceKey,
                  phoneNum: this.props.route.params?.phoneNum,
                });
              }
            }}>
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontWhite,
                {fontWeight: '600'},
              ]}>
              {t('agreementTermsConditionsNextButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default hoistStatics(
  withTranslation()(AgreementTermsConditions),
  AgreementTermsConditions,
);
