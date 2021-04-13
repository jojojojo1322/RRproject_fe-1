import api from '@context/server';

export const getTNCInfo = (mailId) => {
  return api().get(`/wallet/${mailId}`);
};
