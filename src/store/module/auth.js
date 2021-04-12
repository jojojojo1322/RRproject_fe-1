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

const [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE] = createRequestActionTypes(
  'auth/SIGN_UP',
);

export const getUserInfo = createAction(INFO);
export const signIn = createAction(SIGN_IN);
export const signUp = createAction(SIGN_UP);

const getUserInfoSaga = createRequestSaga(INFO, authAPI.getUserInfo);
const signInSaga = createRequestSaga(SIGN_IN, authAPI.login);
const signUpSaga = createRequestSaga(SIGN_UP, authAPI.signUp);

export function* authSaga() {
  yield takeLatest(INFO, getUserInfoSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_UP, signUpSaga);
}

const initialState = {
  user: {
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
  signupResult: null,
  loginFail: false,
  signupFail: null,
  loginPayload: {
    userNo: '',
    status: null,
    msg: '',
    hasWallet: '',
  },
  authError: '',

  signupFail: null,
};

const auth = createReducer(initialState, {
  [INFO_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    user: data,
    userError: null,
  }),
  [INFO_FAILURE]: (state, {payload: error}) => ({
    ...state,
    userError: error,
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
  [SIGN_UP_SUCCESS]: (state, {payload: data}) => {
    return {
      ...state,
      signupResult: data,
      signupFail: null,
    };
  },
  [SIGN_UP_FAILURE]: (state, {payload: error}) => {
    return {
      ...state,
      signupResult: null,
      signupFail: error,
    };
  },
});

export default auth;
