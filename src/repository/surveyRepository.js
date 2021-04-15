import api from '@context/server';

export const getSurveyList = (param) =>
  api().get(
    `/survey/main/status/${param.surveyStatus}/${param.language}?CurrentPageNo=1&userNo=${param.userNo}`,
  );

export const getCompletedSurveyList = (userNo) =>
  api().get(`/survey/main/${userNo}`);

export const getSurveyDetail = (param) =>
  api().get(
    `/survey/detail?deviceLanguageCode=${param.language}&legacySurveyId=${param.legacySurveyId}&userNo=${param.userNo}`,
  );

export const audienceCheckPost = (param) => {
  return api().post('/survey/audience', param);
};

export const audienceInfo = (param) =>
  api().get(`/survey/audience/info?legacySurveyId=${param.legacySurveyId}`);

export const getAdvertisement = (param) =>
  api().get(`/survey/advertisement?SponsorUserNo=${param.sponsorUserNo}`);

export const sendSurveyAnswer = (param) => {
  return api().post('/survey/answer', param);
};

export const getSurveyQuestion = (param) =>
  api().get(
    `/survey/question?deviceLanguageCode=${param.language}&legacySurveyId=${param.legacySurveyId}`,
  );

export const getSurveyOption = (param) =>
  api().get(
    `/survey/question/options?deviceLanguageCode=${param.language}&legacySurveyId=${param.legacySurveyId}&questionNum=${param.questionNum}`,
  );
