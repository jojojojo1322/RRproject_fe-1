import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import sample, {sampleSaga} from '@module/sample';
import loading from '@module/loading';

const sagaMiddleware = createSagaMiddleware();

export const reducers = combineReducers({
  sample,
  loading,
});

export function* rootSaga() {
  yield all([sampleSaga()]);
}

const store = configureStore({reducer: reducers, middleware: [sagaMiddleware]});
sagaMiddleware.run(rootSaga);

export default store;
