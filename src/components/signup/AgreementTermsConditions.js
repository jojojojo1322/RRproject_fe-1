import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {RoundCheckbox} from '@factory/Roundcheck';
import ResetStyle from '@style/ResetStyle.js';
import AuthStyle from '@style/AuthStyle';
import TextConfirmCancelModal from '@factory/modal/TextConfirmCancelModal';

// class SelectedCheckboxes {
//   constructor() {
//     selectedCheckboxes = [];
//   }

//   addItem(option) {
//     selectedCheckboxes.push(option);
//   }

//   fetchArray() {
//     return selectedCheckboxes;
//   }
// }

const AgreementTermsConditions = ({route}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [allCheck1, setAllCheck1] = useState(false);
  const [allCheck2, setAllCheck2] = useState(false);
  const [allCheck3, setAllCheck3] = useState(false);
  const [modalVisibleGoBack, setModalVisibleGoBack] = useState(false);

  const handleAll = (value) => {
    setAllCheck1(value);
    setAllCheck2(value);
    setAllCheck3(value);
  };

  const handleCheckedbox = (value, status) => {
    console.log('chchchchchch', value);
    if (status === 'PLUS') {
      if (value == 2) {
        setAllCheck2(true);
      } else if (value == 3) {
        setAllCheck3(true);
      }
    } else if (status === 'MINUS') {
      if (value == 2) {
        setAllCheck2(false);
      } else if (value == 3) {
        setAllCheck3(false);
      }
    }
  };

  const goBack = () => {
    setModalVisibleGoBack(true);
  };

  useEffect(() => {
    if (allCheck2 == true && allCheck3 == true) {
      setAllCheck1(true);
    } else if (
      (allCheck2 !== true || allCheck3 !== true) &&
      allCheck1 === true
    ) {
      setAllCheck1(false);
    }
  }, [allCheck2, allCheck3]);

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        setModalVisibleGoBack(true);
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      }

      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onAndroidBackPress,
          );
        }
      };
    }, []),
  );

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        <View>
          {/* topBackButton */}
          <View>
            <View style={ResetStyle.topBackButton}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => goBack()}>
                <Image
                  style={{
                    width: Platform.OS === 'ios' ? 28 : 22,
                    height: Platform.OS === 'ios' ? 28 : 22,
                    resizeMode: 'contain',
                  }}
                  source={require('@images/backIcon.png')}
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
              checked={allCheck1}
              color="#164895"
              // borderColor=""
              labelColor="#000000"
              value="1"
              label="all"
              checkedObjArr={CheckedArrObject}
              handleAll={handleAll}
              handleCheckedbox={handleCheckedbox}
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
                checked={allCheck2}
                color="#164895"
                labelColor="#000000"
                value="2"
                label="2"
                checkedObjArr={CheckedArrObject}
                handleCheckedbox={handleCheckedbox}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('TermsConditions', {
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
                navigation.navigate('TermsConditions', {
                  name: t('termsConditions1'),
                });
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 30 : 25,
                  height: Platform.OS === 'ios' ? 30 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/moreIcon.png')}
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
                checked={allCheck3}
                color="#164895"
                labelColor="#000000"
                value="3"
                label="3"
                checkedObjArr={CheckedArrObject}
                handleCheckedbox={handleCheckedbox}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('TermsConditions', {
                    name: t('termsConditions2'),
                  });
                }}>
                <Text
                  style={[
                    ResetStyle.fontRegularK,
                    ResetStyle.fontDG,
                    {marginLeft: 10},
                  ]}>
                  {t('agreementTermsConditions3')}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('TermsConditions', {
                  name: t('termsConditions2'),
                });
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 30 : 25,
                  height: Platform.OS === 'ios' ? 30 : 25,
                  resizeMode: 'contain',
                }}
                source={require('@images/moreIcon.png')}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>

        <TouchableOpacity
          style={[
            ResetStyle.button,
            allCheck1 == false && {backgroundColor: '#e6e6e6'},
          ]}
          onPress={() => {
            if (allCheck1) {
              navigation.navigate('SignUpPersonal', {
                deviceKey: route.params?.deviceKey,
                phoneNum: route.params?.phoneNum,
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
      <TextConfirmCancelModal
        modalVisible={modalVisibleGoBack}
        setModalVisible={setModalVisibleGoBack}
        text={t('SignUp_Reset')}
        confirm={t('confirm')}
        confirmHandle={() => navigation.popToTop()}
        cancel={t('cancel')}
        cancelHandle={() => setModalVisibleGoBack(false)}
      />
    </SafeAreaView>
  );
};

export default AgreementTermsConditions;
