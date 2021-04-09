import api from '@context/server';

export const getSurveyList = (param) =>
  api().get(
    `/survey/main/status/${param.surveyStatus}/${param.language}?CurrentPageNo=1&userNo=${param.userNo}`,
  );

export const getCompletedSurveyList = (userNo) =>
  api().get(`/survey/main/${userNo}`);

export const getSurveyDetail = (param) =>
  api().get(
    `/survey/detail?deviceLanguageCode=${param.language}&legacySurveyId=${legacySurveyId}&userNo=${userNo}`,
  );
