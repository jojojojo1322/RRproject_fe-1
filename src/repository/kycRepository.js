import api from '@context/server';

export const kycLevel1 = (param) => api().get(`/kyc/1/${param.userNo}`);

export const kycLevel1Update = async (data) => {
  return await api().patch('/kyc/1', data);
};

export const kycLevel1Create = (param) => {
  return api().post('/kyc/1', param);
};

export const kycLevel2 = (param) => api().get(`/kyc/2/${param.userNo}`);

export const kycLevel2Create = (param) => {
  return api().post('/kyc/2', param);
};

export const kycLevel2Update = async (data) => {
  return await api().patch('/kyc/2', data);
};

export const getAdvancedKycInfo = (param) =>
  api().get(`/kyc/${param.userNo}/${param.KycLevel}/${param.language}`);

export const getAdvancedKycOption = (param) =>
  api().get(`/kyc/option/${param.KycLevel}/${param.language}`);

export const getAdvancedKycQuestion = (param) =>
  api().get(`/kyc/question/${param.KycLevel}/${param.language}`);

export const createAdvancedKyc = (param) => {
  return api().post('/kyc', param);
};

export const updateAdvancedKyc = async (data) => {
  return await api().patch('/kyc', data);
};
