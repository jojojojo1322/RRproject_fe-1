import api from '@context/server';

export const getTNCInfo = (mailId) => {
  return api().get(`/wallet/${mailId}`);
};

export const getTNCHistory = (param) => {
  return api().post(`/wallet/history`, param);
};
