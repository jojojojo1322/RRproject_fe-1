import {createAction, createReducer} from '@reduxjs/toolkit';

import createRequestSaga, {
  createRequestActionTypes,
} from '@store/createRequestSaga';
import {takeLatest} from 'redux-saga/effects';
import * as tncAPI from '@repository/tncRepository';

const [
  GET_TNC_INFO,
  GET_TNC_INFO_SUCCESS,
  GET_TNC_INFO_FAILURE,
] = createRequestActionTypes('tnc/GET_TNC_INFO');

export const getTNCInfo = createAction(GET_TNC_INFO);

const getTNCInfoSaga = createRequestSaga(GET_TNC_INFO, tncAPI.getTNCInfo);

export function* tncSaga() {
  yield takeLatest(GET_TNC_INFO, getTNCInfoSaga);
}

const initialState = {
  tncInfo: null,
  tncInfoError: null,
};

const tnc = createReducer(initialState, {
  [GET_TNC_INFO_SUCCESS]: (state, {payload: data}) => {
    return {
      ...state,
      tncInfo: data,
    };
  },
  [GET_TNC_INFO_FAILURE]: (state, {payload: error}) => ({
    ...state,
    tncInfoError: error,
  }),
});

export default tnc;
