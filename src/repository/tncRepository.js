import api from '@context/server';

export const getTNCInfo = (mailId) => {
  return api().get(`/wallet/${mailId}`);
};

export const getTNCHistory = (param) => {
  return api().post(`/wallet/history`, param);
};

//--------------------모듈 작업 안함

export const walletReward = async (param) => {
  return await api().post(`/wallet/trans/reward`, param);
};

export const walletTrans = async (param) => {
  return await api().post(`/wallet/trans`, param);
};
