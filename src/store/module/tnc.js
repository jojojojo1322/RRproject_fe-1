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

const [
  GET_TNC_HISTORY,
  GET_TNC_HISTORY_SUCCESS,
  GET_TNC_HISTORY_FAILURE,
] = createRequestActionTypes('tnc/GET_TNC_HISTORY');

export const getTNCInfo = createAction(GET_TNC_INFO);
export const getTNCHistory = createAction(GET_TNC_HISTORY);

const getTNCInfoSaga = createRequestSaga(GET_TNC_INFO, tncAPI.getTNCInfo);
const getTNCHistorySaga = createRequestSaga(
  GET_TNC_HISTORY,
  tncAPI.getTNCHistory,
);

export function* tncSaga() {
  yield takeLatest(GET_TNC_INFO, getTNCInfoSaga);
  yield takeLatest(GET_TNC_HISTORY, getTNCHistorySaga);
}

const initialState = {
  tncInfo: null,
  tncHistory: null,
  tncInfoError: null,
  tncHistoryError: null,
};

const tnc = createReducer(initialState, {
  [GET_TNC_INFO_SUCCESS]: (state, {payload: data}) => {
    if (data.status !== 'fail') {
      return {
        ...state,
        tncInfo: data,
        tncInfoError: null,
      };
    } else {
      return {
        ...state,
        tncInfo: {
          ...data,
          balance: '0',
          tncInfoError: null,
        },
      };
    }
  },
  [GET_TNC_INFO_FAILURE]: (state, {payload: error}) => ({
    ...state,
    tncInfoError: error,
  }),
  [GET_TNC_HISTORY_SUCCESS]: (state, {payload: data}) => {
    return {
      ...state,
      tncHistory: data,
      tncHistoryError: null,
    };
  },
  [GET_TNC_HISTORY_FAILURE]: (state, {payload: error}) => ({
    ...state,
    tncHistoryError: error,
  }),
});

export default tnc;
