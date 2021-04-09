import {createAction, createReducer} from '@reduxjs/toolkit';

import createRequestSaga, {
  createRequestActionTypes,
} from '@store/createRequestSaga';
import {takeLatest} from 'redux-saga/effects';
import * as surveyAPI from '@repository/surveyRepository';

const [
  GET_ONGOING_SURVEY_LIST,
  GET_ONGOING_SURVEY_LIST_SUCCESS,
  GET_ONGOING_SURVEY_LIST_FAILURE,
] = createRequestActionTypes('survey/GET_ONGOING_SURVEY_LIST');

const [
  GET_COMPLETED_SURVEY_LIST,
  GET_COMPLETED_SURVEY_LIST_SUCCESS,
  GET_COMPLETED_SURVEY_LIST_FAILURE,
] = createRequestActionTypes('survey/GET_COMPLETED_SURVEY_LIST');

const [
  GET_EXPIRED_SURVEY_LIST,
  GET_EXPIRED_SURVEY_LIST_SUCCESS,
  GET_EXPIRED_SURVEY_LIST_FAILURE,
] = createRequestActionTypes('survey/GET_EXPIRED_SURVEY_LIST');

const [
  GET_SURVEY_DETAIL,
  GET_SURVEY_DETAIL_SUCCESS,
  GET_SURVEY_DETAIL_FAILURE,
] = createRequestActionTypes('survey/GET_SURVEY_DETAIL');

export const getOngoingSurveyList = createAction(GET_ONGOING_SURVEY_LIST);
export const getCompletedSurveyList = createAction(GET_COMPLETED_SURVEY_LIST);
export const getExpiredSurveyList = createAction(GET_EXPIRED_SURVEY_LIST);
export const getSurveyDetail = createAction(GET_SURVEY_DETAIL);

const getOngoingSurveyListSaga = createRequestSaga(
  GET_ONGOING_SURVEY_LIST,
  surveyAPI.getSurveyList,
);

const getCompletedSurveyListSaga = createRequestSaga(
  GET_COMPLETED_SURVEY_LIST,
  surveyAPI.getCompletedSurveyList,
);

const getExpiredSurveyListSaga = createRequestSaga(
  GET_EXPIRED_SURVEY_LIST,
  surveyAPI.getSurveyList,
);

const getSurveyDetailSaga = createRequestSaga(
  GET_SURVEY_DETAIL,
  surveyAPI.getSurveyDetail,
);

export function* surveySaga() {
  yield takeLatest(GET_ONGOING_SURVEY_LIST, getOngoingSurveyListSaga);
  yield takeLatest(GET_COMPLETED_SURVEY_LIST, getCompletedSurveyListSaga);
  yield takeLatest(GET_EXPIRED_SURVEY_LIST, getExpiredSurveyListSaga);
  yield takeLatest(GET_SURVEY_DETAIL, getSurveyDetailSaga);
}

const initialState = {
  ongoingSurveyList: [],
  completedSurveyList: [],
  expiredSurveyList: [],
  surveyDetail: null,
  ongoingSurveyListError: null,
  completedSurveyListError: null,
  expiredSurveyListError: null,
  surveyDetailError: null,
};

const survey = createReducer(initialState, {
  [GET_ONGOING_SURVEY_LIST_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    ongoingSurveyList: data ?? [],
    ongoingSurveyListError: null,
  }),
  [GET_ONGOING_SURVEY_LIST_FAILURE]: (state, {payload: error}) => ({
    ...state,
    ongoingSurveyList: [],
    ongoingSurveyListError: error,
  }),
  [GET_COMPLETED_SURVEY_LIST_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    completedSurveyList: data ?? [],
    completedSurveyListError: null,
  }),
  [GET_COMPLETED_SURVEY_LIST_FAILURE]: (state, {payload: error}) => ({
    ...state,
    completedSurveyList: [],
    completedSurveyListError: error,
  }),
  [GET_EXPIRED_SURVEY_LIST_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    expiredSurveyList: data ?? [],
    expiredSurveyListError: null,
  }),
  [GET_EXPIRED_SURVEY_LIST_FAILURE]: (state, {payload: error}) => ({
    ...state,
    expiredSurveyList: [],
    expiredSurveyListError: error,
  }),
  [GET_SURVEY_DETAIL_SUCCESS]: (state, {payload: data}) => ({
    ...state,
    surveyDetail: data,
    surveyDetailError: null,
  }),
  [GET_SURVEY_DETAIL_FAILURE]: (state, {payload: error}) => ({
    ...state,
    surveyDetail: null,
    surveyDetailError: error,
  }),
});

export default survey;
