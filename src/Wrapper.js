import React, {useState, useEffect} from 'react';
import {Text, TouchableHighlight, View, Modal, Linking} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';

import {server} from '@context/server';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VersionCheck from 'react-native-version-check';
import UpdateModal from '@factory/modal/UpdateModal';
import RNExitApp from 'react-native-exit-app';

import App from './App';
import Splash from './Splash';
import {useTranslation} from 'react-i18next';
import '@assets/i18n';

import {appInfo} from '@repository/versionRepository';

const Wrapper = () => {
  const {t, i18n} = useTranslation();
  //버전 체크를 위해선 false로 선언한다.
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [checkVersion, setCheckVersion] = useState(true);
  const [current, setCurrent] = useState(VersionCheck.getCurrentVersion());
  // const [appVersion, setAppVersion] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  // setCustomText(TextResetStyle);
  const [loading, setLoading] = useState(false);

  const [versionCheck, setVersionCheck] = useState('FALSE');
  const [walletActive, setWalletActive] = useState('FALSE');

  const [loginC, setLoginC] = useState(null);

  const handleUpdateStore = () => {
    const GOOGLE_STORE = 'market://details?id=com.realresearch.survey';
    const APP_STORE =
      'itms-apps://apps.apple.com/kr/app/real-research-survey-app/id1540569117';

    console.log('update!');
    Linking.openURL(Platform.OS === 'ios' ? APP_STORE : GOOGLE_STORE); // open store if update is needed.
    RNExitApp.exitApp();
  };

  const handleExitApp = () => {
    RNExitApp.exitApp();
  };
  const userCheck = async () => {
    setLoginC(await AsyncStorage.getItem('userNo'));
  };
  const ApiCheckVersion = async () => {
    setLoading(true);
    await appInfo()
      .then(async (response) => {
        console.log('current current current', current);
        console.log('response response response', response.data);
        setVersionCheck(response.data.version_check);
        setWalletActive(response.data.wallet_active);
        if (
          //current 버전이 현재 버전과 맞지 않으면 첫번쨰 아니면 두번쨰
          current !==
          (Platform.OS === 'ios'
            ? response.data.ios_v
            : response.data.android_v)
        ) {
          //버전이 틀릴 시 업데이트 모달을 띄운다.
          console.log('version false >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
          setCheckVersion(false);
          // setNeedUpdate(true);
          setModalVisible(!modalVisible);
        } else {
          //버전이 맞을 시 넘어간다.
          if (walletActive === 'FALSE') {
            // wallet server down 서비스 점검중입니다 modal -> 확인 누르면 앱 다운
            setModal2Visible(!modal2Visible);
          } else {
            console.log('version true >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            setModalVisible(false);
            setCheckVersion(true);
            setLoading(false);
          }
        }
      })
      .catch(({e}) => {
        console.log('error', e);
      });
  };

  // version check 안함ver
  const NonVersionCheckMode = () => {
    setCheckVersion(true);
    setLoading(false);
  };

  // USIM Check
  // CarrierInfo.allowsVOIP()
  //   .then((result) => {
  //     console.log('CarrierInfo>>then>>>>', result);
  //   })
  //   .catch((e) => {
  //     console.log('error>>>>', e);
  //   });
  // CarrierInfo.carrierName()
  //   .then((result) => {
  //     console.log('CarrierName>>then>>>>', result);
  //   })
  //   .catch((e) => {
  //     console.log('error>>>>', e);
  //   });
  // ////유심 체크 (끼어져 있는 유심이 공유심인지는 체크 불가)
  // CarrierInfo.mobileNetworkCode()
  //   .then((result) => {
  //     console.log('mobileNetworkCode>>then>>>>', result);
  //   })
  //   .catch((e) => {
  //     console.log('error>>>>', e);
  //   });
  // CarrierInfo.mobileNetworkOperator()
  //   .then((result) => {
  //     console.log('mobileNetworkOperator>>then>>>>', result);
  //   })
  //   .catch((e) => {
  //     console.log('error>>>>', e);
  //   });

  useEffect(() => {
    userCheck();
    // ApiCheckVersion();
    NonVersionCheckMode();

    console.log('current current current', current);
    console.log('version check check', versionCheck);
    console.log('walletActive check check', walletActive);
  }, []);

  return (
    <Provider store={store}>
      {checkVersion && loading ? (
        <App loginC={loginC} />
      ) : (
        <Splash loading={loading} setLoading={setLoading} />
      )}
      <UpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleUpdateStore={handleUpdateStore}
        text={t('wrapper2')}
        confirm={t('wrapper1')}
      />
      <UpdateModal
        modalVisible={modal2Visible}
        setModalVisible={setModal2Visible}
        handleUpdateStore={handleExitApp}
        text={t('wrapper3')}
        confirm={t('wrapper4')}
      />
    </Provider>
  );
};

export default Wrapper;
