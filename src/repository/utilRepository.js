import api from '@context/server';

export const getGlobalCountry = (param) => api().get('/util/global/country');

export const getGlobalCities = (param) =>
  api().get(`/util/global/cities?countryCode=${param.countryCode}`);

export const getGlobalLanguage = (param) => api().get(`/util/global/languages`);

export const passport = (param) =>
  api().get(`/util/passport/status?userNo=${param.userNo}`);

// ---------------- Noti Controller ---------------------

export const alertDataAPI = (param) => api().get(`/noti/${param.userNo}`);

export const alertCheck = async (param) => {
  return await api().patch(`/noti/${param.userNo}`);
};
