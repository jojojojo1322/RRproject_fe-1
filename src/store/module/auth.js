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

export const getUserInfo = createAction(INFO);
export const signIn = createAction(SIGN_IN);

const getUserInfoSaga = createRequestSaga(INFO, authAPI.getUserInfo);
const signInSaga = createRequestSaga(SIGN_IN, authAPI.login);

export function* authSaga() {
  yield takeLatest(INFO, getUserInfoSaga);
  yield takeLatest(SIGN_IN, signInSaga);
}

const initialState = {
  info: {
    ret_val: null,
    result: '',
    userNo: '',
    mailId: '',
    userPw: '',
    inviteCode: '',
    deviceKey: '',
    osType: '',
    phoneNum: '',
    createTime: '',
    updateTime: '',
    loginTime: '',
    block: '',
    wallet: '',
    kycStatus: '',
    userLevel: '',
    kycUpdated: '',
    surveyBlockStatus: '',
    ipAddr: '',
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
  [INFO_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    info: data,
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
