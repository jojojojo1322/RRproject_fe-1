import {createAction, createReducer} from '@reduxjs/toolkit';

import createRequestSaga, {
  createRequestActionTypes,
} from '@store/createRequestSaga';
import {takeLatest} from 'redux-saga/effects';
import * as authAPI from '@repository/authRepository';

const [INFO, INFO_SUCCESS, INFO_FAILURE] = createRequestActionTypes(
  'auth/INFO',
);

const [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE] = createRequestActionTypes(
  'auth/SIGN_IN',
);

export const getInfo = createAction(INFO);
export const signIn = createAction(SIGN_IN);

const infoSaga = createRequestSaga(INFO, authAPI.getUserInfo);
const signInSaga = createRequestSaga(SIGN_IN, authAPI.login);

export function* authSaga() {
  yield takeLatest(INFO, infoSaga);
  yield takeLatest(SIGN_IN, signInSaga);
}

const initialState = {
  user: {
    block: '',
    createTime: '',
    deviceKey: '',
    inviteCode: '',
    ipAddr: '',
    kycStatus: '',
    kycUpdated: '',
    loginTime: '',
    mailId: '',
    osType: '',
    phoneNum: '',
    surveyBlockStatus: '',
    updateTime: '',
    userLevel: '',
    userNo: '',
    userPw: '',
    wallet: '',
  },
  loginFail: false,
  loginPayload: {
    userNo: '',
    status: false,
    msg: '',
    hasWallet: '',
  },
  authError: '',
};

const auth = createReducer(initialState, {
  [INFO_SUCCESS]: (state, {payload}) => ({
    ...state,
    info: payload,
    infoError: null,
  }),
  [INFO_FAILURE]: (state, {payload: error}) => ({
    ...state,
    infoError: error,
  }),
  [SIGN_IN_SUCCESS]: (state, {payload: data}) => {
    if (data) {
      return {
        ...state,
        loginPayload: data,
        loginFail: false,
      };
    } else {
      return {
        ...state,
        loginFail: true,
      };
    }
  },
  [SIGN_IN_FAILURE]: (state, {payload: error}) => {
    return {
      ...state,
      authError: error,
      loginFail: true,
    };
  },
});

export default auth;
