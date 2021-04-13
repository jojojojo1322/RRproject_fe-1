import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import sample, {sampleSaga} from '@module/sample';
import loading from '@module/loading';
import auth, {authSaga} from '@module/auth';
import language from '@module/language';
import survey, {surveySaga} from '@module/survey';
import tnc, {tncSaga} from '@module/tnc';

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers({
  sample,
  loading,
  auth,
  language,
  survey,
  tnc,
});

export function* rootSaga() {
  yield all([sampleSaga(), authSaga(), surveySaga(), tncSaga()]);
}

const store = configureStore({reducer: reducers, middleware: [sagaMiddleware]});
sagaMiddleware.run(rootSaga);

export default store;
