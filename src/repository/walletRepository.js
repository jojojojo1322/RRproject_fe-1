import api from '@context/server';

export const walletCheck = (param) => {
  return api().post('/wallet/check', param);
};

export const walletPasswordTrans = (param) => {
  return api().put('/wallet/password', param);
};

export const walletUserUpdate = (param) => {
  return api().put('/wallet', param);
};

export const walletNew = (param) => {
  return api().post('/wallet', param);
};

export const walletHistory = (param) => {
  return api().post('/wallet/history', param);
};
