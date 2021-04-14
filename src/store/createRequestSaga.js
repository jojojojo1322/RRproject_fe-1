import {startLoading, finishLoading} from '@store/module/loading';
import {put, call} from 'redux-saga/effects';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
};

const createRequestSaga = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);

      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      if (e.response.status === 500) {
        yield put({
          type: FAILURE,
          payload: e,
          error: true,
        });
      } else {
        yield put({
          type: e.response.data ? SUCCESS : FAILURE,
          payload: e.response.data ?? e,
          meta: e.response ?? e,
        });
      }
    }
    yield put(finishLoading(type));
  };
};

export default createRequestSaga;
