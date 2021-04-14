import api from '@context/server';

export const kycLevel1 = async (param) =>
  await api().get(`/kyc/1/${param.userNo}`);

export const kycLevel1Update = async (data) => {
  return await api().patch('/kyc/1', data);
};

export const kycLevel1Create = async (param) => {
  return await api().post('/kyc/1', param);
};

export const kycLevel2 = async (param) =>
  await api().get(`/kyc/2/${param.userNo}`);

export const kycLevel2Create = async (param) => {
  return await api().post('/kyc/2', param);
};

export const kycLevel2Update = async (data) => {
  return await api().patch('/kyc/2', data);
};

export const getAdvancedKycInfo = async (param) =>
  await api().get(`/kyc/${param.userNo}/${param.KycLevel}/${param.language}`);

export const getAdvancedKycOption = async (param) =>
  await api().get(`/kyc/option/${param.KycLevel}/${param.language}`);

export const getAdvancedKycQuestion = async (param) =>
  await api().get(`/kyc/question/${param.KycLevel}/${param.language}`);

export const createAdvancedKyc = async (param) => {
  return await api().post('/kyc', param);
};

export const updateAdvancedKyc = async (param) => {
  return await api().patch(`/kyc/${param.KycLevel}/${param.userNo}`, param);
};
