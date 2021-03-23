import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ResetStyle from '../../style/ResetStyle.js';
import AuthStyle from '../../style/AuthStyle.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server} from '../defined/server';
import TextConfirmModal from '../factory/modal/TextConfirmModal';
import {useTranslation} from 'react-i18next';
import DatePickerModal from '../factory/modal/DatePickerModal';
import ListModal from '../factory/modal/ListModal';
import ListLangModal from '../factory/modal/ListLangModal';
import ListCheckLangModal from '../factory/modal/ListCheckLangModal';

function isBirthday(dateStr) {
  if (dateStr === undefined) {
    return false;
  } else {
    var year = Number(dateStr.substr(0, 4));
    // 입력한 값의 0~4자리까지 (연)
    var month = Number(dateStr.substr(4, 2));
    // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
    var day = Number(dateStr.substr(6, 2));
    // 입력한 값 6번째 자리부터 2자리 숫자 (일)
    var today = new Date();
    // 날짜 변수 선언
    var yearNow = today.getFullYear();
    // 올해 연도 가져옴
    if (dateStr.length <= 8) {
      // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다.
      if (1900 > year || year > yearNow) {
        return false;
      } else if (month < 1 || month > 12) {
        return false;
      } else if (day < 1 || day > 31) {
        return false;
      } else if (
        (month == 4 || month == 6 || month == 9 || month == 11) &&
        day == 31
      ) {
        return false;
      } else if (month == 2) {
        var isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
        if (day > 29 || (day == 29 && !isleap)) {
          return false;
        } else {
          return true;
        }
        //end of if (day>29 || (day==29 && !isleap))
      } else {
        return true;
      } //end of if
    } else {
      //1.입력된 생년월일이 8자 초과할때 : auth:false
      return false;
    }
  }
}

const KycLevel1Box = ({navigation, route}) => {
  const GenderData = [
    {
      id: '0',
      title: '남성',
    },
    {
      id: '1',
      title: '여성',
    },
    {
      id: '2',
      title: '기타',
    },
  ];
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  // residenceCountry
  const [modal4Visible, setModal4Visible] = useState(false);
  // originalLanguageModal
  const [modal5Visible, setModal5Visible] = useState(false);
  // residenceLanguageModal
  const [modal6Visible, setModal6Visible] = useState(false);
  const [selected, setSelected] = useState(new Map());

  // STEP1
  const [birth, setBirth] = useState(
    route.params?.birth == undefined ? '' : route.params?.birth,
  );
  const [gender, setGender] = useState(
    route.params?.gender == undefined ? '' : route.params?.gender,
  );
  const [country, setCountry] = useState('');
  const [countryCd, setCountryCd] = useState('');
  // STEP1

  // STEP2
  const [residenceCity, setResidenceCity] = useState(
    route.params?.residenceCity == undefined ? '' : route.params?.residenceCity,
  );
  const [residenceCountry, setResidenceCountry] = useState(
    route.params?.residenceCountry == undefined
      ? ''
      : route.params?.residenceCountry,
  );
  const [residenceCountryCd, setResidenceCountryCd] = useState(
    route.params?.residenceCountryCd == undefined
      ? ''
      : route.params?.residenceCountryCd,
  );
  // STEP2

  // STEP3
  const [originalLang, setOriginalLang] = useState('');
  const [residenceLang, setResidenceLang] = useState([]);
  // STEP3

  const [_date, _setDate] = useState('');

  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [languageData, setLanguageData] = useState([]);

  const [step, setStep] = useState(1);

  // Country Data Api
  const countryDataApi = async () => {
    await axios
      .get(`${server}/util/global/country`)
      .then(async (response) => {
        // console.log('countryListList', response);
        // setCountry(response.data);
        setCountryData(response.data);
        console.log(
          'countryDataApi',
          response.data.filter((data) => data.fullName === residenceCountry),
        );
        if (
          response.data.filter((data) => data.countryCode === countryCd)
            .length === 1
        ) {
          setCountry(
            esponse.data.filter((data) => data.countryCode === countryCd)[0]
              .fullName,
          );
          setResidenceCountryCd(
            response.data.filter(
              (data) => data.fullName === residenceCountry,
            )[0].countryCode,
          );
        }
        setCountry(
          response.data.filter((data) => data.countryCode === countryCd)[0]
            .fullName,
          countryCd,
        );
        // return await response;
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };

  // City Data Api
  const cityDataApi = async () => {
    await axios
      .get(`${server}/util/global/cities?countryCode=${residenceCountryCd}`)
      .then(async (response) => {
        console.log('cityDataApi THEN>>', response);
        // setCountry(response.data);
        setCityData(response.data);
        // return await response;
      })
      .catch((e) => {
        console.log('cityDataApi ERROR>>', e);
      });
  };

  const languageDataApi = async () => {
    await axios
      .get(`${server}/util/global/languages`)
      .then(async (response) => {
        // console.log('countryListList', response);
        // setCountry(response.data);
        console.log('languageDataApi THEN>>', response);
        setLanguageData(response.data);
        // return await response;
      })
      .catch((e) => {
        console.log('languageDataApi ERROR>>', response);
      });
  };

  const handleBirth = (value) => {
    setBirth(value);
  };

  // multiple select flatlist 지우면 안됩니다
  // const onSelect = useCallback(
  //   (id) => {
  //     const newSelected = new Map(selected);
  //     newSelected.set(id, !selected.get(id));
  //     setSelected(newSelected);
  //   },
  //   [selected],
  // );

  //   useEffect(() => {
  //     console.log('gendergendergendergendergendergender>>>', gender);
  //   }, [gender]);

  // single select flatlist 지우면 안됩니다
  const onSelect = (id, title) => {
    console.log('gender', title);
    setSelected(id);
    setGender(title);
    console.log('changed gender', title);
  };

  // Birthday Modal
  const openDatePickerModal = () => {
    setModalVisible(!modalVisible);
  };

  // Nationality check Modal
  const openNationalityModal = () => {
    setModal2Visible(!modal2Visible);
  };
  const openResidenceCountryModal = () => {
    setModal4Visible(!modal4Visible);
  };
  // City check Modal
  const openCityModal = () => {
    setModal3Visible(!modal3Visible);
  };
  const openOriginalLangModal = () => {
    setModal5Visible(!modal5Visible);
  };
  const openResidenceLangModal = () => {
    setModal6Visible(!modal6Visible);
  };

  const settingCountry = (country, cd) => {
    setCountry(country);
    setCountryCd(cd);
    // props.setCountry(country, cd);
  };
  //   setResidenceCity
  // setResidenceCountry
  // setResidenceCountryCd
  const settingResidenceCountry = (country, cd) => {
    console.log(countryCd);
    console.log(countryCd);
    console.log(countryCd);
    console.log(countryCd);
    console.log(countryCd);
    setResidenceCountry(country);
    setResidenceCountryCd(cd);
    // props.setCountry(country, cd);
  };
  const settingResidenceCity = (country, cd) => {
    setResidenceCity(country);
    // setCountryCd(cd);
    // props.setCountry(country, cd);
  };
  const settingOriginalLang = (LanguageCode, englishName, nativeName) => {
    console.log({
      LanguageCode: LanguageCode,
      englishName: englishName,
      nativeName: nativeName,
    });
    setOriginalLang(englishName);
    // setCountryCd(cd);
    // props.setCountry(country, cd);
  };

  const setLanguage = (vis) => {
    let visible = vis;
    console.log(vis);
    console.log(vis);
    console.log(vis);
    // // visible = visible.filter((item, index) => visible.indexOf(item) === index);
    // visible = visible.filter((item, i) => {
    //   return (
    //     visible.findIndex((item2, j) => {
    //       return item.value === item2.value;
    //     }) === i
    //   );
    // });
    setOriginalLang(visible);
    //표시용 언어 이름
    let Lang = '';
    let HighLang = '';
    //api용 언어 코드
    let LangCode = '';
    let HighLangCode = '';

    // 언어 배열에 추가
    // if (visible) {
    //   visible.map((data, index) => {
    //     visible.length == index + 1
    //       ? (Lang += `${data.label}`)
    //       : (Lang += `${data.label},`);
    //   });
    //   visible.map((data, index) => {
    //     visible.length == index + 1
    //       ? (HighLang += `${data.label}`)
    //       : (HighLang += `${data.label},`);
    //   });

    //   visible.map((data, index) => {
    //     visible.length == index + 1
    //       ? (LangCode += `${data.value}`)
    //       : (LangCode += `${data.value},`);
    //   });
    //   visible.map((data, index) => {
    //     visible.length == index + 1
    //       ? (HighLangCode += `${data.value}`)
    //       : (HighLangCode += `${data.value},`);
    //   });
    // }
    // setLanguage(Lang);
    // // this.props.setLanguage(HighLang);
    // console.log({Lang: Lang, HighLangCode: HighLangCode});
    // setLanguage(Lang, HighLangCode);
  };

  useEffect(() => {
    countryDataApi();
    languageDataApi();
    cityDataApi();
  }, []);
  useEffect(() => {
    console.log('호출');
    cityDataApi();
  }, [residenceCountryCd]);

  const ProfileList = ({
    listTitle,
    listSubTitle,
    listContent,
    onPressEvent,
  }) => {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left'},
            ]}>
            {listTitle}
          </Text>
          <Text
            style={[
              ResetStyle.fontLightK,
              ResetStyle.fontBlack,
              {textAlign: 'left', marginLeft: '1%'},
            ]}>
            {listSubTitle}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            onPressEvent();
          }}>
          <View style={AuthStyle.kycInput}>
            <Text
              style={[
                ResetStyle.fontRegularK,
                ResetStyle.fontG,
                // ResetStyle.fontBlack,
                {
                  textAlign: 'left',
                  paddingTop: '6%',
                  paddingBottom: '3%',
                },
              ]}>
              {listContent}
            </Text>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 22 : 20,
                height: Platform.OS === 'ios' ? 22 : 20,
                resizeMode: 'contain',
              }}
              source={require('@images/icon_search.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  //   KYC Level 1 First
  const KycLevel1First = () => {
    return (
      <View
        style={{
          marginTop: '10%',
          height: '60%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          //   borderWidth: 1,
        }}>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', fontWeight: '600', marginBottom: '5%'},
            ]}>
            기본정보
          </Text>
          {/* Birthday */}
          <ProfileList
            listTitle={'생년월일 입력'}
            listContent={birth !== '' ? birth : t('kycSecond2')}
            onPressEvent={openDatePickerModal}
          />
        </View>

        {/* Nationality */}
        <ProfileList
          listTitle={'국적 선택'}
          listContent={country !== '' ? country : '선택해 주세요.'}
          onPressEvent={openNationalityModal}
        />

        {/* Gender */}
        <View style={{flexDirection: 'column'}}>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', marginBottom: '3%'},
            ]}>
            성별 선택
          </Text>
          <FlatList
            data={GenderData}
            renderItem={({item}) => (
              <GenderItem
                id={item.id}
                title={item.title}
                selected={item.id === selected}
                onSelect={onSelect}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={selected}
            numColumns={3}
          />
        </View>
      </View>
    );
  };

  // Kyc Level 1 Second
  const KycLevel1Second = () => {
    return (
      <View
        style={{
          marginTop: '10%',
          height: '48%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          //   borderWidth: 1,
        }}>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', fontWeight: '600', marginBottom: '5%'},
            ]}>
            거주정보
          </Text>
          {/* residenceCountry */}
          <ProfileList
            // residenceCountry
            listTitle={'거주국가 선택'}
            listContent={
              residenceCountry !== '' ? residenceCountry : '선택해 주세요.'
            }
            onPressEvent={openResidenceCountryModal}
          />
        </View>

        {/* residenceCity */}
        <ProfileList
          listTitle={'거주도시 선택'}
          listContent={residenceCity !== '' ? residenceCity : '선택해 주세요.'}
          onPressEvent={openCityModal}
        />
      </View>
    );
  };

  //   KYC Level 1 Third
  const KycLevel1Third = () => {
    return (
      <View
        style={{
          marginTop: '10%',
          height: '48%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          //   borderWidth: 1,
        }}>
        <View>
          <Text
            style={[
              ResetStyle.fontRegularK,
              ResetStyle.fontBlack,
              {textAlign: 'left', fontWeight: '600', marginBottom: '5%'},
            ]}>
            언어
          </Text>
          {/* Birthday */}
          <ProfileList
            listTitle={'모국어'}
            listContent={originalLang !== '' ? originalLang : '선택해 주세요.'}
            onPressEvent={openOriginalLangModal}
          />
        </View>
        {/* openOriginalLangModal
openResidenceLangModal */}

        {/* Nationality */}
        <ProfileList
          listTitle={'사용가능언어 선택'}
          listSubTitle={'(다중 선택 가능)'}
          listContent={'선택해 주세요.'}
          onPressEvent={openResidenceLangModal}
        />
      </View>
    );
  };

  // Gender render Item
  const GenderItem = ({id, title, selected, onSelect}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id, title)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected ? '#4696ff' : '#f3f3f3',
          borderRadius: 5,
          marginRight: 5,
        }}>
        <Text
          style={[
            ResetStyle.fontRegularK,
            ResetStyle.fontBlack,
            {paddingVertical: '18%', color: selected ? '#fff' : '#222'},
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  // step 핸들
  const stepHandle = (props) => {
    let fixStep = step;
    if (props === 'pre') {
      if (step !== 1) {
        --fixStep;
        setStep(fixStep);
      } else {
        navigation.navigate.goBack();
      }
    } else if (props === 'next') {
      if (step !== 3) {
        ++fixStep;
        setStep(fixStep);
      } else {
        console.log({
          birth: birth,
        });
      }
    }
  };

  return (
    <SafeAreaView style={ResetStyle.container}>
      <View style={ResetStyle.containerInner}>
        {/* Top */}
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                stepHandle('pre');
              }}>
              <Image
                style={{
                  width: Platform.OS === 'ios' ? 28 : 22,
                  height: Platform.OS === 'ios' ? 28 : 22,
                  resizeMode: 'contain',
                }}
                source={require('@images/backIcon.png')}
              />
            </TouchableOpacity>
            {/* Top Title */}
            <Text
              style={[
                ResetStyle.fontMediumK,
                ResetStyle.fontBlack,
                {marginTop: '2%'},
              ]}>
              Profile LEVEL 1
            </Text>
            <View
              style={{
                width: Platform.OS === 'ios' ? 28 : 22,
                height: Platform.OS === 'ios' ? 28 : 22,
              }}
            />
          </View>
          {/* Top Check Image * 3 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            <Image
              style={{
                width: Platform.OS === 'ios' ? 55 : 50,
                height: Platform.OS === 'ios' ? 55 : 50,
                resizeMode: 'contain',
              }}
              source={require('@images/kycCheckedIcon.png')}
            />
            <View
              style={{
                width: '5%',
                height: 1,
                backgroundColor: '#a9a9a9',
                marginHorizontal: '1%',
              }}
            />
            <Image
              style={{
                width: Platform.OS === 'ios' ? 55 : 50,
                height: Platform.OS === 'ios' ? 55 : 50,
                resizeMode: 'contain',
              }}
              source={
                step < 2
                  ? require('@images/kycUncheckIcon.png')
                  : require('@images/kycCheckedIcon.png')
              }
            />
            <View
              style={{
                width: '5%',
                height: 1,
                backgroundColor: '#a9a9a9',
                marginHorizontal: '1%',
              }}
            />
            <Image
              style={{
                width: Platform.OS === 'ios' ? 55 : 50,
                height: Platform.OS === 'ios' ? 55 : 50,
                resizeMode: 'contain',
              }}
              source={
                step < 3
                  ? require('@images/kycUncheckIcon.png')
                  : require('@images/kycCheckedIcon.png')
              }
            />
          </View>
          {/* Container */}
          {step === 1 ? (
            <KycLevel1First />
          ) : step === 2 ? (
            <KycLevel1Second />
          ) : (
            <KycLevel1Third />
          )}
          {/* <KycLevel1Second /> */}
          {/* <KycLevel1Third /> */}
        </View>

        {/* Bottom Button */}
        <TouchableOpacity
          style={[
            ResetStyle.button,
            step === 1 &&
              (birth === '' || gender === '') && {backgroundColor: '#e6e6e6'},
            step === 2 &&
              (residenceCountry === '' || residenceCity === '') && {
                backgroundColor: '#e6e6e6',
              },
            step === 3 && originalLang === '' && {backgroundColor: '#e6e6e6'},
          ]}
          onPress={() => {
            if (step === 1 && birth !== '' && gender !== '') {
              stepHandle('next');
            }
            if (step === 2 && residenceCountry !== '' && residenceCity !== '') {
              stepHandle('next');
            }
            console.log({
              step: step,
              birth: birth,
              gender: gender,
            });
          }}>
          <Text
            style={[
              ResetStyle.fontMediumK,
              ResetStyle.fontWhite,
              {fontWeight: '600'},
            ]}>
            {t('kyc3')}
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        {/* Birthday Modal */}
        <DatePickerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          _date={_date}
          _setDate={_setDate}
          handleBirth={handleBirth}
        />
        {/* Nationality Modal */}
        <ListModal
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          setCountry={settingCountry}
          titleText={t('kycThird3')}
          list={countryData}
        />

        {/* residenceCountry */}
        <ListModal
          modalVisible={modal4Visible}
          setModalVisible={setModal4Visible}
          setCountry={settingResidenceCountry}
          titleText={t('kycThird3')}
          list={countryData}
        />

        {/* City */}
        <ListModal
          modalVisible={modal3Visible}
          setModalVisible={setModal3Visible}
          setCountry={setResidenceCity}
          setLanguage={settingResidenceCity}
          titleText={t('kycThird12')}
          list={cityData}
        />

        {/* 모국어
        <ListCheckLangModal
          modalVisible={modal5Visible}
          setModalVisible={setModal5Visible}
          setLanguage={setLanguage}
          list={languageData}
          originalLang={originalLang}
        /> */}
        {/* 모국어 */}
        <ListLangModal
          modalVisible={modal5Visible}
          setModalVisible={setModal5Visible}
          setCountry={settingOriginalLang}
          setLanguage={settingResidenceCity}
          titleText={t('kycThird12')}
          list={languageData}
        />
        {/* 사용가능언어 */}
        <ListCheckLangModal
          modalVisible={modal6Visible}
          setModalVisible={setModal6Visible}
          setLanguage={setLanguage}
          list={languageData}
          originalLang={residenceLang}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ktitAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  ktilMiddle: {
    width: 20,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#a9a9a9',
  },
  topAll: {
    marginTop: 16,
  },
  topText: {
    fontSize: 23,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default KycLevel1Box;
