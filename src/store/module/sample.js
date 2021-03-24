import {createAction, createReducer} from '@reduxjs/toolkit';

import createRequestSaga, {
  createRequestActionTypes,
} from '@store/createRequestSaga';
import {takeLatest} from 'redux-saga/effects';
import * as sampleAPI from '@repository/sampleRepository';

const [SAMPLE, SAMPLE_SUCCESS, SAMPLE_FAILURE] = createRequestActionTypes(
  'sample/SAMPLE',
);

export const testSample = createAction(SAMPLE);

const testSampleSaga = createRequestSaga(SAMPLE, sampleAPI.testSample);

export function* sampleSaga() {
  yield takeLatest(SAMPLE, testSampleSaga);
}

const initialState = {
  sampleData: null,
  sampleDataError: null,
};

const sample = createReducer(initialState, {
  [SAMPLE_SUCCESS]: (state, {payload: {data}}) => {
    return {
      ...state,
      sampleData: data,
    };
  },
  [SAMPLE_FAILURE]: (state, {payload: error}) => ({
    ...state,
    sampleDataError: error,
  }),
});

export default sample;
